'use client';

import { useEffect, useState } from 'react';
import Store from '../../store';
import { hideOverlay } from '../../store/actions';

export default function OfflineOverlay() {
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  // Keep in sync with `public/offline.html`
  const REMOTE_URL = 'https://www.flowbalance.app';

  async function headPing(url: string, timeoutMs: number): Promise<boolean> {
    try {
      const controller = new AbortController();
      const t = window.setTimeout(() => controller.abort(), timeoutMs);
      const res = await fetch(url, { method: 'HEAD', cache: 'no-store', signal: controller.signal });
      window.clearTimeout(t);
      return res.ok || (res.status >= 200 && res.status < 500);
    } catch {
      return false;
    }
  }

  async function tryGoOnline() {
    if (busy) return;
    setBusy(true);
    setStatus('Checking connection…');

    const ok = await headPing(`${REMOTE_URL}/favicon.ico?ping=${Date.now()}`, 1500);
    if (ok) {
      setStatus('Back online. Opening Flow…');
      hideOverlay();
      const path = window.location.pathname + window.location.search + window.location.hash;
      window.location.replace(`${REMOTE_URL}${path && path !== '/' ? path : ''}`);
      return;
    }

    setBusy(false);
    setStatus('Still offline. Please try again.');
  }

  useEffect(() => {
    const onOnline = () => {
      void tryGoOnline();
    };
    const onVisible = () => {
      if (document.visibilityState === 'visible') void tryGoOnline();
    };
    window.addEventListener('online', onOnline);
    document.addEventListener('visibilitychange', onVisible);
    setStatus(navigator.onLine === false ? 'No connection detected.' : '');
    return () => {
      window.removeEventListener('online', onOnline);
      document.removeEventListener('visibilitychange', onVisible);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center px-6">
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl text-center">
        <div className="text-[26px] md:text-[34px] font-semibold" style={{ color: 'var(--fb-chrome-fg)' }}>
          You’re offline
        </div>
        <div className="mt-3 text-[14px] md:text-[17px] leading-snug" style={{ color: 'var(--fb-chrome-fg-muted)' }}>
          Flow needs an internet connection to load the latest content. Check your connection, then tap Retry.
        </div>
        <div className="mt-2 text-[12px] md:text-[14px] leading-snug" style={{ color: 'var(--fb-chrome-fg-muted)' }}>
          If you’re on Wi‑Fi, it may be connected without internet. Try mobile data or another network.
        </div>

        <div className="mt-5 flex justify-center">
          <button
            type="button"
            disabled={busy}
            onClick={() => void tryGoOnline()}
            className={[
              'min-w-[140px] rounded-2xl px-5 py-3 font-semibold text-[14px] md:text-[16px]',
              'border',
              busy ? 'bg-white/60' : 'bg-white active:opacity-90',
            ].join(' ')}
            style={{
              borderColor: 'rgba(232, 222, 211, 0.95)',
              color: '#3b1b6a',
            }}
          >
            Retry
          </button>
        </div>

        <div className="mt-3 text-[12px] md:text-[14px] min-h-[16px]" style={{ color: 'var(--fb-chrome-fg-muted)' }}>
          {status}
        </div>
      </div>
    </div>
  );
}

