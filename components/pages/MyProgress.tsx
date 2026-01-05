import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { settingsOutline } from 'ionicons/icons';
import Store from '../../store';
import Logo from '../ui/Logo';
import { t, type Language } from '../../data/flows';

const MyProgress = () => {
  const history = useHistory();
  const flows = Store.useState(s => s.flows);
  // Until we ship an in-app language switch, keep English on display.
  const lang: Language = 'en';
  const startedFlows = flows.filter(flow => flow.started);

  const calculateProgress = (flow: typeof flows[0]) => {
    const totalPractices = flow.practices.length;
    const completedPractices = flow.practices.filter(p => p.finished).length;
    const percentage = totalPractices > 0 ? Math.round((completedPractices / totalPractices) * 100) : 0;
    return { completedPractices, totalPractices, percentage };
  };

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
      <IonContent className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" className="text-white">My Progress</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        {startedFlows.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <p className="text-white text-lg mb-4">No flows started yet</p>
            <p className="text-white/70 text-sm">Start a flow to track your progress here</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-4">
            {startedFlows.map((flow) => {
              const { completedPractices, totalPractices, percentage } = calculateProgress(flow);
              return (
                <div
                  key={flow.id}
                  onClick={() => history.push(`/flows/${flow.id}`)}
                  className="cursor-pointer flex flex-row items-start p-6 rounded-lg shadow-xl max-w-xl gap-4"
                >
                  <img
                    className="object-contain w-24 h-24 rounded-base flex-shrink-0 md:w-48 md:h-48 self-start"
                    src={t(flow.image, lang)}
                    alt={t(flow.name, lang)}
                  />
                  <div className="flex flex-col justify-between flex-1 leading-normal min-w-0">
                    <h5 className="mt-0 mb-2 text-xl md:text-2xl font-bold tracking-tight text-white leading-tight">
                      {t(flow.name, lang)}
                    </h5>
                    <div className="mb-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white text-sm font-medium">{percentage}% Complete</span>
                        <span className="text-white/70 text-xs">
                          {completedPractices} / {totalPractices} practices
                        </span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div
                          className="bg-blue-400 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default MyProgress;
