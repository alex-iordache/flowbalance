'use client';

import { SignIn, useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function SignInPage() {
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    if (isLoaded && userId) {
      // User is signed in, redirect to home using full page navigation
      window.location.href = '/home';
    }
  }, [isLoaded, userId]);

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
