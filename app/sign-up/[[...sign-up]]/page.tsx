'use client';

import { SignUp, useAuth, useOrganization } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function SignUpPage() {
  const { isLoaded, userId } = useAuth();
  const { organization, isLoaded: orgLoaded } = useOrganization();

  useEffect(() => {
    if (isLoaded && userId && orgLoaded) {
      // Check if user is part of an organization
      if (organization) {
        // Organization user (Type B) - has automatic full access
        // Redirect to home
        window.location.href = '/home';
      } else {
        // Regular user (Type A) - needs to subscribe
        // Redirect to subscription page to choose a plan
        window.location.href = '/subscribe';
      }
    }
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
      <div className="w-full max-w-md px-4">
        <SignUp 
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
    </div>
  );
}
