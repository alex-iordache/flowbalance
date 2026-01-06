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
  const { isLoaded, userId, getToken } = useAuth();

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
    if (!isLoaded || !userId) return;

    // In iOS WKWebView we can briefly see userId before the session cookie/token is persisted.
    // Force a token fetch (which requires an active session) and only then navigate to /home.
    let cancelled = false;
    (async () => {
      try {
        console.log('[SignInPage] userId observed; waiting for getToken() before redirect');
        await getToken();
        console.log('[SignInPage] getToken() ok; preparing redirect to /home', {
          userId,
          base,
        });
      } catch (err) {
        console.log('[SignInPage] getToken() failed; redirecting to /home anyway', err);
      }

      if (cancelled) return;
      // Persist marker in localStorage so it survives any WebView reloads.
      try {
        localStorage.setItem('fb:postAuthTs', String(Date.now()));
        localStorage.setItem('fb:postAuthUserId', String(userId));
        localStorage.setItem('fb:postAuthFrom', 'sign-in');
        console.log('[SignInPage] fb:postAuth* set in localStorage');
      } catch (e) {
        console.log('[SignInPage] fb:postAuth* localStorage set failed', e);
      }

      // Redirect immediately: Next may trigger a fallback full reload after RSC fetch failures,
      // which can cancel timers before they fire in WKWebView.
      try {
        console.log('[SignInPage] navigating to /home immediately', {
          from: window.location.href,
          to: `${base}/home`,
        });
      } catch {
        // ignore
      }
      window.location.href = `${base}/home`;
    })();

    return () => {
      cancelled = true;
    };
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
            <SignIn 
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
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
