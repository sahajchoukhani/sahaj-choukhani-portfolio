import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, Film, ShieldCheck, Award, Upload } from 'lucide-react';
import { theatreVideoData, TheatreVideoAsset } from '../data/assets';
import { sound } from '../services/soundEngine';

interface TheatreVideoPlayerProps {
  customVideo?: TheatreVideoAsset;
}

export const TheatreVideoPlayer: React.FC<TheatreVideoPlayerProps> = ({ customVideo }) => {
  const videoData = customVideo || theatreVideoData;
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [localVideoUrl, setLocalVideoUrl] = useState<string | null>(videoData.videoSrc || null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 0;
    setCurrentTime(formatTime(current));
    if (total > 0) {
      setProgress((current / total) * 100);
      setDuration(formatTime(total));
    }
  };

  const handleTogglePlay = () => {
    sound.playTactileClick();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleToggleMute = () => {
    sound.playTactileClick();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleToggleFullscreen = () => {
    sound.playTactileClick();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullScreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullScreen(false);
    }
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const targetProgress = Number(e.target.value);
    const targetTime = (targetProgress / 100) * (videoRef.current.duration || 0);
    videoRef.current.currentTime = targetTime;
    setProgress(targetProgress);
  };

  // Local file picker so Sahaj can test playing his actual theatre video immediately
  const handleLocalVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    sound.playTactileClick();
    sound.playVictoryFanfare();
    const objectUrl = URL.createObjectURL(file);
    setLocalVideoUrl(objectUrl);
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div 
      ref={containerRef}
      className="glass-panel-elevated rounded-3xl border border-amber-500/30 overflow-hidden shadow-2xl relative group"
    >
      {/* Top Media Bar */}
      <div className="bg-neutral-950/90 border-b border-white/10 px-5 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm sm:text-base text-white line-clamp-1">
              {videoData.title}
            </h3>
            <span className="text-[11px] font-mono text-amber-400 flex items-center gap-1.5">
              <Award className="w-3 h-3" />
              {videoData.accolade}
            </span>
          </div>
        </div>

        {/* Upload Local Video Button */}
        <label className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-neutral-300 hover:text-white cursor-pointer transition-all">
          <Upload className="w-3.5 h-3.5 text-amber-400" />
          <span>{localVideoUrl ? 'Switch Video File' : 'Load Theatre MP4/WebM'}</span>
          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            onChange={handleLocalVideoUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Main Video Viewport */}
      <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
        {localVideoUrl ? (
          <>
            <video
              ref={videoRef}
              src={localVideoUrl}
              poster={videoData.posterSrc}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-contain cursor-pointer"
              onClick={handleTogglePlay}
            />

            {/* Big Play/Pause Center Overlay */}
            {!isPlaying && (
              <button
                onClick={handleTogglePlay}
                className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-amber-400/90 hover:bg-amber-300 text-neutral-950 flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
                aria-label="Play video"
              >
                <Play className="w-8 h-8 ml-1" />
              </button>
            )}
          </>
        ) : (
          /* Intentional Video Standby Frame (No fake video) */
          <div className="text-center p-8 sm:p-12 space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
              <Film className="w-8 h-8" />
            </div>

            <h4 className="font-display font-bold text-xl sm:text-2xl text-white">
              Actual Theatre Performance Video
            </h4>

            <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
              This player is ready for your live stage recording. You can click <strong className="text-amber-300">"Load Theatre MP4/WebM"</strong> to test streaming your video right now, or place it in <code className="text-neutral-200">public/videos/theatre-performance.mp4</code>.
            </p>

            <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] font-mono text-neutral-400">
              Preserved &bull; Full-screen &bull; Mobile playsinline
            </div>
          </div>
        )}
      </div>

      {/* Bottom Video Controls (Active when video is present) */}
      {localVideoUrl && (
        <div className="bg-neutral-950/95 border-t border-white/10 px-5 py-3.5 space-y-2">
          {/* Progress Bar Scrubber */}
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleScrub}
            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />

          <div className="flex items-center justify-between text-xs font-mono">
            {/* Play/Pause & Time */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleTogglePlay}
                className="p-1.5 rounded-lg text-white hover:text-amber-400 transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={handleToggleMute}
                className="p-1.5 rounded-lg text-white hover:text-amber-400 transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="text-neutral-400 text-[11px]">
                {currentTime} / {duration}
              </span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-neutral-500 uppercase hidden sm:inline">
                Live Theatre Recording
              </span>
              <button
                onClick={handleToggleFullscreen}
                className="p-1.5 rounded-lg text-white hover:text-amber-400 transition-colors"
                title="Toggle Fullscreen"
              >
                {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verified Context Footer */}
      <div className="bg-neutral-900/40 px-5 py-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-neutral-400">
        <span>{videoData.recordedContext}</span>
        <span className="text-amber-400/90 font-medium">Verified Stage Achievement</span>
      </div>
    </div>
  );
};

