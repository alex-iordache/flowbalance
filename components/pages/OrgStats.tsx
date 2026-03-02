'use client';

import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Store from '../../store';
import * as selectors from '../../store/selectors';
import { isDesktopWeb } from '../admin/adminEnv';

type RangeKey = '24h' | '7d' | '30d' | '365d';

type Org = { id: string; name: string; slug: string | null };
type OrgUsage = { activeDevices: number; plays: number };

function fmt(n: number): string {
  try {
    return new Intl.NumberFormat().format(n);
  } catch {
    return String(n);
  }
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

const RANGE_LABEL: Record<RangeKey, { ro: string; en: string }> = {
  '24h': { ro: 'Ultimele 24h', en: 'Last 24h' },
  '7d': { ro: 'Ultimele 7 zile', en: 'Last 7 days' },
  '30d': { ro: 'Ultimele 30 zile', en: 'Last 30 days' },
  '365d': { ro: 'Ultimul an', en: 'Last year' },
};

export default function OrgStats() {
  const history = useHistory();
  const settings = Store.useState(selectors.selectSettings);
  const isRo = settings.language === 'ro';

  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [orgsLoading, setOrgsLoading] = useState(false);
  const [selectedOrgId, setSelectedOrgId] = useState<string>('');

  const [usageLoading, setUsageLoading] = useState(false);
  const [usageByRange, setUsageByRange] = useState<Record<RangeKey, OrgUsage> | null>(null);
  const [orgsError, setOrgsError] = useState<string | null>(null);
  const [orgUsageError, setOrgUsageError] = useState<string | null>(null);

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
    setOrgsError(null);
    setOrgsLoading(true);

    window
      .fetch('/api/stats/orgs', { signal: ctrl.signal })
      .then(async r => {
        const txt = await r.text().catch(() => '');
        const json = txt ? safeJsonParse(txt) : null;
        if (!r.ok) throw new Error(parseErrorMessage(json ?? txt ?? `HTTP ${r.status}`));
        return json;
      })
      .then((data: any) => {
        if (cancelled) return;
        const list = Array.isArray(data?.orgs) ? (data.orgs as Org[]) : [];
        setOrgs(list);
        if (list[0]?.id) setSelectedOrgId(prev => (prev ? prev : list[0].id));
      })
      .catch((err: any) => {
        if (cancelled) return;
        setOrgs([]);
        setOrgsError(
          (isRo ? 'Nu am putut încărca organizațiile.' : 'Could not load organizations.') +
            ' ' +
            String(err?.message || err || ''),
        );
      })
      .finally(() => {
        if (cancelled) return;
        setOrgsLoading(false);
      });

    return () => {
      cancelled = true;
      ctrl.abort();
    };
  }, [allowed, isRo]);

  useEffect(() => {
    if (allowed !== true) return;
    if (!selectedOrgId) return;

    let cancelled = false;
    const ctrl = new AbortController();
    setUsageLoading(true);
    setOrgUsageError(null);

    window
      .fetch(`/api/stats/org-usage?orgId=${encodeURIComponent(selectedOrgId)}`, { signal: ctrl.signal })
      .then(async r => {
        const txt = await r.text().catch(() => '');
        const json = txt ? safeJsonParse(txt) : null;
        if (!r.ok) throw new Error(parseErrorMessage(json ?? txt ?? `HTTP ${r.status}`));
        return json;
      })
      .then((data: any) => {
        if (cancelled) return;
        const ranges = data?.ranges;
        if (!ranges || typeof ranges !== 'object') {
          setUsageByRange(null);
          return;
        }
        setUsageByRange(ranges as Record<RangeKey, OrgUsage>);
      })
      .catch((err: any) => {
        if (cancelled) return;
        setUsageByRange(null);
        setOrgUsageError(
          (isRo ? 'Nu am putut încărca statisticile.' : 'Could not load stats.') +
            ' ' +
            String(err?.message || err || ''),
        );
      })
      .finally(() => {
        if (cancelled) return;
        setUsageLoading(false);
      });

    return () => {
      cancelled = true;
      ctrl.abort();
    };
  }, [allowed, selectedOrgId, isRo]);

  const selectedOrg = useMemo(
    () => orgs.find(o => o.id === selectedOrgId) ?? null,
    [orgs, selectedOrgId],
  );

  const orgHasAnyStats = useMemo(() => {
    if (!usageByRange) return false;
    return (['24h', '7d', '30d', '365d'] as RangeKey[]).some(r => {
      const u = usageByRange[r];
      const active = Number.isFinite(u?.activeDevices) ? u.activeDevices : 0;
      const plays = Number.isFinite(u?.plays) ? u.plays : 0;
      return active > 0 || plays > 0;
    });
  }, [usageByRange]);

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
          <IonTitle>{isRo ? 'Statistici organizații' : 'Organisation stats'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <div className="px-5 py-5 pb-10 w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto flex flex-col gap-4">
          <div className="rounded-[16px] p-4 md:p-5" style={cardStyle}>
            <div className="text-[14px] md:text-[16px] font-semibold" style={{ color: '#4E5B4F' }}>
              {isRo ? 'Organizație' : 'Organization'}
            </div>
            <div className="mt-3">
              <IonSelect
                value={selectedOrgId}
                interface="popover"
                disabled={orgsLoading || orgs.length === 0}
                onIonChange={(e) => setSelectedOrgId(String(e.detail.value || ''))}
                style={{
                  '--placeholder-color': '#7A746C',
                  '--color': '#4E5B4F',
                  '--icon-color': '#4E5B4F',
                  '--icon-opacity': '1',
                  width: '100%',
                } as any}
              >
                {orgs.map(o => (
                  <IonSelectOption key={o.id} value={o.id}>
                    {o.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
              <div className="mt-2 text-[12px]" style={{ color: '#7A746C', fontFamily: 'var(--font-logo), ui-serif, Georgia, serif' }}>
                {selectedOrg ? (isRo ? 'Org ID: ' : 'Org ID: ') + selectedOrg.id : (isRo ? 'Se încarcă…' : 'Loading…')}
              </div>
            </div>
            {orgsError ? (
              <div className="mt-2 text-[13px]" style={{ color: 'rgba(255, 59, 48, 0.85)', fontFamily: 'var(--font-logo), ui-serif, Georgia, serif' }}>
                {orgsError}
              </div>
            ) : null}
            {!orgsError && !orgUsageError && !usageLoading && selectedOrgId && usageByRange && !orgHasAnyStats ? (
              <div className="mt-2 text-[13px]" style={{ color: '#7A746C', fontFamily: 'var(--font-logo), ui-serif, Georgia, serif' }}>
                {isRo
                  ? 'Nu există încă statistici pentru această organizație.'
                  : 'There are no stats for this organization yet.'}
              </div>
            ) : null}
            {orgUsageError ? (
              <div className="mt-2 text-[13px]" style={{ color: 'rgba(255, 59, 48, 0.85)', fontFamily: 'var(--font-logo), ui-serif, Georgia, serif' }}>
                {orgUsageError}
              </div>
            ) : null}
          </div>

          {(['24h', '7d', '30d', '365d'] as RangeKey[]).map(r => {
            const row = usageByRange?.[r] ?? null;
            return (
              <div key={r} className="rounded-[16px] p-4 md:p-5" style={cardStyle}>
                <div className="text-[14px] md:text-[16px] font-semibold" style={{ color: '#4E5B4F' }}>
                  {isRo ? RANGE_LABEL[r].ro : RANGE_LABEL[r].en}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-[14px] p-3" style={{ backgroundColor: 'rgba(78, 91, 79, 0.04)', border: '1px solid rgba(232, 222, 211, 0.85)' }}>
                    <div className="text-[12px]" style={{ color: '#7A746C', fontFamily: 'var(--font-logo), ui-serif, Georgia, serif' }}>
                      {isRo ? 'Dispozitive active' : 'Active devices'}
                    </div>
                    <div className="mt-1 text-[18px]" style={{ color: '#4E5B4F', fontWeight: 800 }}>
                      {fmt(row?.activeDevices ?? 0)}
                      {usageLoading ? <span className="text-[12px]" style={{ color: '#7A746C' }}> …</span> : null}
                    </div>
                  </div>
                  <div className="rounded-[14px] p-3" style={{ backgroundColor: 'rgba(78, 91, 79, 0.04)', border: '1px solid rgba(232, 222, 211, 0.85)' }}>
                    <div className="text-[12px]" style={{ color: '#7A746C', fontFamily: 'var(--font-logo), ui-serif, Georgia, serif' }}>
                      {isRo ? 'Redări (estimare)' : 'Plays (estimate)'}
                    </div>
                    <div className="mt-1 text-[18px]" style={{ color: '#4E5B4F', fontWeight: 800 }}>
                      {fmt(row?.plays ?? 0)}
                      {usageLoading ? <span className="text-[12px]" style={{ color: '#7A746C' }}> …</span> : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </IonContent>
    </IonPage>
  );
}
