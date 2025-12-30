'use client';

import { IonPage, IonContent } from '@ionic/react';

/**
 * Subscribe Page (Mobile)
 * 
 * Simple page with link to open subscription in browser.
 */
export default function SubscribePage() {
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
            
            <a 
              href="https://flowbalance-jdk.vercel.app/subscribe-web"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-purple-700 transition-colors text-center text-lg mb-4"
            >
              View Plans & Subscribe
            </a>
            
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
