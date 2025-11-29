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
} from '@ionic/react';

const ListEntry = ({ list }: { list: TodoListItem }) => {
  return (
    <IonItem routerLink={`/lists/${list.id}`} className="list-entry">
      <IonLabel>{list.name}</IonLabel>
    </IonItem>
  );
};

const AllLists = () => {
  const lists = Store.useState(selectors.selectLists);

  return (
    <>
      {lists.map((list, i) => (
        <ListEntry list={list} key={i} />
      ))}
    </>
  );
};

const AllFlows = () => {
  const flows = Store.useState(s => s.flows);
  return (
    <IonList>
      {flows.map((flow, i) => (
        <Flow flow={flow} key={i} />
      ))}
    </IonList>
  );
};

const Flow = ({ flow }: { flow: Flow }) => {
  return (
    <IonItem routerLink={`/flows/${flow.id}`} className="flow-entry">
      <IonLabel>{flow.name}</IonLabel>
    </IonItem>
  );
};

const Flows = () => {
  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Flows</IonTitle>
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
