'use client';

import { Capacitor } from '@capacitor/core';
import { useEffect } from 'react';

function isClerkHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (h.endsWith('.clerk.accounts.dev')) return true;
  if (h === 'clerk.accounts.dev') return true;
  if (h.endsWith('.clerk.com')) return true;
  if (h === 'clerk.com') return true;
  return false;
}

/**
 * Capacitor Android/iOS WebViews often open `window.open()` in the system browser.
 * Clerk may use `window.open()` during certain auth flows; that can cause an unwanted
 * external browser to appear.
 *
 * This shim keeps **Clerk** navigations inside the WebView by redirecting the current
 * window instead of opening a new one (native-only).
 *
 * Important: we intentionally do NOT intercept non-Clerk URLs so flows like checkout
 * (which we open explicitly via `openExternalUrl()` / AppLauncher) remain external.
 */
export default function NativeWindowOpenShim() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    if (typeof window === 'undefined') return;

    const original = window.open?.bind(window);
    if (!original) return;

    window.open = ((url?: string | URL, target?: string, features?: string) => {
      try {
        if (typeof url === 'string' && url.trim()) {
          const u = new URL(url, window.location.href);
          if (isClerkHost(u.hostname)) {
            // Keep the flow inside the WebView.
            window.location.assign(u.toString());
            return null as any;
          }
        } else if (url instanceof URL) {
          if (isClerkHost(url.hostname)) {
            window.location.assign(url.toString());
            return null as any;
          }
        }
      } catch {
        // fall through to original
      }

      return original(url as any, target as any, features as any);
    }) as any;

    return () => {
      window.open = original as any;
    };
  }, []);

  return null;
}


