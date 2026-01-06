/**
 * Centralized theme tokens for the 6 Flow categories.
 *
 * Edit these values to tune the look quickly.
 * IMPORTANT: Categories reference themes by number (1..6).
 */

export type FlowThemeNumber = 1 | 2 | 3 | 4 | 5 | 6;

export type FlowTheme = {
  /** Flat background color used for header/content/footer (CSS var --fb-bg). */
  bg: string;
  /** Subtle overlay gradient used on cards (CSS var --fb-card-gradient). */
  cardGradient: string;
};

// Shared subtle “grey” overlay (kept per-theme so you can tweak individually if desired).
const CARD_OVERLAY = 'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.07) 55%, rgba(255,255,255,0.06) 100%)';

/**
 * Themes 1..6
 * Darkened compared to the original category gradients to reduce eye strain on flat backgrounds.
 */
export const FLOW_THEMES: Record<FlowThemeNumber, FlowTheme> = {
  // 1: Emotional regulation (blue)
  1: { bg: '#0a7ab7', cardGradient: CARD_OVERLAY },
  // 2: Performance boost (green/teal)
  2: { bg: '#0a7f60', cardGradient: CARD_OVERLAY },
  // 3: Mindset (violet)
  3: { bg: '#8f33b0', cardGradient: CARD_OVERLAY },
  // 4: Stories (orange)
  4: { bg: '#b45309', cardGradient: CARD_OVERLAY },
  // 5: Heart balance (rose)
  5: { bg: '#be123c', cardGradient: CARD_OVERLAY },
  // 6: Somatic release (cyan/blue)
  6: { bg: '#0a7ea5', cardGradient: CARD_OVERLAY },
};

export const DEFAULT_APP_BG = '#7d63ff';
export const DEFAULT_CARD_GRADIENT = CARD_OVERLAY;
