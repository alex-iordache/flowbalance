'use client';

import { SignUp } from '@clerk/nextjs';

/**
 * Web-Only Sign Up Page
 * 
 * Mobile-optimized sign-up page that opens in browser.
 * After registration, redirects to success page.
 */
export default function SignUpWebPage() {
  return (
    <div 
      className="flex items-center justify-center bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 p-4"
      style={{
        minHeight: '100dvh',
      }}
    >
      <div className="w-full max-w-lg px-2">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Flow
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90">
            Create your account
          </p>
        </div>

        {/* Clerk Sign Up Component */}
        <SignUp 
          signInUrl="/sign-in"
          afterSignUpUrl="/subscribe-web"
          forceRedirectUrl="/subscribe-web"
          fallbackRedirectUrl="/subscribe-web"
          appearance={{
            elements: {
              rootBox: "mx-auto w-full",
              card: "shadow-2xl w-full bg-white rounded-2xl p-6 md:p-8",
              formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg text-base font-semibold w-full",
              formFieldInput: "text-base py-3 px-4 rounded-lg border-2 border-gray-300 focus:border-purple-600 w-full",
              formFieldLabel: "text-base font-semibold text-gray-700 mb-2",
              footerActionLink: "text-purple-600 hover:text-purple-700 font-semibold text-base",
              identityPreviewText: "text-base",
              formHeaderTitle: "text-2xl md:text-3xl font-bold text-gray-900 mb-2",
              formHeaderSubtitle: "text-base text-gray-600",
              socialButtonsBlockButton: "text-base py-3 px-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 w-full",
              dividerLine: "bg-gray-300",
              dividerText: "text-gray-500 text-sm"
            },
            layout: {
              socialButtonsPlacement: 'top',
              socialButtonsVariant: 'blockButton',
            }
          }}
        />
      </div>
    </div>
  );
}
