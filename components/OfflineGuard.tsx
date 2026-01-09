'use client';

import { useEffect, useRef } from 'react';

import Store from '../store';
import { hideOverlay, showOverlay } from '../store/actions';

function getQuickOfflineSignal(): boolean | null {
  // In some WebViews `navigator.onLine` is unreliable; treat it as a hint only.
  if (typeof navigator === 'undefined') return null;
  if (navigator.onLine === false) return true;
  if (navigator.onLine === true) return false;
  return null;
}

async function probeOnline(timeoutMs: number): Promise<boolean> {
  // IMPORTANT:
  // When the app is running from `capacitor://localhost`, probing `window.location.origin`
  // only tells us whether the *local* bundle is reachable, not whether the internet is up.
  // We specifically want to know if we can reach the remote app origin.
  const REMOTE_ORIGIN = 'https://www.flowbalance.app';
  try {
    const controller = new AbortController();
    const t = window.setTimeout(() => controller.abort(), timeoutMs);
    const url = `${REMOTE_ORIGIN}/favicon.ico?ping=${Date.now()}`;
    const res = await fetch(url, {
      method: 'HEAD',
      cache: 'no-store',
      signal: controller.signal,
    });
    window.clearTimeout(t);
    // Any HTTP response means we have connectivity to the app origin.
    return res.ok || (res.status >= 200 && res.status < 500);
  } catch {
    return false;
  }
}

export default function OfflineGuard() {
  const overlayType = Store.useState(s => s.overlayType);
  const lastOfflineRef = useRef<boolean | null>(null);
  const inflightRef = useRef(false);

  useEffect(() => {
    const apply = async () => {
      // Fast hint first (if available)
      const hint = getQuickOfflineSignal();
      let offline: boolean;

      if (hint === true) {
        offline = true;
      } else {
        // Reliable probe (fixes Android WebView cases where `navigator.onLine` never flips)
        if (inflightRef.current) return;
        inflightRef.current = true;
        const ok = await probeOnline(1500);
        inflightRef.current = false;
        offline = !ok;
      }

      if (lastOfflineRef.current === offline) return;
      lastOfflineRef.current = offline;

      if (offline) {
        // Don't stomp onboarding; otherwise show offline overlay even if the app continues to navigate from cache.
        if (overlayType === 'onboarding') return;
        showOverlay('offline');
        return;
      }

      if (overlayType === 'offline') hideOverlay();
    };

    // Run once quickly
    void apply();

    // Event-based updates (best effort)
    window.addEventListener('online', () => void apply());
    window.addEventListener('offline', () => void apply());
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') void apply();
    });

    // Polling fallback (Android WebView often misses events)
    const interval = window.setInterval(() => void apply(), 2500);

    return () => {
      window.clearInterval(interval);
      // note: anonymous listeners can't be removed; acceptable for app lifetime, but keep scope stable in future refactor
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overlayType]);

  return null;
}

