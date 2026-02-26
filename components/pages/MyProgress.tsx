import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonButton,
  IonBadge,
  IonIcon,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { settingsOutline } from 'ionicons/icons';
import Store from '../../store';
import { t, type Language } from '../../data/flows';
import Logo from '../ui/Logo';

function ProgressFlowRow({
  flow,
  lang,
  isRo,
  disabled,
  onOpen,
}: {
  flow: any;
  lang: Language;
  isRo: boolean;
  disabled: boolean;
  onOpen: () => void;
}) {
  const accent = '#CDAF87';
  const totalPractices = (flow?.totalPractices ?? flow?.practices?.length ?? 0) as number;
  const completedPractices = (flow?.practices?.filter((p: any) => p?.finished)?.length ?? 0) as number;
  const pct = totalPractices === 0 ? 0 : Math.round((completedPractices / totalPractices) * 100);

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={disabled ? undefined : onOpen}
      className={`relative flex flex-row items-center pl-3.5 pr-4 py-3 rounded-[16px] w-full gap-3.5 ${
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
          width: 3,
          top: '50%',
          transform: 'translateY(-50%)',
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
        loading="lazy"
        decoding="async"
      />

      <div className="flex flex-col flex-1 leading-normal min-w-0">
        <div
          className="mt-0 mb-1 text-[18px] leading-tight truncate"
          style={{ fontFamily: 'var(--font-logo), ui-serif, Georgia, serif', fontWeight: 600, color: '#4E5B4F' }}
        >
          {t(flow.name, lang)}
          {flow?.comingSoon ? (
            <IonBadge color="medium" className="ml-2 align-middle">
              Coming Soon
            </IonBadge>
          ) : null}
        </div>

        <div className="text-[13px] leading-snug line-clamp-2" style={{ color: '#7A746C' }}>
          {t(flow.intro, lang)}
        </div>

        <div className="mt-1 text-[12px]" style={{ color: '#7A746C' }}>
          {totalPractices} {isRo ? 'practici' : 'practices'}
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
}

const MyProgress = () => {
  const history = useHistory();
  const flows = Store.useState(s => s.flows);
  const lang = Store.useState(s => s.settings.language) as Language;
  const isRo = lang === 'ro';
  const isSuperAdmin = Store.useState(s => s.isSuperAdmin);
  const isEditor = Store.useState(s => s.isEditor);
  const adminAccessComingSoon = Store.useState(s => Boolean((s.settings as any)?.adminAccessComingSoon));
  const canAccessComingSoon = (isSuperAdmin || isEditor) && adminAccessComingSoon;
  const startedFlows = flows.filter(flow => flow.started);

  const openFlow = (flowId: string, comingSoon?: boolean) => {
    if (comingSoon && !canAccessComingSoon) {
      // Do nothing.
      return;
    }
    history.push(`/flows/${flowId}`);
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

          <IonButtons slot="end">
            <IonButton routerLink="/settings" routerDirection="none" style={{ '--color': '#4E5B4F' } as any}>
              <IonIcon icon={settingsOutline} style={{ color: '#4E5B4F' }} className="text-2xl" />
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
            {isRo ? 'Progresul meu' : 'My Progress'}
          </div>

          <div className="mt-4" style={{ borderTop: '1px solid rgba(232, 222, 211, 0.65)' }} />

          {startedFlows.length === 0 ? (
            <div className="mt-8 flex flex-col items-center justify-center min-h-[40vh] text-center">
              <p className="text-[16px] md:text-[18px] font-semibold mb-3" style={{ color: '#4E5B4F' }}>
                {isRo ? 'Nu ai început încă niciun flow' : 'No flows started yet'}
              </p>
              <p className="text-[13px] md:text-[14px]" style={{ color: '#7A746C' }}>
                {isRo ? 'Începe un flow ca să îți vezi progresul aici' : 'Start a flow to track your progress here'}
              </p>
            </div>
          ) : (
            <div className="mt-5 grid gap-3">
              {startedFlows.map(flow => (
                <ProgressFlowRow
                  key={flow.id}
                  flow={flow as any}
                  lang={lang}
                  isRo={isRo}
                  disabled={!!(flow as any).comingSoon && !canAccessComingSoon}
                  onOpen={() => openFlow(flow.id, (flow as any).comingSoon)}
                />
              ))}
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MyProgress;
