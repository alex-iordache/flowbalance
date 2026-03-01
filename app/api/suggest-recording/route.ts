import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

type Payload = {
  categoryId?: unknown;
  categoryLabel?: unknown;
  suggestion?: unknown;
  // honeypot
  company?: unknown;
};

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 8;
const rate = new Map<string, { count: number; windowStartMs: number }>();

function getClientIp(req: Request): string {
  const xf = req.headers.get('x-forwarded-for') ?? '';
  const ip = xf.split(',')[0]?.trim();
  return ip || 'unknown';
}

function allowRateLimit(ip: string): boolean {
  const now = Date.now();
  const cur = rate.get(ip);
  if (!cur || now - cur.windowStartMs > RATE_LIMIT_WINDOW_MS) {
    rate.set(ip, { count: 1, windowStartMs: now });
    return true;
  }
  if (cur.count >= RATE_LIMIT_MAX) return false;
  cur.count += 1;
  rate.set(ip, cur);
  return true;
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (!allowRateLimit(ip)) {
      return NextResponse.json({ error: 'Rate limited' }, { status: 429 });
    }

    const body = (await req.json()) as Payload;

    // Honeypot: if filled, accept silently (bot).
    const company = typeof body?.company === 'string' ? body.company.trim() : '';
    if (company) return NextResponse.json({ ok: true }, { status: 200 });

    const categoryId = typeof body?.categoryId === 'string' ? body.categoryId.trim() : '';
    const categoryLabel = typeof body?.categoryLabel === 'string' ? body.categoryLabel.trim() : '';
    const suggestion = typeof body?.suggestion === 'string' ? body.suggestion.trim() : '';

    if (!categoryId || categoryId.length > 80) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }
    if (!suggestion || suggestion.length < 10 || suggestion.length > 2000) {
      return NextResponse.json({ error: 'Invalid suggestion' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
    }

    const to = process.env.SUGGEST_RECORDING_TO_EMAIL || 'simona.nicolaescu@dynamichr.ro';
    // IMPORTANT: For non-test recipients, Resend requires `from` to be on a verified domain.
    const from = process.env.SUGGEST_RECORDING_FROM_EMAIL || 'Flow Balance <suggestions@flowbalance.app>';

    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to,
      subject: `Flow Balance • Suggest a recording (${categoryLabel || categoryId})`,
      text: [
        `Category: ${categoryLabel || ''}`.trim(),
        `CategoryId: ${categoryId}`,
        '',
        suggestion,
      ].join('\n'),
    });

    // Resend SDK returns { data, error } and may not throw on non-2xx.
    if ((result as any)?.error) {
      // eslint-disable-next-line no-console
      console.error('resend send error', (result as any).error);
      const msg =
        typeof (result as any).error?.message === 'string'
          ? (result as any).error.message
          : 'Resend rejected the request';
      return NextResponse.json({ error: msg }, { status: 502 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('suggest-recording error', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}

