'use client';

import { useMemo, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useHistory } from 'react-router-dom';

import Store from '../../store';
import { t, type Flow, type Language } from '../../data/flows';
import { ONBOARDING_QUESTIONS, type OnboardingOptionId } from '../../data/onboardingQuestions';
import { calculateCategoryScores, getDefaultFlowForCategory, getTop3Categories, type OnboardingAnswers } from '../../helpers/onboardingScoring';
import { saveOnboardingComplete } from '../../store/persistence';
import { hideOverlay } from '../../store/actions';
import { FLOW_CATEGORIES } from '../pages/flowsCatalog';

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
        'w-full text-left rounded-2xl px-4 py-3',
        'border border-white/15',
        selected ? 'bg-white/14' : 'bg-white/8',
        'active:bg-white/16',
      ].join(' ')}
    >
      <div className="text-white text-[14px] leading-snug">{label}</div>
    </button>
  );
}

export default function OnboardingOverlay() {
  const history = useHistory();
  const { userId } = useAuth();
  const flows = Store.useState(s => s.flows);
  const lang = Store.useState(s => s.settings.language) as Language;
  const isRo = lang === 'ro';

  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0); // 0..3 questions, 4 = result
  const [q1, setQ1] = useState<OnboardingAnswers['q1']>([]);
  const [q2, setQ2] = useState<OnboardingAnswers['q2'] | null>(null);
  const [q3, setQ3] = useState<OnboardingAnswers['q3'] | null>(null);
  const [q4, setQ4] = useState<OnboardingAnswers['q4'] | null>(null);
  const [saving, setSaving] = useState(false);

  const canNext = useMemo(() => {
    if (step === 0) return q1.length > 0 && q1.length <= 2;
    if (step === 1) return Boolean(q2);
    if (step === 2) return Boolean(q3);
    if (step === 3) return Boolean(q4);
    return true;
  }, [step, q1.length, q2, q3, q4]);

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

  const question = step <= 3 ? ONBOARDING_QUESTIONS[step] : null;

  const goBack = () => {
    if (saving) return;
    if (step === 0) return;
    setStep((step - 1) as any);
  };

  const goNext = () => {
    if (saving) return;
    if (!canNext) return;
    if (step < 3) setStep((step + 1) as any);
    else setStep(4);
  };

  const onSubmit = async () => {
    if (saving) return;
    if (!userId) return;
    if (!top3 || !answers) return;

    setSaving(true);
    try {
      const primary = top3[0] ?? 'emotional-regulation';
      const flow = getDefaultFlowForCategory(primary, flows) ?? null;
      const pid = flow ? firstPracticeId(flow) : null;

      await saveOnboardingComplete(userId, top3);
      hideOverlay();

      if (flow && pid) history.push(`/flows/${flow.id}/${pid}`);
      else if (flow) history.push(`/flows/${flow.id}`);
      else history.push('/home');
    } finally {
      setSaving(false);
    }
  };

  const renderQuestion = () => {
    if (!question) return null;

    const qTitle = t(question.title, lang);
    const qSubtitle = question.subtitle ? t(question.subtitle, lang) : '';

    return (
      <>
        <div className="text-white/80 text-[12px] tracking-wide uppercase">
          {isRo ? 'FLOW: Mind & Heart Balance' : 'FLOW: Mind & Heart Balance'}
        </div>
        <div className="mt-3 text-white text-[20px] font-semibold leading-tight">{title}</div>
        <div className="mt-2 text-white/75 text-[13px] leading-snug">{subtitle}</div>

        <div className="mt-7">
          <div className="text-white text-[16px] font-semibold leading-tight">{qTitle}</div>
          {qSubtitle ? <div className="mt-1 text-white/70 text-[12px]">{qSubtitle}</div> : null}
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

  const renderResult = () => {
    if (!top3) return null;
    const [a, b, c] = top3;
    const primary = a ?? 'emotional-regulation';
    const secondary = b ?? 'heart-balance';
    const tertiary = c ?? 'somatic-release';

    // Use category titles from catalog, but keep it simple here: show ID as fallback.
    const catTitle = (id: string) => {
      const cat = FLOW_CATEGORIES.find(x => x.id === id) ?? null;
      return cat ? t(cat.title, lang) : id;
    };

    return (
      <>
        <div className="text-white/80 text-[12px] tracking-wide uppercase">
          {isRo ? 'REZULTAT' : 'RESULT'}
        </div>
        <div className="mt-3 text-white text-[18px] font-semibold">
          {isRo ? 'Recomandarea ta personalizată:' : 'Your personalized recommendation:'}
        </div>
        <div className="mt-4 flex flex-col gap-2 text-white/90 text-[14px]">
          <div>1. {catTitle(primary)}</div>
          <div>2. {catTitle(secondary)}</div>
          <div>3. {catTitle(tertiary)}</div>
        </div>

        <button
          type="button"
          disabled={saving}
          onClick={onSubmit}
          className={[
            'mt-8 w-full rounded-2xl py-3 font-semibold',
            'bg-white text-[#3b1b6a]',
            saving ? 'opacity-70' : 'active:opacity-90',
          ].join(' ')}
        >
          {isRo ? 'Începe cu primul exercițiu (5 minute)' : 'Start with the first exercise (5 minutes)'}
        </button>
      </>
    );
  };

  return (
    <div className="h-full w-full overflow-auto">
      <div className="min-h-full px-5 py-6 pb-10 w-full max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white/70 text-[12px]">
            {step <= 3 ? `${step + 1}/4` : '✓'}
          </div>
          {step <= 3 && step > 0 ? (
            <button type="button" onClick={goBack} className="text-white/80 text-[13px]">
              {isRo ? 'Înapoi' : 'Back'}
            </button>
          ) : (
            <div />
          )}
        </div>

        {step <= 3 ? renderQuestion() : renderResult()}

        {step <= 3 ? (
          <button
            type="button"
            disabled={!canNext || saving}
            onClick={goNext}
            className={[
              'mt-8 w-full rounded-2xl py-3 font-semibold',
              canNext ? 'bg-white text-[#3b1b6a]' : 'bg-white/20 text-white/60',
            ].join(' ')}
          >
            {step < 3 ? (isRo ? 'Continuă' : 'Continue') : (isRo ? 'Vezi recomandarea' : 'See recommendation')}
          </button>
        ) : null}
      </div>
    </div>
  );
}

