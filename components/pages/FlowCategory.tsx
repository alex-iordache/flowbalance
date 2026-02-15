import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonBadge,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { chevronBackOutline, settingsOutline } from 'ionicons/icons';

import Store from '../../store';
import { t, type Flow, type Language } from '../../data/flows';
import { FLOW_CATEGORIES } from './flowsCatalog';
import Logo from '../ui/Logo';

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
  const accent = '#CDAF87';
  const totalPractices = flow.practices?.length ?? 0;
  const completedPractices = flow.practices?.filter(p => p.finished).length ?? 0;
  const pct = totalPractices === 0 ? 0 : Math.round((completedPractices / totalPractices) * 100);
  return (
    <div
      onClick={disabled ? undefined : () => onOpen(flow)}
      className={`flow-entry relative flex flex-row items-center pl-3.5 pr-4 py-3 rounded-[16px] w-full gap-3.5 ${
        disabled ? 'cursor-default opacity-90 pointer-events-none' : 'cursor-pointer'
      }`}
      style={{
        backgroundColor: '#FBF7F2',
        border: '1px solid rgba(232, 222, 211, 0.85)',
        boxShadow: '0 10px 24px rgba(120, 95, 70, 0.08)',
      }}
    >
      {/* Accent bar: flush on the left border */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 3,
          height: 66,
          backgroundColor: accent,
          opacity: 0.75,
          borderRadius: 999,
        }}
      />

      <img
        className="object-cover w-[78px] h-[78px] rounded-2xl flex-shrink-0"
        src={t(flow.image, lang)}
        alt={t(flow.name, lang)}
      />
      <div className="flex flex-col flex-1 leading-normal min-w-0">
        <h5
          className="mt-0 mb-1 text-[18px] leading-tight truncate"
          style={{ fontFamily: 'var(--font-logo), ui-serif, Georgia, serif', fontWeight: 600, color: '#4E5B4F' }}
        >
          {t(flow.name, lang)}
          {flow.comingSoon ? (
            <IonBadge color="medium" className="ml-2 align-middle">
              Coming Soon
            </IonBadge>
          ) : null}
        </h5>
        <div className="text-[13px] leading-snug line-clamp-2" style={{ color: '#7A746C' }}>
          {t(flow.intro, lang)}
        </div>

        <div className="mt-1 text-[12px]" style={{ color: '#7A746C' }}>
          {totalPractices} {lang === 'ro' ? 'practici' : 'practices'}
        </div>

        <div className="mt-2 flex items-center gap-3">
          <div
            className="flex-1 h-[7px] rounded-full overflow-hidden"
            style={{ backgroundColor: 'rgba(232, 222, 211, 0.95)' }}
          >
            <div className="h-[7px] rounded-full" style={{ width: `${pct}%`, backgroundColor: accent, opacity: 0.65 }} />
          </div>
          <div className="text-[12px] font-semibold" style={{ color: '#7A746C' }}>
            {pct}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FlowCategory() {
  const ionRouter = useIonRouter();
  const { categoryId } = useParams<{ categoryId: string }>();
  const flows = Store.useState(s => s.flows);
  const lang = Store.useState(s => s.settings.language) as Language;

  const category = FLOW_CATEGORIES.find(c => c.id === categoryId) ?? null;
  const flowsById = new Map(flows.map(f => [f.id, f]));
  const categoryFlows = category ? category.flowIds.map(id => flowsById.get(id)).filter(Boolean) as Flow[] : [];

  const openFlow = (flow: Flow) => {
    // Coming soon flows are not accessible.
    if (flow.comingSoon) return;
    ionRouter.push(`/flows/${flow.id}`, 'forward');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ position: 'relative' }}>
          {/* Dead-center logo (independent of left/right icons) */}
          <div
            className="pointer-events-none"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Logo />
          </div>

          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/flows"
              icon={chevronBackOutline}
              text=""
              style={{ '--color': '#4E5B4F' } as any}
            />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton routerLink="/settings" routerDirection="none">
              <IonIcon icon={settingsOutline} className="text-2xl" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <div
          className="py-5 pb-10 w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto"
          style={{
            paddingLeft: 'max(28px, calc(var(--fb-side-pad) + 10px))',
            paddingRight: 'max(28px, calc(var(--fb-side-pad) + 10px))',
          }}
        >
          <div
            className="text-[26px] md:text-[30px] leading-tight text-center"
            style={{ fontFamily: 'var(--font-logo), ui-serif, Georgia, serif', fontWeight: 600, color: '#4E5B4F' }}
          >
            {category ? t(category.title, lang) : ''}
          </div>

          <div className="mt-4" style={{ borderTop: '1px solid rgba(232, 222, 211, 0.65)' }} />

          <div className="mt-4 grid gap-3">
            {categoryFlows.map(flow => (
              <FlowRow
                key={flow.id}
                flow={flow}
                lang={lang}
                onOpen={openFlow}
                disabled={!!flow.comingSoon}
              />
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

