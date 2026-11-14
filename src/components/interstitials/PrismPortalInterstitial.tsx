import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Rocket, ShieldCheck, Layers, Terminal } from 'lucide-react';

export const PrismPortalInterstitial: React.FC = () => {
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

  // Scale and rotation of the prism monolith
  const prismScale = useTransform(scrollYProgress, [0.15, 0.75], [0.6, 2.8]);
  const prismRotate = useTransform(scrollYProgress, [0.15, 0.75], [-15, 25]);
  const prismOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.7, 0.9], [0, 1, 1, 0]);

  // Facet splitting (expanding outward)
  const facetSplit = useTransform(scrollYProgress, [0.35, 0.7], [0, 120]);

  // Typography tracking
  const titleY = useTransform(scrollYProgress, [0.25, 0.65], [40, -40]);
  const titleOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);

  const ventures = [
    { num: '01', name: 'DRUSAVI', role: 'FOUNDER', color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40' },
    { num: '02', name: 'NYAY LINK', role: 'CO-FOUNDER', color: 'text-purple-400 border-purple-500/40 bg-purple-950/40' },
    { num: '03', name: 'FASAL NITI', role: 'SOLO ARCHITECT', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40' },
    { num: '04', name: 'LESS GO', role: 'STRATEGIST', color: 'text-blue-400 border-blue-500/40 bg-blue-950/40' },
  ];

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[170vh] select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* Sticky Fullscreen Architectural Chamber */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#05090f]">
        
        {/* Cold Cyan & Titanium Radial Matrix Background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.12) 0%, rgba(10, 17, 26, 0.7) 60%, #05090f 85%)'
          }}
        />

        {/* Blueprint Isometric Grid lines */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#00f0ff_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* The 3D Expanding Architectural Crucible */}
        {!isReducedMotion && (
          <motion.div
            style={{ 
              scale: prismScale, 
              rotateZ: prismRotate, 
              opacity: prismOpacity 
            }}
            className="absolute flex items-center justify-center pointer-events-none"
          >
            {/* Center Geometric Core */}
            <div className="w-[320px] h-[320px] rounded-3xl border border-cyan-500/30 flex items-center justify-center bg-cyan-950/10 backdrop-blur-sm shadow-[0_0_100px_rgba(0,240,255,0.15)]">
              <div className="w-[200px] h-[200px] rounded-2xl border border-dashed border-white/20 flex items-center justify-center">
                <div className="w-12 h-12 rounded-xl border border-cyan-400/80 rotate-45" />
              </div>
            </div>
          </motion.div>
        )}

        {/* The 4 Venture Beacons Splitting in 3D Space */}
        {!isReducedMotion && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {ventures.map((v, i) => {
              const angles = [45, 135, 225, 315];
              const rad = (angles[i] * Math.PI) / 180;
              return (
                <motion.div
                  key={v.name}
                  style={{
                    opacity: prismOpacity,
                    x: useTransform(facetSplit, (d) => Math.cos(rad) * (180 + d)),
                    y: useTransform(facetSplit, (d) => Math.sin(rad) * (180 + d)),
                  }}
                  className={`absolute px-4 py-2 rounded-xl border font-mono text-xs backdrop-blur-md shadow-2xl flex items-center gap-2.5 ${v.color}`}
                >
                  <span className="font-bold">{v.num}</span>
                  <span className="tracking-widest uppercase">{v.name}</span>
                  <span className="text-[9px] opacity-75">[{v.role}]</span>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Central Lyrical Typography Event */}
        <motion.div
          style={{ 
            y: isReducedMotion ? 0 : titleY, 
            opacity: titleOpacity 
          }}
          className="relative z-10 max-w-4xl px-6 text-center flex flex-col items-center justify-center"
        >
          {/* Overline Telemetry */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 font-mono text-[11px] text-cyan-300 tracking-[0.3em] uppercase mb-6 backdrop-blur-md">
            <Rocket className="w-3.5 h-3.5 text-cyan-400" />
            <span>TRANSITION 02 // THE ARCHITECTURAL CRUCIBLE</span>
          </div>

          {/* Monumental Cinematic Statement */}
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] max-w-3xl">
            We do not predict the future.<br />
            <span className="text-cyan-400">We architect it.</span>
          </h2>

          <p className="font-mono text-xs sm:text-sm text-neutral-400 tracking-[0.25em] uppercase mt-6 max-w-md">
            ENTERING THE VENTURES ATELIER &bull; 4 ACTIVE ENTERPRISES
          </p>

          <div className="mt-8 flex items-center gap-3">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan-400" />
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-cyan-400" />
          </div>
        </motion.div>

      </div>
    </div>
  );
};

