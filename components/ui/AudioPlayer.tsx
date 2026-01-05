import { useEffect, useMemo, useRef, useState } from 'react';

type Props = {
  src: string;
  title?: string;
  subtitle?: string;
  onPlay?: () => void;
  onEnded?: () => void;
  variant?: 'card' | 'floatingCircle';
};

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return '00:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/**
 * A reliable custom audio player UI using the native <audio> element.
 * - No WebAudio, no CORS complications.
 * - Works in browsers + mobile webviews.
 */
export default function AudioPlayer({
  src,
  title,
  subtitle,
  onPlay,
  onEnded,
  variant = 'card',
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const onPlayRef = useRef<Props['onPlay']>(onPlay);
  const onEndedRef = useRef<Props['onEnded']>(onEnded);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'playing' | 'paused' | 'ended' | 'error'>(
    'idle',
  );
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const progressPct = useMemo(() => {
    if (!duration) return 0;
    return Math.max(0, Math.min(100, (current / duration) * 100));
  }, [current, duration]);

  // Keep callbacks stable (so our audio setup effect doesn't re-run on every render).
  useEffect(() => {
    onPlayRef.current = onPlay;
  }, [onPlay]);

  useEffect(() => {
    onEndedRef.current = onEnded;
  }, [onEnded]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    // Reset state on src change
    setIsPlaying(false);
    setHasStarted(false);
    setStatus('loading');
    setCurrent(0);
    setDuration(0);

    const stopRaf = () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };

    const tick = () => {
      setCurrent(a.currentTime || 0);
      rafRef.current = requestAnimationFrame(tick);
    };

    const onLoadedMetadata = () => {
      setDuration(Number.isFinite(a.duration) ? a.duration : 0);
    };
    const onCanPlay = () => setStatus('ready');
    const onPlayEvt = () => {
      setIsPlaying(true);
      setHasStarted(true);
      setStatus('playing');
      onPlayRef.current?.();
      stopRaf();
      rafRef.current = requestAnimationFrame(tick);
    };
    const onPauseEvt = () => {
      setIsPlaying(false);
      setStatus('paused');
      stopRaf();
    };
    const onEndedEvt = () => {
      setIsPlaying(false);
      setStatus('ended');
      stopRaf();
      onEndedRef.current?.();
    };
    const onErrorEvt = () => {
      setIsPlaying(false);
      setStatus('error');
      stopRaf();
    };
    const onWaitingEvt = () => setStatus('loading');
    const onPlayingEvt = () => setStatus('playing');

    a.addEventListener('loadedmetadata', onLoadedMetadata);
    a.addEventListener('canplay', onCanPlay);
    a.addEventListener('play', onPlayEvt);
    a.addEventListener('pause', onPauseEvt);
    a.addEventListener('ended', onEndedEvt);
    a.addEventListener('error', onErrorEvt);
    a.addEventListener('waiting', onWaitingEvt);
    a.addEventListener('playing', onPlayingEvt);

    // Ensure the element is pointed at the current src.
    a.src = src;
    a.preload = 'auto';
    // iOS Safari / WKWebView: keep playback inline.
    a.setAttribute('playsinline', 'true');
    a.setAttribute('webkit-playsinline', 'true');

    // Kick off metadata load
    try {
      a.load();
    } catch {
      // ignore
    }

    return () => {
      stopRaf();
      a.removeEventListener('loadedmetadata', onLoadedMetadata);
      a.removeEventListener('canplay', onCanPlay);
      a.removeEventListener('play', onPlayEvt);
      a.removeEventListener('pause', onPauseEvt);
      a.removeEventListener('ended', onEndedEvt);
      a.removeEventListener('error', onErrorEvt);
      a.removeEventListener('waiting', onWaitingEvt);
      a.removeEventListener('playing', onPlayingEvt);
    };
  }, [src]);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;

    if (a.paused) {
      setStatus('loading');
      try {
        await a.play();
      } catch {
        // iOS/webview autoplay restrictions or other failures
        setStatus('error');
      }
    } else {
      a.pause();
    }
  };

  const seekToPct = (pct: number) => {
    const a = audioRef.current;
    if (!a) return;
    if (!duration) return;
    const next = (pct / 100) * duration;
    a.currentTime = Math.max(0, Math.min(duration, next));
    setCurrent(a.currentTime);
  };

  // Icons (no dependency)
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

  // Ring styles
  const ringMode: 'idle' | 'paused' | 'playing' = isPlaying ? 'playing' : hasStarted ? 'paused' : 'idle';

  const ringBorderStyle = useMemo(() => {
    // User wants a clear white solid border; glow is separate.
    return {
      borderColor: 'rgba(255,255,255,0.55)',
    } as const;
  }, []);

  const ringClass =
    ringMode === 'playing'
      ? 'fb-ring fb-ring--playing'
      : ringMode === 'paused'
        ? 'fb-ring fb-ring--paused'
        : 'fb-ring fb-ring--idle';

  const statusLabel =
    status === 'loading'
      ? 'Loading…'
      : status === 'error'
        ? 'Audio failed to play'
        : status === 'ended'
          ? 'Finished'
          : '';

  // Default card UI (kept for other screens / future use)
  const cardUi = (
    <div className="w-full rounded-2xl bg-black/20 shadow-xl p-4">
      {/* Keep audio in DOM but visually hidden */}
      <audio
        ref={audioRef}
        src={src}
        style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {title ? <div className="text-white font-semibold truncate">{title}</div> : null}
          {subtitle ? <div className="text-white/70 text-xs truncate mt-0.5">{subtitle}</div> : null}
          {statusLabel ? <div className="text-white/80 text-xs mt-1">{statusLabel}</div> : null}
        </div>
        <button
          type="button"
          onClick={toggle}
          className="shrink-0 px-5 py-2 rounded-full bg-white/20 hover:bg-white/30 active:bg-white/35 text-white text-sm font-semibold"
        >
          {isPlaying ? PauseIcon : PlayIcon}
        </button>
      </div>

      <div className="mt-4">
        <div
          className="w-full h-3 rounded-full bg-white/20 overflow-hidden cursor-pointer"
          role="slider"
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progressPct)}
          tabIndex={0}
          onClick={(e) => {
            const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
            const pct = ((e.clientX - rect.left) / rect.width) * 100;
            seekToPct(pct);
          }}
        >
          <div className="h-3 bg-white/80 rounded-full" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="flex items-center justify-between text-white/80 text-xs mt-2">
          <span>{formatTime(current)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );

  const floatingUi = (
    <div
      className="fixed left-1/2 -translate-x-1/2 z-50"
      style={{
        bottom: `calc(env(safe-area-inset-bottom) + 74px)`,
      }}
    >
      <style>{`
        /* Keep it simple (like your snippet):
           - border stays solid white
           - glow is only box-shadow OUTSIDE the circle
           - playing animates COLORS only (no growth/shrink) */
        .fb-ring {
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.60);
          background: transparent;
          transition: box-shadow 2000ms ease;
          will-change: box-shadow;
        }

        .fb-ring--idle {
          box-shadow: 0 0 10px 4px rgba(255,255,255,0.22);
        }

        .fb-ring--paused {
          box-shadow:
            0 0 12px 2px rgba(253, 159, 71, 0.55),
            0 0 26px 10px rgba(245, 158, 11, 0.18);
        }

        @keyframes fbGlowColors {
          0% {
            box-shadow:
              0 0 12px 2px rgba(246, 0, 0, 0.55),
              0 0 26px 10px rgba(255, 132, 0, 0.18);
          }
          50% {
            box-shadow:
              0 0 12px 2px rgba(255, 120, 0, 0.55),
              0 0 26px 10px rgba(255, 64, 64, 0.18);
          }
          100% {
            box-shadow:
              0 0 12px 2px rgba(246, 0, 0, 0.55),
              0 0 26px 10px rgba(255, 132, 0, 0.18);
          }
        }

        .fb-ring--playing {
          animation: fbGlowColors 2.4s linear infinite;
        }
      `}</style>
      {/* Keep audio in DOM but visually hidden */}
      <audio
        ref={audioRef}
        src={src}
        style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }}
      />

      <div
        className={`${ringClass} flex flex-col items-center justify-between relative`}
        style={{
          width: '70vw',
          maxWidth: 420,
          minWidth: 280,
          // Avoid aspect-ratio quirks in some webviews: keep explicit square sizing.
          height: '70vw',
          maxHeight: 420,
          minHeight: 280,
          padding: 14, // ring thickness area
          // keep your nice outer transparency effect (subtle)
          backgroundColor: 'rgba(255,255,255,0.06)',
          ...ringBorderStyle,
        }}
      >
        {/* Inner content area (no background fill) */}
        <div
          className="w-full h-full rounded-full flex flex-col items-center justify-center"
          style={{
            // Use responsive padding so content always stays inside the circle.
            padding: 'clamp(16px, 4.5vw, 34px)',
            boxSizing: 'border-box',
            gap: 'clamp(12px, 2.8vw, 18px)',
          }}
        >
          <div className="w-full text-center">
            {title ? (
              <div
                className="text-white font-semibold text-base md:text-lg truncate"
                style={{ textShadow: '0 2px 14px rgba(0,0,0,0.35)' }}
              >
                {title}
              </div>
            ) : null}
            {subtitle ? (
              <div
                className="text-white/80 text-xs md:text-sm truncate mt-1"
                style={{ textShadow: '0 2px 14px rgba(0,0,0,0.35)' }}
              >
                {subtitle}
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={toggle}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="text-white flex items-center justify-center"
            style={{
              width: 76,
              height: 76,
              background: 'transparent',
              border: 'none',
              padding: 0,
            }}
          >
            <span className="text-white" style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.25))' }}>
              {isPlaying ? PauseIcon : PlayIcon}
            </span>
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
              style={{
                width: '80%', // 20% shorter
                background: 'rgba(255,255,255,0.18)',
                boxShadow: '0 0 14px rgba(0,0,0,0.22)',
              }}
              onClick={(e) => {
                const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                const pct = ((e.clientX - rect.left) / rect.width) * 100;
                seekToPct(pct);
              }}
            >
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${progressPct}%`,
                  background: 'rgba(255,255,255,0.85)',
                  boxShadow: '0 0 16px rgba(255,255,255,0.25)',
                }}
              />
            </div>

            <div
              className="flex items-center justify-between text-white/85 text-xs mt-2 select-none"
              style={{
                textShadow: '0 2px 14px rgba(0,0,0,0.35)',
                fontVariantNumeric: 'tabular-nums',
                width: '80%',
              }}
            >
              <span>{formatTime(current)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Default to floatingCircle when explicitly requested; otherwise keep the card.
  // (Practice page will use floatingCircle.)
  return variant === 'floatingCircle' ? floatingUi : cardUi;
}

