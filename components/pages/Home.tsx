'use client';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
} from '@ionic/react';
import Notifications from './Notifications';
import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { settingsOutline } from 'ionicons/icons';
import Logo from '../ui/Logo';
import { useUser } from '@clerk/nextjs';
import { Preferences } from '@capacitor/preferences';
import Store from '../../store';

type HelloUserProps ={
  firstName?: string;
}

function getGreetingForLocalTime(
  now: Date,
  lang: 'ro' | 'en',
): 'Good morning' | 'Hello' | 'Good evening' | 'Bună dimineața' | 'Salut' | 'Bună seara' {
  const h = now.getHours();
  const morning = h >= 5 && h < 12;
  const evening = h >= 18 || h < 5;
  if (lang === 'ro') {
    if (morning) return 'Bună dimineața';
    if (evening) return 'Bună seara';
    return 'Salut';
  }
  if (morning) return 'Good morning';
  if (evening) return 'Good evening';
  return 'Hello';
}

const HelloUser = ({ firstName, lang }: HelloUserProps & { lang: 'ro' | 'en' }) => (
  <div className="hello-user-container">
    <h2 className="text-lg text-gray-800 dark:text-gray-100">
      {(() => {
        const greeting = getGreetingForLocalTime(new Date(), lang);
        return firstName ? `${greeting}, ${firstName}!` : `${greeting}!`;
      })()}
    </h2>
    <p className="sm:text-sm text-s text-white mr-1 my-3">{lang === 'ro' ? 'Pentru tine:' : 'For you:'}</p>
  </div>
)

type SimpleCardCTAProps = {
  minutes: number;
}

const SimpleCardCTA = ({ minutes }: SimpleCardCTAProps) => (
  <div className="bg-white text-black block w-full max-w-sm mx-auto p-6 border border-gray-200 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
      <p className="text-gray-600">Stress Break Ziua 1 - {minutes} min</p>
      <h5 className="mb-3 text-2xl font-semibold tracking-tight text-black leading-8">Stress Break</h5>
      <button className="inline-flex items-center justify-center text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-300 shadow-sm font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none transition-colors">
          Continue
          <svg className="w-4 h-4 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
      </button>
  </div>
)
const Home = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const history = useHistory();
  const { user, isLoaded } = useUser();
  const lang = Store.useState(s => s.settings.language);

  const displayFirstNameFromClerk = useMemo(() => {
    if (!isLoaded || !user) return '';
    const first = (user.firstName ?? '').trim();
    if (first) return first;
    const full = (user.fullName ?? '').trim();
    if (full) return full.split(/\s+/)[0] ?? '';
    const primaryEmail = user.primaryEmailAddress?.emailAddress ?? '';
    if (primaryEmail.includes('@')) return primaryEmail.split('@')[0] ?? '';
    return '';
  }, [isLoaded, user]);

  const [firstName, setFirstName] = useState<string>('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { value } = await Preferences.get({ key: 'flow_user_first_name' });
        if (!cancelled && value) setFirstName(value);
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!displayFirstNameFromClerk) return;
    setFirstName(displayFirstNameFromClerk);
    (async () => {
      try {
        await Preferences.set({ key: 'flow_user_first_name', value: displayFirstNameFromClerk });
      } catch {
        // ignore
      }
    })();
  }, [displayFirstNameFromClerk]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Logo />
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/settings')}>
              <IonIcon icon={settingsOutline} className="text-white text-2xl" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <Notifications
          open={showNotifications}
          onDidDismiss={() => setShowNotifications(false)}
        />
        <HelloUser firstName={firstName} lang={lang} />
        <SimpleCardCTA minutes={5} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
