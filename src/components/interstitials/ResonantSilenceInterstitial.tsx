import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Music, Volume2, Sparkles } from 'lucide-react';
import { sound } from '../../services/soundEngine';

export const ResonantSilenceInterstitial: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const hasTriggeredAudio = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Acoustic harmonic wave ripple expansion
  const rippleScale = useTransform(scrollYProgress, [0.25, 0.75], [0.1, 5.0]);
  const rippleOpacity = useTransform(scrollYProgress, [0.2, 0.45, 0.7, 0.85], [0, 0.75, 0.75, 0]);

  // Stage footlight glow rise
  const footlightY = useTransform(scrollYProgress, [0.35, 0.75], ['100%', '0%']);
  const footlightOpacity = useTransform(scrollYProgress, [0.35, 0.65], [0, 0.6]);

  // Typography tracking
  const textScale = useTransform(scrollYProgress, [0.25, 0.6], [0.92, 1.08]);
  const textY = useTransform(scrollYProgress, [0.25, 0.65], [30, -30]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);

  // Trigger solitary acoustic piano strike at center threshold
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      if (v > 0.42 && v < 0.58 && !hasTriggeredAudio.current) {
        hasTriggeredAudio.current = true;
        sound.playPianoHammerStrike();
        setTimeout(() => {
          sound.playBronzeWireVibration();
        }, 350);
      } else if (v <= 0.2 || v >= 0.8) {
        hasTriggeredAudio.current = false;
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[180vh] select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* Sticky Fullscreen Acoustic Pause Chamber */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#050406]">
        
        {/* Theatrical Rose & Warm Amber Radial Stage Halo */}
        <div 
          className="absolute inset-0 opacity-45"
          style={{
            background: 'radial-gradient(circle at 50% 65%, rgba(225, 29, 72, 0.16) 0%, rgba(245, 158, 11, 0.12) 35%, rgba(5, 4, 6, 0.85) 70%, #050406 90%)'
          }}
        />

        {/* Theatrical Stage Footlight Rising from Floor */}
        <motion.div
          style={{ y: footlightY, opacity: footlightOpacity }}
          className="absolute bottom-0 inset-x-0 h-[40vh] bg-gradient-to-t from-rose-500/20 via-amber-500/10 to-transparent blur-3xl pointer-events-none"
        />

        {/* Concentric Acoustic Piano Harmonic Wave Ripples */}
        {!isReducedMotion && (
          <motion.div
            style={{ 
              scale: rippleScale, 
              opacity: rippleOpacity 
            }}
            className="absolute flex items-center justify-center pointer-events-none"
          >
            <div className="w-[360px] h-[360px] rounded-full border border-amber-400/40 shadow-[0_0_90px_rgba(245,158,11,0.25)] flex items-center justify-center">
              <div className="w-[240px] h-[240px] rounded-full border border-rose-500/30 flex items-center justify-center">
                <div className="w-[120px] h-[120px] rounded-full border border-amber-300/20" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Central Lyrical Typography Event */}
        <motion.div
          style={{ 
            scale: isReducedMotion ? 1 : textScale, 
            y: isReducedMotion ? 0 : textY, 
            opacity: textOpacity 
          }}
          className="relative z-10 max-w-4xl px-6 text-center flex flex-col items-center justify-center"
        >
          {/* Overline Telemetry */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 font-mono text-[11px] text-rose-300 tracking-[0.3em] uppercase mb-6 backdrop-blur-md shadow-xl">
            <Music className="w-3.5 h-3.5 text-rose-400" />
            <span>TRANSITION 04 // THE RESONANT SILENCE</span>
          </div>

          {/* Monumental Cinematic Statement */}
          <h2 className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-white tracking-wide leading-tight drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)] max-w-3xl">
            &ldquo;Where architecture ends, sound begins.&rdquo;
          </h2>

          <p className="font-mono text-xs sm:text-sm text-neutral-400 tracking-[0.25em] uppercase mt-6 max-w-md">
            ENTERING THE DUAL HORIZON &bull; PIANO &bull; VOCALS &bull; THEATRE
          </p>

          <div className="mt-8 flex items-center gap-3">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-rose-400" />
            <div className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-rose-400" />
          </div>
        </motion.div>

      </div>
    </div>
  );
};
