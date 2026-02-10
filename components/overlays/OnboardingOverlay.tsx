'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useHistory } from 'react-router-dom';

import Store from '../../store';
import { t, type Flow, type Language } from '../../data/flows';
import onboardingNewForm from '../../data/onboardingNewForm.json';
import { FLOW_CATEGORIES } from '../pages/flowsCatalog';
import { saveOnboardingComplete } from '../../store/persistence';
import { hideOverlay, setOnboardingRecommendedFlows, setOnboardingRecommendations, setOnboardingSelectedNeeds, setOnboardingStart, setSettings } from '../../store/actions';

function firstPracticeId(flow: Flow): string | null {
  const practices = flow.practices ?? [];
  if (!practices.length) return null;
  return [...practices].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))[0]?.id ?? null;
}

function OptionButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        // Layout
        'w-full text-left rounded-2xl px-4 py-3',
        // Simple, visible button styling (no shadows)
        'border transition-colors',
        selected ? 'bg-white/20 border-white/45 ring-2 ring-white/25' : 'bg-white/10 border-white/20',
        'active:bg-white/25',
      ].join(' ')}
      style={{
        // Fallback in case some global CSS forces buttons transparent in certain WebViews
        backgroundColor: selected ? 'rgba(255,255,255,0.20)' : 'rgba(255,255,255,0.10)',
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className={[
            'mt-[2px] w-5 h-5 rounded-full flex items-center justify-center shrink-0',
            selected ? 'bg-white text-[#3b1b6a]' : 'bg-white/15 text-transparent',
          ].join(' ')}
          aria-hidden="true"
        >
          ✓
        </div>
        <div className="text-white text-[14px] md:text-[16px] leading-snug">{label}</div>
      </div>
    </button>
  );
}

export default function OnboardingOverlay() {
  const history = useHistory();
  const { userId } = useAuth();
  const flows = Store.useState(s => s.flows);
  const lang = Store.useState(s => s.settings.language) as Language;
  const isRo = lang === 'ro';

  const [step, setStep] = useState<'lang' | 'needs' | 'splash'>('lang');
  const [selectedLang, setSelectedLang] = useState<Language>('en');
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [splashFading, setSplashFading] = useState(false);

  const config = onboardingNewForm as unknown as {
    options: Array<{
      id: string;
      label: { ro: string; en: string };
      primary: { kind: 'flow' | 'category'; id: string };
      secondary: { kind: 'flow' | 'category'; id: string };
    }>;
    constraints: { minSelections: number; maxSelections: number };
    copy: {
      page2Title: { ro: string; en: string };
      page2Subtitle: { ro: string; en: string };
      submit: { ro: string; en: string };
    };
  };

  const canNext = useMemo(() => {
    if (step === 'lang') return Boolean(selectedLang);
    if (step === 'needs') return selectedNeeds.length >= config.constraints.minSelections;
    return false;
  }, [step, selectedLang, selectedNeeds.length, config.constraints.minSelections]);

  const goBack = () => {
    if (saving) return;
    if (step === 'lang') return;
    if (step === 'needs') return setStep('lang');
  };

  const goNext = async () => {
    if (saving) return;
    if (!canNext) return;
    if (step === 'lang') {
      // Apply language selection immediately; the whole app is language-based (UI + audio).
      const current = Store.getRawState().settings;
      setSettings({ ...(current as any), language: selectedLang } as any);
      // Move to Needs selection
      setStep('needs');
      return;
    }
    if (step === 'needs') await onFinish();
  };

  const resolveRefToFlowId = (ref: { kind: 'flow' | 'category'; id: string }): string | null => {
    if (ref.kind === 'flow') return flows.find(f => f.id === ref.id)?.id ?? ref.id;
    const cat = FLOW_CATEGORIES.find(c => c.id === ref.id) ?? null;
    if (!cat) return null;
    const byId = new Map(flows.map(f => [f.id, f] as const));
    for (const fid of cat.flowIds) {
      if (byId.has(fid)) return fid;
    }
    return null;
  };

  const computeRecommendedFlowIds = () => {
    const selectedSet = new Set(selectedNeeds);
    const selectedInOrder = config.options.filter(o => selectedSet.has(o.id));

    const resolved = selectedInOrder.map(o => ({
      id: o.id,
      primary: resolveRefToFlowId(o.primary),
      secondary: resolveRefToFlowId(o.secondary),
    }));

    const out: string[] = [];
    const add = (fid: string | null) => {
      if (!fid) return;
      if (!out.includes(fid)) out.push(fid);
    };

    if (resolved.length === 2) {
      for (const r of resolved) {
        add(r.primary);
        add(r.secondary);
      }
    } else if (resolved.length === 3) {
      add(resolved[0]?.primary ?? null);
      add(resolved[0]?.secondary ?? null);
      add(resolved[1]?.primary ?? null);
      add(resolved[2]?.primary ?? null);
      // If duplicates reduce the list, fill with remaining secondary flows in order
      add(resolved[1]?.secondary ?? null);
      add(resolved[2]?.secondary ?? null);
    } else if (resolved.length >= 4) {
      for (const r of resolved.slice(0, 4)) add(r.primary);
      // Fill with secondaries if duplicates reduce count
      for (const r of resolved.slice(0, 4)) {
        if (out.length >= 4) break;
        add(r.secondary);
      }
    }

    // Final safety: always provide 4 deterministic recommendations if possible.
    if (out.length < 4) {
      const byId = new Map(flows.map(f => [f.id, f] as const));
      for (const cat of FLOW_CATEGORIES) {
        for (const fid of cat.flowIds) {
          if (out.length >= 4) break;
          if (!byId.has(fid)) continue;
          add(fid);
        }
        if (out.length >= 4) break;
      }
    }

    return out.slice(0, 4);
  };

  const onFinish = async () => {
    if (saving) return;
    if (!userId) return;
    if (selectedNeeds.length < config.constraints.minSelections) return;

    setSaving(true);
    try {
      const recommendedFlowIds = computeRecommendedFlowIds();
      const flow = recommendedFlowIds[0] ? flows.find(f => f.id === recommendedFlowIds[0]) ?? null : null;
      const pid = flow ? firstPracticeId(flow) : null;
      const start = { flowId: flow?.id ?? null, practiceId: pid };

      await saveOnboardingComplete(
        userId,
        { selectedNeedIds: selectedNeeds, recommendedFlowIds, recommendedCategories: [] },
        start,
      );
      setOnboardingSelectedNeeds(selectedNeeds);
      setOnboardingRecommendedFlows(recommendedFlowIds);
      // Legacy field: clear it so Home uses the new behavior.
      setOnboardingRecommendations([]);
      setOnboardingStart(start.flowId ? { flowId: start.flowId, practiceId: start.practiceId } : null);

      // Show a short welcome splash, then fade away to reveal Home.
      setStep('splash');
      setSplashFading(false);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (step !== 'splash') return;
    let cancelled = false;
    const t1 = window.setTimeout(() => {
      if (cancelled) return;
      setSplashFading(true);
    }, 2650);
    const t2 = window.setTimeout(() => {
      if (cancelled) return;
      hideOverlay();
      history.push('/home');
    }, 3150);
    return () => {
      cancelled = true;
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [step, history]);

  const renderQuestion = () => {
    if (step === 'lang') {
      return (
        <>
          <div className="text-white/80 text-[12px] md:text-[13px] tracking-wide uppercase">
            {isRo ? 'SETUP' : 'SETUP'}
          </div>
          <div className="mt-3 text-white text-[20px] md:text-[26px] font-semibold leading-tight">
            {isRo ? 'Alege limba' : 'Choose your language'}
          </div>
          <div className="mt-2 text-white/75 text-[13px] md:text-[15px] leading-snug">
            {isRo
              ? 'Interfața și sesiunile audio sunt bazate pe limba aleasă. Poți schimba limba și mai târziu din Setări.'
              : 'The interface and all audio sessions follow this language. You can change it later in Settings.'}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <OptionButton
              label="English"
              selected={selectedLang === 'en'}
              onClick={() => setSelectedLang('en')}
            />
            <OptionButton
              label="Română"
              selected={selectedLang === 'ro'}
              onClick={() => setSelectedLang('ro')}
            />
          </div>
        </>
      );
    }

    return (
      <>
        <div className="text-white/80 text-[12px] md:text-[13px] tracking-wide uppercase">
          {isRo ? 'SETUP' : 'SETUP'}
        </div>
        <div className="mt-3 text-white text-[20px] md:text-[26px] font-semibold leading-tight">
          {t(config.copy.page2Title as any, lang)}
        </div>
        <div className="mt-2 text-white/75 text-[13px] md:text-[15px] leading-snug">
          {t(config.copy.page2Subtitle as any, lang)}
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {config.options.map(opt => {
            const selected = selectedNeeds.includes(opt.id);
            const onClick = () => {
              if (saving) return;
              setSelectedNeeds(prev => {
                if (prev.includes(opt.id)) return prev.filter(x => x !== opt.id);
                if (prev.length >= config.constraints.maxSelections) return prev;
                return [...prev, opt.id];
              });
            };
            const label = lang === 'ro' ? opt.label.ro : opt.label.en;
            return <OptionButton key={opt.id} label={label} selected={selected} onClick={onClick} />;
          })}
        </div>
      </>
    );
  };

  const renderSplash = () => {
    const headline = isRo ? 'Bine ai venit!' : 'Welcome!';
    const copy = isRo
      ? 'Am pregătit o recomandare pentru tine. Hai să începem.'
      : 'We’ve prepared a recommendation for you. Let’s begin.';

    return (
      <div
        className={[
          'h-full w-full flex items-center justify-center px-6',
          'transition-opacity duration-500',
          splashFading ? 'opacity-0' : 'opacity-100',
        ].join(' ')}
      >
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl text-center">
          <div className="text-white text-[28px] md:text-[36px] font-semibold">{headline}</div>
          <div className="mt-3 text-white/80 text-[15px] md:text-[18px] leading-snug">{copy}</div>
        </div>
      </div>
    );
  };

  if (step === 'splash') {
    // Fullscreen centered message (no top chrome), then fade away to reveal Home.
    return <div className="h-full w-full overflow-hidden">{renderSplash()}</div>;
  }

  return (
    <div className="h-full w-full overflow-auto">
      <div className="min-h-full px-5 py-6 pb-10 w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white/70 text-[12px] md:text-[13px]">
            {step === 'lang' ? '1/2' : step === 'needs' ? '2/2' : '✓'}
          </div>
          {step === 'needs' ? (
            <button type="button" onClick={goBack} className="text-white/80 text-[13px] md:text-[15px]">
              {isRo ? 'Înapoi' : 'Back'}
            </button>
          ) : (
            <div />
          )}
        </div>

        {renderQuestion()}

        <button
          type="button"
          disabled={!canNext || saving}
          onClick={goNext}
          className={[
            'mt-8 w-full rounded-2xl py-3 font-semibold',
            canNext ? 'bg-white text-[#3b1b6a]' : 'bg-white/20 text-white/60',
          ].join(' ')}
        >
          {step === 'lang'
            ? (isRo ? 'Continuă' : 'Continue')
            : step === 'needs'
              ? t(config.copy.submit as any, lang)
              : (isRo ? 'Finalizează' : 'Finish')}
        </button>
      </div>
    </div>
  );
}

