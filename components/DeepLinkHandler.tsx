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

          // If we received a transferable sign-in token, send it to /sign-in so the WebView can
          // establish a Clerk session and continue straight into the app.
          const ticket = parsed.searchParams.get('ticket');
          const target = new URL('/sign-in', window.location.origin);
          target.searchParams.set('signup', 'success');
          if (ticket) target.searchParams.set('ticket', ticket);

          // Force a navigation so the SignIn page can consume the ticket.
          window.location.replace(target.toString());
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

