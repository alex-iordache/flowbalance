'use client';

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  IonToggle,
} from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import { SignedIn, SignedOut, useAuth } from '@clerk/nextjs';
import { usePlans } from '@clerk/nextjs/experimental';
import React, { useEffect, useMemo, useState } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { useHistory } from 'react-router-dom';
import { getWebBaseUrl } from '../../helpers/webBaseUrl';
import Store from '../../store';

const PAYMENT_PENDING_KEY = 'flow_payment_pending_v1';
const PAYMENT_OPENED_AT_KEY = 'flow_payment_opened_at_v1';
const PAYMENT_PENDING_TTL_MS = 30 * 60 * 1000; // 30 minutes

function getPaymentPending(): boolean {
  try {
    // Prefer localStorage so it survives the Safari hop + app resume on iOS.
    if (localStorage.getItem(PAYMENT_PENDING_KEY) === '1') return true;
    // Back-compat: if a previous build wrote to sessionStorage.
    return sessionStorage.getItem(PAYMENT_PENDING_KEY) === '1';
  } catch {
    return false;
  }
}

function getPaymentOpenedAt(): number | null {
  try {
    const raw = localStorage.getItem(PAYMENT_OPENED_AT_KEY) || sessionStorage.getItem(PAYMENT_OPENED_AT_KEY);
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

function setPaymentOpenedNow() {
  const now = Date.now();
  try {
    localStorage.setItem(PAYMENT_OPENED_AT_KEY, String(now));
    sessionStorage.setItem(PAYMENT_OPENED_AT_KEY, String(now));
  } catch {
    // ignore
  }
}

function setPaymentPending(next: boolean) {
  try {
    if (next) {
      localStorage.setItem(PAYMENT_PENDING_KEY, '1');
      sessionStorage.setItem(PAYMENT_PENDING_KEY, '1');
    } else {
      localStorage.removeItem(PAYMENT_PENDING_KEY);
      sessionStorage.removeItem(PAYMENT_PENDING_KEY);
      localStorage.removeItem(PAYMENT_OPENED_AT_KEY);
      sessionStorage.removeItem(PAYMENT_OPENED_AT_KEY);
    }
  } catch {
    // ignore
  }
}

export default function Subscribe() {
  const history = useHistory();
  const { isLoaded, userId, orgId, has } = useAuth();
  const lang = Store.useState(s => s.settings.language);
  const isRo = lang === 'ro';
  // Match Clerk pricing-table UX: default is "Billed annually"
  const [billing, setBilling] = useState<'month' | 'annual'>('annual');
  const { data: plans, isLoading: plansLoading } = usePlans({ for: 'user', pageSize: 10 });
  const [returnTo, setReturnTo] = useState<string>('/home');
  const [ticket, setTicket] = useState<string | null>(null);
  const [ticketLoading, setTicketLoading] = useState(false);
  const [waitingForPayment, setWaitingForPayment] = useState<boolean>(false);

  useEffect(() => {
    // Allow deep-linking into annual/monthly from other screens
    const params = new URLSearchParams(window.location.search);
    const p = (params.get('period') || '').toLowerCase();
    if (p === 'month' || p === 'monthly') setBilling('month');
    if (p === 'annual' || p === 'year' || p === 'yearly') setBilling('annual');

    const r = params.get('return');
    if (r && r.startsWith('/')) setReturnTo(r);
  }, []);

  useEffect(() => {
    // Prefetch a Clerk sign-in ticket so the Subscribe button can be a direct <a href target="_blank">
    // (works even when iOS blocks Capacitor messageHandlers for non app-bound domains).
    if (!isLoaded) return;
    if (!userId) return;
    let cancelled = false;
    const ctrl = new AbortController();

    setTicketLoading(true);
    setTicket(null);

    window
      .fetch('/api/create-sign-in-token', { signal: ctrl.signal })
      .then(r => r.json())
      .then(data => {
        if (cancelled) return;
        setTicket(typeof data?.token === 'string' ? data.token : null);
      })
      .catch(() => {
        if (cancelled) return;
        setTicket(null);
      })
      .finally(() => {
        if (cancelled) return;
        setTicketLoading(false);
      });

    return () => {
      cancelled = true;
      ctrl.abort();
    };
  }, [isLoaded, userId]);

  const hasFullAccess = useMemo(() => {
    if (!userId) return false;
    if (orgId) return true;
    return has?.({ plan: 'pro_user' }) ?? false;
  }, [userId, orgId, has]);

  useEffect(() => {
    // Cleanup: if we have a stale pending flag (e.g. app crashed mid-checkout),
    // never block the page on next visit.
    const pending = getPaymentPending();
    if (!pending) return;
    const openedAt = getPaymentOpenedAt();
    if (!openedAt) {
      setPaymentPending(false);
      return;
    }
    if (Date.now() - openedAt > PAYMENT_PENDING_TTL_MS) {
      setPaymentPending(false);
    }
  }, []);

  useEffect(() => {
    // Show the overlay when returning to the app from Safari:
    // - iOS may not deliver the deep-link callback reliably
    // - we rely on a persisted "pending" marker instead
    const maybeShow = () => {
      try {
        if (document.visibilityState !== 'visible') return;
        if (!getPaymentPending()) return;
        const openedAt = getPaymentOpenedAt();
        if (!openedAt) return;
        if (Date.now() - openedAt > PAYMENT_PENDING_TTL_MS) {
          setPaymentPending(false);
          return;
        }
        setWaitingForPayment(true);
      } catch {
        // ignore
      }
    };

    document.addEventListener('visibilitychange', maybeShow);
    window.addEventListener('focus', maybeShow);
    // Capacitor-native resume signal (more reliable than focus/visibility on iOS).
    const removeAppState = CapacitorApp.addListener('appStateChange', (s) => {
      if (s.isActive) maybeShow();
    });
    // If checkout is opened via `@capacitor/browser` (SFSafariViewController), the app may
    // remain "active" and App resume events won't fire. Instead, listen for browser close.
    const removeBrowserFinished = (async () => {
      try {
        if (!Capacitor.isNativePlatform()) return null;
        const { Browser } = await import('@capacitor/browser');
        return await Browser.addListener('browserFinished', () => {
          maybeShow();
        });
      } catch {
        return null;
      }
    })();
    return () => {
      document.removeEventListener('visibilitychange', maybeShow);
      window.removeEventListener('focus', maybeShow);
      void removeAppState.then(h => h.remove()).catch(() => {});
      void removeBrowserFinished
        .then(h => h?.remove?.())
        .catch(() => {});
    };
  }, []);

  const openCheckout = async () => {
    // We must persist "pending" *first*, then open the checkout outside the WebView.
    // Opening the Stripe/checkout page inside WKWebView triggers:
    // - "non app-bound domain" spam
    // - blocked Capacitor bridge injection
    setPaymentPending(true);
    setPaymentOpenedNow();

    try {
      if (Capacitor.isNativePlatform()) {
        const { Browser } = await import('@capacitor/browser');
        await Browser.open({ url: checkoutUrl });
        return;
      }
    } catch {
      // ignore; fall back below
    }

    const w = window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
    if (!w) window.location.href = checkoutUrl;
  };

  useEffect(() => {
    // If we already have access, immediately return to the screen that sent us to the paywall.
    if (!waitingForPayment) return;
    if (!isLoaded) return;
    if (!userId) return;
    if (!hasFullAccess) return;
    setPaymentPending(false);
    setWaitingForPayment(false);
    history.replace(returnTo);
  }, [waitingForPayment, isLoaded, userId, hasFullAccess, history, returnTo]);

  useEffect(() => {
    if (!waitingForPayment) return;
    if (!isLoaded) return;
    if (!userId) return;

    // Poll every 2s for subscription activation.
    const interval = window.setInterval(() => {
      try {
        const w = window as unknown as { Clerk?: { session?: { reload?: () => Promise<unknown> } } };
        void w.Clerk?.session?.reload?.();
      } catch {
        // ignore
      }
    }, 2000);

    return () => window.clearInterval(interval);
  }, [waitingForPayment, isLoaded, userId]);

  const checkoutUrl = useMemo(() => {
    const base = `${getWebBaseUrl()}/subscribe-web`;
    const common = `minimal=1&period=${billing}&return=${encodeURIComponent(returnTo)}`;
    if (ticket) {
      return `${base}?autocheckout=1&${common}&__clerk_ticket=${encodeURIComponent(ticket)}`;
    }
    return `${base}?${common}`;
  }, [billing, returnTo, ticket]);

  const proPlan = useMemo(() => {
    const list = Array.isArray(plans) ? plans : [];
    if (list.length === 0) return null;
    // Prefer the real paid plan (you have free_user + pro_user in Clerk)
    const byKey = list.find((p: any) => p?.key === 'pro_user' || p?.planKey === 'pro_user');
    if (byKey) return byKey as any;
    const byName = list.find((p: any) => String(p?.name || '').toLowerCase().includes('pro'));
    if (byName) return byName as any;

    // Fallback: pick the first non-free plan if keys/names differ
    const nonFree = list.find((p: any) => p?.key !== 'free_user' && p?.planKey !== 'free_user');
    return (nonFree ?? list[0]) as any;
  }, [plans]);

  const pricing = useMemo(() => {
    if (!proPlan) return { perMonth: '', billedLabel: 'Billed annually', billedDetail: '' };
    const p: any = proPlan;

    const normalizeUsd = (s: string) => s.replace(/^USD\s*/i, '$').replace(/\bUSD\b/i, '$').trim();
    const formatMoney = (m: any) => {
      if (!m) return '';
      const formatted = String(m.formatted ?? m.amountFormatted ?? '').trim();
      if (formatted) return normalizeUsd(formatted);
      const currency = String(m.currency ?? '').trim();
      const amount = typeof m.amount === 'number' ? m.amount : null;
      if (amount != null) {
        const dollars = (amount / 100).toFixed(2);
        if (!currency) return dollars;
        return normalizeUsd(`${currency} ${dollars}`);
      }
      return '';
    };

    const monthlyStr = formatMoney(p?.fee);
    const annualStr = formatMoney(p?.annualFee);
    const annualAmount = typeof p?.annualFee?.amount === 'number' ? p.annualFee.amount : null; // cents
    const annualPerMonth = annualAmount != null ? `$${(annualAmount / 12 / 100).toFixed(2)}` : '';

    if (billing === 'annual') {
      return {
        perMonth: annualPerMonth ? `${normalizeUsd(annualPerMonth)}` : '',
        billedLabel: 'Billed annually',
        billedDetail: annualStr ? `${annualStr}` : '',
      };
    }

    return {
      perMonth: monthlyStr ? `${monthlyStr}` : '',
      billedLabel: 'Billed monthly',
      billedDetail: '',
    };
  }, [proPlan, billing]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="text-white">{isRo ? 'Abonament Flow Pro' : 'Subscribe to Flow Pro'}</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/settings" routerDirection="none">
              <IonIcon icon={settingsOutline} className="text-white text-2xl" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': 'var(--fb-bg)' } as any}>
        <div className="w-full max-w-md mx-auto pt-3 pb-24 px-4" style={{ background: 'var(--fb-bg)' }}>
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-4">
                <h2 className="font-bold text-gray-900">Flow Pro</h2>
                <p className="text-gray-600 mt-1">
                  Full access to all meditation practices and flows.
                </p>

                {/* Price + billing toggle (Clerk-like) */}
                <div className="mt-5">
                  <div className="flex items-baseline gap-2">
                    {plansLoading ? (
                      <div className="text-3xl font-bold text-gray-900">Loading…</div>
                    ) : !proPlan ? (
                      <div className="text-3xl font-bold text-gray-900">—</div>
                    ) : (
                      <>
                        <div className="text-4xl font-bold text-gray-900">
                          {pricing.perMonth ? pricing.perMonth.replace(/\/(month|year)$/i, '') : ''}
                        </div>
                        <div className="text-sm text-gray-600">/ month</div>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-3">
                    <IonToggle
                      checked={billing === 'annual'}
                      onIonChange={e => setBilling(e.detail.checked ? 'annual' : 'month')}
                    />
                    <div className="text-sm text-gray-700">{pricing.billedLabel}</div>
                  </div>

                  {billing === 'annual' && pricing.billedDetail ? (
                    <div className="text-xs text-gray-500 mt-1">{pricing.billedDetail} / year</div>
                  ) : null}
                </div>
              </div>

              {/* Features (compact, minimal separators) */}
              <div className="border-t border-gray-200">
                {[
                  'Access to all flows and practices',
                  'Guided programs for stress, focus, and sleep',
                  'Track your progress',
                  'New content added regularly',
                ].map((txt, idx) => (
                  <div
                    key={txt}
                    className={`flex items-start gap-3 px-6 py-3 text-sm text-gray-800 ${idx === 0 ? '' : 'border-t border-gray-100'}`}
                  >
                    <span className="mt-0.5 text-gray-500">✓</span>
                    <span className="leading-5">{txt}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-gray-200">
                <SignedIn>
                  <IonButton
                    expand="block"
                    color="primary"
                    disabled={ticketLoading}
                    onClick={openCheckout}
                  >
                    {ticketLoading ? 'Preparing…' : 'Subscribe'}
                  </IonButton>
                  <p className="text-center text-xs text-gray-600 mt-3">
                    Opens in browser to complete payment
                  </p>
                </SignedIn>

                <SignedOut>
                  <IonButton expand="block" color="primary" onClick={() => (window.location.href = '/sign-in')}>
                    Sign in to Subscribe
                  </IonButton>
                </SignedOut>
              </div>
            </div>
        </div>

        {waitingForPayment ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
            <div
              className="w-full max-w-sm rounded-2xl p-5 text-white"
              style={{
                backgroundColor: 'rgba(125, 99, 255, 0.92)',
                boxShadow: 'inset 0 10px 22px rgba(0,0,0,0.14), inset 0 -10px 22px rgba(0,0,0,0.14)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="flex items-center gap-3">
                <IonSpinner name="crescent" className="text-white" />
                <div className="font-semibold">
                  {isRo ? 'Așteptăm confirmarea plății…' : 'Waiting for payment confirmation…'}
                </div>
              </div>
              <div className="text-sm text-white/85 mt-2">
                {isRo
                  ? 'Poate dura câteva secunde. Te întoarcem automat în aplicație când abonamentul se activează.'
                  : 'This can take a few seconds. We’ll return you automatically once your subscription activates.'}
              </div>
              <div className="mt-4">
                <IonButton
                  expand="block"
                  fill="solid"
                  style={{ '--background': 'rgba(255,255,255,0.14)', '--color': '#fff' } as any}
                  onClick={() => {
                    setPaymentPending(false);
                    setWaitingForPayment(false);
                    history.replace(returnTo);
                  }}
                >
                  {isRo ? 'Anulează' : 'Cancel'}
                </IonButton>
              </div>
            </div>
          </div>
        ) : null}
      </IonContent>
    </IonPage>
  );
}

