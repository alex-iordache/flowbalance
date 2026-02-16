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
import { useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  bookOutline,
  play,
  settingsOutline,
  moonOutline,
  leafOutline,
  sparklesOutline,
  heartOutline,
  chevronForwardOutline,
} from 'ionicons/icons';
import Logo from '../ui/Logo';
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
    <h2 className="text-base md:text-xl text-white/95">
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
      className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto rounded-[28px] overflow-hidden"
      style={{
        // Same as app background, with a subtle grey-ish gradient to read as a card
        backgroundColor: 'var(--fb-bg)',
        backgroundImage: 'var(--fb-card-gradient)',
        // Inset shadow (pressed-in look)
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -18px 40px rgba(0,0,0,0.22)',
      }}
    >
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-white/75 text-[11px] md:text-[13px] tracking-wide">
              {minutesLabel ? `${minutesLabel} • ` : ''}
              {pct}% {isRo ? 'complet' : 'complete'}
            </div>
            <div className="mt-1 text-white text-[18px] md:text-[22px] font-semibold truncate">{title}</div>
            <div className="mt-1 text-white/80 text-[13px] md:text-[15px] leading-snug line-clamp-2">{subtitle}</div>
          </div>

          <div className="shrink-0 flex flex-col items-end gap-2">
            <div className="px-2 py-1 rounded-full text-[10px] md:text-[12px] font-semibold text-white/90 bg-white/12">
              {badgeText}
            </div>
            <button
              type="button"
              onClick={onContinue}
              aria-label={isRo ? 'Redă' : 'Play'}
              className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/14 active:bg-white/18 flex items-center justify-center"
            >
              <IonIcon icon={play} className="text-white text-[18px] md:text-[22px]" />
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
      className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto rounded-[28px] overflow-hidden"
      style={{
        backgroundColor: 'var(--fb-bg)',
        backgroundImage: 'var(--fb-card-gradient)',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -18px 40px rgba(0,0,0,0.22)',
      }}
    >
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-white/75 text-[11px] md:text-[13px] tracking-wide">
              {minutesLabel ? `${minutesLabel} • ` : ''}
              {isRo ? 'Recomandat pentru tine' : 'Recommended for you'}
            </div>
            <div className="mt-1 text-white text-[18px] md:text-[22px] font-semibold truncate">{title}</div>
            <div className="mt-1 text-white/80 text-[13px] md:text-[15px] leading-snug line-clamp-2">{subtitle}</div>
          </div>

          <div className="shrink-0 flex flex-col items-end gap-2">
            <div className="px-2 py-1 rounded-full text-[10px] md:text-[12px] font-semibold text-white/90 bg-white/12">
              {badgeText}
            </div>
            <button
              type="button"
              onClick={onStart}
              aria-label={isRo ? 'Pornește' : 'Start'}
              className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/14 active:bg-white/18 flex items-center justify-center"
            >
              <IonIcon icon={play} className="text-white text-[18px] md:text-[22px]" />
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
    <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto text-white">
      <div className="px-1">
        <div className="text-white text-[16px] md:text-[20px] font-semibold">{title}</div>
        <div className="mt-1 text-white/75 text-[12px] md:text-[14px] leading-snug">{subtitle}</div>
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
              <div className="p-4 md:p-5 bg-black/10 h-full flex flex-col">
                <div className="min-w-0">
                  <div className="text-white text-[14px] md:text-[16px] font-semibold leading-snug line-clamp-2">
                    {t(flow.name, lang)}
                  </div>
                </div>

                <div className="mt-auto pt-3 flex items-end justify-between gap-2">
                  <span className="sr-only">{href}</span>
                  <div className="flex items-center justify-between gap-2 w-full">
                    <div className="text-white/85 text-[11px] md:text-[13px] leading-tight whitespace-nowrap">
                      {totalPractices} {isRo ? 'practici' : 'practices'} ~{totalMinutes} min
                    </div>
                    <IonIcon icon={play} className="text-white text-[13px] md:text-[15px] shrink-0 mr-0.5" aria-hidden="true" />
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
      className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto rounded-[28px] p-5 md:p-6 text-white"
      style={{
        backgroundColor: 'var(--fb-bg)',
        backgroundImage: 'var(--fb-card-gradient)',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -18px 40px rgba(0,0,0,0.22)',
      }}
    >
      <div className="text-[18px] md:text-[22px] font-semibold">{isRo ? 'Nu ai început încă niciun flow' : "You haven't started any Flow"}</div>
      <div className="mt-2 text-white/80 text-[13px] md:text-[15px] leading-snug">
        {isRo
          ? 'Alege o categorie și începe un flow care ți se potrivește acum.'
          : 'Pick a category and start a flow that matches how you feel right now.'}
      </div>
      <button
        type="button"
        onClick={onBrowse}
        className="mt-4 inline-flex items-center justify-center w-full text-white bg-white/15 hover:bg-white/20 active:bg-white/25 shadow-sm font-medium rounded-2xl text-sm md:text-base px-4 py-3 focus:outline-none transition-colors"
      >
        {isRo ? 'Vezi flow-urile' : 'Browse Flows'}
      </button>
    </div>
  );
}
const Home = () => {
  const history = useHistory();
  const lang = Store.useState(s => s.settings.language) as Language;
  const flows = Store.useState(s => s.flows);
  const onboardingRecommendedFlowIds = Store.useState(s => s.onboardingRecommendedFlowIds);
  const onboardingRecommendedCategories = Store.useState(s => s.onboardingRecommendedCategories);

  const [recommendedFlowIds, setRecommendedFlowIds] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    const key = 'flow_recommended_flow_ids_v1';

    (async () => {
      if (Array.isArray(onboardingRecommendedFlowIds) && onboardingRecommendedFlowIds.length) {
        const byId = new Map(flows.map(f => [f.id, f] as const));
        const ids = onboardingRecommendedFlowIds.filter(id => typeof id === 'string' && byId.has(id)).slice(0, 4);
        if (!cancelled) setRecommendedFlowIds(ids);
        try {
          await Preferences.set({ key, value: JSON.stringify(ids) });
        } catch {}
        return;
      }

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
        } catch {}
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
      } catch {}

      const ids = pickRandomDistinct(flows.map(f => f.id), 4);
      if (cancelled) return;
      setRecommendedFlowIds(ids);
      try {
        await Preferences.set({ key, value: JSON.stringify(ids) });
      } catch {}
    })();

    return () => {
      cancelled = true;
    };
  }, [flows, onboardingRecommendedCategories, onboardingRecommendedFlowIds]);

  const recommendedFlows = useMemo(() => {
    const byId = new Map(flows.map(f => [f.id, f] as const));
    return recommendedFlowIds.map(id => byId.get(id)).filter(Boolean) as Flow[];
  }, [flows, recommendedFlowIds]);

  const heroFlow = useMemo(() => {
    const active = pickActiveFlow(flows);
    if (active) return active;
    if (recommendedFlows[0]) return recommendedFlows[0];
    return flows.find(f => f.id === 'Stress-Soothing') ?? flows[0] ?? null;
  }, [flows, recommendedFlows]);

  const heroHref = useMemo(() => {
    if (!heroFlow) return '/flows';
    const inProgress = pickInProgressPractice(heroFlow);
    const pid = inProgress?.id ?? pickNextUnfinishedPractice(heroFlow)?.id ?? null;
    return pid ? `/flows/${heroFlow.id}/${pid}` : `/flows/${heroFlow.id}`;
  }, [heroFlow]);

  const isRo = lang === 'ro';

  const forYouTitle = isRo ? 'Pentru tine azi' : 'For you today';
  const forYouSubtitle = isRo ? 'Alege o sesiune care să îți regleze mintea.' : 'Choose a session to help regulate your mind.';
  const categoriesTitle = isRo ? 'Descoperă categoriile terapeutice' : 'Discover therapeutic categories';

  const recommendedCarouselFlows = useMemo(() => {
    const out: Flow[] = [];
    const add = (f: Flow | null | undefined) => {
      if (!f) return;
      if (out.find(x => x.id === f.id)) return;
      out.push(f);
    };

    // Primary source: onboarding-driven recommendations (already ordered).
    for (const f of recommendedFlows) add(f);

    // Safety fill (should rarely be needed): keep it deterministic.
    if (out.length < 4) {
      add(flows.find(f => f.id === 'Improve-Sleep'));
      add(flows.find(f => f.id === 'Calming-Anxiety'));
      add(flows.find(f => f.id === 'Stress-Soothing'));
      add(flows.find(f => f.id === 'Daily-Heart-Lift'));
      add(flows[0]);
    }

    return out.slice(0, 4);
  }, [flows, recommendedFlows]);

  const recommendedCarouselRef = useRef<HTMLDivElement | null>(null);
  const recommendedCarouselKey = useMemo(
    () => recommendedCarouselFlows.map(f => f.id).join('|'),
    [recommendedCarouselFlows],
  );

  // Ensure the carousel starts from the left after sign-in/out re-hydration.
  useEffect(() => {
    const el = recommendedCarouselRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      if (!recommendedCarouselRef.current) return;
      recommendedCarouselRef.current.scrollLeft = 0;
    });
  }, [recommendedCarouselKey]);

  const minutesLabelForFlow = (flow: Flow) => {
    const minutes = estimateTotalMinutes(flow);
    return isRo ? `${minutes} minute` : `${minutes} minutes`;
  };

  const warmShadow = '0 10px 24px rgba(120, 95, 70, 0.08)';

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

          <IonButtons slot="end">
            <IonButton routerLink="/settings" routerDirection="none">
              <IonIcon icon={settingsOutline} style={{ color: '#4E5B4F' }} className="text-2xl" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="text-[#4E5B4F]">
        <div className="px-4 py-3 pb-6 w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto">
          {/* Hero */}
          <button
            type="button"
            onClick={() => history.push(heroHref)}
            className="w-full overflow-hidden rounded-[26px] text-left"
            style={{ backgroundColor: '#C57A4A', boxShadow: warmShadow }}
          >
            <div className="relative h-[150px] md:h-[180px]">
              {/* Flow image (dynamic) */}
              {heroFlow?.image ? (
                <img
                  src={t(heroFlow.image, lang)}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : null}

              {/* Warm fallback tint (keeps look consistent if image is missing/slow) */}
              <div className="absolute inset-0" style={{ background: 'rgba(197, 122, 74, 0.22)' }} />
              {/* Soft overlay to match the screenshot */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(244,239,232,0.92) 0%, rgba(244,239,232,0.55) 44%, rgba(244,239,232,0.08) 100%)',
                }}
              />

              <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-between">
                <div>
                  <div
                    className="text-[24px] md:text-[28px] leading-[1.15]"
                    style={{ fontFamily: 'var(--font-title), var(--font-inter), ui-sans-serif, system-ui, -apple-system', fontWeight: 500 }}
                  >
                    {heroFlow ? t(heroFlow.title, lang) : (isRo ? 'Diminuează stresul' : 'Reduce stress')}
                  </div>
                  <div className="mt-1 text-[14px] md:text-[15px]" style={{ color: '#7A746C' }}>
                    {heroFlow ? t(heroFlow.intro, lang) : (isRo ? 'Un ritual zilnic de reglare.' : 'A daily regulation ritual.')}
                  </div>
                </div>

                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 w-fit"
                  style={{ backgroundColor: 'rgba(251, 247, 242, 0.92)', border: '1px solid rgba(232, 222, 211, 0.55)' }}
                >
                  <IonIcon icon={play} style={{ color: '#4E5B4F' }} />
                  <div className="text-[13px] font-semibold" style={{ color: '#7A746C' }}>
                    {isRo ? '10 minute' : '10 minutes'}
                  </div>
                </div>
              </div>
            </div>
          </button>

          {/* For you today */}
          <div className="mt-6">
            <div
              className="text-[18px] md:text-[20px]"
              style={{ fontFamily: 'var(--font-title), var(--font-inter), ui-sans-serif, system-ui, -apple-system', fontWeight: 500 }}
            >
              {forYouTitle}
            </div>
            <div className="mt-1 text-[14px]" style={{ color: '#7A746C' }}>
              {forYouSubtitle}
            </div>

            {/* 4 total cards, swipe/drag horizontally; 2 visible at a time */}
            <div className="-mx-4 pl-4 pr-0">
              <div
                ref={recommendedCarouselRef}
                className="fb-no-scrollbar mt-3 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2"
              >
                {recommendedCarouselFlows.map(flow => (
                  <div
                    key={flow.id}
                    className="shrink-0 snap-start"
                    style={{ width: '44%', minWidth: '150px', maxWidth: '190px' }}
                  >
                    <SmallSessionCard
                      imageSrc={t(flow.image, lang)}
                      title={t(flow.title, lang)}
                      subtitle={t(flow.intro, lang)}
                      minutesLabel={minutesLabelForFlow(flow)}
                      onClick={() => history.push(`/flows/${flow.id}`)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-7">
            <div
              className="text-[18px] md:text-[20px]"
              style={{ fontFamily: 'var(--font-title), var(--font-inter), ui-sans-serif, system-ui, -apple-system', fontWeight: 500 }}
            >
              {categoriesTitle}
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3">
              {(() => {
                const byId = new Map(FLOW_CATEGORIES.map(c => [c.id, c] as const));

                const items: Array<{
                  categoryId: string;
                  icon: any;
                  iconColor: string;
                  subtitle: { ro: string; en: string };
                }> = [
                  {
                    categoryId: 'somatic-release',
                    icon: moonOutline,
                    iconColor: '#CDAF87',
                    subtitle: { ro: 'Eliberare somatică & reconectare', en: 'Somatic release & reconnection' },
                  },
                  {
                    categoryId: 'heart-balance',
                    icon: leafOutline,
                    iconColor: '#6F8A73',
                    subtitle: { ro: 'Practici de echilibru și reconectare', en: 'Practices for balance and reconnection' },
                  },
                  {
                    categoryId: 'mindset',
                    icon: sparklesOutline,
                    iconColor: '#C9A24D',
                    subtitle: { ro: 'Încredere, bani și obiective', en: 'Confidence, money, and goals' },
                  },
                  {
                    categoryId: 'emotional-regulation',
                    icon: heartOutline,
                    iconColor: '#D89A6A',
                    subtitle: { ro: 'Calmare & reducerea anxietății', en: 'Calming & anxiety relief' },
                  },
                ];

                return items.map(it => {
                  const cat = byId.get(it.categoryId);
                  if (!cat) return null;
                  return (
                    <CategoryPill
                      key={it.categoryId}
                      icon={it.icon}
                      iconColor={it.iconColor}
                      title={t(cat.title, lang)}
                      subtitle={isRo ? it.subtitle.ro : it.subtitle.en}
                      onClick={() => history.push(`/flows/category/${it.categoryId}`)}
                    />
                  );
                });
              })()}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

function SmallSessionCard(props: {
  imageSrc?: string;
  title: string;
  subtitle: string;
  minutesLabel: string;
  onClick: () => void;
}) {
  const { imageSrc, title, subtitle, minutesLabel, onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full overflow-hidden rounded-2xl text-left"
      style={{
        backgroundColor: '#FBF7F2',
        border: '1px solid rgba(232, 222, 211, 0.55)',
        boxShadow: '0 10px 24px rgba(120, 95, 70, 0.08)',
      }}
    >
      <div className="aspect-[16/10]" style={{ backgroundColor: 'rgba(197, 122, 74, 0.18)' }}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : null}
      </div>
      <div className="p-2.5">
        <div className="text-[14px] font-semibold leading-snug line-clamp-2" style={{ color: '#4E5B4F' }}>
          {title}
        </div>
        <div className="mt-1 text-[12px] leading-snug line-clamp-2" style={{ color: '#7A746C' }}>
          {subtitle}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-[12px] font-semibold" style={{ color: '#7A746C' }}>
            {minutesLabel}
          </div>
          <IonIcon icon={chevronForwardOutline} style={{ color: '#7A746C' }} />
        </div>
      </div>
    </button>
  );
}

function CategoryPill(props: {
  icon: string;
  iconColor: string;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  const { icon, iconColor, title, subtitle, onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl px-3 py-2.5 text-left flex items-center justify-between gap-3"
      style={{
        // Slightly darker than the warm cream background (#F4EFE8)
        backgroundColor: '#EEE6DC',
        border: '1px solid rgba(232, 222, 211, 0.65)',
        boxShadow: '0 10px 24px rgba(120, 95, 70, 0.08)',
      }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <IonIcon icon={icon} style={{ color: iconColor, fontSize: '22px' }} className="shrink-0" />
        <div className="min-w-0">
          <div className="text-[13px] font-semibold leading-snug line-clamp-2" style={{ color: '#4E5B4F' }}>
            {title}
          </div>
          <div className="text-[11px] leading-snug line-clamp-2" style={{ color: '#7A746C' }}>
            {subtitle}
          </div>
        </div>
      </div>
      <IonIcon icon={chevronForwardOutline} style={{ color: '#7A746C', fontSize: '18px' }} />
    </button>
  );
}

export default Home;
