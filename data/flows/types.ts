export type Language = 'ro' | 'en';

/**
 * Simple bilingual container.
 *
 * We intentionally keep it as `{ ro, en }` (not nested objects), so:
 * - it’s easy to destructure
 * - it serializes cleanly (for future export/import)
 */
export type Localized<T> = {
  ro: T;
  en: T;
};

export type LocalizedText = Localized<string>;
export type LocalizedUrl = Localized<string>;

/**
 * Helper for picking the current language. (UI language switch will come later.)
 */
export function t<T>(value: Localized<T>, lang: Language): T {
  return value[lang] ?? value.ro;
}

export type PracticeId = string;
export type FlowId = string;

export type PracticeContent = {
  /** Title shown in the header bar. */
  title: LocalizedText;
  /** Display name inside lists/cards. */
  name: LocalizedText;
  intro: LocalizedText;
  description: LocalizedText;
  audioUrl: LocalizedUrl;
};

export type PracticeStateDefaults = {
  finished: boolean;
  /** Last playback position in seconds. */
  lastPositionSec: number;
};

export type Practice = PracticeContent &
  PracticeStateDefaults & {
    id: PracticeId;
    /** Used for ordering practices within a flow. */
    position: number;
  };

export type FlowContent = {
  /** Title shown in the header bar. */
  title: LocalizedText;
  /** Display name inside lists/cards. */
  name: LocalizedText;
  intro: LocalizedText;
  description: LocalizedText;
  image: LocalizedUrl; // public path
  /**
   * When true, this flow is visible in the UI but its content is not accessible yet.
   * (Explicit flag — do NOT infer from cover image.)
   */
  comingSoon?: boolean;
};

export type FlowStateDefaults = {
  started: boolean;
  finished: boolean;
  practicesCompleted: number;
  lastPracticeFinishedId: PracticeId | null;
  /** Last playback position in seconds (last played practice). */
  lastPracticePositionSec: number;
};

export type Flow = FlowContent &
  FlowStateDefaults & {
    id: FlowId;
    /** Used for ordering flows within the list. */
    position: number;
    totalPractices: number;
    practices: Practice[];
  };

