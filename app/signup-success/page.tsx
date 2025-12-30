'use client';

import { useUser } from '@clerk/nextjs';

/**
 * Sign-Up Success Page
 * 
 * Mobile-optimized success page after registration.
 */
export default function SignupSuccessPage() {
  const { user } = useUser();

  return (
    <div 
      className="flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 p-4"
      style={{
        minHeight: '100dvh',
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-lg w-full">
        <div className="text-6xl md:text-7xl mb-6 text-center">✅</div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 text-center">
          Welcome {user?.firstName || 'to Flow'}!
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6 text-center">
          Your account has been created successfully
        </p>
        
        <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 mb-6">
          <p className="text-xl md:text-2xl font-bold text-gray-800 mb-3 text-center">
            📱 Return to the Flow app
          </p>
          <p className="text-base md:text-lg text-gray-700 text-center">
            Sign in with your email to start meditating
          </p>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-600 p-4 mb-6 rounded">
          <p className="text-sm md:text-base text-gray-700">
            💡 <strong>Try the first practice free!</strong> To unlock all content, subscribe from the app or visit this site in your browser.
          </p>
        </div>

        <button
          onClick={() => window.location.href = '/subscribe-web'}
          className="bg-purple-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-purple-700 w-full mb-3 text-base md:text-lg"
        >
          Subscribe Now (Optional)
        </button>
        
        <button
          onClick={() => window.close()}
          className="text-gray-600 underline text-base md:text-lg w-full py-2"
        >
          Close this page
        </button>
      </div>
    </div>
  );
}
