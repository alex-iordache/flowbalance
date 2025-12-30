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

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  practiceName?: string;
}

/**
 * PaywallModal Component
 * 
 * Displays when user tries to access locked content.
 * Opens subscription page directly in external browser with authentication token.
 */
export default function PaywallModal({ isOpen, onClose, practiceName }: PaywallModalProps) {
  const handleSubscribe = async () => {
    try {
      // Get sign-in token for external browser authentication
      const response = await fetch('/api/create-sign-in-token');
      const data = await response.json();
      
      const { openExternalUrl } = await import('../helpers/openExternal');
      
      if (data.token) {
        // Pass token to external browser for auto sign-in
        await openExternalUrl(`https://flowbalance-jdk.vercel.app/subscribe-web?__clerk_ticket=${data.token}`);
      } else {
        // Fallback: open without token
        await openExternalUrl('https://flowbalance-jdk.vercel.app/subscribe-web');
      }
    } catch (error) {
      console.error('Error opening subscription:', error);
      const { openExternalUrl } = await import('../helpers/openExternal');
      await openExternalUrl('https://flowbalance-jdk.vercel.app/subscribe-web');
    }
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
            Upgrade to Pro
          </h2>

          <p className="text-center mb-6">
            Subscribe to unlock all meditation practices and flows.
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
            <IonButton 
              expand="block" 
              size="large"
              color="primary"
              onClick={handleSubscribe}
            >
              View Plans & Subscribe
            </IonButton>
            <p className="text-center text-sm opacity-70">
              Opens in browser to complete payment
            </p>

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
