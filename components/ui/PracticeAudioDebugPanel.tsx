'use client';

import React, { useEffect, useMemo, useState } from 'react';

import {
  clearPracticeAudioDebug,
  copyPracticeAudioDebugToClipboard,
  formatPracticeAudioDebugReport,
  getPracticeAudioDebugEntries,
  logPracticeAudioEnvironment,
  practiceAudioDebug,
  resolvePracticeAudioDebugEnabled,
  subscribePracticeAudioDebug,
  type PracticeAudioDebugEntry,
} from '../../helpers/practiceAudioDebug';

function lastError(entries: PracticeAudioDebugEntry[]): PracticeAudioDebugEntry | null {
  for (let i = entries.length - 1; i >= 0; i -= 1) {
    if (entries[i]?.level === 'error') return entries[i];
  }
  return null;
}

export default function PracticeAudioDebugPanel() {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [showLogs, setShowLogs] = useState(false);
  const [entries, setEntries] = useState(getPracticeAudioDebugEntries());
  const [copyStatus, setCopyStatus] = useState<'idle' | 'ok' | 'fail'>('idle');

  const report = useMemo(() => formatPracticeAudioDebugReport(), [entries]);
  const latestError = useMemo(() => lastError(entries), [entries]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const ok = await resolvePracticeAudioDebugEnabled();
      if (cancelled) return;
      setEnabled(ok);
      if (!ok) return;
      logPracticeAudioEnvironment();
    })();
    const unsub = subscribePracticeAudioDebug(() => {
      setEntries(getPracticeAudioDebugEntries());
    });
    return () => {
      cancelled = true;
      unsub();
    };
  }, []);

  if (enabled !== true) return null;

  const onCopy = async () => {
    const ok = await copyPracticeAudioDebugToClipboard();
    setCopyStatus(ok ? 'ok' : 'fail');
    practiceAudioDebug('debug-ui', ok ? 'Copied debug log to clipboard' : 'Failed to copy debug log', undefined, ok ? 'info' : 'error');
    window.setTimeout(() => setCopyStatus('idle'), 2500);
  };

  const copyLabel =
    copyStatus === 'ok' ? 'Copied!' : copyStatus === 'fail' ? 'Copy failed' : 'COPY LOGS';

  return (
    <>
      <button
        type="button"
        onClick={() => void onCopy()}
        className="fixed right-3 z-[100000] px-4 py-3 rounded-xl text-sm font-bold shadow-lg"
        style={{
          top: 'calc(env(safe-area-inset-top, 0px) + 56px)',
          backgroundColor: '#E8DFD2',
          color: '#1E1C18',
          border: '1px solid rgba(59, 49, 38, 0.2)',
        }}
      >
        {copyLabel}
      </button>

      <div
        className="fixed inset-x-0 z-[99999] px-2 pointer-events-none"
        style={{
          maxWidth: '100vw',
          bottom: 'calc(56px + env(safe-area-inset-bottom, 0px))',
        }}
      >
        <div
          className="mx-auto w-full max-w-lg rounded-xl pointer-events-auto shadow-2xl"
          style={{
            backgroundColor: 'rgba(22, 20, 18, 0.97)',
            border: '1px solid rgba(255,255,255,0.14)',
            color: '#F5F0E8',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          }}
        >
          <div className="px-3 py-2 space-y-2">
            <div className="flex items-center gap-2 text-[10px]">
              <button
                type="button"
                onClick={() => setShowLogs((v) => !v)}
                className="flex-1 px-2 py-2 rounded-lg bg-white/10 text-left"
              >
                {showLogs ? 'Hide logs' : `Audio debug (${entries.length})`}
              </button>
              <button
                type="button"
                onClick={() => {
                  clearPracticeAudioDebug();
                  logPracticeAudioEnvironment();
                }}
                className="px-3 py-2 rounded-lg bg-white/10"
              >
                Clear
              </button>
            </div>

            {latestError ? (
              <div
                className="rounded-lg px-2 py-2 text-[10px] leading-snug"
                style={{ backgroundColor: 'rgba(180, 60, 60, 0.25)', color: '#FFD8D8' }}
              >
                <div className="font-bold">Latest error</div>
                <div>{latestError.message}</div>
              </div>
            ) : null}
          </div>

          {showLogs ? (
            <pre
              className="px-3 pb-3 whitespace-pre-wrap break-words text-[11px]"
              style={{
                margin: 0,
                maxHeight: '28vh',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
                touchAction: 'pan-y',
              }}
            >
              {report}
            </pre>
          ) : null}
        </div>
      </div>
    </>
  );
}
