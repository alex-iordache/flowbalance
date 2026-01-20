'use client';

import { useEffect, useMemo, useState } from 'react';

function sanitizeReturnTo(raw: string | null): string {
  if (!raw) return '/home';
  // Only allow internal paths
  if (!raw.startsWith('/')) return '/home';
  if (raw.startsWith('//')) return '/home';
  return raw;
}

function unwrapReturnTo(raw: string): string {
  // If we somehow got a return=/subscribe?return=... chain, unwrap it back to the original target.
  // We cap iterations to avoid loops.
  let current = raw;
  for (let i = 0; i < 3; i += 1) {
    if (!current.startsWith('/subscribe')) break;
    const qIndex = current.indexOf('?');
    if (qIndex === -1) break;
    const qs = current.slice(qIndex + 1);
    const params = new URLSearchParams(qs);
    const nested = params.get('return');
    if (!nested) break;
    try {
      current = decodeURIComponent(nested);
    } catch {
      current = nested;
    }
  }
  return current;
}

export default function SubscribeWebReturnPage() {
  const [search, setSearch] = useState<string>('');
  const [didAutoTry, setDidAutoTry] = useState(false);

  useEffect(() => {
    try {
      setSearch(window.location.search || '');
    } catch {
      // ignore
    }
  }, []);

  const returnTo = useMemo(() => {
    const params = new URLSearchParams(search);
    const raw = sanitizeReturnTo(params.get('return'));
    return sanitizeReturnTo(unwrapReturnTo(raw));
  }, [search]);

  useEffect(() => {
    // Deep link back into the app. Android/iOS will open the app via the custom scheme.
    const deepLink = `com.flowbalance.app://sso-callback?subscribed=1&return=${encodeURIComponent(returnTo)}`;

    // Attempt to open the app immediately (may be blocked by some browsers).
    setDidAutoTry(true);
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
        <p className="text-gray-600">
          Returning you to the Flow app…
          {!didAutoTry ? null : ' If nothing happens, tap the button below.'}
        </p>
        <a
          href={`com.flowbalance.app://sso-callback?subscribed=1&return=${encodeURIComponent(returnTo)}`}
          className="inline-block mt-4 bg-purple-600 hover:bg-purple-700 text-white py-3 px-5 rounded-xl font-semibold"
        >
          Return to app
        </a>
        <p className="text-xs text-gray-400 break-words">
          Return path: {returnTo}
        </p>
      </div>
    </div>
  );
}

