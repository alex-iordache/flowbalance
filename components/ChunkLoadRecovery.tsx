'use client';

import { useEffect } from 'react';

/**
 * Recover from transient/stale-cache ChunkLoadError issues (common after deploys),
 * especially in mobile WebViews.
 *
 * Reloads the page ONCE per session when we detect a chunk load failure.
 */
export default function ChunkLoadRecovery() {
  useEffect(() => {
    const KEY = 'flow_chunk_reload_once_v1';

    const shouldReloadOnce = () => {
      try {
        if (sessionStorage.getItem(KEY) === '1') return false;
        sessionStorage.setItem(KEY, '1');
        return true;
      } catch {
        return false;
      }
    };

    const isChunkLoadError = (err: unknown): boolean => {
      const anyErr = err as any;
      const msg = String(anyErr?.message ?? anyErr?.reason?.message ?? '');
      const name = String(anyErr?.name ?? anyErr?.reason?.name ?? '');
      return (
        name === 'ChunkLoadError' ||
        msg.includes('Loading chunk') ||
        msg.includes('ChunkLoadError') ||
        msg.includes('Failed to fetch dynamically imported module')
      );
    };

    const onError = (e: ErrorEvent) => {
      if (!isChunkLoadError(e.error)) return;
      if (!shouldReloadOnce()) return;
      window.location.reload();
    };

    const onUnhandledRejection = (e: PromiseRejectionEvent) => {
      if (!isChunkLoadError(e.reason)) return;
      if (!shouldReloadOnce()) return;
      window.location.reload();
    };

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onUnhandledRejection);
    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onUnhandledRejection);
    };
  }, []);

  return null;
}


