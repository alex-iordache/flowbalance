'use client';

import { Capacitor } from '@capacitor/core';
import { CapacitorCookies } from '@capacitor/core';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useRef } from 'react';

type CookieSnapshot = {
  ts: string;
  host: string;
  cookieCount: number;
  cookieNames: string[];
  clerkCookieNames: string[];
  hasProbeHttp: boolean;
};

function getClientCookieNames(): string[] {
  try {
    const raw = document.cookie || '';
    if (!raw.trim()) return [];
    return raw
      .split(';')
      .map(x => x.trim())
      .filter(Boolean)
      .map(pair => pair.split('=')[0]?.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function uniqSorted(xs: string[]) {
  return Array.from(new Set(xs)).sort();
}

function isLikelyIOS() {
  try {
    const ua = navigator.userAgent || '';
    return /iPad|iPhone|iPod/i.test(ua);
  } catch {
    return false;
  }
}

/**
 * Logs cookie/session state periodically to diagnose iOS WKWebView session loss.
 *
 * - Client-side `document.cookie` can NOT show HttpOnly cookies (Clerk session cookies are typically HttpOnly).
 * - The `/api/debug/cookies` endpoint logs cookie NAMES as seen by the server (includes HttpOnly).
 *
 * IMPORTANT: This intentionally never logs cookie values or tokens.
 */
export default function AuthCookieProbe() {
  const { isLoaded, userId, getToken } = useAuth();
  const lastServerRef = useRef<CookieSnapshot | null>(null);
  const lastClientRef = useRef<string[] | null>(null);
  const lastNativeRef = useRef<Record<string, string[]> | null>(null);

  useEffect(() => {
    // Only run in native iOS (avoid polluting web console).
    if (!Capacitor.isNativePlatform()) return;
    if (!isLikelyIOS()) return;

    let stopped = false;

    const tick = async () => {
      if (stopped) return;

      const href = (() => {
        try {
          return window.location.href;
        } catch {
          return '';
        }
      })();

      const clientNames = uniqSorted(getClientCookieNames());
      const prevClient = lastClientRef.current;
      lastClientRef.current = clientNames;

      let tokenOk: boolean | null = null;
      let tokenErr: string | null = null;
      try {
        if (isLoaded) {
          const t = await getToken();
          tokenOk = Boolean(t);
        }
      } catch (e) {
        tokenOk = false;
        tokenErr = e instanceof Error ? e.message : String(e);
      }

      // Server snapshot (includes HttpOnly cookies)
      let server: CookieSnapshot | null = null;
      let serverErr: string | null = null;
      try {
        const r = await fetch('/api/debug/cookies', {
          method: 'GET',
          credentials: 'include',
          cache: 'no-store',
          headers: { 'x-fb-debug': '1' },
        });
        server = (await r.json()) as CookieSnapshot;
      } catch (e) {
        serverErr = e instanceof Error ? e.message : String(e);
      }

      const prevServer = lastServerRef.current;
      lastServerRef.current = server;

      // Native cookie jar snapshot (CapacitorCookies)
      const nativeByUrl: Record<string, string[]> = {};
      const nativeUrls = [
        'https://www.flowbalance.app',
        'https://flowbalance.app',
        'https://accounts.flowbalance.app',
        'https://clerk.flowbalance.app',
      ];
      let nativeErr: string | null = null;
      try {
        for (const url of nativeUrls) {
          // CapacitorCookies can return values; we only log cookie NAMES.
          const map = await CapacitorCookies.getCookies({ url });
          nativeByUrl[url] = uniqSorted(Object.keys(map ?? {}));
        }
      } catch (e) {
        nativeErr = e instanceof Error ? e.message : String(e);
      }
      const prevNative = lastNativeRef.current;
      lastNativeRef.current = nativeByUrl;

      const clientChanged =
        !prevClient ||
        prevClient.length !== clientNames.length ||
        prevClient.join(',') !== clientNames.join(',');

      let serverChanged = false;
      if (server) {
        serverChanged =
          !prevServer ||
          prevServer.cookieNames.length !== server.cookieNames.length ||
          prevServer.cookieNames.join(',') !== server.cookieNames.join(',') ||
          prevServer.hasProbeHttp !== server.hasProbeHttp;
      }

      const nativeChanged = (() => {
        if (!prevNative) return true;
        const keys = Object.keys(nativeByUrl).sort();
        const prevKeys = Object.keys(prevNative).sort();
        if (keys.join('|') !== prevKeys.join('|')) return true;
        for (const k of keys) {
          const a = (prevNative[k] ?? []).join(',');
          const b = (nativeByUrl[k] ?? []).join(',');
          if (a !== b) return true;
        }
        return false;
      })();

      // Always log a single compact line; add diffs only when something changes.
      console.log('[AuthCookieProbe]', {
        ts: new Date().toISOString(),
        href,
        clerk: { isLoaded, userId: userId ?? null },
        tokenOk,
        tokenErr,
        clientCookies: {
          enabled: (() => {
            try {
              return navigator.cookieEnabled;
            } catch {
              return null;
            }
          })(),
          count: clientNames.length,
          names: clientNames,
          changed: clientChanged,
        },
        serverCookies: server
          ? {
              host: server.host,
              count: server.cookieCount,
              clerkNames: server.clerkCookieNames,
              hasProbeHttp: server.hasProbeHttp,
              changed: serverChanged,
            }
          : { error: serverErr },
        nativeCookies: nativeErr
          ? { error: nativeErr }
          : {
              urls: nativeByUrl,
              changed: nativeChanged,
              // Handy: is our test HttpOnly probe visible in the native cookie store for www?
              hasProbeHttp:
                (nativeByUrl['https://www.flowbalance.app'] ?? []).includes('fb_probe_http') ||
                (nativeByUrl['https://flowbalance.app'] ?? []).includes('fb_probe_http'),
            },
      });
    };

    // Start with an immediate tick; then keep polling.
    void tick();
    const interval = window.setInterval(() => void tick(), 5000);

    const onVisibility = () => void tick();
    window.addEventListener('visibilitychange', onVisibility);

    return () => {
      stopped = true;
      window.clearInterval(interval);
      window.removeEventListener('visibilitychange', onVisibility);
    };
  }, [getToken, isLoaded, userId]);

  return null;
}


