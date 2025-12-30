'use client';

import { SignIn, useAuth, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function SignInPage() {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (isLoaded && userId && user) {
      console.log('[SignIn] User authenticated, checking redirect...');
      
      // Read query parameters from URL
      const urlParams = new URLSearchParams(window.location.search);
      
      // PRIORITY 1: Check for sign_up_force_redirect_url query parameter (from Clerk OAuth)
      const signUpForceRedirect = urlParams.get('sign_up_force_redirect_url');
      if (signUpForceRedirect) {
        console.log('[SignIn] Found sign_up_force_redirect_url param:', signUpForceRedirect);
        try {
          // Extract just the path from the full URL
          const redirectPath = new URL(signUpForceRedirect).pathname;
          console.log('[SignIn] Redirecting to:', redirectPath);
          window.location.href = redirectPath;
          return;
        } catch (e) {
          console.error('[SignIn] Error parsing redirect URL:', e);
        }
      }
      
      // PRIORITY 2: Check for after_sign_up_url query parameter
      const afterSignUpUrl = urlParams.get('after_sign_up_url');
      if (afterSignUpUrl) {
        console.log('[SignIn] Found after_sign_up_url param:', afterSignUpUrl);
        try {
          const redirectPath = new URL(afterSignUpUrl).pathname;
          console.log('[SignIn] Redirecting to:', redirectPath);
          window.location.href = redirectPath;
          return;
        } catch (e) {
          console.error('[SignIn] Error parsing redirect URL:', e);
        }
      }
      
      // PRIORITY 3: Check account age (for cases without query params)
      const accountAgeSeconds = user.createdAt 
        ? (Date.now() - new Date(user.createdAt).getTime()) / 1000 
        : Infinity;
      
      if (accountAgeSeconds < 30) {
        console.log('[SignIn] New user (no query params), account age: ' + accountAgeSeconds + 's, redirecting to post-signup-redirect');
        window.location.href = '/post-signup-redirect';
      } else {
        console.log('[SignIn] Existing user (no query params), redirecting to home');
        window.location.href = '/home';
      }
    } else {
      console.log('[SignIn] Not ready:', { isLoaded, userId, hasUser: !!user });
    }
  }, [isLoaded, userId, user]);

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
      <div className="w-full max-w-md px-4">
        <SignIn 
          signUpUrl="/sign-up"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-xl",
              formButtonPrimary: "bg-purple-600 hover:bg-purple-700",
              footerActionLink: "text-purple-600 hover:text-purple-700"
            }
          }}
        />
      </div>
    </div>
  );
}
