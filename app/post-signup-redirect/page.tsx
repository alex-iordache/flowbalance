'use client';

import { useAuth, useOrganization, useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { checkmarkCircle, sparkles } from 'ionicons/icons';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';

/**
 * Welcome/Success Page after Sign-Up
 * 
 * Shows welcome message with user's first name and pricing info.
 * CTA button opens external browser for payment (Clerk PricingTable).
 * Organization users are redirected to /home automatically.
 */
export default function PostSignupRedirect() {
  const { isLoaded, userId } = useAuth();
  const { organization, isLoaded: orgLoaded } = useOrganization();
  const { user } = useUser();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Wait for auth and organization data
    if (!isLoaded || !orgLoaded) return;
    
    if (!userId) {
      window.location.href = '/sign-in';
      return;
    }

    // Organization users go directly to home
    const timer = setTimeout(() => {
      if (organization) {
        window.location.href = '/home';
      } else {
        // Regular users see the welcome + pricing page
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

  // Loading state
  if (checking) {
    return (
      <div
        className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-purple-600"
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">Setting up your account...</h2>
        </div>
      </div>
    );
  }

  // Success page
  return (
    <div
      className="flex flex-col min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 p-6"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'calc(env(safe-area-inset-left) + 1.5rem)',
        paddingRight: 'calc(env(safe-area-inset-right) + 1.5rem)',
      }}
    >
      {/* Welcome Section */}
      <div className="text-center text-white mb-6">
        <div className="mb-4">
          <IonIcon icon={sparkles} style={{ fontSize: '64px' }} className="text-yellow-300" />
        </div>
        <h1 className="text-4xl font-bold mb-3">
          Welcome {user?.firstName || 'to Flow'}!
        </h1>
        <p className="text-xl opacity-90 mb-2">
          Your account has been created successfully
        </p>
        <p className="text-lg opacity-80">
          You can try the first practice for free
        </p>
      </div>

      {/* Pricing Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Unlock Full Access
          </h2>
          <div className="text-4xl font-bold text-purple-600 mb-1">
            $9.99<span className="text-xl font-normal text-gray-600">/month</span>
          </div>
          <p className="text-sm text-gray-600">Cancel anytime</p>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start">
            <IonIcon icon={checkmarkCircle} className="text-green-500 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-gray-700">Access to <strong>all meditation flows</strong> and practices</p>
          </div>
          <div className="flex items-start">
            <IonIcon icon={checkmarkCircle} className="text-green-500 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-gray-700"><strong>Offline access</strong> to download and listen anywhere</p>
          </div>
          <div className="flex items-start">
            <IonIcon icon={checkmarkCircle} className="text-green-500 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-gray-700"><strong>Progress tracking</strong> across all your practices</p>
          </div>
          <div className="flex items-start">
            <IonIcon icon={checkmarkCircle} className="text-green-500 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-gray-700"><strong>New content</strong> added regularly</p>
          </div>
        </div>

        {/* CTA Button */}
        <IonButton
          expand="block"
          size="large"
          color="secondary"
          className="font-bold text-lg"
          onClick={handleSubscribe}
        >
          Subscribe Now
        </IonButton>
        
        <p className="text-center text-sm text-gray-500 mt-3">
          Payment page opens in your browser
        </p>
      </div>

      {/* Skip option */}
      <div className="text-center mt-auto">
        <button
          onClick={handleMaybeLater}
          className="text-white text-lg underline opacity-90 hover:opacity-100"
        >
          Maybe later, explore the free practice
        </button>
      </div>
    </div>
  );
}
