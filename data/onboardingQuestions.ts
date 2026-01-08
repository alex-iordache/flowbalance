import type { LocalizedText } from './flows';

export type OnboardingCategoryId =
  | 'emotional-regulation'
  | 'performance-boost'
  | 'mindset'
  | 'stories'
  | 'heart-balance'
  | 'somatic-release';

export type OnboardingQuestionId = 'q1' | 'q2' | 'q3' | 'q4';

export type OnboardingOptionId =
  // Q1 (max 2)
  | 'q1_anxious'
  | 'q1_stressed'
  | 'q1_overwhelmed'
  | 'q1_disconnected'
  | 'q1_physical_agitation'
  | 'q1_generally_ok'
  // Q2 (single)
  | 'q2_anxiety_panic'
  | 'q2_stress_pressure'
  | 'q2_focus_productivity'
  | 'q2_confidence_clarity'
  | 'q2_emotional_imbalance'
  | 'q2_body_tension'
  // Q3 (single)
  | 'q3_calm_nervous_system'
  | 'q3_focus_clarity'
  | 'q3_emotional_support'
  | 'q3_body_release'
  | 'q3_motivated_confident'
  | 'q3_sleep_better'
  // Q4 (single)
  | 'q4_short_calming'
  | 'q4_audio_voice'
  | 'q4_body_based'
  | 'q4_stories_reflections'
  | 'q4_practical_tools';

export type OnboardingQuestionOption = {
  id: OnboardingOptionId;
  label: LocalizedText;
};

export type OnboardingQuestion = {
  id: OnboardingQuestionId;
  title: LocalizedText;
  subtitle?: LocalizedText;
  options: OnboardingQuestionOption[];
  maxSelections: number;
};

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  {
    id: 'q1',
    title: {
      ro: 'Cum te simți cel mai des în această perioadă?',
      en: 'How do you feel most often lately?',
    },
    subtitle: { ro: '(alege maximum 2 opțiuni)', en: '(choose up to 2)' },
    maxSelections: 2,
    options: [
      { id: 'q1_anxious', label: { ro: 'Anxios / neliniștit', en: 'Anxious / restless' } },
      { id: 'q1_stressed', label: { ro: 'Stresat / tensionat', en: 'Stressed / tense' } },
      {
        id: 'q1_overwhelmed',
        label: { ro: 'Copleșit / obosit mental', en: 'Overwhelmed / mentally tired' },
      },
      {
        id: 'q1_disconnected',
        label: { ro: 'Deconectat emoțional', en: 'Emotionally disconnected' },
      },
      {
        id: 'q1_physical_agitation',
        label: { ro: 'Obosit fizic / agitat', en: 'Physically tired / agitated' },
      },
      {
        id: 'q1_generally_ok',
        label: { ro: 'În general bine, dar vreau mai mult echilibru', en: 'Generally ok, but want more balance' },
      },
    ],
  },
  {
    id: 'q2',
    title: {
      ro: 'Care este cea mai mare provocare pentru tine acum?',
      en: 'What is your biggest challenge right now?',
    },
    subtitle: { ro: '(alege o singură opțiune)', en: '(choose one)' },
    maxSelections: 1,
    options: [
      { id: 'q2_anxiety_panic', label: { ro: 'Anxietate, panică sau neliniște', en: 'Anxiety, panic, or restlessness' } },
      { id: 'q2_stress_pressure', label: { ro: 'Stres și presiune zilnică', en: 'Daily stress and pressure' } },
      { id: 'q2_focus_productivity', label: { ro: 'Lipsă de concentrare sau productivitate', en: 'Lack of focus or productivity' } },
      { id: 'q2_confidence_clarity', label: { ro: 'Lipsă de încredere sau claritate', en: 'Lack of confidence or clarity' } },
      { id: 'q2_emotional_imbalance', label: { ro: 'Dezechilibru emoțional', en: 'Emotional imbalance' } },
      { id: 'q2_body_tension', label: { ro: 'Tensiune în corp sau neliniște fizică', en: 'Body tension or physical restlessness' } },
    ],
  },
  {
    id: 'q3',
    title: { ro: 'Ce ți-ar fi cel mai de ajutor chiar acum?', en: 'What would help you most right now?' },
    subtitle: { ro: '(alege o singură opțiune)', en: '(choose one)' },
    maxSelections: 1,
    options: [
      { id: 'q3_calm_nervous_system', label: { ro: 'Să-mi liniștesc sistemul nervos', en: 'Calm my nervous system' } },
      { id: 'q3_focus_clarity', label: { ro: 'Să-mi clarific mintea și să mă concentrez', en: 'Clarify my mind and focus' } },
      { id: 'q3_emotional_support', label: { ro: 'Să mă simt susținut emoțional', en: 'Feel emotionally supported' } },
      { id: 'q3_body_release', label: { ro: 'Să eliberez tensiunea din corp', en: 'Release tension from my body' } },
      { id: 'q3_motivated_confident', label: { ro: 'Să mă simt mai motivat și încrezător', en: 'Feel more motivated and confident' } },
      { id: 'q3_sleep_better', label: { ro: 'Să dorm mai bine', en: 'Sleep better' } },
    ],
  },
  {
    id: 'q4',
    title: { ro: 'Cum preferi să începi?', en: 'How do you prefer to start?' },
    subtitle: { ro: '(alege una)', en: '(choose one)' },
    maxSelections: 1,
    options: [
      { id: 'q4_short_calming', label: { ro: 'Exerciții scurte de calmare', en: 'Short calming exercises' } },
      { id: 'q4_audio_voice', label: { ro: 'Ghidaje audio cu voce', en: 'Guided audio (voice)' } },
      { id: 'q4_body_based', label: { ro: 'Practici bazate pe corp', en: 'Body-based practices' } },
      { id: 'q4_stories_reflections', label: { ro: 'Povești sau reflecții ghidate', en: 'Stories or guided reflections' } },
      { id: 'q4_practical_tools', label: { ro: 'Instrumente practice pentru performanță', en: 'Practical performance tools' } },
    ],
  },
];

