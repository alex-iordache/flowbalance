'use client';

import { SignIn } from '@clerk/nextjs';
import { IonPage, IonContent } from '@ionic/react';

/**
 * Sign In Page
 * 
 * Shows Clerk SignIn component configured for email-code-only authentication.
 * After sign-in, users are redirected to home page.
 * Sign-up URL points to in-app sign-up page.
 */
export default function SignInPage() {
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
          <div className="w-full max-w-md">
            <SignIn 
              routing="virtual"
              signUpUrl="/sign-up"
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-xl",
                  // iOS Safari/WKWebView zooms the page when focusing inputs with font-size < 16px.
                  // Force 16px to prevent the post-keyboard "stuck zoom" bug on first sign-in.
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
