import type { UserJSON } from '@clerk/backend';

import { getSql } from './client';

export type UserIdentityRow = {
  user_key: string;
  clerk_user_id: string;
  email: string;
  email_verified: boolean;
  clerk_created_at: Date;
  is_org_member: boolean;
  is_pro: boolean;
};

export type CreateUserIdentityResult = {
  identity: UserIdentityRow;
  created: boolean;
};

const TRIAL_MS = 7 * 24 * 60 * 60 * 1000;

function pickPrimaryEmail(data: UserJSON): {
  email: string;
  emailVerified: boolean;
} {
  const addresses = data.email_addresses ?? [];
  const primary =
    addresses.find(a => a.id && a.id === data.primary_email_address_id) ??
    addresses[0];

  const email = (primary?.email_address || '').trim().toLowerCase();
  if (!email) {
    throw new Error(`Clerk user missing email for clerk_user_id=${data.id}`);
  }

  const emailVerified = primary?.verification?.status === 'verified';
  return { email, emailVerified };
}

function clerkTimestampToDate(value: number | undefined): Date {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return new Date();
  }

  const ms = value > 0 && value < 1_000_000_000_000 ? value * 1000 : value;
  return new Date(ms);
}

function asRows<T>(result: T[] | { rows: T[] }): T[] {
  if (Array.isArray(result)) return result;
  return result.rows;
}

function mapIdentityRow(row: Record<string, unknown>): UserIdentityRow {
  return {
    user_key: String(row.user_key),
    clerk_user_id: String(row.clerk_user_id),
    email: String(row.email),
    email_verified: Boolean(row.email_verified),
    clerk_created_at: new Date(String(row.clerk_created_at)),
    is_org_member: Boolean(row.is_org_member),
    is_pro: Boolean(row.is_pro),
  };
}

export function resolveUserStatus(identity: UserIdentityRow, at: Date = new Date()): string {
  if (identity.is_org_member) return 'org';
  if (identity.is_pro) return 'paid';
  if (at.getTime() < identity.clerk_created_at.getTime() + TRIAL_MS) return 'trial';
  return 'free';
}

export function daysSinceSignup(identity: UserIdentityRow, at: Date = new Date()): number {
  const diffMs = at.getTime() - identity.clerk_created_at.getTime();
  return Math.max(0, Math.floor(diffMs / (24 * 60 * 60 * 1000)));
}

export function resolveAccountCreatedSource(data: UserJSON): string {
  const unsafe = (data.unsafe_metadata ?? {}) as Record<string, unknown>;
  const pub = (data.public_metadata ?? {}) as Record<string, unknown>;

  const utm =
    (typeof unsafe.utm_source === 'string' && unsafe.utm_source.trim()) ||
    (typeof pub.source === 'string' && pub.source.trim()) ||
    (typeof pub.utm_source === 'string' && pub.utm_source.trim());
  if (utm) return utm;

  const oauth = (data.external_accounts ?? []).find(
    account => typeof account.provider === 'string' && account.provider.trim(),
  );
  if (oauth?.provider) return oauth.provider;

  return 'email';
}

export async function getUserIdentityByClerkUserId(
  clerkUserId: string,
): Promise<UserIdentityRow | null> {
  const sql = getSql();
  const rows = asRows(
    await sql`
      select
        user_key,
        clerk_user_id,
        email,
        email_verified,
        clerk_created_at,
        is_org_member,
        is_pro
      from user_identity
      where clerk_user_id = ${clerkUserId}
      limit 1
    `,
  );

  if (rows.length === 0) return null;
  return mapIdentityRow(rows[0] as Record<string, unknown>);
}

export async function createUserIdentityFromClerkUser(
  data: UserJSON,
): Promise<CreateUserIdentityResult> {
  const { email, emailVerified } = pickPrimaryEmail(data);
  const clerkCreatedAt = clerkTimestampToDate(data.created_at);
  const sql = getSql();

  const inserted = asRows(
    await sql`
      insert into user_identity (
        clerk_user_id,
        email,
        email_verified,
        clerk_created_at
      )
      values (
        ${data.id},
        ${email},
        ${emailVerified},
        ${clerkCreatedAt.toISOString()}
      )
      on conflict (clerk_user_id) do nothing
      returning
        user_key,
        clerk_user_id,
        email,
        email_verified,
        clerk_created_at,
        is_org_member,
        is_pro
    `,
  );

  if (inserted.length > 0) {
    return {
      identity: mapIdentityRow(inserted[0] as Record<string, unknown>),
      created: true,
    };
  }

  const existing = await getUserIdentityByClerkUserId(data.id);
  if (!existing) {
    throw new Error(`Failed to create or load user_identity for clerk_user_id=${data.id}`);
  }

  return { identity: existing, created: false };
}

export async function updateUserIdentityFromClerkUser(
  data: UserJSON,
): Promise<UserIdentityRow | null> {
  const { email, emailVerified } = pickPrimaryEmail(data);
  const sql = getSql();

  const updated = asRows(
    await sql`
      update user_identity
      set
        email = ${email},
        email_verified = ${emailVerified},
        updated_at = now()
      where clerk_user_id = ${data.id}
      returning
        user_key,
        clerk_user_id,
        email,
        email_verified,
        clerk_created_at,
        is_org_member,
        is_pro
    `,
  );

  if (updated.length === 0) return null;
  return mapIdentityRow(updated[0] as Record<string, unknown>);
}

export async function deleteUserIdentityByClerkUserId(clerkUserId: string): Promise<boolean> {
  const sql = getSql();
  const identity = await getUserIdentityByClerkUserId(clerkUserId);
  if (!identity) return false;

  await sql`delete from analytics_events where user_key = ${identity.user_key}`;
  const deleted = asRows(
    await sql`
      delete from user_identity
      where clerk_user_id = ${clerkUserId}
      returning clerk_user_id
    `,
  );

  return deleted.length > 0;
}

export async function setOrgMembershipByClerkUserId(
  clerkUserId: string,
  isOrgMember: boolean,
): Promise<UserIdentityRow | null> {
  const sql = getSql();
  const updated = asRows(
    await sql`
      update user_identity
      set
        is_org_member = ${isOrgMember},
        updated_at = now()
      where clerk_user_id = ${clerkUserId}
      returning
        user_key,
        clerk_user_id,
        email,
        email_verified,
        clerk_created_at,
        is_org_member,
        is_pro
    `,
  );

  if (updated.length === 0) return null;
  return mapIdentityRow(updated[0] as Record<string, unknown>);
}

export async function setProSubscriptionByClerkUserId(
  clerkUserId: string,
  input: {
    isPro: boolean;
    subscriptionStartedAt?: Date | null;
    trialEndedAt?: Date | null;
  },
): Promise<UserIdentityRow | null> {
  const sql = getSql();
  const updated = asRows(
    await sql`
      update user_identity
      set
        is_pro = ${input.isPro},
        subscription_started_at = case
          when ${input.isPro}
            then coalesce(
              subscription_started_at,
              ${input.subscriptionStartedAt?.toISOString() ?? null}::timestamptz,
              now()
            )
          else subscription_started_at
        end,
        trial_ended_at = coalesce(
          ${input.trialEndedAt?.toISOString() ?? null}::timestamptz,
          trial_ended_at
        ),
        updated_at = now()
      where clerk_user_id = ${clerkUserId}
      returning
        user_key,
        clerk_user_id,
        email,
        email_verified,
        clerk_created_at,
        is_org_member,
        is_pro
    `,
  );

  if (updated.length === 0) return null;
  return mapIdentityRow(updated[0] as Record<string, unknown>);
}
