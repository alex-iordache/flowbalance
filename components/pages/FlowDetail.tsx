import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBadge,
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Store from '../../store';
import { t, type Practice, type Language } from '../../data/flows';
import { usePracticeAccess } from '../../hooks/useAccessControl';
import { isDesktopWeb } from '../admin/adminEnv';

import { playCircleOutline, checkmarkDoneCircleOutline, ellipseOutline, settingsOutline, lockClosedOutline } from 'ionicons/icons';

const FlowDetailAdmin = lazy(() => import('../admin/FlowDetailAdmin'));

function PracticeRow({
  practice,
  flowId,
  flowIndex,
  practiceIndex,
  lang,
}: {
  practice: Practice;
  flowId: string;
  flowIndex: number;
  practiceIndex: number;
  lang: Language;
}) {
  const history = useHistory();
  const hasAccess = usePracticeAccess(flowId, practice.id, flowIndex, practiceIndex);
  
  if (!practice) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => history.push(`/flows/${flowId}/${practice.id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') history.push(`/flows/${flowId}/${practice.id}`);
      }}
      className="w-full rounded-[20px] p-4 flex items-center gap-3 cursor-pointer"
      style={{
        backgroundColor: 'var(--fb-bg)',
        backgroundImage:
          'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.05) 55%, rgba(255,255,255,0.05) 100%)',
      }}
    >
      <IonIcon
        className="text-white text-2xl shrink-0"
        icon={practice.finished ? checkmarkDoneCircleOutline : ellipseOutline}
      />

      <div className="min-w-0 flex-1">
        <div className="text-white text-[15px] font-semibold truncate">
          {t(practice.name, lang)}
          {!hasAccess ? (
            <IonBadge color="warning" className="ml-2 align-middle">Premium</IonBadge>
          ) : null}
        </div>
      </div>

      <IonIcon className="text-white text-xl shrink-0" icon={hasAccess ? playCircleOutline : lockClosedOutline} />
    </div>
  );
}

function PracticesList({
  practices,
  flowId,
  flowIndex,
  lang,
}: {
  practices: Practice[];
  flowId: string;
  flowIndex: number;
  lang: Language;
}) {
  return practices && (<div className="flex flex-col gap-3 mt-4">
    {practices.map((practice, index) => (
      <PracticeRow
        practice={practice} 
        flowId={flowId} 
        flowIndex={flowIndex}
        practiceIndex={index}
        key={practice.id}
        lang={lang}
      />
    ))}
  </div>)
}
const FlowDetail = () => {
  const { flowId } = useParams<{ flowId: string }>();
  const history = useHistory();
  const flows = Store.useState(s => s.flows);
  const lang = Store.useState(s => s.settings.language) as Language;
  const isSuperAdmin = Store.useState(s => s.isSuperAdmin);
  const allowAdmin = isSuperAdmin && isDesktopWeb();
  const flow = flows.find((flow) => flow.id === flowId);
  const flowIndex = flows.findIndex((flow) => flow.id === flowId);
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="text-white">{flow ? t(flow.title, lang) : ''}</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/settings" routerDirection="none">
              <IonIcon icon={settingsOutline} className="text-white text-2xl" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p className="text-white">{flow ? t(flow.description, lang) : ''}</p>
        {flowId ? (
          allowAdmin ? (
            <Suspense
              fallback={<PracticesList practices={flow?.practices ?? []} flowId={flowId} flowIndex={flowIndex} lang={lang} />}
            >
              <FlowDetailAdmin flowId={flowId} flowIndex={flowIndex} lang={lang} />
            </Suspense>
          ) : (
            <PracticesList practices={flow?.practices ?? []} flowId={flowId} flowIndex={flowIndex} lang={lang} />
          )
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default FlowDetail;
