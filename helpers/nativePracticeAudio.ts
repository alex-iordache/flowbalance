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
type NativeSeekOptions = { assetId: string; time: number; resume?: boolean };

let configured = false;
let listenersAttached = false;
let completeHandle: PluginListenerHandle | null = null;
let timeHandle: PluginListenerHandle | null = null;
let stateHandle: PluginListenerHandle | null = null;
let stateReconcileTimer: ReturnType<typeof setTimeout> | null = null;

let loadedSrc: string | null = null;
let sessionStarted = false;
let commandChain: Promise<void> = Promise.resolve();
let releaseTimer: ReturnType<typeof setTimeout> | null = null;
let syncTimer: ReturnType<typeof setInterval> | null = null;
let seekDebounceTimer: ReturnType<typeof setTimeout> | null = null;
let pendingSeekSec: number | null = null;
let pendingSeekDone: (() => void) | null = null;

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

async function nativeSetCurrentTime(time: number, resume = false): Promise<void> {
  const opts: NativeSeekOptions = {
    assetId: PRACTICE_ASSET_ID,
    time: Math.max(0, time),
    resume,
  };
  await NativeAudio.setCurrentTime(opts as Parameters<typeof NativeAudio.setCurrentTime>[0]);
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

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = commandChain.then(task, task);
  commandChain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function refreshSnapshotFromNative(): Promise<void> {
  if (!snapshot.ready) return;
  try {
    const [playing, sec] = await Promise.all([isPracticeAudioPlaying(), getPracticeCurrentTimeSec()]);
    patchSnapshot({
      isPlaying: playing,
      current: sec,
      ended: !playing && snapshot.duration > 0 && sec >= snapshot.duration - 0.5 ? true : snapshot.ended,
      error: null,
    });
  } catch {
    // ignore
  }
}

function scheduleStateReconcile(): void {
  if (stateReconcileTimer) clearTimeout(stateReconcileTimer);
  stateReconcileTimer = setTimeout(() => {
    stateReconcileTimer = null;
    void refreshSnapshotFromNative();
  }, 180);
}

function startSyncTimer(): void {
  if (syncTimer) return;
  syncTimer = setInterval(() => {
    void refreshSnapshotFromNative();
  }, 1500);
}

function stopSyncTimer(): void {
  if (!syncTimer) return;
  clearInterval(syncTimer);
  syncTimer = null;
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
    patchSnapshot({ current: sec, isPlaying: true, ended: false, error: null });
  });

  stateHandle = await (NativeAudio as unknown as {
    addListener: (
      eventName: 'playbackState',
      listenerFunc: (event: { assetId?: string; isPlaying?: boolean; currentTime?: number }) => void,
    ) => Promise<PluginListenerHandle>;
  }).addListener('playbackState', (event) => {
    if (event.assetId !== PRACTICE_ASSET_ID) return;
    const sec = Number.isFinite(event.currentTime) ? Math.max(0, event.currentTime!) : snapshot.current;
    patchSnapshot({
      isPlaying: !!event.isPlaying,
      current: sec,
      ended: false,
      error: null,
    });
    scheduleStateReconcile();
  });
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
  startSyncTimer();
}

export function scheduleReleasePracticeSession(): void {
  void pausePracticeAudioOnLeave();
  if (releaseTimer) clearTimeout(releaseTimer);
  releaseTimer = setTimeout(() => {
    releaseTimer = null;
    void stopPracticeAudio();
  }, 800);
}

async function pausePracticeAudioOnLeave(): Promise<void> {
  if (!snapshot.ready) return;
  practiceAudioDebug('session', 'pause on leave');
  await NativeAudio.pause({ assetId: PRACTICE_ASSET_ID }).catch(() => undefined);
  patchSnapshot({ isPlaying: false, ended: false, error: null });
}

async function ensurePausedOnReturn(): Promise<void> {
  if (!snapshot.ready) {
    patchSnapshot({ isPlaying: false });
    return;
  }
  const playing = await isPracticeAudioPlaying().catch(() => false);
  if (playing || snapshot.isPlaying) {
    practiceAudioDebug('session', 'ensure paused on return');
    await NativeAudio.pause({ assetId: PRACTICE_ASSET_ID }).catch(() => undefined);
  }
  patchSnapshot({ isPlaying: false, ended: false, error: null });
  await refreshSnapshotFromNative();
  if (snapshot.isPlaying) {
    patchSnapshot({ isPlaying: false });
  }
}

export async function preparePracticeSession(params: {
  src: string;
  title?: string;
  subtitle?: string;
  initialPositionSec?: number;
}): Promise<void> {
  retainPracticeSession();

  await enqueue(async () => {
    const initPos = Math.max(0, params.initialPositionSec ?? 0);

    if (loadedSrc === params.src && snapshot.ready && snapshot.duration > 0) {
      practiceAudioDebug('session', 'prepare skipped - already ready', { src: params.src });
      if (initPos > 0 && initPos < snapshot.duration && Math.abs(snapshot.current - initPos) > 1) {
        await seekPracticeAudioInternal(initPos, false);
      }
      await ensurePausedOnReturn();
      return;
    }

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
        sessionStarted = false;

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

      if (initPos > 0 && initPos < dur) {
        await nativeSetCurrentTime(initPos, false);
        patchSnapshot({ current: initPos, duration: dur, ready: true, error: null });
      } else {
        patchSnapshot({ duration: dur, ready: true, error: null });
      }

      practiceAudioDebug('session', 'prepare ready', { duration: dur, initialPositionSec: initPos });
      await ensurePausedOnReturn();
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

async function waitForNativePlaying(timeoutMs = 1000): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await isPracticeAudioPlaying()) return true;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  return isPracticeAudioPlaying();
}

async function pausePracticeAudioInternal(): Promise<void> {
  practiceAudioDebug('native', 'pause');
  await NativeAudio.pause({ assetId: PRACTICE_ASSET_ID });
  await refreshSnapshotFromNative();
}

async function resumePracticeAudioInternal(): Promise<void> {
  practiceAudioDebug('native', 'resume');
  await NativeAudio.resume({ assetId: PRACTICE_ASSET_ID });
  const playing = await waitForNativePlaying();
  await refreshSnapshotFromNative();
  sessionStarted = true;
  practiceAudioDebug('native', 'resume done', { isPlaying: playing, current: snapshot.current });
}

async function resumeAtPositionInternal(sec: number): Promise<boolean> {
  const target = Math.max(0, sec);
  practiceAudioDebug('native', 'resumeAtPosition', { sec: target });
  await nativeSetCurrentTime(target, true);
  const playing = await waitForNativePlaying(1200);
  await refreshSnapshotFromNative();
  return playing;
}

async function playPracticeAudioInternal(startSec = 0): Promise<void> {
  if (!snapshot.ready) {
    throw new Error('Practice audio is not ready');
  }
  practiceAudioDebug('native', 'play', { startSec });
  if (startSec > 0.5) {
    const playing = await resumeAtPositionInternal(startSec);
    sessionStarted = true;
    practiceAudioDebug('native', 'play done (seek+resume)', { isPlaying: playing, current: snapshot.current });
    return;
  }
  await NativeAudio.play({
    assetId: PRACTICE_ASSET_ID,
    time: 0,
  });
  const playing = await waitForNativePlaying();
  await refreshSnapshotFromNative();
  sessionStarted = true;
  practiceAudioDebug('native', 'play done', { isPlaying: playing, current: snapshot.current });
}

async function seekPracticeAudioInternal(sec: number, resumeAfter?: boolean): Promise<void> {
  const wasPlaying = resumeAfter ?? snapshot.isPlaying;
  const targetSec = Math.max(0, sec);
  practiceAudioDebug('native', 'seek', { sec: targetSec, whilePlaying: wasPlaying });
  await nativeSetCurrentTime(targetSec, wasPlaying);
  await new Promise((resolve) => setTimeout(resolve, 150));
  await refreshSnapshotFromNative();
  practiceAudioDebug('native', 'seek done', { current: snapshot.current, isPlaying: snapshot.isPlaying });
}

export async function togglePracticeAudio(startSec = 0): Promise<void> {
  await enqueue(async () => {
    await refreshSnapshotFromNative();

    if (snapshot.isPlaying) {
      await pausePracticeAudioInternal();
      return;
    }
    if (!snapshot.ready) {
      throw new Error('Practice audio is not ready');
    }

    const resumePos = Math.max(0, snapshot.current > 0 ? snapshot.current : startSec);

    if (!sessionStarted || snapshot.ended) {
      await playPracticeAudioInternal(resumePos > 0.5 ? resumePos : 0);
      return;
    }

    if (resumePos > 0.5) {
      await resumeAtPositionInternal(resumePos);
    } else {
      await resumePracticeAudioInternal();
    }
  });
}

export async function playPracticeAudio(startSec = 0): Promise<void> {
  await enqueue(() => playPracticeAudioInternal(startSec));
}

export async function pausePracticeAudio(): Promise<void> {
  await enqueue(() => pausePracticeAudioInternal());
}

export async function resumePracticeAudio(): Promise<void> {
  await enqueue(() => resumePracticeAudioInternal());
}

export async function seekPracticeAudio(sec: number): Promise<void> {
  pendingSeekSec = sec;
  return new Promise((resolve) => {
    pendingSeekDone = resolve;
    if (seekDebounceTimer) clearTimeout(seekDebounceTimer);
    seekDebounceTimer = setTimeout(() => {
      seekDebounceTimer = null;
      const target = pendingSeekSec ?? sec;
      pendingSeekSec = null;
      const done = pendingSeekDone;
      pendingSeekDone = null;
      void enqueue(() => seekPracticeAudioInternal(target)).finally(() => done?.());
    }, 120);
  });
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
  await enqueue(async () => {
    practiceAudioDebug('native', 'stopPracticeAudio');
    stopSyncTimer();
    if (seekDebounceTimer) {
      clearTimeout(seekDebounceTimer);
      seekDebounceTimer = null;
    }
    pendingSeekSec = null;
    pendingSeekDone?.();
    pendingSeekDone = null;
    await NativeAudio.stop({ assetId: PRACTICE_ASSET_ID }).catch(() => undefined);
    await NativeAudio.unload({ assetId: PRACTICE_ASSET_ID }).catch(() => undefined);
    await PracticeForeground.stop().catch(() => undefined);
    loadedSrc = null;
    sessionStarted = false;
    patchSnapshot({
      src: null,
      duration: 0,
      current: 0,
      isPlaying: false,
      ready: false,
      ended: false,
      error: null,
    });
  });
}

export async function syncPracticePlaybackFromNative(): Promise<void> {
  await refreshSnapshotFromNative();
}
