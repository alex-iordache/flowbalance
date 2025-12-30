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
import PaywallModal from '../PaywallModal';

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
  
  // Paywall modal state
  const [showPaywall, setShowPaywall] = useState(false);
  
  // Show paywall if user doesn't have access
  useEffect(() => {
    if (!hasAccess) {
      setShowPaywall(true);
    }
  }, [hasAccess]);

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
        ) : (
          <div className="flex flex-col items-center justify-center min-h-full text-center">
            <IonIcon 
              icon={lockClosedOutline} 
              style={{ fontSize: '64px' }} 
              className="mb-4 opacity-50"
            />
            <h2 className="text-xl font-bold mb-2">This Practice is Locked</h2>
            <p className="mb-4 opacity-70">
              Upgrade to access all practices and flows
            </p>
          </div>
        )}

        {/* Paywall Modal */}
        <PaywallModal 
          isOpen={showPaywall}
          onClose={() => setShowPaywall(false)}
          practiceName={practice?.name}
        />
      </IonContent>
    </IonPage>
  );
};

export default Practice;
