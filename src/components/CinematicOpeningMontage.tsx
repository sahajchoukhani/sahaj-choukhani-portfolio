import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AdaptiveEditorialPhoto } from './AdaptiveEditorialPhoto';
import { Sparkles, Maximize2, X, Compass, Layers, Camera, ArrowUpRight } from 'lucide-react';
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
  colSpan?: string;
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
  },
];

export const CinematicOpeningMontage: React.FC = () => {
  const [activeLightboxPiece, setActiveLightboxPiece] = useState<EditorialPiece | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const spread1Y = useTransform(scrollYProgress, [0, 1], [25, -25]);
  const spread2Y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveLightboxPiece(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section 
      id="living-archives" 
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden scroll-mt-24 relative"
    >
      {/* Background Soft Archival Tone Wash */}
      <div className="absolute top-1/4 left-1/3 w-[650px] h-[450px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-xs font-mono text-amber-300 mb-4 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="tracking-wider uppercase">ADAPTIVE EDITORIAL SYSTEM // VISUAL ANTHOLOGY</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            The Living Archives.
          </h2>
        </div>

        <p className="max-w-md text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
          Authentic photographs from hackathon floors, venture consultations, stage productions, and musical ceremonies—blended naturally into the obsidian canvas through contextual gradients and subtle edge dissipation.
        </p>
      </div>

      {/* ======================================================== */}
      {/* ASYMMETRICAL EDITORIAL SPREAD 1                           */}
      {/* Large Landscape Feature + Side-by-Side Dual Feature       */}
      {/* ======================================================== */}
      <motion.div 
        style={{ y: spread1Y }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start"
      >
        {/* Left Column (Span 7): Large Landscape Cohort Photo */}
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

        {/* Right Column (Span 5): Side-by-Side Editorial Pair */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Nyay Link: Legal Strategy */}
          <div className="flex flex-col justify-between">
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
          </div>

          {/* Theatre: Dramatic Monologue */}
          <div className="flex flex-col justify-between">
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
      </motion.div>

      {/* ======================================================== */}
      {/* ASYMMETRICAL EDITORIAL SPREAD 2                           */}
      {/* 3 Balanced Pillars: Fasal Niti + Gold Medal + Mimicry    */}
      {/* ======================================================== */}
      <motion.div 
        style={{ y: spread2Y }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
      >
        {/* Pillar 1: Fasal Niti Live Website Reveal */}
        <div className="space-y-3">
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
        </div>

        {/* Pillar 2: Two Gold Medals (Armed Forces Ceremony) */}
        <div className="space-y-3 md:mt-8">
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
            className="rounded-3xl border border-white/10 hover:border-yellow-500/40 shadow-2xl transition-all"
          />
        </div>

        {/* Pillar 3: Voice Lab & Character Mimicry */}
        <div className="space-y-3 md:mt-16">
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
            className="rounded-3xl border border-white/10 hover:border-purple-500/40 shadow-2xl transition-all"
          />
        </div>
      </motion.div>

      {/* Cinematic Transition Threshold into Section 02 / 03 */}
      <div className="pt-12 sm:pt-16 pb-4 flex flex-col items-center justify-center">
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
          aria-label="Descend to Section 03 Ventures Atelier"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-2xl animate-fadeIn"
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
            <div className="relative rounded-2xl overflow-hidden max-h-[65vh] flex items-center justify-center bg-black/60 border border-white/10">
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
