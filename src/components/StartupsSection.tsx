import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { startupsData } from '../data/startups';
import { Startup } from '../types';
import { StartupModal } from './StartupModal';
import { 
  Rocket, 
  ArrowRight, 
  ShieldCheck, 
  Code2, 
  Globe, 
  ExternalLink, 
  Users, 
  Layers, 
  Terminal, 
  Cpu, 
  Compass,
  Sparkles
} from 'lucide-react';
import { AdaptiveEditorialPhoto } from './AdaptiveEditorialPhoto';
import { sound } from '../services/soundEngine';

export const StartupsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [activeVentureIndex, setActiveVentureIndex] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const lastIndexRef = useRef(0);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);
    }
  }, []);

  // Track scroll progress across the 320vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate active venture index (0 to 3) as the user scrolls
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      let idx = 0;
      if (progress < 0.25) idx = 0;
      else if (progress < 0.50) idx = 1;
      else if (progress < 0.75) idx = 2;
      else idx = 3;

      if (idx !== lastIndexRef.current) {
        lastIndexRef.current = idx;
        setActiveVentureIndex(idx);
        sound.playTactileClick();
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const currentStartup = startupsData[activeVentureIndex] || startupsData[0];

  const jumpToVenture = (index: number) => {
    sound.playTactileClick();
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const totalScrollable = container.scrollHeight - window.innerHeight;
    const targetY = scrollTop + (index / 3) * totalScrollable;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const getVentureTheme = (id: string) => {
    switch (id) {
      case 'drusavi':
        return {
          accentColor: 'text-cyan-400',
          borderColor: 'border-cyan-500/30',
          bgGlow: 'radial-gradient(circle at 65% 45%, rgba(0, 240, 255, 0.16) 0%, rgba(12, 25, 38, 0.1) 50%, transparent 70%)',
          roleBadge: 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 font-bold',
          halo: 'rgba(0, 240, 255, 0.25)',
        };
      case 'nyay-link':
        return {
          accentColor: 'text-violet-400',
          borderColor: 'border-violet-500/30',
          bgGlow: 'radial-gradient(circle at 65% 45%, rgba(168, 85, 247, 0.16) 0%, rgba(12, 25, 38, 0.1) 50%, transparent 70%)',
          roleBadge: 'bg-violet-500/15 border-violet-500/40 text-violet-300 font-bold',
          halo: 'rgba(168, 85, 247, 0.25)',
        };
      case 'fasal-niti':
        return {
          accentColor: 'text-emerald-400',
          borderColor: 'border-emerald-500/30',
          bgGlow: 'radial-gradient(circle at 65% 45%, rgba(16, 185, 129, 0.16) 0%, rgba(12, 25, 38, 0.1) 50%, transparent 70%)',
          roleBadge: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-bold',
          halo: 'rgba(16, 185, 129, 0.25)',
        };
      case 'less-go':
        return {
          accentColor: 'text-amber-400',
          borderColor: 'border-amber-500/30',
          bgGlow: 'radial-gradient(circle at 65% 45%, rgba(245, 158, 11, 0.16) 0%, rgba(12, 25, 38, 0.1) 50%, transparent 70%)',
          roleBadge: 'bg-amber-500/15 border-amber-500/40 text-amber-300 font-bold',
          halo: 'rgba(245, 158, 11, 0.25)',
        };
      default:
        return {
          accentColor: 'text-amber-400',
          borderColor: 'border-amber-500/30',
          bgGlow: 'transparent',
          roleBadge: 'bg-white/5 border-white/10 text-neutral-300',
          halo: 'rgba(255, 255, 255, 0.1)',
        };
    }
  };

  const theme = getVentureTheme(currentStartup.id);

  return (
    <section 
      ref={containerRef}
      id="ventures" 
      className="relative w-full h-[320vh] sm:h-[360vh] select-none"
    >
      {/* ------------------------------------------------------------- */}
      {/* STICKY FULL-VIEWPORT VENTURE ATELIER STAGE                    */}
      {/* ------------------------------------------------------------- */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-16 sm:py-20 px-5 sm:px-10 lg:px-16">
        
        {/* Dynamic Studio Ambient Halo */}
        <div 
          className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out"
          style={{ background: theme.bgGlow }}
        />

        {/* ======================================================== */}
        {/* 1. TOP STAGE HUD & VENTURE SCRUBBER                      */}
        {/* ======================================================== */}
        <div className="relative z-30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] tracking-widest uppercase">
              02 // VENTURE ATELIER
            </span>
            <span className="text-neutral-500 hidden sm:inline">&bull;</span>
            <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
              OPERATIONAL VENTURE ECOSYSTEM
            </span>
          </div>

          {/* Interactive Venture Scrubber */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {startupsData.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => jumpToVenture(idx)}
                onMouseEnter={() => sound.playHoverTone()}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${
                  activeVentureIndex === idx
                    ? 'bg-neutral-100 text-neutral-950 font-bold shadow-lg scale-105'
                    : 'bg-white/[0.03] hover:bg-white/[0.08] text-neutral-400 hover:text-white border border-white/10'
                }`}
              >
                <span>0{idx + 1}</span>
                <span className="hidden md:inline uppercase">{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. MAIN ACTIVE VENTURE COMPOSITION (CINEMATIC SCENE)     */}
        {/* ======================================================== */}
        <div className="relative z-20 flex-1 flex items-center justify-center my-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStartup.id}
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Giant Architectural Typographic Background Watermark */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
                <span className="font-display font-black text-[18vw] lg:text-[15vw] leading-none text-white/[0.03] uppercase block text-center whitespace-nowrap">
                  {currentStartup.name}
                </span>
              </div>

              {/* LEFT COLUMN: VENTURE DOSSIER & ARCHITECTURAL SPECS */}
              <div className="relative z-10 lg:col-span-6 flex flex-col justify-center space-y-5 text-left">
                {/* Monogram, Category & Role Badge */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className={`w-12 h-12 rounded-none border ${theme.borderColor} bg-black/60 flex items-center justify-center text-white font-mono font-bold text-xl shadow-lg`}>
                    {currentStartup.name.charAt(0)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block">
                      {currentStartup.category}
                    </span>
                    <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
                      {currentStartup.name}
                    </h2>
                  </div>
                  <span className={`text-[11px] font-mono px-3 py-1 rounded-full border ${theme.roleBadge} ml-auto sm:ml-0`}>
                    {currentStartup.role}
                  </span>
                </div>

                {/* Team Size & Hackathon / Platform Origin */}
                <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Core Team: {currentStartup.teamSize}</span>
                  </span>
                  {currentStartup.eventName && (
                    <>
                      <span className="text-neutral-600">&bull;</span>
                      <span className="text-amber-400/90 font-semibold">{currentStartup.eventName}</span>
                    </>
                  )}
                </div>

                {/* Narrative Description */}
                <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed max-w-xl">
                  {currentStartup.description}
                </p>

                {/* Personal Contribution Highlight */}
                {currentStartup.personalContribution && (
                  <div className="p-3 sm:p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-mono flex items-start gap-2.5">
                    <Code2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                    <span>{currentStartup.personalContribution}</span>
                  </div>
                )}

                {/* Technology Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {currentStartup.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/10 text-neutral-300 font-mono text-xs tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => {
                      sound.playTactileClick();
                      setSelectedStartup(currentStartup);
                    }}
                    onMouseEnter={() => sound.playHoverTone()}
                    className="px-6 py-3 bg-neutral-100 hover:bg-amber-400 text-neutral-950 font-mono text-xs font-bold tracking-wider transition-all flex items-center gap-2 shadow-xl group"
                  >
                    <span>VIEW DOSSIER</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {currentStartup.websiteUrl && (
                    <a
                      href={currentStartup.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playTactileClick()}
                      onMouseEnter={() => sound.playHoverTone()}
                      className="px-5 py-3 bg-white/[0.03] hover:bg-white/[0.08] text-white border border-white/15 hover:border-cyan-400/60 font-mono text-xs tracking-wider transition-all flex items-center gap-2 group"
                    >
                      <Globe className="w-3.5 h-3.5 text-cyan-400" />
                      <span>VISIT LIVE PLATFORM</span>
                      <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-cyan-300" />
                    </a>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: REVENUE / ARCHITECTURE STAGE (CUSTOM TO EACH VENTURE) */}
              <div className="relative z-10 lg:col-span-6 flex items-center justify-center">
                {/* 1. DRUSAVI: THE SOFTWARE ENTERPRISE BLUEPRINT */}
                {currentStartup.id === 'drusavi' && (
                  <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-neutral-950/70 border border-cyan-500/30 backdrop-blur-xl shadow-2xl space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="text-xs font-mono text-cyan-400 tracking-wider flex items-center gap-1.5">
                        <Terminal className="w-4 h-4" />
                        <span>CORE ARCHITECTURE SCHEMATIC</span>
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500">v2.4 STABLE</span>
                    </div>

                    <div className="space-y-4 font-mono text-xs">
                      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                        <span className="text-neutral-400">LEADERSHIP ROLE:</span>
                        <span className="text-white font-bold">FOUNDER</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                        <span className="text-neutral-400">ORGANIZATIONAL SCALE:</span>
                        <span className="text-cyan-300 font-bold">10–15 CORE ENGINEERS</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                        <span className="text-neutral-400">CORE RESPONSIBILITY:</span>
                        <span className="text-amber-300 font-bold">PRODUCT STRATEGY & DB DESIGN</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-neutral-300 font-sans leading-relaxed">
                      "Enterprise-grade platform conceptualization designed for high concurrency and robust relational data models."
                    </div>
                  </div>
                )}

                {/* 2. NYAY LINK: ADVOCATE CHAMBERS PHOTOGRAPHY + PLATFORM INTERFACE */}
                {currentStartup.id === 'nyay-link' && (
                  <div className="w-full max-w-xl space-y-4">
                    <div className="relative rounded-2xl overflow-hidden border border-violet-500/30 bg-black shadow-2xl group">
                      <img
                        src="/photos/intro/NyayLink.png"
                        alt="Sahaj in Supreme Court Advocate Chambers"
                        className="w-full max-h-[380px] object-cover object-top transition-transform duration-700 group-hover:scale-102"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono">
                        <span className="text-violet-300">ADVOCATE CHAMBERS CO-DESIGN</span>
                        <span className="text-neutral-500">CONSTRUCT HACKATHON</span>
                      </div>
                    </div>

                    {currentStartup.previewImage && (
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between font-mono text-xs text-neutral-300">
                        <span className="text-neutral-400">OFFICIAL PLATFORM:</span>
                        <a 
                          href="https://www.nyay.link/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-violet-400 hover:text-violet-300 flex items-center gap-1.5"
                        >
                          <span>nyay.link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. FASAL NITI: SOLO ENGINEERING LAPTOP REVEAL + WEB PREVIEW */}
                {currentStartup.id === 'fasal-niti' && (
                  <div className="w-full max-w-xl space-y-4">
                    <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 bg-black shadow-2xl group">
                      <img
                        src="/photos/intro/Fasal.png"
                        alt="Sahaj demonstrating Fasal Niti website solo build"
                        className="w-full max-h-[380px] object-cover object-center transition-transform duration-700 group-hover:scale-102"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono">
                        <span className="text-emerald-300">100% PERSONALLY BUILT & DEPLOYED SOLO</span>
                        <span className="text-neutral-500">SEVA HACKATHON</span>
                      </div>
                    </div>

                    {currentStartup.previewImage && (
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between font-mono text-xs text-neutral-300">
                        <span className="text-neutral-400">LIVE PROTOTYPE:</span>
                        <a 
                          href="https://prototype-fasalniti.vercel.app/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"
                        >
                          <span>prototype-fasalniti.vercel.app</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* 4. LESS GO: TRAVEL ITINERARY PLATFORM PREVIEW */}
                {currentStartup.id === 'less-go' && (
                  <div className="w-full max-w-xl space-y-4">
                    <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-black shadow-2xl group">
                      <img
                        src="/photos/previews/less_go_preview.png"
                        alt="Less Go Dynamic Travel Itinerary Platform"
                        className="w-full max-h-[380px] object-cover object-left-top transition-transform duration-700 group-hover:scale-102"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono">
                        <span className="text-amber-300">DYNAMIC RE-ROUTING & CAB WORKFLOWS</span>
                        <span className="text-neutral-500">APPWRITE CLOUD</span>
                      </div>
                    </div>

                    {currentStartup.websiteUrl && (
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between font-mono text-xs text-neutral-300">
                        <span className="text-neutral-400">PLATFORM URL:</span>
                        <a 
                          href={currentStartup.websiteUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
                        >
                          <span>less-gooo.appwrite.network</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ======================================================== */}
        {/* 3. BOTTOM SCROLL CHRONOMETER PROGRESS BAR                */}
        {/* ======================================================== */}
        <div className="relative z-30 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-3">
            <span className="text-neutral-500">SCROLL NAVIGATION:</span>
            <span className="text-white font-bold">0{activeVentureIndex + 1} / 04</span>
            <span className="text-neutral-600">//</span>
            <span className={`${theme.accentColor} uppercase font-bold`}>{currentStartup.name}</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[10px] text-neutral-500">
            <span>SCROLL TO EXPLORE ARCHITECTURE</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          </div>
        </div>

      </div>

      {/* Detail Modal */}
      <StartupModal
        startup={selectedStartup}
        onClose={() => setSelectedStartup(null)}
      />
    </section>
  );
};
