'use client';

import { SignedIn, SignedOut, ClerkLoaded, ClerkLoading, useSignIn, useAuth } from '@clerk/nextjs';
import { CheckoutButton, usePlans } from '@clerk/nextjs/experimental';
import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Web-Only Subscription Page
 * 
 * Mobile-optimized subscription page.
 * After successful subscription on mobile, instructs user to return to app.
 * 
 * Handles sign-in tokens passed from mobile app via __clerk_ticket parameter.
 */
export default function SubscribeWebPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [isProcessingToken, setIsProcessingToken] = useState(false);
  const { signIn, isLoaded: signInLoaded, setActive } = useSignIn();
  const { userId } = useAuth();
  const { data: plans, isLoading: plansLoading } = usePlans({ for: 'user', pageSize: 10 });
  const [period, setPeriod] = useState<'month' | 'annual'>('month');
  const [autoCheckout, setAutoCheckout] = useState(false);
  const [minimal, setMinimal] = useState(false);
  const [didAutoOpen, setDidAutoOpen] = useState(false);
  const checkoutBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Detect if opened from mobile device (not from Capacitor app, but from browser)
    const userAgent = navigator.userAgent.toLowerCase();
    const mobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    setIsMobile(mobile);

    // Check URL params for subscription success
    const params = new URLSearchParams(window.location.search);
    if (params.get('subscription') === 'success') {
      setSubscriptionSuccess(true);
    }

    // Optional: auto-open checkout (used when coming from the app)
    const ac = (params.get('autocheckout') || '').toLowerCase();
    setAutoCheckout(ac === '1' || ac === 'true');
    const min = (params.get('minimal') || '').toLowerCase();
    setMinimal(min === '1' || min === 'true' || ac === '1' || ac === 'true');
    const p = (params.get('period') || '').toLowerCase();
    setPeriod(p === 'annual' || p === 'year' || p === 'yearly' ? 'annual' : 'month');

    // Process sign-in token from mobile app (if present and user is not already signed in)
    const signInToken = params.get('__clerk_ticket');
    if (signInToken && signInLoaded && !userId && !isProcessingToken) {
      setIsProcessingToken(true);
      
      // Use Clerk's signIn.create with ticket strategy to authenticate
      signIn.create({ strategy: 'ticket', ticket: signInToken })
        .then((result) => {
          if (result.status === 'complete' && result.createdSessionId) {
            // Set the session as active
            return setActive({ session: result.createdSessionId });
          } else {
            console.error('Sign-in not complete:', result);
            setIsProcessingToken(false);
          }
        })
        .catch((error) => {
          console.error('Error processing sign-in token:', error);
          setIsProcessingToken(false);
        });
    }
  }, [signInLoaded, signIn, setActive, userId, isProcessingToken]);

  const proPlan = useMemo(() => {
    const list = Array.isArray(plans) ? plans : [];
    if (list.length === 0) return null;

    // Billing APIs are still evolving; fields vary by SDK version.
    // Try a few stable identifiers first, then fall back to the only plan.
    const byKey = list.find((p: any) => p?.key === 'pro_user' || p?.planKey === 'pro_user');
    if (byKey) return byKey as any;

    const byName = list.find((p: any) => String(p?.name || '').toLowerCase().includes('pro'));
    if (byName) return byName as any;

    const nonFree = list.find((p: any) => p?.key !== 'free_user' && p?.planKey !== 'free_user');
    return (nonFree ?? list[0]) as any;
  }, [plans]);

  // If opened with autocheckout=1, auto-open the checkout drawer as soon as we're signed in.
  useEffect(() => {
    if (!autoCheckout) return;
    if (didAutoOpen) return;
    if (!userId) return;
    if (plansLoading) return;
    if (!proPlan?.id) return;

    window.setTimeout(() => {
      checkoutBtnRef.current?.click();
      setDidAutoOpen(true);
    }, 50);
  }, [autoCheckout, didAutoOpen, userId, plansLoading, proPlan?.id]);

  // Show success message after subscription
  if (subscriptionSuccess) {
    return (
      <div 
        className="flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 p-4"
        style={{
          minHeight: '100dvh',
        }}
      >
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-lg w-full text-center">
          <div className="text-6xl md:text-7xl mb-6">✅</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Subscription Successful!
          </h1>
          
          {isMobile ? (
            <>
              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 mb-6">
                <p className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                  📱 Return to the Flow app
                </p>
                <p className="text-base md:text-lg text-gray-700">
                  Your subscription is now active. Open the Flow app to access all premium content.
                </p>
              </div>
              <button
                onClick={() => window.close()}
                className="bg-purple-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-purple-700 w-full text-base md:text-lg"
              >
                Close this page
              </button>
            </>
          ) : (
            <>
              <p className="text-lg md:text-xl text-gray-700 mb-6">
                You now have access to all premium features!
              </p>
              <button
                onClick={() => window.location.href = '/home'}
                className="bg-purple-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-purple-700 w-full text-base md:text-lg"
              >
                Go to Home
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={minimal ? 'bg-white' : 'flex flex-col bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 p-4'}
      style={{ minHeight: '100dvh' }}
    >
      <div className={minimal ? 'w-full' : 'max-w-5xl w-full mx-auto'}>
        {!minimal && (
          <>
            {/* Header */}
            <div className="text-center mb-6 md:mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
                Subscribe to Flow Premium
              </h1>
              <p className="text-lg md:text-xl text-white opacity-90">
                Unlock all meditation practices
              </p>
            </div>
          </>
        )}

        <ClerkLoading>
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 text-center">
            <p className="text-base md:text-lg text-gray-700">
              {isProcessingToken ? 'Signing you in...' : 'Loading subscription options...'}
            </p>
          </div>
        </ClerkLoading>

        <ClerkLoaded>
          {/* Signed In: Show Pricing */}
          <SignedIn>
            <div className={minimal ? 'p-0' : 'bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-6'}>
              {plansLoading ? (
                <div className={minimal ? 'min-h-[50vh] flex items-center justify-center' : ''}>
                  <p className="text-base md:text-lg text-gray-700 text-center">Loading…</p>
                </div>
              ) : !proPlan ? (
                <p className="text-base md:text-lg text-gray-700 text-center">
                  No subscription plan found. Please check Clerk Billing plan availability.
                </p>
              ) : autoCheckout ? (
                <div className={minimal ? 'min-h-[50vh] flex items-center justify-center' : 'max-w-xl mx-auto text-center'}>
                  <CheckoutButton
                    planId={String(proPlan.id)}
                    planPeriod={period}
                    newSubscriptionRedirectUrl="/subscribe-web?subscription=success"
                  >
                    <button
                      ref={checkoutBtnRef}
                      className={minimal ? 'sr-only' : 'w-full bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-xl text-base md:text-lg font-semibold transition-colors'}
                    >
                      Continue to Checkout
                    </button>
                  </CheckoutButton>
                  {!minimal && (
                    <p className="text-center text-sm text-gray-600 mt-3">
                      If nothing happens, tap &quot;Continue to Checkout&quot;.
                    </p>
                  )}
                </div>
              ) : (
                <div className="max-w-xl mx-auto">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {String(proPlan?.name ?? 'Pro')}
                    </h2>
                    <p className="text-gray-600">
                      {String(proPlan?.description ?? 'Full access to all flows and practices')}
                    </p>
                    {proPlan?.amountFormatted ? (
                      <p className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
                        {String(proPlan.amountFormatted)}
                        <span className="text-base font-medium text-gray-600">/month</span>
                      </p>
                    ) : null}
                  </div>

                  {Array.isArray(proPlan?.features) && proPlan.features.length > 0 ? (
                    <div className="rounded-2xl border border-gray-200 overflow-hidden mb-6">
                      <ul className="divide-y divide-gray-200">
                        {proPlan.features.slice(0, 8).map((f: any) => (
                          <li key={String(f?.id ?? f?.key ?? f?.name)} className="px-4 py-3 text-gray-800">
                            {String(f?.name ?? f?.key ?? 'Feature')}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-gray-200 overflow-hidden mb-6">
                      <ul className="divide-y divide-gray-200">
                        <li className="px-4 py-3 text-gray-800">Access to all flows and practices</li>
                        <li className="px-4 py-3 text-gray-800">Guided programs for stress, focus, and sleep</li>
                        <li className="px-4 py-3 text-gray-800">Track your progress</li>
                        <li className="px-4 py-3 text-gray-800">New content added regularly</li>
                      </ul>
                    </div>
                  )}

                  <CheckoutButton
                    planId={String(proPlan.id)}
                    planPeriod={period}
                    newSubscriptionRedirectUrl="/subscribe-web?subscription=success"
                  >
                    <button
                      ref={checkoutBtnRef}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-xl text-base md:text-lg font-semibold transition-colors"
                    >
                      Upgrade Flow to Pro
                    </button>
                  </CheckoutButton>

                  <p className="text-center text-sm text-gray-600 mt-3">
                    Opens in browser to complete payment
                  </p>
                </div>
              )}
            </div>

            {!minimal && (
              <div className="text-center">
              <div className="bg-white/20 backdrop-blur rounded-xl p-4 mb-4">
                {isMobile ? (
                  <>
                    <p className="text-white text-base md:text-lg font-semibold mb-2">
                      ✅ After subscribing, return to Flow app
                    </p>
                    <p className="text-white text-sm md:text-base opacity-90">
                      Your subscription syncs automatically
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-white text-base md:text-lg font-semibold mb-2">
                      ✅ After subscribing, access all premium content
                    </p>
                    <p className="text-white text-sm md:text-base opacity-90">
                      Your subscription activates immediately
                    </p>
                  </>
                )}
              </div>
              </div>
            )}
          </SignedIn>

          {/* Signed Out: Show Sign In */}
          <SignedOut>
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Please Sign In First
              </h2>
              <p className="text-base md:text-lg text-gray-700 mb-6">
                You need to sign in to subscribe
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
