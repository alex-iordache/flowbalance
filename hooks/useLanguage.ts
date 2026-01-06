'use client';

import Store from '../store';

/**
 * App-wide language setting (persisted in `Store.settings.language`).
 *
 * This is intentionally simple: it relies on the existing store persistence
 * (`loadAllPersistedState` + `saveSettingsState`).
 */
export function useLanguage(): 'ro' | 'en' {
  return Store.useState(s => s.settings.language);
}


