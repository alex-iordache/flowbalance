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
 * 
 * On mobile, Stripe checkout opens in external browser automatically
 * to avoid Google Play's 30% fee (detected by stripe.com domain)
 */
export default function SubscribePage() {
  useEffect(() => {
    console.log('[Subscribe] Setting up Stripe external redirect...');

    // Intercept ANY navigation to stripe.com and force external browser
    const clickHandler = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      
      // Walk up the DOM to find a clickable element
      while (target && target !== document.body) {
        // Check if this element or any parent will navigate to Stripe
        const onclick = target.getAttribute('onclick');
        const href = target.getAttribute('href');
        
        if ((onclick && onclick.includes('stripe')) || (href && href.includes('stripe'))) {
          console.log('[Subscribe] 🚀 Stripe link detected, redirecting to external browser');
          e.preventDefault();
          e.stopPropagation();
          
          // Open in default browser by setting window.location to stripe URL
          // The mobile OS will automatically open this in external browser
          if (href) {
            window.location.href = href;
          }
          return;
        }
        
        target = target.parentElement;
      }
    };

    document.addEventListener('click', clickHandler, true);

    // Monitor for Stripe iframes and redirect them
    const observer = new MutationObserver(() => {
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach((iframe) => {
        if (iframe.src && iframe.src.includes('stripe.com')) {
          console.log('[Subscribe] 🚀 Stripe iframe detected, redirecting to:', iframe.src);
          // Open Stripe in default external browser
          window.location.href = iframe.src;
          iframe.remove();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      document.removeEventListener('click', clickHandler, true);
      observer.disconnect();
    };
  }, []);

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
