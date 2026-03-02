'use client';

import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Store from '../../store';
import * as selectors from '../../store/selectors';
import { isDesktopWeb } from '../admin/adminEnv';

type RangeKey = '24h' | '7d' | '30d' | '365d';

type ContentRow = {
  categoryId: string | null;
  categoryNameRo: string | null;
  categoryNameEn: string | null;
  flowId: string | null;
  flowNameRo: string | null;
  flowNameEn: string | null;
  practiceId: string | null;
  practiceNameRo: string | null;
  practiceNameEn: string | null;
  audioKey: string | null;
  accesses: number;
};

function fmt(n: number): string {
  try {
    return new Intl.NumberFormat().format(n);
  } catch {
    return String(n);
  }
}

function sumBy<T extends string | null>(
  rows: ContentRow[],
  key: (r: ContentRow) => T,
): Array<{ key: string; count: number; nameRo?: string | null; nameEn?: string | null }> {
  const map = new Map<string, { count: number; nameRo?: string | null; nameEn?: string | null }>();
  for (const r of rows) {
    const k = key(r);
    if (!k) continue;
    const prev = map.get(k) ?? { count: 0 };
    map.set(k, {
      count: prev.count + (Number.isFinite(r.accesses) ? r.accesses : 0),
      nameRo: prev.nameRo ?? r.categoryNameRo ?? r.flowNameRo ?? r.practiceNameRo ?? null,
      nameEn: prev.nameEn ?? r.categoryNameEn ?? r.flowNameEn ?? r.practiceNameEn ?? null,
    });
  }
  return Array.from(map.entries())
    .map(([k, v]) => ({ key: k, count: v.count, nameRo: v.nameRo, nameEn: v.nameEn }))
    .sort((a, b) => b.count - a.count);
}

function parseErrorMessage(raw: unknown): string {
  if (typeof raw === 'string' && raw.trim()) return raw.trim();
  if (raw && typeof raw === 'object') {
    const anyRaw = raw as any;
    if (typeof anyRaw.details === 'string' && anyRaw.details.trim()) return anyRaw.details.trim();
    if (typeof anyRaw.error === 'string' && anyRaw.error.trim()) return anyRaw.error.trim();
    try {
      return JSON.stringify(raw);
    } catch {}
  }
  return 'Unknown error';
}

function safeJsonParse(txt: string): unknown {
  try {
    return JSON.parse(txt);
  } catch {
    return null;
  }
}

export default function AudioStats() {
  const history = useHistory();
  const settings = Store.useState(selectors.selectSettings);
  const isRo = settings.language === 'ro';

  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [contentRange, setContentRange] = useState<RangeKey>('7d');
  const [contentLoading, setContentLoading] = useState(false);
  const [contentRows, setContentRows] = useState<ContentRow[]>([]);
  const [contentError, setContentError] = useState<string | null>(null);

  useEffect(() => {
    if (!isDesktopWeb()) {
      history.replace('/settings');
      return;
    }

    let cancelled = false;
    const ctrl = new AbortController();

    window
      .fetch('/api/stats/allow', { signal: ctrl.signal })
      .then(r => r.json())
      .then(data => {
        if (cancelled) return;
        const ok = Boolean(data?.allowed);
        setAllowed(ok);
        if (!ok) history.replace('/settings');
      })
      .catch(() => {
        if (cancelled) return;
        setAllowed(false);
        history.replace('/settings');
      });

    return () => {
      cancelled = true;
      ctrl.abort();
    };
  }, [history]);

  useEffect(() => {
    if (allowed !== true) return;

    let cancelled = false;
    const ctrl = new AbortController();
    setContentLoading(true);
    setContentError(null);

    window
      .fetch(`/api/stats/audio?range=${encodeURIComponent(contentRange)}`, { signal: ctrl.signal })
      .then(async r => {
        const txt = await r.text().catch(() => '');
        const json = txt ? safeJsonParse(txt) : null;
        if (!r.ok) throw new Error(parseErrorMessage(json ?? txt ?? `HTTP ${r.status}`));
        return json;
      })
      .then((data: any) => {
        if (cancelled) return;
        setContentRows(Array.isArray(data?.rows) ? (data.rows as ContentRow[]) : []);
      })
      .catch((err: any) => {
        if (cancelled) return;
        setContentRows([]);
        setContentError(
          (isRo ? 'Nu am putut încărca statisticile.' : 'Could not load stats.') +
            ' ' +
            String(err?.message || err || ''),
        );
      })
      .finally(() => {
        if (cancelled) return;
        setContentLoading(false);
      });

    return () => {
      cancelled = true;
      ctrl.abort();
    };
  }, [allowed, contentRange, isRo]);

  const contentTotals = useMemo(() => {
    const total = contentRows.reduce(
      (acc, r) => acc + (Number.isFinite(r.accesses) ? r.accesses : 0),
      0,
    );
    const byCategory = sumBy(contentRows, r => r.categoryId);
    const byFlow = sumBy(contentRows, r => r.flowId);
    const byPractice = sumBy(contentRows, r =>
      r.flowId && r.practiceId ? `${r.flowId}__${r.practiceId}` : null,
    );
    return { total, byCategory, byFlow, byPractice };
  }, [contentRows]);

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#FBF7F2',
    border: '1px solid rgba(232, 222, 211, 0.85)',
    boxShadow: '0 10px 24px rgba(120, 95, 70, 0.08)',
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/settings" />
          </IonButtons>
          <IonTitle>{isRo ? 'Statistici audio' : 'Audio stats'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <div className="px-5 py-5 pb-10 w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto flex flex-col gap-4">
          <div className="rounded-[16px] p-4 md:p-5" style={cardStyle}>
            <div className="text-[14px] md:text-[16px] font-semibold" style={{ color: '#4E5B4F' }}>
              {isRo ? 'Perioadă' : 'Range'}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(['24h', '7d', '30d', '365d'] as RangeKey[]).map(k => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setContentRange(k)}
                  className="px-3 py-2 rounded-[999px] text-[13px] font-semibold"
                  style={{
                    backgroundColor:
                      contentRange === k ? 'rgba(197, 122, 74, 0.20)' : 'rgba(78, 91, 79, 0.06)',
                    color: '#4E5B4F',
                    border:
                      contentRange === k
                        ? '1px solid rgba(197, 122, 74, 0.35)'
                        : '1px solid rgba(232, 222, 211, 0.85)',
                  }}
                >
                  {k === '24h' ? (isRo ? 'Ultimele 24h' : 'Last 24h') : k}
                </button>
              ))}
            </div>
            <div
              className="mt-3 text-[13px]"
              style={{ color: '#7A746C', fontFamily: 'var(--font-logo), ui-serif, Georgia, serif' }}
            >
              {isRo ? 'Total accesări (estimare): ' : 'Total accesses (estimate): '}
              <span style={{ color: '#4E5B4F', fontWeight: 700 }}>{fmt(contentTotals.total)}</span>
              {contentLoading ? <span> …</span> : null}
            </div>
            {contentError ? (
              <div
                className="mt-2 text-[13px]"
                style={{
                  color: 'rgba(255, 59, 48, 0.85)',
                  fontFamily: 'var(--font-logo), ui-serif, Georgia, serif',
                }}
              >
                {contentError}
              </div>
            ) : null}
            {!contentError && !contentLoading && contentRows.length === 0 ? (
              <div
                className="mt-2 text-[13px]"
                style={{ color: '#7A746C', fontFamily: 'var(--font-logo), ui-serif, Georgia, serif' }}
              >
                {isRo ? 'Nu există date încă.' : 'No data yet.'}
              </div>
            ) : null}
          </div>

          {([
            { title: isRo ? 'Top categorii' : 'Top categories', items: contentTotals.byCategory },
            { title: isRo ? 'Top flows' : 'Top flows', items: contentTotals.byFlow },
            { title: isRo ? 'Top practici' : 'Top practices', items: contentTotals.byPractice },
          ] as const).map(section => (
            <div key={section.title} className="rounded-[16px] p-4 md:p-5" style={cardStyle}>
              <div className="text-[14px] md:text-[16px] font-semibold" style={{ color: '#4E5B4F' }}>
                {section.title}
              </div>
              <div className="mt-3 flex flex-col gap-2">
                {section.items.slice(0, 20).map((it, idx) => (
                  <div key={it.key} className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[13px]" style={{ color: '#4E5B4F', fontWeight: 700 }}>
                        {idx + 1}. {isRo ? (it.nameRo ?? it.key) : (it.nameEn ?? it.key)}
                      </div>
                      <div
                        className="text-[12px] truncate"
                        style={{ color: '#7A746C', fontFamily: 'var(--font-logo), ui-serif, Georgia, serif' }}
                      >
                        {it.key}
                      </div>
                    </div>
                    <div className="shrink-0 text-[13px]" style={{ color: '#4E5B4F', fontWeight: 700 }}>
                      {fmt(it.count)}
                    </div>
                  </div>
                ))}
                {section.items.length === 0 && !contentLoading && !contentError ? (
                  <div
                    className="text-[13px]"
                    style={{ color: '#7A746C', fontFamily: 'var(--font-logo), ui-serif, Georgia, serif' }}
                  >
                    {isRo ? 'Nu există date încă.' : 'No data yet.'}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
}
