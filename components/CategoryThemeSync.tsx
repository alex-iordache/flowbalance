'use client';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// Category definitions are still used in content lists/cards,
// but the redesign keeps a consistent app chrome background.

function resolveCategoryBgFromPath(pathname: string): string {
  // Warm redesign background across the app chrome.
  // (We still keep category definitions for content/cards, but the app background stays consistent.)
  void pathname;
  return '#F4EFE8';
}

/**
 * Keeps the app chrome (header/footer/background) themed by the current category.
 * We do this by updating the global CSS variable `--fb-bg`.
 */
export default function CategoryThemeSync() {
  const location = useLocation();

  useEffect(() => {
    const bg = resolveCategoryBgFromPath(location.pathname);
    document.documentElement.style.setProperty('--fb-bg', bg);

    // Warm redesign chrome colors everywhere.
    document.documentElement.style.setProperty('--fb-chrome-fg', '#4E5B4F');
    document.documentElement.style.setProperty('--fb-chrome-fg-muted', '#7A746C');
    document.documentElement.style.setProperty('--fb-chrome-selected', '#C57A4A');
    document.documentElement.style.setProperty('--logo-filter', 'none');
    document.documentElement.style.setProperty('--fb-card-gradient', 'none');
  }, [location.pathname]);

  return null;
}


