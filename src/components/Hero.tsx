import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Layers, Terminal, Sparkles, Box, ShieldCheck, Compass } from 'lucide-react';
import { Dimensional3DHeroPortrait } from './Dimensional3DHeroPortrait';
import { sound } from '../services/soundEngine';

const VERIFIED_CREDENTIALS = [
  'Founder of Drusavi (10–15 Core Team) & Co-Founder of Nyay Link (8–9 Core Team)',
  'Core Member of Fasal Niti — Personally Developed & Deployed Official Website Solo',
  'Core Member of Less Go — Travel Platform Architecture (less-gooo.appwrite.network)',
  'Podium Finisher at MITS Gwalior (IEEE Synapse Trophy) & O.P. Jindal (1st Place & Runner Up)',
  'Podium at IIM Bhubaneswar (3rd Place — Defended Business Pitch with Character Mimicry)',
  'National Finalist List: IIT Delhi (Stratazenith) & CodeHack National Hackathon',
  'Creator of Digital Me — Interactive 3D Model & Avatar Platform (ripsahaj.vercel.app)',
  'Winner — Simultaneous Classical Piano & Vocal Performance (Combined Achievement)',
  '3rd Place Podium in National-Level Dramatic Theatre Competition (Swaarang Society)',
];

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(65);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Typewriter effect for verified datum dispatch
  useEffect(() => {
    const currentFullText = VERIFIED_CREDENTIALS[roleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const nextText = currentFullText.slice(0, displayedText.length + 1);
        setDisplayedText(nextText);
        sound.playKeyClick();

        if (nextText === currentFullText) {
          setTypingSpeed(2600);
          setIsDeleting(true);
        } else {
          setTypingSpeed(40 + Math.random() * 30);
        }
      } else {
        const nextText = currentFullText.slice(0, displayedText.length - 1);
        setDisplayedText(nextText);

        if (nextText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % VERIFIED_CREDENTIALS.length);
          setTypingSpeed(350);
        } else {
          setTypingSpeed(20);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, typingSpeed]);

  // Subtle cursor parallax across the Monolith stage
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgTextY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const bgTextScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const bgTextOpacity = useTransform(scrollYProgress, [0, 0.7], [0.08, 0]);
  const stageY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const stageOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-screen w-full bg-[#081018] text-white flex flex-col justify-between pt-24 sm:pt-28 pb-10 px-5 sm:px-10 lg:px-16 overflow-hidden select-none"
    >
      {/* ------------------------------------------------------------- */}
      {/* LAYER 0: CONTINUOUS STUDIO SLATE ATMOSPHERE & LIGHTING       */}
      {/* Harmonized precisely with Portrait.png (#081018, #0c1926, #1a2c40) */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle architectural coordinate grid */}
        <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]" />

        {/* Restrained studio backlight cone matching portrait illumination */}
        <div
          className="absolute top-1/4 right-1/4 w-[750px] h-[750px] rounded-full blur-[160px] opacity-35 transition-transform duration-1000 ease-out pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(26, 44, 64, 0.4) 0%, rgba(212, 175, 55, 0.08) 45%, transparent 75%)',
            transform: `translate(${mousePos.x * 28}px, ${mousePos.y * 20}px)`,
          }}
        />

        {/* Master Studio Slate Radial Gradient that dissolves portrait boundaries into canvas */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_115%_85%_at_72%_25%,#1a2c40_0%,#0c1926_42%,#081018_85%)] opacity-95" />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* LAYER 1: MONUMENTAL ARCHITECTURAL TYPOGRAPHY ("S A H A J")     */}
      {/* Floats in true deep background behind the 3D portrait shoulders */}
      {/* ------------------------------------------------------------- */}
      <motion.div
        style={{
          y: bgTextY,
          scale: bgTextScale,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0 transition-transform duration-700 ease-out"
      >
        <motion.span 
          style={{ opacity: bgTextOpacity }}
          className="font-display font-black text-[18vw] sm:text-[16vw] lg:text-[15vw] leading-none tracking-[-0.04em] text-white uppercase select-none block"
        >
          SAHAJ
        </motion.span>
      </motion.div>

      {/* ------------------------------------------------------------- */}
      {/* LAYER 2: THE ASYMMETRIC MONOLITH STAGE (PORTRAIT + EDITORIAL)  */}
      {/* ------------------------------------------------------------- */}
      <motion.div 
        style={{ y: stageY, opacity: stageOpacity }}
        className="relative z-10 w-full max-w-[1720px] mx-auto flex-1 flex flex-col justify-center"
      >
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-4 items-center">
          
          {/* Unboxed 3D Monumental Portrait: Mobile Order 1 (Top of Phone), Desktop Order 2 (Right 5 Cols) */}
          <div className="order-1 lg:order-2 lg:col-span-5 relative w-full h-[380px] sm:h-[480px] lg:h-[760px] xl:h-[840px] flex items-center justify-center z-10 pointer-events-auto">
            <Dimensional3DHeroPortrait className="w-full h-full" />
          </div>

          {/* Editorial Monograph & Statements: Mobile Order 2 (Below Portrait), Desktop Order 1 (Left 7 Cols) */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-center z-20 text-left">
            
            {/* Architectural Datum Header */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-neutral-400 mb-4 sm:mb-6">
              <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold tracking-wider text-[11px]">
                01 // MONOLITH STAGE
              </span>
              <span className="text-neutral-600 hidden sm:inline">&bull;</span>
              <span className="tracking-widest text-[11px] text-neutral-400">DELHI, IN (28.6139° N)</span>
              <span className="text-neutral-600 hidden sm:inline">&bull;</span>
              <span className="inline-flex items-center gap-1.5 text-neutral-300 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                FOUNDER &bull; COMPETITOR &bull; ARTIST
              </span>
            </div>

            {/* Central Identity Statement (Mandated) */}
            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl tracking-tight text-white uppercase leading-[0.95] mb-4">
              THE SHAPE OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-amber-200/90">
                THE UNSAID.
              </span>
            </h1>

            {/* Editorial Supporting Credo (Mandated) */}
            <p className="font-serif italic font-light text-xl sm:text-2xl md:text-3xl text-neutral-300/95 tracking-wide mb-6 sm:mb-8 max-w-2xl leading-relaxed">
              "I give form to what I cannot explain."
            </p>

            {/* Live Telemetry Datum Dispatch Line */}
            <div className="w-full max-w-xl mb-6 sm:mb-8 p-3 rounded-lg bg-neutral-950/80 border border-white/10 backdrop-blur-md font-mono text-xs text-neutral-300 flex items-start gap-2.5">
              <Terminal className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="flex-1 min-h-[1.25rem] flex items-center flex-wrap">
                <span className="text-amber-400/80 mr-2 text-[10px] tracking-wider select-none font-bold uppercase">
                  VERIFIED:
                </span>
                <span className="text-neutral-200 font-medium">{displayedText}</span>
                <span className="inline-block w-1.5 h-3.5 bg-amber-400 ml-1 animate-pulse" />
              </div>
            </div>

            {/* Minimalist Exhibition Ledger (Replaces generic cards) */}
            <div className="w-full max-w-xl mb-8 sm:mb-10 space-y-2 border-l-2 border-amber-500/40 pl-4 py-1 font-mono text-xs">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-neutral-500 text-[10px] tracking-widest uppercase">VENTURES</span>
                <span className="text-right text-neutral-200 font-medium">Drusavi (Founder) &bull; Nyay Link (Co-Founder)</span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-neutral-500 text-[10px] tracking-widest uppercase">SOLO WEB</span>
                <span className="text-right text-neutral-200 font-medium">Fasal Niti (100% Solo Engineering & Deployment)</span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-neutral-500 text-[10px] tracking-widest uppercase">ARENA</span>
                <span className="text-right text-neutral-200 font-medium">MITS IEEE Podium &bull; OP Jindal 1st &bull; IIM Bhubaneswar 3rd</span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-neutral-500 text-[10px] tracking-widest uppercase">PERFORMANCE</span>
                <span className="text-right text-neutral-200 font-medium">Dramatic Theatre (Swaarang) &bull; Simultaneous Piano & Vocals</span>
              </div>
            </div>

            {/* Action Portals */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-xs">
              <a
                href="#ventures"
                onClick={() => sound.playTactileClick()}
                onMouseEnter={() => sound.playHoverTone()}
                className="group relative px-6 py-3 bg-neutral-900/90 hover:bg-neutral-800 text-white border border-white/20 hover:border-amber-400/80 transition-all flex items-center gap-2.5 shadow-xl"
              >
                <span className="text-amber-400 font-bold group-hover:translate-x-0.5 transition-transform">01</span>
                <span className="tracking-wider font-semibold">VENTURES ATELIER</span>
                <ArrowDown className="w-3.5 h-3.5 -rotate-90 group-hover:translate-x-1 transition-transform text-neutral-400 group-hover:text-amber-400" />
              </a>

              <a
                href="#hackathons"
                onClick={() => sound.playTactileClick()}
                onMouseEnter={() => sound.playHoverTone()}
                className="group px-5 py-3 bg-transparent hover:bg-white/[0.04] text-neutral-300 hover:text-white border border-white/10 hover:border-cyan-400/60 transition-all flex items-center gap-2.5"
              >
                <span className="text-cyan-400 font-bold">02</span>
                <span className="tracking-wider">THE ARENA</span>
                <ArrowDown className="w-3.5 h-3.5 -rotate-90 group-hover:translate-x-1 transition-transform text-neutral-500 group-hover:text-cyan-400" />
              </a>

              <a
                href="#cultural-studio"
                onClick={() => sound.playTactileClick()}
                onMouseEnter={() => sound.playHoverTone()}
                className="group px-5 py-3 bg-transparent hover:bg-white/[0.04] text-neutral-300 hover:text-white border border-white/10 hover:border-violet-400/60 transition-all flex items-center gap-2.5"
              >
                <span className="text-violet-400 font-bold">03</span>
                <span className="tracking-wider">DUAL HORIZON</span>
                <ArrowDown className="w-3.5 h-3.5 -rotate-90 group-hover:translate-x-1 transition-transform text-neutral-500 group-hover:text-violet-400" />
              </a>
            </div>
          </div>

        </div>
      </motion.div>

      {/* ------------------------------------------------------------- */}
      {/* LAYER 3: CONTROLLED SPATIAL TRANSITION INTO NEXT EXPERIENCE   */}
      {/* Architectural conduit leading naturally into Section 02       */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-20 pt-6 sm:pt-8 flex flex-col items-center justify-center">
        <a
          href="#montage"
          onClick={() => sound.playTactileClick()}
          onMouseEnter={() => sound.playHoverTone()}
          className="group flex flex-col items-center gap-2 text-neutral-500 hover:text-amber-400 transition-colors cursor-pointer"
          aria-label="Descend to Section 02 Chronometer"
        >
          <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-500 group-hover:text-amber-300 uppercase transition-colors">
            DESCENT // 02 CHRONOMETER
          </span>
          <div className="w-[1px] h-9 bg-gradient-to-b from-amber-500/80 via-white/20 to-transparent group-hover:h-14 transition-all duration-300" />
        </a>
      </div>
    </section>
  );
};
export default Hero;
