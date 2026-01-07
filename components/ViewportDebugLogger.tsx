'use client';

import { Capacitor } from '@capacitor/core';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function isLikelyIOS(): boolean {
  try {
    const ua = navigator.userAgent || '';
    return /iPad|iPhone|iPod/i.test(ua);
  } catch {
    return false;
  }
}

type Reason =
  | 'mount'
  | 'route'
  | 'auth'
  | 'resize'
  | 'orientationchange'
  | 'visualViewport.resize'
  | 'visualViewport.scroll'
  | 'focus'
  | 'blur'
  | 'interval';

async function getIonContentMetrics() {
  try {
    // Best-effort: grab the first ion-content in the DOM (current page).
    const ionContent = document.querySelector('ion-content') as any;
    if (!ionContent) return { found: false as const };

    let scrollEl: HTMLElement | null = null;
    try {
      if (typeof ionContent.getScrollElement === 'function') {
        scrollEl = (await ionContent.getScrollElement()) as HTMLElement;
      }
    } catch {
      // ignore
    }

    const contentRect = (ionContent as HTMLElement).getBoundingClientRect();
    const scrollRect = scrollEl?.getBoundingClientRect();

    const scrollStyle = scrollEl ? getComputedStyle(scrollEl) : null;
    const contentStyle = getComputedStyle(ionContent as Element);

    return {
      found: true as const,
      content: {
        tag: ionContent.tagName,
        rect: {
          top: contentRect.top,
          left: contentRect.left,
          width: contentRect.width,
          height: contentRect.height,
        },
        css: {
          display: contentStyle.display,
          position: contentStyle.position,
          height: contentStyle.height,
          overflow: contentStyle.overflow,
        },
      },
      scroll: scrollEl
        ? {
            rect: scrollRect
              ? {
                  top: scrollRect.top,
                  left: scrollRect.left,
                  width: scrollRect.width,
                  height: scrollRect.height,
                }
              : null,
            metrics: {
              scrollTop: scrollEl.scrollTop,
              scrollHeight: scrollEl.scrollHeight,
              clientHeight: scrollEl.clientHeight,
              clientWidth: scrollEl.clientWidth,
            },
            css: {
              overflowY: scrollStyle?.overflowY ?? null,
              WebkitOverflowScrolling: (scrollStyle as any)?.WebkitOverflowScrolling ?? null,
              position: scrollStyle?.position ?? null,
              height: scrollStyle?.height ?? null,
            },
          }
        : { missing: true as const },
    };
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
  }
}

function snapshotViewport() {
  const vv = (window as any).visualViewport as VisualViewport | undefined;
  const docEl = document.documentElement;
  const body = document.body;

  const ionApp = document.querySelector('ion-app') as HTMLElement | null;
  const ionAppRect = ionApp?.getBoundingClientRect();
  const ionAppStyle = ionApp ? getComputedStyle(ionApp) : null;

  const docStyle = getComputedStyle(docEl);
  const bodyStyle = getComputedStyle(body);

  return {
    href: (() => {
      try {
        return window.location.href;
      } catch {
        return '';
      }
    })(),
    devicePixelRatio: window.devicePixelRatio,
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight,
    },
    window: {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    },
    visualViewport: vv
      ? {
          width: vv.width,
          height: vv.height,
          scale: vv.scale,
          offsetTop: vv.offsetTop,
          offsetLeft: vv.offsetLeft,
          pageTop: vv.pageTop,
          pageLeft: vv.pageLeft,
        }
      : null,
    document: {
      clientWidth: docEl.clientWidth,
      clientHeight: docEl.clientHeight,
      scrollWidth: docEl.scrollWidth,
      scrollHeight: docEl.scrollHeight,
      bodyScrollHeight: body.scrollHeight,
      bodyClientHeight: body.clientHeight,
      css: {
        htmlHeight: docStyle.height,
        htmlOverflow: docStyle.overflow,
        bodyHeight: bodyStyle.height,
        bodyOverflow: bodyStyle.overflow,
        bodyPosition: bodyStyle.position,
      },
    },
    ionApp: ionAppRect
      ? {
          rect: {
            top: ionAppRect.top,
            left: ionAppRect.left,
            width: ionAppRect.width,
            height: ionAppRect.height,
          },
          css: {
            height: ionAppStyle?.height ?? null,
            width: ionAppStyle?.width ?? null,
            overflow: ionAppStyle?.overflow ?? null,
          },
        }
      : null,
  };
}

/**
 * ViewportDebugLogger
 *
 * Purpose: diagnose the iOS-only "first sign-in => wrong scale/no-scroll until relaunch" bug.
 * It logs viewport + Ionic scroll host metrics at critical moments.
 *
 * Safety:
 * - iOS native only (no web spam)
 * - logs metrics only (no PII, no tokens)
 */
export default function ViewportDebugLogger() {
  const { isLoaded, userId } = useAuth();
  const location = useLocation();

  const enabled = useMemo(() => {
    if (!Capacitor.isNativePlatform()) return false;
    if (!isLikelyIOS()) return false;
    return true;
  }, []);

  const burstTimerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const log = async (reason: Reason) => {
    try {
      const snap = snapshotViewport();
      const ion = await getIonContentMetrics();
      console.log('[ViewportDebug]', {
        ts: new Date().toISOString(),
        reason,
        route: { pathname: location.pathname, search: location.search },
        auth: { isLoaded, userId: userId ?? null },
        viewport: snap,
        ion,
      });
    } catch (e) {
      console.log('[ViewportDebug] log failed', e);
    }
  };

  const burst = (reason: Reason) => {
    if (!enabled) return;
    if (burstTimerRef.current) window.clearTimeout(burstTimerRef.current);
    void log(reason);
    // After auth/route transitions, capture a few follow-ups (layout settles over frames/time).
    window.requestAnimationFrame(() => void log(reason));
    burstTimerRef.current = window.setTimeout(() => void log(reason), 250);
    burstTimerRef.current = window.setTimeout(() => void log(reason), 800);
    burstTimerRef.current = window.setTimeout(() => void log(reason), 1500);
  };

  useEffect(() => {
    if (!enabled) return;

    burst('mount');

    const onResize = () => burst('resize');
    const onOrient = () => burst('orientationchange');
    const onFocus = () => burst('focus');
    const onBlur = () => burst('blur');

    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onOrient);
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);

    const vv = (window as any).visualViewport as VisualViewport | undefined;
    const onVvResize = () => burst('visualViewport.resize');
    const onVvScroll = () => burst('visualViewport.scroll');
    vv?.addEventListener('resize', onVvResize);
    vv?.addEventListener('scroll', onVvScroll);

    // Short interval sampling (first 20s) to catch transient bad states.
    let ticks = 0;
    intervalRef.current = window.setInterval(() => {
      ticks += 1;
      void log('interval');
      if (ticks >= 10 && intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 2000);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onOrient);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
      vv?.removeEventListener('resize', onVvResize);
      vv?.removeEventListener('scroll', onVvScroll);
      if (burstTimerRef.current) window.clearTimeout(burstTimerRef.current);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    burst('route');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, location.pathname, location.search]);

  useEffect(() => {
    if (!enabled) return;
    burst('auth');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, isLoaded, userId]);

  return null;
}


