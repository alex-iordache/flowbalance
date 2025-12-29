'use client';

import { useEffect } from 'react';

export default function CapacitorBrowserBlock() {
  useEffect(() => {
    // Only run on client side in Capacitor
    if (typeof window === 'undefined') return;

    console.log('[CapacitorBrowserBlock] Initializing browser blocking...');

    // Block window.open completely
    const originalOpen = window.open;
    window.open = function() {
      console.log('[BLOCKED] Prevented window.open call');
      return null;
    };

    // Intercept link clicks that might open browser
    const clickHandler = function(e: MouseEvent) {
      let target = e.target as HTMLElement | null;
      
      // Find parent anchor tag
      while (target && target.tagName !== 'A') {
        target = target.parentElement;
      }
      
      if (target && target.tagName === 'A') {
        const href = (target as HTMLAnchorElement).getAttribute('href');
        
        // Allow internal navigation
        if (href && (href.startsWith('/') || href.startsWith('#'))) {
          return;
        }
        
        // Block everything else
        e.preventDefault();
        e.stopPropagation();
        console.log('[BLOCKED] Prevented external link:', href);
      }
    };

    document.addEventListener('click', clickHandler, true);

    // Cleanup
    return () => {
      window.open = originalOpen;
      document.removeEventListener('click', clickHandler, true);
    };
  }, []);

  return null;
}
