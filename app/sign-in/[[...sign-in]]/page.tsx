'use client';

import { useEffect } from 'react';
import { SignIn } from '@clerk/nextjs';
import { IonPage, IonContent } from '@ionic/react';
import { openExternalUrl } from '../../../helpers/openExternal';

/**
 * Sign In Page
 * 
 * Only shows the Clerk SignIn component.
 * signUpUrl points to the web sign-up page (/sign-up-web).
 * On native, we intercept the link to open in the system browser.
 * After sign-in, redirect to subscription page.
 */
export default function SignInPage() {
  useEffect(() => {
    const handler = async (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      if (!href.includes('/sign-up-web')) return;
      e.preventDefault();
      e.stopPropagation();
      await openExternalUrl('https://flowbalance-jdk.vercel.app/sign-up-web');
    };
    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, []);

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
              signUpUrl="/sign-up-web"
              afterSignInUrl="/subscribe-web"
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
