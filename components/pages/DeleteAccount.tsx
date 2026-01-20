'use client';

import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { SignedIn, SignedOut, useClerk, useUser } from '@clerk/nextjs';
import { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Store from '../../store';
import * as selectors from '../../store/selectors';

export default function DeleteAccount() {
  const history = useHistory();
  const settings = Store.useState(selectors.selectSettings);
  const isRo = settings.language === 'ro';

  const { isLoaded, user } = useUser();
  const { signOut } = useClerk();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cardStyle: React.CSSProperties = useMemo(
    () => ({
      backgroundColor: 'var(--fb-bg)',
      backgroundImage:
        'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.05) 55%, rgba(255,255,255,0.05) 100%)',
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

      // Best-effort cleanup
      try {
        await signOut();
      } catch {
        // ignore
      }

      // Redirect to sign-in
      window.location.href = '/sign-in';
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
          <IonTitle className="text-white">{isRo ? 'Ștergere cont' : 'Delete account'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="w-full max-w-md mx-auto flex flex-col gap-4">
          <div className="rounded-[20px] p-4 text-white shadow-xl" style={cardStyle}>
            <SignedIn>
              <div className="text-[14px] font-semibold">{isRo ? 'Confirmare' : 'Confirmation'}</div>

              <div className="mt-3 text-white/85 text-[13px] leading-snug">
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

              <div className="mt-2 text-white/75 text-[12px] leading-snug">
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

              {error ? <div className="mt-3 text-[13px] text-red-200">{error}</div> : null}

              <div className="mt-4 flex flex-col gap-2">
                <IonButton
                  expand="block"
                  fill="solid"
                  style={{ '--background': 'rgba(255,255,255,0.12)', '--color': '#fff' } as any}
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
              <div className="text-[14px] font-semibold">{isRo ? 'Cont' : 'Account'}</div>
              <div className="mt-2 text-white/85 text-[13px] leading-snug">
                {isRo
                  ? 'Trebuie să fii autentificat pentru a șterge contul.'
                  : 'You must be signed in to delete your account.'}
              </div>
              <div className="mt-3">
                <IonButton
                  expand="block"
                  fill="solid"
                  style={{ '--background': 'rgba(255,255,255,0.12)', '--color': '#fff' } as any}
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

