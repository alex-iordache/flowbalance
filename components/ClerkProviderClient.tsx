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
       * Step-by-step iOS debugging:
       * - Do NOT allow Clerk to hard-navigate to hosted pages (accounts.*) because it creates a redirect chain.
       * - For Clerk's internal auth-step navigations (same-origin /sign-in/*), only mutate history (no network).
       * - Do NOT auto-navigate to /home from Clerk; we keep the user on the Signed-in page and require a tap.
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
          console.log('[ClerkNav] push requested', {
            to: url.toString(),
            meta: meta?.__internal_metadata ?? null,
          });

          if (meta?.__internal_metadata?.navigationType === 'window') {
            // This is the cross-origin hop that creates the redirect chain (accounts.*).
            console.log('[ClerkNav] BLOCKED window navigation (cross-origin)', url.toString());
            return;
          }

          if (url.pathname === '/home') {
            console.log('[ClerkNav] BLOCKED auto navigation to /home (step-by-step debug)');
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
          console.log('[ClerkNav] push failed to parse URL, falling back', { to, e });
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
          console.log('[ClerkNav] replace requested', {
            to: url.toString(),
            meta: meta?.__internal_metadata ?? null,
          });

          if (meta?.__internal_metadata?.navigationType === 'window') {
            console.log('[ClerkNav] BLOCKED window navigation (cross-origin)', url.toString());
            return;
          }

          if (url.pathname === '/home') {
            console.log('[ClerkNav] BLOCKED auto navigation to /home (step-by-step debug)');
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
          console.log('[ClerkNav] replace failed to parse URL, falling back', { to, e });
          window.location.replace(to);
        }
      }}
      routerDebug={true}

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


