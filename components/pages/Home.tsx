import Image from 'next/image';
import Card from '../ui/Card';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonMenuButton,
} from '@ionic/react';
import Notifications from './Notifications';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { notificationsOutline, settingsOutline } from 'ionicons/icons';
import { selectHomeItems } from '../../store/selectors';
import Store from '../../store';
import Logo from '../ui/Logo';

type HelloUserProps ={
  firstName: string;
}

const HelloUser = ({ firstName}: HelloUserProps) => (
  <div className="hello-user-container">
    <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100">Hello, {firstName}!</h2>
    <p className="sm:text-sm text-s text-white mr-1 my-3">For you:</p>
  </div>
)

type SimpleCardCTAProps = {
  minutes: number;
}

const SimpleCardCTA = ({ minutes }: SimpleCardCTAProps) => (
  <div className="bg-white text-black block w-full max-w-sm mx-auto p-6 border border-gray-200 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
      <p className="text-gray-600">Stress Break Ziua 1 - 5 min</p>
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
        <HelloUser firstName="Alex"/>
        <SimpleCardCTA minutes={5} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
