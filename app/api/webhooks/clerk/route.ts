import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { NextRequest, NextResponse } from 'next/server';

import { hasDatabaseUrl } from '../../../../lib/db/client';
import { createUserIdentityFromClerkUser } from '../../../../lib/db/identity';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  if (!hasDatabaseUrl()) {
    console.error('Clerk webhook: DATABASE_URL is not configured');
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const signingSecret =
    (process.env.CLERK_WEBHOOK_SECRET || process.env.CLERK_WEBHOOK_SIGNING_SECRET || '').trim();
  if (!signingSecret) {
    console.error('Clerk webhook: CLERK_WEBHOOK_SECRET is not configured');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 503 });
  }

  let event;
  try {
    event = await verifyWebhook(req, { signingSecret });
  } catch (err) {
    console.error('Clerk webhook verification failed:', err);
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
  }

  if (event.type !== 'user.created') {
    return NextResponse.json({ ok: true, ignored: event.type });
  }

  try {
    const identity = await createUserIdentityFromClerkUser(event.data);
    return NextResponse.json({
      ok: true,
      user_key: identity.user_key,
      clerk_user_id: identity.clerk_user_id,
    });
  } catch (err) {
    console.error('Clerk user.created handler failed:', err);
    return NextResponse.json({ error: 'Failed to create user identity' }, { status: 500 });
  }
}
