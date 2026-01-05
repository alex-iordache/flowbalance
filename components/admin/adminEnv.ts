import { Capacitor } from '@capacitor/core';

/**
 * Admin is web-only and intended for desktop browsers.
 * This is a best-effort heuristic (no server-side dependence).
 */
export function isDesktopWeb(): boolean {
  if (typeof window === 'undefined') return false;
  if (Capacitor.isNativePlatform()) return false;

  try {
    const finePointer = window.matchMedia?.('(pointer: fine)')?.matches ?? false;
    const wide = window.matchMedia?.('(min-width: 1024px)')?.matches ?? window.innerWidth >= 1024;
    return finePointer && wide;
  } catch {
    return false;
  }
}

