import { type Flow } from '../../data';
import { TodoListItem } from '../../mock';
import Store from '../../store';
import * as selectors from '../../store/selectors';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonButton,
  IonButtons,
  IonIcon,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { settingsOutline } from 'ionicons/icons';
import Logo from '../ui/Logo';

const AllFlows = () => {
  const flows = Store.useState(s => s.flows);
  return (
    <div className="flex flex-col gap-4 p-4">
      {flows.map((flow, i) => (
        <Flow flow={flow} key={i} />
      ))}
    </div>
  );
};

const Flow = ({ flow }: { flow: Flow }) => {
  const history = useHistory();
  
  return (
    <div 
      onClick={() => history.push(`/flows/${flow.id}`)}
      className="flow-entry cursor-pointer flex flex-row items-start p-6 rounded-lg shadow-xl max-w-xl gap-4"
    >

      <img className="object-contain w-24 h-24 rounded-base flex-shrink-0 md:w-48 md:h-48 self-start" src={flow.image} alt={flow.name} />
      <div className="flex flex-col justify-between flex-1 leading-normal min-w-0">
        <h5 className="mt-0 mb-2 text-xl md:text-2xl font-bold tracking-tight text-white leading-tight">{flow.name}</h5>
        <p className="mb-1 text-sm md:text-base text-white">{flow.intro}</p>
    </div>

    </div>
  );
};

const Flows = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <Logo />
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/settings')}>
              <IonIcon icon={settingsOutline} className="text-white text-2xl" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Flows</IonTitle>
          </IonToolbar>
        </IonHeader>
        <AllFlows />
        </IonContent>
    </IonPage>
  );
  }
  
  export default Flows;
