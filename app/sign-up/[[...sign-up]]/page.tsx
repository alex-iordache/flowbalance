'use client';

import { SignUp } from '@clerk/nextjs';
import { IonPage, IonContent, IonButton } from '@ionic/react';
import { useEffect, useState } from 'react';

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
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [clerkPublishableKey, setClerkPublishableKey] = useState<string>('Loading...');

  useEffect(() => {
    const errorList: string[] = [];
    const warningList: string[] = [];

    const originalError = console.error;
    const originalWarn = console.warn;

    // Keep state in sync as logs happen (otherwise we only see initial empty arrays)
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

      // Current URL
      info.push(`Current URL: ${window.location.href}`);
      info.push(`Pathname: ${window.location.pathname}`);
      info.push(`Search: ${window.location.search}`);
      info.push(`Hash: ${window.location.hash}`);

      // User Agent
      info.push(`\nUser Agent: ${navigator.userAgent}`);

      // Screen info
      info.push(`\nScreen: ${window.screen.width}x${window.screen.height}`);
      info.push(`Viewport: ${window.innerWidth}x${window.innerHeight}`);

      // Clerk environment variables
      info.push(`\nClerk Environment Variables:`);
      info.push(`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: ${process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'not set'}`);
      info.push(`NEXT_PUBLIC_CLERK_SIGN_UP_URL: ${process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || 'not set'}`);
      info.push(`NEXT_PUBLIC_CLERK_SIGN_IN_URL: ${process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || 'not set'}`);
      info.push(`NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: ${process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || 'not set'}`);

      // Clerk SDK info (can load async)
      const clerk = (window as any).Clerk;
      if (clerk) {
        info.push(`\nClerk SDK Info:`);
        info.push(`Clerk loaded: Yes`);
        if (clerk.publishableKey) info.push(`Clerk Publishable Key: ${clerk.publishableKey}`);
        if (clerk.frontendApi) info.push(`Clerk Frontend API: ${clerk.frontendApi}`);
      } else {
        info.push(`\nClerk SDK: Not loaded yet`);
      }

      // Detect which fields Clerk actually rendered (helps debug “mobile vs desktop form”)
      try {
        const container =
          (document.querySelector('[data-debug-container="1"]') as Element | null) || document.body;
        const labels = Array.from(container.querySelectorAll('label'))
          .map(el => (el.textContent || '').trim())
          .filter(Boolean);
        const uniq = Array.from(new Set(labels));
        info.push(`\nRendered label texts (first 30):`);
        info.push(uniq.slice(0, 30).join(' | ') || '(none detected)');

        const hasFirst = uniq.some(t => /first\s*name/i.test(t));
        const hasLast = uniq.some(t => /last\s*name/i.test(t));
        const hasPass = uniq.some(t => /password/i.test(t));
        info.push(`\nDetected fields: firstName=${hasFirst} lastName=${hasLast} password=${hasPass}`);
      } catch (e) {
        info.push(`\nRendered field detection error: ${String(e)}`);
      }

      // Check if in Capacitor
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

    // Build immediately + keep updating briefly so we capture “Clerk loaded” state reliably
    const refresh = () => {
      const snapshot = buildSnapshot();
      setDebugInfo(snapshot);

      // update the small visible key line too
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
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = fullDebug;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        alert('Debug info copied to clipboard!');
      } catch (e) {
        alert('Failed to copy. Please select and copy manually.');
      }
      document.body.removeChild(textArea);
    }
  };

  const hardReload = () => {
    // Force a full document reload (not just SPA navigation) and bust caches.
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
            <SignUp 
              signInUrl="/sign-in"
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

            {/* Debug Box */}
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
