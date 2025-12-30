'use client';

import { useEffect } from 'react';
import { IonPage, IonContent, IonButton } from '@ionic/react';
import { Capacitor } from '@capacitor/core';

/**
 * Subscribe Page (Mobile)
 * 
 * Opens subscription in system browser (proper Next.js + Capacitor pattern).
 */
export default function SubscribePage() {
  const handleSubscribe = async () => {
    const url = 'https://flowbalance-jdk.vercel.app/subscribe-web';

    if (Capacitor.isNativePlatform()) {
      // Native: Open in system browser using App.openUrl()
      const { App } = await import('@capacitor/app');
      await App.openUrl({ url });
    } else {
      // Web: Open in new tab
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  useEffect(() => {
    // Auto-open on mount
    handleSubscribe();
  }, []);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="flex flex-col items-center justify-center min-h-full text-center p-6">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Subscribe to Unlock All Practices
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Payment opens in your browser for security
            </p>
            
            <IonButton
              expand="block"
              size="large"
              color="secondary"
              onClick={handleSubscribe}
            >
              View Plans & Subscribe
            </IonButton>
            
            <button
              onClick={() => window.location.href = '/home'}
              className="text-gray-600 underline mt-4"
            >
              Back to Home
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
