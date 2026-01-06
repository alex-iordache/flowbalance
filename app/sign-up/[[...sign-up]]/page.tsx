'use client';

import { SignUp } from '@clerk/nextjs';
import { IonPage, IonContent } from '@ionic/react';

/**
 * Sign Up Page (In-App)
 * 
 * Shows Clerk SignUp component configured for email-code-only authentication.
 * After sign-up, users are redirected to home page.
 * 
 * Note: Password must be disabled in Clerk Dashboard > User & Authentication > Email, Phone, Username
 * And Email verification code should be enabled.
 */
export default function SignUpPage() {
  const base =
    typeof window !== 'undefined' ? window.location.origin : 'https://www.flowbalance.app';

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
          <div className="w-full max-w-md space-y-4">
            <SignUp 
              signInUrl="/sign-in"
              // Use an absolute URL to force a full navigation (more reliable in iOS WKWebView)
              fallbackRedirectUrl={`${base}/home?auth=1`}
              forceRedirectUrl={`${base}/home?auth=1`}
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-xl",
                  formButtonPrimary: "bg-purple-600 hover:bg-purple-700",
                  footerActionLink: "text-purple-600 hover:text-purple-700"
                }
              }}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
