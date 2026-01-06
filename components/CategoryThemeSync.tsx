'use client';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getCategoryById, getCategoryForFlowId } from './pages/flowsCatalog';

import { DEFAULT_APP_BG, DEFAULT_CARD_GRADIENT, FLOW_THEMES } from '../flowtheme';

function resolveCategoryBgFromPath(pathname: string): string {
  // /flows/category/:categoryId
  const catMatch = pathname.match(/^\/flows\/category\/([^/]+)\/?$/);
  if (catMatch) {
    const cat = getCategoryById(catMatch[1]);
    return (cat ? FLOW_THEMES[cat.theme].bg : DEFAULT_APP_BG) ?? DEFAULT_APP_BG;
  }

  // /flows/:flowId or /flows/:flowId/:practiceId
  const flowMatch = pathname.match(/^\/flows\/([^/]+)(?:\/[^/]+)?\/?$/);
  if (flowMatch) {
    const cat = getCategoryForFlowId(flowMatch[1]);
    return (cat ? FLOW_THEMES[cat.theme].bg : DEFAULT_APP_BG) ?? DEFAULT_APP_BG;
  }

  return DEFAULT_APP_BG;
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
    document.documentElement.style.setProperty('--fb-card-gradient', DEFAULT_CARD_GRADIENT);
  }, [location.pathname]);

  return null;
}


