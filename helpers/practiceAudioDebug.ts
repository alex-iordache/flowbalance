'use client';

import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';

/**
 * Sideload debug — logs and COPY button on native Android during testing.
 */
export const PRACTICE_AUDIO_DEBUG_MIN_BUILD_CODE = 8;
export const PRACTICE_AUDIO_DEBUG_BUILD_CODE = 19;
export const PRACTICE_AUDIO_DEBUG_VERSION_NAME = '1.0.18';

let debugResolved = false;
let debugEnabledCache = false;
let debugAppInfo: { version: string; build: string } | null = null;

export type PracticeAudioDebugLevel = 'info' | 'warn' | 'error';

export type PracticeAudioDebugEntry = {
  ts: string;
  level: PracticeAudioDebugLevel;
  tag: string;
  message: string;
  detail?: string;
};

const MAX_ENTRIES = 200;
const entries: PracticeAudioDebugEntry[] = [];
const listeners = new Set<() => void>();

function notify(): void {
  listeners.forEach((listener) => listener());
}

function formatDetail(detail: unknown): string | undefined {
  if (detail == null) return undefined;
  if (detail instanceof Error) {
    const parts = [detail.message];
    if (detail.stack) parts.push(detail.stack);
    return parts.join('\n');
  }
  if (typeof detail === 'string') return detail;
  try {
    return JSON.stringify(detail, null, 2);
  } catch {
    return String(detail);
  }
}


export async function resolvePracticeAudioDebugEnabled(): Promise<boolean> {
  if (debugResolved) return debugEnabledCache;

  debugResolved = true;
  debugEnabledCache = false;
  debugAppInfo = null;

  if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'android') {
    return false;
  }
  if (!Capacitor.isPluginAvailable('NativeAudio')) {
    return false;
  }

  try {
    const info = await App.getInfo();
    const build = Number.parseInt(String(info.build), 10);
    const version = String(info.version ?? '').trim();
    debugAppInfo = { version, build: String(info.build) };
    practiceAudioDebug('env', 'Debug gate resolved', { version, build, minBuild: PRACTICE_AUDIO_DEBUG_MIN_BUILD_CODE });
  } catch (err) {
    practiceAudioDebug('env', 'App.getInfo failed during debug gate', err, 'warn');
  }

  debugEnabledCache = true;
  return debugEnabledCache;
}

export function isPracticeAudioDebugEnabled(): boolean {
  return debugEnabledCache;
}

export function practiceAudioDebug(
  tag: string,
  message: string,
  detail?: unknown,
  level: PracticeAudioDebugLevel = 'info',
): void {
  if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'android') return;
  const entry: PracticeAudioDebugEntry = {
    ts: new Date().toISOString(),
    level,
    tag,
    message,
    detail: formatDetail(detail),
  };
  entries.push(entry);
  if (entries.length > MAX_ENTRIES) {
    entries.splice(0, entries.length - MAX_ENTRIES);
  }
  const line = `[${entry.ts}] [${level}] [${tag}] ${message}${entry.detail ? `\n${entry.detail}` : ''}`;
  if (level === 'error') console.error(line);
  else if (level === 'warn') console.warn(line);
  else console.log(line);
  notify();
}

export function getPracticeAudioDebugEntries(): PracticeAudioDebugEntry[] {
  return [...entries];
}

export function clearPracticeAudioDebug(): void {
  entries.length = 0;
  notify();
}

export function subscribePracticeAudioDebug(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function formatPracticeAudioDebugReport(): string {
  const header = [
    '=== Flow Practice Audio Debug ===',
    `generated: ${new Date().toISOString()}`,
    `platform: ${Capacitor.getPlatform()}`,
    `isNative: ${Capacitor.isNativePlatform()}`,
    `appVersion: ${debugAppInfo?.version ?? 'unknown'}`,
    `appBuild: ${debugAppInfo?.build ?? 'unknown'}`,
    `debugApkTarget: ${PRACTICE_AUDIO_DEBUG_VERSION_NAME} (${PRACTICE_AUDIO_DEBUG_BUILD_CODE})`,
    `NativeAudio plugin: ${Capacitor.isPluginAvailable('NativeAudio')}`,
    `PracticeForeground plugin: ${Capacitor.isPluginAvailable('PracticeForeground')}`,
    `LocalNotifications plugin: ${Capacitor.isPluginAvailable('LocalNotifications')}`,
    '---',
  ].join('\n');

  const body = getPracticeAudioDebugEntries()
    .map((e) => {
      const base = `[${e.ts}] [${e.level}] [${e.tag}] ${e.message}`;
      return e.detail ? `${base}\n${e.detail}` : base;
    })
    .join('\n\n');

  return `${header}\n${body || '(no log entries yet)'}\n`;
}

export async function copyPracticeAudioDebugToClipboard(): Promise<boolean> {
  const text = formatPracticeAudioDebugReport();
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through
  }

  try {
    if (typeof document === 'undefined') return false;
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export function logPracticeAudioEnvironment(): void {
  if (!debugEnabledCache) return;
  practiceAudioDebug('env', 'Practice audio environment', {
    platform: Capacitor.getPlatform(),
    isNativePlatform: Capacitor.isNativePlatform(),
    app: debugAppInfo,
    debugApkTarget: {
      version: PRACTICE_AUDIO_DEBUG_VERSION_NAME,
      buildCode: PRACTICE_AUDIO_DEBUG_BUILD_CODE,
    },
    plugins: {
      NativeAudio: Capacitor.isPluginAvailable('NativeAudio'),
      PracticeForeground: Capacitor.isPluginAvailable('PracticeForeground'),
      LocalNotifications: Capacitor.isPluginAvailable('LocalNotifications'),
      App: Capacitor.isPluginAvailable('App'),
    },
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'n/a',
    origin: typeof window !== 'undefined' ? window.location.origin : 'n/a',
    href: typeof window !== 'undefined' ? window.location.href : 'n/a',
  });
}
