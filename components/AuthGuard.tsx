'use client';

import { useAuth, SignedIn, SignedOut, ClerkLoading, ClerkLoaded } from '@clerk/nextjs';
import React, { useEffect } from 'react';
import { IonApp, IonContent, IonPage, IonSpinner } from '@ionic/react';
import SuperAdminBootstrap from './SuperAdminBootstrap';

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard Component
 * 
 * Wraps the app to require authentication.
 * - Shows loading spinner while Clerk loads
 * - Redirects to sign-in if not authenticated
 * - Shows app content if authenticated
 */
export default function AuthGuard({ children }: AuthGuardProps) {
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    try {
      // Helpful for debugging WebView auth issues (iOS): shows whether Clerk ever sees a session.
      console.log('[AuthGuard]', {
        ts: new Date().toISOString(),
        isLoaded,
        userId: userId ?? null,
        path: typeof window !== 'undefined' ? window.location.pathname + window.location.search : '',
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('[AuthGuard] debug log failed', e);
    }

    if (!isLoaded) return;
    if (userId) {
      try {
        localStorage.removeItem('fb:postAuthTs');
        localStorage.removeItem('fb:postAuthUserId');
        localStorage.removeItem('fb:postAuthFrom');
        console.log('[AuthGuard] cleared fb:postAuth* (localStorage)');
      } catch (e) {
        console.log('[AuthGuard] clearing fb:postAuth* failed', e);
      }
      // If we came from auth return (`/home?auth=1`), clean up the URL once signed in.
      try {
        const url = new URL(window.location.href);
        if (url.searchParams.get('auth') === '1') {
          url.searchParams.delete('auth');
          window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
        }
      } catch {
        // ignore
      }
      return;
    }

    // If signed out, redirect to /sign-in — but give a small grace period on auth return.
    const pathname = window.location.pathname || '/';
    if (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')) return;

    let delayMs = 300; // normal
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.get('auth') === '1') delayMs = 3000; // post-login settle window (iOS WKWebView)
    } catch (e) {
      console.log('[AuthGuard] URL parse failed for auth=1 check', e);
    }

    // If we *just* observed a signed-in state on a previous page (SignIn/SignUp) and redirected here,
    // give Clerk longer to rehydrate in iOS WKWebView before forcing /sign-in.
    try {
      const tsStr = localStorage.getItem('fb:postAuthTs');
      const ts = tsStr ? Number(tsStr) : NaN;
      if (Number.isFinite(ts)) {
        const age = Date.now() - ts;
        if (age >= 0 && age < 15000) {
          delayMs = Math.max(delayMs, 6000);
          console.log('[AuthGuard] postAuth grace window active', {
            ageMs: age,
            delayMs,
            from: localStorage.getItem('fb:postAuthFrom'),
            uid: localStorage.getItem('fb:postAuthUserId'),
          });
        }
      } else {
        console.log('[AuthGuard] no postAuthTs in localStorage');
      }
    } catch (e) {
      console.log('[AuthGuard] reading fb:postAuthTs failed', e);
    }

    console.log('[AuthGuard] signed out; scheduling redirect', { delayMs, pathname });
    const t = window.setTimeout(() => {
      // Effect will be cleaned up if userId becomes available.
      console.log('[AuthGuard] redirect timer fired; sending to /sign-in');
      window.location.replace('/sign-in');
    }, delayMs);
    return () => window.clearTimeout(t);
  }, [isLoaded, userId]);

  return (
    <>
      <ClerkLoading>
        <IonApp>
          <IonPage>
            <IonContent>
              <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-purple-600">
                <div className="text-center text-white">
                  <IonSpinner name="crescent" className="w-16 h-16 mb-4" />
                  <h2 className="text-2xl font-bold">Loading Flow...</h2>
                </div>
              </div>
            </IonContent>
          </IonPage>
        </IonApp>
      </ClerkLoading>

      <ClerkLoaded>
        <SignedOut>
          <IonApp>
            <IonPage>
              <IonContent>
                <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-purple-600">
                  <div className="text-center text-white">
                    <IonSpinner name="crescent" className="w-16 h-16 mb-4" />
                    <h2 className="text-2xl font-bold">Redirecting to sign in...</h2>
                  </div>
                </div>
              </IonContent>
            </IonPage>
          </IonApp>
        </SignedOut>

        <SignedIn>
          <SuperAdminBootstrap />
          {children}
        </SignedIn>
      </ClerkLoaded>
    </>
  );
}
