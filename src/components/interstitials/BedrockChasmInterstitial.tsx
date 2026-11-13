import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Terminal, Cpu, HardDrive } from 'lucide-react';
import { sound } from '../../services/soundEngine';

export const BedrockChasmInterstitial: React.FC = () => {
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

  // Vertical data stream translation
  const streamY = useTransform(scrollYProgress, [0.15, 0.75], ['80px', '-120px']);
  const streamOpacity = useTransform(scrollYProgress, [0.2, 0.45, 0.7, 0.85], [0, 0.8, 0.8, 0]);

  // Typography tracking
  const textScale = useTransform(scrollYProgress, [0.25, 0.6], [0.92, 1.08]);
  const textY = useTransform(scrollYProgress, [0.25, 0.65], [30, -30]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      if (v > 0.42 && v < 0.58 && !hasTriggeredAudio.current) {
        hasTriggeredAudio.current = true;
        sound.playDeliberateMechanicalKey();
      } else if (v <= 0.2 || v >= 0.8) {
        hasTriggeredAudio.current = false;
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[150vh] select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* Sticky Fullscreen Subterranean Bedrock Chamber */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#040608]">
        
        {/* Phosphor Green & Cyan Radial Glow */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(34, 197, 94, 0.12) 0%, rgba(6, 182, 212, 0.08) 45%, #040608 85%)'
          }}
        />

        {/* Matrix Telemetry Code Stream Streamers */}
        {!isReducedMotion && (
          <motion.div
            style={{ y: streamY, opacity: streamOpacity }}
            className="absolute inset-0 flex justify-between px-[8vw] pointer-events-none font-mono text-[10px] text-emerald-400/40 select-none overflow-hidden"
          >
            <div className="space-y-2">
              <div>0x7FFE_BEEF :: MEMORY_COMMIT_OK</div>
              <div>ALLOC_BUFFER_STATION_32</div>
              <div>STACK: [PYTHON, JS, BASH, SQL]</div>
              <div>KERNEL_PANIC: NONE</div>
              <div>UPTIME: 99.98%</div>
            </div>
            <div className="space-y-2 text-right hidden sm:block">
              <div>SUBSYSTEM: TTY_V2.4</div>
              <div>I/O_CHANNEL: SYNCHRONOUS</div>
              <div>ROOT_AUTH: SAHAJ</div>
              <div>TELEMETRY: VERIFIED</div>
              <div>CHASIS_LOCK: TRUE</div>
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 font-mono text-[11px] text-emerald-300 tracking-[0.3em] uppercase mb-6 backdrop-blur-md shadow-xl">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>TRANSITION 06 // THE BEDROCK DESCENT</span>
          </div>

          {/* Monumental Cinematic Statement */}
          <h2 className="font-mono font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)] max-w-3xl">
            Down to the<br />
            <span className="text-emerald-400">Bare Silicon.</span>
          </h2>

          <p className="font-mono text-xs sm:text-sm text-neutral-400 tracking-[0.25em] uppercase mt-6 max-w-md">
            ENTERING THE SUNKEN TERMINAL &bull; RAW HARDWARE MATRIX
          </p>

          <div className="mt-8 flex items-center gap-3">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-emerald-400" />
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-emerald-400" />
          </div>
        </motion.div>

      </div>
    </div>
  );
};
