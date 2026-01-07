'use client';

import { Capacitor } from '@capacitor/core';

/**
 * Open a URL in the system browser on native devices, or a new tab on web.
 * Uses dynamic import to avoid Next.js build-time issues.
 */
export async function openExternalUrl(url: string) {
  if (Capacitor.isNativePlatform()) {
    // Prefer opening the real system browser (Safari/Chrome) for payments.
    // On some iOS builds, `AppLauncher.openUrl` can fail silently; fall back to `Browser.open`.
    try {
      const { AppLauncher } = await import('@capacitor/app-launcher');
      await AppLauncher.openUrl({ url });
      return;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('[openExternalUrl] AppLauncher.openUrl failed; falling back to Browser.open', e);
      try {
        const { Browser } = await import('@capacitor/browser');
        await Browser.open({ url });
        return;
      } catch (e2) {
        // eslint-disable-next-line no-console
        console.error('[openExternalUrl] Browser.open also failed', e2);
        // Last-resort fallback (may open inside the WebView; better than doing nothing).
        window.location.href = url;
      }
    }
  } else {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
