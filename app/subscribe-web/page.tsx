'use client';

import { PricingTable, SignedIn, SignedOut } from '@clerk/nextjs';

/**
 * Web-Only Subscription Page
 * 
 * Users come here from mobile app to subscribe.
 * After payment, they return to the app.
 */
export default function SubscribeWebPage() {
  return (
    <div 
      className="flex flex-col min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 p-6"
    >
      <div className="max-w-4xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-white opacity-90">
            Unlock all meditation practices and flows
          </p>
        </div>

        {/* Signed In: Show Pricing */}
        <SignedIn>
          <div className="bg-white rounded-lg shadow-2xl p-6">
            <PricingTable 
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-lg rounded-xl",
                  formButtonPrimary: "bg-purple-600 hover:bg-purple-700"
                }
              }}
            />
          </div>

          <div className="text-center mt-8">
            <p className="text-white text-lg mb-2">
              ✅ After subscribing, return to the Flow app
            </p>
            <p className="text-white opacity-80">
              Your subscription will sync automatically
            </p>
          </div>
        </SignedIn>

        {/* Signed Out: Show Sign In */}
        <SignedOut>
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Please Sign In First
            </h2>
            <p className="text-gray-700 mb-6">
              You need to sign in to subscribe to a plan
            </p>
            <button
              onClick={() => window.location.href = '/sign-in'}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-700"
            >
              Sign In
            </button>
          </div>
        </SignedOut>
      </div>
    </div>
  );
}
