'use client';

import { useEffect, useMemo, useState } from 'react';

function sanitizeReturnTo(raw: string | null): string {
  if (!raw) return '/home';
  // Only allow internal paths
  if (!raw.startsWith('/')) return '/home';
  if (raw.startsWith('//')) return '/home';
  return raw;
}

export default function SubscribeWebReturnPage() {
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    try {
      setSearch(window.location.search || '');
    } catch {
      // ignore
    }
  }, []);

  const returnTo = useMemo(() => {
    const params = new URLSearchParams(search);
    return sanitizeReturnTo(params.get('return'));
  }, [search]);

  useEffect(() => {
    // Deep link back into the app. Android/iOS will open the app via the custom scheme.
    const deepLink = `com.flowapp.app://sso-callback?subscribed=1&return=${encodeURIComponent(returnTo)}`;

    // Attempt to open the app immediately.
    window.location.href = deepLink;

    // Best-effort: close this tab if it was opened by script.
    const t = window.setTimeout(() => {
      try {
        window.close();
      } catch {
        // ignore
      }
    }, 300);

    return () => window.clearTimeout(t);
  }, [returnTo]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="max-w-md w-full text-center space-y-3">
        <h1 className="text-2xl font-bold text-gray-900">Subscription complete</h1>
        <p className="text-gray-600">Returning you to the Flow app…</p>
        <a
          href={`com.flowapp.app://sso-callback?subscribed=1&return=${encodeURIComponent(returnTo)}`}
          className="inline-block mt-4 bg-purple-600 hover:bg-purple-700 text-white py-3 px-5 rounded-xl font-semibold"
        >
          Return to app
        </a>
      </div>
    </div>
  );
}

