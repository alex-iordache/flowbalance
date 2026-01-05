'use client';

/**
 * Returns the web base URL to use for:
 * - external browser pages like /subscribe-web
 * - hitting server-side endpoints when running inside Capacitor
 *
 * In remote-webview mode, `window.location.origin` is already the correct
 * Vercel domain (prod or staging). In bundled mode, origin can be
 * `capacitor://localhost`, so we fall back to an env var.
 */
export function getWebBaseUrl(): string {
  if (typeof window !== 'undefined') {
    const origin = window.location.origin || '';
    if (origin.startsWith('http://') || origin.startsWith('https://')) {
      return origin;
    }
  }

  const env = (process.env.NEXT_PUBLIC_WEB_BASE_URL || '').trim();
  if (env) return env.replace(/\/+$/, '');

  // Safe default (prod)
  return 'https://www.flowbalance.app';
}

