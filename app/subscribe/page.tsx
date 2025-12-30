'use client';

import { useEffect } from 'react';
import { IonPage, IonContent, IonButton } from '@ionic/react';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';

/**
 * Subscribe Page (Mobile)
 * 
 * Redirects to web for subscription to comply with Google Play policies.
 */
export default function SubscribePage() {
  const handleSubscribeOnWeb = () => {
    const isNative = Capacitor.isNativePlatform();
    
    if (isNative) {
      // Open in SYSTEM browser (not in-app browser)
      window.open('https://flowbalance-jdk.vercel.app/subscribe-web', '_system');
    } else {
      window.location.href = '/subscribe-web';
    }
  };

  useEffect(() => {
    // Auto-open on mount
    handleSubscribeOnWeb();
  }, []);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="flex flex-col items-center justify-center min-h-full text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Opening subscription page...
          </h2>
          <p className="text-white mb-6">
            Opens in your browser for secure payment
          </p>
          <IonButton
            color="light"
            onClick={handleSubscribeOnWeb}
          >
            Open Subscription Page
          </IonButton>
          <button
            onClick={() => window.location.href = '/home'}
            className="text-white underline mt-4"
          >
            Back to Home
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
}
