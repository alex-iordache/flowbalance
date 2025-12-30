'use client';

import { SignIn } from '@clerk/nextjs';
import { IonPage, IonContent } from '@ionic/react';

/**
 * Sign In Page
 * 
 * Simple link opens browser to web sign-up page.
 */
export default function SignInPage() {
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
            
            {/* Simple Link to Create Account */}
            <div className="mt-6 text-center">
              <p className="text-white mb-3">Don&apos;t have an account?</p>
              <a 
                href="https://flowbalance-jdk.vercel.app/sign-up-web"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-white text-purple-600 font-bold py-4 px-6 rounded-lg hover:bg-gray-100 transition-colors text-center text-lg"
              >
                Create Account on Web
              </a>
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
