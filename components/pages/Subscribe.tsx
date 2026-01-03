'use client';

import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  IonToggle,
} from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { usePlans } from '@clerk/nextjs/experimental';
import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getWebBaseUrl } from '../../helpers/webBaseUrl';

export default function Subscribe() {
  const history = useHistory();
  // Match Clerk pricing-table UX: default is "Billed annually"
  const [billing, setBilling] = useState<'month' | 'annual'>('annual');
  const { data: plans, isLoading: plansLoading } = usePlans({ for: 'user', pageSize: 10 });
  const [returnTo, setReturnTo] = useState<string>('/home');

  useEffect(() => {
    // Allow deep-linking into annual/monthly from other screens
    const params = new URLSearchParams(window.location.search);
    const p = (params.get('period') || '').toLowerCase();
    if (p === 'month' || p === 'monthly') setBilling('month');
    if (p === 'annual' || p === 'year' || p === 'yearly') setBilling('annual');

    const r = params.get('return');
    if (r && r.startsWith('/')) setReturnTo(r);
  }, []);

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

  const openCheckout = async () => {
    try {
      const response = await fetch('/api/create-sign-in-token');
      const data = await response.json();
      const { openExternalUrl } = await import('../../helpers/openExternal');

      const base = `${getWebBaseUrl()}/subscribe-web`;
      if (data?.token) {
        await openExternalUrl(
          `${base}?autocheckout=1&minimal=1&period=${billing}&return=${encodeURIComponent(returnTo)}&__clerk_ticket=${data.token}`,
        );
      } else {
        await openExternalUrl(`${base}?return=${encodeURIComponent(returnTo)}`);
      }
    } catch (e) {
      console.error('Error opening checkout:', e);
      const { openExternalUrl } = await import('../../helpers/openExternal');
      await openExternalUrl(`${getWebBaseUrl()}/subscribe-web?return=${encodeURIComponent(returnTo)}`);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" fill="clear" onClick={() => history.replace(returnTo || '/home')}>
            <IonIcon icon={chevronBackOutline} className="text-white" />
          </IonButton>
          <IonTitle className="text-white">Subscribe to Flow Pro</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div
          className="flex flex-col items-center justify-center min-h-full bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 p-4"
          style={{
            paddingTop: 'env(safe-area-inset-top)',
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          <div className="w-full max-w-md">
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
                  <IonButton expand="block" color="primary" onClick={openCheckout}>
                    Subscribe
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
        </div>
      </IonContent>
    </IonPage>
  );
}

