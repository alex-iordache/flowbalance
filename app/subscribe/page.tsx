'use client';

import { PricingTable } from '@clerk/nextjs';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton } from '@ionic/react';

/**
 * Subscribe/Manage Subscription Page
 * 
 * Shows Clerk's PricingTable for users to subscribe or manage their plan.
 * Uses Clerk's own billing system.
 */
export default function SubscribePage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="text-white">Subscription Plans</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => window.location.href = '/home'}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" scrollY={true}>
        <div className="py-6">
          <div className="text-center text-white mb-6">
            <h1 className="text-3xl font-bold mb-2">Choose Your Plan</h1>
            <p className="text-lg opacity-90">Unlock all meditation practices</p>
          </div>
          
          <PricingTable 
            appearance={{
              elements: {
                rootBox: "mx-auto max-w-4xl",
                card: "shadow-xl rounded-xl bg-white",
                formButtonPrimary: "bg-purple-600 hover:bg-purple-700"
              }
            }}
          />
        </div>
      </IonContent>
    </IonPage>
  );
}
