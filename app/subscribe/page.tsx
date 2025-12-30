'use client';

import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import { checkmarkCircle } from 'ionicons/icons';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';

/**
 * Mobile Subscribe Page
 * 
 * Opens Clerk's PricingTable in external browser to avoid Google Play fees.
 * Uses Capacitor Browser plugin to open checkout outside the app.
 */
export default function SubscribePage() {
  const handleSubscribe = async () => {
    const isNative = Capacitor.isNativePlatform();
    const checkoutUrl = 'https://flowbalance-jdk.vercel.app/subscribe-web';
    
    if (isNative) {
      // Open in external browser (avoids Google Play fees)
      await Browser.open({ url: checkoutUrl });
    } else {
      // Desktop - just navigate normally
      window.location.href = checkoutUrl;
    }
  };

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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Unlock Full Access
          </h1>
          <p className="text-lg text-white opacity-90">
            Subscribe to unlock all practices
          </p>
        </div>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle className="text-2xl">Pro Plan</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem lines="none">
                <IonIcon icon={checkmarkCircle} color="success" slot="start" />
                <IonLabel>Access all flows and practices</IonLabel>
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
              onClick={handleSubscribe}
            >
              View Plans
            </IonButton>

            <p className="text-center text-sm mt-4 opacity-70">
              Opens in your browser to complete securely
            </p>
          </IonCardContent>
        </IonCard>

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
