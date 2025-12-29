'use client';

import { SignUp, useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function SignUpPage() {
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    if (isLoaded && userId) {
      // User is already signed in, use full page navigation to trigger Ionic router
      window.location.href = '/home';
    }
  }, [isLoaded, userId]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-purple-600">
      <SignUp 
        forceRedirectUrl="/home"
        signInUrl="/sign-in"
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
  );
}
