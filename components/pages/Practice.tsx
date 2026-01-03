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
import { useRef, useState, useEffect } from 'react';

import Store from '../../store';
import * as actions from '../../store/actions';
import { settingsOutline, lockClosedOutline } from 'ionicons/icons';
import { usePracticeAccess } from '../../hooks/useAccessControl';

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
  const flow = flows.find((f) => f.id === flowId);
  const practice = flow?.practices.find((p) => p.id === practiceId);
  const audioRef = useRef<HTMLAudioElement>(null);
  
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
    if (!practice?.name) return '';
    if (practice.name.length <= 20) return practice.name;
    // Extract just the day part (e.g., "Day 1", "Day 2")
    const dayMatch = practice.name.match(/- (Day \d+)$/);
    return dayMatch ? dayMatch[1] : practice.name;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
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
      <IonContent class="ion-padding flow-background">
        {isActivating && !hasAccess ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <p className="text-white text-lg font-semibold mb-2">Activating your subscription…</p>
            <p className="text-white/80 text-sm">This usually takes a few seconds.</p>
          </div>
        ) : null}
        {/* Show content only if user has access */}
        {hasAccess ? (
          <>
            {practice?.description && <p>{practice.description}</p>}
            {practice?.audioURL && (
              <audio
                ref={audioRef}
                controls
                controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
                style={{ width: '100%', marginTop: '1rem' }}
                onPlay={handleAudioPlay}
                onEnded={handleAudioEnded}
              >
                <source src={practice.audioURL} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </>
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default Practice;
