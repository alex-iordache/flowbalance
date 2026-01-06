import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Store from '../../store';
import * as actions from '../../store/actions';
import { settingsOutline, lockClosedOutline } from 'ionicons/icons';
import { usePracticeAccess } from '../../hooks/useAccessControl';
import { t, type Language } from '../../data/flows';
import { getCategoryForFlowId } from './flowsCatalog';
import AudioPlayer from '../ui/AudioPlayer';
import { getAudioSrc } from '../../helpers/getAudioSrc';

function getSubscribePending(): boolean {
  try {
    return sessionStorage.getItem('flow_subscribe_pending') === '1';
  } catch {
    return false;
  }
}

const Practice = () => {
  const { flowId, practiceId } = useParams<{ flowId: string; practiceId: string }>();
  const history = useHistory();
  const flows = Store.useState(s => s.flows);
  // Until we ship an in-app language switch, keep English on display.
  const lang: Language = 'en';
  const flow = flows.find((f) => f.id === flowId);
  const practice = flow?.practices.find((p) => p.id === practiceId);
  const category = flowId ? getCategoryForFlowId(flowId) : null;
  const themedStyle = category ? ({ '--background': category.gradientCss } as any) : undefined;
  
  // Get flow and practice indices for access check
  const flowIndex = flows.findIndex((f) => f.id === flowId);
  const practiceIndex = flow?.practices.findIndex((p) => p.id === practiceId) ?? -1;
  
  // Check if user has access to this practice
  const hasAccess = usePracticeAccess(flowId, practiceId, flowIndex, practiceIndex);
  const [isActivating, setIsActivating] = useState(false);

  // If the user doesn't have access, route them to the in-app subscribe screen.
  useEffect(() => {
    if (hasAccess) {
      setIsActivating(false);
      return;
    }

    const returnTo = `${window.location.pathname}${window.location.search}`;

    // If we just returned from checkout, hold on this screen briefly and try to refresh Clerk session
    // instead of immediately bouncing back to /subscribe (which creates a "subscribe trap").
    if (getSubscribePending()) {
      setIsActivating(true);

      // Try a couple quick Clerk session reloads to pick up the new plan.
      let attempts = 0;
      const interval = window.setInterval(() => {
        attempts += 1;
        try {
          const w = window as unknown as { Clerk?: { session?: { reload?: () => Promise<unknown> } } };
          void w.Clerk?.session?.reload?.();
        } catch {
          // ignore
        }
        if (attempts >= 3) window.clearInterval(interval);
      }, 800);

      const timeout = window.setTimeout(() => {
        // If still no access after a short grace period, take them back to subscribe.
        if (!hasAccess) {
          history.replace(`/subscribe?return=${encodeURIComponent(returnTo)}`);
        }
      }, 5000);

      return () => {
        window.clearInterval(interval);
        window.clearTimeout(timeout);
      };
    }

    // Use replace so the Subscribe screen doesn't remain in back stack after returning.
    history.replace(`/subscribe?return=${encodeURIComponent(returnTo)}`);
  }, [hasAccess, history, flowId, practiceId]);

  const handleAudioPlay = () => {
    if (flowId) {
      actions.setFlowStarted(flowId, true);
    }
  };

  const handleAudioEnded = () => {
    if (flowId && practiceId) {
      actions.setPracticeFinished(flowId, practiceId, true);
    }
  };

  const getDisplayName = () => {
    if (!practice) return '';
    const name = t(practice.name, lang);
    if (!name) return '';
    if (name.length <= 20) return name;
    // Extract just the day part (e.g., "Day 1", "Day 2")
    const dayMatch = name.match(/- (Day \d+)$/);
    return dayMatch ? dayMatch[1] : name;
  };

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar style={themedStyle}>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/flows/${flowId}`} className="text-white" />
          </IonButtons>
          <IonTitle className="text-white">
            {getDisplayName()}
            {!hasAccess && <IonIcon icon={lockClosedOutline} className="ml-2" />}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/settings')}>
              <IonIcon icon={settingsOutline} className="text-white text-2xl" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent 
        className="ion-padding text-white" 
        style={{
          ...themedStyle,
          // Add bottom padding to account for fixed floatingCircle audio player
          // Player height: ~70vw (max 420px) + bottom offset (74px + safe area)
          // Add extra margin for spacing between text and player
          paddingBottom: practice && t(practice.audioUrl, lang) 
            ? 'calc(70vw + 120px + env(safe-area-inset-bottom))' 
            : undefined,
        }}
      >
        {isActivating && !hasAccess ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <p className="text-white text-lg font-semibold mb-2">Activating your subscription…</p>
            <p className="text-white/80 text-sm">This usually takes a few seconds.</p>
          </div>
        ) : null}
        {/* Show content only if user has access */}
        {hasAccess ? (
          <>
            {practice && t(practice.description, lang) ? (
              <p className="text-white mb-6">{t(practice.description, lang)}</p>
            ) : null}
            {practice && t(practice.audioUrl, lang) ? (
              <AudioPlayer
                src={getAudioSrc({
                  audioUrlOrPath: t(practice.audioUrl, lang),
                  flowId,
                  practiceId,
                })}
                title={t(practice.name, lang)}
                subtitle={flow ? t(flow.name, lang) : undefined}
                variant="floatingCircle"
                onPlay={handleAudioPlay}
                onEnded={handleAudioEnded}
              />
            ) : null}
          </>
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default Practice;
