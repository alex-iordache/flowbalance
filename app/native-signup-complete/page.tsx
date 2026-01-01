'use client';

import { useEffect } from 'react';

/**
 * Native sign-up completion bridge page.
 *
 * This page is only used when the user signs up inside an in-app browser tab
 * (Chrome Custom Tab / SFSafariViewController). Clerk can redirect to http(s)
 * URLs, so we redirect here first, then deep-link back into the Capacitor app.
 *
 * The app listens for the deep link and closes the in-app browser tab.
 */
export default function NativeSignupCompletePage() {
  useEffect(() => {
    // Reuse the existing deep link host in AndroidManifest: com.flowapp.app://sso-callback
    const deepLink = `com.flowapp.app://sso-callback?flow=signup&ts=${Date.now()}`;
    window.location.href = deepLink;
  }, []);

  return (
    <div
      className="flex items-center justify-center bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 p-6"
      style={{ minHeight: '100dvh' }}
    >
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">All set!</h1>
        <p className="text-gray-700">
          Returning to the Flow app…
        </p>
      </div>
    </div>
  );
}

