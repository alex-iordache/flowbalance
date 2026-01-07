'use client';

import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';

type Props = {
  children: React.ReactNode;
};

/**
 * iOS WKWebView + Next App Router:
 * Clerk's internal client-side navigations can trigger Next RSC fetches.
 * In WKWebView those can fail and cause a full reload, cancelling in-flight navigations.
 *
 * We force Clerk navigation to be "hard" navigations to avoid RSC payload fetches.
 */
export default function ClerkProviderClient({ children }: Props) {
  return (
    <ClerkProvider
      /**
       * iOS WKWebView stability:
       * - Do NOT allow cross-origin hosted hops (accounts.*) inside the WebView.
       * - For Clerk's internal auth-step navigations (same-origin /sign-in/*), only mutate history (no network).
       */
      routerPush={function (
        to: string,
        meta?:
          | {
              __internal_metadata?: { routing?: string; navigationType?: string };
              windowNavigate?: (to: URL | string) => void;
            }
          | undefined,
      ) {
        try {
          const url = new URL(to, window.location.origin);
          if (meta?.__internal_metadata?.navigationType === 'window') {
            // This is the cross-origin hop that creates the redirect chain (accounts.*).
            return;
          }

          if (
            url.origin === window.location.origin &&
            (url.pathname.startsWith('/sign-in') || url.pathname.startsWith('/sign-up'))
          ) {
            window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`);
            window.dispatchEvent(new PopStateEvent('popstate'));
            return;
          }

          window.location.assign(url.toString());
        } catch (e) {
          window.location.assign(to);
        }
      }}
      routerReplace={function (
        to: string,
        meta?:
          | {
              __internal_metadata?: { routing?: string; navigationType?: string };
              windowNavigate?: (to: URL | string) => void;
            }
          | undefined,
      ) {
        try {
          const url = new URL(to, window.location.origin);
          if (meta?.__internal_metadata?.navigationType === 'window') {
            return;
          }

          if (
            url.origin === window.location.origin &&
            (url.pathname.startsWith('/sign-in') || url.pathname.startsWith('/sign-up'))
          ) {
            window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
            window.dispatchEvent(new PopStateEvent('popstate'));
            return;
          }

          window.location.replace(url.toString());
        } catch (e) {
          window.location.replace(to);
        }
      }}
      routerDebug={false}

      clerkJSVersion="5.117.0"
      // Prefer first-party Clerk custom domain for WKWebView cookie/session reliability.
      clerkJSUrl="https://clerk.flowbalance.app/npm/@clerk/clerk-js@5.117.0/dist/clerk.browser.js"

      /**
       * IMPORTANT:
       * We do NOT set signIn/signUp *Force/Fallback* redirect URLs here.
       *
       * Those props are exactly what end up as:
       *   sign_in_force_redirect_url=... and redirect_url=...
       * in the hosted `accounts.*` URL, which is the redirect chain you pasted.
       *
       * For step-by-step iOS debugging, we instead:
       * - block cross-origin ("window") navigations in routerPush/routerReplace
       * - block auto navigation to /home
       * - render a "Signed in" screen on /sign-in when userId exists
       */
      afterSignOutUrl="/sign-in"

      allowedRedirectOrigins={[
        'https://www.flowbalance.app',
        'https://flowbalance.app',
        'https://flowbalance.vercel.app',
        'https://flowbalance-staging.vercel.app',
        'capacitor://localhost',
        'http://localhost',
        'ionic://localhost',
      ]}
    >
      {children}
    </ClerkProvider>
  );
}


