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
  IonSegment,
  IonSegmentButton,
} from '@ionic/react';
import { checkmarkCircle, closeOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
  const [period, setPeriod] = useState<'month' | 'annual'>('month');
  const history = useHistory();

  const handleSubscribe = () => {
    onClose();
    const returnTo =
      typeof window !== 'undefined'
        ? `${window.location.pathname}${window.location.search}`
        : '/home';
    history.push(`/subscribe?period=${period}&return=${encodeURIComponent(returnTo)}`);
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="text-white">Subscribe to Flow Premium</IonTitle>
          <IonButton slot="end" fill="clear" onClick={onClose}>
            <IonIcon icon={closeOutline} className="text-white" />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="flex flex-col items-center justify-center min-h-full">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">
            Upgrade to Pro
          </h2>

          <p className="text-center mb-6 text-white">
            Subscribe to unlock all meditation practices and flows.
          </p>

          <div className="w-full mb-4">
            <IonSegment
              value={period}
              onIonChange={e => setPeriod((e.detail.value as 'month' | 'annual') || 'month')}
            >
              <IonSegmentButton value="month">
                <IonLabel>Monthly</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="annual">
                <IonLabel>Yearly</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </div>

          {/* Benefits List */}
          <IonList className="w-full mb-6 rounded-2xl overflow-hidden">
            <IonItem>
              <IonIcon icon={checkmarkCircle} color="success" slot="start" />
              <IonLabel className="text-white">Access to all flows and practices</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={checkmarkCircle} color="success" slot="start" />
              <IonLabel className="text-white">Guided programs for stress, focus, and sleep</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={checkmarkCircle} color="success" slot="start" />
              <IonLabel className="text-white">Track your progress</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={checkmarkCircle} color="success" slot="start" />
              <IonLabel className="text-white">New content added regularly</IonLabel>
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
              Upgrade Flow to Pro
            </IonButton>
            <p className="text-center text-sm opacity-70 text-white">
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
