import { Preferences } from '@capacitor/preferences';
import Store from '.';
import { Flow } from '../data';

const STORAGE_KEYS = {
  FLOWS: 'flows_state',
  SETTINGS: 'settings_state',
  LISTS: 'lists_state',
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
  const [flows, settings, lists] = await Promise.all([
    loadFlowsState(),
    loadSettingsState(),
    loadListsState(),
  ]);

  if (flows || settings || lists) {
    Store.update(s => {
      if (flows) {
        s.flows = flows;
      }
      if (settings) {
        s.settings = settings;
      }
      if (lists) {
        s.lists = lists;
      }
    });
  }
};

