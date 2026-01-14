import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonBadge,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { chevronBackOutline, settingsOutline } from 'ionicons/icons';
import { useState } from 'react';

import Store from '../../store';
import { t, type Flow, type Language } from '../../data/flows';
import { FLOW_CATEGORIES } from './flowsCatalog';

const FlowRow = ({
  flow,
  lang,
  onOpen,
  disabled,
}: {
  flow: Flow;
  lang: Language;
  onOpen: (flow: Flow) => void;
  disabled: boolean;
}) => {
  return (
    <div
      onClick={() => onOpen(flow)}
      className={`flow-entry flex flex-row items-start p-4 rounded-[20px] w-full gap-4 ${
        disabled ? 'cursor-default opacity-90' : 'cursor-pointer'
      }`}
      style={{
        backgroundColor: 'var(--fb-bg)',
        backgroundImage: 'var(--fb-card-gradient)',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -10px 22px rgba(0,0,0,0.14)',
      }}
    >
      <img
        className="object-contain w-24 h-24 rounded-2xl flex-shrink-0 md:w-48 md:h-48 self-start"
        src={t(flow.image, lang)}
        alt={t(flow.name, lang)}
      />
      <div className="flex flex-col justify-between flex-1 leading-normal min-w-0">
        <h5 className="mt-0 mb-2 text-xl md:text-2xl font-bold tracking-tight text-white leading-tight">
          {t(flow.name, lang)}
          {flow.comingSoon ? (
            <IonBadge color="medium" className="ml-2 align-middle">
              Coming Soon
            </IonBadge>
          ) : null}
        </h5>
        <p className="mb-0 text-sm md:text-base text-white">{t(flow.intro, lang)}</p>
      </div>
    </div>
  );
};

export default function FlowCategory() {
  const ionRouter = useIonRouter();
  const { categoryId } = useParams<{ categoryId: string }>();
  const flows = Store.useState(s => s.flows);
  const lang = Store.useState(s => s.settings.language) as Language;
  const isSuperAdmin = Store.useState(s => s.isSuperAdmin);
  const isEditor = Store.useState(s => s.isEditor);
  const adminAccessComingSoon = Store.useState(s => Boolean((s.settings as any)?.adminAccessComingSoon));
  const canAccessComingSoon = (isSuperAdmin || isEditor) && adminAccessComingSoon;

  const category = FLOW_CATEGORIES.find(c => c.id === categoryId) ?? null;
  const flowsById = new Map(flows.map(f => [f.id, f]));
  const categoryFlows = category ? category.flowIds.map(id => flowsById.get(id)).filter(Boolean) as Flow[] : [];

  const openFlow = (flow: Flow) => {
    if (flow.comingSoon && !canAccessComingSoon) {
      // Do nothing.
      return;
    }
    ionRouter.push(`/flows/${flow.id}`, 'forward');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/flows"
              icon={chevronBackOutline}
              text=""
              style={{ '--color': '#fff' } as any}
            />
          </IonButtons>
          <IonTitle className="text-white text-base font-bold truncate">
            {category ? t(category.title, lang) : 'Category'}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/settings" routerDirection="none">
              <IonIcon icon={settingsOutline} className="text-white text-2xl" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <div className="flex flex-col gap-4 p-4 w-full max-w-2xl mx-auto">
          {categoryFlows.map(flow => (
            <FlowRow
              key={flow.id}
              flow={flow}
              lang={lang}
              onOpen={openFlow}
              disabled={!!flow.comingSoon && !canAccessComingSoon}
            />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
}

