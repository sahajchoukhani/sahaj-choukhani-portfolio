import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Camera, Sparkles, Compass } from 'lucide-react';

export const ApertureTunnelInterstitial: React.FC = () => {
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

  // Camera lens scale & rotation
  const lensScale = useTransform(scrollYProgress, [0.15, 0.7], [0.5, 5.0]);
  const lensRotate = useTransform(scrollYProgress, [0.15, 0.7], [0, 90]);
  const lensOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.65, 0.85], [0, 1, 1, 0]);

  // Typography translation & blur
  const textScale = useTransform(scrollYProgress, [0.25, 0.6], [0.85, 1.15]);
  const textY = useTransform(scrollYProgress, [0.25, 0.65], [40, -40]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.75], [0, 1, 1, 0]);

  // Light leak sweep
  const lightLeakX = useTransform(scrollYProgress, [0.2, 0.7], ['-100%', '200%']);
  const lightLeakOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0.45, 0]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[160vh] select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* Sticky Fullscreen Cinematic Chamber */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#070b12]">
        
        {/* Ambient Dark Horizon Radial Halo */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, rgba(7, 11, 18, 0.8) 60%, #070b12 85%)'
          }}
        />

        {/* Diagonal Light Leak Streak */}
        <motion.div
          style={{ x: lightLeakX, opacity: lightLeakOpacity }}
          className="absolute inset-y-0 w-[50vw] bg-gradient-to-r from-transparent via-amber-400/20 to-transparent blur-3xl -skew-x-12 pointer-events-none"
        />

        {/* Concentric Geometric Aperture Rings */}
        {!isReducedMotion && (
          <motion.div
            style={{ 
              scale: lensScale, 
              rotate: lensRotate, 
              opacity: lensOpacity 
            }}
            className="absolute flex items-center justify-center pointer-events-none"
          >
            {/* Outer calibration ring */}
            <div className="w-[500px] h-[500px] rounded-full border border-amber-500/20 flex items-center justify-center">
              {/* Mid aperture iris */}
              <div className="w-[380px] h-[380px] rounded-full border border-dashed border-amber-400/30 flex items-center justify-center">
                {/* Inner glass aperture */}
                <div className="w-[240px] h-[240px] rounded-full border-2 border-white/20 flex items-center justify-center bg-radial from-amber-400/5 to-transparent shadow-[0_0_80px_rgba(245,158,11,0.2)]">
                  <div className="w-16 h-16 rounded-full border border-amber-400/60" />
                </div>
              </div>
            </div>

            {/* Aperture Tick Marks */}
            <div className="absolute font-mono text-[9px] text-amber-500/60 tracking-[0.3em] uppercase">
              F/1.4 &bull; 85MM &bull; ARCHIVAL GLASS
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-amber-500/30 font-mono text-[11px] text-amber-400/90 tracking-[0.3em] uppercase mb-6 backdrop-blur-md">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>TRANSITION 01 // THE APERTURE DILATION</span>
          </div>

          {/* Monumental Cinematic Statement */}
          <h2 className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-white tracking-wide leading-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] max-w-3xl">
            &ldquo;We remember not days, but moments.&rdquo;
          </h2>

          <p className="font-mono text-xs sm:text-sm text-neutral-400 tracking-[0.2em] uppercase mt-6 max-w-md">
            ENTERING THE LIVING ARCHIVES &bull; STAGED IN 3D SPACE
          </p>

          <div className="mt-8 flex items-center gap-3">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-amber-400/80" />
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-amber-400/80" />
          </div>
        </motion.div>

      </div>
    </div>
  );
};

