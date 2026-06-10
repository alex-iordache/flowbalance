import type { UserJSON } from '@clerk/backend';

import { getSql } from './client';

export type UserIdentityRow = {
  user_key: string;
  clerk_user_id: string;
  email: string;
  email_verified: boolean;
  clerk_created_at: Date;
};

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
    throw new Error(`Clerk user.created missing email for clerk_user_id=${data.id}`);
  }

  const emailVerified = primary?.verification?.status === 'verified';
  return { email, emailVerified };
}

function clerkCreatedAtToDate(createdAt: number | undefined): Date {
  if (typeof createdAt !== 'number' || !Number.isFinite(createdAt)) {
    return new Date();
  }

  // Clerk webhook timestamps are ms; accept seconds defensively.
  const ms = createdAt > 0 && createdAt < 1_000_000_000_000 ? createdAt * 1000 : createdAt;
  return new Date(ms);
}

function asRows<T>(result: T[] | { rows: T[] }): T[] {
  if (Array.isArray(result)) return result;
  return result.rows;
}

export async function createUserIdentityFromClerkUser(data: UserJSON): Promise<UserIdentityRow> {
  const { email, emailVerified } = pickPrimaryEmail(data);
  const clerkCreatedAt = clerkCreatedAtToDate(data.created_at);
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
      returning user_key, clerk_user_id, email, email_verified, clerk_created_at
    `,
  );

  if (inserted.length > 0) {
    return inserted[0] as UserIdentityRow;
  }

  const existing = asRows(
    await sql`
      select user_key, clerk_user_id, email, email_verified, clerk_created_at
      from user_identity
      where clerk_user_id = ${data.id}
      limit 1
    `,
  );

  if (existing.length === 0) {
    throw new Error(`Failed to create or load user_identity for clerk_user_id=${data.id}`);
  }

  return existing[0] as UserIdentityRow;
}
