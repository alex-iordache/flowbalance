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
  const consecutiveFailRef = useRef(0);
  const resumeGraceUntilRef = useRef<number>(0);

  useEffect(() => {
    const apply = async () => {
      // Never decide "offline" while backgrounded/locked — Android can pause timers/fetches.
      if (typeof document !== 'undefined' && document.visibilityState !== 'visible') return;

      // Fast hint first (if available)
      const hint = getQuickOfflineSignal();
      let offline: boolean;

      if (hint === true) {
        offline = true;
      } else {
        // Reliable probe (fixes Android WebView cases where `navigator.onLine` never flips)
        if (inflightRef.current) return;
        inflightRef.current = true;
        // After resuming from lock/background, give the network stack a moment to wake up.
        // Also use a slightly longer timeout to avoid false negatives.
        const now = Date.now();
        const timeoutMs = now < resumeGraceUntilRef.current ? 3000 : 1500;
        const ok = await probeOnline(timeoutMs);
        inflightRef.current = false;
        offline = !ok;
      }

      // Require 2 consecutive probe failures before showing the offline overlay.
      // This filters transient failures on resume/unlock.
      if (offline) {
        consecutiveFailRef.current += 1;
      } else {
        consecutiveFailRef.current = 0;
      }

      const effectiveOffline = offline && (hint === true || consecutiveFailRef.current >= 2);

      if (lastOfflineRef.current === effectiveOffline) return;
      lastOfflineRef.current = effectiveOffline;

      if (effectiveOffline) {
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
      if (document.visibilityState === 'visible') {
        // Network can be briefly "cold" on resume; avoid false offline.
        resumeGraceUntilRef.current = Date.now() + 3000;
        inflightRef.current = false;
        void apply();
      } else {
        // If we background while a probe is inflight, it may never resolve (timers paused).
        // Clear inflight so we can probe again on resume.
        inflightRef.current = false;
      }
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

