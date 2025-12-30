'use client';

import { useAuth, useOrganization } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

/**
 * Post-Signup Redirect Page
 * 
 * This page handles intelligent redirects after a user signs up:
 * - Organization users → /home (automatic full access)
 * - Regular users → /subscribe (choose a plan)
 * 
 * This approach ensures the redirect happens AFTER Clerk completes
 * the sign-up process and organization data is available.
 */
export default function PostSignupRedirect() {
  const { isLoaded, userId } = useAuth();
  const { organization, isLoaded: orgLoaded } = useOrganization();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    console.log('[PostSignupRedirect] Debug:', { 
      isLoaded, 
      userId, 
      orgLoaded, 
      hasOrg: !!organization,
      orgName: organization?.name 
    });

    // Wait for both auth and organization data to load
    if (!isLoaded || !orgLoaded) {
      console.log('[PostSignupRedirect] Still loading...');
      return;
    }

    // If no userId, user isn't authenticated - redirect to sign-in
    if (!userId) {
      console.log('[PostSignupRedirect] No user, redirecting to sign-in');
      window.location.href = '/sign-in';
      return;
    }

    console.log('[PostSignupRedirect] User authenticated, checking organization...');

    // Add a small delay to ensure organization data is fully loaded
    const timer = setTimeout(() => {
      if (organization) {
        console.log('[PostSignupRedirect] Organization user detected:', organization.name);
        console.log('[PostSignupRedirect] Redirecting to /home');
        window.location.href = '/home';
      } else {
        console.log('[PostSignupRedirect] Regular user (no organization)');
        console.log('[PostSignupRedirect] Redirecting to /subscribe');
        window.location.href = '/subscribe';
      }
      setChecking(false);
    }, 500); // Small delay to ensure org data is loaded

    return () => clearTimeout(timer);
  }, [isLoaded, userId, orgLoaded, organization]);

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-purple-600"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold mb-2">Setting up your account...</h2>
        <p className="text-lg opacity-90">This will only take a moment</p>
        {checking && (
          <div className="mt-4 text-sm opacity-70">
            <p>Checking account type...</p>
          </div>
        )}
      </div>
    </div>
  );
}
