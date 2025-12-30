'use client';

import { IonPage, IonContent, IonButton } from '@ionic/react';
import { openExternalUrl } from '../../helpers/openExternal';

/**
 * Subscribe Page (Mobile)
 * 
 * Opens subscription in system browser (native) or new tab (web).
 */
export default function SubscribePage() {
  const handleSubscribe = async () => {
    await openExternalUrl('https://flowbalance-jdk.vercel.app/subscribe-web');
  };

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
              className="w-full mb-4"
            >
              View Plans & Subscribe
            </IonButton>
            
            <button
              onClick={() => window.location.href = '/home'}
              className="text-gray-600 underline"
            >
              Back to Home
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
