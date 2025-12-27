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
import { useRef } from 'react';

import Store from '../../store';
import * as actions from '../../store/actions';
import { settingsOutline } from 'ionicons/icons';

const Practice = () => {
  const { flowId, practiceId } = useParams<{ flowId: string; practiceId: string }>();
  const history = useHistory();
  const flows = Store.useState(s => s.flows);
  const flow = flows.find((f) => f.id === flowId);
  const practice = flow?.practices.find((p) => p.id === practiceId);
  const audioRef = useRef<HTMLAudioElement>(null);

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
          <IonTitle className="text-white">{getDisplayName()}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/settings')}>
              <IonIcon icon={settingsOutline} className="text-white text-2xl" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding flow-background">
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
      </IonContent>
    </IonPage>
  );
};

export default Practice;
