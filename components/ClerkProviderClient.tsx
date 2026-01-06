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
        window.location.assign(to);
      }}
      routerReplace={(to: string) => {
        window.location.replace(to);
      }}
      routerDebug={true}

      clerkJSVersion="5.117.0"
      // Prefer first-party Clerk custom domain for WKWebView cookie/session reliability.
      clerkJSUrl="https://clerk.flowbalance.app/npm/@clerk/clerk-js@5.117.0/dist/clerk.browser.js"

      // Global redirect defaults (avoid legacy redirectUrl).
      // IMPORTANT: Do NOT default redirects back to /sign-in or Clerk will include
      // `redirect_url=/sign-in` in the hosted sign-in URL, creating a loop in iOS WKWebView.
      signInFallbackRedirectUrl="/home"
      signInForceRedirectUrl="/home"
      signUpFallbackRedirectUrl="/home"
      signUpForceRedirectUrl="/home"
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


