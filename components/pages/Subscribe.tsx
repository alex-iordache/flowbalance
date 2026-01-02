'use client';

import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  IonLabel,
} from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { usePlans } from '@clerk/nextjs/experimental';
import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Subscribe() {
  const history = useHistory();
  const [period, setPeriod] = useState<'month' | 'annual'>('month');
  const { data: plans, isLoading: plansLoading } = usePlans({ for: 'user', pageSize: 10 });

  useEffect(() => {
    // Allow deep-linking into annual/monthly from other screens
    const params = new URLSearchParams(window.location.search);
    const p = (params.get('period') || '').toLowerCase();
    if (p === 'annual' || p === 'year' || p === 'yearly') setPeriod('annual');
  }, []);

  const proPlan = useMemo(() => {
    const list = Array.isArray(plans) ? plans : [];
    if (list.length === 0) return null;
    const byKey = list.find(
      (p: any) => p?.key === 'pro_user' || p?.planKey === 'pro_user' || p?.slug === 'pro_user',
    );
    if (byKey) return byKey as any;
    const byName = list.find((p: any) => String(p?.name || '').toLowerCase().includes('pro'));
    if (byName) return byName as any;
    return list[0] as any;
  }, [plans]);

  const openCheckout = async () => {
    try {
      const response = await fetch('/api/create-sign-in-token');
      const data = await response.json();
      const { openExternalUrl } = await import('../../helpers/openExternal');

      const base = 'https://flowbalance-jdk.vercel.app/subscribe-web';
      if (data?.token) {
        await openExternalUrl(`${base}?autocheckout=1&minimal=1&period=${period}&__clerk_ticket=${data.token}`);
      } else {
        await openExternalUrl(base);
      }
    } catch (e) {
      console.error('Error opening checkout:', e);
      const { openExternalUrl } = await import('../../helpers/openExternal');
      await openExternalUrl('https://flowbalance-jdk.vercel.app/subscribe-web');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" fill="clear" onClick={() => history.goBack()}>
            <IonIcon icon={chevronBackOutline} className="text-white" />
          </IonButton>
          <IonTitle className="text-white">Subscribe to Flow Premium</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" fullscreen>
        <div
          className="flex flex-col items-center justify-center min-h-full bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 p-4"
          style={{
            paddingTop: 'env(safe-area-inset-top)',
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          <div className="w-full max-w-md space-y-4">
            {/* Your features box */}
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Flow Pro</h2>
              <p className="text-gray-700 text-center mb-4">
                Full access to all meditation practices and flows.
              </p>

              <IonSegment
                value={period}
                onIonChange={e => setPeriod((e.detail.value as 'month' | 'annual') || 'month')}
              >
                <IonSegmentButton value="month">
                  <IonLabel>Monthly</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="annual">
                  <IonLabel>Yearly</IonLabel>
                </IonSegmentButton>
              </IonSegment>

              <div className="rounded-2xl border border-gray-200 overflow-hidden mt-4">
                <ul className="divide-y divide-gray-200">
                  <li className="px-4 py-3 text-gray-800">Access to all flows and practices</li>
                  <li className="px-4 py-3 text-gray-800">Guided programs for stress, focus, and sleep</li>
                  <li className="px-4 py-3 text-gray-800">Track your progress</li>
                  <li className="px-4 py-3 text-gray-800">New content added regularly</li>
                </ul>
              </div>
            </div>

            {/* Clerk plan box (pulled from Clerk plan data) */}
            <SignedIn>
              <div className="bg-white rounded-2xl shadow-2xl p-6">
                {plansLoading ? (
                  <p className="text-gray-700 text-center">Loading plan…</p>
                ) : !proPlan ? (
                  <p className="text-gray-700 text-center">No plan found in Clerk.</p>
                ) : (
                  <>
                    <div className="text-center">
                      <p className="text-gray-600 text-sm mb-1">Plan</p>
                      <h3 className="text-xl font-bold text-gray-900">{String(proPlan?.name ?? 'Pro')}</h3>
                      <p className="text-gray-600 mt-2">
                        {period === 'annual'
                          ? String((proPlan as any)?.annualAmountFormatted ?? (proPlan as any)?.annualPriceFormatted ?? '')
                          : String((proPlan as any)?.amountFormatted ?? '')}
                        {period === 'annual' ? <span className="text-gray-500">/year</span> : <span className="text-gray-500">/month</span>}
                      </p>
                    </div>

                    <IonButton
                      expand="block"
                      color="primary"
                      className="mt-4"
                      onClick={openCheckout}
                    >
                      Subscribe
                    </IonButton>
                    <p className="text-center text-sm text-gray-600 mt-3">
                      Opens in browser to complete payment
                    </p>
                  </>
                )}
              </div>
            </SignedIn>

            <SignedOut>
              <IonButton expand="block" color="primary" onClick={() => (window.location.href = '/sign-in')}>
                Sign in to Subscribe
              </IonButton>
            </SignedOut>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

