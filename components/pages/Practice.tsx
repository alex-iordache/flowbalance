import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Store from '../../store';
import * as actions from '../../store/actions';
import { settingsOutline, lockClosedOutline } from 'ionicons/icons';
import { usePracticeAccess } from '../../hooks/useAccessControl';
import { t, type Language } from '../../data/flows';
import AudioPlayer from '../ui/AudioPlayer';
import { getAudioSrc } from '../../helpers/getAudioSrc';

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
  const comingSoon = !!(flow as any)?.comingSoon;
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
    if (comingSoon) return;
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
  }, [comingSoon, hasAccess, history, flowId, practiceId]);

  if (comingSoon) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="text-white">{isRo ? 'În curând' : 'Coming soon'}</IonTitle>
            <IonButtons slot="end">
              <IonButton routerLink="/settings" routerDirection="none">
                <IonIcon icon={settingsOutline} className="text-white text-2xl" />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div
            className="rounded-2xl p-4 text-white"
            style={{
              backgroundColor: 'rgba(0,0,0,0.25)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <div className="font-semibold">{isRo ? 'Acest flow nu este încă disponibil.' : 'This flow isn’t available yet.'}</div>
            <div className="text-sm text-white/80 mt-1">
              {isRo ? 'Revino curând.' : 'Please check back soon.'}
            </div>
            <div className="mt-4">
              <IonButton
                expand="block"
                fill="solid"
                style={{ '--background': 'rgba(255,255,255,0.12)', '--color': '#fff' } as any}
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

  const getDisplayName = () => {
    if (!practice) return '';
    const name = t(practice.name, lang);
    if (!name) return '';
    if (name.length <= 20) return name;
    // Extract just the day part (e.g., "Day 1", "Day 2")
    const dayMatch = name.match(/- (Day \d+)$/);
    return dayMatch ? dayMatch[1] : name;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="text-white">
            {getDisplayName()}
            {!hasAccess && <IonIcon icon={lockClosedOutline} className="ml-2" />}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/settings" routerDirection="none">
              <IonIcon icon={settingsOutline} className="text-white text-2xl" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="text-white" fullscreen={true} scrollY={false}>
        <div className="h-full p-4 flex flex-col gap-3">
          {isActivating && !hasAccess ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center">
              <p className="text-white text-lg font-semibold mb-2">Activating your subscription…</p>
              <p className="text-white/80 text-sm">This usually takes a few seconds.</p>
            </div>
          ) : null}

          {/* Show content only if user has access */}
          {hasAccess ? (
            <div className="flex-1 min-h-0 flex flex-col gap-3">
              {/* 60%: Scrollable text box */}
              <div
                className="fb-no-scrollbar p-1 overflow-auto"
                style={{
                  flex: 6,
                  minHeight: 0,
                  scrollbarWidth: 'none', // Firefox
                  msOverflowStyle: 'none', // IE/Edge legacy
                }}
              >
                <style>{`
                  /* Hide scrollbars (Chrome/Safari/WebView) but keep scrolling */
                  .fb-no-scrollbar::-webkit-scrollbar { display: none; }
                `}</style>
                {practice && t(practice.description, lang) ? (
                  <p className="text-white leading-relaxed whitespace-pre-wrap">
                    {t(practice.description, lang)}
                  </p>
                ) : null}
              </div>

              {/* 40%: Player area */}
              {practice && t(practice.audioUrl, lang) ? (
                <div
                  className="flex items-center justify-center"
                  style={{
                    flex: 4,
                    minHeight: 0,
                  }}
                >
                  <AudioPlayer
                    src={getAudioSrc({
                      audioUrlOrPath: t(practice.audioUrl, lang),
                      flowId,
                      practiceId,
                    })}
                    title={t(practice.name, lang)}
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
