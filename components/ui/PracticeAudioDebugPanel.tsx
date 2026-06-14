'use client';

import React, { useEffect, useState } from 'react';

import {
  clearPracticeAudioDebug,
  copyPracticeAudioDebugToClipboard,
  formatPracticeAudioDebugReport,
  getPracticeAudioDebugEntries,
  logPracticeAudioEnvironment,
  practiceAudioDebug,
  resolvePracticeAudioDebugEnabled,
  subscribePracticeAudioDebug,
} from '../../helpers/practiceAudioDebug';

export default function PracticeAudioDebugPanel() {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [open, setOpen] = useState(true);
  const [entries, setEntries] = useState(getPracticeAudioDebugEntries());
  const [copyStatus, setCopyStatus] = useState<'idle' | 'ok' | 'fail'>('idle');

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

  return (
    <div
      className="w-full rounded-xl text-left"
      style={{
        backgroundColor: 'rgba(30, 28, 24, 0.92)',
        border: '1px solid rgba(255,255,255,0.12)',
        color: '#F5F0E8',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: '11px',
      }}
    >
      <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-white/10">
        <button type="button" onClick={() => setOpen((v) => !v)} className="font-semibold text-xs">
          {open ? '▼' : '▶'} Native audio debug ({entries.length})
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              clearPracticeAudioDebug();
              logPracticeAudioEnvironment();
            }}
            className="px-2 py-1 rounded bg-white/10 text-[10px]"
          >
            Clear
          </button>
          <button type="button" onClick={() => void onCopy()} className="px-2 py-1 rounded bg-white/20 text-[10px] font-semibold">
            {copyStatus === 'ok' ? 'Copied!' : copyStatus === 'fail' ? 'Copy failed' : 'Copy logs'}
          </button>
        </div>
      </div>
      {open ? (
        <pre
          className="px-3 py-2 overflow-auto whitespace-pre-wrap break-words"
          style={{ maxHeight: '220px', margin: 0 }}
        >
          {formatPracticeAudioDebugReport()}
        </pre>
      ) : null}
    </div>
  );
}
