'use client';

import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getWebBaseUrl } from '../../helpers/webBaseUrl';
import Store from '../../store';
import * as selectors from '../../store/selectors';

export default function DeleteAccount() {
  const history = useHistory();
  const settings = Store.useState(selectors.selectSettings);
  const isRo = settings.language === 'ro';

  const { isLoaded, user } = useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cardStyle: React.CSSProperties = useMemo(
    () => ({
      backgroundColor: '#FBF7F2',
      border: '1px solid rgba(232, 222, 211, 0.85)',
      boxShadow: '0 10px 24px rgba(120, 95, 70, 0.08)',
    }),
    []
  );

  const onConfirmDelete = async () => {
    setError(null);
    setLoading(true);
    try {
      if (!isLoaded || !user) {
        throw new Error('Not signed in');
      }

      // Clerk: delete the currently signed-in user
      await user.delete();

      // IMPORTANT (iOS WebView): keep this as ONE navigation.
      // Triggering multiple navigations (e.g. signOut redirect + manual href) can produce
      // NSURLErrorDomain -999 (navigation cancelled), which our native offline fallback interprets as failure.
      // Single hard redirect to the Next.js sign-in route
      window.location.replace(`${getWebBaseUrl()}/sign-in`);
    } catch {
      setError(
        isRo
          ? 'Nu am putut șterge contul. Te rugăm să încerci din nou.'
          : 'Could not delete your account. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{isRo ? 'Ștergere cont' : 'Delete account'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto flex flex-col gap-4">
          <div className="rounded-[20px] p-4 md:p-5" style={cardStyle}>
            <SignedIn>
              <div className="text-[14px] md:text-[16px] font-semibold" style={{ color: '#4E5B4F' }}>
                {isRo ? 'Confirmare' : 'Confirmation'}
              </div>

              <div className="mt-3 text-[13px] md:text-[15px] leading-snug" style={{ color: '#4E5B4F' }}>
                {isRo ? (
                  <>
                    Ești sigur(ă) că vrei să îți ștergi contul? Această acțiune este{' '}
                    <strong>permanentă</strong>.
                  </>
                ) : (
                  <>
                    Are you sure you want to delete your account? This action is <strong>permanent</strong>.
                  </>
                )}
              </div>

              <div className="mt-2 text-[12px] md:text-[14px] leading-snug" style={{ color: '#7A746C' }}>
                {isRo ? (
                  <>
                    Notă: dacă ai un abonament activ, îl poți gestiona din <em>Abonament</em> înainte de ștergere.
                  </>
                ) : (
                  <>
                    Note: if you have an active subscription, you can manage it from <em>Manage Subscription</em>{' '}
                    before deleting.
                  </>
                )}
              </div>

              {error ? (
                <div className="mt-3 text-[13px] md:text-[15px]" style={{ color: '#B91C1C' }}>
                  {error}
                </div>
              ) : null}

              <div className="mt-4 flex flex-col gap-2">
                <IonButton
                  expand="block"
                  fill="solid"
                  style={{ '--background': '#ffffff', '--color': '#3b1b6a' } as any}
                  onClick={() => history.replace('/settings')}
                  disabled={loading}
                >
                  {isRo ? 'Anulează' : 'Cancel'}
                </IonButton>

                <IonButton
                  expand="block"
                  fill="solid"
                  style={
                    {
                      '--background': 'rgba(255, 59, 48, 0.35)',
                      '--background-activated': 'rgba(255, 59, 48, 0.45)',
                      '--color': '#fff',
                    } as any
                  }
                  onClick={() => void onConfirmDelete()}
                  disabled={loading}
                >
                  {loading ? (isRo ? 'Se șterge…' : 'Deleting…') : isRo ? 'Șterge contul' : 'Delete my account'}
                </IonButton>
              </div>
            </SignedIn>

            <SignedOut>
              <div className="text-[14px] md:text-[16px] font-semibold" style={{ color: '#4E5B4F' }}>
                {isRo ? 'Cont' : 'Account'}
              </div>
              <div className="mt-2 text-[13px] md:text-[15px] leading-snug" style={{ color: '#7A746C' }}>
                {isRo
                  ? 'Trebuie să fii autentificat pentru a șterge contul.'
                  : 'You must be signed in to delete your account.'}
              </div>
              <div className="mt-3">
                <IonButton
                  expand="block"
                  fill="solid"
                  style={{ '--background': '#ffffff', '--color': '#3b1b6a' } as any}
                  onClick={() => (window.location.href = '/sign-in')}
                >
                  {isRo ? 'Autentificare' : 'Sign In'}
                </IonButton>
              </div>
            </SignedOut>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

