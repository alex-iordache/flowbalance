'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useHistory } from 'react-router-dom';

import Store from '../../store';
import { t, type Flow, type Language } from '../../data/flows';
import { ONBOARDING_QUESTIONS, type OnboardingOptionId } from '../../data/onboardingQuestions';
import { calculateCategoryScores, getDefaultFlowForCategory, getTop3Categories, type OnboardingAnswers } from '../../helpers/onboardingScoring';
import { saveOnboardingComplete } from '../../store/persistence';
import { hideOverlay, setOnboardingRecommendations, setOnboardingStart, setSettings } from '../../store/actions';

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

  const [step, setStep] = useState<'lang' | 0 | 1 | 2 | 3 | 'splash'>('lang');
  const [selectedLang, setSelectedLang] = useState<Language>('en');
  const [q1, setQ1] = useState<OnboardingAnswers['q1']>([]);
  const [q2, setQ2] = useState<OnboardingAnswers['q2'] | null>(null);
  const [q3, setQ3] = useState<OnboardingAnswers['q3'] | null>(null);
  const [q4, setQ4] = useState<OnboardingAnswers['q4'] | null>(null);
  const [saving, setSaving] = useState(false);
  const [splashFading, setSplashFading] = useState(false);

  const canNext = useMemo(() => {
    if (step === 'lang') return Boolean(selectedLang);
    if (step === 0) return q1.length > 0 && q1.length <= 2;
    if (step === 1) return Boolean(q2);
    if (step === 2) return Boolean(q3);
    if (step === 3) return Boolean(q4);
    return false;
  }, [step, selectedLang, q1.length, q2, q3, q4]);

  const answers: OnboardingAnswers | null = useMemo(() => {
    if (!q2 || !q3 || !q4) return null;
    return { q1, q2, q3, q4 };
  }, [q1, q2, q3, q4]);

  const top3 = useMemo(() => {
    if (!answers) return null;
    const scores = calculateCategoryScores(answers);
    return getTop3Categories(scores);
  }, [answers]);

  const title = isRo ? 'Hai să-ți recomandăm cel mai bun punct de start' : 'Let’s recommend the best place to start';
  const subtitle = isRo
    ? 'Răspunde la câteva întrebări scurte și îți vom sugera cu ce să începi.'
    : 'Answer a few quick questions and we’ll suggest what to start with.';

  const question = typeof step === 'number' ? ONBOARDING_QUESTIONS[step] : null;

  const goBack = () => {
    if (saving) return;
    if (step === 'lang') return;
    if (typeof step === 'number') {
      if (step === 0) return setStep('lang');
      setStep((step - 1) as any);
    }
  };

  const goNext = async () => {
    if (saving) return;
    if (!canNext) return;
    if (step === 'lang') {
      // Apply language selection immediately; the whole app is language-based (UI + audio).
      const current = Store.getRawState().settings;
      setSettings({ ...(current as any), language: selectedLang } as any);
      // Move to Q1
      setStep(0);
      return;
    }
    if (typeof step === 'number' && step < 3) setStep((step + 1) as any);
    else if (step === 3) await onFinish();
  };

  const onFinish = async () => {
    if (saving) return;
    if (!userId) return;
    if (!top3 || !answers) return;

    setSaving(true);
    try {
      const primary = top3[0] ?? 'emotional-regulation';
      const flow = getDefaultFlowForCategory(primary, flows) ?? null;
      const pid = flow ? firstPracticeId(flow) : null;
      const start = { flowId: flow?.id ?? null, practiceId: pid };

      await saveOnboardingComplete(userId, top3, start);
      setOnboardingRecommendations(top3);
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

    if (!question) return null;

    const qTitle = t(question.title, lang);
    const qSubtitle = question.subtitle ? t(question.subtitle, lang) : '';

    return (
      <>
        <div className="text-white/80 text-[12px] md:text-[13px] tracking-wide uppercase">
          {isRo ? 'FLOW: Mind & Heart Balance' : 'FLOW: Mind & Heart Balance'}
        </div>
        <div className="mt-3 text-white text-[20px] md:text-[26px] font-semibold leading-tight">{title}</div>
        <div className="mt-2 text-white/75 text-[13px] md:text-[15px] leading-snug">{subtitle}</div>

        <div className="mt-7">
          <div className="text-white text-[16px] md:text-[20px] font-semibold leading-tight">{qTitle}</div>
          {qSubtitle ? <div className="mt-1 text-white/70 text-[12px] md:text-[14px]">{qSubtitle}</div> : null}
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {question.options.map(opt => {
            const label = t(opt.label, lang);
            const id = opt.id as OnboardingOptionId;

            const selected =
              question.id === 'q1'
                ? q1.includes(id as any)
                : question.id === 'q2'
                  ? q2 === (id as any)
                  : question.id === 'q3'
                    ? q3 === (id as any)
                    : q4 === (id as any);

            const onClick = () => {
              if (saving) return;
              if (question.id === 'q1') {
                setQ1(prev => {
                  if (prev.includes(id as any)) return prev.filter(x => x !== (id as any)) as any;
                  if (prev.length >= question.maxSelections) return prev;
                  return [...prev, id as any];
                });
                return;
              }
              if (question.id === 'q2') setQ2(id as any);
              if (question.id === 'q3') setQ3(id as any);
              if (question.id === 'q4') setQ4(id as any);
            };

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
            {step === 'lang' ? '1/5' : typeof step === 'number' ? `${step + 2}/5` : '✓'}
          </div>
          {typeof step === 'number' && step >= 0 ? (
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
            : typeof step === 'number' && step < 3
              ? (isRo ? 'Continuă' : 'Continue')
              : (isRo ? 'Finalizează' : 'Finish')}
        </button>
      </div>
    </div>
  );
}

