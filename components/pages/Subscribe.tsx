'use client';

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToast,
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

function sanitizeReturnTo(raw: string | null): string {
  if (!raw) return '/home';
  if (!raw.startsWith('/')) return '/home';
  if (raw.startsWith('//')) return '/home';
  return raw;
}

function unwrapReturnTo(raw: string): string {
  // If we somehow got a return=/subscribe?return=... chain, unwrap it back to the original target.
  // Cap iterations to avoid loops.
  let current = raw;
  for (let i = 0; i < 3; i += 1) {
    if (!current.startsWith('/subscribe')) break;
    const qIndex = current.indexOf('?');
    if (qIndex === -1) break;
    const qs = current.slice(qIndex + 1);
    const params = new URLSearchParams(qs);
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
  const [safariOpenError, setSafariOpenError] = useState<string | null>(null);
  const [manualCheckoutUrl, setManualCheckoutUrl] = useState<string | null>(null);

  useEffect(() => {
    // Allow deep-linking into annual/monthly from other screens
    const params = new URLSearchParams(window.location.search);
    const p = (params.get('period') || '').toLowerCase();
    if (p === 'month' || p === 'monthly') setBilling('month');
    if (p === 'annual' || p === 'year' || p === 'yearly') setBilling('annual');

    const r = params.get('return');
    if (r) setReturnTo(sanitizeReturnTo(unwrapReturnTo(r)));
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

    // When using `Browser.open()` on iOS (SFSafariViewController), the app may not "resume",
    // so listen for Browser close.
    const removeBrowserFinished = (async () => {
      try {
        const platform = Capacitor.getPlatform();
        if (platform !== 'ios') return null;
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

  const openCheckout = async (ev?: any) => {
    try {
      ev?.preventDefault?.();
      ev?.stopPropagation?.();
    } catch {
      // ignore
    }
    // We must persist "pending" *first*, then open the checkout outside the WebView.
    // Opening the Stripe/checkout page inside WKWebView triggers:
    // - "non app-bound domain" spam
    // - blocked Capacitor bridge injection
    setPaymentPending(true);
    setPaymentOpenedNow();
    let platform: string = 'unknown';
    try {
      platform = Capacitor.getPlatform();
    } catch {
      platform = 'unknown';
    }

    try {
      if (platform === 'ios') {
        const { Browser } = await import('@capacitor/browser');
        await Browser.open({ url: checkoutUrl });
        return;
      }

      if (platform === 'android') {
        const { AppLauncher } = await import('@capacitor/app-launcher');
        await AppLauncher.openUrl({ url: checkoutUrl });
        return;
      }
    } catch {
      // Native open failed — do not fall back to opening inside the in-app WebView.
      setManualCheckoutUrl(checkoutUrl);
      setSafariOpenError(
        isRo
          ? 'Nu am putut deschide checkout-ul. Copiază link-ul și deschide-l în Safari.'
          : 'Could not open checkout. Copy the link and open it in Safari.',
      );
      return;
    }

    // Web: open a new tab (safe)
    try {
      const w = window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
      if (!w) {
        setManualCheckoutUrl(checkoutUrl);
        setSafariOpenError(isRo ? 'Popup blocat. Copiază link-ul și deschide-l manual.' : 'Popup blocked. Copy the link and open it manually.');
      }
    } catch {
      setManualCheckoutUrl(checkoutUrl);
      setSafariOpenError(isRo ? 'Nu am putut deschide checkout-ul.' : 'Could not open checkout.');
    }
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
          <IonTitle>{isRo ? 'Abonament Flow Pro' : 'Subscribe to Flow Pro'}</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/settings" routerDirection="none">
              <IonIcon icon={settingsOutline} className="text-2xl" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': 'var(--fb-bg)' } as any}>
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto pt-3 pb-24 px-4" style={{ background: 'var(--fb-bg)' }}>
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
                    onClick={(e) => void openCheckout(e)}
                  >
                    {ticketLoading ? 'Preparing…' : 'Subscribe'}
                  </IonButton>
                  <p className="text-center text-xs text-gray-600 mt-3">
                    Opens in browser to complete payment
                  </p>
                  {manualCheckoutUrl ? (
                    <div className="mt-3">
                      <IonButton
                        expand="block"
                        fill="solid"
                        style={{ '--background': 'rgba(0,0,0,0.08)', '--color': '#111' } as any}
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(manualCheckoutUrl);
                            setSafariOpenError(isRo ? 'Link copiat.' : 'Link copied.');
                          } catch {
                            try {
                              const ta = document.createElement('textarea');
                              ta.value = manualCheckoutUrl;
                              ta.style.position = 'fixed';
                              ta.style.left = '-9999px';
                              document.body.appendChild(ta);
                              ta.focus();
                              ta.select();
                              document.execCommand('copy');
                              document.body.removeChild(ta);
                              setSafariOpenError(isRo ? 'Link copiat.' : 'Link copied.');
                            } catch {
                              setSafariOpenError(isRo ? 'Copy failed.' : 'Copy failed.');
                            }
                          }
                        }}
                      >
                        {isRo ? 'Copiază link checkout' : 'Copy checkout link'}
                      </IonButton>
                    </div>
                  ) : null}
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
              className="w-full max-w-sm md:max-w-md rounded-2xl p-5"
              style={{
                backgroundColor: '#FBF7F2',
                border: '1px solid rgba(232, 222, 211, 0.85)',
                boxShadow: '0 14px 40px rgba(120, 95, 70, 0.18)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="flex items-center gap-3">
                <IonSpinner name="crescent" style={{ color: '#4E5B4F' }} />
                <div className="font-semibold" style={{ color: '#4E5B4F' }}>
                  {isRo ? 'Așteptăm confirmarea plății…' : 'Waiting for payment confirmation…'}
                </div>
              </div>
              <div className="text-sm mt-2" style={{ color: '#7A746C' }}>
                {isRo
                  ? 'Poate dura câteva secunde. Te întoarcem automat în aplicație când abonamentul se activează.'
                  : 'This can take a few seconds. We’ll return you automatically once your subscription activates.'}
              </div>
              <div className="mt-4">
                <IonButton
                  expand="block"
                  fill="solid"
                  style={{ '--background': '#ffffff', '--color': '#3b1b6a' } as any}
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

        <IonToast
          isOpen={!!safariOpenError}
          message={safariOpenError ?? ''}
          duration={2600}
          onDidDismiss={() => setSafariOpenError(null)}
          position="top"
          color="dark"
        />
      </IonContent>
    </IonPage>
  );
}

