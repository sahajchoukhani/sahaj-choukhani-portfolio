import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, 
  ExternalLink, 
  RefreshCw, 
  Lock, 
  Sparkles, 
  Maximize2, 
  Minimize2, 
  Camera, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  Sliders
} from 'lucide-react';
import { sound } from '../services/soundEngine';

export interface InteractiveWebsitePreviewProps {
  url?: string;
  previewImage?: string;
  hasGenuineImage?: boolean;
  title: string;
  role?: string;
  category?: string;
  aspectRatio?: '16/10' | '16/9' | '4/3';
  className?: string;
  allowFullscreen?: boolean;
  initialMode?: 'auto' | 'live' | 'image';
}

export const InteractiveWebsitePreview: React.FC<InteractiveWebsitePreviewProps> = ({
  url,
  previewImage,
  hasGenuineImage = false,
  title,
  role,
  category,
  aspectRatio = '16/10',
  className = '',
  allowFullscreen = true,
  initialMode = 'auto',
}) => {
  // Mode: 'live' (Priority 1) | 'image' (Priority 2) | 'placeholder' (Priority 2 fallback)
  const determineInitialMode = (): 'live' | 'image' | 'placeholder' => {
    if (initialMode === 'image' && previewImage && hasGenuineImage) return 'image';
    if (initialMode === 'live' && url) return 'live';
    if (url) return 'live';
    if (previewImage && hasGenuineImage) return 'image';
    return 'placeholder';
  };

  const [mode, setMode] = useState<'live' | 'image' | 'placeholder'>(determineInitialMode);
  const [isLoadingIframe, setIsLoadingIframe] = useState<boolean>(Boolean(url));
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [loadTimedOut, setLoadTimedOut] = useState<boolean>(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle URL change
  useEffect(() => {
    setMode(determineInitialMode());
    setIsLoadingIframe(Boolean(url));
    setLoadTimedOut(false);
  }, [url, previewImage, hasGenuineImage]);

  // Set timeout for iframe loading detection: if not loaded in 8s, fall back to image
  useEffect(() => {
    if (mode === 'live' && url) {
      setIsLoadingIframe(true);
      timeoutRef.current = setTimeout(() => {
        // If iframe hasn't finished loading after 8s, switch smoothly to image fallback if available
        if (previewImage && hasGenuineImage) {
          setLoadTimedOut(true);
          setMode('image');
          setIsLoadingIframe(false);
        }
      }, 8000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [mode, url, iframeKey, previewImage, hasGenuineImage]);

  const handleIframeLoad = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsLoadingIframe(false);
  };

  const handleIframeError = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsLoadingIframe(false);
    // Priority 2: Fall back to landing page image preview
    if (previewImage && hasGenuineImage) {
      setMode('image');
    } else {
      setMode('placeholder');
    }
  };

  const handleReload = () => {
    sound.playTactileClick();
    setIframeKey((prev) => prev + 1);
    setIsLoadingIframe(true);
    setMode('live');
  };

  const toggleMode = () => {
    sound.playTactileClick();
    if (mode === 'live') {
      if (previewImage && hasGenuineImage) {
        setMode('image');
      } else {
        setMode('placeholder');
      }
    } else {
      if (url) {
        setMode('live');
        setIsLoadingIframe(true);
      }
    }
  };

  const toggleFullscreen = () => {
    sound.playTactileClick();
    setIsFullscreen(!isFullscreen);
  };

  const getCleanDomain = (fullUrl?: string) => {
    if (!fullUrl) return 'internal://preview-vault';
    try {
      const parsed = new URL(fullUrl);
      return parsed.hostname + (parsed.pathname !== '/' ? parsed.pathname : '');
    } catch {
      return fullUrl.replace(/^https?:\/\//, '');
    }
  };

  const aspectClass = 
    aspectRatio === '16/9' ? 'aspect-[16/9]' :
    aspectRatio === '4/3' ? 'aspect-[4/3]' : 'aspect-[16/10]';

  return (
    <>
      <div 
        className={`group relative rounded-2xl sm:rounded-3xl border border-white/15 bg-neutral-950/90 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
          isFullscreen 
            ? 'fixed inset-4 sm:inset-10 z-[100] max-h-none h-auto' 
            : `${aspectClass} min-h-[380px] sm:min-h-[460px] w-full`
        } ${className}`}
      >
        {/* ======================================================== */}
        {/* BROWSER CHASSIS OMNIBAR / TOP TOOLBAR                    */}
        {/* ======================================================== */}
        <div className="bg-neutral-900/95 px-4 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0 select-none">
          {/* Left: Window Traffic Light Dots & Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-sm" />
            </div>

            <div className="hidden md:flex items-center gap-2 pl-2 border-l border-white/10 text-xs font-mono text-neutral-300">
              <span className="text-white font-semibold">{title}</span>
              {role && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-300">
                  {role}
                </span>
              )}
            </div>
          </div>

          {/* Center: Interactive Omnibar */}
          <div className="flex-1 max-w-sm sm:max-w-md mx-auto hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-neutral-300 shadow-inner">
            <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate text-[11px] text-neutral-300">
              {getCleanDomain(url)}
            </span>
            {url && mode === 'live' && (
              <button
                onClick={handleReload}
                title="Reload live frame"
                className="ml-auto text-neutral-500 hover:text-white transition-colors"
                aria-label="Reload preview"
              >
                <RefreshCw className={`w-3 h-3 ${isLoadingIframe ? 'animate-spin text-cyan-400' : ''}`} />
              </button>
            )}
          </div>

          {/* Right: State Badges & Interactive Controls */}
          <div className="flex items-center gap-2">
            {/* Priority Status Pill */}
            {mode === 'live' && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-semibold text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden xs:inline">LIVE INTERACTIVE</span>
                <span className="xs:hidden">LIVE</span>
              </div>
            )}

            {mode === 'image' && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono font-semibold text-amber-300">
                <Camera className="w-3 h-3 text-amber-400" />
                <span className="hidden xs:inline">LANDING PAGE CAPTURE</span>
                <span className="xs:hidden">CAPTURE</span>
              </div>
            )}

            {mode === 'placeholder' && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-[10px] font-mono font-semibold text-violet-300">
                <Clock className="w-3 h-3 text-violet-400" />
                <span>PREVIEW COMING SOON</span>
              </div>
            )}

            {/* Mode Switcher Toggle (if both live and image preview available) */}
            {url && previewImage && hasGenuineImage && (
              <button
                onClick={toggleMode}
                title={mode === 'live' ? 'Switch to static landing page capture' : 'Switch to live interactive embed'}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-[10px] font-mono border border-white/10 transition-colors flex items-center gap-1.5"
              >
                <Sliders className="w-3 h-3 text-cyan-400" />
                <span className="hidden md:inline">
                  {mode === 'live' ? 'View Static Capture' : 'Try Live Embed'}
                </span>
              </button>
            )}

            {/* Priority 3: Optional External Access */}
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playTactileClick()}
                title="Visit original website in a new tab"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-300 hover:text-cyan-200 border border-cyan-500/30 text-[11px] font-mono font-medium transition-colors"
              >
                <span>Visit Original Website</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {/* Fullscreen Expand/Collapse */}
            {allowFullscreen && (
              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                title={isFullscreen ? 'Exit cinema view' : 'Expand preview to cinema view'}
                aria-label="Toggle fullscreen view"
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* MAIN PREVIEW VIEWPORT AREA                               */}
        {/* ======================================================== */}
        <div className="relative flex-1 w-full h-full overflow-hidden bg-black flex items-center justify-center">
          {/* ----------------------------------------------------- */}
          {/* PRIORITY 1: LIVE EMBEDDED WEBSITE                     */}
          {/* ----------------------------------------------------- */}
          {mode === 'live' && url && (
            <div className="relative w-full h-full">
              {/* Loading Indicator */}
              {isLoadingIframe && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-neutral-950/90 backdrop-blur-sm space-y-3">
                  <div className="w-8 h-8 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
                  <p className="font-mono text-xs text-neutral-300">
                    Connecting to live website...
                  </p>
                  <span className="text-[10px] font-mono text-neutral-500">
                    {getCleanDomain(url)}
                  </span>
                </div>
              )}

              {/* The Live Interactive Iframe */}
              <iframe
                key={iframeKey}
                src={url}
                title={`${title} Live Preview`}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                loading="lazy"
                className="w-full h-full border-0 bg-white"
              />

              {/* Floating Interactive Badge at Bottom */}
              <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
                <div className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300 shadow-xl flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Scroll &amp; interact inside frame • Staying on portfolio</span>
                </div>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------- */}
          {/* PRIORITY 2: LANDING-PAGE IMAGE PREVIEW                */}
          {/* ----------------------------------------------------- */}
          {mode === 'image' && previewImage && (
            <div className="relative w-full h-full group/img overflow-auto flex items-start justify-center bg-neutral-950">
              <img
                src={previewImage}
                alt={`${title} landing page authentic capture`}
                className="w-full h-auto min-h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-[1.01]"
              />

              {/* Subtle Vignette & Archival Capture Badge */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 z-10 pointer-events-none">
                <div className="px-3 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-amber-500/30 text-[11px] font-mono text-amber-200 shadow-xl flex items-center gap-2">
                  <Camera className="w-3.5 h-3.5 text-amber-400" />
                  <span>Authentic Landing Page Capture — Preserved original appearance</span>
                </div>

                {url && (
                  <div className="pointer-events-auto">
                    <button
                      onClick={toggleMode}
                      className="px-3 py-1 rounded-xl bg-cyan-400/90 hover:bg-cyan-300 text-neutral-950 text-xs font-mono font-semibold transition-all shadow-lg flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Switch to Live Embed</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ----------------------------------------------------- */}
          {/* PRIORITY 2 FALLBACK: POLISHED PLACEHOLDER             */}
          {/* ----------------------------------------------------- */}
          {mode === 'placeholder' && (
            <div className="p-8 text-center max-w-md space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-neutral-900 border border-white/10 flex items-center justify-center mx-auto shadow-xl text-neutral-400">
                <Clock className="w-7 h-7 text-amber-400/80 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-1">
                  PREVIEW COMING SOON
                </span>
                <h4 className="font-display font-bold text-xl text-white">
                  {title} Web Platform
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed mt-2">
                  Production deployment and official public landing page are currently in active preparation. A verified interactive preview will be embedded here upon launch.
                </p>
              </div>

              {role && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
                  <span>Role: {role}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Backdrop when expanded */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[90]" 
          onClick={toggleFullscreen} 
        />
      )}
    </>
  );
};
