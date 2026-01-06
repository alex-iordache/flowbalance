import {
  IonPage,
  IonHeader,
  IonItem,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonListHeader,
  IonToggle,
  IonButton,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { SignedIn, SignedOut, useClerk } from '@clerk/nextjs';

import Store from '../../store';
import * as selectors from '../../store/selectors';
import { setSettings } from '../../store/actions';
import { useHistory } from 'react-router-dom';

const Settings = () => {
  const settings = Store.useState(selectors.selectSettings);
  const { signOut } = useClerk();
  const history = useHistory();
  const isRo = settings.language === 'ro';

  const handleSignOut = async () => {
    // Sign out with Clerk
    await signOut();
    // Redirect to sign-in page after sign out
    window.location.href = '/sign-in';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{isRo ? 'Setări' : 'Settings'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonToggle
              checked={settings.enableNotifications}
              onIonChange={e => {
                setSettings({
                  ...settings,
                  enableNotifications: e.target.checked,
                });
              }}
            >
              {isRo ? 'Notificări' : 'Enable Notifications'}
            </IonToggle>
          </IonItem>

          <IonItem>
            <IonLabel>{isRo ? 'Limbă' : 'Language'}</IonLabel>
            <IonSelect
              value={settings.language}
              interface="popover"
              onIonChange={(e) => {
                const next = (e.detail.value === 'ro' ? 'ro' : 'en') as typeof settings.language;
                setSettings({ ...settings, language: next });
              }}
            >
              <IonSelectOption value="en">English</IonSelectOption>
              <IonSelectOption value="ro">Română</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>

        {/* Account Section */}
        <IonList>
          <IonListHeader>{isRo ? 'Cont' : 'Account'}</IonListHeader>
          
          {/* Show Manage Subscription and Sign Out when user is signed in */}
          <SignedIn>
            <IonItem>
              <IonButton
                expand="block"
                color="secondary"
                className="w-full mb-2"
                onClick={() => history.push(`/subscribe?return=${encodeURIComponent('/settings')}`)}
              >
                {isRo ? 'Abonament' : 'Manage Subscription'}
              </IonButton>
            </IonItem>
            <IonItem>
              <IonButton
                expand="block"
                color="danger"
                className="w-full"
                onClick={handleSignOut}
              >
                {isRo ? 'Deconectare' : 'Sign Out'}
              </IonButton>
            </IonItem>
          </SignedIn>
          
          {/* Show Sign In button when user is NOT signed in */}
          <SignedOut>
            <IonItem>
              <IonButton
                expand="block"
                color="primary"
                className="w-full"
                onClick={() => window.location.href = '/sign-in'}
              >
                {isRo ? 'Autentificare' : 'Sign In'}
              </IonButton>
            </IonItem>
          </SignedOut>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
