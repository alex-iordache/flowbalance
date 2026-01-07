'use client';

import { SignIn } from '@clerk/nextjs';
import { useAuth } from '@clerk/nextjs';
import { IonPage, IonContent } from '@ionic/react';
import { useEffect } from 'react';

const FB_IOS_AUTH_DEBUG_BUILD = 'ios-auth-debug-v3';

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

  // Build stamp so we can confirm which bundle is running on-device.
  useEffect(() => {
    console.log('[SignInPage] build', FB_IOS_AUTH_DEBUG_BUILD);
  }, []);

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
    // Do NOT navigate from here. We let Clerk complete its own redirect to /home?auth=1.
  }, [isLoaded, userId, base]);

  useEffect(() => {
    const onPageHide = () => {
      try {
        console.log('[SignInPage] pagehide', {
          href: window.location.href,
          visibility: document.visibilityState,
        });
      } catch {
        // ignore
      }
    };
    window.addEventListener('pagehide', onPageHide);
    return () => window.removeEventListener('pagehide', onPageHide);
  }, []);

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
            {isLoaded && userId ? (
              <div className="bg-white/15 backdrop-blur rounded-2xl p-6 text-white">
                <div className="text-xl font-semibold">Signed in</div>
                <div className="text-sm opacity-90 mt-2 break-all">User: {userId}</div>
                <button
                  className="mt-5 w-full bg-white/20 hover:bg-white/25 text-white py-3 rounded-xl font-semibold"
                  onClick={() => {
                    // Intentionally user-driven navigation (no automatic redirect).
                    window.location.href = `${base}/home`;
                  }}
                >
                  Continue to Home
                </button>
              </div>
            ) : (
              <SignIn 
                routing="virtual"
                signUpUrl="/sign-up"
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "shadow-xl",
                    formButtonPrimary: "bg-purple-600 hover:bg-purple-700",
                    footerActionLink: "text-purple-600 hover:text-purple-700"
                  }
                }}
              />
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
