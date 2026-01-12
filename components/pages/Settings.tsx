import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonToggle,
  IonButton,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { SignedIn, SignedOut, useAuth, useClerk } from '@clerk/nextjs';
import { useMemo, useState, useEffect } from 'react';

import Store from '../../store';
import * as selectors from '../../store/selectors';
import { setSettings } from '../../store/actions';
import { openExternalUrl } from '../../helpers/openExternal';
import { getWebBaseUrl } from '../../helpers/webBaseUrl';
import { isDesktopWeb } from '../admin/adminEnv';

const Settings = () => {
  const settings = Store.useState(selectors.selectSettings);
  const isSuperAdmin = Store.useState(s => s.isSuperAdmin);
  const isEditor = Store.useState(s => s.isEditor);
  const { signOut } = useClerk();
  const { userId, orgId, has, isLoaded } = useAuth();
  const isRo = settings.language === 'ro';
  const [ticket, setTicket] = useState<string | null>(null);
  const [ticketLoading, setTicketLoading] = useState(false);

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--fb-bg)',
    backgroundImage:
      'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.05) 55%, rgba(255,255,255,0.05) 100%)',
  };

  const showManageSubscription = useMemo(() => {
    // Only show for personal subscribed users (not Organization access).
    if (!userId) return false;
    if (orgId) return false;
    return has?.({ plan: 'pro_user' }) ?? false;
  }, [userId, orgId, has]);

  const showAdminSettings = isSuperAdmin || isEditor;
  const canToggleContentTools = isSuperAdmin;
  const canToggleComingSoonAccess = isSuperAdmin || isEditor;
  const adminContentEditingTools = Boolean((settings as any).adminContentEditingTools);
  const adminAccessComingSoon = Boolean((settings as any).adminAccessComingSoon);

  // Prefetch a Clerk sign-in ticket so we can open billing-web with authentication
  useEffect(() => {
    if (!isLoaded) return;
    if (!userId) return;
    if (!showManageSubscription) return;
    let cancelled = false;
    const ctrl = new AbortController();

    setTicketLoading(true);
    setTicket(null);

    window
      .fetch('/api/create-sign-in-token', { signal: ctrl.signal })
      .then(r => r.json())
      .then(data => {
        if (cancelled) return;
        setTicket(typeof data?.token === 'string' ? data.token : null);
      })
      .catch(() => {
        if (cancelled) return;
        setTicket(null);
      })
      .finally(() => {
        if (cancelled) return;
        setTicketLoading(false);
      });

    return () => {
      cancelled = true;
      ctrl.abort();
    };
  }, [isLoaded, userId, showManageSubscription]);

  const handleSignOut = async () => {
    // Sign out with Clerk
    await signOut();
    // Redirect to sign-in page after sign out
    window.location.href = '/sign-in';
  };

  const handleManageSubscription = async () => {
    const baseUrl = `${getWebBaseUrl()}/billing-web`;
    const returnTo = '/settings';
    const common = `return=${encodeURIComponent(returnTo)}`;
    const url = ticket
      ? `${baseUrl}?${common}&__clerk_ticket=${encodeURIComponent(ticket)}`
      : `${baseUrl}?${common}`;
    
    await openExternalUrl(url);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="text-white">{isRo ? 'Setări' : 'Settings'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <style>{`
          /* Settings language select: bigger, white dropdown chevron */
          .fb-lang-select::part(icon) {
            color: #ffffff;
            font-size: 18px;
            margin-inline-end: 0;
            padding: 0;
          }
          .fb-lang-select::part(text) {
            margin-inline-end: 0;
          }
          .fb-lang-select {
            --padding-start: 0px;
            --padding-end: 0px;
            padding-inline-end: 0 !important;
            margin-right: 0 !important;
          }
        `}</style>
        <div className="w-full max-w-md mx-auto flex flex-col gap-4">
          {/* Preferences */}
          <div className="rounded-[20px] p-4 text-white shadow-xl" style={cardStyle}>
            <div className="flex items-center justify-between gap-3">
              <div className="text-[14px] font-semibold text-white">{isRo ? 'Notificări' : 'Notifications'}</div>
              <IonToggle
                checked={settings.enableNotifications}
                style={{
                  // White/soft-white toggle styling
                  '--handle-background': '#ffffff',
                  '--handle-background-checked': '#ffffff',
                  '--track-background': 'rgba(255,255,255,0.35)',
                  '--track-background-checked': 'rgba(255,255,255,0.55)',
                } as any}
                onIonChange={e => {
                  setSettings({
                    ...settings,
                    enableNotifications: e.target.checked,
                  });
                }}
              />
            </div>

            <div className="mt-4 flex items-center gap-3">
              <IonLabel className="text-white text-[14px] font-semibold">{isRo ? 'Limbă' : 'Language'}</IonLabel>
              <div style={{ marginLeft: 'auto' }}>
                <IonSelect
                  className="fb-lang-select"
                  value={settings.language}
                  interface="popover"
                  style={{
                    '--placeholder-color': 'rgba(255,255,255,0.85)',
                    '--color': '#fff',
                    '--icon-color': '#fff',
                    '--icon-opacity': '1',
                    fontSize: '13px',
                  } as any}
                  onIonChange={(e) => {
                    const next = (e.detail.value === 'ro' ? 'ro' : 'en') as typeof settings.language;
                    setSettings({ ...settings, language: next });
                  }}
                >
                  <IonSelectOption value="en">English</IonSelectOption>
                  <IonSelectOption value="ro">Română</IonSelectOption>
                </IonSelect>
              </div>
            </div>
          </div>

          {/* Account */}
          <div className="rounded-[20px] p-4 text-white shadow-xl" style={cardStyle}>
            <div className="text-[14px] font-semibold">{isRo ? 'Cont' : 'Account'}</div>

            <SignedIn>
              <div className="mt-3 flex flex-col gap-2">
                {showManageSubscription ? (
                  <IonButton
                    expand="block"
                    fill="solid"
                    style={{ '--background': 'rgba(255,255,255,0.12)', '--color': '#fff' } as any}
                    onClick={() => void handleManageSubscription()}
                    disabled={ticketLoading}
                  >
                    {ticketLoading ? (isRo ? 'Se pregătește...' : 'Preparing...') : (isRo ? 'Abonament' : 'Manage Subscription')}
                  </IonButton>
                ) : null}
                <IonButton
                  expand="block"
                  fill="solid"
                  style={{ '--background': 'rgba(255,255,255,0.12)', '--color': '#fff' } as any}
                  onClick={handleSignOut}
                >
                  {isRo ? 'Deconectare' : 'Sign Out'}
                </IonButton>
              </div>
            </SignedIn>

            <SignedOut>
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

          {/* Admin Settings */}
          {showAdminSettings ? (
            <div className="rounded-[20px] p-4 text-white shadow-xl" style={cardStyle}>
              <div className="text-[14px] font-semibold">{isRo ? 'Setări admin' : 'Admin Settings'}</div>

              <div className="mt-3 flex flex-col gap-3">
                {canToggleContentTools ? (
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[14px] font-semibold text-white">
                      {isRo ? 'Instrumente editare conținut' : 'Content editing tools'}
                      {!isDesktopWeb() ? (
                        <div className="text-[12px] text-white/70 font-normal">
                          {isRo ? 'Disponibil doar pe desktop web.' : 'Desktop web only.'}
                        </div>
                      ) : null}
                    </div>
                    <IonToggle
                      checked={adminContentEditingTools}
                      style={{
                        '--handle-background': '#ffffff',
                        '--handle-background-checked': '#ffffff',
                        '--track-background': 'rgba(255,255,255,0.35)',
                        '--track-background-checked': 'rgba(255,255,255,0.55)',
                      } as any}
                      onIonChange={e => {
                        setSettings({
                          ...settings,
                          adminContentEditingTools: e.target.checked,
                        } as any);
                      }}
                    />
                  </div>
                ) : null}

                {canToggleComingSoonAccess ? (
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[14px] font-semibold text-white">
                      {isRo ? 'Acces “în curând”' : 'Access “coming soon”'}
                    </div>
                    <IonToggle
                      checked={adminAccessComingSoon}
                      style={{
                        '--handle-background': '#ffffff',
                        '--handle-background-checked': '#ffffff',
                        '--track-background': 'rgba(255,255,255,0.35)',
                        '--track-background-checked': 'rgba(255,255,255,0.55)',
                      } as any}
                      onIonChange={e => {
                        setSettings({
                          ...settings,
                          adminAccessComingSoon: e.target.checked,
                        } as any);
                      }}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
