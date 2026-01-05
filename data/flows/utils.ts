import type { Flow, Language, Localized, LocalizedText, Practice } from './types';

export function localizedText(ro: string, en?: string): LocalizedText {
  return { ro, en: en ?? ro };
}

export function localizedUrl(ro: string, en?: string): Localized<string> {
  return { ro, en: en ?? ro };
}

export function slugify(input: string): string {
  // Keep it simple + deterministic for folder names.
  return input
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getLocalized<T>(value: Localized<T>, lang: Language): T {
  return value[lang] ?? value.ro;
}

export function withTotals(flow: Omit<Flow, 'totalPractices'>): Flow {
  return { ...flow, totalPractices: flow.practices.length };
}

export function sortByPosition<T extends { position: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.position - b.position);
}

export function computePracticesCompleted(practices: Practice[]): number {
  return practices.reduce((acc, p) => acc + (p.finished ? 1 : 0), 0);
}

