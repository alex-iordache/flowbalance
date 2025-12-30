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
import { SignedIn, SignedOut, useClerk } from '@clerk/nextjs';

import Store from '../../store';
import * as selectors from '../../store/selectors';
import { setSettings } from '../../store/actions';

const Settings = () => {
  const settings = Store.useState(selectors.selectSettings);
  const { signOut } = useClerk();

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
          
          {/* Show Manage Subscription and Sign Out when user is signed in */}
          <SignedIn>
            <IonItem>
              <IonButton
                expand="block"
                color="secondary"
                className="w-full mb-2"
                onClick={async () => {
                  try {
                    // Get sign-in token for external browser authentication
                    const response = await fetch('/api/create-sign-in-token');
                    const data = await response.json();
                    
                    const { openExternalUrl } = await import('../../helpers/openExternal');
                    
                    if (data.token) {
                      // Pass token to external browser for auto sign-in
                      await openExternalUrl(`https://flowbalance-jdk.vercel.app/subscribe-web?__clerk_ticket=${data.token}`);
                    } else {
                      // Fallback: open without token (user will need to sign in manually)
                      await openExternalUrl('https://flowbalance-jdk.vercel.app/subscribe-web');
                    }
                  } catch (error) {
                    console.error('Error opening subscription:', error);
                    const { openExternalUrl } = await import('../../helpers/openExternal');
                    await openExternalUrl('https://flowbalance-jdk.vercel.app/subscribe-web');
                  }
                }}
              >
                Manage Subscription
              </IonButton>
            </IonItem>
            <IonItem>
              <IonButton
                expand="block"
                color="danger"
                className="w-full"
                onClick={handleSignOut}
              >
                Sign Out
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
