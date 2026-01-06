'use client';

import { Capacitor } from '@capacitor/core';
import { useEffect } from 'react';

type NavLogEntry = {
  ts: string;
  kind: 'click' | 'location.assign' | 'location.replace' | 'history.pushState' | 'history.replaceState';
  href: string;
  detail: Record<string, unknown>;
  stack?: string;
};

const STORAGE_KEY = 'fb_nav_log_v1';
const MAX_ENTRIES = 50;

function safeRead(): NavLogEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as NavLogEntry[]) : [];
  } catch {
    return [];
  }
}

function safeWrite(entries: NavLogEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(-MAX_ENTRIES)));
  } catch {
    // ignore
  }
}

function push(entry: NavLogEntry) {
  const entries = safeRead();
  entries.push(entry);
  safeWrite(entries);
  console.warn('[fb] nav', entry);
}

/**
 * Investigation tool (no behavior change):
 * Logs navigation-related operations so we can identify why the WebView is escaping
 * into the system browser on Android.
 */
export default function NavigationLogger() {
  useEffect(() => {
    const isNative = Capacitor.isNativePlatform?.() ?? false;

    const getHref = () => {
      try {
        return window.location.href;
      } catch {
        return '';
      }
    };

    // Click capture: detects anchor clicks + targets.
    const onClickCapture = (e: MouseEvent) => {
      try {
        const el = e.target as Element | null;
        const a = el?.closest?.('a') as HTMLAnchorElement | null;
        if (!a) return;
        push({
          ts: new Date().toISOString(),
          kind: 'click',
          href: getHref(),
          detail: {
            isNative,
            anchorHref: a.href,
            anchorTarget: a.target,
            anchorRel: a.rel,
          },
          stack: new Error('anchor click stack').stack,
        });
      } catch {
        // ignore
      }
    };
    document.addEventListener('click', onClickCapture, true);

    // Patch Location.assign/replace (best effort).
    const locProto = (window.Location && (window.Location as any).prototype) || null;
    const originalAssign = locProto?.assign;
    const originalReplace = locProto?.replace;
    if (typeof originalAssign === 'function') {
      locProto.assign = function (url: string) {
        push({
          ts: new Date().toISOString(),
          kind: 'location.assign',
          href: getHref(),
          detail: { isNative, url },
          stack: new Error('location.assign stack').stack,
        });
        return originalAssign.call(this, url);
      };
    }
    if (typeof originalReplace === 'function') {
      locProto.replace = function (url: string) {
        push({
          ts: new Date().toISOString(),
          kind: 'location.replace',
          href: getHref(),
          detail: { isNative, url },
          stack: new Error('location.replace stack').stack,
        });
        return originalReplace.call(this, url);
      };
    }

    // Patch history push/replace.
    const originalPush = history.pushState.bind(history);
    const originalRep = history.replaceState.bind(history);
    history.pushState = function (data: any, unused: string, url?: string | URL | null) {
      push({
        ts: new Date().toISOString(),
        kind: 'history.pushState',
        href: getHref(),
        detail: { isNative, url: url ? String(url) : '' },
        stack: new Error('history.pushState stack').stack,
      });
      return originalPush(data, unused, url as any);
    } as any;
    history.replaceState = function (data: any, unused: string, url?: string | URL | null) {
      push({
        ts: new Date().toISOString(),
        kind: 'history.replaceState',
        href: getHref(),
        detail: { isNative, url: url ? String(url) : '' },
        stack: new Error('history.replaceState stack').stack,
      });
      return originalRep(data, unused, url as any);
    } as any;

    return () => {
      document.removeEventListener('click', onClickCapture, true);
      if (locProto) {
        if (typeof originalAssign === 'function') locProto.assign = originalAssign;
        if (typeof originalReplace === 'function') locProto.replace = originalReplace;
      }
      history.pushState = originalPush as any;
      history.replaceState = originalRep as any;
    };
  }, []);

  return null;
}


