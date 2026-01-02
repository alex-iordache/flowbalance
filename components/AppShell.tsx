'use client';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { StatusBar, Style } from '@capacitor/status-bar';
import { App as CapacitorApp } from '@capacitor/app';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { useEffect } from 'react';

import Tabs from './pages/Tabs';
import AuthGuard from './AuthGuard';
import { loadAllPersistedState } from '../store/persistence';
import Subscribe from './pages/Subscribe';

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

  useEffect(() => {
    // Handle deep links from the external browser checkout flow.
    // Example: com.flowapp.app://sso-callback?subscribed=1&return=/flows/Connect/Connect-Ziua-002
    let handle: { remove: () => Promise<void> } | null = null;

    (async () => {
      try {
        handle = await CapacitorApp.addListener('appUrlOpen', ({ url }) => {
          try {
            const u = new URL(url);
            if (u.protocol !== 'com.flowapp.app:' || u.hostname !== 'sso-callback') return;
            const returnTo = u.searchParams.get('return') || '/home';
            if (returnTo.startsWith('/') && !returnTo.startsWith('//')) {
              window.location.href = returnTo;
            } else {
              window.location.href = '/home';
            }
          } catch {
            // ignore
          }
        });
      } catch {
        // ignore
      }
    })();

    return () => {
      void handle?.remove();
    };
  }, []);

  return (
    <AuthGuard>
      <IonApp>
        <IonReactRouter>
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
