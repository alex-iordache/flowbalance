'use client';

import {
  IonBackButton,
  IonButton,
  IonBadge,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { chevronBackOutline, playCircleOutline, settingsOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useMemo } from 'react';

import Store from '../../store';
import type { Flow, Language } from '../../data/flows';
import onboardingNewForm from '../../data/onboardingNewForm.json';
import { FLOW_CATEGORIES } from './flowsCatalog';
import { usePracticeAccess } from '../../hooks/useAccessControl';
import Logo from '../ui/Logo';
import {
  buildAudioUsageIndex,
  pickContextFlowId,
  scoreStandaloneAudios,
  sortStandaloneAudios,
  type NewOnboardingConfig,
  type StandaloneAudioScored,
} from '../../helpers/standaloneAudioIndex';

function resolveCategoryToFlowIds(categoryId: string, flows: { id: string }[]): string[] {
  const cat = FLOW_CATEGORIES.find(c => c.id === categoryId) ?? null;
  if (!cat) return [];
  const byId = new Set(flows.map(f => f.id));
  return cat.flowIds.filter(fid => byId.has(fid));
}

export default function StandalonePractices() {
  const history = useHistory();
  const flows = Store.useState(s => s.flows);
  const lang = Store.useState(s => s.settings.language) as Language;
  const selectedNeedIds = (Store.useState(s => s.onboardingSelectedNeedIds) ?? []) as string[];
  const isRo = lang === 'ro';

  const onboarding = onboardingNewForm as unknown as NewOnboardingConfig;

  const resolvedNeedFlows = useMemo(() => {
    const out = new Map<string, { primaryFlowIds: string[]; secondaryFlowIds: string[] }>();
    for (const opt of onboarding.options) {
      const primaryFlowIds =
        opt.primary.kind === 'flow' ? [opt.primary.id] : resolveCategoryToFlowIds(opt.primary.id, flows);
      const secondaryFlowIds =
        opt.secondary.kind === 'flow' ? [opt.secondary.id] : resolveCategoryToFlowIds(opt.secondary.id, flows);
      out.set(opt.id, { primaryFlowIds, secondaryFlowIds });
    }
    return out;
  }, [flows, onboarding.options]);

  const list = useMemo(() => {
    const audioIndex = buildAudioUsageIndex(flows);
    const scored = scoreStandaloneAudios({
      flows,
      audioIndex,
      selectedNeedIds,
      onboarding,
      resolvedNeedFlows,
    });
    return sortStandaloneAudios(scored, lang);
  }, [flows, lang, onboarding, resolvedNeedFlows, selectedNeedIds]);

  const intro = isRo
    ? 'Aici găsești exerciții audio scurte din toate programele. Lista este ordonată în funcție de preferințele tale.'
    : 'Here are short audio exercises from all programs. The list is ordered based on your preferences.';

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
            <IonBackButton defaultHref="/home" icon={chevronBackOutline} text="" style={{ '--color': '#4E5B4F' } as any} />
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
            className="text-[26px] md:text-[30px] leading-tight text-center"
            style={{ fontFamily: 'var(--font-logo), ui-serif, Georgia, serif', fontWeight: 600, color: '#4E5B4F' }}
          >
            {isRo ? 'Exerciții scurte' : 'Short exercises'}
          </div>

          <div className="mt-2 text-center text-[14px] md:text-[15px]" style={{ color: '#7A746C' }}>
            {intro}
          </div>

          <div className="mt-4" style={{ borderTop: '1px solid rgba(232, 222, 211, 0.65)' }} />

          <div className="mt-4 grid gap-3">
            {list.map(item => {
              return (
                <StandalonePracticeRow
                  key={item.id}
                  item={item}
                  flows={flows}
                  lang={lang}
                  isRo={isRo}
                  onOpen={() => history.push(`/practices/${encodeURIComponent(item.id)}`)}
                />
              );
            })}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

function StandalonePracticeRow({
  item,
  flows,
  lang,
  isRo,
  onOpen,
}: {
  item: StandaloneAudioScored;
  flows: Flow[];
  lang: Language;
  isRo: boolean;
  onOpen: () => void;
}) {
  const title = isRo ? item.title.ro : item.title.en;
  const contextFlowId = pickContextFlowId(item.flowIds);
  const contextFlow = contextFlowId ? flows.find((f) => f.id === contextFlowId) ?? null : null;
  const subtitle = contextFlow ? (isRo ? (contextFlow.title as any).ro : (contextFlow.title as any).en) : '';

  const examplePracticeId = contextFlowId ? item.examplePracticeIdByFlowId?.[contextFlowId] ?? null : null;
  const flowIndex = contextFlowId ? flows.findIndex((f) => f.id === contextFlowId) : -1;
  const practiceIndex =
    contextFlow && examplePracticeId
      ? contextFlow.practices?.findIndex((p) => p.id === examplePracticeId) ?? -1
      : -1;

  const hasAccess = usePracticeAccess(
    contextFlowId ?? 'unknown',
    examplePracticeId ?? 'unknown',
    flowIndex,
    practiceIndex,
  );

  return (
    <button
      type="button"
      onClick={onOpen}
      className="relative w-full text-left rounded-[14px] pl-3.5 pr-4 py-3 flex items-center gap-3.5 active:opacity-95"
      style={{
        backgroundColor: '#FBF7F2',
        border: '1px solid rgba(232, 222, 211, 0.85)',
        boxShadow: '0 10px 24px rgba(120, 95, 70, 0.06)',
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

      <div className="min-w-0 flex-1 pl-1">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="text-[16px] leading-tight truncate flex-1 min-w-0"
            style={{ fontFamily: 'var(--font-logo), ui-serif, Georgia, serif', fontWeight: 600, color: '#4E5B4F' }}
          >
            {title}
          </div>
        </div>
        {subtitle ? (
          <div className="text-[12px] md:text-[13px] truncate mt-0.5" style={{ color: '#7A746C' }}>
            {subtitle}
          </div>
        ) : null}
      </div>

      <div className="shrink-0 flex items-center gap-2">
        {!hasAccess ? (
          <IonBadge color="warning" className="align-middle shrink-0">
            Premium
          </IonBadge>
        ) : null}
        <IonIcon icon={playCircleOutline} style={{ color: '#7A746C', fontSize: '22px' }} />
      </div>
    </button>
  );
}

