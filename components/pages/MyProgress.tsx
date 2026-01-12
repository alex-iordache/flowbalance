import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonBadge,
  IonIcon,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { settingsOutline } from 'ionicons/icons';
import { useState } from 'react';
import Store from '../../store';
import { t, type Language } from '../../data/flows';

const MyProgress = () => {
  const history = useHistory();
  const flows = Store.useState(s => s.flows);
  const lang = Store.useState(s => s.settings.language) as Language;
  const isRo = lang === 'ro';
  const isSuperAdmin = Store.useState(s => s.isSuperAdmin);
  const startedFlows = flows.filter(flow => flow.started);

  const calculateProgress = (flow: typeof flows[0]) => {
    const totalPractices = flow.practices.length;
    const completedPractices = flow.practices.filter(p => p.finished).length;
    const percentage = totalPractices > 0 ? Math.round((completedPractices / totalPractices) * 100) : 0;
    return { completedPractices, totalPractices, percentage };
  };

  const openFlow = (flowId: string, comingSoon?: boolean) => {
    if (comingSoon && !isSuperAdmin) {
      // Do nothing.
      return;
    }
    history.push(`/flows/${flowId}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="text-white">{isRo ? 'Progresul meu' : 'My Progress'}</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/settings" routerDirection="none">
              <IonIcon icon={settingsOutline} className="text-white text-2xl" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {startedFlows.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <p className="text-white text-lg mb-4">{isRo ? 'Nu ai început încă niciun flow' : 'No flows started yet'}</p>
            <p className="text-white/70 text-sm">{isRo ? 'Începe un flow ca să îți vezi progresul aici' : 'Start a flow to track your progress here'}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-4">
            {startedFlows.map((flow) => {
              const { completedPractices, totalPractices, percentage } = calculateProgress(flow);
              return (
                <div
                  key={flow.id}
                  onClick={() => openFlow(flow.id, (flow as any).comingSoon)}
                  className={`flex flex-row items-start p-6 rounded-lg shadow-xl max-w-xl gap-4 ${
                    (flow as any).comingSoon && !isSuperAdmin ? 'cursor-default opacity-90' : 'cursor-pointer'
                  }`}
                >
                  <img
                    className="object-contain w-24 h-24 rounded-2xl flex-shrink-0 md:w-48 md:h-48 self-start"
                    src={t(flow.image, lang)}
                    alt={t(flow.name, lang)}
                  />
                  <div className="flex flex-col justify-between flex-1 leading-normal min-w-0">
                    <h5 className="mt-0 mb-2 text-xl md:text-2xl font-bold tracking-tight text-white leading-tight">
                      {t(flow.name, lang)}
                      {(flow as any).comingSoon ? (
                        <IonBadge color="medium" className="ml-2 align-middle">
                          Coming Soon
                        </IonBadge>
                      ) : null}
                    </h5>
                    <div className="mb-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white text-sm font-medium">
                          {percentage}% {isRo ? 'Complet' : 'Complete'}
                        </span>
                        <span className="text-white/70 text-xs">
                          {completedPractices} / {totalPractices} {isRo ? 'practici' : 'practices'}
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
