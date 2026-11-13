import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Volume2, Radio, Terminal, Compass, Eye, ShieldAlert } from 'lucide-react';
import { sound } from '../../services/soundEngine';

interface AfterHoursSecretViewProps {
  isOpen: boolean;
  onExit: () => void;
}

export const AfterHoursSecretView: React.FC<AfterHoursSecretViewProps> = ({
  isOpen,
  onExit,
}) => {
  const [localTime, setLocalTime] = useState<string>('');
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [hasPlayedTone, setHasPlayedTone] = useState(false);
  const [resonanceActive, setResonanceActive] = useState(false);

  // Check reduced motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);
    }
  }, []);

  // Update late-night clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Play cinematic swell when entering secret dimension
  useEffect(() => {
    if (isOpen) {
      sound.playTheatricalWarmSwell();
      setTimeout(() => {
        sound.playSubBassPunch(62);
      }, 250);
    }
  }, [isOpen]);

  // Handle ESC key to exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        sound.playTactileClick();
        onExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onExit]);

  // Handle acoustic piano resonance interaction
  const triggerResonance = () => {
    setResonanceActive(true);
    sound.playPianoHammerStrike();
    setTimeout(() => {
      sound.playBronzeWireVibration();
      setResonanceActive(false);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: isReducedMotion ? 0.1 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[120] bg-[#04070c] text-neutral-100 flex flex-col justify-between p-6 sm:p-12 lg:p-16 select-none overflow-y-auto"
        >
          {/* ======================================================== */}
          {/* ATMOSPHERIC BACKGROUND LIGHTING & SUBTLE PARTICLES       */}
          {/* ======================================================== */}
          <div className="fixed inset-0 pointer-events-none">
            {/* Ambient bronze/gold stellar focal point */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[1100px] h-[70vh] opacity-40 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(180, 120, 40, 0.18) 0%, rgba(12, 22, 34, 0.12) 45%, transparent 75%)',
              }}
            />

            {/* Deep vignette */}
            <div className="absolute inset-0 bg-radial-vignette opacity-80" />

            {/* Micro-grain */}
            <div className="absolute inset-0 bg-grain opacity-35 mix-blend-overlay" />
          </div>

          {/* ======================================================== */}
          {/* 1. TOP HEADER NAVIGATION & SYSTEM TELEMETRY              */}
          {/* ======================================================== */}
          <header className="relative z-10 flex items-center justify-between border-b border-white/[0.08] pb-6">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
              <div className="flex flex-col">
                <span className="font-mono text-xs tracking-widest text-amber-300 font-bold uppercase">
                  AFTER HOURS // PROTOCOL 00
                </span>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                  GATEWAY LAYER &bull; CLEARANCE VERIFIED
                </span>
              </div>
            </div>

            {/* Exit Button */}
            <button
              onClick={() => {
                sound.playTactileClick();
                onExit();
              }}
              onMouseEnter={() => sound.playHoverTone()}
              className="group flex items-center gap-2.5 px-4 py-2 rounded-lg border border-amber-400/30 hover:border-amber-400 bg-amber-400/5 hover:bg-amber-400/15 text-amber-300 hover:text-white font-mono text-xs tracking-wider transition-all shadow-lg"
              title="Return to Main Portfolio (ESC)"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
              <span>RETURN TO MAIN PORTFOLIO</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-amber-400/20 border border-amber-400/40 text-[9px] text-amber-200">
                ESC
              </kbd>
            </button>
          </header>

          {/* ======================================================== */}
          {/* 2. CORE CENTERPIECE: MONUMENTAL TYPOGRAPHY & MANIFESTO   */}
          {/* ======================================================== */}
          <main className="relative z-10 max-w-4xl mx-auto my-auto py-12 sm:py-20 text-center flex flex-col items-center justify-center">
            
            {/* Sub-label telemetry */}
            <motion.div
              initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={isReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-amber-500/20 text-amber-400/90 font-mono text-xs tracking-[0.25em] uppercase mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>THE HIDDEN INTERFACE // PHASE 1</span>
            </motion.div>

            {/* Monumental Title: AFTER HOURS */}
            <motion.h1
              initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={isReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight leading-none mb-6 drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
            >
              <span className="bg-gradient-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                AFTER HOURS
              </span>
            </motion.h1>

            {/* Subtitle Quote: "There's more beneath the surface." */}
            <motion.p
              initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
              animate={isReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-lg sm:text-2xl md:text-3xl text-amber-300/90 font-serif italic tracking-wide max-w-2xl mb-10"
            >
              &ldquo;There&apos;s more beneath the surface.&rdquo;
            </motion.p>

            {/* Minimalist Narrative Text */}
            <motion.p
              initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
              animate={isReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="text-neutral-400 text-xs sm:text-sm font-mono leading-relaxed max-w-xl mx-auto mb-10 text-center"
            >
              A subterranean laboratory operating beyond the daylight portfolio.
              Here, raw acoustic piano recordings, unreleased algorithmic prototypes,
              and unpublished verses take shape in the quiet between midnight and dawn.
            </motion.p>

            {/* Interactive Sonic Resonance Button */}
            <motion.div
              initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              animate={isReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <button
                onClick={triggerResonance}
                onMouseEnter={() => sound.playHoverTone()}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full border transition-all font-mono text-xs ${
                  resonanceActive
                    ? 'border-amber-400 bg-amber-400/20 text-white shadow-[0_0_25px_rgba(251,191,36,0.4)] scale-105'
                    : 'border-white/15 bg-white/[0.04] text-neutral-300 hover:border-amber-400/60 hover:text-amber-300 hover:bg-amber-400/5'
                }`}
              >
                <Volume2 className={`w-4 h-4 ${resonanceActive ? 'text-amber-300 animate-bounce' : 'text-neutral-400'}`} />
                <span>{resonanceActive ? 'RESONATING...' : 'TRIGGER PIANO RESONANCE'}</span>
              </button>

              <button
                onClick={() => {
                  sound.playTactileClick();
                  onExit();
                }}
                onMouseEnter={() => sound.playHoverTone()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-100 hover:bg-amber-400 text-neutral-950 font-mono text-xs font-bold transition-all shadow-md"
              >
                <span>RETURN TO PORTFOLIO</span>
              </button>
            </motion.div>
          </main>

          {/* ======================================================== */}
          {/* 3. BOTTOM TELEMETRY FOOTER                               */}
          {/* ======================================================== */}
          <footer className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.08] pt-6 font-mono text-xs text-neutral-500">
            <div className="flex items-center gap-3">
              <span className="text-neutral-600">STATION TIME:</span>
              <span className="text-amber-400 font-semibold">{localTime || '04:00:00'} IST</span>
              <span className="text-neutral-700">&bull;</span>
              <span className="text-neutral-400">LATENCY: ZERO</span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="text-neutral-600">STATE:</span>
              <span className="text-neutral-300">INCUBATION GATEWAY</span>
              <span className="text-neutral-700">&bull;</span>
              <span className="text-neutral-400">PRESS ESC TO RETURN</span>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

