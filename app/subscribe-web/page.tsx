'use client';

import { SignedIn, SignedOut, ClerkLoaded, ClerkLoading, useSignIn, useAuth } from '@clerk/nextjs';
import { CheckoutButton, usePlans } from '@clerk/nextjs/experimental';
import { useEffect, useMemo, useRef, useState } from 'react';

function sanitizeReturnTo(raw: string | null): string {
  if (!raw) return '/home';
  if (!raw.startsWith('/')) return '/home';
  if (raw.startsWith('//')) return '/home';
  return raw;
}

function unwrapReturnTo(raw: string): string {
  let current = raw;
  for (let i = 0; i < 3; i += 1) {
    if (!current.startsWith('/subscribe')) break;
    const qIndex = current.indexOf('?');
    if (qIndex === -1) break;
    const params = new URLSearchParams(current.slice(qIndex + 1));
    const nested = params.get('return');
    if (!nested) break;
    try {
      current = decodeURIComponent(nested);
    } catch {
      current = nested;
    }
  }
  return current;
}

function SignedInSubscribeContent({
  period,
  minimal,
  autoCheckout,
  returnTo,
}: {
  period: 'month' | 'annual';
  minimal: boolean;
  autoCheckout: boolean;
  returnTo: string;
}) {
  const { userId } = useAuth();
  const { data: plans, isLoading: plansLoading } = usePlans({ for: 'user', pageSize: 10 });
  const [didAutoOpen, setDidAutoOpen] = useState(false);
  const checkoutBtnRef = useRef<HTMLButtonElement | null>(null);

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

  const checkoutRedirectUrl = useMemo(() => {
    return `/subscribe-web/return?return=${encodeURIComponent(returnTo)}`;
  }, [returnTo]);

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

  return (
    <div className={minimal ? 'p-0' : 'bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-6'}>
      {plansLoading ? (
        <div className={minimal ? 'min-h-[50vh] flex items-center justify-center' : ''}>
          <p className="text-base md:text-lg text-gray-700 text-center">Loading…</p>
        </div>
      ) : !proPlan ? (
        <p className="text-base md:text-lg text-gray-700 text-center">
          No subscription plan found. Please check Clerk Billing plan availability.
        </p>
      ) : minimal ? (
        // Minimal mode: open the Clerk Checkout drawer automatically and render nothing else.
        <div className="min-h-[50vh] flex items-center justify-center">
          <CheckoutButton
            planId={String(proPlan.id)}
            planPeriod={period}
            newSubscriptionRedirectUrl={checkoutRedirectUrl}
          >
            <button ref={checkoutBtnRef} className="sr-only">
              Continue to Checkout
            </button>
          </CheckoutButton>
        </div>
      ) : autoCheckout ? (
        <div className={minimal ? 'min-h-[50vh] flex items-center justify-center' : 'max-w-xl mx-auto text-center'}>
          <CheckoutButton
            planId={String(proPlan.id)}
            planPeriod={period}
            newSubscriptionRedirectUrl={checkoutRedirectUrl}
          >
            <button
              ref={checkoutBtnRef}
              className={
                minimal
                  ? 'sr-only'
                  : 'w-full bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-xl text-base md:text-lg font-semibold transition-colors'
              }
            >
              Continue to Checkout
            </button>
          </CheckoutButton>
          {!minimal && (
            <p className="text-center text-sm text-gray-600 mt-3">If nothing happens, tap &quot;Continue to Checkout&quot;.</p>
          )}
        </div>
      ) : (
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{String(proPlan?.name ?? 'Pro')}</h2>
            <p className="text-gray-600">{String(proPlan?.description ?? 'Full access to all flows and practices')}</p>
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
            newSubscriptionRedirectUrl={checkoutRedirectUrl}
          >
            <button
              ref={checkoutBtnRef}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-xl text-base md:text-lg font-semibold transition-colors"
            >
              Upgrade Flow to Pro
            </button>
          </CheckoutButton>

          <p className="text-center text-sm text-gray-600 mt-3">Opens in browser to complete payment</p>
        </div>
      )}
    </div>
  );
}

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
  const subscriptionSuccess = params.get('subscription') === 'success';
  const returnTo = sanitizeReturnTo(unwrapReturnTo(sanitizeReturnTo(params.get('return'))));
  const period = ((): 'month' | 'annual' => {
    const p = (params.get('period') || '').toLowerCase();
    return p === 'annual' || p === 'year' || p === 'yearly' ? 'annual' : 'month';
  })();
  const autoCheckout = ((): boolean => {
    const ac = (params.get('autocheckout') || '').toLowerCase();
    return ac === '1' || ac === 'true';
  })();
  const minimal = ((): boolean => {
    const min = (params.get('minimal') || '').toLowerCase();
    return min === '1' || min === 'true' || autoCheckout;
  })();
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

  // Show success message after subscription
  if (subscriptionSuccess) {
    // Backward compatibility: if an older checkout redirect hits ?subscription=success,
    // immediately route to the deep-link return page.
    if (typeof window !== 'undefined') {
      window.location.replace(`/subscribe-web/return?return=${encodeURIComponent(returnTo)}`);
    }
    return null;
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
            <SignedInSubscribeContent period={period} minimal={minimal} autoCheckout={autoCheckout} returnTo={returnTo} />

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
