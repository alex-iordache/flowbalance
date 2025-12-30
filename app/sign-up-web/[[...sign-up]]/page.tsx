'use client';

import { SignUp, useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

/**
 * Web-Only Sign Up Page
 * 
 * After successful registration, shows message to return to mobile app.
 * No payment during signup - user will subscribe separately on web.
 */
export default function SignUpWebPage() {
  const { isLoaded, userId } = useAuth();
  const [justSignedUp, setJustSignedUp] = useState(false);

  useEffect(() => {
    if (isLoaded && userId && !justSignedUp) {
      // User just signed up successfully
      setJustSignedUp(true);
    }
  }, [isLoaded, userId, justSignedUp]);

  // Show success message after signup
  if (justSignedUp) {
    return (
      <div 
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 p-6"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Account Created!
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            You can now return to the Flow app and sign in with your email.
          </p>
          <div className="bg-purple-50 border-l-4 border-purple-600 p-4 mb-6">
            <p className="text-sm text-gray-700">
              💡 <strong>Next step:</strong> To unlock all practices, subscribe at flowbalance.com or from the app settings.
            </p>
          </div>
          <button
            onClick={() => window.location.href = '/home'}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-700"
          >
            Continue on Web
          </button>
        </div>
      </div>
    );
  }

  // Show sign-up form
  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 p-4"
    >
      <div className="w-full max-w-md">
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
