'use client';

import { useAuth, useOrganization, useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/react';
import { sparkles, checkmarkCircle } from 'ionicons/icons';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';

interface Plan {
  id: string;
  name: string;
  description?: string;
  price?: {
    amount: number;
    currency: string;
    recurring?: {
      interval: string;
    };
  };
  features?: string[];
}

/**
 * Welcome Page after Sign-Up
 * 
 * Fetches real pricing from Clerk API and displays it.
 * Subscribe button opens external browser for payment.
 */
export default function PostSignupRedirect() {
  const { isLoaded, userId } = useAuth();
  const { organization, isLoaded: orgLoaded } = useOrganization();
  const { user } = useUser();
  const [checking, setChecking] = useState(true);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  // Fetch plans from Clerk
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/plans');
        const data = await response.json();
        if (data.success && data.plans) {
          setPlans(data.plans);
        }
      } catch (error) {
        console.error('[Welcome] Error fetching plans:', error);
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchPlans();
  }, []);

  // Check authentication and organization
  useEffect(() => {
    if (!isLoaded || !orgLoaded) return;
    
    if (!userId) {
      window.location.href = '/sign-in';
      return;
    }

    const timer = setTimeout(() => {
      if (organization) {
        window.location.href = '/home';
      } else {
        setChecking(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [isLoaded, userId, orgLoaded, organization]);

  const handleSubscribe = async () => {
    const isNative = Capacitor.isNativePlatform();
    const checkoutUrl = 'https://flowbalance-jdk.vercel.app/subscribe-web';
    
    if (isNative) {
      await Browser.open({ url: checkoutUrl });
    } else {
      window.location.href = checkoutUrl;
    }
  };

  const handleMaybeLater = () => {
    window.location.href = '/home';
  };

  // Format price for display
  const formatPrice = (plan: Plan) => {
    if (!plan.price) return 'Contact us';
    const amount = (plan.price.amount / 100).toFixed(2);
    const currency = plan.price.currency.toUpperCase();
    const interval = plan.price.recurring?.interval || 'month';
    return `$${amount}/${interval}`;
  };

  if (checking) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <div className="flex items-center justify-center min-h-full">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold">Setting up your account...</h2>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  // Find the pro plan (or first paid plan)
  const proPlan = plans.find(p => 
    p.name.toLowerCase().includes('pro') || 
    p.name.toLowerCase().includes('premium')
  ) || plans[0];

  return (
    <IonPage>
      <IonContent className="ion-padding" scrollY={true}>
        <div className="flex flex-col min-h-full py-8">
          {/* Welcome Section */}
          <div className="text-center text-white mb-8">
            <IonIcon icon={sparkles} style={{ fontSize: '72px' }} className="text-yellow-300 mb-4" />
            <h1 className="text-4xl font-bold mb-3">
              Welcome {user?.firstName}!
            </h1>
            <p className="text-xl mb-2">
              Your account has been created successfully
            </p>
            <p className="text-lg opacity-80">
              Try the first practice for free
            </p>
          </div>

          {/* Pricing Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 mx-4 mb-6">
            {loadingPlans ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading plans...</p>
              </div>
            ) : proPlan ? (
              <>
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {proPlan.name}
                  </h2>
                  <div className="text-4xl font-bold text-purple-600 mb-1">
                    {formatPrice(proPlan)}
                  </div>
                  {proPlan.description && (
                    <p className="text-sm text-gray-600">{proPlan.description}</p>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <IonIcon icon={checkmarkCircle} className="text-green-500 text-2xl mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-gray-700 text-lg">Access to <strong>all</strong> meditation flows</p>
                  </div>
                  <div className="flex items-start">
                    <IonIcon icon={checkmarkCircle} className="text-green-500 text-2xl mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-gray-700 text-lg"><strong>Offline access</strong> anywhere</p>
                  </div>
                  <div className="flex items-start">
                    <IonIcon icon={checkmarkCircle} className="text-green-500 text-2xl mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-gray-700 text-lg"><strong>Track</strong> your progress</p>
                  </div>
                  <div className="flex items-start">
                    <IonIcon icon={checkmarkCircle} className="text-green-500 text-2xl mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-gray-700 text-lg"><strong>New content</strong> regularly</p>
                  </div>
                </div>

                <IonButton
                  expand="block"
                  size="large"
                  color="secondary"
                  className="font-bold mb-3"
                  onClick={handleSubscribe}
                >
                  Subscribe Now
                </IonButton>
                
                <p className="text-center text-sm text-gray-500">
                  Payment page opens in your browser
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No plans available at the moment</p>
                <IonButton onClick={handleMaybeLater}>
                  Continue to App
                </IonButton>
              </div>
            )}
          </div>

          {/* Skip option */}
          <div className="text-center px-4 pb-4">
            <button
              onClick={handleMaybeLater}
              className="text-white text-lg underline"
            >
              Maybe later, explore free practice
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
