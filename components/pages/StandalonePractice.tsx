'use client';

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
import { chevronBackOutline, settingsOutline, lockClosedOutline } from 'ionicons/icons';
import { useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Store from '../../store';
import { t, type Language } from '../../data/flows';
import AudioPlayer from '../ui/AudioPlayer';
import { getAudioSrc } from '../../helpers/getAudioSrc';
import { usePracticeAccess } from '../../hooks/useAccessControl';
import { buildAudioUsageIndex, getAudioKeyForLanguage, pickContextFlowId } from '../../helpers/standaloneAudioIndex';
import Logo from '../ui/Logo';

function getSubscribePending(): boolean {
  try {
    return sessionStorage.getItem('flow_subscribe_pending') === '1';
  } catch {
    return false;
  }
}

function MessageBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-4 leading-relaxed [&>p]:mb-3 [&>p:last-child]:mb-0"
      style={{
        backgroundColor: '#FBF7F2',
        border: '1px solid rgba(232, 222, 211, 0.85)',
        boxShadow: '0 10px 24px rgba(120, 95, 70, 0.06)',
        color: '#4E5B4F',
      }}
    >
      {children}
    </div>
  );
}

export default function StandalonePractice() {
  const { audioId } = useParams<{ audioId: string }>();
  const history = useHistory();
  const flows = Store.useState(s => s.flows);
  const lang = Store.useState(s => s.settings.language) as Language;
  const isRo = lang === 'ro';

  const decodedId = useMemo(() => {
    try {
      return decodeURIComponent(audioId);
    } catch {
      return audioId;
    }
  }, [audioId]);

  const item = useMemo(() => {
    const idx = buildAudioUsageIndex(flows);
    return idx.byId.get(decodedId) ?? null;
  }, [flows, decodedId]);

  const contextFlowId = useMemo(() => (item ? pickContextFlowId(item.flowIds) : null), [item]);
  const contextFlow = useMemo(() => (contextFlowId ? flows.find(f => f.id === contextFlowId) ?? null : null), [flows, contextFlowId]);

  const examplePracticeId = useMemo(() => {
    if (!item || !contextFlowId) return null;
    return item.examplePracticeIdByFlowId[contextFlowId] ?? null;
  }, [item, contextFlowId]);

  const flowIndex = contextFlowId ? flows.findIndex(f => f.id === contextFlowId) : -1;
  const practiceIndex =
    contextFlow && examplePracticeId ? contextFlow.practices.findIndex(p => p.id === examplePracticeId) : -1;

  const hasAccess = usePracticeAccess(
    contextFlowId ?? 'unknown',
    examplePracticeId ?? 'unknown',
    flowIndex,
    practiceIndex,
  );

  const [isActivating, setIsActivating] = useState(false);

  useEffect(() => {
    if (!item || !contextFlowId || !examplePracticeId) return;
    if (hasAccess) {
      setIsActivating(false);
      return;
    }

    const returnTo = `${window.location.pathname}${window.location.search}`;

    if (getSubscribePending()) {
      setIsActivating(true);
      let attempts = 0;
      const interval = window.setInterval(() => {
        attempts += 1;
        try {
          const w = window as unknown as { Clerk?: { session?: { reload?: () => Promise<unknown> } } };
          void w.Clerk?.session?.reload?.();
        } catch {}
        if (attempts >= 3) window.clearInterval(interval);
      }, 800);

      const timeout = window.setTimeout(() => {
        if (!hasAccess) history.replace(`/subscribe?return=${encodeURIComponent(returnTo)}`);
      }, 5000);

      return () => {
        window.clearInterval(interval);
        window.clearTimeout(timeout);
      };
    }

    history.replace(`/subscribe?return=${encodeURIComponent(returnTo)}`);
  }, [item, contextFlowId, examplePracticeId, hasAccess, history]);

  const title = item ? (isRo ? item.title.ro : item.title.en) : '';
  const flowName = contextFlow ? t(contextFlow.title, lang) : '';

  const message = useMemo(() => {
    if (!contextFlowId) return null;

    // Special copy for the 4 "main" flows
    if (contextFlowId === 'Calming-Anxiety') {
      return isRo ? (
        <>
          <p>Această înregistrare face parte din programul Calming Anxiety.</p>
          <p>
            Dacă vrei să reduci anxietatea pe termen lung și să nu mai revii constant în aceleași stări, îți recomand
            programul complet, structurat pe mai multe zile, care susține reglarea sistemului nervos și construirea unui
            sentiment real de siguranță interioară.
          </p>
        </>
      ) : (
        <>
          <p>This recording is part of the Calming Anxiety program.</p>
          <p>
            If you want to reduce anxiety long-term (not just feel better for a moment), the full multi-day program is
            designed to support nervous system regulation and build a real sense of inner safety.
          </p>
        </>
      );
    }

    if (contextFlowId === 'Improve-Sleep') {
      return isRo ? (
        <>
          <p>Această înregistrare face parte din programul Improve Sleep.</p>
          <p>
            Dacă îți dorești un somn mai profund și mai constant, nu doar seri izolate de relaxare, programul complet te
            ajută să îți resetezi treptat ritmul de somn și relația cu odihna.
          </p>
        </>
      ) : (
        <>
          <p>This recording is part of the Improve Sleep program.</p>
          <p>
            If you want deeper, more consistent sleep (not just occasional relaxed evenings), the full program helps you
            gradually reset your sleep rhythm and your relationship with rest.
          </p>
        </>
      );
    }

    if (contextFlowId === 'Build-Self-Trust') {
      return isRo ? (
        <>
          <p>Această înregistrare face parte din programul Self Trust.</p>
          <p>
            Dacă simți că ai nevoie să te bazezi mai mult pe tine, pe deciziile tale și pe consecvența ta, programul de
            mai multe zile oferă un cadru clar în care încrederea se construiește prin experiență, nu prin afirmații
            forțate.
          </p>
        </>
      ) : (
        <>
          <p>This recording is part of the Self Trust program.</p>
          <p>
            If you want to rely on yourself more—your decisions, your consistency—the multi-day program offers a clear
            structure where trust is built through experience, not forced affirmations.
          </p>
        </>
      );
    }

    if (contextFlowId === 'Healthy-Money-Mindset') {
      return isRo ? (
        <>
          <p>Această înregistrare face parte din programul Healthy Money Mindset.</p>
          <p>
            Dacă vrei ca relația ta cu banii să se schimbe dincolo de insight-uri punctuale, programul complet te ajută să
            creezi o relație mai calmă, mai matură și mai conștientă cu banii și alegerile tale.
          </p>
        </>
      ) : (
        <>
          <p>This recording is part of the Healthy Money Mindset program.</p>
          <p>
            If you want your relationship with money to shift beyond one-off insights, the full program helps you build a
            calmer, more mature, and more conscious relationship with money and your choices.
          </p>
        </>
      );
    }

    // Fallback (always include flow name)
    return isRo ? (
      <>
        <p>Această înregistrare face parte din programul {flowName}.</p>
        <p>
          Dacă simți că această experiență te ajută și vrei să aibă un impact mai profund și mai stabil în viața ta, îți
          recomand să te angajezi într-un program de mai multe zile din acest flow. Practica consecventă, susținută de
          exerciții și audio-uri gândite într-o progresie, creează schimbări reale, nu doar momente de liniștire.
        </p>
      </>
    ) : (
      <>
        <p>This recording is part of the {flowName} program.</p>
        <p>
          If this experience helps you and you want a deeper, more stable impact in your life, commit to the full
          multi-day program in this flow. Consistent practice, supported by exercises and audio sessions designed as a
          progression, creates real change—not just moments of relief.
        </p>
      </>
    );
  }, [contextFlowId, flowName, isRo, lang]);

  if (!item || !contextFlowId || !examplePracticeId) {
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
              <IonBackButton defaultHref="/practices" icon={chevronBackOutline} text="" style={{ '--color': '#4E5B4F' } as any} />
            </IonButtons>
            <IonButtons slot="end">
              <IonIcon icon={lockClosedOutline} className="text-2xl" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true}>
          <div className="px-5 py-5 pb-10 w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto">
            <div
              className="text-[26px] md:text-[30px] leading-tight text-center"
              style={{ fontFamily: 'var(--font-logo), ui-serif, Georgia, serif', fontWeight: 600, color: '#4E5B4F' }}
            >
              {isRo ? 'Exercițiu' : 'Exercise'}
            </div>
            <div className="mt-4" style={{ borderTop: '1px solid rgba(232, 222, 211, 0.65)' }} />
            <div className="mt-4">
              <MessageBox>
                <p>{isRo ? 'Nu am găsit această înregistrare.' : "We couldn't find this recording."}</p>
              </MessageBox>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const audioKey = getAudioKeyForLanguage(item, lang);
  const src = getAudioSrc({
    audioUrlOrPath: audioKey,
    flowId: contextFlowId,
    practiceId: examplePracticeId,
  });

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
            <IonBackButton defaultHref="/practices" icon={chevronBackOutline} text="" style={{ '--color': '#4E5B4F' } as any} />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton routerLink="/settings" routerDirection="none" style={{ '--color': '#4E5B4F' } as any}>
              <IonIcon icon={settingsOutline} style={{ color: '#4E5B4F' }} className="text-2xl" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} scrollY={true}>
        <div className="px-5 py-5 pb-10 w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto flex flex-col gap-4">
          <div className="flex items-center justify-center" style={{ minHeight: '42vh' }}>
            <AudioPlayer src={src} title={title} subtitle={flowName || undefined} variant="floatingCircle" />
          </div>
          {message ? <MessageBox>{message}</MessageBox> : null}
        </div>
      </IonContent>
    </IonPage>
  );
}

