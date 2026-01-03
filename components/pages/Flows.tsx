import { t, type Flow, type Language } from '../../data/flows';
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
import { Suspense, lazy } from 'react';
import { isDesktopWeb } from '../admin/adminEnv';

const FlowsAdmin = lazy(() => import('../admin/FlowsAdmin'));

const AllFlows = () => {
  const flows = Store.useState(s => s.flows);
  const lang = (Store.useState(s => (s.settings as any)?.language) ?? 'ro') as Language;
  return (
    <div className="flex flex-col gap-4 p-4 w-full max-w-2xl mx-auto">
      {flows.map((flow, i) => (
        <FlowRow flow={flow} key={i} lang={lang} />
      ))}
    </div>
  );
};

const FlowRow = ({ flow, lang }: { flow: Flow; lang: Language }) => {
  const history = useHistory();
  
  return (
    <div 
      onClick={() => history.push(`/flows/${flow.id}`)}
      className="flow-entry cursor-pointer flex flex-row items-start p-6 rounded-lg shadow-xl w-full gap-4"
    >

      <img
        className="object-contain w-24 h-24 rounded-base flex-shrink-0 md:w-48 md:h-48 self-start"
        src={t(flow.image, lang)}
        alt={t(flow.name, lang)}
      />
      <div className="flex flex-col justify-between flex-1 leading-normal min-w-0">
        <h5 className="mt-0 mb-2 text-xl md:text-2xl font-bold tracking-tight text-white leading-tight">{t(flow.name, lang)}</h5>
        <p className="mb-1 text-sm md:text-base text-white">{t(flow.intro, lang)}</p>
    </div>

    </div>
  );
};

const Flows = () => {
  const history = useHistory();
  const isSuperAdmin = Store.useState(s => s.isSuperAdmin);
  const lang = (Store.useState(s => (s.settings as any)?.language) ?? 'ro') as Language;
  const allowAdmin = isSuperAdmin && isDesktopWeb();
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
        {allowAdmin ? (
          <Suspense fallback={<AllFlows />}>
            <FlowsAdmin lang={lang} />
          </Suspense>
        ) : (
          <AllFlows />
        )}
        </IonContent>
    </IonPage>
  );
  }
  
  export default Flows;
