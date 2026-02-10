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
  IonTitle,
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
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" icon={chevronBackOutline} text="" style={{ '--color': '#fff' } as any} />
          </IonButtons>
          <IonTitle className="text-white text-base md:text-lg font-bold truncate">
            {isRo ? 'Exerciții scurte' : 'Short exercises'}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/settings" routerDirection="none">
              <IonIcon icon={settingsOutline} className="text-white text-2xl" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="text-white" fullscreen={true}>
        <div className="p-4 md:p-6 flex flex-col gap-4">
          <div
            className="rounded-2xl p-4 text-white/90"
            style={{ backgroundColor: 'rgba(0,0,0,0.18)', border: '1px solid rgba(255,255,255,0.10)' }}
          >
            <div className="text-sm md:text-base leading-relaxed">{intro}</div>
          </div>

          <div className="flex flex-col gap-3">
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
      className="w-full text-left rounded-2xl px-4 py-4 flex items-center gap-3"
      style={{
        backgroundColor: 'rgba(0,0,0,0.18)',
        border: '1px solid rgba(255,255,255,0.10)',
      }}
    >
      <IonIcon className="text-white text-2xl shrink-0" icon={playCircleOutline} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 min-w-0">
          <div className="text-white text-[15px] md:text-[17px] font-semibold truncate flex-1 min-w-0">{title}</div>
          {!hasAccess ? (
            <IonBadge color="warning" className="align-middle shrink-0">
              Premium
            </IonBadge>
          ) : null}
        </div>
        {subtitle ? <div className="text-white/70 text-[12px] md:text-[13px] truncate mt-0.5">{subtitle}</div> : null}
      </div>
    </button>
  );
}

