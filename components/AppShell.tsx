'use client';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { StatusBar, Style } from '@capacitor/status-bar';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { SignedIn, SignedOut, useAuth } from '@clerk/nextjs';

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

const SignOutRedirect = () => {
  const { isLoaded, userId } = useAuth();
  
  useEffect(() => {
    if (isLoaded && !userId) {
      // User is not signed in, redirect to sign-in page
      window.location.href = '/sign-in';
    }
  }, [isLoaded, userId]);
  
  return <div>Loading...</div>;
};

const AppShell = () => {
  useEffect(() => {
    // Load persisted state when app initializes
    loadAllPersistedState();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          {/* Main app routes - protected by Clerk middleware */}
          <Route path="/home" render={() => (
            <SignedIn>
              <Tabs />
            </SignedIn>
          )} />
          
          <Route path="/flows" render={() => (
            <SignedIn>
              <Tabs />
            </SignedIn>
          )} />
          
          <Route path="/settings" render={() => (
            <SignedIn>
              <Tabs />
            </SignedIn>
          )} />
          
          <Route path="/progress" render={() => (
            <SignedIn>
              <Tabs />
            </SignedIn>
          )} />
          
          {/* Root route - redirects based on auth status */}
          <Route path="/" exact={true} render={() => (
            <>
              <SignedIn>
                <Redirect to="/home" />
              </SignedIn>
              <SignedOut>
                <SignOutRedirect />
              </SignedOut>
            </>
          )} />
          
          {/* Catch-all route */}
          <Route render={() => (
            <>
              <SignedIn>
                <Redirect to="/home" />
              </SignedIn>
              <SignedOut>
                <SignOutRedirect />
              </SignedOut>
            </>
          )} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppShell;
