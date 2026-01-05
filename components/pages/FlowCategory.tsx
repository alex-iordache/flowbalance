import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import { settingsOutline } from 'ionicons/icons';

import Store from '../../store';
import { t, type Flow, type Language } from '../../data/flows';
import { FLOW_CATEGORIES } from './flowsCatalog';

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
        <h5 className="mt-0 mb-2 text-xl md:text-2xl font-bold tracking-tight text-white leading-tight">
          {t(flow.name, lang)}
        </h5>
        <p className="mb-1 text-sm md:text-base text-white">{t(flow.intro, lang)}</p>
      </div>
    </div>
  );
};

export default function FlowCategory() {
  const history = useHistory();
  const { categoryId } = useParams<{ categoryId: string }>();
  const flows = Store.useState(s => s.flows);
  // Until we ship an in-app language switch, keep English on display.
  const lang: Language = 'en';

  const category = FLOW_CATEGORIES.find(c => c.id === categoryId) ?? null;
  const flowsById = new Map(flows.map(f => [f.id, f]));
  const categoryFlows = category ? category.flowIds.map(id => flowsById.get(id)).filter(Boolean) as Flow[] : [];
  const themedStyle = category ? ({ '--background': category.gradientCss } as any) : undefined;

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar style={themedStyle}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/flows" className="text-white" />
          </IonButtons>
          <IonTitle className="text-white">{category ? t(category.title, lang) : 'Category'}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/settings')}>
              <IonIcon icon={settingsOutline} className="text-white text-2xl" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true} style={themedStyle}>
        <IonHeader collapse="condense">
          <IonToolbar style={themedStyle}>
            <IonTitle size="large">{category ? t(category.title, lang) : 'Category'}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="flex flex-col gap-4 p-4 w-full max-w-2xl mx-auto">
          {categoryFlows.map(flow => (
            <FlowRow key={flow.id} flow={flow} lang={lang} />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
}

