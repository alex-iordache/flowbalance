'use client';

import { useAuth, SignedIn, SignedOut, ClerkLoading, ClerkLoaded } from '@clerk/nextjs';
import { useEffect } from 'react';
import { IonApp, IonContent, IonPage, IonSpinner } from '@ionic/react';

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
    // Only redirect after Clerk has loaded and we confirm no user
    if (isLoaded && !userId) {
      window.location.href = '/sign-in';
    }
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
          {children}
        </SignedIn>
      </ClerkLoaded>
    </>
  );
}
