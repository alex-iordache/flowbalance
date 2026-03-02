import { NextResponse } from 'next/server';

import { isStatsAllowed } from '../../../../lib/statsAllow';
import { defaultFlows, t } from '../../../../data/flows';
import { getCategoryForFlowId } from '../../../../components/pages/flowsCatalog';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

type RangeKey = '24h' | '7d' | '30d' | '365d';

function coerceRange(v: string | null): RangeKey {
  if (v === '24h' || v === '7d' || v === '30d' || v === '365d') return v;
  return '7d';
}

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

type AplRow = Record<string, unknown>;

function tabularToObjects(tabular: any): AplRow[] {
  const table = tabular?.tables?.[0];
  const fields: { name: string }[] = table?.fields ?? [];
  const columns: unknown[][] = table?.columns ?? [];
  if (!Array.isArray(fields) || !Array.isArray(columns) || fields.length === 0) return [];

  const rows = columns[0]?.length ?? 0;
  const out: AplRow[] = [];

  for (let r = 0; r < rows; r++) {
    const row: AplRow = {};
    for (let c = 0; c < fields.length; c++) {
      row[fields[c]?.name ?? `col_${c}`] = columns[c]?.[r];
    }
    out.push(row);
  }

  return out;
}

function asString(v: unknown): string | null {
  return typeof v === 'string' && v.trim() ? v : null;
}

function asNumber(v: unknown): number {
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : 0;
}

export async function GET(request: Request) {
  const { allowed } = await isStatsAllowed();
  if (!allowed) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const url = new URL(request.url);
  const range = coerceRange(url.searchParams.get('range'));

  const token = getEnvOrThrow('AXIOM_TOKEN');
  const dataset = getEnvOrThrow('AXIOM_DATASET');
  const orgId = (process.env.AXIOM_ORG_ID ?? '').trim();

  // Vercel → Axiom log drain often stores console logs as JSON strings in a field like `message`.
  // Use `search` (schema-free), then parse JSON from whichever field exists.
  // We only count "initial" audio requests (rangeStart == 0 OR no rangeStart).
  const apl = `['${dataset}']
| search "*\\"event\\":\\"audio_access\\"*"
| extend __raw = coalesce(
    ensure_field('message', typeof(string)),
    ensure_field('line', typeof(string)),
    ensure_field('log', typeof(string)),
    ensure_field('msg', typeof(string))
  )
| extend __j = parse_json(__raw)
| where tostring(__j.event) == "audio_access"
| extend rangeStart = toint(__j.rangeStart)
| where isnull(rangeStart) or rangeStart == 0
| summarize accesses=count()
    by categoryId=tostring(__j.categoryId),
       flowId=tostring(__j.flowId),
       practiceId=tostring(__j.practiceId),
       audioKey=tostring(__j.audioKey)
| order by accesses desc
| limit 2000`;

  // APL query endpoint (standard): https://api.axiom.co/v1/datasets/_apl?format=tabular
  // (Edge deployments use a different base domain + /v1/query/_apl, but api.axiom.co works for typical setups.)
  const resp = await fetch('https://api.axiom.co/v1/datasets/_apl?format=tabular', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(orgId ? { 'x-axiom-org-id': orgId } : {}),
    },
    body: JSON.stringify({
      apl,
      startTime: startTimeForRange(range),
      endTime: 'now',
    }),
  });

  if (!resp.ok) {
    const txt = await resp.text().catch(() => '');
    return NextResponse.json(
      { error: 'axiom_query_failed', status: resp.status, details: txt.slice(0, 2000) },
      { status: 502 },
    );
  }

  const data = await resp.json();
  const rows = tabularToObjects(data);

  const flowsById = new Map(defaultFlows.map(f => [f.id, f]));

  const enriched = rows.map(r => {
    const flowId = asString(r.flowId);
    const practiceId = asString(r.practiceId);
    const categoryId = asString(r.categoryId);
    const audioKey = asString(r.audioKey);
    const accesses = asNumber((r as any).accesses);

    const flow = flowId ? flowsById.get(flowId) ?? null : null;
    const practice =
      flow && practiceId ? flow.practices.find(p => p.id === practiceId) ?? null : null;
    const category = flow ? getCategoryForFlowId(flow.id) : null;

    return {
      categoryId: categoryId ?? category?.id ?? null,
      categoryNameRo: category ? t(category.title, 'ro') : null,
      categoryNameEn: category ? t(category.title, 'en') : null,
      flowId,
      flowNameRo: flow ? t(flow.name, 'ro') : null,
      flowNameEn: flow ? t(flow.name, 'en') : null,
      practiceId,
      practiceNameRo: practice ? t(practice.name, 'ro') : null,
      practiceNameEn: practice ? t(practice.name, 'en') : null,
      audioKey,
      accesses,
    };
  });

  return NextResponse.json({ range, rows: enriched }, { status: 200 });
}

