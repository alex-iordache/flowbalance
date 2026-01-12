'use client';

import { SignedIn, SignedOut, ClerkLoaded, ClerkLoading, useSignIn, useAuth } from '@clerk/nextjs';
import { SubscriptionDetailsButton } from '@clerk/nextjs/experimental';
import { useEffect, useMemo, useState } from 'react';

function sanitizeReturnTo(raw: string | null): string {
  if (!raw) return '/home';
  if (!raw.startsWith('/')) return '/home';
  if (raw.startsWith('//')) return '/home';
  return raw;
}

/**
 * Web-Only Subscription Management Page
 * 
 * Mobile-optimized subscription management page.
 * Opens in external browser from the app, allowing users to view and cancel subscriptions.
 * 
 * Handles sign-in tokens passed from mobile app via __clerk_ticket parameter.
 */
export default function BillingWebPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isProcessingToken, setIsProcessingToken] = useState(false);
  const { signIn, isLoaded: signInLoaded, setActive } = useSignIn();
  const { userId } = useAuth();
  const [search, setSearch] = useState<string>(''); // window.location.search snapshot

  // Keep query params in sync even if Clerk mutates URL via history APIs.
  useEffect(() => {
    const update = () => {
      try {
        setSearch(window.location.search || '');
      } catch {
        // ignore
      }
    };

    update();

    const onPopState = () => update();
    window.addEventListener('popstate', onPopState);

    const origPush = history.pushState.bind(history);
    const origReplace = history.replaceState.bind(history);
    // Override history mutations so client-side redirects update our derived state.
    type MutableHistory = Omit<History, 'pushState' | 'replaceState'> & {
      pushState: History['pushState'];
      replaceState: History['replaceState'];
    };
    const h = history as unknown as MutableHistory;

    h.pushState = function (data: any, unused: string, url?: string | URL | null) {
      origPush(data, unused, url as any);
      update();
    };
    h.replaceState = function (data: any, unused: string, url?: string | URL | null) {
      origReplace(data, unused, url as any);
      update();
    };

    return () => {
      window.removeEventListener('popstate', onPopState);
      h.pushState = origPush;
      h.replaceState = origReplace;
    };
  }, []);

  const params = useMemo(() => new URLSearchParams(search), [search]);
  const returnTo = sanitizeReturnTo(params.get('return'));
  const signInToken = params.get('__clerk_ticket');

  useEffect(() => {
    // Detect if opened from mobile device (not from Capacitor app, but from browser)
    const userAgent = navigator.userAgent.toLowerCase();
    const mobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    setIsMobile(mobile);
  }, []);

  useEffect(() => {
    // Process sign-in token from mobile app (if present and user is not already signed in).
    if (!signInToken) return;
    if (!signInLoaded) return;
    if (userId) return;
    if (isProcessingToken) return;

    setIsProcessingToken(true);

    signIn
      .create({ strategy: 'ticket', ticket: signInToken })
      .then(result => {
        if (result.status === 'complete' && result.createdSessionId) {
          return setActive({ session: result.createdSessionId });
        }
        console.error('Sign-in not complete:', result);
        setIsProcessingToken(false);
      })
      .catch(error => {
        console.error('Error processing sign-in token:', error);
        setIsProcessingToken(false);
      });
  }, [signInToken, signInLoaded, signIn, setActive, userId, isProcessingToken]);

  return (
    <div
      className="flex flex-col bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 p-4"
      style={{ minHeight: '100dvh' }}
    >
      <div className="max-w-5xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
            Manage Subscription
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90">
            View and manage your Flow Premium subscription
          </p>
        </div>

        <ClerkLoading>
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 text-center">
            <p className="text-base md:text-lg text-gray-700">
              {isProcessingToken ? 'Signing you in...' : 'Loading subscription details...'}
            </p>
          </div>
        </ClerkLoading>

        <ClerkLoaded>
          {/* Signed In: Show Subscription Management */}
          <SignedIn>
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-6">
              <SubscriptionDetailsButton>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-xl text-base md:text-lg font-semibold transition-colors">
                  Open Subscription Details
                </button>
              </SubscriptionDetailsButton>
            </div>

            <div className="text-center">
              <div className="bg-white/20 backdrop-blur rounded-xl p-4 mb-4">
                {isMobile ? (
                  <>
                    <p className="text-white text-base md:text-lg font-semibold mb-2">
                      ✅ After managing, return to Flow app
                    </p>
                    <p className="text-white text-sm md:text-base opacity-90">
                      Changes sync automatically
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-white text-base md:text-lg font-semibold mb-2">
                      ✅ Manage your subscription details
                    </p>
                    <p className="text-white text-sm md:text-base opacity-90">
                      View plan, billing, and cancellation options
                    </p>
                  </>
                )}
              </div>
            </div>
          </SignedIn>

          {/* Signed Out: Show Sign In */}
          <SignedOut>
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Please Sign In First
              </h2>
              <p className="text-base md:text-lg text-gray-700 mb-6">
                You need to sign in to manage your subscription
              </p>
              <button
                onClick={() => window.location.href = '/sign-in'}
                className="bg-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-purple-700 w-full text-base md:text-lg"
              >
                Sign In
              </button>
            </div>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </div>
  );
}
