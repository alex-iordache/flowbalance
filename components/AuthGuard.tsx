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

    // IMPORTANT (iOS debugging):
    // - On first app load (usually "/"), we *do* redirect to /sign-in so users see the auth UI.
    // - On protected routes, we do NOT auto-redirect; we render a SignedOut overlay with manual CTA.
    if (!isLoaded) return;
    if (userId) return;
    const pathname = window.location.pathname || '/';
    if (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')) return;
    if (pathname === '/') {
      console.log('[AuthGuard] signed out on "/" -> redirecting to /sign-in');
      window.location.replace('/sign-in');
      return;
    }
    console.log('[AuthGuard] signed out on a protected route; NOT auto-redirecting (manual CTA only)', {
      pathname,
    });
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
                    <h2 className="text-2xl font-bold">
                      {typeof window !== 'undefined' && window.location.pathname === '/'
                        ? 'Opening sign in…'
                        : 'Session required'}
                    </h2>
                    {typeof window !== 'undefined' && window.location.pathname === '/' ? null : (
                      <p className="text-sm opacity-90 mt-2">
                        If you were just signed in and got kicked out, Clerk likely lost the session in the WebView.
                      </p>
                    )}
                    <div className="mt-5 flex flex-col gap-3">
                      <button
                        className="w-full bg-white/20 hover:bg-white/25 text-white py-3 rounded-xl font-semibold"
                        onClick={() => {
                          window.location.href = '/sign-in';
                        }}
                      >
                        Go to Sign in
                      </button>
                      <button
                        className="w-full bg-white/10 hover:bg-white/15 text-white py-3 rounded-xl font-semibold"
                        onClick={() => {
                          window.location.reload();
                        }}
                      >
                        Reload app
                      </button>
                    </div>
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
