import React, { useState, useEffect, useRef } from 'react';
import { X, Volume2, VolumeX, Maximize2, Minimize2, FileText, BookOpen, Feather, Sparkles } from 'lucide-react';
import { Poem } from '../data/culturalStudio';
import { sound } from '../services/soundEngine';

interface PoetryReaderModalProps {
  poem: Poem | null;
  onClose: () => void;
}

export const PoetryReaderModal: React.FC<PoetryReaderModalProps> = ({ poem, onClose }) => {
  const [viewMode, setViewMode] = useState<'text' | 'manuscript'>('text');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (poem) {
      sound.playModalWhoosh();
      setScrollProgress(0);
      setIsPlayingAudio(false);
    }
  }, [poem]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullScreen) {
          setIsFullScreen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreen, onClose]);

  // Calculate subtle reading scroll progress
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const totalScroll = scrollHeight - clientHeight;
    if (totalScroll > 0) {
      const progress = Math.min(100, Math.max(0, (scrollTop / totalScroll) * 100));
      setScrollProgress(progress);
    }
  };

  const handleAudioToggle = () => {
    sound.playTactileClick();
    if (poem?.spokenWordAudio) {
      if (!audioRef.current) {
        audioRef.current = new Audio(poem.spokenWordAudio);
        audioRef.current.onended = () => setIsPlayingAudio(false);
      }
      if (isPlayingAudio) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        audioRef.current.play().catch(() => {});
        setIsPlayingAudio(true);
      }
    }
  };

  if (!poem) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl animate-fadeIn ${
      isFullScreen ? 'p-0' : 'p-3 sm:p-6'
    }`}>
      <div 
        className={`relative w-full glass-panel-elevated border border-amber-500/20 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isFullScreen 
            ? 'h-full max-w-full rounded-none' 
            : 'max-w-3xl h-[92vh] rounded-3xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Reading Progress Indicator Bar (Top Edge) */}
        <div className="w-full bg-neutral-900 h-1 relative overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 transition-all duration-150 ease-out"
            style={{ width: `${Math.max(scrollProgress, 4)}%` }}
          />
        </div>

        {/* Top Floating Editorial Header */}
        <div className="bg-neutral-950/90 border-b border-white/10 px-5 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Feather className="w-3.5 h-3.5" />
            </span>
            <div>
              <span className="text-xs font-mono text-neutral-300 font-medium">
                {poem.title}
              </span>
              {poem.isWorkingTitle && (
                <span className="ml-2 text-[10px] font-mono text-amber-400/80 bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-500/20">
                  Working Title
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Switcher: Typography vs Manuscript */}
            <div className="flex items-center rounded-xl bg-black/50 border border-white/10 p-1 text-xs font-mono">
              <button
                onClick={() => {
                  sound.playTactileClick();
                  setViewMode('text');
                }}
                className={`px-3 py-1 rounded-lg transition-all ${
                  viewMode === 'text'
                    ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Typography
              </button>
              <button
                onClick={() => {
                  sound.playTactileClick();
                  setViewMode('manuscript');
                }}
                className={`px-3 py-1 rounded-lg transition-all ${
                  viewMode === 'manuscript'
                    ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Manuscript
              </button>
            </div>

            {/* Full-Screen Toggle */}
            <button
              onClick={() => {
                sound.playTactileClick();
                setIsFullScreen(!isFullScreen);
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              title={isFullScreen ? 'Exit Full Screen' : 'Distraction-Free Full Screen'}
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                sound.playTactileClick();
                onClose();
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
              aria-label="Close reader"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Reader Body */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-6 sm:px-12 md:px-16 py-10 sm:py-14 select-text"
        >
          {viewMode === 'text' ? (
            <article className="max-w-xl mx-auto space-y-12">
              {/* Poem Title & Author Header */}
              <header className="text-center space-y-3 pb-8 border-b border-white/5">
                <span className="text-[11px] font-mono tracking-widest text-amber-400/90 uppercase block">
                  AUTHOR &bull; {poem.author}
                </span>

                <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
                  {poem.title}
                </h1>

                {/* Theme Description */}
                <p className="text-xs sm:text-sm font-sans text-neutral-400 italic">
                  Theme: {poem.themeDescription}
                </p>

                <div className="w-12 h-0.5 bg-amber-400/40 mx-auto pt-2" />
              </header>

              {/* Spoken Word Audio Status Strip (No fabricated audio) */}
              <div className="p-4 rounded-2xl bg-neutral-950/60 border border-white/5 flex items-center justify-between gap-4 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${
                    poem.hasAudioRecording 
                      ? 'bg-amber-400/10 text-amber-300' 
                      : 'bg-white/5 text-neutral-500'
                  }`}>
                    {poem.hasAudioRecording ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="text-neutral-200 block font-medium">
                      Spoken-Word Performance
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      {poem.hasAudioRecording 
                        ? 'Audio Recording Available' 
                        : 'Archival voice recording to be attached'}
                    </span>
                  </div>
                </div>

                {poem.hasAudioRecording ? (
                  <button
                    onClick={handleAudioToggle}
                    className="px-4 py-2 rounded-full bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300 transition-all text-xs"
                  >
                    {isPlayingAudio ? 'Pause' : 'Play Spoken Word'}
                  </button>
                ) : (
                  <span className="text-[10px] text-neutral-500 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    Audio Standby
                  </span>
                )}
              </div>

              {/* Stanzas Display: Exact Stanza Breaks & Line Breaks */}
              <div className="space-y-10 text-neutral-100 font-sans text-base sm:text-lg leading-relaxed sm:leading-loose tracking-wide pl-3 sm:pl-8 border-l border-amber-500/25">
                {poem.stanzas.map((stanza, sIdx) => (
                  <div key={sIdx} className="space-y-2">
                    {stanza.map((line, lIdx) => (
                      <p key={lIdx} className="text-neutral-100 font-light">
                        {line}
                      </p>
                    ))}
                  </div>
                ))}

                {/* Author Signature */}
                {poem.signature && (
                  <div className="pt-6 text-right sm:text-left">
                    <span className="font-mono text-sm tracking-widest text-amber-300/90 font-medium">
                      {poem.signature}
                    </span>
                  </div>
                )}
              </div>

              {/* Editorial Footer Note */}
              <footer className="pt-10 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>The Poetry Vault &bull; Sahaj</span>
                <span className="text-neutral-400">Preserved in Originality</span>
              </footer>
            </article>
          ) : (
            /* Manuscript View Mode */
            <div className="max-w-xl mx-auto py-8 text-center space-y-6">
              {poem.manuscriptImageUrl ? (
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <img 
                    src={poem.manuscriptImageUrl} 
                    alt={`Handwritten manuscript for ${poem.title}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ) : (
                <div className="p-10 rounded-2xl bg-neutral-950/70 border border-white/10 font-mono text-xs text-neutral-400 space-y-4">
                  <FileText className="w-12 h-12 text-amber-400/70 mx-auto" />
                  <h3 className="font-display font-bold text-lg text-white">
                    Handwritten Manuscript Frame
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                    Original handwritten page for <strong className="text-amber-300">"{poem.title}"</strong>. When available, place your manuscript scan or photograph in <code className="text-neutral-200">01_My_Photos/</code> and link it in <code className="text-amber-300">src/data/culturalStudio.ts</code> to display here.
                  </p>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-neutral-400 w-fit mx-auto">
                    Manuscript Attachment Ready
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
