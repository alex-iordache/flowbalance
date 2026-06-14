import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { NativeAudio } from '@capgo/native-audio';

import { getNativeAudioRequestHeaders } from './nativeAudioAuth';
import { practiceAudioDebug } from './practiceAudioDebug';
import { PracticeForeground } from './practiceForeground';

export const PRACTICE_ASSET_ID = 'practice';

let configured = false;

export function isNativePracticeAudioAvailable(): boolean {
  if (!Capacitor.isNativePlatform()) return false;
  return Capacitor.isPluginAvailable('NativeAudio');
}

async function ensureConfigured(): Promise<void> {
  if (configured) {
    practiceAudioDebug('native', 'NativeAudio already configured');
    return;
  }
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

export async function ensurePracticeNotificationPermission(): Promise<boolean> {
  if (Capacitor.getPlatform() !== 'android') return true;

  try {
    const current = await LocalNotifications.checkPermissions();
    practiceAudioDebug('perm', 'LocalNotifications.checkPermissions', current);
    if (current.display === 'granted') return true;

    const requested = await LocalNotifications.requestPermissions();
    practiceAudioDebug('perm', 'LocalNotifications.requestPermissions', requested);
    if (requested.display === 'granted') return true;
  } catch (err) {
    practiceAudioDebug('perm', 'LocalNotifications permission flow failed', err, 'error');
  }

  try {
    const { granted } = await PracticeForeground.ensurePermissions();
    practiceAudioDebug('perm', 'PracticeForeground.ensurePermissions', { granted });
    return granted;
  } catch (err) {
    practiceAudioDebug('perm', 'PracticeForeground.ensurePermissions failed', err, 'error');
    return false;
  }
}

export async function openPracticeNotificationSettings(): Promise<void> {
  if (Capacitor.getPlatform() !== 'android') return;
  practiceAudioDebug('perm', 'Opening notification settings');
  await PracticeForeground.openNotificationSettings();
}

export async function preloadPracticeAudio(params: {
  src: string;
  title?: string;
  subtitle?: string;
}): Promise<void> {
  practiceAudioDebug('native', 'preload starting', {
    src: params.src,
    title: params.title,
    subtitle: params.subtitle,
  });
  await ensureConfigured();
  const headers = await getNativeAudioRequestHeaders();
  await NativeAudio.unload({ assetId: PRACTICE_ASSET_ID }).catch(() => undefined);
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
  practiceAudioDebug('native', 'preload done');
}

export async function getPracticeDurationSec(): Promise<number> {
  const { duration } = await NativeAudio.getDuration({ assetId: PRACTICE_ASSET_ID });
  practiceAudioDebug('native', 'getDuration', { duration });
  return Number.isFinite(duration) ? Math.max(0, duration) : 0;
}

export async function startPracticeForeground(
  title?: string,
  subtitle?: string,
): Promise<{ notificationGranted: boolean }> {
  if (Capacitor.getPlatform() !== 'android') {
    return { notificationGranted: true };
  }
  practiceAudioDebug('fg', 'startPracticeForeground');
  const notificationGranted = await ensurePracticeNotificationPermission();
  await PracticeForeground.start({
    title: (title || 'Flow').trim() || 'Flow',
    body: (subtitle || 'Practice').trim() || 'Practice',
  });
  practiceAudioDebug('fg', 'PracticeForeground.start done', { notificationGranted });
  return { notificationGranted };
}

export async function updatePracticeForeground(
  playing: boolean,
  title?: string,
  subtitle?: string,
): Promise<void> {
  if (Capacitor.getPlatform() !== 'android') return;
  practiceAudioDebug('fg', 'PracticeForeground.update', { playing, title, subtitle });
  await PracticeForeground.update({
    playing,
    title: (title || 'Flow').trim() || 'Flow',
    body: (subtitle || 'Practice').trim() || 'Practice',
  });
}

export async function stopPracticeForeground(): Promise<void> {
  if (Capacitor.getPlatform() !== 'android') return;
  practiceAudioDebug('fg', 'PracticeForeground.stop');
  await PracticeForeground.stop().catch((err) => {
    practiceAudioDebug('fg', 'PracticeForeground.stop failed', err, 'warn');
  });
}

export async function playPracticeAudio(startSec = 0): Promise<void> {
  practiceAudioDebug('native', 'play', { startSec });
  await NativeAudio.play({
    assetId: PRACTICE_ASSET_ID,
    time: Math.max(0, startSec) * 1000,
  });
  const playing = await isPracticeAudioPlaying();
  practiceAudioDebug('native', 'play done', { isPlaying: playing });
}

export async function pausePracticeAudio(): Promise<void> {
  practiceAudioDebug('native', 'pause');
  await NativeAudio.pause({ assetId: PRACTICE_ASSET_ID });
}

export async function resumePracticeAudio(): Promise<void> {
  practiceAudioDebug('native', 'resume');
  await NativeAudio.resume({ assetId: PRACTICE_ASSET_ID });
}

export async function seekPracticeAudio(sec: number): Promise<void> {
  practiceAudioDebug('native', 'seek', { sec });
  await NativeAudio.setCurrentTime({
    assetId: PRACTICE_ASSET_ID,
    time: Math.max(0, sec),
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
  practiceAudioDebug('native', 'stopPracticeAudio');
  await NativeAudio.stop({ assetId: PRACTICE_ASSET_ID }).catch(() => undefined);
  await NativeAudio.unload({ assetId: PRACTICE_ASSET_ID }).catch(() => undefined);
  await stopPracticeForeground();
}
