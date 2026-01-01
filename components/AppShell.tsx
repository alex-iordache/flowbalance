'use client';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { StatusBar, Style } from '@capacitor/status-bar';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { App as CapApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';

import Tabs from './pages/Tabs';
import AuthGuard from './AuthGuard';
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

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    let handle: { remove: () => void } | null = null;

    CapApp.addListener('appUrlOpen', async ({ url }) => {
      // Handle deep-link coming back from in-app browser after signup
      if (typeof url !== 'string') return;
      if (!url.startsWith('com.flowapp.app://sso-callback')) return;

      try {
        const parsed = new URL(url);
        const flow = parsed.searchParams.get('flow');
        if (flow === 'signup') {
          try {
            await Browser.close();
          } catch {}
          // After returning from sign-up, the WebView still won't share Clerk session cookies,
          // so send user to sign-in inside the app.
          window.location.href = '/sign-in';
        }
      } catch {
        // If URL parsing fails, ignore.
      }
    }).then(h => {
      handle = h;
    });

    return () => {
      handle?.remove();
    };
  }, []);

  return (
    <AuthGuard>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet id="main">
            {/* Main app routes - now protected by AuthGuard */}
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
    </AuthGuard>
  );
};

export default AppShell;
