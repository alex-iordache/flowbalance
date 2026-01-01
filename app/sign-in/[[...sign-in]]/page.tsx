'use client';

import { SignIn } from '@clerk/nextjs';
import { IonButton, IonContent, IonPage } from '@ionic/react';
import { useEffect, useState } from 'react';

/**
 * Sign In Page
 * 
 * Shows Clerk SignIn component configured for email-code-only authentication.
 * After sign-in, users are redirected to home page.
 * Sign-up URL points to in-app sign-up page.
 */
export default function SignInPage() {
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [clerkPublishableKey, setClerkPublishableKey] = useState<string>('Loading...');

  useEffect(() => {
    const errorList: string[] = [];
    const warningList: string[] = [];

    const originalError = console.error;
    const originalWarn = console.warn;

    console.error = (...args: any[]) => {
      const line = args.map(arg => String(arg)).join(' ');
      errorList.push(line);
      setErrors([...errorList]);
      originalError.apply(console, args);
    };

    console.warn = (...args: any[]) => {
      const line = args.map(arg => String(arg)).join(' ');
      warningList.push(line);
      setWarnings([...warningList]);
      originalWarn.apply(console, args);
    };

    const buildSnapshot = () => {
      const info: string[] = [];

      info.push(`Current URL: ${window.location.href}`);
      info.push(`Pathname: ${window.location.pathname}`);
      info.push(`Search: ${window.location.search}`);
      info.push(`Hash: ${window.location.hash}`);

      info.push(`\nUser Agent: ${navigator.userAgent}`);

      info.push(`\nScreen: ${window.screen.width}x${window.screen.height}`);
      info.push(`Viewport: ${window.innerWidth}x${window.innerHeight}`);

      info.push(`\nClerk Environment Variables:`);
      info.push(`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: ${process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'not set'}`);
      info.push(`NEXT_PUBLIC_CLERK_SIGN_IN_URL: ${process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || 'not set'}`);
      info.push(`NEXT_PUBLIC_CLERK_SIGN_UP_URL: ${process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || 'not set'}`);

      const clerk = (window as any).Clerk;
      if (clerk) {
        info.push(`\nClerk SDK Info:`);
        info.push(`Clerk loaded: Yes`);
        if (clerk.publishableKey) info.push(`Clerk Publishable Key: ${clerk.publishableKey}`);
        if (clerk.frontendApi) info.push(`Clerk Frontend API: ${clerk.frontendApi}`);
      } else {
        info.push(`\nClerk SDK: Not loaded yet`);
      }

      if ((window as any).Capacitor) {
        info.push(`\nCapacitor: Detected`);
        const Capacitor = (window as any).Capacitor;
        info.push(`Platform: ${Capacitor.getPlatform()}`);
        info.push(`Is Native: ${Capacitor.isNativePlatform()}`);
      } else {
        info.push(`\nCapacitor: Not detected (Web browser)`);
      }

      return info.join('\n');
    };

    const refresh = () => {
      setDebugInfo(buildSnapshot());
      const clerk = (window as any).Clerk;
      const key =
        (clerk && clerk.publishableKey) ||
        process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
        'Not found';
      setClerkPublishableKey(key);
    };

    refresh();
    const intervalId = window.setInterval(refresh, 500);
    const stopId = window.setTimeout(() => window.clearInterval(intervalId), 8000);

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
      window.clearInterval(intervalId);
      window.clearTimeout(stopId);
    };
  }, []);

  const copyToClipboard = async () => {
    const fullDebug = [
      '=== DEBUG INFO ===',
      debugInfo,
      '',
      '=== ERRORS ===',
      errors.length > 0 ? errors.join('\n') : 'No errors',
      '',
      '=== WARNINGS ===',
      warnings.length > 0 ? warnings.join('\n') : 'No warnings',
      '',
      '=== TIMESTAMP ===',
      new Date().toISOString(),
    ].join('\n');

    try {
      await navigator.clipboard.writeText(fullDebug);
      alert('Debug info copied to clipboard!');
    } catch {
      alert('Failed to copy. Please select and copy manually.');
    }
  };

  const hardReload = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('__cache_bust', String(Date.now()));
    window.location.href = url.toString();
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
          <div className="w-full max-w-md mx-auto space-y-4" data-debug-container="1">
            <SignIn 
              signUpUrl="/sign-up"
              fallbackRedirectUrl="/home"
              forceRedirectUrl="/home"
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-xl",
                  formButtonPrimary: "bg-purple-600 hover:bg-purple-700",
                  footerActionLink: "text-purple-600 hover:text-purple-700"
                }
              }}
            />

            {/* Debug Box (mobile-friendly) */}
            <div className="bg-gray-900 text-white rounded-lg p-4 text-xs font-mono max-h-64 overflow-y-auto w-full max-w-md mx-auto">
              <div className="flex flex-col gap-2 mb-3">
                <h3 className="font-bold text-sm">Debug Info</h3>
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <IonButton
                    size="small"
                    fill="outline"
                    expand="block"
                    onClick={hardReload}
                    className="text-xs w-full"
                  >
                    Hard reload
                  </IonButton>
                  <IonButton
                    size="small"
                    fill="outline"
                    expand="block"
                    onClick={copyToClipboard}
                    className="text-xs w-full"
                  >
                    Copy All
                  </IonButton>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-green-400">
                  <strong>URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'N/A'}
                </div>

                <div className="text-purple-400 break-all">
                  <strong>Clerk Publishable Key:</strong> {clerkPublishableKey}
                </div>

                <div className="text-blue-400">
                  <strong>User Agent:</strong> {typeof navigator !== 'undefined' ? navigator.userAgent.substring(0, 80) + '...' : 'N/A'}
                </div>

                {errors.length > 0 && (
                  <div className="text-red-400">
                    <strong>Errors ({errors.length}):</strong>
                    <ul className="list-disc list-inside ml-2">
                      {errors.slice(0, 5).map((error, i) => (
                        <li key={i} className="break-words">{error.substring(0, 100)}...</li>
                      ))}
                    </ul>
                  </div>
                )}

                {warnings.length > 0 && (
                  <div className="text-yellow-400">
                    <strong>Warnings ({warnings.length}):</strong>
                    <ul className="list-disc list-inside ml-2">
                      {warnings.slice(0, 5).map((warning, i) => (
                        <li key={i} className="break-words">{warning.substring(0, 100)}...</li>
                      ))}
                    </ul>
                  </div>
                )}

                {errors.length === 0 && warnings.length === 0 && (
                  <div className="text-gray-400">No errors or warnings</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
