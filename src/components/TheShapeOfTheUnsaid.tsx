import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Compass, Feather, Terminal, ChevronDown } from 'lucide-react';
import { AdaptiveEditorialPhoto } from './AdaptiveEditorialPhoto';
import { sound } from '../services/soundEngine';

export const TheShapeOfTheUnsaid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Monumental typography scale and letter-spacing drift
  const titleScale = useTransform(scrollYProgress, [0.1, 0.45], [0.92, 1.06]);
  const titleY = useTransform(scrollYProgress, [0.1, 0.5], [20, -10]);
  const portraitY = useTransform(scrollYProgress, [0.15, 0.6], [40, -20]);
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.3, 0.65, 0.25]);

  return (
    <section 
      id="unsaid" 
      ref={containerRef}
      className="relative pt-36 pb-20 sm:pt-48 sm:pb-28 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden scroll-mt-28"
    >
      {/* Background Radial Ambient Aura (Harmonized Deep Slate & Warm Archival Bronze) */}
      <motion.div 
        style={{ opacity: glowOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[750px] bg-gradient-radial from-[#1a2c40]/35 via-[#0c1926]/50 to-transparent blur-[180px] pointer-events-none rounded-full" 
      />

      {/* Section Frame & Editorial Layout */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Editorial Sub-Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-amber-500/30 text-xs font-mono text-amber-300 mb-8 shadow-xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="tracking-widest uppercase">THE CLIMAX &bull; MASTER REVEAL</span>
        </motion.div>

        {/* Monumental Editorial Headline with Scroll Parallax Scaling */}
        <motion.h2
          style={{ scale: titleScale, y: titleY }}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.1, ease: 'easeOut' }}
          className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-9xl tracking-tight text-white uppercase mb-6 drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
        >
          The Shape of the Unsaid.
        </motion.h2>

        {/* The Core Poetic Credo */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.25, ease: 'easeOut' }}
          className="font-serif italic text-xl sm:text-2xl md:text-3xl text-neutral-300 max-w-2xl mx-auto mb-16 tracking-wide font-light"
        >
          "I give form to what I cannot explain."
        </motion.p>

        {/* Cinematic Master Portrait with Feathered Edge Blending & Scroll Float */}
        <motion.div 
          style={{ y: portraitY }}
          className="relative w-full max-w-2xl mx-auto"
        >
          {/* Aged Bronze Corner Calibration Marks */}
          <div className="absolute -top-4 -left-4 text-amber-500/50 text-sm font-mono select-none">┌</div>
          <div className="absolute -top-4 -right-4 text-amber-500/50 text-sm font-mono select-none">┐</div>
          <div className="absolute -bottom-4 -left-4 text-amber-500/50 text-sm font-mono select-none">└</div>
          <div className="absolute -bottom-4 -right-4 text-amber-500/50 text-sm font-mono select-none">┘</div>

          {/* Adaptive Photo Component with Radial Edge Dissolve into Obsidian Canvas */}
          <AdaptiveEditorialPhoto
            src="/photos/intro/Portrait.png"
            alt="Sahaj — Studio Portrait"
            aspectRatio="square"
            edgeBlend="feathered"
            ambientGlow="gold"
            glowIntensity="medium"
            motionPersonality="cinematic"
            cropPosition="center"
            telemetryCode="PORTRAIT // MASTER"
            className="rounded-3xl border border-amber-500/20 shadow-[0_0_90px_rgba(0,0,0,0.95)]"
            imageClassName="max-h-[72vh]"
            showCornerBrackets={false}
          />
        </motion.div>

        {/* Restrained Typographic Epilogue */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 w-full max-w-2xl px-5 py-4 rounded-2xl bg-neutral-950/80 border border-white/5 font-mono text-xs text-neutral-400"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-neutral-200 uppercase tracking-wider">SAHAJ</span>
            <span className="text-neutral-600">//</span>
            <span>BUILDER &bull; ARTIST &bull; STORYTELLER</span>
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <span>RES: 1486 × 1412</span>
            <span className="text-neutral-700">|</span>
            <span className="text-amber-400/80">OBSIDIAN ARCHIVE</span>
          </div>
        </motion.div>

        {/* Architectural Descent Gateway into Sunken Terminal Console */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.5 }}
          className="mt-20 flex flex-col items-center"
        >
          <div className="h-16 w-[1px] bg-gradient-to-b from-amber-400/40 via-cyan-400/40 to-transparent" />
          <a
            href="#terminal"
            onClick={() => sound.playTactileClick()}
            className="group flex flex-col items-center gap-2 mt-3 text-neutral-500 hover:text-cyan-300 transition-colors"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase">
              DESCENT // SUNKEN HARDWARE CONSOLE
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
