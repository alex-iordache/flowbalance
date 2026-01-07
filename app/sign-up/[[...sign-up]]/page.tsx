'use client';

import { SignUp } from '@clerk/nextjs';
import { useAuth } from '@clerk/nextjs';
import { IonPage, IonContent } from '@ionic/react';
import { useEffect } from 'react';

const FB_IOS_AUTH_DEBUG_BUILD = 'ios-auth-debug-v3';

/**
 * Sign Up Page (In-App)
 * 
 * Shows Clerk SignUp component configured for email-code-only authentication.
 * After sign-up, users are redirected to home page.
 * 
 * Note: Password must be disabled in Clerk Dashboard > User & Authentication > Email, Phone, Username
 * And Email verification code should be enabled.
 */
export default function SignUpPage() {
  const base =
    typeof window !== 'undefined' ? window.location.origin : 'https://www.flowbalance.app';
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    console.log('[SignUpPage] build', FB_IOS_AUTH_DEBUG_BUILD);
  }, []);

  // iOS WKWebView can fail Next RSC client navigations; once signed in, hard-navigate to /home.
  useEffect(() => {
    try {
      console.log('[SignUpPage]', {
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
        console.log('[SignUpPage] pagehide', {
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
          <div className="w-full max-w-md space-y-4">
            {isLoaded && userId ? (
              <div className="bg-white/15 backdrop-blur rounded-2xl p-6 text-white">
                <div className="text-xl font-semibold">Signed up / signed in</div>
                <div className="text-sm opacity-90 mt-2 break-all">User: {userId}</div>
                <button
                  className="mt-5 w-full bg-white/20 hover:bg-white/25 text-white py-3 rounded-xl font-semibold"
                  onClick={() => {
                    window.location.href = `${base}/home`;
                  }}
                >
                  Continue to Home
                </button>
              </div>
            ) : (
              <SignUp 
                routing="virtual"
                signInUrl="/sign-in"
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
