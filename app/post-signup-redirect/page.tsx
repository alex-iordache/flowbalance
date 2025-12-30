'use client';

import { useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';

/**
 * Post-Signup Redirect
 * 
 * All users → /home
 */
export default function PostSignupRedirect() {
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;
    
    if (!userId) {
      window.location.href = '/sign-in';
      return;
    }

    // All users go to home (no payment in app)
    window.location.href = '/home';
  }, [isLoaded, userId]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-purple-600">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold">Welcome! Redirecting...</h2>
      </div>
    </div>
  );
}
