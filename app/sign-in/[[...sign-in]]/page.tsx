'use client';

import { SignIn } from '@clerk/nextjs';
import { IonPage, IonContent, IonButton } from '@ionic/react';
import { App } from '@capacitor/app';

/**
 * Sign In Page
 * 
 * Uses App.openUrl() to open sign-up in system browser.
 */
export default function SignInPage() {
  const handleCreateAccount = async () => {
    // Opens in SYSTEM browser (Chrome/Safari), not in-app
    await App.openUrl({
      url: 'https://flowbalance-jdk.vercel.app/sign-up-web'
    });
  };

  return (
    <IonPage>
      <IonContent scrollY={true}>
        <div 
          className="flex flex-col items-center justify-center min-h-full bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 p-4"
          style={{
            paddingTop: 'env(safe-area-inset-top)',
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          <div className="w-full max-w-md">
            <SignIn 
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-xl",
                  formButtonPrimary: "bg-purple-600 hover:bg-purple-700",
                  footerActionLink: "text-purple-600 hover:text-purple-700"
                }
              }}
            />
            
            {/* Create Account Button */}
            <div className="mt-6 text-center">
              <p className="text-white mb-3">Don&apos;t have an account?</p>
              <IonButton
                expand="block"
                color="light"
                size="large"
                onClick={handleCreateAccount}
              >
                Create Account on Web
              </IonButton>
              <p className="text-white text-sm mt-2 opacity-80">
                Opens in your browser, then return here to sign in
              </p>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
