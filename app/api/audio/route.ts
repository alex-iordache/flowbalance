import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import { fetchR2Object } from '../../../lib/r2';

export const runtime = 'nodejs';

const TRIAL_MS = 72 * 60 * 60 * 1000;
const TRIAL_CACHE_TTL_MS = 5 * 60 * 1000;
const trialCache = new Map<string, { trialUntilMs: number; checkedAtMs: number }>();

function normalizeAudioKey(input: string): string | null {
  let k = input.trim();
  if (!k) return null;

  // If someone passes a full URL (e.g. old data or testing), extract the pathname.
  if (k.startsWith('http://') || k.startsWith('https://')) {
    try {
      const u = new URL(k);
      k = u.pathname || '';
    } catch {
      return null;
    }
  }

  // Allow passing the legacy "/audio/<file>.mp3" path; map it to "<file>.mp3" in R2.
  if (k.startsWith('/')) k = k.slice(1);
  if (k.startsWith('audio/')) k = k.slice('audio/'.length);

  // Basic hardening.
  if (k.includes('..')) return null;
  if (!k.toLowerCase().endsWith('.mp3')) return null;

  return k;
}

async function computeTrialActive(userId: string): Promise<boolean> {
  const now = Date.now();
  const cached = trialCache.get(userId);
  if (cached && now - cached.checkedAtMs < TRIAL_CACHE_TTL_MS) {
    return now < cached.trialUntilMs;
  }

  const client = await clerkClient();
  const u = await client.users.getUser(userId);
  let createdAt = (u as unknown as { createdAt?: number }).createdAt;
  if (typeof createdAt !== 'number') {
    // Cache a "no trial" result briefly to avoid repeated backend calls.
    trialCache.set(userId, { trialUntilMs: 0, checkedAtMs: now });
    return false;
  }

  // Clerk backend User.createdAt is a number; treat it as ms, but accept seconds defensively.
  if (createdAt > 0 && createdAt < 1_000_000_000_000) createdAt *= 1000;

  const trialUntilMs = createdAt + TRIAL_MS;
  trialCache.set(userId, { trialUntilMs, checkedAtMs: now });
  return now < trialUntilMs;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  // Use `||` (not `??`) so empty strings don't "win" over a valid fallback.
  const keyParam = url.searchParams.get('key') || url.searchParams.get('path') || '';
  const key = normalizeAudioKey(keyParam);

  if (!key) {
    return NextResponse.json({ error: 'Invalid key' }, { status: 400 });
  }

  // Keep these params for compatibility (analytics/debug), but access is now trial-based for normal users.
  const flowId = url.searchParams.get('flowId');
  const practiceId = url.searchParams.get('practiceId');

  const authResult = await auth();
  const userId = authResult.userId ?? null;
  const orgId =
    // Clerk server auth object may expose orgId directly, but keep a safe fallback.
    ((authResult as unknown as { orgId?: string | null }).orgId ?? null) ||
    (((authResult.sessionClaims as any)?.org_id as string | undefined) ?? null);

  const hasFn = (authResult as unknown as { has?: (p: unknown) => boolean }).has;
  const hasPro = typeof hasFn === 'function' ? (hasFn({ plan: 'pro_user' }) as boolean) : false;

  // Org users and Pro users: full access.
  let hasAccess = Boolean(userId && (orgId || hasPro));
  // Normal users: 3-day full access trial from Clerk account creation date.
  if (!hasAccess && userId) {
    try {
      hasAccess = await computeTrialActive(userId);
    } catch {
      hasAccess = false;
    }
  }

  if (!hasAccess) {
    // Differentiate "not logged in" vs "no entitlement" where possible.
    const status = userId ? 403 : 401;
    return NextResponse.json({ error: status === 401 ? 'Not authenticated' : 'No access' }, { status });
  }

  const range = request.headers.get('range');
  const r2Res = await fetchR2Object({ key, rangeHeader: range });

  // Pass through status codes (e.g., 206 Partial Content, 404 Not Found)
  const outHeaders = new Headers();
  const passthrough = [
    'content-type',
    'content-length',
    'content-range',
    'accept-ranges',
    'etag',
    'last-modified',
  ];
  for (const h of passthrough) {
    const v = r2Res.headers.get(h);
    if (v) outHeaders.set(h, v);
  }

  // Prevent shared/proxy caching of gated content.
  outHeaders.set('cache-control', 'private, no-store');

  return new NextResponse(r2Res.body, { status: r2Res.status, headers: outHeaders });
}


