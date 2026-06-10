import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { NextRequest, NextResponse } from 'next/server';

import { handleClerkWebhookEvent } from '../../../../lib/clerk/webhook-handlers';
import { hasDatabaseUrl } from '../../../../lib/db/client';

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

  try {
    const result = await handleClerkWebhookEvent(event);
    return NextResponse.json(result);
  } catch (err) {
    console.error(`Clerk webhook handler failed for ${event.type}:`, err);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
