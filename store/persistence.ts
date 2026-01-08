import { Preferences } from '@capacitor/preferences';
import Store from '.';
import type { Flow } from '../data/flows';
import { defaultFlows } from '../data/flows';

const STORAGE_KEYS = {
  FLOWS: 'flows_state',
  SETTINGS: 'settings_state',
  LISTS: 'lists_state',
  ONBOARDING_COMPLETE: 'onboarding_complete',
} as const;

// Save flows state to Preferences
export const saveFlowsState = async () => {
  try {
    const flows = Store.getRawState().flows;
    await Preferences.set({
      key: STORAGE_KEYS.FLOWS,
      value: JSON.stringify(flows),
    });
  } catch (error) {
    console.error('Error saving flows state:', error);
  }
};

// Load flows state from Preferences
export const loadFlowsState = async (): Promise<Flow[] | null> => {
  try {
    const { value } = await Preferences.get({ key: STORAGE_KEYS.FLOWS });
    if (value) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.error('Error loading flows state:', error);
  }
  return null;
};

// Save settings state to Preferences
export const saveSettingsState = async () => {
  try {
    const settings = Store.getRawState().settings;
    await Preferences.set({
      key: STORAGE_KEYS.SETTINGS,
      value: JSON.stringify(settings),
    });
  } catch (error) {
    console.error('Error saving settings state:', error);
  }
};

// Load settings state from Preferences
export const loadSettingsState = async () => {
  try {
    const { value } = await Preferences.get({ key: STORAGE_KEYS.SETTINGS });
    if (value) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.error('Error loading settings state:', error);
  }
  return null;
};

// Save lists state to Preferences
export const saveListsState = async () => {
  try {
    const lists = Store.getRawState().lists;
    await Preferences.set({
      key: STORAGE_KEYS.LISTS,
      value: JSON.stringify(lists),
    });
  } catch (error) {
    console.error('Error saving lists state:', error);
  }
};

// Load lists state from Preferences
export const loadListsState = async () => {
  try {
    const { value } = await Preferences.get({ key: STORAGE_KEYS.LISTS });
    if (value) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.error('Error loading lists state:', error);
  }
  return null;
};

// Load all persisted state and merge with defaults
export const loadAllPersistedState = async () => {
  const [persistedFlows, settings, lists] = await Promise.all([
    loadFlowsState(),
    loadSettingsState(),
    loadListsState(),
  ]);

  Store.update(s => {
    // Merge persisted flows with default flows to preserve user progress while using fresh content
    if (persistedFlows) {
      const persistedAny = persistedFlows as unknown as Array<Record<string, any>>;
      s.flows = defaultFlows.map(defaultFlow => {
        const persistedFlow = persistedAny.find(pf => pf?.id === defaultFlow.id);
        if (persistedFlow) {
          // Merge: use default content but preserve user progress
          return {
            ...defaultFlow,
            started: Boolean(persistedFlow.started),
            finished: Boolean(persistedFlow.finished),
            practicesCompleted:
              typeof persistedFlow.practicesCompleted === 'number'
                ? persistedFlow.practicesCompleted
                : defaultFlow.practicesCompleted,
            lastPracticeFinishedId:
              typeof persistedFlow.lastPracticeFinishedId === 'string'
                ? persistedFlow.lastPracticeFinishedId
                : defaultFlow.lastPracticeFinishedId,
            lastPracticePositionSec:
              typeof persistedFlow.lastPracticePositionSec === 'number'
                ? persistedFlow.lastPracticePositionSec
                : defaultFlow.lastPracticePositionSec,
            practices: defaultFlow.practices.map(defaultPractice => {
              const persistedPractice = Array.isArray(persistedFlow.practices)
                ? persistedFlow.practices.find((pp: any) => pp?.id === defaultPractice.id)
                : null;
              return persistedPractice
                ? {
                    ...defaultPractice,
                    finished: Boolean(persistedPractice.finished),
                    lastPositionSec:
                      typeof persistedPractice.lastPositionSec === 'number'
                        ? persistedPractice.lastPositionSec
                        : defaultPractice.lastPositionSec,
                  }
                : defaultPractice;
            }),
          };
        }
        return defaultFlow;
      });
    }

    if (settings) {
      // Merge to keep forward-compatible defaults (e.g. newly added settings fields).
      s.settings = { ...(s.settings as any), ...(settings as any) };
      if (!(s.settings as any).language) (s.settings as any).language = 'en';
    }
    if (lists) {
      s.lists = lists;
    }
  });
};

type OnboardingCompleteRecord = {
  userId: string;
  completedAt: string; // ISO timestamp
  recommendedCategories: string[];
  startFlowId: string | null;
  startPracticeId: string | null;
};

function onboardingKeyForUser(userId: string) {
  return `${STORAGE_KEYS.ONBOARDING_COMPLETE}:${userId}`;
}

export async function saveOnboardingComplete(
  userId: string,
  recommendedCategories: string[],
  start: { flowId: string | null; practiceId: string | null },
) {
  try {
    const rec: OnboardingCompleteRecord = {
      userId,
      completedAt: new Date().toISOString(),
      recommendedCategories,
      startFlowId: start.flowId,
      startPracticeId: start.practiceId,
    };
    await Preferences.set({
      key: onboardingKeyForUser(userId),
      value: JSON.stringify(rec),
    });
  } catch (error) {
    console.error('Error saving onboarding completion:', error);
  }
}

export async function hasCompletedOnboarding(userId: string): Promise<boolean> {
  try {
    const { value } = await Preferences.get({ key: onboardingKeyForUser(userId) });
    if (!value) return false;
    const parsed = JSON.parse(value) as Partial<OnboardingCompleteRecord> | null;
    return Boolean(parsed && parsed.userId === userId && parsed.completedAt);
  } catch (error) {
    console.error('Error checking onboarding completion:', error);
    return false;
  }
}

export async function loadOnboardingComplete(
  userId: string,
): Promise<OnboardingCompleteRecord | null> {
  try {
    const { value } = await Preferences.get({ key: onboardingKeyForUser(userId) });
    if (!value) return null;
    const parsed = JSON.parse(value) as Partial<OnboardingCompleteRecord> | null;
    if (!parsed || parsed.userId !== userId || !parsed.completedAt) return null;
    return {
      userId,
      completedAt: String(parsed.completedAt),
      recommendedCategories: Array.isArray(parsed.recommendedCategories)
        ? (parsed.recommendedCategories.filter(x => typeof x === 'string') as string[])
        : [],
      startFlowId: typeof parsed.startFlowId === 'string' ? parsed.startFlowId : null,
      startPracticeId: typeof parsed.startPracticeId === 'string' ? parsed.startPracticeId : null,
    };
  } catch (error) {
    console.error('Error loading onboarding completion:', error);
    return null;
  }
}

