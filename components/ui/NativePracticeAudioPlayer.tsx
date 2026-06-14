import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { PluginListenerHandle } from '@capacitor/core';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

import {
  getPracticeCurrentTimeSec,
  getPracticeDurationSec,
  isNativeAudioPluginError,
  isPracticeAudioPlaying,
  openPracticeNotificationSettings,
  pausePracticeAudio,
  playPracticeAudio,
  preloadPracticeAudio,
  PRACTICE_ASSET_ID,
  resumePracticeAudio,
  seekPracticeAudio,
  startPracticeForeground,
  stopPracticeAudio,
  stopPracticeForeground,
  updatePracticeForeground,
} from '../../helpers/nativePracticeAudio';
import { NativeAudio } from '@capgo/native-audio';

type Props = {
  src: string;
  title?: string;
  subtitle?: string;
  onPlay?: () => void;
  onEnded?: () => void;
  initialPositionSec?: number;
  onPositionChange?: (sec: number) => void;
  variant?: 'card' | 'floatingCircle';
  onNativeUnavailable?: () => void;
};

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return '00:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function NativePracticeAudioPlayer({
  src,
  title,
  subtitle,
  onPlay,
  onEnded,
  initialPositionSec = 0,
  onPositionChange,
  variant = 'card',
  onNativeUnavailable,
}: Props) {
  const onNativeUnavailableRef = useRef(onNativeUnavailable);
  const onPlayRef = useRef(onPlay);
  const onEndedRef = useRef(onEnded);
  const onPositionChangeRef = useRef(onPositionChange);
  const lastReportedSecRef = useRef(-1);
  const initialPositionSecRef = useRef(initialPositionSec);
  const titleRef = useRef(title);
  const subtitleRef = useRef(subtitle);
  const readyRef = useRef(false);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    onNativeUnavailableRef.current = onNativeUnavailable;
  }, [onNativeUnavailable]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [notificationsBlocked, setNotificationsBlocked] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'playing' | 'paused' | 'ended' | 'error'>(
    'idle',
  );
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const progressPct = useMemo(() => {
    if (!duration) return 0;
    return Math.max(0, Math.min(100, (current / duration) * 100));
  }, [current, duration]);

  useEffect(() => {
    onPlayRef.current = onPlay;
  }, [onPlay]);
  useEffect(() => {
    onEndedRef.current = onEnded;
  }, [onEnded]);
  useEffect(() => {
    onPositionChangeRef.current = onPositionChange;
  }, [onPositionChange]);
  useEffect(() => {
    titleRef.current = title;
    subtitleRef.current = subtitle;
  }, [title, subtitle]);

  initialPositionSecRef.current = initialPositionSec;

  useEffect(() => {
    hasStartedRef.current = hasStarted;
  }, [hasStarted]);

  const syncPlaybackState = async () => {
    try {
      const playing = await isPracticeAudioPlaying();
      const sec = await getPracticeCurrentTimeSec();
      setCurrent(sec);
      setIsPlaying(playing);
      setStatus(playing ? 'playing' : hasStartedRef.current ? 'paused' : 'ready');
      if (onPositionChangeRef.current) onPositionChangeRef.current(sec);
    } catch {
      // ignore sync errors
    }
  };

  useEffect(() => {
    if (Capacitor.getPlatform() !== 'android') return;
    let handle: PluginListenerHandle | null = null;
    void (async () => {
      handle = await App.addListener('appStateChange', ({ isActive }) => {
        if (isActive) void syncPlaybackState();
      });
    })();
    return () => {
      void handle?.remove();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let completeHandle: PluginListenerHandle | null = null;
    let timeHandle: PluginListenerHandle | null = null;

    const setup = async () => {
      readyRef.current = false;
      setIsPlaying(false);
      setHasStarted(false);
      setStatus('loading');
      setCurrent(0);
      setDuration(0);

      try {
        await stopPracticeAudio();
        if (cancelled) return;

        await preloadPracticeAudio({
          src,
          title: titleRef.current,
          subtitle: subtitleRef.current,
        });
        if (cancelled) return;

        const dur = await getPracticeDurationSec();
        if (cancelled) return;

        const initPos = initialPositionSecRef.current;
        setDuration(dur);
        if (initPos > 0 && initPos < dur) {
          await seekPracticeAudio(initPos);
          setCurrent(initPos);
          lastReportedSecRef.current = Math.floor(initPos);
        }
        readyRef.current = true;
        setStatus('ready');

        completeHandle = await NativeAudio.addListener('complete', (event) => {
          if (event.assetId !== PRACTICE_ASSET_ID) return;
          setIsPlaying(false);
          setStatus('ended');
          void stopPracticeForeground();
          onEndedRef.current?.();
        });

        timeHandle = await NativeAudio.addListener('currentTime', (event) => {
          if (event.assetId !== PRACTICE_ASSET_ID) return;
          const sec = event.currentTime || 0;
          setCurrent(sec);
          if (onPositionChangeRef.current && Math.floor(sec) !== Math.floor(lastReportedSecRef.current)) {
            lastReportedSecRef.current = sec;
            onPositionChangeRef.current(sec);
          }
        });
      } catch (err) {
        if (!cancelled) {
          if (isNativeAudioPluginError(err)) {
            onNativeUnavailableRef.current?.();
          } else {
            setStatus('error');
          }
        }
      }
    };

    void setup();

    return () => {
      cancelled = true;
      void completeHandle?.remove();
      void timeHandle?.remove();
      void (async () => {
        try {
          const sec = await getPracticeCurrentTimeSec();
          onPositionChangeRef.current?.(sec);
        } catch {
          // ignore
        }
        await stopPracticeAudio();
      })();
    };
  }, [src]);

  const toggle = async () => {
    if (!readyRef.current && status !== 'playing' && status !== 'paused') {
      setStatus('loading');
    }

    try {
      const playing = await isPracticeAudioPlaying();
      if (playing) {
        await pausePracticeAudio();
        await updatePracticeForeground(false, titleRef.current, subtitleRef.current);
        const sec = await getPracticeCurrentTimeSec();
        setCurrent(sec);
        onPositionChangeRef.current?.(sec);
        setIsPlaying(false);
        setStatus('paused');
        return;
      }

      setStatus('loading');
      const { notificationGranted } = await startPracticeForeground(titleRef.current, subtitleRef.current);
      if (!notificationGranted) {
        setNotificationsBlocked(true);
      } else {
        setNotificationsBlocked(false);
      }
      if (hasStarted) {
        await resumePracticeAudio();
      } else {
        await playPracticeAudio(initialPositionSecRef.current);
      }
      setIsPlaying(true);
      setHasStarted(true);
      setStatus('playing');
      onPlayRef.current?.();
    } catch (err) {
      if (isNativeAudioPluginError(err)) {
        onNativeUnavailableRef.current?.();
        return;
      }
      await stopPracticeForeground();
      setIsPlaying(false);
      setStatus('error');
    }
  };

  const seekToPct = async (pct: number) => {
    if (!duration) return;
    const next = (pct / 100) * duration;
    try {
      await seekPracticeAudio(next);
      setCurrent(next);
      if (onPositionChangeRef.current) onPositionChangeRef.current(next);
    } catch {
      setStatus('error');
    }
  };

  const iconSize = variant === 'floatingCircle' ? 56 : 22;
  const PlayIcon = (
    <svg viewBox="0 0 24 24" width={iconSize} height={iconSize} aria-hidden="true">
      <path fill="currentColor" d="M8 5v14l11-7z" />
    </svg>
  );
  const PauseIcon = (
    <svg viewBox="0 0 24 24" width={iconSize} height={iconSize} aria-hidden="true">
      <path fill="currentColor" d="M6 5h4v14H6zm8 0h4v14h-4z" />
    </svg>
  );

  const statusLabel = status === 'error' ? 'Audio failed to play' : '';
  const notificationHint = notificationsBlocked
    ? 'Allow notifications for lock-screen controls.'
    : '';
  const ink = '#3B3126';
  const inkMuted = 'rgba(59, 49, 38, 0.72)';
  const inkSubtle = 'rgba(59, 49, 38, 0.52)';
  const trackBg = 'rgba(59, 49, 38, 0.18)';
  const fillBg = 'rgba(59, 49, 38, 0.88)';

  const cardUi = (
    <div
      className="w-full rounded-2xl p-4"
      style={{
        backgroundColor: '#FBF7F2',
        border: '1px solid rgba(232, 222, 211, 0.85)',
        boxShadow: '0 10px 24px rgba(120, 95, 70, 0.08)',
        color: ink,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {title ? (
            <div className="font-semibold truncate" style={{ color: ink }}>
              {title}
            </div>
          ) : null}
          {subtitle ? (
            <div className="text-xs truncate mt-0.5" style={{ color: inkMuted }}>
              {subtitle}
            </div>
          ) : null}
          {statusLabel ? (
            <div className="text-xs mt-1" style={{ color: inkMuted }}>
              {statusLabel}
            </div>
          ) : null}
          {notificationHint ? (
            <div className="text-xs mt-1 flex items-center gap-2 flex-wrap" style={{ color: inkMuted }}>
              <span>{notificationHint}</span>
              <button
                type="button"
                onClick={() => void openPracticeNotificationSettings()}
                className="underline"
                style={{ color: ink }}
              >
                Open Settings
              </button>
            </div>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => void toggle()}
          className="shrink-0 px-5 py-2 rounded-full text-sm font-semibold"
          style={{ backgroundColor: 'rgba(59, 49, 38, 0.10)', color: ink }}
        >
          {isPlaying ? PauseIcon : PlayIcon}
        </button>
      </div>
      <div className="mt-4">
        <div
          className="w-full h-3 rounded-full overflow-hidden cursor-pointer"
          role="slider"
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progressPct)}
          tabIndex={0}
          style={{ backgroundColor: trackBg }}
          onClick={(e) => {
            const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
            const pct = ((e.clientX - rect.left) / rect.width) * 100;
            void seekToPct(pct);
          }}
        >
          <div className="h-3 rounded-full" style={{ width: `${progressPct}%`, backgroundColor: fillBg }} />
        </div>
        <div className="flex items-center justify-between text-xs mt-2" style={{ color: inkMuted }}>
          <span>{formatTime(current)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );

  const floatingUi = (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl px-6 flex flex-col items-center text-center gap-4">
        <div className="w-full">
          {title ? (
            <div className="font-semibold text-base md:text-lg leading-snug line-clamp-2" style={{ color: ink }}>
              {title}
            </div>
          ) : null}
          {subtitle ? (
            <div className="text-xs md:text-sm mt-1" style={{ color: inkMuted }}>
              {subtitle}
            </div>
          ) : null}
          {statusLabel ? (
            <div className="text-xs mt-2" style={{ color: inkSubtle }}>
              {statusLabel}
            </div>
          ) : null}
          {notificationHint ? (
            <div className="text-xs mt-2 flex items-center justify-center gap-2 flex-wrap" style={{ color: inkSubtle }}>
              <span>{notificationHint}</span>
              <button
                type="button"
                onClick={() => void openPracticeNotificationSettings()}
                className="underline"
                style={{ color: ink }}
              >
                Open Settings
              </button>
            </div>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => void toggle()}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="flex items-center justify-center"
          style={{ width: 76, height: 76, background: 'transparent', border: 'none', padding: 0, color: ink }}
        >
          {isPlaying ? PauseIcon : PlayIcon}
        </button>
        <div className="w-full flex flex-col items-center" style={{ maxWidth: '100%' }}>
          <div
            className="h-2 rounded-full overflow-hidden cursor-pointer"
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progressPct)}
            tabIndex={0}
            style={{ width: '92%', background: trackBg }}
            onClick={(e) => {
              const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
              const pct = ((e.clientX - rect.left) / rect.width) * 100;
              void seekToPct(pct);
            }}
          >
            <div className="h-2 rounded-full" style={{ width: `${progressPct}%`, background: fillBg }} />
          </div>
          <div
            className="flex items-center justify-between text-xs mt-2 select-none"
            style={{ fontVariantNumeric: 'tabular-nums', width: '92%', color: inkMuted }}
          >
            <span>{formatTime(current)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return variant === 'floatingCircle' ? floatingUi : cardUi;
}
