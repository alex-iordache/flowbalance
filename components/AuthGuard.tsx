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

    // Behavior:
    // - If signed out on "/", go to /sign-in so the user sees the auth UI.
    // - If signed out on any protected route, also go to /sign-in (we debug session loss via probes).
    if (!isLoaded) return;
    if (userId) return;
    const path =
      typeof window !== 'undefined' ? window.location.pathname + window.location.search : '';
    if (path.startsWith('/sign-in') || path.startsWith('/sign-up')) return;
    const returnTo = encodeURIComponent(path || '/home');
    console.log('[AuthGuard] signed out -> redirecting to /sign-in', { returnTo, path });
    window.location.replace(`/sign-in?return=${returnTo}`);
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
                    <h2 className="text-2xl font-bold">Opening sign in…</h2>
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
