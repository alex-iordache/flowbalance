'use client';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { StatusBar, Style } from '@capacitor/status-bar';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { useEffect } from 'react';

import Tabs from './pages/Tabs';
import AuthGuard from './AuthGuard';
import { loadAllPersistedState } from '../store/persistence';
import DeepLinkReturnHandler from './DeepLinkReturnHandler';
import HardwareBackHandler from './HardwareBackHandler';
import CategoryThemeSync from './CategoryThemeSync';
import ChunkLoadRecovery from './ChunkLoadRecovery';
import OverlayManager from './OverlayManager';
import OnboardingGuard from './OnboardingGuard';
import OfflineGuard from './OfflineGuard';
import ErrorBoundary from './ui/ErrorBoundary';

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
    // Prevent iOS "page shake" / white flashes during Ionic transitions by ensuring the
    // document body itself matches the app background and does not scroll behind the webview.
    document.body.classList.add('fb-in-app');
    return () => document.body.classList.remove('fb-in-app');
  }, []);

  return (
    <AuthGuard>
      <ErrorBoundary title="App error">
        <IonApp>
          <IonReactRouter>
            <DeepLinkReturnHandler />
            <HardwareBackHandler />
            <CategoryThemeSync />
            <ChunkLoadRecovery />
            <OfflineGuard />
            <OnboardingGuard />
            <OverlayManager />
            <IonRouterOutlet id="main" animated={false}>
              {/* Main app routes - protected by AuthGuard */}
              <Route path="/home" component={Tabs} />
              <Route path="/flows" component={Tabs} />
              <Route path="/settings" component={Tabs} />
              <Route path="/progress" component={Tabs} />
              <Route path="/practices" component={Tabs} />
              <Route path="/suggest-recording" component={Tabs} />
              {/* IMPORTANT: keep this exact so it does not catch `/subscribe-web/*` return URLs on iOS */}
              <Route path="/subscribe" component={Tabs} exact={true} />

              {/* Root route - redirects to home */}
              <Route path="/" exact={true}>
                <Redirect to="/home" />
              </Route>
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </ErrorBoundary>
    </AuthGuard>
  );
};

export default AppShell;
