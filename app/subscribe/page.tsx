'use client';

import { PricingTable } from '@clerk/nextjs';
import { useEffect } from 'react';

/**
 * Subscription/Pricing Page
 * 
 * This page displays Clerk's PricingTable component which shows
 * all available plans and allows users to subscribe.
 * 
 * Important: Plans must be created in Clerk Dashboard first:
 * https://dashboard.clerk.com/~/billing/plans
 * 
 * Required plans:
 * - free_user (key: 'free_user')
 * - pro_user (key: 'pro_user')
 */
export default function SubscribePage() {
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 p-4"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
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

        {/* Clerk Pricing Table */}
        <div className="bg-white rounded-lg shadow-2xl p-6">
          <PricingTable />
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <button
            onClick={() => window.history.back()}
            className="text-white underline opacity-80 hover:opacity-100"
          >
            ← Back to App
          </button>
        </div>
      </div>
    </div>
  );
}
