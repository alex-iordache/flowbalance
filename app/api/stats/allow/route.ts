import { NextResponse } from 'next/server';

import { isStatsAllowed } from '../../../../lib/statsAllow';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET() {
  try {
    const { allowed } = await isStatsAllowed();
    return NextResponse.json({ allowed }, { status: 200 });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('stats allow error', err);
    return NextResponse.json({ allowed: false }, { status: 200 });
  }
}

