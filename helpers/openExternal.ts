'use client';

import { Capacitor } from '@capacitor/core';

/**
 * Open a URL in the system browser on native devices, or a new tab on web.
 * Uses dynamic import to avoid Next.js build-time issues.
 */
export async function openExternalUrl(url: string) {
  if (Capacitor.isNativePlatform()) {
    const { AppLauncher } = await import('@capacitor/app-launcher');
    await AppLauncher.openUrl({ url });
  } else {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
