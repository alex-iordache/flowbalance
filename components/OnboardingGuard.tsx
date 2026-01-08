'use client';

import { useAuth } from '@clerk/nextjs';
import { useEffect, useRef } from 'react';

import Store from '../store';
import { hasCompletedOnboarding, loadOnboardingComplete } from '../store/persistence';
import { setOnboardingRecommendations, setOnboardingStart, showOverlay } from '../store/actions';

export default function OnboardingGuard() {
  const { isLoaded, userId, isSignedIn } = useAuth();
  const ranRef = useRef(false);
  const overlayType = Store.useState(s => s.overlayType);

  useEffect(() => {
    if (ranRef.current) return;
    if (!isLoaded) return;
    if (isSignedIn !== true) return;
    if (!userId) return;

    ranRef.current = true;

    (async () => {
      const completed = await hasCompletedOnboarding(userId);
      if (completed) {
        const rec = await loadOnboardingComplete(userId);
        if (rec) {
          setOnboardingRecommendations(rec.recommendedCategories ?? []);
          setOnboardingStart(
            rec.startFlowId
              ? { flowId: rec.startFlowId, practiceId: rec.startPracticeId ?? null }
              : null,
          );
        }
        return;
      }
      // If something else is already showing, don't stomp it.
      if (overlayType) return;
      showOverlay('onboarding');
    })();
  }, [isLoaded, isSignedIn, userId, overlayType]);

  return null;
}

