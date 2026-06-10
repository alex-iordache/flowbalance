import { NextRequest, NextResponse } from 'next/server';

import { checkDatabaseHealth, hasDatabaseUrl } from '../../../../lib/db/client';
import { getInternalRequestSecret, isInternalRequest } from '../../../../lib/internal-request-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET(req: NextRequest) {
  if (!getInternalRequestSecret()) {
    console.error('DB health: CRON_SECRET is not configured');
    return NextResponse.json({ error: 'Health check not configured' }, { status: 503 });
  }

  if (!isInternalRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasDatabaseUrl()) {
    return NextResponse.json(
      {
        ok: false,
        database: 'unconfigured',
        error: 'DATABASE_URL not configured',
      },
      { status: 503 },
    );
  }

  const health = await checkDatabaseHealth();

  return NextResponse.json(
    {
      ok: health.ok,
      database: 'neon',
      latency_ms: health.latencyMs,
      migration_count: health.migrationCount ?? null,
      error: health.error ?? null,
    },
    { status: health.ok ? 200 : 503 },
  );
}
