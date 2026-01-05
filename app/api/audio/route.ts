import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import { defaultFlows } from '../../../data/flows';
import { fetchR2Object } from '../../../lib/r2';

export const runtime = 'nodejs';

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

function computePracticeAccess(params: {
  flowId?: string | null;
  practiceId?: string | null;
  userId: string | null;
  orgId: string | null;
  hasPro: boolean;
}): boolean {
  const { flowId, practiceId, userId, orgId, hasPro } = params;

  // Org users and Pro users: full access.
  if (userId && (orgId || hasPro)) return true;

  // No IDs: we can't map to the "free preview" rule.
  if (!flowId || !practiceId) return false;

  const flowIndex = defaultFlows.findIndex((f) => f.id === flowId);
  if (flowIndex < 0) return false;
  const practiceIndex = defaultFlows[flowIndex]?.practices?.findIndex((p) => p.id === practiceId) ?? -1;
  if (practiceIndex < 0) return false;

  // Mirror client rule: first practice of first flow is free.
  return flowIndex === 0 && practiceIndex === 0;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  // Use `||` (not `??`) so empty strings don't "win" over a valid fallback.
  const keyParam = url.searchParams.get('key') || url.searchParams.get('path') || '';
  const key = normalizeAudioKey(keyParam);

  if (!key) {
    return NextResponse.json({ error: 'Invalid key' }, { status: 400 });
  }

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

  const hasAccess = computePracticeAccess({ flowId, practiceId, userId, orgId, hasPro });

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


