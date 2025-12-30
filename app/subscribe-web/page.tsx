'use client';

import { PricingTable, SignedIn, SignedOut, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';

/**
 * Web-Only Subscription Page
 * 
 * Mobile-optimized subscription page.
 * After successful subscription on mobile, instructs user to return to app.
 */
export default function SubscribeWebPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);

  useEffect(() => {
    // Detect if opened from mobile device (not from Capacitor app, but from browser)
    const userAgent = navigator.userAgent.toLowerCase();
    const mobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    setIsMobile(mobile);

    // Check URL params for subscription success
    const params = new URLSearchParams(window.location.search);
    if (params.get('subscription') === 'success') {
      setSubscriptionSuccess(true);
    }
  }, []);

  // Show success message after subscription
  if (subscriptionSuccess) {
    return (
      <div 
        className="flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 p-4"
        style={{
          minHeight: '100dvh',
        }}
      >
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-lg w-full text-center">
          <div className="text-6xl md:text-7xl mb-6">✅</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Subscription Successful!
          </h1>
          
          {isMobile ? (
            <>
              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 mb-6">
                <p className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                  📱 Return to the Flow app
                </p>
                <p className="text-base md:text-lg text-gray-700">
                  Your subscription is now active. Open the Flow app to access all premium content.
                </p>
              </div>
              <button
                onClick={() => window.close()}
                className="bg-purple-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-purple-700 w-full text-base md:text-lg"
              >
                Close this page
              </button>
            </>
          ) : (
            <>
              <p className="text-lg md:text-xl text-gray-700 mb-6">
                You now have access to all premium features!
              </p>
              <button
                onClick={() => window.location.href = '/home'}
                className="bg-purple-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-purple-700 w-full text-base md:text-lg"
              >
                Go to Home
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="flex flex-col bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 p-4"
      style={{
        minHeight: '100dvh',
      }}
    >
      <div className="max-w-5xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90">
            Unlock all meditation practices
          </p>
        </div>

        <ClerkLoading>
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 text-center">
            <p className="text-base md:text-lg text-gray-700">Loading subscription options...</p>
          </div>
        </ClerkLoading>

        <ClerkLoaded>
          {/* Signed In: Show Pricing */}
          <SignedIn>
            <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 mb-6">
              <PricingTable 
                appearance={{
                  elements: {
                    rootBox: "mx-auto w-full",
                    card: "shadow-lg rounded-xl p-4 md:p-6 w-full",
                    formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg text-base font-semibold w-full",
                    priceText: "text-2xl md:text-3xl font-bold",
                    cardTitle: "text-xl md:text-2xl font-bold"
                  }
                }}
              />
            </div>

            <div className="text-center">
              <div className="bg-white/20 backdrop-blur rounded-xl p-4 mb-4">
                {isMobile ? (
                  <>
                    <p className="text-white text-base md:text-lg font-semibold mb-2">
                      ✅ After subscribing, return to Flow app
                    </p>
                    <p className="text-white text-sm md:text-base opacity-90">
                      Your subscription syncs automatically
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-white text-base md:text-lg font-semibold mb-2">
                      ✅ After subscribing, access all premium content
                    </p>
                    <p className="text-white text-sm md:text-base opacity-90">
                      Your subscription activates immediately
                    </p>
                  </>
                )}
              </div>
            </div>
          </SignedIn>

          {/* Signed Out: Show Sign In */}
          <SignedOut>
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Please Sign In First
              </h2>
              <p className="text-base md:text-lg text-gray-700 mb-6">
                You need to sign in to subscribe
              </p>
              <button
                onClick={() => window.location.href = '/sign-in'}
                className="bg-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-purple-700 w-full text-base md:text-lg"
              >
                Sign In
              </button>
            </div>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </div>
  );
}
