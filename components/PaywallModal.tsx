'use client';

import {
  IonButton,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
} from '@ionic/react';
import { checkmarkCircle, closeOutline } from 'ionicons/icons';
import { useAccessControl } from '../hooks/useAccessControl';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  practiceName?: string;
}

/**
 * PaywallModal Component
 * 
 * Displays when user tries to access locked content.
 * - Organization users: Should never see this (handled in parent)
 * - Guest users: Prompted to sign up + payment (external browser)
 * - Free users: Prompted to upgrade to pro (external browser)
 */
export default function PaywallModal({ isOpen, onClose, practiceName }: PaywallModalProps) {
  const { userType, isAuthenticated } = useAccessControl();

  const handleUpgrade = () => {
    // Redirect to subscribe page where Clerk's PricingTable will handle everything
    // Clerk will automatically open Stripe checkout in external browser
    // to avoid Google Play fees
    window.location.href = '/subscribe';
  };

  const handleSignUpFirst = () => {
    // Guest users need to sign up first, then they'll see the subscribe page
    // IMPORTANT: Direct to /sign-up, not /sign-in!
    window.location.href = '/sign-up';
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Unlock {practiceName || 'This Practice'}</IonTitle>
          <IonButton slot="end" fill="clear" onClick={onClose}>
            <IonIcon icon={closeOutline} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="flex flex-col items-center justify-center min-h-full">
          <h2 className="text-2xl font-bold mb-4 text-center">
            {!isAuthenticated ? 'Create an Account' : 'Upgrade to Pro'}
          </h2>

          <p className="text-center mb-6">
            {!isAuthenticated 
              ? 'Sign up to unlock all meditation practices and flows.'
              : 'Upgrade to Pro to access all premium content.'}
          </p>

          {/* Benefits List */}
          <IonList className="w-full mb-6">
            <IonItem>
              <IonIcon icon={checkmarkCircle} color="success" slot="start" />
              <IonLabel>Access to all flows and practices</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={checkmarkCircle} color="success" slot="start" />
              <IonLabel>Offline access to content</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={checkmarkCircle} color="success" slot="start" />
              <IonLabel>Track your progress</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={checkmarkCircle} color="success" slot="start" />
              <IonLabel>New content added regularly</IonLabel>
            </IonItem>
          </IonList>

          {/* Action Buttons */}
          <div className="w-full space-y-4">
            {!isAuthenticated ? (
              <>
                <IonButton 
                  expand="block" 
                  size="large"
                  onClick={handleSignUpFirst}
                >
                  Sign Up & Subscribe
                </IonButton>
                <p className="text-center text-sm opacity-70">
                  You&apos;ll be able to choose your plan after signing up
                </p>
              </>
            ) : (
              <>
                <IonButton 
                  expand="block" 
                  size="large"
                  color="primary"
                  onClick={handleUpgrade}
                >
                  Upgrade to Pro
                </IonButton>
                <p className="text-center text-sm opacity-70">
                  Opens in browser to complete payment
                </p>
              </>
            )}

            <IonButton 
              expand="block" 
              fill="clear"
              onClick={onClose}
            >
              Maybe Later
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
}
