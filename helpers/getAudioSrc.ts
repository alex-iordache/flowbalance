'use client';

import { getWebBaseUrl } from './webBaseUrl';
import { getInstallIdSync } from './installId';

/**
 * Build a same-origin (or web base) URL that streams audio via the app backend.
 * This lets us keep R2 private while still supporting <audio> range requests.
 */
export function getAudioSrc(params: {
  audioUrlOrPath: string;
  flowId?: string;
  practiceId?: string;
}): string {
  const { audioUrlOrPath, flowId, practiceId } = params;
  const base = getWebBaseUrl();
  const u = new URL('/api/audio', base);
  u.searchParams.set('path', audioUrlOrPath);
  if (flowId) u.searchParams.set('flowId', flowId);
  if (practiceId) u.searchParams.set('practiceId', practiceId);
  const installId = getInstallIdSync();
  if (installId) u.searchParams.set('installId', installId);
  return u.toString();
}


