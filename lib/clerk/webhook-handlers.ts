import type { UserJSON } from '@clerk/backend';

import { trackServerAnalyticsEventOnce } from '../db/analytics';
import {
  createUserIdentityFromClerkUser,
  daysSinceSignup,
  deleteUserIdentityByClerkUserId,
  getUserIdentityByClerkUserId,
  resolveAccountCreatedSource,
  resolveUserStatus,
  setOrgMembershipByClerkUserId,
  setProSubscriptionByClerkUserId,
  updateUserIdentityFromClerkUser,
} from '../db/identity';

type ClerkWebhookEvent = {
  type: string;
  data: unknown;
};

type OrgMembershipData = {
  public_user_data?: {
    user_id?: string;
  };
};

type BillingPayer = {
  user_id?: string;
  organization_id?: string;
};

type BillingPlan = {
  slug?: string;
};

type SubscriptionItemData = {
  payer?: BillingPayer;
  plan?: BillingPlan;
  status?: string;
  period_start?: number;
  active_at?: number;
};

const PRO_USER_PLAN_SLUG = 'pro_user';

function clerkTimestampToDate(value: number | undefined): Date {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return new Date();
  }

  const ms = value > 0 && value < 1_000_000_000_000 ? value * 1000 : value;
  return new Date(ms);
}

function getOrgMembershipUserId(data: OrgMembershipData): string | null {
  const userId = (data.public_user_data?.user_id || '').trim();
  return userId || null;
}

function getBillingUserId(data: SubscriptionItemData): string | null {
  const payer = data.payer;
  if (!payer) return null;
  if (payer.organization_id) return null;
  return (payer.user_id || '').trim() || null;
}

function getPlanSlug(data: SubscriptionItemData): string | null {
  return (data.plan?.slug || '').trim() || null;
}

async function trackAccountCreated(data: UserJSON, created: boolean): Promise<void> {
  if (!created) return;

  const identity = await getUserIdentityByClerkUserId(data.id);
  if (!identity) return;

  const occurredAt = identity.clerk_created_at;
  await trackServerAnalyticsEventOnce({
    userKey: identity.user_key,
    eventName: 'account_created',
    occurredAt,
    platform: 'web',
    userStatus: resolveUserStatus(identity, occurredAt),
    daysSinceSignup: 0,
    properties: {
      source: resolveAccountCreatedSource(data),
    },
  });
}

async function handleUserCreated(data: UserJSON) {
  const { identity, created } = await createUserIdentityFromClerkUser(data);
  await trackAccountCreated(data, created);
  return { ok: true as const, user_key: identity.user_key, clerk_user_id: identity.clerk_user_id };
}

async function handleUserUpdated(data: UserJSON) {
  const identity = await updateUserIdentityFromClerkUser(data);
  if (!identity) {
    const created = await createUserIdentityFromClerkUser(data);
    await trackAccountCreated(data, created.created);
    return {
      ok: true as const,
      user_key: created.identity.user_key,
      clerk_user_id: created.identity.clerk_user_id,
      upserted: true,
    };
  }

  return { ok: true as const, user_key: identity.user_key, clerk_user_id: identity.clerk_user_id };
}

async function handleUserDeleted(data: UserJSON) {
  const deleted = await deleteUserIdentityByClerkUserId(data.id);
  return { ok: true as const, deleted };
}

async function handleOrgMembershipCreated(data: OrgMembershipData) {
  const clerkUserId = getOrgMembershipUserId(data);
  if (!clerkUserId) {
    return { ok: true as const, ignored: 'missing user_id' };
  }

  const identity = await setOrgMembershipByClerkUserId(clerkUserId, true);
  if (!identity) {
    return { ok: true as const, ignored: 'user_identity not found' };
  }

  return {
    ok: true as const,
    user_key: identity.user_key,
    is_org_member: identity.is_org_member,
  };
}

async function handleOrgMembershipDeleted(data: OrgMembershipData) {
  const clerkUserId = getOrgMembershipUserId(data);
  if (!clerkUserId) {
    return { ok: true as const, ignored: 'missing user_id' };
  }

  const identity = await setOrgMembershipByClerkUserId(clerkUserId, false);
  if (!identity) {
    return { ok: true as const, ignored: 'user_identity not found' };
  }

  return {
    ok: true as const,
    user_key: identity.user_key,
    is_org_member: identity.is_org_member,
  };
}

async function handleSubscriptionItemActive(data: SubscriptionItemData) {
  const clerkUserId = getBillingUserId(data);
  const planSlug = getPlanSlug(data);

  if (!clerkUserId) {
    return { ok: true as const, ignored: 'org or missing payer.user_id' };
  }

  if (planSlug !== PRO_USER_PLAN_SLUG) {
    return { ok: true as const, ignored: `plan ${planSlug ?? 'unknown'}` };
  }

  const subscriptionStartedAt = clerkTimestampToDate(data.active_at ?? data.period_start);
  const identity = await setProSubscriptionByClerkUserId(clerkUserId, {
    isPro: true,
    subscriptionStartedAt,
  });

  if (!identity) {
    return { ok: true as const, ignored: 'user_identity not found' };
  }

  await trackServerAnalyticsEventOnce({
    userKey: identity.user_key,
    eventName: 'subscription_started',
    occurredAt: subscriptionStartedAt,
    platform: 'web',
    userStatus: resolveUserStatus(identity, subscriptionStartedAt),
    daysSinceSignup: daysSinceSignup(identity, subscriptionStartedAt),
    properties: {
      plan: planSlug,
    },
  });

  return {
    ok: true as const,
    user_key: identity.user_key,
    is_pro: identity.is_pro,
    plan: planSlug,
  };
}

async function handleSubscriptionItemEnded(data: SubscriptionItemData) {
  const clerkUserId = getBillingUserId(data);
  const planSlug = getPlanSlug(data);

  if (!clerkUserId) {
    return { ok: true as const, ignored: 'org or missing payer.user_id' };
  }

  if (planSlug !== PRO_USER_PLAN_SLUG) {
    return { ok: true as const, ignored: `plan ${planSlug ?? 'unknown'}` };
  }

  const identity = await setProSubscriptionByClerkUserId(clerkUserId, {
    isPro: false,
  });

  if (!identity) {
    return { ok: true as const, ignored: 'user_identity not found' };
  }

  return {
    ok: true as const,
    user_key: identity.user_key,
    is_pro: identity.is_pro,
    plan: planSlug,
  };
}

async function handleSubscriptionItemFreeTrialEnding(data: SubscriptionItemData) {
  const clerkUserId = getBillingUserId(data);
  if (!clerkUserId) {
    return { ok: true as const, ignored: 'org or missing payer.user_id' };
  }

  const trialEndedAt = new Date();
  const identity = await setProSubscriptionByClerkUserId(clerkUserId, {
    isPro: false,
    trialEndedAt,
  });

  if (!identity) {
    return { ok: true as const, ignored: 'user_identity not found' };
  }

  await trackServerAnalyticsEventOnce({
    userKey: identity.user_key,
    eventName: 'trial_ended',
    occurredAt: trialEndedAt,
    platform: 'web',
    userStatus: resolveUserStatus(identity, trialEndedAt),
    daysSinceSignup: daysSinceSignup(identity, trialEndedAt),
    properties: {},
  });

  return {
    ok: true as const,
    user_key: identity.user_key,
    trial_ended_at: trialEndedAt.toISOString(),
  };
}

export async function handleClerkWebhookEvent(event: ClerkWebhookEvent) {
  switch (event.type) {
    case 'user.created':
      return handleUserCreated(event.data as UserJSON);

    case 'user.updated':
      return handleUserUpdated(event.data as UserJSON);

    case 'user.deleted':
      return handleUserDeleted(event.data as UserJSON);

    case 'organizationMembership.created':
    case 'organizationMembership.updated':
      return handleOrgMembershipCreated(event.data as OrgMembershipData);

    case 'organizationMembership.deleted':
      return handleOrgMembershipDeleted(event.data as OrgMembershipData);

    case 'subscriptionItem.active':
      return handleSubscriptionItemActive(event.data as SubscriptionItemData);

    case 'subscriptionItem.canceled':
    case 'subscriptionItem.ended':
    case 'subscriptionItem.past_due':
    case 'subscriptionItem.abandoned':
    case 'subscriptionItem.incomplete':
      return handleSubscriptionItemEnded(event.data as SubscriptionItemData);

    case 'subscriptionItem.freeTrialEnding':
      return handleSubscriptionItemFreeTrialEnding(event.data as SubscriptionItemData);

    default:
      return { ok: true as const, ignored: event.type };
  }
}
