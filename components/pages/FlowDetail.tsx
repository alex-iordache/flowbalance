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
  IonBadge,
} from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Store from '../../store';
import { t, type Practice, type Language } from '../../data/flows';
import { usePracticeAccess } from '../../hooks/useAccessControl';
import { isDesktopWeb } from '../admin/adminEnv';

import {
  chevronBackOutline,
  playCircleOutline,
  checkmarkDoneCircleOutline,
  ellipseOutline,
  settingsOutline,
  lockClosedOutline,
} from 'ionicons/icons';

const FlowDetailAdmin = lazy(() => import('../admin/FlowDetailAdmin'));

function PracticeRow({
  practice,
  flowId,
  flowIndex,
  practiceIndex,
  lang,
  comingSoon,
}: {
  practice: Practice;
  flowId: string;
  flowIndex: number;
  practiceIndex: number;
  lang: Language;
  comingSoon: boolean;
}) {
  const ionRouter = useIonRouter();
  const hasAccess = usePracticeAccess(flowId, practice.id, flowIndex, practiceIndex);
  
  if (!practice) return null;

  const open = () => {
    if (comingSoon) {
      return;
    }
    ionRouter.push(`/flows/${flowId}/${practice.id}`, 'forward');
  };

  return (
    <div
      role="button"
      tabIndex={comingSoon ? -1 : 0}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') open();
      }}
      className={`w-full rounded-[20px] p-4 flex items-center gap-3 ${
        comingSoon ? 'cursor-default opacity-90' : 'cursor-pointer'
      }`}
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
          {comingSoon ? (
            <IonBadge color="medium" className="ml-2 align-middle">Coming Soon</IonBadge>
          ) : !hasAccess ? (
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
  comingSoon,
}: {
  practices: Practice[];
  flowId: string;
  flowIndex: number;
  lang: Language;
  comingSoon: boolean;
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
        comingSoon={comingSoon}
      />
    ))}
  </div>)
}
const FlowDetail = () => {
  const { flowId } = useParams<{ flowId: string }>();
  const flows = Store.useState(s => s.flows);
  const lang = Store.useState(s => s.settings.language) as Language;
  const isSuperAdmin = Store.useState(s => s.isSuperAdmin);
  const isEditor = Store.useState(s => s.isEditor);
  const adminContentEditingTools = Store.useState(s => Boolean((s.settings as any)?.adminContentEditingTools));
  const adminAccessComingSoon = Store.useState(s => Boolean((s.settings as any)?.adminAccessComingSoon));
  const allowAdmin = isSuperAdmin && adminContentEditingTools && isDesktopWeb();
  const canAccessComingSoon = (isSuperAdmin || isEditor) && adminAccessComingSoon;
  const flow = flows.find((flow) => flow.id === flowId);
  const flowIndex = flows.findIndex((flow) => flow.id === flowId);
  const isRo = lang === 'ro';
  const comingSoonBlocked = !!flow?.comingSoon && !canAccessComingSoon;
  const description = flow ? t(flow.description, lang) : null;
  const descriptionIsString = typeof description === 'string';
  const descriptionClassName =
    'text-white leading-relaxed [&>p]:mb-4 [&>p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-3 [&_li]:my-1';

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
            {flow ? t(flow.title, lang) : ''}
            {flow?.comingSoon ? (
              <IonBadge color="medium" className="ml-2 align-middle">Coming Soon</IonBadge>
            ) : null}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/settings" routerDirection="none">
              <IonIcon icon={settingsOutline} className="text-white text-2xl" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {/* Custom scroll containers: description (max 40%) + practices list (remaining), each independently scrollable. */}
      <IonContent className="text-white" fullscreen={true} scrollY={false}>
        <div className="h-full p-4 flex flex-col gap-3">
          {/* Top: description box (max 40% height) */}
          <div
            className="fb-no-scrollbar overflow-auto rounded-2xl p-4"
            style={{
              flex: '0 0 auto',
              maxHeight: '40%',
              minHeight: 0,
              backgroundColor: 'rgba(0,0,0,0.18)',
              border: '1px solid rgba(255,255,255,0.10)',
            }}
          >
            <style>{`
              /* Hide scrollbars (Chrome/Safari/WebView) but keep scrolling */
              .fb-no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>

            {description ? (
              descriptionIsString ? (
                <p className={`${descriptionClassName} whitespace-pre-wrap`}>{description}</p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            ) : null}

            {comingSoonBlocked ? (
              <div className="mt-3 rounded-xl p-3" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}>
                <div className="font-semibold">{isRo ? 'În curând' : 'Coming soon'}</div>
                <div className="text-sm text-white/80 mt-1">
                  {isRo ? 'Acest flow nu este încă disponibil.' : 'This flow isn’t available yet.'}
                </div>
              </div>
            ) : null}
          </div>

          {/* Bottom: practices list (remaining space) */}
          <div className="fb-no-scrollbar overflow-auto" style={{ flex: 1, minHeight: 0 }}>
            {flowId ? (
              allowAdmin ? (
                <Suspense
                  fallback={
                    <PracticesList
                      practices={flow?.practices ?? []}
                      flowId={flowId}
                      flowIndex={flowIndex}
                      lang={lang}
                      comingSoon={comingSoonBlocked}
                    />
                  }
                >
                  <FlowDetailAdmin flowId={flowId} flowIndex={flowIndex} lang={lang} />
                </Suspense>
              ) : (
                <PracticesList
                  practices={flow?.practices ?? []}
                  flowId={flowId}
                  flowIndex={flowIndex}
                  lang={lang}
                  comingSoon={comingSoonBlocked}
                />
              )
            ) : null}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FlowDetail;
