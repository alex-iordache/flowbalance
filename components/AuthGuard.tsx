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
  const { isLoaded, userId, isSignedIn } = useAuth();

  useEffect(() => {
    // Behavior:
    // - If signed out on "/", go to /sign-in so the user sees the auth UI.
    // - If signed out on any protected route, also go to /sign-in (we debug session loss via probes).
    if (!isLoaded) return;
    // IMPORTANT:
    // `userId` can be transiently null during session restore / app resume (especially after Safari checkout).
    // Only treat the user as truly signed out when Clerk explicitly reports `isSignedIn === false`.
    if (userId) return;
    if (isSignedIn !== false) return;
    const path =
      typeof window !== 'undefined' ? window.location.pathname + window.location.search : '';
    if (path.startsWith('/sign-in') || path.startsWith('/sign-up')) return;
    const redirectUrl = encodeURIComponent(path || '/home');
    window.location.replace(`/sign-in?redirect_url=${redirectUrl}`);
  }, [isLoaded, userId, isSignedIn]);

  return (
    <>
      <ClerkLoading>
        <IonApp>
          <IonPage>
            <IonContent>
              <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--fb-bg)' }}>
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
                <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--fb-bg)' }}>
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
