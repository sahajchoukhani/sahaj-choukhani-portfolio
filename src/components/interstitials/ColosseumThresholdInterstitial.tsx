import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Trophy, Award, Flame, Zap } from 'lucide-react';
import { sound } from '../../services/soundEngine';

export const ColosseumThresholdInterstitial: React.FC = () => {
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

  // Shockwave expansion
  const shockwaveScale = useTransform(scrollYProgress, [0.2, 0.7], [0.3, 4.5]);
  const shockwaveOpacity = useTransform(scrollYProgress, [0.2, 0.45, 0.7, 0.85], [0, 0.8, 0.8, 0]);

  // Stadium floodlight cone opacity
  const floodlightOpacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 0.7, 0]);

  // Typography tracking
  const textScale = useTransform(scrollYProgress, [0.25, 0.6], [0.9, 1.12]);
  const textY = useTransform(scrollYProgress, [0.25, 0.65], [40, -40]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      if (v > 0.4 && v < 0.6 && !hasTriggeredAudio.current) {
        hasTriggeredAudio.current = true;
        sound.playSubBassPunch(55);
      } else if (v <= 0.2 || v >= 0.8) {
        hasTriggeredAudio.current = false;
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[160vh] select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* Sticky Fullscreen Arena Chamber */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#070503]">
        
        {/* Incandescent Sodium-Amber Stadium Floodlight Wash */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(circle at center, rgba(245, 158, 11, 0.22) 0%, rgba(18, 10, 3, 0.85) 60%, #070503 85%)'
          }}
        />

        {/* Stadium Floodlight Cones Slanted Downward */}
        <motion.div
          style={{ opacity: floodlightOpacity }}
          className="absolute inset-0 flex justify-between pointer-events-none px-[10vw]"
        >
          <div className="w-48 h-full bg-gradient-to-b from-amber-400/25 via-amber-500/5 to-transparent blur-2xl transform -rotate-12 origin-top" />
          <div className="w-48 h-full bg-gradient-to-b from-amber-400/25 via-amber-500/5 to-transparent blur-2xl transform rotate-12 origin-top" />
        </motion.div>

        {/* Concentric Stadium Shockwave Rings */}
        {!isReducedMotion && (
          <motion.div
            style={{ 
              scale: shockwaveScale, 
              opacity: shockwaveOpacity 
            }}
            className="absolute flex items-center justify-center pointer-events-none"
          >
            <div className="w-[450px] h-[450px] rounded-full border-2 border-amber-500/40 shadow-[0_0_120px_rgba(245,158,11,0.35)] flex items-center justify-center">
              <div className="w-[320px] h-[320px] rounded-full border border-orange-500/30 flex items-center justify-center">
                <div className="w-[180px] h-[180px] rounded-full border border-amber-400/20" />
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/70 border border-amber-500/40 font-mono text-[11px] text-amber-300 tracking-[0.3em] uppercase mb-6 backdrop-blur-md shadow-xl">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>TRANSITION 03 // THE PROVING GROUND IGNITES</span>
          </div>

          {/* Monumental Cinematic Statement */}
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-7xl text-white tracking-tight uppercase leading-none drop-shadow-[0_10px_40px_rgba(0,0,0,0.95)] max-w-3xl">
            The Arena Does Not<br />
            <span className="text-amber-400">Forgive Ordinary.</span>
          </h2>

          <p className="font-mono text-xs sm:text-sm text-neutral-400 tracking-[0.25em] uppercase mt-6 max-w-md">
            MITS GWALIOR &bull; OP JINDAL &bull; IIM BHUBANESWAR &bull; IIT DELHI &bull; CODEHACK
          </p>

          <div className="mt-8 flex items-center gap-3">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-amber-400" />
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-amber-400" />
          </div>
        </motion.div>

      </div>
    </div>
  );
};

