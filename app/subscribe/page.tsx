'use client';

import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import { checkmarkCircle } from 'ionicons/icons';
import { useEffect } from 'react';

/**
 * Subscription/Pricing Page
 * 
 * For mobile apps, we can't use Clerk's <PricingTable /> component
 * because it opens payment in-app. Instead, we redirect users to
 * the web version of the subscribe page in their external browser
 * where they can complete payment without Google Play fees.
 */
export default function SubscribePage() {
  useEffect(() => {
    // On mobile, redirect to web version in external browser
    const isMobile = typeof window !== 'undefined' && 
                    (navigator.userAgent.includes('Android') || 
                     navigator.userAgent.includes('iPhone'));
    
    if (isMobile) {
      console.log('[Subscribe] Mobile detected, opening external browser for payment');
      // Open the subscribe page in external browser
      window.location.href = 'https://flowbalance-jdk.vercel.app/subscribe-web';
    }
  }, []);

  // Fallback UI for non-mobile or if redirect doesn't work
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 p-4"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Unlock Full Access
          </h1>
          <p className="text-lg text-white opacity-90">
            To subscribe, we'll open payment in your browser
          </p>
        </div>

        {/* Pro Plan Card */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle className="text-2xl">Pro Plan</IonCardTitle>
            <p className="text-3xl font-bold mt-2">$9.99<span className="text-base font-normal">/month</span></p>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem lines="none">
                <IonIcon icon={checkmarkCircle} color="success" slot="start" />
                <IonLabel>Access to all flows and practices</IonLabel>
              </IonItem>
              <IonItem lines="none">
                <IonIcon icon={checkmarkCircle} color="success" slot="start" />
                <IonLabel>Offline access</IonLabel>
              </IonItem>
              <IonItem lines="none">
                <IonIcon icon={checkmarkCircle} color="success" slot="start" />
                <IonLabel>Progress tracking</IonLabel>
              </IonItem>
              <IonItem lines="none">
                <IonIcon icon={checkmarkCircle} color="success" slot="start" />
                <IonLabel>New content regularly</IonLabel>
              </IonItem>
            </IonList>

            <IonButton 
              expand="block" 
              size="large" 
              className="mt-4"
              onClick={() => {
                console.log('[Subscribe] Opening payment in external browser');
                // This will open in external browser on mobile
                window.location.href = 'https://flowbalance-jdk.vercel.app/subscribe-web';
              }}
            >
              Subscribe Now
            </IonButton>

            <p className="text-center text-sm mt-4 opacity-70">
              Payment opens in your browser to complete securely
            </p>
          </IonCardContent>
        </IonCard>

        {/* Footer */}
        <div className="text-center mt-6">
          <button
            onClick={() => window.location.href = '/home'}
            className="text-white underline opacity-80"
          >
            ← Back to App
          </button>
        </div>
      </div>
    </div>
  );
}
