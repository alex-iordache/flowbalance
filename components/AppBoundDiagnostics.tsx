'use client';

import { useEffect, useRef } from 'react';

function isEnabled(): boolean {
  try {
    const sp = new URLSearchParams(window.location.search || '');
    if (sp.get('debugAppBound') === '1') return true;
    return localStorage.getItem('fb_debug_appbound') === '1';
  } catch {
    return false;
  }
}

function safeUrl(raw: string | null | undefined): URL | null {
  if (!raw) return null;
  try {
    return new URL(raw, window.location.href);
  } catch {
    return null;
  }
}

export default function AppBoundDiagnostics() {
  const seen = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!isEnabled()) return;

    const allowed = new Set([
      window.location.origin,
      'https://www.flowbalance.app',
      'https://flowbalance.app',
      'https://accounts.flowbalance.app',
      'https://clerk.flowbalance.app',
      // local dev / capacitor
      'capacitor://localhost',
      'ionic://localhost',
      'http://localhost',
      'https://localhost',
    ]);

    const logOnce = (kind: string, url: string, extra?: Record<string, unknown>) => {
      const key = `${kind}:${url}`;
      if (seen.current.has(key)) return;
      seen.current.add(key);
      // eslint-disable-next-line no-console
      console.log('[AppBoundDiagnostics]', {
        kind,
        url,
        page: window.location.href,
        ...extra,
      });
    };

    const scan = () => {
      try {
        // scripts
        for (const s of Array.from(document.scripts || [])) {
          const u = safeUrl((s as HTMLScriptElement).src);
          if (!u) continue;
          if (!allowed.has(u.origin)) logOnce('script', u.toString());
        }
        // iframes
        for (const f of Array.from(document.querySelectorAll('iframe'))) {
          const u = safeUrl((f as HTMLIFrameElement).src);
          if (!u) continue;
          if (!allowed.has(u.origin)) logOnce('iframe', u.toString());
        }
        // stylesheet links
        for (const l of Array.from(document.querySelectorAll('link[rel="stylesheet"]'))) {
          const u = safeUrl((l as HTMLLinkElement).href);
          if (!u) continue;
          if (!allowed.has(u.origin)) logOnce('stylesheet', u.toString());
        }
      } catch {
        // ignore
      }
    };

    // Run immediately and then on DOM mutations (resources added by frameworks).
    scan();
    const mo = new MutationObserver(() => scan());
    try {
      mo.observe(document.documentElement, { childList: true, subtree: true });
    } catch {
      // ignore
    }

    // Also log when the browser reports blocked security policy (often correlates with subframes).
    const onSecurityPolicyViolation = (e: Event) => {
      const sev = e as any;
      const blocked = String(sev?.blockedURI ?? '');
      if (blocked) logOnce('csp', blocked, { violatedDirective: sev?.violatedDirective });
    };
    document.addEventListener('securitypolicyviolation', onSecurityPolicyViolation as any);

    return () => {
      mo.disconnect();
      document.removeEventListener('securitypolicyviolation', onSecurityPolicyViolation as any);
    };
  }, []);

  return null;
}


