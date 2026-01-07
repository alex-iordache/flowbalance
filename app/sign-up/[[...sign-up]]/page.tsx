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
  return (
    <IonPage>
      <IonContent scrollY={true}>
        <div 
          className="flex flex-col items-center justify-center min-h-full p-4"
          style={{
            paddingTop: 'env(safe-area-inset-top)',
            paddingBottom: 'env(safe-area-inset-bottom)',
            background: 'var(--fb-bg)',
          }}
        >
          <div className="w-full max-w-md space-y-4">
            <SignUp 
              routing="virtual"
              signInUrl="/sign-in"
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-xl",
                  // iOS Safari/WKWebView zooms the page when focusing inputs with font-size < 16px.
                  // Force 16px to prevent the post-keyboard "stuck zoom" bug on first sign-up/sign-in.
                  formFieldInput: "text-[16px]",
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
