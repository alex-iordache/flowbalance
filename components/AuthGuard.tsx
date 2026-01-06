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
    if (!isLoaded) return;
    if (userId) {
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
    } catch {
      // ignore
    }

    const t = window.setTimeout(() => {
      // Effect will be cleaned up if userId becomes available.
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
