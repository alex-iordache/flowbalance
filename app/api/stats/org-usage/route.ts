import { NextResponse } from 'next/server';

import { isStatsAllowed } from '../../../../lib/statsAllow';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

type RangeKey = '24h' | '7d' | '30d' | '365d';

function startTimeForRange(range: RangeKey): string {
  switch (range) {
    case '24h':
      return 'now-24h';
    case '7d':
      return 'now-7d';
    case '30d':
      return 'now-30d';
    case '365d':
      return 'now-365d';
  }
}

function getEnvOrThrow(name: string): string {
  const v = process.env[name];
  if (!v || !v.trim()) throw new Error(`Missing env var: ${name}`);
  return v.trim();
}

type TabularField = { name: string };

function tabularToObjects(tabular: any): Array<Record<string, unknown>> {
  const table = tabular?.tables?.[0];
  const fields: TabularField[] = table?.fields ?? [];
  const columns: unknown[][] = table?.columns ?? [];
  if (!Array.isArray(fields) || !Array.isArray(columns) || fields.length === 0) return [];

  const rows = columns[0]?.length ?? 0;
  const out: Array<Record<string, unknown>> = [];
  for (let r = 0; r < rows; r++) {
    const row: Record<string, unknown> = {};
    for (let c = 0; c < fields.length; c++) {
      row[fields[c]?.name ?? `col_${c}`] = columns[c]?.[r];
    }
    out.push(row);
  }
  return out;
}

function asNumber(v: unknown): number {
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : 0;
}

function sanitizeOrgId(v: string | null): string | null {
  if (!v) return null;
  const s = v.trim();
  if (!s) return null;
  // Clerk org IDs look like `org_...`, but keep this permissive and just bound length.
  if (s.length > 200) return null;
  return s;
}

async function queryAxiom(params: { dataset: string; token: string; orgIdHeader: string; apl: string; startTime: string }) {
  const { dataset, token, orgIdHeader, apl, startTime } = params;
  const resp = await fetch('https://api.axiom.co/v1/datasets/_apl?format=tabular', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(orgIdHeader ? { 'x-axiom-org-id': orgIdHeader } : {}),
    },
    body: JSON.stringify({ apl, startTime, endTime: 'now' }),
  });
  if (!resp.ok) {
    const txt = await resp.text().catch(() => '');
    throw new Error(`axiom ${resp.status}: ${txt.slice(0, 500)}`);
  }
  return resp.json();
}

export async function GET(request: Request) {
  const { allowed } = await isStatsAllowed();
  if (!allowed) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const url = new URL(request.url);
  const targetOrgId = sanitizeOrgId(url.searchParams.get('orgId'));
  if (!targetOrgId) return NextResponse.json({ error: 'invalid_orgId' }, { status: 400 });

  const token = getEnvOrThrow('AXIOM_TOKEN');
  const dataset = getEnvOrThrow('AXIOM_DATASET');
  const orgIdHeader = (process.env.AXIOM_ORG_ID ?? '').trim();

  const ranges: RangeKey[] = ['24h', '7d', '30d', '365d'];

  // Query format: search for our console JSON payload, parse it, filter by orgId,
  // then compute activeDevices as distinct installId and total plays as count().
  const makeApl = (orgId: string) => `['${dataset}']
| search "*\\\"event\\\":\\\"audio_access\\\"*"
| extend __raw = coalesce(
    ensure_field('message', typeof(string)),
    ensure_field('line', typeof(string)),
    ensure_field('log', typeof(string)),
    ensure_field('msg', typeof(string))
  )
| extend __j = parse_json(__raw)
| where tostring(__j.event) == "audio_access"
| where tostring(__j.orgId) == "${orgId.replace(/\"/g, '')}"
| extend rangeStart = toint(__j.rangeStart)
| where isnull(rangeStart) or rangeStart == 0
| where isnotempty(tostring(__j.installId))
| summarize activeDevices=dcount(tostring(__j.installId)), plays=count()`;

  const apl = makeApl(targetOrgId);

  try {
    const results = await Promise.all(
      ranges.map(async r => {
        const data = await queryAxiom({
          dataset,
          token,
          orgIdHeader,
          apl,
          startTime: startTimeForRange(r),
        });
        const rows = tabularToObjects(data);
        const first = rows[0] ?? {};
        return {
          range: r,
          activeDevices: asNumber((first as any).activeDevices),
          plays: asNumber((first as any).plays),
        };
      }),
    );

    const byRange = Object.fromEntries(results.map(r => [r.range, { activeDevices: r.activeDevices, plays: r.plays }]));
    return NextResponse.json({ orgId: targetOrgId, ranges: byRange }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'axiom_query_failed', details: String(err?.message || err).slice(0, 1000) },
      { status: 502 },
    );
  }
}

