'use client';

import { SignUp, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignUpPage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && userId) {
      // User is already signed in, redirect to home
      router.push('/home');
    }
  }, [isLoaded, userId, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-purple-600">
      <SignUp 
        forceRedirectUrl="/home"
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-xl"
          }
        }}
      />
    </div>
  );
}
