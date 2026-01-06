'use client';

import { App as CapacitorApp } from '@capacitor/app';
import { useIonRouter } from '@ionic/react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function getFlowRouteFromReturnParam(returnTo: string | null): string | null {
  if (!returnTo) return null;
  // Expecting: /flows/:flowId/:practiceId
  const m = returnTo.match(/^\/flows\/([^/]+)\/[^/]+\/?$/);
  if (!m) return null;
  return `/flows/${m[1]}`;
}

/**
 * Android hardware back handling for the Ionic app shell.
 *
 * Goals:
 * - Go back exactly one screen in the Ionic stack (no "double pop").
 * - If we're at the root (Home) and there is no back stack, exit the app.
 * - If we're at a tab root but not Home, go to Home instead of doing nothing.
 * - Avoid the "subscribe trap": back from `/subscribe?return=...` should not bounce
 *   the user back into `/subscribe` again.
 *
 * Important: this component is mounted only inside `AppShell`, so it does NOT
 * affect Clerk auth pages or any external browser checkout flow.
 */
export default function HardwareBackHandler() {
  const ionRouter = useIonRouter();
  const location = useLocation();

  useEffect(() => {
    const handler = (ev: Event) => {
      // Ionic emits a custom event on Android back. Only the highest-priority
      // registered handler runs, which prevents "double pop".
      const anyEv = ev as any;
      anyEv?.detail?.register?.(100, () => {
        try {
          // Special-case: prevent "subscribe trap" loops.
          if (location.pathname === '/subscribe') {
            const sp = new URLSearchParams(location.search || '');
            const returnTo = sp.get('return');
            const flowRoute = getFlowRouteFromReturnParam(returnTo);
            ionRouter.push(flowRoute ?? '/home', 'back');
            return;
          }

          if (ionRouter.canGoBack()) {
            ionRouter.goBack();
            return;
          }

          const path = location.pathname || '/';
          if (path === '/home' || path === '/') {
            void CapacitorApp.exitApp();
            return;
          }

          // No back stack (tab root). Go to Home.
          ionRouter.push('/home', 'back');
        } catch {
          // As a last resort, do nothing.
        }
      });
    };

    document.addEventListener('ionBackButton', handler as any);
    return () => document.removeEventListener('ionBackButton', handler as any);
  }, [ionRouter, location.pathname]);

  return null;
}


