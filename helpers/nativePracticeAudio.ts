import type { PluginListenerHandle } from '@capacitor/core';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { NativeAudio } from '@capgo/native-audio';

import { getNativeAudioRequestHeaders } from './nativeAudioAuth';
import { practiceAudioDebug } from './practiceAudioDebug';
import { PracticeForeground } from './practiceForeground';

export const PRACTICE_ASSET_ID = 'practice';

export type PracticePlaybackSnapshot = {
  src: string | null;
  duration: number;
  current: number;
  isPlaying: boolean;
  ready: boolean;
  ended: boolean;
  error: string | null;
};

type CompleteHandler = () => void;

let configured = false;
let listenersAttached = false;
let completeHandle: PluginListenerHandle | null = null;
let timeHandle: PluginListenerHandle | null = null;

let loadedSrc: string | null = null;
let prepareChain: Promise<void> = Promise.resolve();
let releaseTimer: ReturnType<typeof setTimeout> | null = null;

const snapshot: PracticePlaybackSnapshot = {
  src: null,
  duration: 0,
  current: 0,
  isPlaying: false,
  ready: false,
  ended: false,
  error: null,
};

const subscribers = new Set<(state: PracticePlaybackSnapshot) => void>();
const completeHandlers = new Set<CompleteHandler>();

function emit(): void {
  const copy = { ...snapshot };
  subscribers.forEach((listener) => listener(copy));
}

function patchSnapshot(patch: Partial<PracticePlaybackSnapshot>): void {
  Object.assign(snapshot, patch);
  emit();
}

export function isNativePracticeAudioAvailable(): boolean {
  if (!Capacitor.isNativePlatform()) return false;
  return Capacitor.isPluginAvailable('NativeAudio');
}

export function getPracticePlaybackSnapshot(): PracticePlaybackSnapshot {
  return { ...snapshot };
}

export function subscribePracticePlayback(listener: (state: PracticePlaybackSnapshot) => void): () => void {
  subscribers.add(listener);
  listener({ ...snapshot });
  return () => subscribers.delete(listener);
}

export function onPracticePlaybackComplete(handler: CompleteHandler): () => void {
  completeHandlers.add(handler);
  return () => completeHandlers.delete(handler);
}

async function ensureConfigured(): Promise<void> {
  if (configured) return;
  practiceAudioDebug('native', 'NativeAudio.configure starting', {
    background: true,
    focus: true,
    showNotification: true,
  });
  await NativeAudio.configure({
    background: true,
    focus: true,
    showNotification: true,
  });
  configured = true;
  practiceAudioDebug('native', 'NativeAudio.configure done');
}

async function ensurePlaybackListeners(): Promise<void> {
  if (listenersAttached) return;
  listenersAttached = true;

  completeHandle = await NativeAudio.addListener('complete', (event) => {
    if (event.assetId !== PRACTICE_ASSET_ID) return;
    patchSnapshot({ isPlaying: false, ended: true, ready: true, error: null });
    completeHandlers.forEach((handler) => handler());
  });

  timeHandle = await NativeAudio.addListener('currentTime', (event) => {
    if (event.assetId !== PRACTICE_ASSET_ID) return;
    const sec = Number.isFinite(event.currentTime) ? Math.max(0, event.currentTime) : 0;
    patchSnapshot({ current: sec, ended: false, error: null });
  });
}

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = prepareChain.then(task, task);
  prepareChain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

export async function ensurePracticeNotificationPermission(): Promise<boolean> {
  if (Capacitor.getPlatform() !== 'android') return true;

  try {
    const current = await LocalNotifications.checkPermissions();
    if (current.display === 'granted') return true;
    const requested = await LocalNotifications.requestPermissions();
    if (requested.display === 'granted') return true;
  } catch (err) {
    practiceAudioDebug('perm', 'LocalNotifications permission flow failed', err, 'error');
  }

  try {
    const { granted } = await PracticeForeground.ensurePermissions();
    return granted;
  } catch (err) {
    practiceAudioDebug('perm', 'PracticeForeground.ensurePermissions failed', err, 'error');
    return false;
  }
}

export async function openPracticeNotificationSettings(): Promise<void> {
  if (Capacitor.getPlatform() !== 'android') return;
  await PracticeForeground.openNotificationSettings();
}

export function retainPracticeSession(): void {
  if (releaseTimer) {
    clearTimeout(releaseTimer);
    releaseTimer = null;
  }
}

export function scheduleReleasePracticeSession(): void {
  if (releaseTimer) clearTimeout(releaseTimer);
  releaseTimer = setTimeout(() => {
    releaseTimer = null;
    void stopPracticeAudio();
  }, 150);
}

export async function preparePracticeSession(params: {
  src: string;
  title?: string;
  subtitle?: string;
  initialPositionSec?: number;
}): Promise<void> {
  retainPracticeSession();

  await enqueue(async () => {
    practiceAudioDebug('session', 'prepare', {
      src: params.src,
      loadedSrc,
      ready: snapshot.ready,
    });

    patchSnapshot({
      src: params.src,
      error: null,
      ended: false,
      ready: false,
      isPlaying: false,
      duration: 0,
      current: 0,
    });

    try {
      await ensureConfigured();
      await ensurePlaybackListeners();

      if (loadedSrc !== params.src) {
        await NativeAudio.stop({ assetId: PRACTICE_ASSET_ID }).catch(() => undefined);
        await NativeAudio.unload({ assetId: PRACTICE_ASSET_ID }).catch(() => undefined);
        loadedSrc = null;

        const headers = await getNativeAudioRequestHeaders();
        await NativeAudio.preload({
          assetId: PRACTICE_ASSET_ID,
          assetPath: params.src,
          isUrl: true,
          audioChannelNum: 1,
          headers: Object.keys(headers).length > 0 ? headers : undefined,
          notificationMetadata: {
            title: (params.title || 'Flow').trim() || 'Flow',
            artist: (params.subtitle || '').trim(),
            album: 'Flow Balance',
          },
        });
        loadedSrc = params.src;
        practiceAudioDebug('session', 'preload done', { src: params.src });
      } else {
        practiceAudioDebug('session', 'reuse loaded asset', { src: params.src });
      }

      const { duration } = await NativeAudio.getDuration({ assetId: PRACTICE_ASSET_ID });
      const dur = Number.isFinite(duration) ? Math.max(0, duration) : 0;
      if (dur <= 0) {
        throw new Error(`Native audio preload returned zero duration (got ${dur})`);
      }

      const initPos = Math.max(0, params.initialPositionSec ?? 0);
      if (initPos > 0 && initPos < dur) {
        await NativeAudio.setCurrentTime({ assetId: PRACTICE_ASSET_ID, time: initPos });
        patchSnapshot({ current: initPos, duration: dur, ready: true, error: null });
      } else {
        patchSnapshot({ duration: dur, ready: true, error: null });
      }

      practiceAudioDebug('session', 'prepare ready', { duration: dur, initialPositionSec: initPos });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      practiceAudioDebug('session', 'prepare failed', err, 'error');
      loadedSrc = null;
      patchSnapshot({ ready: false, error: message });
      throw err;
    }
  });
}

export async function startPracticeForeground(
  title?: string,
  subtitle?: string,
): Promise<{ notificationGranted: boolean }> {
  if (Capacitor.getPlatform() !== 'android') {
    return { notificationGranted: true };
  }
  const notificationGranted = await ensurePracticeNotificationPermission();
  practiceAudioDebug('fg', 'notification permission', { title, subtitle, notificationGranted });
  return { notificationGranted };
}

export async function playPracticeAudio(startSec = 0): Promise<void> {
  if (!snapshot.ready) {
    throw new Error('Practice audio is not ready');
  }
  practiceAudioDebug('native', 'play', { startSec });
  await NativeAudio.play({
    assetId: PRACTICE_ASSET_ID,
    time: Math.max(0, startSec) * 1000,
  });
  patchSnapshot({ isPlaying: true, ended: false, error: null });
  practiceAudioDebug('native', 'play done', { isPlaying: true });
}

export async function pausePracticeAudio(): Promise<void> {
  practiceAudioDebug('native', 'pause');
  await NativeAudio.pause({ assetId: PRACTICE_ASSET_ID });
  const sec = await getPracticeCurrentTimeSec();
  patchSnapshot({ isPlaying: false, current: sec, error: null });
}

export async function resumePracticeAudio(): Promise<void> {
  practiceAudioDebug('native', 'resume');
  await NativeAudio.resume({ assetId: PRACTICE_ASSET_ID });
  patchSnapshot({ isPlaying: true, ended: false, error: null });
}

export async function seekPracticeAudio(sec: number): Promise<void> {
  practiceAudioDebug('native', 'seek', { sec });
  await NativeAudio.setCurrentTime({
    assetId: PRACTICE_ASSET_ID,
    time: Math.max(0, sec),
  });
  patchSnapshot({ current: sec, error: null });
}

export async function getPracticeCurrentTimeSec(): Promise<number> {
  const { currentTime } = await NativeAudio.getCurrentTime({ assetId: PRACTICE_ASSET_ID });
  return Number.isFinite(currentTime) ? Math.max(0, currentTime) : 0;
}

export async function isPracticeAudioPlaying(): Promise<boolean> {
  const { isPlaying } = await NativeAudio.isPlaying({ assetId: PRACTICE_ASSET_ID });
  return !!isPlaying;
}

export async function stopPracticeAudio(): Promise<void> {
  practiceAudioDebug('native', 'stopPracticeAudio');
  await NativeAudio.stop({ assetId: PRACTICE_ASSET_ID }).catch(() => undefined);
  await NativeAudio.unload({ assetId: PRACTICE_ASSET_ID }).catch(() => undefined);
  await PracticeForeground.stop().catch(() => undefined);
  loadedSrc = null;
  patchSnapshot({
    src: null,
    duration: 0,
    current: 0,
    isPlaying: false,
    ready: false,
    ended: false,
    error: null,
  });
}

export async function syncPracticePlaybackFromNative(): Promise<void> {
  if (!snapshot.ready) return;
  try {
    const [playing, sec] = await Promise.all([isPracticeAudioPlaying(), getPracticeCurrentTimeSec()]);
    patchSnapshot({
      isPlaying: playing,
      current: sec,
      ended: !playing && sec >= snapshot.duration && snapshot.duration > 0 ? snapshot.ended : snapshot.ended,
    });
  } catch {
    // ignore
  }
}
