#!/usr/bin/env node
/**
 * Backfill user_identity from all Clerk users (one-time / repeatable).
 *
 * Inserts missing rows with the same core fields as user.created webhook:
 *   clerk_user_id, email, email_verified, clerk_created_at, is_org_member, is_pro,
 *   subscription_started_at, trial_ended_at (inferred for expired retail trials)
 *
 * Does NOT insert account_created analytics (historical users). Webhook handles new signups.
 *
 * Usage:
 *   npm run db:backfill-users
 *   npm run db:backfill-users -- --dry-run
 *   npm run db:backfill-users -- --update-existing
 *
 * Requires: DATABASE_URL, CLERK_SECRET_KEY (from .env.local)
 */
const fs = require('fs');
const path = require('path');
const { Pool } = require('@neondatabase/serverless');
const { createClerkClient } = require('@clerk/backend');

const projectRoot = path.join(__dirname, '..');
const PRO_USER_PLAN_SLUG = 'pro_user';
const TRIAL_MS = 7 * 24 * 60 * 60 * 1000;
const CLERK_API_VERSION = '2025-11-10';

function loadEnvFile(filename) {
  const fullPath = path.join(projectRoot, filename);
  if (!fs.existsSync(fullPath)) return;

  for (const line of fs.readFileSync(fullPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvFile('.env');
loadEnvFile('.env.local');

function mustEnv(name) {
  const value = (process.env[name] || '').trim();
  if (!value) {
    console.error(`Missing env var: ${name}`);
    process.exit(1);
  }
  return value;
}

function parseArgs(argv) {
  return {
    dryRun: argv.includes('--dry-run'),
    updateExisting: argv.includes('--update-existing'),
  };
}

function pickPrimaryEmail(user) {
  const addresses = user.emailAddresses ?? [];
  const primary =
    addresses.find(a => a.id && a.id === user.primaryEmailAddressId) ?? addresses[0];

  const email = (primary?.emailAddress || '').trim().toLowerCase();
  if (!email) return null;

  const emailVerified = primary?.verification?.status === 'verified';
  return { email, emailVerified };
}

function clerkTimestampToIso(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return new Date().toISOString();
  }

  const ms = value > 0 && value < 1_000_000_000_000 ? value * 1000 : value;
  return new Date(ms).toISOString();
}

async function fetchUserBillingSubscription(clerkSecretKey, clerkUserId) {
  const response = await fetch(
    `https://api.clerk.com/v1/users/${encodeURIComponent(clerkUserId)}/billing/subscription`,
    {
      headers: {
        Authorization: `Bearer ${clerkSecretKey}`,
        'Clerk-API-Version': CLERK_API_VERSION,
      },
    },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Billing API ${response.status} for ${clerkUserId}: ${body.slice(0, 200)}`);
  }

  return response.json();
}

function resolveBillingState(subscription) {
  if (!subscription) {
    return { isPro: false, subscriptionStartedAt: null };
  }

  const items = Array.isArray(subscription.subscription_items)
    ? subscription.subscription_items
    : [];

  const activeProItem = items.find(
    item =>
      item?.status === 'active' &&
      item?.plan?.slug === PRO_USER_PLAN_SLUG,
  );

  if (!activeProItem) {
    return { isPro: false, subscriptionStartedAt: null };
  }

  const startedMs =
    activeProItem.period_start ??
    subscription.active_at ??
    subscription.created_at ??
    null;

  return {
    isPro: true,
    subscriptionStartedAt:
      typeof startedMs === 'number' ? new Date(startedMs).toISOString() : null,
  };
}

function resolveTrialEndedAt({ clerkCreatedAtIso, isOrgMember, isPro, now = new Date() }) {
  if (isOrgMember || isPro) return null;

  const createdAt = new Date(clerkCreatedAtIso);
  const trialEnd = new Date(createdAt.getTime() + TRIAL_MS);
  if (now.getTime() < trialEnd.getTime()) return null;

  return trialEnd.toISOString();
}

async function userHasOrgMembership(clerk, clerkUserId) {
  const memberships = await clerk.users.getOrganizationMembershipList({
    userId: clerkUserId,
    limit: 1,
  });
  return (memberships.totalCount ?? memberships.data?.length ?? 0) > 0;
}

async function identityExists(client, clerkUserId) {
  const result = await client.query(
    'select user_key from user_identity where clerk_user_id = $1 limit 1',
    [clerkUserId],
  );
  return result.rows.length > 0;
}

async function insertIdentity(client, row) {
  await client.query(
    `
      insert into user_identity (
        clerk_user_id,
        email,
        email_verified,
        clerk_created_at,
        is_org_member,
        is_pro,
        subscription_started_at,
        trial_ended_at
      )
      values ($1, $2, $3, $4::timestamptz, $5, $6, $7::timestamptz, $8::timestamptz)
    `,
    [
      row.clerkUserId,
      row.email,
      row.emailVerified,
      row.clerkCreatedAtIso,
      row.isOrgMember,
      row.isPro,
      row.subscriptionStartedAt,
      row.trialEndedAt,
    ],
  );
}

async function updateIdentity(client, row) {
  await client.query(
    `
      update user_identity
      set
        email = $2,
        email_verified = $3,
        is_org_member = $4,
        is_pro = $5,
        subscription_started_at = case
          when $5 then coalesce(subscription_started_at, $6::timestamptz)
          else subscription_started_at
        end,
        trial_ended_at = coalesce($7::timestamptz, trial_ended_at),
        updated_at = now()
      where clerk_user_id = $1
    `,
    [
      row.clerkUserId,
      row.email,
      row.emailVerified,
      row.isOrgMember,
      row.isPro,
      row.subscriptionStartedAt,
      row.trialEndedAt,
    ],
  );
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const databaseUrl = mustEnv('DATABASE_URL');
  const clerkSecretKey = mustEnv('CLERK_SECRET_KEY');

  const clerk = createClerkClient({ secretKey: clerkSecretKey });
  const pool = new Pool({ connectionString: databaseUrl });
  const client = await pool.connect();

  const stats = {
    scanned: 0,
    inserted: 0,
    updated: 0,
    skippedExisting: 0,
    skippedNoEmail: 0,
    failed: 0,
  };

  try {
    console.log(
      `Clerk user backfill starting${args.dryRun ? ' (dry-run)' : ''}${
        args.updateExisting ? ' (update-existing)' : ''
      }...`,
    );

    let offset = 0;
    const limit = 100;

    for (let page = 0; page < 500; page++) {
      const list = await clerk.users.getUserList({ limit, offset });
      const users = list.data ?? [];

      if (users.length === 0) break;

      for (const user of users) {
        stats.scanned += 1;

        try {
          const emailInfo = pickPrimaryEmail(user);
          if (!emailInfo) {
            stats.skippedNoEmail += 1;
            console.warn(`skip ${user.id}: no email`);
            continue;
          }

          const exists = await identityExists(client, user.id);
          if (exists && !args.updateExisting) {
            stats.skippedExisting += 1;
            continue;
          }

          const isOrgMember = await userHasOrgMembership(clerk, user.id);
          const subscription = await fetchUserBillingSubscription(clerkSecretKey, user.id);
          const billing = resolveBillingState(subscription);
          const clerkCreatedAtIso = clerkTimestampToIso(user.createdAt);
          const trialEndedAt = resolveTrialEndedAt({
            clerkCreatedAtIso,
            isOrgMember,
            isPro: billing.isPro,
          });

          const row = {
            clerkUserId: user.id,
            email: emailInfo.email,
            emailVerified: emailInfo.emailVerified,
            clerkCreatedAtIso,
            isOrgMember,
            isPro: billing.isPro,
            subscriptionStartedAt: billing.subscriptionStartedAt,
            trialEndedAt,
          };

          if (args.dryRun) {
            console.log(
              `${exists ? 'would update' : 'would insert'} ${user.id} ${row.email} org=${row.isOrgMember} pro=${row.isPro}`,
            );
            if (exists) stats.updated += 1;
            else stats.inserted += 1;
            continue;
          }

          if (exists) {
            await updateIdentity(client, row);
            stats.updated += 1;
            console.log(`updated ${user.id} ${row.email}`);
          } else {
            await insertIdentity(client, row);
            stats.inserted += 1;
            console.log(`inserted ${user.id} ${row.email}`);
          }
        } catch (err) {
          stats.failed += 1;
          console.error(`failed ${user.id}:`, err);
        }
      }

      if (users.length < limit) break;
      offset += users.length;
    }

    console.log('Backfill complete.', stats);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
