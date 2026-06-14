'use client';

import { CapacitorCookies } from '@capacitor/core';

import { getWebBaseUrl } from './webBaseUrl';
import { practiceAudioDebug } from './practiceAudioDebug';

type ClerkWindow = {
  Clerk?: {
    session?: {
      getToken?: () => Promise<string | null>;
    };
  };
};

function summarizeHeaders(headers: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === 'authorization') {
      out[key] = value ? `Bearer [${value.length} chars]` : '(empty)';
    } else if (key.toLowerCase() === 'cookie') {
      out[key] = value ? `[${value.length} chars, ${value.split(';').length} cookies]` : '(empty)';
    } else {
      out[key] = value;
    }
  }
  return out;
}

/**
 * Native audio (Capgo) fetches /api/audio outside the WebView, so it does not
 * automatically include Clerk session cookies. Forward auth explicitly.
 */
export async function getNativeAudioRequestHeaders(): Promise<Record<string, string>> {
  const headers: Record<string, string> = {};

  if (typeof window !== 'undefined') {
    try {
      const clerk = (window as ClerkWindow).Clerk;
      const hasSession = !!clerk?.session;
      practiceAudioDebug('auth', 'Clerk session check', { hasSession });
      const token = await clerk?.session?.getToken?.();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
        practiceAudioDebug('auth', 'Using Clerk bearer token for native audio', summarizeHeaders(headers));
        return headers;
      }
      practiceAudioDebug('auth', 'No Clerk bearer token available', undefined, 'warn');
    } catch (err) {
      practiceAudioDebug('auth', 'Clerk getToken failed', err, 'error');
    }
  }

  try {
    const base = getWebBaseUrl();
    const cookies = await CapacitorCookies.getCookies({ url: base });
    const cookieHeader = Object.entries(cookies)
      .filter(([, value]) => typeof value === 'string' && value.length > 0)
      .map(([key, value]) => `${key}=${value}`)
      .join('; ');
    practiceAudioDebug('auth', 'CapacitorCookies result', {
      baseUrl: base,
      cookieKeys: Object.keys(cookies),
      cookieHeaderLength: cookieHeader.length,
    });
    if (cookieHeader) {
      headers.Cookie = cookieHeader;
      practiceAudioDebug('auth', 'Using forwarded cookies for native audio', summarizeHeaders(headers));
    } else {
      practiceAudioDebug('auth', 'No cookies available for native audio', undefined, 'warn');
    }
  } catch (err) {
    practiceAudioDebug('auth', 'CapacitorCookies.getCookies failed', err, 'error');
  }

  return headers;
}
