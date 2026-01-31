'use client';

import { useAuth, SignedIn, SignedOut, ClerkLoading, ClerkLoaded, SignIn } from '@clerk/nextjs';
import React from 'react';
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
  const { userId, isSignedIn } = useAuth();

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
              <IonContent scrollY={true}>
                <div
                  className="flex flex-col items-center justify-center min-h-full p-4"
                  style={{
                    paddingTop: 'env(safe-area-inset-top)',
                    paddingBottom: 'env(safe-area-inset-bottom)',
                    background: 'var(--fb-bg)',
                  }}
                >
                  <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl space-y-4">
                    {/* 
                      IMPORTANT:
                      We render SignIn inline (instead of redirecting to /sign-in) because iOS WKWebView
                      can emit NSURLErrorDomain -999 during normal redirects/navigation replacements.
                      Our native offline fallback interprets provisional failures as "go offline", which can
                      trap the user on the offline page instead of showing auth.
                    */}
                    <SignIn
                      routing="virtual"
                      signUpUrl="/sign-up"
                      appearance={{
                        elements: {
                          rootBox: 'mx-auto',
                          card: 'shadow-xl',
                          // iOS Safari/WKWebView zooms the page when focusing inputs with font-size < 16px.
                          // Force 16px to prevent the post-keyboard "stuck zoom" bug on first sign-in.
                          formFieldInput: 'text-[16px]',
                          formButtonPrimary: 'bg-purple-600 hover:bg-purple-700',
                          footerActionLink: 'text-purple-600 hover:text-purple-700',
                        },
                      }}
                      // Prefer the last location as redirect target (Clerk will ignore if invalid).
                      // We deliberately avoid a full-page redirect when signed out.
                      fallbackRedirectUrl="/home"
                      forceRedirectUrl="/home"
                    />
                    {isSignedIn === false && !userId ? null : (
                      <div className="text-center text-white/80 text-[12px] md:text-[14px]">
                        <IonSpinner name="crescent" className="w-5 h-5 align-[-4px] mr-2" />
                        Loading…
                      </div>
                    )}
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
