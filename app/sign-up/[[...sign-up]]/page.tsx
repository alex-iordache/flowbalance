'use client';

import { SignUp } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function SignUpPage() {
  // Debug: Log what environment variables Clerk is seeing
  useEffect(() => {
    console.log('🔍 [DEBUG] Clerk Sign-Up Page Environment Variables:');
    console.log('SIGN_UP_URL:', process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL);
    console.log('SIGN_UP_FORCE_REDIRECT:', process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL);
    console.log('SIGN_UP_FALLBACK_REDIRECT:', process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL);
    console.log('SIGN_IN_URL:', process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL);
    console.log('---');
    console.log('If SIGN_UP_FORCE_REDIRECT is undefined, the environment variable is NOT set!');
    console.log('It should be: /post-signup-redirect');
  }, []);

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
          afterSignUpUrl="/post-signup-redirect"
          forceRedirectUrl="/post-signup-redirect"
          fallbackRedirectUrl="/post-signup-redirect"
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
