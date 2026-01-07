'use client';

import { App as CapacitorApp } from '@capacitor/app';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function sanitizeReturnTo(raw: string | null): string {
  if (!raw) return '/home';
  if (!raw.startsWith('/')) return '/home';
  if (raw.startsWith('//')) return '/home';
  return raw;
}

export default function DeepLinkReturnHandler() {
  const history = useHistory();

  useEffect(() => {
    let handle: { remove: () => Promise<void> } | null = null;

    (async () => {
      try {
        handle = await CapacitorApp.addListener('appUrlOpen', ({ url }) => {
          try {
            const u = new URL(url);
            // Accept both:
            // - custom scheme deep links: com.flowapp.app://sso-callback?...
            // - universal link fallbacks: https://www.flowbalance.app/subscribe-web/return?...
            const isCustomScheme = u.protocol === 'com.flowapp.app:' && u.hostname === 'sso-callback';
            const isUniversalReturn =
              (u.protocol === 'https:' || u.protocol === 'http:') &&
              (u.hostname === 'www.flowbalance.app' || u.hostname === 'flowbalance.app') &&
              u.pathname.startsWith('/subscribe-web/return');
            if (!isCustomScheme && !isUniversalReturn) return;

            const returnTo = sanitizeReturnTo(u.searchParams.get('return'));
            const subscribed = isUniversalReturn ? '1' : u.searchParams.get('subscribed');

            // If we just completed a subscription, give Clerk a moment to sync entitlements.
            if (subscribed === '1') {
              try {
                sessionStorage.setItem('flow_subscribe_pending', '1');
                window.setTimeout(() => {
                  try {
                    sessionStorage.removeItem('flow_subscribe_pending');
                  } catch {
                    // ignore
                  }
                }, 4000);
              } catch {
                // ignore
              }

              // Best-effort: force a Clerk session refresh so `has({ plan: ... })` updates ASAP.
              try {
                const w = window as unknown as {
                  Clerk?: { session?: { reload?: () => Promise<unknown> } };
                };
                void w.Clerk?.session?.reload?.();
              } catch {
                // ignore
              }
            }

            // Navigate within the Ionic router (no full reload)
            history.replace(returnTo);
          } catch {
            // ignore
          }
        });
      } catch {
        // ignore
      }
    })();

    return () => {
      void handle?.remove();
    };
  }, [history]);

  return null;
}

