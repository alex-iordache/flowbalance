'use client';

import { useEffect } from 'react';
import { App as CapApp } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';

/**
 * Global deep-link handler for native (Capacitor) builds.
 *
 * This must be mounted on ALL routes (including /sign-in and /sign-up),
 * otherwise deep links returning from in-app browser tabs won't be handled.
 */
export default function DeepLinkHandler() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    let handle: { remove: () => void } | null = null;

    CapApp.addListener('appUrlOpen', async ({ url }) => {
      if (typeof url !== 'string') return;
      if (!url.startsWith('com.flowapp.app://sso-callback')) return;

      try {
        const parsed = new URL(url);
        const flow = parsed.searchParams.get('flow');

        if (flow === 'signup') {
          // Close in-app browser tab (Custom Tab / SFSafariViewController)
          try {
            await Browser.close();
          } catch {}

          // Return user to in-app sign-in after sign-up
          // (sessions won't transfer from the browser tab to the WebView)
          window.location.href = '/sign-in?signup=success';
        }
      } catch {
        // ignore
      }
    }).then(h => {
      handle = h;
    });

    return () => {
      handle?.remove();
    };
  }, []);

  return null;
}

