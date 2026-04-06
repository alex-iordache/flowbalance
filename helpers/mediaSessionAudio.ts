/**
 * Media Session API: helps OS treat WebView <audio> as real media (notifications, lock screen, background).
 * Deploy-only mitigation for Android/iOS WebViews — not a substitute for native foreground playback.
 */

export function mediaSessionSupported(): boolean {
  return typeof navigator !== 'undefined' && 'mediaSession' in navigator && !!navigator.mediaSession;
}

export function setMediaSessionMetadata(title?: string, subtitle?: string): void {
  if (!mediaSessionSupported()) return;
  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: (title || 'Flow').trim() || 'Flow',
      artist: (subtitle || '').trim(),
      album: 'Flow Balance',
    });
  } catch {
    // ignore
  }
}

export function setMediaSessionPlaybackState(state: 'none' | 'paused' | 'playing'): void {
  if (!mediaSessionSupported()) return;
  try {
    navigator.mediaSession.playbackState = state;
  } catch {
    // ignore
  }
}

export function setMediaSessionPositionFromAudio(audio: HTMLAudioElement): void {
  if (!mediaSessionSupported()) return;
  const duration = audio.duration;
  if (!Number.isFinite(duration) || duration <= 0) return;
  try {
    navigator.mediaSession.setPositionState({
      duration,
      playbackRate: audio.playbackRate || 1,
      position: Math.max(0, Math.min(audio.currentTime || 0, duration)),
    });
  } catch {
    // ignore
  }
}

export function clearMediaSessionPositionState(): void {
  if (!mediaSessionSupported()) return;
  try {
    // MDN: pass null to clear; TS DOM typings often only list MediaPositionState.
    (navigator.mediaSession as MediaSession & { setPositionState(state: MediaPositionState | null): void }).setPositionState(
      null,
    );
  } catch {
    // ignore
  }
}

/**
 * Wire lock screen / headset / notification controls to the given element.
 * Returns a cleanup that clears all handlers (call on unmount or src change).
 */
export function attachMediaSessionActionHandlers(audio: HTMLAudioElement): () => void {
  if (!mediaSessionSupported()) return () => {};

  const run = (fn: () => void) => {
    try {
      fn();
    } catch {
      // ignore
    }
  };

  try {
    navigator.mediaSession.setActionHandler('play', () => run(() => void audio.play()));
    navigator.mediaSession.setActionHandler('pause', () => run(() => audio.pause()));
    navigator.mediaSession.setActionHandler('seekto', (details) => {
      if (details.seekTime != null && Number.isFinite(details.seekTime)) {
        audio.currentTime = Math.max(0, details.seekTime);
      }
    });
  } catch {
    // ignore
  }

  return () => {
    const actions: MediaSessionAction[] = [
      'play',
      'pause',
      'seekto',
      'seekbackward',
      'seekforward',
      'stop',
      'previoustrack',
      'nexttrack',
    ];
    for (const action of actions) {
      try {
        navigator.mediaSession.setActionHandler(action, null);
      } catch {
        // ignore
      }
    }
  };
}

export function resetMediaSessionForUnload(): void {
  if (!mediaSessionSupported()) return;
  try {
    navigator.mediaSession.playbackState = 'none';
    navigator.mediaSession.metadata = null;
    clearMediaSessionPositionState();
  } catch {
    // ignore
  }
}
