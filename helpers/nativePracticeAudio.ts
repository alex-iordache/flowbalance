import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { NativeAudio } from '@capgo/native-audio';

import { PracticeForeground } from './practiceForeground';
import { getNativeAudioRequestHeaders } from './nativeAudioAuth';

export const PRACTICE_ASSET_ID = 'practice';

let configured = false;

export function isNativePracticeAudioAvailable(): boolean {
  if (!Capacitor.isNativePlatform()) return false;
  return Capacitor.isPluginAvailable('NativeAudio');
}

export function isNativeAudioPluginError(err: unknown): boolean {
  const code = (err as { code?: string })?.code;
  if (code === 'UNIMPLEMENTED' || code === 'UNAVAILABLE') return true;
  const message = (err as { message?: string })?.message ?? '';
  return /not implemented/i.test(message);
}

export function shouldFallbackToWebAudio(_err?: unknown): boolean {
  // Native playback can fail for auth, preload, or device-specific issues — keep HTML5 as backup.
  return true;
}

async function ensureConfigured(): Promise<void> {
  if (configured) return;
  await NativeAudio.configure({
    background: true,
    focus: true,
    // Capgo owns the media session + lock-screen controls on both platforms.
    showNotification: true,
  });
  configured = true;
}

export async function ensurePracticeNotificationPermission(): Promise<boolean> {
  if (Capacitor.getPlatform() !== 'android') return true;

  try {
    const current = await LocalNotifications.checkPermissions();
    if (current.display === 'granted') return true;

    const requested = await LocalNotifications.requestPermissions();
    if (requested.display === 'granted') return true;
  } catch {
    // Fall back to the custom foreground plugin permission flow.
  }

  try {
    const { granted } = await PracticeForeground.ensurePermissions();
    return granted;
  } catch {
    return false;
  }
}

export async function openPracticeNotificationSettings(): Promise<void> {
  if (Capacitor.getPlatform() !== 'android') return;
  await PracticeForeground.openNotificationSettings();
}

export async function preloadPracticeAudio(params: {
  src: string;
  title?: string;
  subtitle?: string;
}): Promise<void> {
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
}

export async function getPracticeDurationSec(): Promise<number> {
  const { duration } = await NativeAudio.getDuration({ assetId: PRACTICE_ASSET_ID });
  return Number.isFinite(duration) ? Math.max(0, duration) : 0;
}

export async function startPracticeForeground(
  title?: string,
  subtitle?: string,
): Promise<{ notificationGranted: boolean }> {
  if (Capacitor.getPlatform() !== 'android') {
    return { notificationGranted: true };
  }
  const notificationGranted = await ensurePracticeNotificationPermission();
  await PracticeForeground.start({
    title: (title || 'Flow').trim() || 'Flow',
    body: (subtitle || 'Practice').trim() || 'Practice',
  });
  return { notificationGranted };
}

export async function updatePracticeForeground(
  playing: boolean,
  title?: string,
  subtitle?: string,
): Promise<void> {
  if (Capacitor.getPlatform() !== 'android') return;
  await PracticeForeground.update({
    playing,
    title: (title || 'Flow').trim() || 'Flow',
    body: (subtitle || 'Practice').trim() || 'Practice',
  });
}

export async function stopPracticeForeground(): Promise<void> {
  if (Capacitor.getPlatform() !== 'android') return;
  await PracticeForeground.stop().catch(() => undefined);
}

export async function playPracticeAudio(startSec = 0): Promise<void> {
  await NativeAudio.play({
    assetId: PRACTICE_ASSET_ID,
    time: Math.max(0, startSec) * 1000,
  });
}

export async function pausePracticeAudio(): Promise<void> {
  await NativeAudio.pause({ assetId: PRACTICE_ASSET_ID });
}

export async function resumePracticeAudio(): Promise<void> {
  await NativeAudio.resume({ assetId: PRACTICE_ASSET_ID });
}

export async function seekPracticeAudio(sec: number): Promise<void> {
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
  await NativeAudio.stop({ assetId: PRACTICE_ASSET_ID }).catch(() => undefined);
  await NativeAudio.unload({ assetId: PRACTICE_ASSET_ID }).catch(() => undefined);
  await stopPracticeForeground();
}
