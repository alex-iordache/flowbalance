'use client';

import { useAuth, useOrganization, useUser, PricingTable } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { IonPage, IonContent, IonIcon, IonButton } from '@ionic/react';
import { sparkles } from 'ionicons/icons';

/**
 * Welcome Page after Sign-Up
 * 
 * Shows welcome message and Clerk's PricingTable for subscription.
 * Using Clerk's own billing (not external Stripe).
 */
export default function PostSignupRedirect() {
  const { isLoaded, userId } = useAuth();
  const { organization, isLoaded: orgLoaded } = useOrganization();
  const { user } = useUser();
  const [checking, setChecking] = useState(true);

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

  const handleMaybeLater = () => {
    window.location.href = '/home';
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

  return (
    <IonPage>
      <IonContent className="ion-padding" scrollY={true}>
        <div className="flex flex-col py-6">
          {/* Welcome Section */}
          <div className="text-center text-white mb-6">
            <IonIcon icon={sparkles} style={{ fontSize: '64px' }} className="text-yellow-300 mb-3" />
            <h1 className="text-3xl font-bold mb-2">
              Welcome {user?.firstName}!
            </h1>
            <p className="text-lg mb-1">
              Your account has been created successfully
            </p>
            <p className="text-base opacity-80">
              Try the first practice for free or unlock everything below
            </p>
          </div>

          {/* Clerk Pricing Table - Real data from Clerk */}
          <div className="px-4 mb-4">
            <PricingTable 
              appearance={{
                elements: {
                  rootBox: "mx-auto max-w-4xl",
                  card: "shadow-xl rounded-xl",
                  formButtonPrimary: "bg-purple-600 hover:bg-purple-700"
                }
              }}
            />
          </div>

          {/* Skip option */}
          <div className="text-center px-4 pb-4">
            <IonButton
              fill="clear"
              size="large"
              onClick={handleMaybeLater}
              className="text-white"
            >
              Maybe later, explore free practice →
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
