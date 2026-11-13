import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { 
  ExternalLink, 
  Globe, 
  ShieldCheck, 
  Terminal, 
  RotateCw, 
  Layers, 
  Lock, 
  Clock, 
  Award,
  ChevronRight,
  Maximize2,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { sound } from '../services/soundEngine';

export interface ShowcaseEntry {
  id: string;
  orderNumber: string;
  hackathonName: string;
  achievementLabel: string;
  achievementType: 'participated' | 'top15' | 'university_cleared' | 'pending' | 'finalists';
  achievementColor: string;
  projectName: string;
  liveUrl: string;
  displayUrl: string;
  roleDescription: string;
  techStack: string[];
  accentColor: string;
  glowGradient: string;
  archivalNote?: string;
  screenshotFallback?: string;
}

export const SHOWCASE_ENTRIES: ShowcaseEntry[] = [
  // -------------------------------------------------------------
  // 1. IEEE
  // -------------------------------------------------------------
  {
    id: 'ieee',
    orderNumber: '01 // 06',
    hackathonName: 'IEEE',
    achievementLabel: 'PARTICIPATED',
    achievementType: 'participated',
    achievementColor: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
    projectName: 'Hack Synapse Collegiate Challenge',
    liveUrl: 'https://kushkimkb.vercel.app/',
    displayUrl: 'kushkimkb.vercel.app',
    roleDescription: 'Collegiate hackathon sprint organized by IEEE. Developed rapid frontend components, dynamic user interfaces, and database synchronization.',
    techStack: ['React', 'JavaScript', 'Tailwind CSS', 'Vercel'],
    accentColor: 'text-amber-400',
    glowGradient: 'from-amber-500/20 via-yellow-500/5 to-transparent',
  },

  // -------------------------------------------------------------
  // 2. HACKTOBER
  // -------------------------------------------------------------
  {
    id: 'hacktober',
    orderNumber: '02 // 06',
    hackathonName: 'HACKTOBER',
    achievementLabel: 'TOP 15',
    achievementType: 'top15',
    achievementColor: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
    projectName: 'DocsDrive Developer Platform',
    liveUrl: 'https://www.docsdrive.tech/',
    displayUrl: 'docsdrive.tech',
    roleDescription: 'Collaborative open-source documentation drive & developer knowledge vault, competing nationally and achieving a verified Top 15 team placement.',
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'Docs Engine'],
    accentColor: 'text-violet-400',
    glowGradient: 'from-violet-500/20 via-purple-500/5 to-transparent',
  },

  // -------------------------------------------------------------
  // 3. SIH (Smart India Hackathon)
  // -------------------------------------------------------------
  {
    id: 'sih',
    orderNumber: '03 // 06',
    hackathonName: 'SIH',
    achievementLabel: 'UNIVERSITY ROUND CLEARED',
    achievementType: 'university_cleared',
    achievementColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    projectName: 'Coal Me Later // DataMinors',
    liveUrl: 'https://coal-me-later.vercel.app/',
    displayUrl: 'coal-me-later.vercel.app',
    roleDescription: 'Smart India Hackathon national initiative. Cleared the competitive university evaluation round; national jury adjudication results pending.',
    techStack: ['Python', 'SQL', 'Data Analytics', 'Vercel'],
    accentColor: 'text-cyan-400',
    glowGradient: 'from-cyan-500/20 via-blue-500/5 to-transparent',
    archivalNote: 'Archival Vercel deployment record. Direct live destination active below.',
  },

  // -------------------------------------------------------------
  // 4. SEVA
  // -------------------------------------------------------------
  {
    id: 'seva',
    orderNumber: '04 // 06',
    hackathonName: 'SEVA',
    achievementLabel: 'RESULTS PENDING',
    achievementType: 'pending',
    achievementColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    projectName: 'Fasal Niti Agri-Tech Policy Platform',
    liveUrl: 'https://prototype-fasalniti.vercel.app/',
    displayUrl: 'prototype-fasalniti.vercel.app',
    roleDescription: 'Government-backed national hackathon showcase. Pitched Fasal Niti agricultural policy architecture, with the complete web platform built solo by Sahaj.',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
    accentColor: 'text-emerald-400',
    glowGradient: 'from-emerald-500/20 via-teal-500/5 to-transparent',
    screenshotFallback: '/photos/previews/fasal_niti_preview.png',
  },

  // -------------------------------------------------------------
  // 5. CONSTRUCT
  // -------------------------------------------------------------
  {
    id: 'construct',
    orderNumber: '05 // 06',
    hackathonName: 'CONSTRUCT',
    achievementLabel: 'RESULTS PENDING',
    achievementType: 'pending',
    achievementColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    projectName: 'Nyay Link Legal Workflow Platform',
    liveUrl: 'https://www.nyay.link/',
    displayUrl: 'nyay.link',
    roleDescription: 'One-month competitive technical hackathon sprint. Building and defending Nyay Link\'s legal chamber case intelligence & workflow automation engine.',
    techStack: ['React', 'Node.js', 'Python', 'Legal AI'],
    accentColor: 'text-sky-400',
    glowGradient: 'from-sky-500/20 via-cyan-500/5 to-transparent',
    screenshotFallback: '/photos/previews/nyay_link_preview.png',
  },

  // -------------------------------------------------------------
  // 6. CODEHACK
  // -------------------------------------------------------------
  {
    id: 'codehack',
    orderNumber: '06 // 06',
    hackathonName: 'CODEHACK',
    achievementLabel: 'FINALISTS',
    achievementType: 'finalists',
    achievementColor: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
    projectName: 'Slotly Bash Solution Sprint',
    liveUrl: 'https://slotly-bash.vercel.app/',
    displayUrl: 'slotly-bash.vercel.app',
    roleDescription: 'National-level hackathon. Team selected and officially published on the National Finalist List based on functional code viability and algorithmic performance.',
    techStack: ['JavaScript', 'Algorithmic Scripting', 'Bash', 'Vercel'],
    accentColor: 'text-amber-400',
    glowGradient: 'from-amber-500/20 via-orange-500/5 to-transparent',
  },
];

export const HackathonShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [isLoadingIframe, setIsLoadingIframe] = useState<boolean>(true);
  const [iframeFailed, setIframeFailed] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);
    }
  }, []);

  // Track scroll position to update active index dynamically
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      // Map 0 -> 1 across 6 items
      const count = SHOWCASE_ENTRIES.length;
      const index = Math.min(count - 1, Math.max(0, Math.floor(progress * count)));
      if (index !== activeIndex) {
        setActiveIndex(index);
        setIsLoadingIframe(true);
        setIframeFailed(false);
        setIframeKey((prev) => prev + 1);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, activeIndex]);

  const activeEntry = SHOWCASE_ENTRIES[activeIndex];

  const handleSelectPortal = (index: number) => {
    sound.playTactileClick();
    setActiveIndex(index);
    setIsLoadingIframe(true);
    setIframeFailed(false);
    setIframeKey((prev) => prev + 1);
  };

  const handleRefreshIframe = () => {
    sound.playTactileClick();
    setIsLoadingIframe(true);
    setIframeFailed(false);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <section 
      ref={containerRef}
      id="hackathon-showcase" 
      className="relative w-full h-auto lg:h-[480vh] select-none border-t border-white/[0.08] bg-[#081018]"
    >
      {/* ======================================================== */}
      {/* AMBIENT RADIAL LIGHTING TIED TO ACTIVE PORTAL            */}
      {/* ======================================================== */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-40"
        style={{
          background: `radial-gradient(circle at 70% 40%, rgba(20, 36, 52, 0.35) 0%, rgba(8, 16, 24, 0.1) 60%, transparent 80%)`
        }}
      />

      {/* ======================================================== */}
      {/* STICKY STAGE CONTAINER (DESKTOP) / FLUID FLOW (MOBILE)   */}
      {/* ======================================================== */}
      <div className="lg:sticky lg:top-0 min-h-screen w-full flex flex-col justify-between py-10 sm:py-14 px-5 sm:px-10 lg:px-16 overflow-hidden">
        
        {/* ------------------------------------------------------- */}
        {/* 1. TOP HEADER & TELEMETRY                               */}
        {/* ------------------------------------------------------- */}
        <header className="relative z-30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] tracking-widest uppercase flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>04 // HACKATHON SHOWCASE</span>
            </span>
            <span className="text-neutral-500 hidden sm:inline">&bull;</span>
            <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
              LIVE HACKATHON WEBSITES &amp; PRODUCTION ARTIFACTS
            </span>
          </div>

          {/* Quick Portal Switcher Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none font-mono text-xs">
            {SHOWCASE_ENTRIES.map((entry, idx) => (
              <button
                key={entry.id}
                onClick={() => handleSelectPortal(idx)}
                onMouseEnter={() => sound.playHoverTone()}
                className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wider transition-all whitespace-nowrap border ${
                  activeIndex === idx
                    ? 'bg-amber-400 text-neutral-950 font-bold border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'bg-white/5 text-neutral-400 border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                <span>{entry.hackathonName}</span>
              </button>
            ))}
          </div>
        </header>

        {/* ------------------------------------------------------- */}
        {/* 2. SPLIT-SCREEN EDITORIAL WORKSPACE                     */}
        {/* ------------------------------------------------------- */}
        <div className="relative z-20 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-6 sm:my-8">
          
          {/* ====================================================== */}
          {/* LEFT SIDE — EVENT INFORMATION                          */}
          {/* ====================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEntry.id}
                initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-5"
              >
                {/* Event Index Badge */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs tracking-widest text-neutral-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    {activeEntry.orderNumber}
                  </span>
                  <span className="text-neutral-600">//</span>
                  <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                    HACKATHON DEPLOYMENT
                  </span>
                </div>

                {/* Monumental Hackathon Name */}
                <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white uppercase drop-shadow-md">
                  {activeEntry.hackathonName}
                </h2>

                {/* Achievement Badge (Prominent & Clear) */}
                <div className="flex items-center gap-2">
                  <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-mono tracking-widest uppercase font-bold shadow-lg ${activeEntry.achievementColor}`}>
                    <Sparkles className="w-4 h-4" />
                    <span>{activeEntry.achievementLabel}</span>
                  </div>
                </div>

                {/* Associated Project Name */}
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                    Featured Platform / Sprint
                  </span>
                  <h3 className={`text-xl sm:text-2xl font-bold font-display tracking-tight text-neutral-100 ${activeEntry.accentColor}`}>
                    {activeEntry.projectName}
                  </h3>
                </div>

                {/* Role / Project Description */}
                <p className="text-sm sm:text-base font-sans text-neutral-300 leading-relaxed max-w-xl">
                  {activeEntry.roleDescription}
                </p>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeEntry.techStack.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 font-mono text-[11px] text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Direct Action Links */}
                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <a
                    href={activeEntry.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playTactileClick()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] group"
                  >
                    <span>OPEN LIVE WEBSITE</span>
                    <ExternalLink className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="truncate max-w-[220px]">{activeEntry.displayUrl}</span>
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ====================================================== */}
          {/* RIGHT SIDE — LIVE WEBSITE BROWSER PREVIEW              */}
          {/* ====================================================== */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`browser-${activeEntry.id}`}
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl sm:rounded-3xl border border-white/15 bg-neutral-950/90 shadow-[0_20px_70px_rgba(0,0,0,0.85)] overflow-hidden backdrop-blur-xl flex flex-col h-[520px] sm:h-[580px] lg:h-[620px] group"
              >
                {/* --------------------------------------------------- */}
                {/* BROWSER TOP CHROME                                  */}
                {/* --------------------------------------------------- */}
                <div className="px-4 py-3 bg-[#0d141f] border-b border-white/10 flex items-center justify-between gap-3 shrink-0">
                  {/* Traffic Light Buttons */}
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>

                  {/* Address Omnibox Bar */}
                  <div className="flex-1 max-w-md mx-auto flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/10 font-mono text-[11px] text-neutral-300">
                    <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="text-emerald-400 font-semibold">https://</span>
                    <span className="text-white truncate">{activeEntry.displayUrl}/</span>
                  </div>

                  {/* Browser Controls */}
                  <div className="flex items-center gap-2 text-neutral-400">
                    <button
                      onClick={handleRefreshIframe}
                      title="Reload portal"
                      className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <RotateCw className={`w-3.5 h-3.5 ${isLoadingIframe ? 'animate-spin text-amber-400' : ''}`} />
                    </button>
                    <a
                      href={activeEntry.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open full tab"
                      className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* --------------------------------------------------- */}
                {/* LIVE IFRAME VIEWPORT STAGE                          */}
                {/* --------------------------------------------------- */}
                <div className="relative flex-1 w-full bg-[#05090f] overflow-hidden">
                  {/* Loading Spinner Skeleton */}
                  {isLoadingIframe && !iframeFailed && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#081018] space-y-3">
                      <div className="w-8 h-8 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin" />
                      <span className="font-mono text-xs text-neutral-400 tracking-wider">
                        INITIALIZING LIVE PORTAL // {activeEntry.displayUrl}
                      </span>
                    </div>
                  )}

                  {/* Fallback Overlay if Iframe Fails or is Blocked */}
                  {iframeFailed && (
                    <div className="absolute inset-0 z-15 flex flex-col items-center justify-center p-6 bg-[#081018] text-center space-y-4">
                      <div className="p-3 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400">
                        <AlertCircle className="w-8 h-8" />
                      </div>
                      <div className="space-y-1 max-w-sm">
                        <h4 className="font-mono text-sm font-semibold text-white tracking-wide">EMBEDDED PREVIEW UNAVAILABLE</h4>
                        <p className="font-mono text-xs text-neutral-400 leading-relaxed">
                          This portal restricts direct embedding or has connection security rules. You can interact with the live deployment in a new tab.
                        </p>
                      </div>
                      <a
                        href={activeEntry.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-400 text-neutral-950 font-mono text-xs font-bold hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-400/20"
                      >
                        <span>OPEN LIVE WEBSITE</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                  {/* The Live Interactive Iframe */}
                  <iframe
                    key={iframeKey}
                    src={activeEntry.liveUrl}
                    title={`${activeEntry.hackathonName} Live Portal`}
                    className="w-full h-full border-0 relative z-0 bg-[#05090f]"
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                    allow="clipboard-write; encrypted-media"
                    onLoad={() => setIsLoadingIframe(false)}
                    onError={() => {
                      setIsLoadingIframe(false);
                      setIframeFailed(true);
                    }}
                  />

                  {/* Optional Fallback Backdrop if Deployment was Archived (e.g. SIH 404) */}
                  {activeEntry.archivalNote && (
                    <div className="absolute bottom-3 left-3 right-3 z-20 p-3 rounded-xl bg-black/85 backdrop-blur-md border border-white/15 flex items-center justify-between gap-3 text-xs font-mono">
                      <div className="flex items-center gap-2 text-neutral-300">
                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{activeEntry.archivalNote}</span>
                      </div>
                      <a
                        href={activeEntry.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 rounded bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300 transition-colors shrink-0"
                      >
                        OPEN SITE
                      </a>
                    </div>
                  )}

                  {/* Watermark telemetry badge in corner */}
                  <div className="absolute top-3 right-3 z-10 pointer-events-none px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 font-mono text-[9px] text-neutral-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>INTERACTIVE PORTAL ACTIVE</span>
                  </div>
                </div>

                {/* --------------------------------------------------- */}
                {/* BROWSER BOTTOM ACTION BAR                           */}
                {/* --------------------------------------------------- */}
                <div className="px-4 py-2.5 bg-[#090f18] border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">&bull;</span>
                    <span className="text-[11px] text-neutral-300">
                      Fully Interactive &bull; Scrollable Web Container
                    </span>
                  </div>

                  <a
                    href={activeEntry.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
                  >
                    <span>OPEN ORIGINAL WEBSITE</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* ------------------------------------------------------- */}
        {/* 3. BOTTOM CHRONOMETER TRACK & NAVIGATION                */}
        {/* ------------------------------------------------------- */}
        <footer className="relative z-30 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-3">
            <span className="text-neutral-400 font-bold">PORTALS:</span>
            <div className="flex items-center gap-2">
              {SHOWCASE_ENTRIES.map((entry, idx) => (
                <button
                  key={entry.id}
                  onClick={() => handleSelectPortal(idx)}
                  className={`text-[11px] transition-colors ${
                    activeIndex === idx ? 'text-amber-400 font-bold underline underline-offset-4' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {entry.hackathonName}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[10px] text-neutral-400">
            <span>SCROLL OR CLICK TABS TO SWITCH LIVE HACKATHON WEBSITES</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>
        </footer>

      </div>
    </section>
  );
};

