'use client';

import Store from '../store';
import Overlay from './ui/Overlay';
import OnboardingOverlay from './overlays/OnboardingOverlay';
import OfflineOverlay from './overlays/OfflineOverlay';

export default function OverlayManager() {
  const overlayType = Store.useState(s => s.overlayType);

  if (!overlayType) return null;

  return (
    <Overlay>
      {overlayType === 'onboarding' ? <OnboardingOverlay /> : null}
      {overlayType === 'offline' ? <OfflineOverlay /> : null}
    </Overlay>
  );
}

