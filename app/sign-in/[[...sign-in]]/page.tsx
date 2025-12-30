'use client';

import { SignIn } from '@clerk/nextjs';

/**
 * Sign In Page
 * 
 * Clerk handles all redirects via environment variables:
 * - Existing users → /home (SIGN_IN_FALLBACK_REDIRECT_URL)
 * - New signups → /post-signup-redirect (SIGN_UP_FORCE_REDIRECT_URL)
 */
export default function SignInPage() {
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
