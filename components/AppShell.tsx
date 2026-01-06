'use client';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { StatusBar, Style } from '@capacitor/status-bar';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { useEffect } from 'react';

import Tabs from './pages/Tabs';
import AuthGuard from './AuthGuard';
import { loadAllPersistedState } from '../store/persistence';
import Subscribe from './pages/Subscribe';
import DeepLinkReturnHandler from './DeepLinkReturnHandler';
import WindowOpenLogger from './WindowOpenLogger';
import NavigationLogger from './NavigationLogger';

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
    <AuthGuard>
      <IonApp>
        <IonReactRouter>
          {/* Temporary instrumentation: log all window.open calls to localStorage for debugging */}
          <WindowOpenLogger />
          {/* Temporary instrumentation: log navigation attempts (clicks + location/history) */}
          <NavigationLogger />
          <DeepLinkReturnHandler />
          <IonRouterOutlet id="main">
            {/* Main app routes - protected by AuthGuard */}
            <Route path="/home" component={Tabs} />
            <Route path="/flows" component={Tabs} />
            <Route path="/settings" component={Tabs} />
            <Route path="/progress" component={Tabs} />
            <Route path="/subscribe" component={Subscribe} />

            {/* Root route - redirects to home */}
            <Route path="/" exact={true}>
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </AuthGuard>
  );
};

export default AppShell;
