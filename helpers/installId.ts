'use client';

import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

const INSTALL_ID_KEY = 'fb_install_id_v1';
const GLOBAL_KEY = '__fbInstallId';

function getGlobal(): string | null {
  try {
    return (globalThis as any)?.[GLOBAL_KEY] ?? null;
  } catch {
    return null;
  }
}

function setGlobal(v: string) {
  try {
    (globalThis as any)[GLOBAL_KEY] = v;
  } catch {
    // ignore
  }
}

function safeUuid(): string {
  const c = (globalThis as any)?.crypto;
  if (c && typeof c.randomUUID === 'function') return c.randomUUID();
  // Fallback: not cryptographically strong, but sufficient as a pseudonymous install id.
  return (
    'id-' +
    Math.random().toString(16).slice(2) +
    '-' +
    Date.now().toString(16) +
    '-' +
    Math.random().toString(16).slice(2)
  );
}

function getFromLocalStorage(): string | null {
  try {
    if (typeof window === 'undefined') return null;
    const v = window.localStorage.getItem(INSTALL_ID_KEY);
    return typeof v === 'string' && v.trim() ? v : null;
  } catch {
    return null;
  }
}

function setToLocalStorage(v: string) {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(INSTALL_ID_KEY, v);
  } catch {
    // ignore
  }
}

/**
 * Returns an installId synchronously if available.
 *
 * - Web: will create+persist one immediately (localStorage) on first call.
 * - Native: returns the cached global value (must be initialized via `initInstallId()`).
 */
export function getInstallIdSync(): string | null {
  const g = getGlobal();
  if (g) return g;

  // Web can create synchronously.
  if (!Capacitor.isNativePlatform()) {
    const existing = getFromLocalStorage();
    if (existing) {
      setGlobal(existing);
      return existing;
    }
    const created = safeUuid();
    setToLocalStorage(created);
    setGlobal(created);
    return created;
  }

  return null;
}

/**
 * Initializes installId on native (and also normalizes it for web).
 * Call once on app startup.
 */
export async function initInstallId(): Promise<string> {
  const existingGlobal = getGlobal();
  if (existingGlobal) return existingGlobal;

  // Web: sync path
  if (!Capacitor.isNativePlatform()) {
    const v = getInstallIdSync();
    return v || safeUuid();
  }

  // Native: Preferences
  const { value } = await Preferences.get({ key: INSTALL_ID_KEY });
  if (typeof value === 'string' && value.trim()) {
    setGlobal(value);
    return value;
  }

  const created = safeUuid();
  setGlobal(created);
  await Preferences.set({ key: INSTALL_ID_KEY, value: created });
  return created;
}

