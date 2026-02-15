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
    <div className="flex items-center justify-center min-h-screen" style={{ background: '#F4EFE8' }}>
      <div className="text-center" style={{ color: '#4E5B4F' }}>
        <div
          className="animate-spin rounded-full h-16 w-16 mx-auto mb-4"
          style={{ border: '3px solid rgba(78, 91, 79, 0.18)', borderTopColor: '#4E5B4F' }}
        />
        <h2 className="text-2xl font-bold">Welcome! Redirecting...</h2>
      </div>
    </div>
  );
}
