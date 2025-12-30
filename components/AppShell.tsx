'use client';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { StatusBar, Style } from '@capacitor/status-bar';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { useEffect } from 'react';

import Tabs from './pages/Tabs';
import { loadAllPersistedState } from '../store/persistence';

setupIonicReact({});

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', async status => {
    try {
      await StatusBar.setStyle({
        style: status.matches ? Style.Dark : Style.Light,
      });
    } catch {}
  });

const AppShell = () => {
  useEffect(() => {
    // Load persisted state when app initializes
    loadAllPersistedState();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          {/* Main app routes - accessible to everyone (guest or authenticated) */}
          {/* Access control will be handled at the practice/content level */}
          <Route path="/home" component={Tabs} />
          <Route path="/flows" component={Tabs} />
          <Route path="/settings" component={Tabs} />
          <Route path="/progress" component={Tabs} />
          
          {/* Root route - redirects to home */}
          <Route path="/" exact={true}>
            <Redirect to="/home" />
          </Route>
          
          {/* Catch-all route - redirects to home */}
          <Route>
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppShell;
