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
      // Force Clerk to use hard navigations instead of Next router navigations.
      routerPush={(to: string) => {
        try {
          // If Clerk is navigating to home after auth, mark it so AuthGuard can wait for hydration.
          const url = new URL(to, window.location.origin);
          if (url.pathname === '/home') {
            if (!url.searchParams.has('auth')) url.searchParams.set('auth', '1');
            localStorage.setItem('fb:postAuthTs', String(Date.now()));
            localStorage.setItem('fb:postAuthFrom', 'clerk-routerPush');
          }
          window.location.assign(url.toString());
          return;
        } catch {
          // ignore
        }
        window.location.assign(to);
      }}
      routerReplace={(to: string) => {
        try {
          const url = new URL(to, window.location.origin);
          if (url.pathname === '/home') {
            if (!url.searchParams.has('auth')) url.searchParams.set('auth', '1');
            localStorage.setItem('fb:postAuthTs', String(Date.now()));
            localStorage.setItem('fb:postAuthFrom', 'clerk-routerReplace');
          }
          window.location.replace(url.toString());
          return;
        } catch {
          // ignore
        }
        window.location.replace(to);
      }}
      routerDebug={true}

      clerkJSVersion="5.117.0"
      // Prefer first-party Clerk custom domain for WKWebView cookie/session reliability.
      clerkJSUrl="https://clerk.flowbalance.app/npm/@clerk/clerk-js@5.117.0/dist/clerk.browser.js"

      // Global redirect defaults (avoid legacy redirectUrl).
      // Step 1 for debugging iOS: keep post-auth navigation on the auth page itself.
      // We then render a "Signed in" screen (and NOT <SignIn/>) when userId exists.
      signInFallbackRedirectUrl="/sign-in?done=1"
      signInForceRedirectUrl="/sign-in?done=1"
      signUpFallbackRedirectUrl="/sign-up?done=1"
      signUpForceRedirectUrl="/sign-up?done=1"
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


