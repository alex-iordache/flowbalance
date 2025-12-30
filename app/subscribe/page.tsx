'use client';

import { useEffect } from 'react';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';

/**
 * Subscribe Page - Redirect to External Browser
 * 
 * When users click "Manage Subscription" from Settings,
 * immediately open Clerk's PricingTable in external browser.
 */
export default function SubscribePage() {
  useEffect(() => {
    const openPayment = async () => {
      const isNative = Capacitor.isNativePlatform();
      const checkoutUrl = 'https://flowbalance-jdk.vercel.app/subscribe-web';
      
      if (isNative) {
        await Browser.open({ url: checkoutUrl });
        // After opening browser, go back to home
        window.location.href = '/home';
      } else {
        window.location.href = checkoutUrl;
      }
    };

    openPayment();
  }, []);

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
        <h2 className="text-2xl font-bold mb-2">Opening payment page...</h2>
        <p className="text-lg opacity-90">This will open in your browser</p>
      </div>
    </div>
  );
}
