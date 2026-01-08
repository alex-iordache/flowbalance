'use client';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
} from '@ionic/react';
import Notifications from './Notifications';
import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { bookOutline, play, settingsOutline } from 'ionicons/icons';
import Logo from '../ui/Logo';
import { useUser } from '@clerk/nextjs';
import { Preferences } from '@capacitor/preferences';
import Store from '../../store';
import { t, type Flow, type Practice, type Language } from '../../data/flows';
import { getAudioSrc } from '../../helpers/getAudioSrc';
import { FLOW_CATEGORIES, getCategoryForFlowId } from './flowsCatalog';
import QuickActionCard from '../ui/QuickActionCard';

type HelloUserProps ={
  firstName?: string;
}

function getGreetingForLocalTime(
  now: Date,
  lang: 'ro' | 'en',
): 'Good morning' | 'Hello' | 'Good evening' | 'Bună dimineața' | 'Salut' | 'Bună seara' {
  const h = now.getHours();
  const morning = h >= 5 && h < 12;
  const evening = h >= 18 || h < 5;
  if (lang === 'ro') {
    if (morning) return 'Bună dimineața';
    if (evening) return 'Bună seara';
    return 'Salut';
  }
  if (morning) return 'Good morning';
  if (evening) return 'Good evening';
  return 'Hello';
}

const HelloUser = ({ firstName, lang }: HelloUserProps & { lang: 'ro' | 'en' }) => (
  <div className="hello-user-container">
    <h2 className="text-base text-white/95">
      {(() => {
        const greeting = getGreetingForLocalTime(new Date(), lang);
        return firstName ? `${greeting}, ${firstName}!` : `${greeting}!`;
      })()}
    </h2>
  </div>
)

function pickActiveFlow(flows: Flow[]): Flow | null {
  const candidates = flows.filter(f => f.started && !f.finished);
  if (!candidates.length) return null;
  // Best-effort "most recent": prefer more progress, then latest playback position.
  return [...candidates].sort((a, b) => {
    const byCompleted = (b.practicesCompleted ?? 0) - (a.practicesCompleted ?? 0);
    if (byCompleted !== 0) return byCompleted;
    return (b.lastPracticePositionSec ?? 0) - (a.lastPracticePositionSec ?? 0);
  })[0] ?? null;
}

function pickInProgressPractice(flow: Flow): Practice | null {
  const candidates = (flow.practices ?? []).filter(p => !p.finished && (p.lastPositionSec ?? 0) > 0);
  if (!candidates.length) return null;
  return [...candidates].sort((a, b) => (b.lastPositionSec ?? 0) - (a.lastPositionSec ?? 0))[0] ?? null;
}

function pickNextUnfinishedPractice(flow: Flow): Practice | null {
  return (flow.practices ?? []).find(p => !p.finished) ?? null;
}

function formatMinutesFromSeconds(sec: number): string {
  if (!Number.isFinite(sec) || sec <= 0) return '';
  return `${Math.max(1, Math.round(sec / 60))} min`;
}

function pickRandomDistinct<T>(items: T[], count: number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.max(0, Math.min(count, copy.length)));
}

function estimateTotalMinutes(flow: Flow): number {
  // Until we have durations in data, use a simple estimate (10 min / practice).
  const total = flow.totalPractices ?? flow.practices?.length ?? 0;
  return total * 10;
}

function ContinueCard({
  flow,
  lang,
  onContinue,
  flowId,
  practiceIdForMinutes,
}: {
  flow: Flow;
  lang: Language;
  onContinue: () => void;
  flowId: string;
  practiceIdForMinutes: string | null;
}) {
  const isRo = lang === 'ro';
  const [minutesLabel, setMinutesLabel] = useState<string>('');

  const total = flow.totalPractices ?? flow.practices?.length ?? 0;
  const completed = flow.practicesCompleted ?? 0;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  useEffect(() => {
    setMinutesLabel('');
    if (!practiceIdForMinutes) return;
    const practice = (flow.practices ?? []).find(p => p.id === practiceIdForMinutes) ?? null;
    const audioKey = practice ? t(practice.audioUrl, lang) : '';
    if (!audioKey) return;

    // Load duration via metadata (best-effort). If this fails (no access), we just omit minutes.
    const audio = document.createElement('audio');
    audio.preload = 'metadata';
    audio.src = getAudioSrc({
      audioUrlOrPath: audioKey,
      flowId,
      practiceId: practiceIdForMinutes,
    });
    const onLoaded = () => {
      const dur = Number.isFinite(audio.duration) ? audio.duration : 0;
      const label = formatMinutesFromSeconds(dur);
      if (label) setMinutesLabel(label);
    };
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('error', () => {});
    // Trigger load
    try {
      audio.load();
    } catch {
      // ignore
    }
    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.src = '';
    };
  }, [flowId, practiceIdForMinutes, lang, flow.practices]);

  const title = t(flow.name, lang);
  const subtitle = t(flow.intro, lang);
  const badgeText = isRo ? 'Continuă' : 'Continue';

  return (
    <div
      className="w-full max-w-md mx-auto rounded-[28px] overflow-hidden"
      style={{
        // Same as app background, with a subtle grey-ish gradient to read as a card
        backgroundColor: 'var(--fb-bg)',
        backgroundImage: 'var(--fb-card-gradient)',
        // Inset shadow (pressed-in look)
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -18px 40px rgba(0,0,0,0.22)',
      }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-white/75 text-[11px] tracking-wide">
              {minutesLabel ? `${minutesLabel} • ` : ''}
              {pct}% {isRo ? 'complet' : 'complete'}
            </div>
            <div className="mt-1 text-white text-[18px] font-semibold truncate">{title}</div>
            <div className="mt-1 text-white/80 text-[13px] leading-snug line-clamp-2">{subtitle}</div>
          </div>

          <div className="shrink-0 flex flex-col items-end gap-2">
            <div className="px-2 py-1 rounded-full text-[10px] font-semibold text-white/90 bg-white/12">
              {badgeText}
            </div>
            <button
              type="button"
              onClick={onContinue}
              aria-label={isRo ? 'Redă' : 'Play'}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/14 active:bg-white/18 flex items-center justify-center"
            >
              <IonIcon icon={play} className="text-white text-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StartHereCard({
  flow,
  lang,
  onStart,
  flowId,
  practiceIdForMinutes,
}: {
  flow: Flow;
  lang: Language;
  onStart: () => void;
  flowId: string;
  practiceIdForMinutes: string | null;
}) {
  const isRo = lang === 'ro';
  const [minutesLabel, setMinutesLabel] = useState<string>('');

  useEffect(() => {
    setMinutesLabel('');
    if (!practiceIdForMinutes) return;
    const practice = (flow.practices ?? []).find(p => p.id === practiceIdForMinutes) ?? null;
    const audioKey = practice ? t(practice.audioUrl, lang) : '';
    if (!audioKey) return;

    const audio = document.createElement('audio');
    audio.preload = 'metadata';
    audio.src = getAudioSrc({
      audioUrlOrPath: audioKey,
      flowId,
      practiceId: practiceIdForMinutes,
    });
    const onLoaded = () => {
      const dur = Number.isFinite(audio.duration) ? audio.duration : 0;
      const label = formatMinutesFromSeconds(dur);
      if (label) setMinutesLabel(label);
    };
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('error', () => {});
    try {
      audio.load();
    } catch {}
    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.src = '';
    };
  }, [flowId, practiceIdForMinutes, lang, flow.practices]);

  const title = t(flow.name, lang);
  const subtitle = t(flow.intro, lang);
  const badgeText = isRo ? 'Începe aici' : 'Start here';

  return (
    <div
      className="w-full max-w-md mx-auto rounded-[28px] overflow-hidden"
      style={{
        backgroundColor: 'var(--fb-bg)',
        backgroundImage: 'var(--fb-card-gradient)',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -18px 40px rgba(0,0,0,0.22)',
      }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-white/75 text-[11px] tracking-wide">
              {minutesLabel ? `${minutesLabel} • ` : ''}
              {isRo ? 'Recomandat pentru tine' : 'Recommended for you'}
            </div>
            <div className="mt-1 text-white text-[18px] font-semibold truncate">{title}</div>
            <div className="mt-1 text-white/80 text-[13px] leading-snug line-clamp-2">{subtitle}</div>
          </div>

          <div className="shrink-0 flex flex-col items-end gap-2">
            <div className="px-2 py-1 rounded-full text-[10px] font-semibold text-white/90 bg-white/12">
              {badgeText}
            </div>
            <button
              type="button"
              onClick={onStart}
              aria-label={isRo ? 'Pornește' : 'Start'}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/14 active:bg-white/18 flex items-center justify-center"
            >
              <IonIcon icon={play} className="text-white text-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecommendedFlowsCard({
  flows,
  lang,
  onOpenFlow,
}: {
  flows: Flow[];
  lang: Language;
  onOpenFlow: (flow: Flow) => void;
}) {
  const isRo = lang === 'ro';
  const title = isRo ? 'Recomandate pentru tine' : 'Recommended for you';
  const subtitle = isRo
    ? 'Alege un flow și începe cu o practică scurtă.'
    : 'Pick a flow and start with a short practice.';

  return (
    <div className="w-full max-w-md mx-auto text-white">
      <div className="px-1">
        <div className="text-white text-[16px] font-semibold">{title}</div>
        <div className="mt-1 text-white/75 text-[12px] leading-snug">{subtitle}</div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {flows.map(flow => {
          const category = getCategoryForFlowId(flow.id);
          const totalPractices = flow.totalPractices ?? flow.practices?.length ?? 0;
          const totalMinutes = estimateTotalMinutes(flow);

          const inProgress = pickInProgressPractice(flow);
          const href = inProgress ? `/flows/${flow.id}/${inProgress.id}` : `/flows/${flow.id}`;

          return (
            <button
              key={flow.id}
              type="button"
              onClick={() => onOpenFlow(flow)}
              className="text-left rounded-2xl overflow-hidden"
              style={{
                backgroundImage:
                  category?.gradientCss ??
                  'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(0,0,0,0.10) 100%)',
              }}
            >
              <div className="p-4 bg-black/10 h-full flex flex-col">
                <div className="min-w-0">
                  <div className="text-white text-[14px] font-semibold leading-snug line-clamp-2">
                    {t(flow.name, lang)}
                  </div>
                </div>

                <div className="mt-auto pt-3 flex items-end justify-between gap-2">
                  <span className="sr-only">{href}</span>
                  <div className="flex items-center justify-between gap-2 w-full">
                    <div className="text-white/85 text-[11px] leading-tight whitespace-nowrap">
                      {totalPractices} {isRo ? 'practici' : 'practices'} ~{totalMinutes} min
                    </div>
                    <IonIcon icon={play} className="text-white text-[13px] shrink-0 mr-0.5" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function EmptyStateCard({ lang, onBrowse }: { lang: Language; onBrowse: () => void }) {
  const isRo = lang === 'ro';
  return (
    <div
      className="w-full max-w-md mx-auto rounded-[28px] p-5 text-white"
      style={{
        backgroundColor: 'var(--fb-bg)',
        backgroundImage: 'var(--fb-card-gradient)',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -18px 40px rgba(0,0,0,0.22)',
      }}
    >
      <div className="text-[18px] font-semibold">{isRo ? 'Nu ai început încă niciun flow' : "You haven't started any Flow"}</div>
      <div className="mt-2 text-white/80 text-[13px] leading-snug">
        {isRo
          ? 'Alege o categorie și începe un flow care ți se potrivește acum.'
          : 'Pick a category and start a flow that matches how you feel right now.'}
      </div>
      <button
        type="button"
        onClick={onBrowse}
        className="mt-4 inline-flex items-center justify-center w-full text-white bg-white/15 hover:bg-white/20 active:bg-white/25 shadow-sm font-medium rounded-2xl text-sm px-4 py-3 focus:outline-none transition-colors"
      >
        {isRo ? 'Vezi flow-urile' : 'Browse Flows'}
      </button>
    </div>
  );
}
const Home = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const history = useHistory();
  const { user, isLoaded } = useUser();
  const lang = Store.useState(s => s.settings.language);
  const flows = Store.useState(s => s.flows);
  const onboardingStart = Store.useState(s => s.onboardingStart);
  const onboardingRecommendedCategories = Store.useState(s => s.onboardingRecommendedCategories);
  const [recommendedFlowIds, setRecommendedFlowIds] = useState<string[]>([]);

  const displayFirstNameFromClerk = useMemo(() => {
    if (!isLoaded || !user) return '';
    const first = (user.firstName ?? '').trim();
    if (first) return first;
    const full = (user.fullName ?? '').trim();
    if (full) return full.split(/\s+/)[0] ?? '';
    const primaryEmail = user.primaryEmailAddress?.emailAddress ?? '';
    if (primaryEmail.includes('@')) return primaryEmail.split('@')[0] ?? '';
    return '';
  }, [isLoaded, user]);

  const [firstName, setFirstName] = useState<string>('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { value } = await Preferences.get({ key: 'flow_user_first_name' });
        if (!cancelled && value) setFirstName(value);
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!displayFirstNameFromClerk) return;
    setFirstName(displayFirstNameFromClerk);
    (async () => {
      try {
        await Preferences.set({ key: 'flow_user_first_name', value: displayFirstNameFromClerk });
      } catch {
        // ignore
      }
    })();
  }, [displayFirstNameFromClerk]);

  useEffect(() => {
    let cancelled = false;
    const key = 'flow_recommended_flow_ids_v1';

    (async () => {
      // If onboarding produced recommendations, prefer them and persist them.
      if (Array.isArray(onboardingRecommendedCategories) && onboardingRecommendedCategories.length) {
        const byId = new Map(flows.map(f => [f.id, f] as const));
        const picked: string[] = [];

        for (const catId of onboardingRecommendedCategories.slice(0, 3)) {
          const cat = FLOW_CATEGORIES.find(c => c.id === catId) ?? null;
          if (!cat) continue;
          for (const fid of cat.flowIds) {
            if (picked.includes(fid)) continue;
            if (byId.has(fid)) {
              picked.push(fid);
              break;
            }
          }
        }

        const pool = flows.map(f => f.id).filter(id => !picked.includes(id));
        const fourth = pickRandomDistinct(pool, 1)[0] ?? null;
        const ids = [...picked, ...(fourth ? [fourth] : [])].slice(0, 4);

        if (!cancelled) setRecommendedFlowIds(ids);
        try {
          await Preferences.set({ key, value: JSON.stringify(ids) });
        } catch {
          // ignore
        }
        return;
      }

      try {
        const { value } = await Preferences.get({ key });
        if (cancelled) return;
        if (value) {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed) && parsed.every(v => typeof v === 'string')) {
            setRecommendedFlowIds(parsed);
            return;
          }
        }
      } catch {
        // ignore
      }

      // Generate once per device (temporary until onboarding form exists).
      const ids = pickRandomDistinct(flows.map(f => f.id), 4);
      if (cancelled) return;
      setRecommendedFlowIds(ids);
      try {
        await Preferences.set({ key, value: JSON.stringify(ids) });
      } catch {
        // ignore
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [flows, onboardingRecommendedCategories]);

  const recommendedFlows = useMemo(() => {
    const byId = new Map(flows.map(f => [f.id, f] as const));
    return recommendedFlowIds.map(id => byId.get(id)).filter(Boolean) as Flow[];
  }, [flows, recommendedFlowIds]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Logo />
          <IonButtons slot="end">
            <IonButton routerLink="/settings" routerDirection="none">
              <IonIcon icon={settingsOutline} className="text-white text-2xl" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <Notifications
          open={showNotifications}
          onDidDismiss={() => setShowNotifications(false)}
        />
        <HelloUser firstName={firstName} lang={lang} />
        {(() => {
          const activeFlow = pickActiveFlow(flows);
          if (!activeFlow) {
            const startFlow = onboardingStart
              ? flows.find(f => f.id === onboardingStart.flowId) ?? null
              : null;
            const startHref =
              onboardingStart && onboardingStart.flowId
                ? onboardingStart.practiceId
                  ? `/flows/${onboardingStart.flowId}/${onboardingStart.practiceId}`
                  : `/flows/${onboardingStart.flowId}`
                : null;
            const startPracticeForMinutes =
              onboardingStart?.practiceId ??
              (startFlow ? pickNextUnfinishedPractice(startFlow)?.id ?? null : null);

            return (
              <div className="flex flex-col gap-4">
                {startFlow && startHref ? (
                  <StartHereCard
                    flow={startFlow}
                    lang={lang}
                    flowId={startFlow.id}
                    practiceIdForMinutes={startPracticeForMinutes}
                    onStart={() => history.push(startHref)}
                  />
                ) : (
                  <EmptyStateCard lang={lang} onBrowse={() => history.push('/flows')} />
                )}
                {recommendedFlows.length ? (
                  <RecommendedFlowsCard
                    flows={recommendedFlows}
                    lang={lang}
                    onOpenFlow={(flow) => {
                      const inProgress = pickInProgressPractice(flow);
                      history.push(inProgress ? `/flows/${flow.id}/${inProgress.id}` : `/flows/${flow.id}`);
                    }}
                  />
                ) : null}
                <div className="mt-1 w-full max-w-md mx-auto">
                  <QuickActionCard
                    meta={lang === 'ro' ? '5 min citire' : '5 min reading'}
                    title={lang === 'ro' ? 'Respirație de reset' : 'Refresh breath'}
                    metaIcon={bookOutline}
                    onClick={() => history.push('/flows')}
                  />
                </div>
              </div>
            );
          }

          const inProgress = pickInProgressPractice(activeFlow);
          const nextUnfinished = pickNextUnfinishedPractice(activeFlow);
          const practiceForMinutes = (inProgress ?? nextUnfinished)?.id ?? null;

          const href = inProgress ? `/flows/${activeFlow.id}/${inProgress.id}` : `/flows/${activeFlow.id}`;

          return (
            <div className="flex flex-col gap-4">
              <ContinueCard
                flow={activeFlow}
                lang={lang}
                flowId={activeFlow.id}
                practiceIdForMinutes={practiceForMinutes}
                onContinue={() => history.push(href)}
              />
              {recommendedFlows.length ? (
                <RecommendedFlowsCard
                  flows={recommendedFlows}
                  lang={lang}
                  onOpenFlow={(flow) => {
                    const inP = pickInProgressPractice(flow);
                    history.push(inP ? `/flows/${flow.id}/${inP.id}` : `/flows/${flow.id}`);
                  }}
                />
              ) : null}
              <div className="mt-1 w-full max-w-md mx-auto">
                <QuickActionCard
                  meta={lang === 'ro' ? '5 min citire' : '5 min reading'}
                  title={lang === 'ro' ? 'Respirație de reset' : 'Refresh breath'}
                  metaIcon={bookOutline}
                  onClick={() => history.push('/flows')}
                />
              </div>
            </div>
          );
        })()}
      </IonContent>
    </IonPage>
  );
};

export default Home;
