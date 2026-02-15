'use client';

import Store from '../store';
import Overlay from './ui/Overlay';
import OnboardingOverlay from './overlays/OnboardingOverlay';
import OfflineOverlay from './overlays/OfflineOverlay';
import ErrorBoundary from './ui/ErrorBoundary';

export default function OverlayManager() {
  const overlayType = Store.useState(s => s.overlayType);

  if (!overlayType) return null;

  return (
    <Overlay>
      <ErrorBoundary title="Overlay error">
        {overlayType === 'onboarding' ? <OnboardingOverlay /> : null}
        {overlayType === 'offline' ? <OfflineOverlay /> : null}
        {overlayType !== 'onboarding' && overlayType !== 'offline' ? (
          <div className="h-full w-full flex items-center justify-center px-6" style={{ color: 'var(--fb-chrome-fg)' }}>
            Unknown overlay: {String(overlayType)}
          </div>
        ) : null}
      </ErrorBoundary>
    </Overlay>
  );
}

