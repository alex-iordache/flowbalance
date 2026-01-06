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
import { Suspense, lazy } from 'react';

import Store from '../../store';
import { t, type Practice, type Language } from '../../data/flows';
import { usePracticeAccess } from '../../hooks/useAccessControl';
import { isDesktopWeb } from '../admin/adminEnv';
import { getCategoryForFlowId } from './flowsCatalog';

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
  const hasAccess = usePracticeAccess(flowId, practice.id, flowIndex, practiceIndex);
  
  return practice && (
        <IonItem className="no-bg-color py-4 text-white" routerLink={`/flows/${flowId}/${practice.id}`}>
          <IonIcon className="text-white text-3xl" icon={practice.finished ? checkmarkDoneCircleOutline : ellipseOutline} />
          <IonLabel className="pl-5 text-white text-lg">
            {t(practice.name, lang)}
            {!hasAccess && (
              <IonBadge color="warning" className="ml-2">Premium</IonBadge>
            )}
          </IonLabel>
          <IonIcon className="text-white text-3xl" icon={hasAccess ? playCircleOutline : lockClosedOutline} />          
        </IonItem>
  )
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
  return practices && (<div className="no-bg-color">
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
  const category = getCategoryForFlowId(flowId);
  const themedStyle = category ? ({ '--background': category.gradientCss } as any) : undefined;
  const backHref = category ? `/flows/category/${category.id}` : '/flows';
  
  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar style={themedStyle}>
          <IonButtons slot="start">
            <IonBackButton defaultHref={backHref} className="text-white" />
          </IonButtons>
          <IonTitle className="text-white">{flow ? t(flow.title, lang) : ''}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/settings')}>
              <IonIcon icon={settingsOutline} className="text-white text-2xl" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" style={themedStyle}>
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
