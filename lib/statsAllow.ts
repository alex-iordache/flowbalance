import { auth, clerkClient } from '@clerk/nextjs/server';

function normalizeEmail(s: unknown): string {
  return typeof s === 'string' ? s.trim().toLowerCase() : '';
}

function parseAllowedEmails(raw: string | undefined | null): Set<string> {
  const fallback = 'alex@flowbalance.app,simona@flowbalance.app';
  const csv = (raw && raw.trim() ? raw : fallback).split(',');
  const out = new Set<string>();
  for (const item of csv) {
    const e = normalizeEmail(item);
    if (e) out.add(e);
  }
  return out;
}

export async function statsIsEnabled(): Promise<boolean> {
  const v = (process.env.STATS_ENABLED ?? '').trim();
  // Default: enabled. Set STATS_ENABLED=0 to disable.
  if (!v) return true;
  return v === '1' || v.toLowerCase() === 'true';
}

export async function isStatsAllowed(): Promise<{ allowed: boolean; email: string | null }> {
  const enabled = await statsIsEnabled();
  if (!enabled) return { allowed: false, email: null };

  const { userId } = await auth();
  if (!userId) return { allowed: false, email: null };

  const client = await clerkClient();
  const u = await client.users.getUser(userId);
  const email = normalizeEmail(u.primaryEmailAddress?.emailAddress);
  if (!email) return { allowed: false, email: null };

  const allowed = parseAllowedEmails(process.env.STATS_ALLOWED_EMAILS).has(email);
  return { allowed, email };
}

