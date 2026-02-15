import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonToggle,
  IonButton,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonSpinner,
  IonButtons,
} from '@ionic/react';
import { SignedIn, SignedOut, useAuth, useClerk } from '@clerk/nextjs';
import { useMemo, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Store from '../../store';
import * as selectors from '../../store/selectors';
import { setSettings } from '../../store/actions';
import { openExternalUrl } from '../../helpers/openExternal';
import { getWebBaseUrl } from '../../helpers/webBaseUrl';
import { isDesktopWeb } from '../admin/adminEnv';
import Logo from '../ui/Logo';
import { cardOutline, chevronForwardOutline, logInOutline, logOutOutline, trashOutline } from 'ionicons/icons';

function ActionRow({
  label,
  onClick,
  disabled,
  leftIcon,
  right,
  variant = 'default',
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  leftIcon: string;
  right?: React.ReactNode;
  variant?: 'default' | 'danger';
}) {
  const accent = variant === 'danger' ? 'rgba(255, 59, 48, 0.6)' : '#CDAF87';
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      className={`relative w-full text-left rounded-[14px] pl-3.5 pr-4 py-3 flex items-center gap-3.5 ${
        disabled ? 'opacity-70 cursor-default pointer-events-none' : 'active:opacity-95'
      }`}
      style={{
        backgroundColor: '#FBF7F2',
        border: '1px solid rgba(232, 222, 211, 0.85)',
        boxShadow: '0 10px 24px rgba(120, 95, 70, 0.06)',
      }}
    >
      {/* Accent bar */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          top: 10,
          bottom: 10,
          width: 3,
          backgroundColor: accent,
          opacity: 0.75,
          borderRadius: 999,
        }}
      />

      <IonIcon icon={leftIcon} style={{ color: '#7A746C', fontSize: '20px' }} />

      <div
        className="text-[16px] leading-tight truncate flex-1 min-w-0"
        style={{ fontFamily: 'var(--font-logo), ui-serif, Georgia, serif', fontWeight: 600, color: '#4E5B4F' }}
      >
        {label}
      </div>

      <div className="shrink-0 flex items-center gap-2">
        {right}
        <IonIcon icon={chevronForwardOutline} style={{ color: '#7A746C', fontSize: '18px' }} />
      </div>
    </button>
  );
}

const Settings = () => {
  const history = useHistory();
  const settings = Store.useState(selectors.selectSettings);
  const isSuperAdmin = Store.useState(s => s.isSuperAdmin);
  const isEditor = Store.useState(s => s.isEditor);
  const { signOut } = useClerk();
  const { userId, orgId, has, isLoaded } = useAuth();
  const isRo = settings.language === 'ro';
  const [ticket, setTicket] = useState<string | null>(null);
  const [ticketLoading, setTicketLoading] = useState(false);

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#FBF7F2',
    border: '1px solid rgba(232, 222, 211, 0.85)',
    boxShadow: '0 10px 24px rgba(120, 95, 70, 0.08)',
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
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <style>{`
          /* Settings language select: bigger, dark dropdown chevron */
          .fb-lang-select::part(icon) {
            color: #4E5B4F;
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
        <div className="px-5 py-5 pb-10 w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto flex flex-col gap-4">
          <div
            className="text-[26px] md:text-[30px] leading-tight text-center"
            style={{ fontFamily: 'var(--font-logo), ui-serif, Georgia, serif', fontWeight: 600, color: '#4E5B4F' }}
          >
            {isRo ? 'Setări' : 'Settings'}
          </div>
          <div className="mt-1" style={{ borderTop: '1px solid rgba(232, 222, 211, 0.65)' }} />

          {/* Preferences */}
          <div className="rounded-[16px] p-4 md:p-5" style={cardStyle}>
            <div className="flex items-center justify-between gap-3">
              <div className="text-[14px] md:text-[16px] font-semibold" style={{ color: '#4E5B4F' }}>
                {isRo ? 'Notificări' : 'Notifications'}
              </div>
              <IonToggle
                checked={settings.enableNotifications}
                style={{
                  '--handle-background': '#ffffff',
                  '--handle-background-checked': '#ffffff',
                  '--track-background': 'rgba(78, 91, 79, 0.18)',
                  '--track-background-checked': 'rgba(197, 122, 74, 0.35)',
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
              <IonLabel className="text-[14px] md:text-[16px] font-semibold" style={{ color: '#4E5B4F' }}>
                {isRo ? 'Limbă' : 'Language'}
              </IonLabel>
              <div style={{ marginLeft: 'auto' }}>
                <IonSelect
                  className="fb-lang-select"
                  value={settings.language}
                  interface="popover"
                  style={{
                    '--placeholder-color': '#7A746C',
                    '--color': '#4E5B4F',
                    '--icon-color': '#4E5B4F',
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
          <div className="rounded-[16px] p-4 md:p-5" style={cardStyle}>
            <div className="text-[14px] md:text-[16px] font-semibold" style={{ color: '#4E5B4F' }}>
              {isRo ? 'Cont' : 'Account'}
            </div>

            <SignedIn>
              <div className="mt-3 flex flex-col gap-2">
                {showManageSubscription ? (
                  <ActionRow
                    label={ticketLoading ? (isRo ? 'Se pregătește…' : 'Preparing…') : (isRo ? 'Abonament' : 'Manage subscription')}
                    onClick={() => void handleManageSubscription()}
                    disabled={ticketLoading}
                    leftIcon={cardOutline}
                    right={ticketLoading ? <IonSpinner name="crescent" style={{ width: 18, height: 18, color: '#7A746C' }} /> : null}
                  />
                ) : null}
                <ActionRow
                  label={isRo ? 'Șterge contul' : 'Delete my account'}
                  onClick={() => history.push('/settings/delete-account')}
                  leftIcon={trashOutline}
                  variant="danger"
                />
                <ActionRow
                  label={isRo ? 'Deconectare' : 'Sign out'}
                  onClick={handleSignOut}
                  leftIcon={logOutOutline}
                />
              </div>
            </SignedIn>

            <SignedOut>
              <div className="mt-3">
                <ActionRow
                  label={isRo ? 'Autentificare' : 'Sign in'}
                  onClick={() => (window.location.href = '/sign-in')}
                  leftIcon={logInOutline}
                />
              </div>
            </SignedOut>
          </div>

          {/* Admin Settings */}
          {showAdminSettings ? (
            <div className="rounded-[16px] p-4 md:p-5" style={cardStyle}>
              <div className="text-[14px] md:text-[16px] font-semibold" style={{ color: '#4E5B4F' }}>
                {isRo ? 'Setări admin' : 'Admin Settings'}
              </div>

              <div className="mt-3 flex flex-col gap-3">
                {canToggleContentTools ? (
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[14px] md:text-[16px] font-semibold" style={{ color: '#4E5B4F' }}>
                      {isRo ? 'Instrumente editare conținut' : 'Content editing tools'}
                      {!isDesktopWeb() ? (
                        <div className="text-[12px] md:text-[14px] font-normal" style={{ color: '#7A746C' }}>
                          {isRo ? 'Disponibil doar pe desktop web.' : 'Desktop web only.'}
                        </div>
                      ) : null}
                    </div>
                    <IonToggle
                      checked={adminContentEditingTools}
                      style={{
                        '--handle-background': '#ffffff',
                        '--handle-background-checked': '#ffffff',
                        '--track-background': 'rgba(78, 91, 79, 0.18)',
                        '--track-background-checked': 'rgba(197, 122, 74, 0.35)',
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
                    <div className="text-[14px] md:text-[16px] font-semibold" style={{ color: '#4E5B4F' }}>
                      {isRo ? 'Acces “în curând”' : 'Access “coming soon”'}
                    </div>
                    <IonToggle
                      checked={adminAccessComingSoon}
                      style={{
                        '--handle-background': '#ffffff',
                        '--handle-background-checked': '#ffffff',
                        '--track-background': 'rgba(78, 91, 79, 0.18)',
                        '--track-background-checked': 'rgba(197, 122, 74, 0.35)',
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
