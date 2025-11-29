import {
  IonBackButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router-dom';

import Store from '../../store';
import { type Practices } from '../../data';

import { playCircleOutline, checkmarkDoneCircleOutline, arrowRedoCircleOutline } from 'ionicons/icons';

function Practice ({practice, flowId}: {practice: Practices; flowId: string}) {
  return practice && (
        <IonItem routerLink={`/flows/${flowId}/${practice.id}`}>
          <IonIcon color={practice.finished ? 'success' : 'secondary'} icon={practice.finished ? checkmarkDoneCircleOutline : arrowRedoCircleOutline} />
          <IonLabel>{practice.name}</IonLabel>
          <IonIcon color="secondary" icon={playCircleOutline} />
        </IonItem>
  )
}

function Practices ({practices, flowId} : {practices: Practices[]; flowId: string}) {
  return practices && (<IonList>
    {practices.map(practice => <Practice practice={practice} flowId={flowId} key={practice.id}/>)}
  </IonList>)
}
const FlowDetail = () => {
  const { flowId } = useParams<{ flowId: string }>();
  const flows = Store.useState(s => s.flows);
  const flow = flows.find((flow) => flow.id === flowId);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/flows" />
          </IonButtons>
          <IonTitle>{flow?.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">{flow?.description}
        {flowId && <Practices practices={flow?.practices ?? []} flowId={flowId} />}
      </IonContent>
    </IonPage>
  );
};

export default FlowDetail;
