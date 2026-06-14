'use client';

import { CapacitorCookies } from '@capacitor/core';

import { getWebBaseUrl } from './webBaseUrl';

type ClerkWindow = {
  Clerk?: {
    session?: {
      getToken?: () => Promise<string | null>;
    };
  };
};

/**
 * Native audio (Capgo) fetches /api/audio outside the WebView, so it does not
 * automatically include Clerk session cookies. Forward auth explicitly.
 */
export async function getNativeAudioRequestHeaders(): Promise<Record<string, string>> {
  const headers: Record<string, string> = {};

  if (typeof window !== 'undefined') {
    try {
      const clerk = (window as ClerkWindow).Clerk;
      const token = await clerk?.session?.getToken?.();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
        return headers;
      }
    } catch {
      // Fall through to cookie forwarding.
    }
  }

  try {
    const cookies = await CapacitorCookies.getCookies({ url: getWebBaseUrl() });
    const cookieHeader = Object.entries(cookies)
      .filter(([, value]) => typeof value === 'string' && value.length > 0)
      .map(([key, value]) => `${key}=${value}`)
      .join('; ');
    if (cookieHeader) {
      headers.Cookie = cookieHeader;
    }
  } catch {
    // No auth headers available.
  }

  return headers;
}
