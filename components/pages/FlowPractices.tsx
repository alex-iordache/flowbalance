import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { chevronBackOutline, checkmark, lockClosedOutline, playCircleOutline, settingsOutline } from 'ionicons/icons';
import { useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Store from '../../store';
import type { Flow, Language, Practice } from '../../data/flows';
import { t } from '../../data/flows';
import { usePracticeAccess } from '../../hooks/useAccessControl';
import Logo from '../ui/Logo';

function isDayPrefixedTitle(value: string): boolean {
  const v = (value ?? '').trim();
  return /^(Ziua|Day)\s+\d+/i.test(v);
}

function getDayLabelAndRest(value: string): { dayLabel: string; rest: string } | null {
  const v = (value ?? '').trim();
  // Supports both hyphen and en-dash separators.
  const m = v.match(/^((?:Ziua|Day)\s+\d+)\s*(?:[–-]\s*(.*))?$/i);
  if (!m) return null;
  return { dayLabel: (m[1] ?? '').trim(), rest: (m[2] ?? '').trim() };
}

type PracticeListTitleMode = 'normalTitleOnly' | 'dayLabelOnly';

function PracticeRow({
  flowId,
  flowIndex,
  titleMode,
  practice,
  practiceIndex,
  lang,
  onOpen,
}: {
  flowId: string;
  flowIndex: number;
  titleMode: PracticeListTitleMode;
  practice: Practice;
  practiceIndex: number;
  lang: Language;
  onOpen: (practiceId: string) => void;
}) {
  const hasAccess = usePracticeAccess(flowId, practice.id, flowIndex, practiceIndex);
  const locked = !hasAccess;

  const dayTitle = t(practice.title, lang);
  const normalName = t(practice.name, lang);

  const primary = (() => {
    if (titleMode === 'normalTitleOnly') return normalName;
    // dayLabelOnly
    const parsed = getDayLabelAndRest(dayTitle);
    return parsed?.dayLabel ?? dayTitle ?? normalName;
  })();

  return (
    <button
      type="button"
      onClick={() => onOpen(practice.id)}
      className={`relative w-full text-left rounded-[14px] px-4 py-3 flex items-center gap-3 ${
        locked ? 'opacity-95 cursor-pointer active:opacity-95' : 'cursor-pointer active:opacity-95'
      }`}
      style={{
        backgroundColor: '#FBF7F2',
        border: '1px solid rgba(232, 222, 211, 0.85)',
        boxShadow: '0 10px 24px rgba(120, 95, 70, 0.08)',
      }}
    >
      {/* Accent bar */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          top: 10,
          bottom: 10,
          width: 3,
          backgroundColor: '#CDAF87',
          opacity: 0.75,
          borderRadius: 999,
        }}
      />

      {/* Completion circle */}
      <div className="pl-1 flex items-center">
        <div
          className="w-[22px] h-[22px] rounded-full flex items-center justify-center"
          aria-label={practice.finished ? 'Completed' : 'Not completed'}
          style={{
            border: practice.finished ? '1px solid rgba(205, 175, 135, 0.85)' : '1px solid rgba(122, 116, 108, 0.35)',
            backgroundColor: practice.finished ? 'rgba(205, 175, 135, 0.55)' : 'transparent',
          }}
        >
          {practice.finished ? <IonIcon icon={checkmark} style={{ color: '#4E5B4F', fontSize: '14px' }} /> : null}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div
          className="text-[16px] leading-tight truncate"
          style={{ fontFamily: 'var(--font-logo), ui-serif, Georgia, serif', fontWeight: 600, color: '#4E5B4F' }}
        >
          {primary}
        </div>
      </div>

      <div className="shrink-0 flex items-center gap-2">
        {locked ? <IonIcon icon={lockClosedOutline} style={{ color: '#7A746C', fontSize: '18px' }} /> : null}
        <IonIcon icon={playCircleOutline} style={{ color: '#7A746C', fontSize: '22px' }} />
      </div>
    </button>
  );
}

export default function FlowPractices() {
  const history = useHistory();
  const { flowId } = useParams<{ flowId: string }>();
  const flows = Store.useState(s => s.flows) as Flow[];
  const lang = Store.useState(s => s.settings.language) as Language;

  const flowIndex = useMemo(() => flows.findIndex(f => f.id === flowId), [flows, flowId]);
  const flow = useMemo(() => (flowIndex >= 0 ? flows[flowIndex] : null), [flows, flowIndex]);
  const isDayBasedFlow = useMemo(() => {
    const practices = flow?.practices ?? [];
    if (practices.length === 0) return false;
    const dayCount = practices.reduce((acc, p) => {
      const dayTitle = t(p.title, lang);
      return acc + (isDayPrefixedTitle(dayTitle) ? 1 : 0);
    }, 0);
    return dayCount / practices.length >= 0.6;
  }, [flow, lang]);

  const titleMode = useMemo<PracticeListTitleMode>(() => {
    const id = flow?.id ?? flowId;
    const practicesCount = flow?.practices?.length ?? 0;
    const alwaysNormal = new Set(['Build-Self-Trust', 'Craving-Relief', 'Healthy-Money-Mindset']);
    // "Heart Balance" in app maps to the single-practice daily flow, and user asked:
    // flows with only 1 practice should show only normal titles.
    if (practicesCount <= 1) return 'normalTitleOnly';
    if (alwaysNormal.has(id)) return 'normalTitleOnly';
    if (isDayBasedFlow) return 'dayLabelOnly';
    return 'normalTitleOnly';
  }, [flow?.id, flow?.practices?.length, flowId, isDayBasedFlow]);

  const onOpenPractice = (practiceId: string) => {
    history.push(`/flows/${flowId}/${practiceId}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ position: 'relative' }}>
          {/* Dead-center logo (independent of left/right icons) */}
          <div
            className="pointer-events-none"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Logo />
          </div>

          <IonButtons slot="start">
            <IonBackButton defaultHref={`/flows/${flowId}`} icon={chevronBackOutline} text="" style={{ '--color': '#4E5B4F' } as any} />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton routerLink="/settings" routerDirection="none">
              <IonIcon icon={settingsOutline} className="text-2xl" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <div className="px-5 py-5 pb-10 w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto">
          <div
            className="text-[24px] md:text-[28px] leading-tight text-center"
            style={{ fontFamily: 'var(--font-logo), ui-serif, Georgia, serif', fontWeight: 600, color: '#4E5B4F' }}
          >
            {flow ? t(flow.title, lang) : ''}
            {flow?.comingSoon ? (
              <IonBadge color="medium" className="ml-2 align-middle">
                Coming Soon
              </IonBadge>
            ) : null}
          </div>
          <div className="mt-2 text-center text-[14px] md:text-[15px]" style={{ color: '#7A746C' }}>
            {flow ? t(flow.intro, lang) : ''}
          </div>

          <div className="mt-6 grid gap-3">
            {(flow?.practices ?? []).map((p, idx) => (
              <PracticeRow
                key={p.id}
                flowId={flowId}
                flowIndex={Math.max(flowIndex, 0)}
                titleMode={titleMode}
                practice={p}
                practiceIndex={idx}
                lang={lang}
                onOpen={onOpenPractice}
              />
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

