'use client';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getCategoryById, getCategoryForFlowId } from './pages/flowsCatalog';

const DEFAULT_BG = '#7d63ff';

function extractFirstHexColor(cssGradient: string | undefined | null): string | null {
  if (!cssGradient) return null;
  const m = cssGradient.match(/#([0-9a-fA-F]{6})/);
  return m ? `#${m[1]}` : null;
}

function resolveCategoryBgFromPath(pathname: string): string {
  // /flows/category/:categoryId
  const catMatch = pathname.match(/^\/flows\/category\/([^/]+)\/?$/);
  if (catMatch) {
    const cat = getCategoryById(catMatch[1]);
    return extractFirstHexColor(cat?.gradientCss) ?? DEFAULT_BG;
  }

  // /flows/:flowId or /flows/:flowId/:practiceId
  const flowMatch = pathname.match(/^\/flows\/([^/]+)(?:\/[^/]+)?\/?$/);
  if (flowMatch) {
    const cat = getCategoryForFlowId(flowMatch[1]);
    return extractFirstHexColor(cat?.gradientCss) ?? DEFAULT_BG;
  }

  return DEFAULT_BG;
}

/**
 * Keeps the app chrome (header/footer/background) themed by the current category.
 * We do this by updating the global CSS variable `--fb-bg`.
 */
export default function CategoryThemeSync() {
  const location = useLocation();

  useEffect(() => {
    const next = resolveCategoryBgFromPath(location.pathname);
    document.documentElement.style.setProperty('--fb-bg', next);
  }, [location.pathname]);

  return null;
}


