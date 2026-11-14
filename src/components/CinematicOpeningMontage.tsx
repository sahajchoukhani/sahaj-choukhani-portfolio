import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Sparkles, 
  Maximize2, 
  X, 
  Compass, 
  Layers, 
  Camera, 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight,
  Disc3,
  SlidersHorizontal,
  LayoutGrid,
  Eye,
  Film
} from 'lucide-react';
import { AdaptiveEditorialPhoto } from './AdaptiveEditorialPhoto';
import { sound } from '../services/soundEngine';

interface EditorialPiece {
  id: string;
  src: string;
  alt: string;
  pillar: string;
  title: string;
  description: string;
  aspectRatio: 'portrait' | 'landscape' | 'square' | 'cinematic';
  edgeBlend: 'radial' | 'bottom-fade' | 'feathered' | 'soft-vignette';
  ambientGlow: 'amber' | 'cyan' | 'emerald' | 'violet' | 'gold' | 'rose';
  motionPersonality: 'energetic' | 'expressive' | 'introspective';
  telemetry: string;
  year: string;
  location: string;
  accession: string;
  quote?: string;
}

const EDITORIAL_PIECES: EditorialPiece[] = [
  {
    id: 'ed-iim-bhubaneswar',
    src: '/photos/intro/iimnmimicry.png',
    alt: 'Sahaj — IIM Bhubaneswar Business Competition & Vocal Mimicry Pitch',
    pillar: 'THE ARENA // IIM BHUBANESWAR',
    title: 'IIM Bhubaneswar Podium',
    description: 'Commercial pitch defense featuring dynamic character vocal mimicry live on stage at Indian Institute of Management Bhubaneswar.',
    aspectRatio: 'landscape',
    edgeBlend: 'soft-vignette',
    ambientGlow: 'amber',
    motionPersonality: 'energetic',
    telemetry: 'IIM BHUBANESWAR // 3RD PLACE PODIUM',
    year: '2024',
    location: 'Bhubaneswar, Odisha',
    accession: 'ARCHIVE-01-ARENA',
    quote: 'Where rigorous business strategy converges with vocal stage presence.',
  },
  {
    id: 'ed-nyaylink',
    src: '/photos/intro/NyayLink.png',
    alt: 'Sahaj — Nyay Link Legal-Tech Strategy & Consultation',
    pillar: 'VENTURE STUDIO // NYAY LINK',
    title: 'Legal Architecture',
    description: 'Co-founder strategy in real legal chambers, bridging law and scalable automation.',
    aspectRatio: 'portrait',
    edgeBlend: 'bottom-fade',
    ambientGlow: 'cyan',
    motionPersonality: 'energetic',
    telemetry: 'RES: 676×1130 // ADVOCATE CO-DESIGN',
    year: '2024',
    location: 'Chambers of Advocates',
    accession: 'ARCHIVE-02-VENTURE',
    quote: 'Designing legal automation at the advocate’s desk, not in a silo.',
  },
  {
    id: 'ed-theatre',
    src: '/photos/intro/Theatre1.png',
    alt: 'Sahaj — Dramatic Theatre Monologue',
    pillar: 'THE STAGE // PERFORMANCE',
    title: 'Dramatic Presence',
    description: '3rd Place podium honor; complete character immersion and physical tension under stark stage lighting.',
    aspectRatio: 'square',
    edgeBlend: 'radial',
    ambientGlow: 'rose',
    motionPersonality: 'expressive',
    telemetry: 'RES: 474×470 // STAGE STILL',
    year: '2023',
    location: 'National Theatre Stage',
    accession: 'ARCHIVE-03-STAGE',
    quote: 'A monologue demands holding silence until the room trembles.',
  },
  {
    id: 'ed-fasal',
    src: '/photos/intro/Fasal.png',
    alt: 'Sahaj — Fasal Niti Solo Website Deployment',
    pillar: 'SOLO ENGINEERING // FASAL NITI',
    title: '100% Solo Built & Deployed',
    description: 'The live website reveal surrounded by teammates: "Every Harvest Begins With A Seed".',
    aspectRatio: 'portrait',
    edgeBlend: 'bottom-fade',
    ambientGlow: 'emerald',
    motionPersonality: 'energetic',
    telemetry: 'RES: 830×1234 // LIVE PRODUCTION',
    year: '2024',
    location: 'Agritech Production Floor',
    accession: 'ARCHIVE-04-SOLO',
    quote: 'From blank repo to live production edge—solo engineering with total ownership.',
  },
  {
    id: 'ed-medal',
    src: '/photos/intro/Singnpiano.png',
    alt: 'Sahaj — 1st Place Competition Honor for Simultaneous Piano & Vocal Performance',
    pillar: 'THE SOUNDROOM // HONORS',
    title: 'Simultaneous Piano & Vocals',
    description: '1st Place Winner in a combined performance competition playing piano and singing simultaneously.',
    aspectRatio: 'square',
    edgeBlend: 'feathered',
    ambientGlow: 'gold',
    motionPersonality: 'expressive',
    telemetry: 'RES: 586×568 // ARMED FORCES CEREMONY',
    year: '2022',
    location: 'Armed Forces Auditorium',
    accession: 'ARCHIVE-05-SOUNDROOM',
    quote: 'Two hands on eighty-eight keys, voice carrying the harmonic resonance.',
  },
  {
    id: 'ed-mimicry',
    src: '/photos/intro/mimicry.png',
    alt: 'Sahaj — The Voice Lab: Mimicry and Character Portrayal',
    pillar: 'THE VOICE LAB // MIMICRY',
    title: 'Character Portrayals',
    description: 'Dynamic rehearsal room character embodiment, vocal mimicry, and expressive cadence.',
    aspectRatio: 'square',
    edgeBlend: 'radial',
    ambientGlow: 'violet',
    motionPersonality: 'expressive',
    telemetry: 'RES: 1126×1160 // REHEARSAL STILL',
    year: '2024',
    location: 'Acoustic Rehearsal Hall',
    accession: 'ARCHIVE-06-VOICELAB',
    quote: 'Embodying thirty vocal cadences: resonance, pitch, gesture, breath.',
  },
];

export const CinematicOpeningMontage: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeLightboxPiece, setActiveLightboxPiece] = useState<EditorialPiece | null>(null);
  const [viewMode, setViewMode] = useState<'spatial' | 'editorial'>('spatial');
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const ambientWashOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.8], [0.3, 0.8, 0.3]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveLightboxPiece(null);
      if (viewMode === 'spatial') {
        if (e.key === 'ArrowRight') {
          sound.playCameraShutter();
          setActiveIdx((prev) => (prev + 1) % EDITORIAL_PIECES.length);
        } else if (e.key === 'ArrowLeft') {
          sound.playCameraShutter();
          setActiveIdx((prev) => (prev - 1 + EDITORIAL_PIECES.length) % EDITORIAL_PIECES.length);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode]);

  const currentPiece = EDITORIAL_PIECES[activeIdx];

  const handleSelectPiece = (idx: number) => {
    sound.playCameraShutter();
    setActiveIdx(idx);
  };

  return (
    <section 
      id="living-archives" 
      ref={sectionRef}
      className="py-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden scroll-mt-24 relative select-none"
    >
      {/* Dynamic Archival Ambient Atmosphere */}
      <motion.div 
        style={{ opacity: ambientWashOpacity }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-radial from-amber-500/10 via-cyan-500/5 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" 
      />

      {/* ======================================================== */}
      {/* SECTION HEADER & CURATION HUD                            */}
      {/* ======================================================== */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 relative z-10 border-b border-white/[0.08] pb-8">
        <div>
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-amber-950/40 border border-amber-500/30 text-xs font-mono text-amber-300 mb-4 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <Film className="w-3.5 h-3.5 text-amber-400" />
            <span className="tracking-wider uppercase">ACT 01 // THE LIVING ARCHIVES</span>
            <span className="text-amber-500/50">•</span>
            <span className="text-[10px] text-neutral-400 uppercase">35mm RESTORED REEL</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            The Living Archives.
          </h2>
        </div>

        {/* View Mode Switcher + Audio Cue */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-neutral-900/90 border border-white/10 backdrop-blur-md">
            <button
              onClick={() => {
                sound.playTactileClick();
                setViewMode('spatial');
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                viewMode === 'spatial'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>SPATIAL REEL</span>
            </button>
            <button
              onClick={() => {
                sound.playTactileClick();
                setViewMode('editorial');
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                viewMode === 'editorial'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>EDITORIAL SPREAD</span>
            </button>
          </div>

          <p className="max-w-xs text-xs text-neutral-400 font-sans leading-relaxed">
            Authentic photographs from competitions, chambers, and stages, preserved without distortion.
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODE 1: SPATIAL EXHIBITION REEL (THE BESPOKE DIORAMA)    */}
      {/* ======================================================== */}
      {viewMode === 'spatial' && (
        <div className="relative">
          {/* Main Floating Spatial Stage */}
          <div className="relative w-full rounded-3xl bg-[#0a0f16]/90 border border-white/10 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden min-h-[580px] flex flex-col justify-between">
            {/* Ambient Projector Beam Overlay */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Top Frame Telemetry */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6 z-10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-amber-400 font-semibold tracking-wider">
                  {currentPiece.accession}
                </span>
                <span className="text-neutral-600">/</span>
                <span className="font-mono text-xs text-neutral-400">
                  {currentPiece.location} • {currentPiece.year}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase hidden sm:inline">
                  35MM ARCHIVAL POSITIVE
                </span>
                <button
                  onClick={() => {
                    sound.playTactileClick();
                    setActiveLightboxPiece(currentPiece);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-white transition-all hover:border-amber-400/50"
                >
                  <Maximize2 className="w-3 h-3 text-amber-400" />
                  <span>INSPECT DOSSIER</span>
                </button>
              </div>
            </div>

            {/* Middle Spatial Stage: Photograph + Architectural Context */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 flex-1 my-4">
              {/* Left Column: Spatial Photo Frame with Titanium Mounting */}
              <div className="lg:col-span-7 relative group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPiece.id}
                    initial={{ opacity: 0, scale: 0.96, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.02, y: -15 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative rounded-2xl overflow-hidden border border-white/20 bg-black/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer"
                    onClick={() => setActiveLightboxPiece(currentPiece)}
                  >
                    {/* Titanium Corner Calipers */}
                    <div className="absolute top-3 left-3 text-amber-400/70 text-xs font-mono select-none z-20">┌</div>
                    <div className="absolute top-3 right-3 text-amber-400/70 text-xs font-mono select-none z-20">┐</div>
                    <div className="absolute bottom-3 left-3 text-amber-400/70 text-xs font-mono select-none z-20">└</div>
                    <div className="absolute bottom-3 right-3 text-amber-400/70 text-xs font-mono select-none z-20">┘</div>

                    {/* Image display */}
                    <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full flex items-center justify-center bg-black/80 overflow-hidden">
                      <img
                        src={currentPiece.src}
                        alt={currentPiece.alt}
                        className="w-full h-full object-contain filter contrast-[1.03] group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      {/* Subtle Vignette & Film Light Leak */}
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                      
                      {/* Hover Overlay Loupe Prompt */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <div className="px-4 py-2 rounded-full bg-black/80 border border-amber-400/50 text-xs font-mono text-amber-300 flex items-center gap-2 backdrop-blur-md">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>EXPAND FULL UNVOICED DOSSIER</span>
                        </div>
                      </div>
                    </div>

                    {/* Telemetry bottom bar */}
                    <div className="px-4 py-2 bg-black/80 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                      <span className="text-amber-300/90">{currentPiece.telemetry}</span>
                      <span className="text-neutral-500">EXPOSURE: OPTIMAL</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Column: Architectural & Editorial Narrative */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPiece.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="space-y-4"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-amber-300/90">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>{currentPiece.pillar}</span>
                    </div>

                    <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight uppercase leading-snug">
                      {currentPiece.title}
                    </h3>

                    {currentPiece.quote && (
                      <p className="font-serif italic text-base sm:text-lg text-amber-200/80 border-l-2 border-amber-500/50 pl-4 py-1">
                        "{currentPiece.quote}"
                      </p>
                    )}

                    <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                      {currentPiece.description}
                    </p>

                    <div className="pt-4 grid grid-cols-2 gap-3 text-xs font-mono border-t border-white/10">
                      <div>
                        <span className="text-neutral-500 block text-[10px] uppercase">TIMEFRAME</span>
                        <span className="text-white font-medium">{currentPiece.year}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block text-[10px] uppercase">STATUS</span>
                        <span className="text-amber-400 font-medium">AUTHENTIC DOCUMENT</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Scrubber Reel & Spool Controls */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
              {/* Previous / Next Arrow Controls */}
              <div className="flex items-center gap-2 order-2 sm:order-1">
                <button
                  onClick={() => {
                    sound.playCameraShutter();
                    setActiveIdx((prev) => (prev - 1 + EDITORIAL_PIECES.length) % EDITORIAL_PIECES.length);
                  }}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all hover:border-amber-400/50"
                  aria-label="Previous photograph"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    sound.playCameraShutter();
                    setActiveIdx((prev) => (prev + 1) % EDITORIAL_PIECES.length);
                  }}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all hover:border-amber-400/50"
                  aria-label="Next photograph"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-neutral-400 ml-2">
                  PLATE <strong className="text-amber-400">{activeIdx + 1}</strong> / {EDITORIAL_PIECES.length}
                </span>
              </div>

              {/* Sprocket Film Roll Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 order-1 sm:order-2">
                {EDITORIAL_PIECES.map((piece, idx) => (
                  <button
                    key={piece.id}
                    onClick={() => handleSelectPiece(idx)}
                    className={`relative px-3 py-1.5 rounded-xl text-[11px] font-mono transition-all flex items-center gap-1.5 whitespace-nowrap border ${
                      idx === activeIdx
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                        : 'bg-white/5 text-neutral-400 border-white/5 hover:text-white hover:border-white/15'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
                    <span>0{idx + 1}</span>
                    <span className="hidden md:inline">{piece.title.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 2: EDITORIAL MONOGRAPH SPREAD (HIGH DENSITY CATALOG) */}
      {/* ======================================================== */}
      {viewMode === 'editorial' && (
        <div className="space-y-16 animate-fadeIn">
          {/* Spread 1: Feature Landscape + Dual Pillar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <AdaptiveEditorialPhoto
                src={EDITORIAL_PIECES[0].src}
                alt={EDITORIAL_PIECES[0].alt}
                aspectRatio="landscape"
                edgeBlend={EDITORIAL_PIECES[0].edgeBlend}
                ambientGlow={EDITORIAL_PIECES[0].ambientGlow}
                glowIntensity="medium"
                motionPersonality="energetic"
                cropPosition="center"
                telemetryCode={EDITORIAL_PIECES[0].telemetry}
                categoryTag={EDITORIAL_PIECES[0].pillar}
                caption={`${EDITORIAL_PIECES[0].title} — ${EDITORIAL_PIECES[0].description}`}
                showCornerBrackets={true}
                onClick={() => setActiveLightboxPiece(EDITORIAL_PIECES[0])}
                className="rounded-3xl border border-white/10 hover:border-amber-500/40 shadow-2xl transition-all"
              />
            </div>
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdaptiveEditorialPhoto
                src={EDITORIAL_PIECES[1].src}
                alt={EDITORIAL_PIECES[1].alt}
                aspectRatio="portrait"
                edgeBlend={EDITORIAL_PIECES[1].edgeBlend}
                ambientGlow={EDITORIAL_PIECES[1].ambientGlow}
                glowIntensity="medium"
                motionPersonality="energetic"
                cropPosition="top"
                telemetryCode="NYAY // LEGAL"
                categoryTag="VENTURE"
                caption="Nyay Link legal strategy in chambers"
                showCornerBrackets={false}
                onClick={() => setActiveLightboxPiece(EDITORIAL_PIECES[1])}
                className="rounded-2xl border border-white/10 hover:border-cyan-500/40 shadow-2xl transition-all"
              />
              <AdaptiveEditorialPhoto
                src={EDITORIAL_PIECES[2].src}
                alt={EDITORIAL_PIECES[2].alt}
                aspectRatio="portrait"
                edgeBlend={EDITORIAL_PIECES[2].edgeBlend}
                ambientGlow={EDITORIAL_PIECES[2].ambientGlow}
                glowIntensity="medium"
                motionPersonality="expressive"
                cropPosition="center"
                telemetryCode="STAGE // 3RD"
                categoryTag="THEATRE"
                caption="Dramatic monologue stage still"
                showCornerBrackets={false}
                onClick={() => setActiveLightboxPiece(EDITORIAL_PIECES[2])}
                className="rounded-2xl border border-white/10 hover:border-rose-500/40 shadow-2xl transition-all"
              />
            </div>
          </div>

          {/* Spread 2: 3 Balanced Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <AdaptiveEditorialPhoto
              src={EDITORIAL_PIECES[3].src}
              alt={EDITORIAL_PIECES[3].alt}
              aspectRatio="portrait"
              edgeBlend={EDITORIAL_PIECES[3].edgeBlend}
              ambientGlow={EDITORIAL_PIECES[3].ambientGlow}
              glowIntensity="medium"
              motionPersonality="energetic"
              cropPosition="center"
              telemetryCode={EDITORIAL_PIECES[3].telemetry}
              categoryTag={EDITORIAL_PIECES[3].pillar}
              caption={`${EDITORIAL_PIECES[3].title} — ${EDITORIAL_PIECES[3].description}`}
              showCornerBrackets={true}
              onClick={() => setActiveLightboxPiece(EDITORIAL_PIECES[3])}
              className="rounded-3xl border border-white/10 hover:border-emerald-500/40 shadow-2xl transition-all"
            />
            <AdaptiveEditorialPhoto
              src={EDITORIAL_PIECES[4].src}
              alt={EDITORIAL_PIECES[4].alt}
              aspectRatio="square"
              edgeBlend={EDITORIAL_PIECES[4].edgeBlend}
              ambientGlow={EDITORIAL_PIECES[4].ambientGlow}
              glowIntensity="medium"
              motionPersonality="expressive"
              cropPosition="center"
              telemetryCode={EDITORIAL_PIECES[4].telemetry}
              categoryTag={EDITORIAL_PIECES[4].pillar}
              caption={`${EDITORIAL_PIECES[4].title} — ${EDITORIAL_PIECES[4].description}`}
              showCornerBrackets={false}
              onClick={() => setActiveLightboxPiece(EDITORIAL_PIECES[4])}
              className="rounded-3xl border border-white/10 hover:border-yellow-500/40 shadow-2xl transition-all md:mt-8"
            />
            <AdaptiveEditorialPhoto
              src={EDITORIAL_PIECES[5].src}
              alt={EDITORIAL_PIECES[5].alt}
              aspectRatio="square"
              edgeBlend={EDITORIAL_PIECES[5].edgeBlend}
              ambientGlow={EDITORIAL_PIECES[5].ambientGlow}
              glowIntensity="medium"
              motionPersonality="expressive"
              cropPosition="center"
              telemetryCode={EDITORIAL_PIECES[5].telemetry}
              categoryTag={EDITORIAL_PIECES[5].pillar}
              caption={`${EDITORIAL_PIECES[5].title} — ${EDITORIAL_PIECES[5].description}`}
              showCornerBrackets={false}
              onClick={() => setActiveLightboxPiece(EDITORIAL_PIECES[5])}
              className="rounded-3xl border border-white/10 hover:border-purple-500/40 shadow-2xl transition-all md:mt-16"
            />
          </div>
        </div>
      )}

      {/* Cinematic Transition Threshold into Accolades / Ventures */}
      <div className="pt-16 sm:pt-20 pb-4 flex flex-col items-center justify-center">
        <a
          href="#ventures"
          onClick={(e) => {
            e.preventDefault();
            sound.playTactileClick();
            const el = document.getElementById('ventures');
            const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement, opts?: { offset?: number; duration?: number }) => void } }).__lenis;
            if (el) {
              if (lenis) lenis.scrollTo(el, { offset: -30, duration: 1.2 });
              else el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          onMouseEnter={() => sound.playHoverTone()}
          className="group flex flex-col items-center gap-2 text-neutral-500 hover:text-cyan-400 transition-colors cursor-pointer select-none"
          aria-label="Descend to Section 02 Ventures Atelier"
        >
          <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-500 group-hover:text-cyan-300 uppercase transition-colors">
            TRANSITION // 02 THE VENTURES ATELIER
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-cyan-400/80 via-white/20 to-transparent group-hover:h-14 transition-all duration-300" />
        </a>
      </div>

      {/* Lightbox Modal for Immersive Full-Screen Inspection */}
      {activeLightboxPiece && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-fadeIn"
          onClick={() => setActiveLightboxPiece(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0a0a0f] rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxPiece(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Pillar & Title */}
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">
                {activeLightboxPiece.pillar}
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                {activeLightboxPiece.title}
              </h3>
            </div>

            {/* Uncropped Authentic Photo */}
            <div className="relative rounded-2xl overflow-hidden max-h-[65vh] flex items-center justify-center bg-black/80 border border-white/10">
              <img
                src={activeLightboxPiece.src}
                alt={activeLightboxPiece.alt}
                className="max-h-[65vh] w-auto object-contain rounded-xl"
              />
            </div>

            {/* Technical Metadata Footer */}
            <div className="pt-2 text-xs font-mono text-neutral-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-white/10">
              <p className="text-neutral-300 font-sans max-w-xl">
                {activeLightboxPiece.description}
              </p>
              <span className="text-amber-400/90 whitespace-nowrap">
                {activeLightboxPiece.telemetry}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
