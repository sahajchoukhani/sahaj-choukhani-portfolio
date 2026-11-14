import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Feather, Sparkles } from 'lucide-react';

export const InkVoidInterstitial: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

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

  // Candlelight beam dilation
  const candleGlowScale = useTransform(scrollYProgress, [0.2, 0.75], [0.3, 3.8]);
  const candleGlowOpacity = useTransform(scrollYProgress, [0.2, 0.45, 0.7, 0.85], [0, 0.8, 0.8, 0]);

  // Typography tracking
  const textScale = useTransform(scrollYProgress, [0.25, 0.6], [0.94, 1.06]);
  const textY = useTransform(scrollYProgress, [0.25, 0.65], [30, -30]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[160vh] select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* Sticky Fullscreen Candlelight Literary Chamber */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#050608]">
        
        {/* Soft Golden Candlelight Radial Aura */}
        <motion.div 
          style={{ 
            scale: isReducedMotion ? 1 : candleGlowScale, 
            opacity: candleGlowOpacity,
            background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.25) 0%, rgba(245, 158, 11, 0.1) 40%, transparent 70%)'
          }}
          className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        />

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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 border border-amber-500/30 font-mono text-[11px] text-amber-300 tracking-[0.3em] uppercase mb-6 backdrop-blur-md shadow-xl">
            <Feather className="w-3.5 h-3.5 text-amber-400" />
            <span>TRANSITION 05 // THE INK VOID</span>
          </div>

          {/* Monumental Cinematic Statement */}
          <h2 className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-white tracking-wide leading-tight drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)] max-w-3xl">
            &ldquo;The unsaid is not empty.<br />
            <span className="text-amber-300">It is overflowing.</span>&rdquo;
          </h2>

          <p className="font-mono text-xs sm:text-sm text-neutral-400 tracking-[0.25em] uppercase mt-6 max-w-md">
            ENTERING THE VAULT OF THE UNSAID &bull; MASTER PORTRAIT &bull; VERSES
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
