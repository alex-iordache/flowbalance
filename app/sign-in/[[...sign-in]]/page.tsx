'use client';

import { SignIn } from '@clerk/nextjs';
import { useAuth } from '@clerk/nextjs';
import { IonPage, IonContent } from '@ionic/react';
import { useEffect } from 'react';

/**
 * Sign In Page
 * 
 * Shows Clerk SignIn component configured for email-code-only authentication.
 * After sign-in, users are redirected to home page.
 * Sign-up URL points to in-app sign-up page.
 */
export default function SignInPage() {
  const base =
    typeof window !== 'undefined' ? window.location.origin : 'https://www.flowbalance.app';
  const { isLoaded, userId } = useAuth();

  // iOS WKWebView can fail Next RSC client navigations; once signed in, hard-navigate to /home.
  useEffect(() => {
    try {
      console.log('[SignInPage]', {
        ts: new Date().toISOString(),
        isLoaded,
        userId: userId ?? null,
      });
    } catch {
      // ignore
    }
    if (!isLoaded || !userId) return;
    window.location.replace(`${base}/home`);
  }, [isLoaded, userId, base]);

  return (
    <IonPage>
      <IonContent scrollY={true}>
        <div 
          className="flex flex-col items-center justify-center min-h-full bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 p-4"
          style={{
            paddingTop: 'env(safe-area-inset-top)',
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          <div className="w-full max-w-md">
            <SignIn 
              signUpUrl="/sign-up"
              // iOS WKWebView: avoid Next.js App Router navigation (RSC fetch) during auth completion.
              // Stay on /sign-in and let the useAuth() effect hard-redirect to /home once a session exists.
              fallbackRedirectUrl={`${base}/sign-in`}
              forceRedirectUrl={`${base}/sign-in`}
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-xl",
                  formButtonPrimary: "bg-purple-600 hover:bg-purple-700",
                  footerActionLink: "text-purple-600 hover:text-purple-700"
                }
              }}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
