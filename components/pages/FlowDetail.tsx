import {
  IonBackButton,
  IonButton,
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
  IonBadge,
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';

import Store from '../../store';
import { type Practices } from '../../data';
import { usePracticeAccess } from '../../hooks/useAccessControl';

import { playCircleOutline, checkmarkDoneCircleOutline, ellipseOutline, settingsOutline, lockClosedOutline } from 'ionicons/icons';

function Practice ({practice, flowId, flowIndex, practiceIndex}: {practice: Practices; flowId: string; flowIndex: number; practiceIndex: number}) {
  const hasAccess = usePracticeAccess(flowId, practice.id, flowIndex, practiceIndex);
  
  return practice && (
        <IonItem className="no-bg-color py-4 text-white" routerLink={`/flows/${flowId}/${practice.id}`}>
          <IonIcon className="text-white text-3xl" icon={practice.finished ? checkmarkDoneCircleOutline : ellipseOutline} />
          <IonLabel className="pl-5 text-white text-lg">
            {practice.name}
            {!hasAccess && (
              <IonBadge color="warning" className="ml-2">Premium</IonBadge>
            )}
          </IonLabel>
          <IonIcon className="text-white text-3xl" icon={hasAccess ? playCircleOutline : lockClosedOutline} />          
        </IonItem>
  )
}

function Practices ({practices, flowId, flowIndex} : {practices: Practices[]; flowId: string; flowIndex: number}) {
  return practices && (<div className="no-bg-color">
    {practices.map((practice, index) => (
      <Practice 
        practice={practice} 
        flowId={flowId} 
        flowIndex={flowIndex}
        practiceIndex={index}
        key={practice.id}
      />
    ))}
  </div>)
}
const FlowDetail = () => {
  const { flowId } = useParams<{ flowId: string }>();
  const history = useHistory();
  const flows = Store.useState(s => s.flows);
  const flow = flows.find((flow) => flow.id === flowId);
  const flowIndex = flows.findIndex((flow) => flow.id === flowId);
  
  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/flows" className="text-white" />
          </IonButtons>
          <IonTitle className="text-white">{flow?.name || ''}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/settings')}>
              <IonIcon icon={settingsOutline} className="text-white text-2xl" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p className="text-white">{flow?.description}</p>
        {flowId && <Practices practices={flow?.practices ?? []} flowId={flowId} flowIndex={flowIndex} />}
      </IonContent>
    </IonPage>
  );
};

export default FlowDetail;
