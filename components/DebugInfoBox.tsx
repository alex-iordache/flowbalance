'use client';

import { IonButton } from '@ionic/react';
import { useEffect, useMemo, useState } from 'react';

type DebugInfoBoxProps = {
  title?: string;
  maxHeightClassName?: string;
};

export default function DebugInfoBox({
  title = 'Debug Info',
  maxHeightClassName = 'max-h-64',
}: DebugInfoBoxProps) {
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [clerkPublishableKey, setClerkPublishableKey] = useState<string>('Loading...');
  const [runtimeUrl, setRuntimeUrl] = useState<string>(''); // avoid SSR/CSR mismatch
  const [runtimeUserAgent, setRuntimeUserAgent] = useState<string>(''); // avoid SSR/CSR mismatch
  const [windowOpenLog, setWindowOpenLog] = useState<string>(''); // avoid SSR/CSR mismatch
  const [navLog, setNavLog] = useState<string>(''); // avoid SSR/CSR mismatch

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

    // Collect debug information snapshot
    try {
      const info: string[] = [];

      info.push(`Current URL: ${window.location.href}`);
      info.push(`Pathname: ${window.location.pathname}`);
      info.push(`Search: ${window.location.search}`);
      info.push(`Hash: ${window.location.hash}`);

      info.push(`\nUser Agent: ${navigator.userAgent}`);
      info.push(`\nScreen: ${window.screen.width}x${window.screen.height}`);
      info.push(`Viewport: ${window.innerWidth}x${window.innerHeight}`);

      info.push(`\nClerk Environment Variables:`);
      info.push(
        `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: ${process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'not set'}`,
      );
      info.push(
        `NEXT_PUBLIC_CLERK_SIGN_UP_URL: ${process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || 'not set'}`,
      );
      info.push(
        `NEXT_PUBLIC_CLERK_SIGN_IN_URL: ${process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || 'not set'}`,
      );
      info.push(
        `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: ${process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || 'not set'}`,
      );

      if ((window as any).Clerk) {
        const clerk = (window as any).Clerk;
        info.push(`\nClerk SDK Info:`);
        info.push(`Clerk loaded: Yes`);
        if (clerk.publishableKey) info.push(`Clerk Publishable Key: ${clerk.publishableKey}`);
        if (clerk.frontendApi) info.push(`Clerk Frontend API: ${clerk.frontendApi}`);
      } else {
        info.push(`\nClerk SDK: Not loaded yet`);
      }

      if ((window as any).Capacitor) {
        info.push(`\nCapacitor: Detected`);
        const Cap = (window as any).Capacitor;
        info.push(`Platform: ${Cap.getPlatform?.() ?? 'unknown'}`);
        info.push(`Is Native: ${Cap.isNativePlatform?.() ?? 'unknown'}`);
      } else {
        info.push(`\nCapacitor: Not detected (Web browser)`);
      }

      setDebugInfo(info.join('\n'));
    } catch {
      // ignore
    }

    // Capture any persisted window.open logs (if enabled).
    try {
      const raw = localStorage.getItem('fb_window_open_log_v1') || '';
      setWindowOpenLog(raw);
    } catch {
      setWindowOpenLog('');
    }

    // Capture any persisted navigation logs.
    try {
      const raw = localStorage.getItem('fb_nav_log_v1') || '';
      setNavLog(raw);
    } catch {
      setNavLog('');
    }

    // Capture console errors/warnings while mounted
    const originalError = console.error;
    const originalWarn = console.warn;

    console.error = (...args: any[]) => {
      setErrors(prev => [...prev, args.map(a => String(a)).join(' ')]);
      originalError.apply(console, args);
    };

    console.warn = (...args: any[]) => {
      setWarnings(prev => [...prev, args.map(a => String(a)).join(' ')]);
      originalWarn.apply(console, args);
    };

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  const fullDebug = useMemo(() => {
    return [
      '=== DEBUG INFO ===',
      debugInfo,
      '',
      '=== WINDOW.OPEN LOG ===',
      windowOpenLog || 'No window.open log found',
      '',
      '=== NAVIGATION LOG ===',
      navLog || 'No navigation log found',
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
  }, [debugInfo, windowOpenLog, navLog, errors, warnings]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullDebug);
      alert('Debug info copied to clipboard!');
    } catch {
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
      } catch {
        alert('Failed to copy. Please select and copy manually.');
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div
      className={`bg-gray-900 text-white rounded-lg p-4 text-xs font-mono ${maxHeightClassName} overflow-y-auto`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-sm">{title}</h3>
        <div className="text-xs">
          <IonButton size="small" fill="outline" onClick={copyToClipboard}>
            Copy All
          </IonButton>
        </div>
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
                <li key={i} className="break-words">
                  {error.substring(0, 160)}
                  {error.length > 160 ? '…' : ''}
                </li>
              ))}
            </ul>
          </div>
        )}

        {warnings.length > 0 && (
          <div className="text-yellow-400">
            <strong>Warnings ({warnings.length}):</strong>
            <ul className="list-disc list-inside ml-2">
              {warnings.slice(0, 5).map((warning, i) => (
                <li key={i} className="break-words">
                  {warning.substring(0, 160)}
                  {warning.length > 160 ? '…' : ''}
                </li>
              ))}
            </ul>
          </div>
        )}

        {errors.length === 0 && warnings.length === 0 && (
          <div className="text-gray-400">No errors or warnings</div>
        )}
      </div>
    </div>
  );
}

