'use client';

import { Capacitor } from '@capacitor/core';
import { useEffect } from 'react';

type WindowOpenLogEntry = {
  ts: string;
  href: string;
  url: string;
  target?: string;
  features?: string;
  stack?: string;
};

const STORAGE_KEY = 'fb_window_open_log_v1';
const MAX_ENTRIES = 30;

function safeRead(): WindowOpenLogEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as WindowOpenLogEntry[]) : [];
  } catch {
    return [];
  }
}

function safeWrite(entries: WindowOpenLogEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(-MAX_ENTRIES)));
  } catch {
    // ignore
  }
}

/**
 * Investigation tool (no behavior change):
 * Logs every `window.open()` call (URL + stack trace) so we can identify why
 * the system browser is being launched on Android.
 *
 * Enabled via `NEXT_PUBLIC_DEBUG_WINDOW_OPEN_LOG=1`.
 */
export default function WindowOpenLogger() {
  useEffect(() => {
    // The bug only happens on native, but logging in web doesn't hurt.
    const isNative = Capacitor.isNativePlatform?.() ?? false;
    const original = window.open?.bind(window);
    if (!original) return;

    window.open = ((url?: string | URL, target?: string, features?: string) => {
      try {
        const urlStr =
          typeof url === 'string'
            ? url
            : url instanceof URL
              ? url.toString()
              : '(non-string url)';

        const entry: WindowOpenLogEntry = {
          ts: new Date().toISOString(),
          href: (() => {
            try {
              return window.location.href;
            } catch {
              return '';
            }
          })(),
          url: urlStr,
          target,
          features,
          stack: new Error('window.open stack').stack,
        };

        const entries = safeRead();
        entries.push(entry);
        safeWrite(entries);

        // Also log to console for remote debugging tools.
        console.warn('[fb] window.open called', { isNative, ...entry });
      } catch {
        // ignore
      }

      return original(url as any, target as any, features as any);
    }) as any;

    return () => {
      window.open = original as any;
    };
  }, []);

  return null;
}


