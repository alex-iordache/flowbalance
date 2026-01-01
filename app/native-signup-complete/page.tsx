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
    const run = async () => {
      let ticket = '';

      // In this page we're signed in (in the in-app browser tab).
      // Create a transferable sign-in token so the Capacitor WebView can establish a session.
      try {
        const res = await fetch('/api/create-sign-in-token', { method: 'GET' });
        const data = await res.json();
        if (res.ok && data?.token) {
          ticket = String(data.token);
        }
      } catch {
        // ignore; we'll fall back without ticket
      }

      const params = new URLSearchParams();
      params.set('flow', 'signup');
      params.set('ts', String(Date.now()));
      if (ticket) params.set('ticket', ticket);

      // Reuse the existing deep link host in AndroidManifest: com.flowapp.app://sso-callback
      const deepLink = `com.flowapp.app://sso-callback?${params.toString()}`;
      window.location.href = deepLink;
    };

    run();
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

