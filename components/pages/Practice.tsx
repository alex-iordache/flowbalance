import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Store from '../../store';
import * as actions from '../../store/actions';
import { chevronBackOutline, settingsOutline } from 'ionicons/icons';
import { usePracticeAccess } from '../../hooks/useAccessControl';
import { t, type Language } from '../../data/flows';
import AudioPlayer from '../ui/AudioPlayer';
import { getAudioSrc } from '../../helpers/getAudioSrc';
import Logo from '../ui/Logo';

function isDayPrefixedTitle(value: string): boolean {
  const v = (value ?? '').trim();
  return /^(Ziua|Day)\s+\d+/i.test(v);
}

function getSubscribePending(): boolean {
  try {
    return sessionStorage.getItem('flow_subscribe_pending') === '1';
  } catch {
    return false;
  }
}

const Practice = () => {
  const { flowId, practiceId } = useParams<{ flowId: string; practiceId: string }>();
  const history = useHistory();
  const flows = Store.useState(s => s.flows);
  const lang = Store.useState(s => s.settings.language) as Language;
  const flow = flows.find((f) => f.id === flowId);
  const practice = flow?.practices.find((p) => p.id === practiceId);
  const isRo = lang === 'ro';
  const comingSoonBlocked = !!(flow as any)?.comingSoon;
  // Category theming is handled globally (header/footer/background) via CategoryThemeSync.
  
  // Get flow and practice indices for access check
  const flowIndex = flows.findIndex((f) => f.id === flowId);
  const practiceIndex = flow?.practices.findIndex((p) => p.id === practiceId) ?? -1;
  
  // Check if user has access to this practice
  const hasAccess = usePracticeAccess(flowId, practiceId, flowIndex, practiceIndex);
  const [isActivating, setIsActivating] = useState(false);

  // If the user doesn't have access, route them to the in-app subscribe screen.
  useEffect(() => {
    // Coming Soon flows are not accessible yet (and should not trigger the subscribe paywall).
    if (comingSoonBlocked) return;
    if (hasAccess) {
      setIsActivating(false);
      return;
    }

    const returnTo = `${window.location.pathname}${window.location.search}`;

    // If we just returned from checkout, hold on this screen briefly and try to refresh Clerk session
    // instead of immediately bouncing back to /subscribe (which creates a "subscribe trap").
    if (getSubscribePending()) {
      setIsActivating(true);

      // Try a couple quick Clerk session reloads to pick up the new plan.
      let attempts = 0;
      const interval = window.setInterval(() => {
        attempts += 1;
        try {
          const w = window as unknown as { Clerk?: { session?: { reload?: () => Promise<unknown> } } };
          void w.Clerk?.session?.reload?.();
        } catch {
          // ignore
        }
        if (attempts >= 3) window.clearInterval(interval);
      }, 800);

      const timeout = window.setTimeout(() => {
        // If still no access after a short grace period, take them back to subscribe.
        if (!hasAccess) {
          history.replace(`/subscribe?return=${encodeURIComponent(returnTo)}`);
        }
      }, 5000);

      return () => {
        window.clearInterval(interval);
        window.clearTimeout(timeout);
      };
    }

    // Use replace so the Subscribe screen doesn't remain in back stack after returning.
    history.replace(`/subscribe?return=${encodeURIComponent(returnTo)}`);
  }, [comingSoonBlocked, hasAccess, history, flowId, practiceId]);

  if (comingSoonBlocked) {
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
              <IonBackButton defaultHref="/flows" icon={chevronBackOutline} text="" style={{ '--color': '#4E5B4F' } as any} />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton routerLink="/settings" routerDirection="none">
                <IonIcon icon={settingsOutline} className="text-2xl" />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div
            className="rounded-2xl p-4"
            style={{
              backgroundColor: '#FBF7F2',
              border: '1px solid rgba(232, 222, 211, 0.85)',
              boxShadow: '0 10px 24px rgba(120, 95, 70, 0.08)',
            }}
          >
            <div className="font-semibold" style={{ color: '#4E5B4F' }}>
              {isRo ? 'Acest flow nu este încă disponibil.' : 'This flow isn’t available yet.'}
            </div>
            <div className="text-sm mt-1" style={{ color: '#7A746C' }}>
              {isRo ? 'Revino curând.' : 'Please check back soon.'}
            </div>
            <div className="mt-4">
              <IonButton
                expand="block"
                fill="solid"
                style={{ '--background': '#ffffff', '--color': '#3b1b6a' } as any}
                onClick={() => history.replace('/flows')}
              >
                {isRo ? 'Înapoi la flows' : 'Back to flows'}
              </IonButton>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const handleAudioPlay = () => {
    if (flowId) {
      actions.setFlowStarted(flowId, true);
    }
  };

  const handleAudioEnded = () => {
    if (flowId && practiceId) {
      actions.setPracticeFinished(flowId, practiceId, true);
    }
  };

  const description = practice ? t(practice.description, lang) : null;
  const descriptionIsString = typeof description === 'string';
  const descriptionClassName =
    'leading-relaxed [&>p]:mb-4 [&>p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-3 [&_li]:my-1';

  const flowShowDayTitles = (() => {
    const practices = flow?.practices ?? [];
    if (practices.length === 0) return false;
    const dayCount = practices.reduce((acc, p) => {
      const dayTitle = t(p.title, lang);
      return acc + (isDayPrefixedTitle(dayTitle) ? 1 : 0);
    }, 0);
    return dayCount / practices.length >= 0.6;
  })();

  const displayTitle = (() => {
    if (!practice) return '';
    const dayTitle = t(practice.title, lang);
    const normalName = t(practice.name, lang);
    return flowShowDayTitles && isDayPrefixedTitle(dayTitle) ? dayTitle : normalName;
  })();

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
              defaultHref={flowId ? `/flows/${flowId}` : '/flows'}
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
      <IonContent fullscreen={true} scrollY={false}>
        <div className="h-full p-4 flex flex-col gap-3">
          {isActivating && !hasAccess ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center">
              <p className="text-lg font-semibold mb-2" style={{ color: '#4E5B4F' }}>
                Activating your subscription…
              </p>
              <p className="text-sm" style={{ color: '#7A746C' }}>
                This usually takes a few seconds.
              </p>
            </div>
          ) : null}

          {/* Show content only if user has access */}
          {hasAccess ? (
            <div className="flex-1 min-h-0 flex flex-col gap-3">
              {/* Scrollable text box (smaller, so player has more room) */}
              <div
                className="fb-scrollbar overflow-auto p-1 text-[13px] md:text-[14px]"
                style={{
                  flex: 5,
                  minHeight: 0,
                  backgroundColor: 'transparent',
                  border: 'none',
                  boxShadow: 'none',
                }}
              >
                {description ? (
                  descriptionIsString ? (
                    <p className={`${descriptionClassName} whitespace-pre-wrap`} style={{ color: '#4E5B4F' }}>
                      {description}
                    </p>
                  ) : (
                    <div className={descriptionClassName} style={{ color: '#4E5B4F' }}>
                      {description}
                    </div>
                  )
                ) : null}
              </div>

              <div className="mt-1" style={{ borderTop: '1px solid rgba(232, 222, 211, 0.65)' }} />

              {/* Player area */}
              {practice && t(practice.audioUrl, lang) ? (
                <div
                  className="flex items-center justify-center"
                  style={{
                    flex: 5,
                    minHeight: 0,
                  }}
                >
                  <AudioPlayer
                    src={getAudioSrc({
                      audioUrlOrPath: t(practice.audioUrl, lang),
                      flowId,
                      practiceId,
                    })}
                    title={displayTitle}
                    subtitle={flow ? t(flow.name, lang) : undefined}
                    variant="floatingCircle"
                    onPlay={handleAudioPlay}
                    onEnded={handleAudioEnded}
                  />
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Practice;
