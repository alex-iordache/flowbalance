import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';

import Store from '../../store';
import * as actions from '../../store/actions';

const Practice = () => {
  const { flowId, practiceId } = useParams<{ flowId: string; practiceId: string }>();
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/flows/${flowId}`} />
          </IonButtons>
          <IonTitle>{practice?.name || 'Practice'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        {practice?.description && <p>{practice.description}</p>}
        {practice?.audioURL && (
          <audio
            ref={audioRef}
            controls
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
