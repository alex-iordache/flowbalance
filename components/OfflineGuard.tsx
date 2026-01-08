'use client';

import { useEffect, useRef } from 'react';

import Store from '../store';
import { hideOverlay, showOverlay } from '../store/actions';

function isOfflineNow(): boolean {
  // Best-effort: in WKWebView this is generally good enough for v1.
  // (We can later upgrade to @capacitor/network for more reliable signal.)
  if (typeof navigator === 'undefined') return false;
  return navigator.onLine === false;
}

export default function OfflineGuard() {
  const overlayType = Store.useState(s => s.overlayType);
  const lastOfflineRef = useRef<boolean | null>(null);

  useEffect(() => {
    const apply = () => {
      const offline = isOfflineNow();
      if (lastOfflineRef.current === offline) return;
      lastOfflineRef.current = offline;

      if (offline) {
        // Don't stomp other overlays (onboarding, etc.). We'll just avoid showing offline overlay in that case.
        if (overlayType) return;
        showOverlay('offline', {
          message: 'You can browse the app, but some features require an internet connection.',
        });
        return;
      }

      // Back online: only hide if we are the one showing.
      if (overlayType === 'offline') hideOverlay();
    };

    apply();

    window.addEventListener('online', apply);
    window.addEventListener('offline', apply);

    return () => {
      window.removeEventListener('online', apply);
      window.removeEventListener('offline', apply);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overlayType]);

  return null;
}

