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
  const [runtimeUrl, setRuntimeUrl] = useState<string>(''); // avoid SSR/CSR mismatch
  const [runtimeUserAgent, setRuntimeUserAgent] = useState<string>(''); // avoid SSR/CSR mismatch

  useEffect(() => {
    // Capture runtime-only values in an effect so SSR HTML matches initial client render.
    try {
      setRuntimeUrl(window.location.href);
      setRuntimeUserAgent(navigator.userAgent);
    } catch {
      // ignore
    }

    // Best-effort: populate publishable key from runtime Clerk instance or env var
    try {
      const pk =
        (window as any)?.Clerk?.publishableKey ??
        process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ??
        'not set';
      setClerkPublishableKey(String(pk));
    } catch {
      setClerkPublishableKey(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? 'not set');
    }

    // Collect debug information
    const info: string[] = [];
    const errorList: string[] = [];
    const warningList: string[] = [];

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

    // Try to get Clerk instance info
    if (typeof window !== 'undefined' && (window as any).Clerk) {
      const clerk = (window as any).Clerk;
      info.push(`\nClerk SDK Info:`);
      try {
        info.push(`Clerk loaded: Yes`);
        if (clerk.publishableKey) {
          info.push(`Clerk Publishable Key: ${clerk.publishableKey}`);
        }
      } catch (e) {
        info.push(`Clerk SDK error: ${String(e)}`);
      }
    } else {
      info.push(`\nClerk SDK: Not loaded yet`);
    }

    // Check if in Capacitor
    if (typeof window !== 'undefined' && (window as any).Capacitor) {
      info.push(`\nCapacitor: Detected`);
      const Capacitor = (window as any).Capacitor;
      info.push(`Platform: ${Capacitor.getPlatform()}`);
      info.push(`Is Native: ${Capacitor.isNativePlatform()}`);
    } else {
      info.push(`\nCapacitor: Not detected (Web browser)`);
    }

    // Console errors and warnings
    const originalError = console.error;
    const originalWarn = console.warn;

    console.error = (...args: any[]) => {
      errorList.push(args.map(arg => String(arg)).join(' '));
      originalError.apply(console, args);
    };

    console.warn = (...args: any[]) => {
      warningList.push(args.map(arg => String(arg)).join(' '));
      originalWarn.apply(console, args);
    };

    // Update state
    setErrors(errorList);
    setWarnings(warningList);
    setDebugInfo(info.join('\n'));

    // Cleanup
    return () => {
      console.error = originalError;
      console.warn = originalWarn;
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
            <div className="bg-gray-900 text-white rounded-lg p-4 text-xs font-mono max-h-64 overflow-y-auto">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-sm">Debug Info</h3>
                <IonButton 
                  size="small" 
                  fill="outline" 
                  onClick={copyToClipboard}
                  className="text-xs"
                >
                  Copy All
                </IonButton>
              </div>
              
              <div className="space-y-2">
                <div className="text-green-400">
                  <strong>URL:</strong> {runtimeUrl || 'Loading...'}
                </div>
                
                <div className="text-purple-400 break-all">
                  <strong>Clerk Publishable Key:</strong> {clerkPublishableKey}
                </div>
                
                <div className="text-blue-400">
                  <strong>User Agent:</strong>{' '}
                  {runtimeUserAgent ? `${runtimeUserAgent.substring(0, 80)}...` : 'Loading...'}
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
