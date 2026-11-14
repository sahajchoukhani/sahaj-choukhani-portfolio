import React, { useState, useEffect, useRef } from 'react';
import { Player, PlayerRef } from '@remotion/player';
import { Volume2, VolumeX, X, SkipForward, Play, Pause, Sparkles } from 'lucide-react';
import { TheMakingOfSahaj } from '../../remotion/composition/TheMakingOfSahaj';
import { TOTAL_FRAMES, FPS, COMP_WIDTH, COMP_HEIGHT } from '../../remotion/types';
import { sound } from '../../services/soundEngine';

interface RemotionCinematicIntroProps {
  onComplete: () => void;
}

export const RemotionCinematicIntro: React.FC<RemotionCinematicIntroProps> = ({ onComplete }) => {
  const playerRef = useRef<PlayerRef>(null);
  const [isMuted, setIsMuted] = useState<boolean>(() => sound.getMuted());
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  // Check reduced motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);
    }
  }, []);

  // Keyboard shortcut: ESC to skip, SPACE to play/pause, M to mute
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isMuted]);

  // Attach player event listeners
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const onEnded = () => {
      handleDismiss();
    };

    const onFrameUpdate = (e: { detail: { frame: number } }) => {
      setCurrentFrame(e.detail.frame);
    };

    player.addEventListener('ended', onEnded);
    player.addEventListener('frameupdate', onFrameUpdate);

    return () => {
      player.removeEventListener('ended', onEnded);
      player.removeEventListener('frameupdate', onFrameUpdate);
    };
  }, []);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMasterMuted(nextMuted);
    if (!nextMuted && playerRef.current) {
      sound.playTactileClick();
    }
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (playerRef.current.isPlaying()) {
      playerRef.current.pause();
      setIsPlaying(false);
    } else {
      playerRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 450);
  };

  // If user has reduced motion enabled, show static editorial title card
  if (isReducedMotion) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#05070a] flex items-center justify-center p-6 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ACCESSIBILITY // REDUCED MOTION PREFERRED</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase">
            The Shape of the Unsaid.
          </h1>

          <p className="font-sans italic text-lg text-neutral-300">
            "I give form to what I cannot explain."
          </p>

          <p className="font-mono text-xs text-neutral-400">
            SAHAJ // FOUNDER • TECHNOLOGIST • MUSICIAN
          </p>

          <div className="pt-4">
            <button
              onClick={handleDismiss}
              className="px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-semibold text-sm tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              Enter Portfolio
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progressPercent = Math.min(100, (currentFrame / TOTAL_FRAMES) * 100);
  const currentTimeSec = (currentFrame / FPS).toFixed(1);
  const totalTimeSec = (TOTAL_FRAMES / FPS).toFixed(1);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#05070a] flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 16:9 Responsive Player Container */}
      <div className="relative w-full h-full max-w-[1920px] max-h-[1080px] aspect-video flex items-center justify-center shadow-2xl">
        <Player
          ref={playerRef}
          component={TheMakingOfSahaj}
          inputProps={{
            isMuted,
            showTelemetry: true,
          }}
          durationInFrames={TOTAL_FRAMES}
          fps={FPS}
          compositionWidth={COMP_WIDTH}
          compositionHeight={COMP_HEIGHT}
          style={{
            width: '100%',
            height: '100%',
          }}
          acknowledgeRemotionLicense
          autoPlay
          loop={false}
        />
      </div>

      {/* Floating HUD Controls (Top Bar) */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-50 pointer-events-auto">
        {/* Brand / Chapter Telemetry */}
        <div className="flex items-center gap-3 bg-neutral-950/70 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-800 text-xs font-mono text-neutral-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-white font-semibold">THE MAKING OF SAHAJ</span>
          <span className="text-neutral-500">//</span>
          <span className="text-cyan-400">
            {currentFrame < 54
              ? 'PHASE 01: IGNITION'
              : currentFrame < 234
              ? 'PHASE 02: VELOCITY MONTAGE'
              : currentFrame < 264
              ? 'PHASE 03: SILENCE'
              : 'PHASE 04: THE REVEAL'}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Audio Mute/Unmute */}
          <button
            onClick={toggleMute}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-neutral-950/70 backdrop-blur-md border border-neutral-800 hover:border-neutral-600 text-neutral-300 hover:text-white transition-all text-xs font-mono"
            title={isMuted ? 'Unmute Sound (M)' : 'Mute Sound (M)'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-neutral-400" />
                <span className="hidden sm:inline">MUTED</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline text-cyan-300">AUDIO ON</span>
              </>
            )}
          </button>

          {/* Skip Intro */}
          <button
            onClick={handleDismiss}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white transition-all text-xs font-mono font-medium shadow-[0_0_15px_rgba(0,240,255,0.15)]"
            title="Skip Intro (ESC)"
          >
            <span>SKIP INTRO</span>
            <span className="text-[10px] opacity-60 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">
              ESC
            </span>
          </button>
        </div>
      </div>

      {/* Floating Bottom Progress Bar & Timecode */}
      <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 z-50 pointer-events-auto">
        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 px-1">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="hover:text-cyan-400 transition-colors p-1"
              title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <span>
              {currentTimeSec}s / {totalTimeSec}s
            </span>
          </div>

          <div className="text-neutral-500 text-[10px]">
            FRAME {currentFrame} / {TOTAL_FRAMES} • 30 FPS DCI
          </div>
        </div>

        {/* Progress Track */}
        <div className="w-full h-1 bg-neutral-800/80 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-amber-400 to-rose-500 transition-all duration-100"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
