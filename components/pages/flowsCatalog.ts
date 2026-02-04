import type { LocalizedText } from '../../data/flows';

export type FlowCategoryDef = {
  id: string;
  title: LocalizedText;
  flowIds: string[];
  /** Theme number (1..6) used by `flowtheme.ts`. */
  theme: 1 | 2 | 3 | 4 | 5 | 6;
  /** Tailwind background classes for the category card. */
  bgClass: string;
  /** CSS gradient used for category page background + header. */
  gradientCss: string;
};

export const FLOW_CATEGORIES: FlowCategoryDef[] = [
  {
    id: 'emotional-regulation',
    title: { ro: 'Reglare emoțională', en: 'Emotional Regulation' },
    flowIds: [
      'Craving-Relief',
      'Ease-Overwhelm',
    ],
    theme: 1,
    bgClass: 'bg-gradient-to-br from-sky-500 to-indigo-600',
    gradientCss: 'linear-gradient(135deg, #0ea5e9 0%, #4f46e5 100%)',
  },
  {
    id: 'performance-boost',
    title: { ro: 'Performanță', en: 'Performance Boost' },
    flowIds: [
      'Improve-Sleep',
    ],
    theme: 2,
    bgClass: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    gradientCss: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)',
  },
  {
    id: 'mindset',
    title: { ro: 'Mindset', en: 'Mindset' },
    flowIds: [
      'Build-Self-Trust',
      'Healthy-Money-Mindset',
    ],
    theme: 3,
    bgClass: 'bg-gradient-to-br from-violet-500 to-fuchsia-600',
    gradientCss: 'linear-gradient(135deg, #8b5cf6 0%, #c026d3 100%)',
  },
  {
    id: 'stories',
    title: { ro: 'Povești', en: 'Stories' },
    flowIds: ['Calm-Stories'],
    theme: 4,
    bgClass: 'bg-gradient-to-br from-orange-500 to-amber-600',
    gradientCss: 'linear-gradient(135deg, #f97316 0%, #d97706 100%)',
  },
  {
    id: 'heart-balance',
    title: { ro: 'Echilibru al inimii', en: 'Heart Balance' },
    flowIds: [
      'Heartful-Gratitude',
      'Boost-Motivation',
      'Self-Compassion',
      'Daily-Heart-Lift',
    ],
    theme: 5,
    bgClass: 'bg-gradient-to-br from-rose-500 to-pink-600',
    gradientCss: 'linear-gradient(135deg, #f43f5e 0%, #db2777 100%)',
  },
  {
    id: 'somatic-release',
    title: { ro: 'Eliberare somatică', en: 'Somatic Release' },
    flowIds: ['Body-Release'],
    theme: 6,
    bgClass: 'bg-gradient-to-br from-cyan-500 to-blue-600',
    gradientCss: 'linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)',
  },
];

export function getCategoryById(categoryId: string): FlowCategoryDef | null {
  return FLOW_CATEGORIES.find(c => c.id === categoryId) ?? null;
}

export function getCategoryForFlowId(flowId: string): FlowCategoryDef | null {
  return FLOW_CATEGORIES.find(c => c.flowIds.includes(flowId)) ?? null;
}

