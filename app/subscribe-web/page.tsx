'use client';

import { PricingTable } from '@clerk/nextjs';

/**
 * Web-Only Subscription Page
 * 
 * This page uses Clerk's <PricingTable /> component and is designed
 * to be opened in an external browser (not in the mobile app).
 * 
 * Mobile users are redirected here from /subscribe so that Stripe
 * checkout happens in external browser, avoiding Google Play fees.
 */
export default function SubscribeWebPage() {
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 p-4"
    >
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-white opacity-90">
            Unlock all meditation practices and flows
          </p>
        </div>

        {/* Clerk Pricing Table - Works in browser */}
        <div className="bg-white rounded-lg shadow-2xl p-6">
          <PricingTable />
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white text-sm opacity-80">
            After subscribing, return to the app to enjoy full access
          </p>
        </div>
      </div>
    </div>
  );
}
