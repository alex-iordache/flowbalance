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

    const isChunkLoadMessage = (args: unknown[]): boolean => {
      const text = args
        .map(a => {
          try {
            if (typeof a === 'string') return a;
            return JSON.stringify(a);
          } catch {
            return String(a);
          }
        })
        .join(' ');
      return (
        text.includes('ChunkLoadError') ||
        text.includes('Loading chunk') ||
        text.includes('Failed to fetch dynamically imported module') ||
        text.includes('Loading chunk') ||
        text.includes('clerk-js@') && text.includes('/dist/') && text.includes('.js')
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

    // Some libraries log ChunkLoadError instead of throwing it (common in WebViews).
    const originalConsoleError = console.error.bind(console);
    const originalConsoleWarn = console.warn.bind(console);
    console.error = (...args: any[]) => {
      try {
        if (isChunkLoadMessage(args) && shouldReloadOnce()) {
          window.location.reload();
        }
      } catch {
        // ignore
      }
      originalConsoleError(...args);
    };
    console.warn = (...args: any[]) => {
      try {
        if (isChunkLoadMessage(args) && shouldReloadOnce()) {
          window.location.reload();
        }
      } catch {
        // ignore
      }
      originalConsoleWarn(...args);
    };

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onUnhandledRejection);
    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onUnhandledRejection);
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;
    };
  }, []);

  return null;
}


