'use client';

import { PricingTable, SignedIn, SignedOut } from '@clerk/nextjs';

/**
 * Web-Only Subscription Page
 * 
 * Mobile-optimized subscription page.
 */
export default function SubscribeWebPage() {
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
              <p className="text-white text-base md:text-lg font-semibold mb-2">
                ✅ After subscribing, return to Flow app
              </p>
              <p className="text-white text-sm md:text-base opacity-90">
                Your subscription syncs automatically
              </p>
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
      </div>
    </div>
  );
}
