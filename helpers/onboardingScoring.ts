import type { Flow } from '../data/flows';
import type { OnboardingCategoryId, OnboardingOptionId } from '../data/onboardingQuestions';
import { FLOW_CATEGORIES } from '../components/pages/flowsCatalog';

export type OnboardingAnswers = {
  q1: Array<
    | 'q1_anxious'
    | 'q1_stressed'
    | 'q1_overwhelmed'
    | 'q1_disconnected'
    | 'q1_physical_agitation'
    | 'q1_generally_ok'
  >; // max 2
  q2:
    | 'q2_anxiety_panic'
    | 'q2_stress_pressure'
    | 'q2_focus_productivity'
    | 'q2_confidence_clarity'
    | 'q2_emotional_imbalance'
    | 'q2_body_tension';
  q3:
    | 'q3_calm_nervous_system'
    | 'q3_focus_clarity'
    | 'q3_emotional_support'
    | 'q3_body_release'
    | 'q3_motivated_confident'
    | 'q3_sleep_better';
  q4:
    | 'q4_short_calming'
    | 'q4_audio_voice'
    | 'q4_body_based'
    | 'q4_stories_reflections'
    | 'q4_practical_tools';
};

export type CategoryScore = {
  categoryId: OnboardingCategoryId;
  score: number;
};

const DEFAULT_FALLBACK: OnboardingCategoryId[] = [
  'emotional-regulation',
  'heart-balance',
  'somatic-release',
];

function bump(map: Record<OnboardingCategoryId, number>, categoryId: OnboardingCategoryId, delta: number) {
  map[categoryId] = (map[categoryId] ?? 0) + delta;
}

export function calculateCategoryScores(answers: OnboardingAnswers): CategoryScore[] {
  const scores: Record<OnboardingCategoryId, number> = {
    'emotional-regulation': 0,
    'performance-boost': 0,
    mindset: 0,
    stories: 0,
    'heart-balance': 0,
    'somatic-release': 0,
  };

  // Q1 (max 2)
  for (const opt of answers.q1) {
    if (opt === 'q1_anxious' || opt === 'q1_stressed' || opt === 'q1_overwhelmed') {
      bump(scores, 'emotional-regulation', 2);
    } else if (opt === 'q1_disconnected') {
      bump(scores, 'heart-balance', 2);
    } else if (opt === 'q1_physical_agitation') {
      bump(scores, 'somatic-release', 2);
    } else if (opt === 'q1_generally_ok') {
      bump(scores, 'mindset', 1);
      bump(scores, 'performance-boost', 1);
    }
  }

  // Q2 (single)
  switch (answers.q2) {
    case 'q2_anxiety_panic':
      bump(scores, 'emotional-regulation', 3);
      break;
    case 'q2_stress_pressure':
      bump(scores, 'emotional-regulation', 2);
      bump(scores, 'performance-boost', 1);
      break;
    case 'q2_focus_productivity':
      bump(scores, 'performance-boost', 3);
      break;
    case 'q2_confidence_clarity':
      bump(scores, 'mindset', 3);
      break;
    case 'q2_emotional_imbalance':
      bump(scores, 'heart-balance', 3);
      break;
    case 'q2_body_tension':
      bump(scores, 'somatic-release', 3);
      break;
  }

  // Q3 (single)
  switch (answers.q3) {
    case 'q3_calm_nervous_system':
    case 'q3_sleep_better':
      bump(scores, 'emotional-regulation', 3);
      break;
    case 'q3_emotional_support':
      bump(scores, 'heart-balance', 3);
      break;
    case 'q3_body_release':
      bump(scores, 'somatic-release', 3);
      break;
    case 'q3_focus_clarity':
      bump(scores, 'performance-boost', 3);
      break;
    case 'q3_motivated_confident':
      bump(scores, 'mindset', 2);
      bump(scores, 'performance-boost', 1);
      break;
  }

  // Q4 (single)
  switch (answers.q4) {
    case 'q4_short_calming':
    case 'q4_audio_voice':
      bump(scores, 'emotional-regulation', 1);
      break;
    case 'q4_body_based':
      bump(scores, 'somatic-release', 1);
      break;
    case 'q4_stories_reflections':
      bump(scores, 'stories', 1);
      break;
    case 'q4_practical_tools':
      bump(scores, 'performance-boost', 1);
      break;
  }

  const defaultOrder = new Map<OnboardingCategoryId, number>(DEFAULT_FALLBACK.map((id, i) => [id, i]));

  const out: CategoryScore[] = (Object.keys(scores) as OnboardingCategoryId[]).map(categoryId => ({
    categoryId,
    score: scores[categoryId] ?? 0,
  }));

  out.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    // deterministic ties: prefer fallback order, then lexicographic
    const ai = defaultOrder.has(a.categoryId) ? (defaultOrder.get(a.categoryId) as number) : 999;
    const bi = defaultOrder.has(b.categoryId) ? (defaultOrder.get(b.categoryId) as number) : 999;
    if (ai !== bi) return ai - bi;
    return a.categoryId.localeCompare(b.categoryId);
  });

  return out;
}

export function getTop3Categories(scores: CategoryScore[]): OnboardingCategoryId[] {
  const anyNonZero = scores.some(s => (s.score ?? 0) > 0);
  if (!anyNonZero) return [...DEFAULT_FALLBACK];
  return scores.slice(0, 3).map(s => s.categoryId);
}

export function getDefaultFlowForCategory(categoryId: OnboardingCategoryId, flows: Flow[]): Flow | null {
  const cat = FLOW_CATEGORIES.find(c => c.id === categoryId) ?? null;
  if (!cat) return null;
  const byId = new Map(flows.map(f => [f.id, f]));
  for (const flowId of cat.flowIds) {
    const flow = byId.get(flowId);
    if (flow) return flow;
  }
  return null;
}

export function isValidOnboardingOptionId(id: string): id is OnboardingOptionId {
  return id.startsWith('q1_') || id.startsWith('q2_') || id.startsWith('q3_') || id.startsWith('q4_');
}

