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
} from '@ionic/react';
import { SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs';

import Store from '../../store';
import * as selectors from '../../store/selectors';
import { setSettings } from '../../store/actions';

const Settings = () => {
  const settings = Store.useState(selectors.selectSettings);

  const handleSignOutComplete = () => {
    // This runs AFTER Clerk completes the sign-out
    window.location.href = '/home';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
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
              Enable Notifications
            </IonToggle>
          </IonItem>
        </IonList>

        {/* Account Section */}
        <IonList>
          <IonListHeader>Account</IonListHeader>
          
          {/* Show Sign Out button when user is signed in */}
          <SignedIn>
            <IonItem>
              <SignOutButton signOutCallback={handleSignOutComplete}>
                <IonButton
                  expand="block"
                  color="danger"
                  className="w-full"
                >
                  Sign Out
                </IonButton>
              </SignOutButton>
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
                Sign In
              </IonButton>
            </IonItem>
          </SignedOut>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
