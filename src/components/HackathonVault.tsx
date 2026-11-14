import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { hackathonProjectsData } from '../data/hackathons';
import { HackathonProject, CompetitionSubdivision } from '../types';
import { HackathonModal } from './HackathonModal';
import { 
  Trophy, 
  Users, 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Building2, 
  Sparkles, 
  FileCheck2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { sound } from '../services/soundEngine';

export const HackathonVault: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<HackathonProject | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth horizontal scroll track mapping
  const xTrack = useTransform(scrollYProgress, [0, 1], ['0%', '-68%']);
  const xBackground = useTransform(scrollYProgress, [0, 1], ['5%', '-30%']);

  const handleProjectClick = (project: HackathonProject) => {
    sound.playTactileClick();
    if (project.isVictory) {
      sound.playVictoryFanfare();
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#f59e0b', '#facc15', '#38bdf8', '#ffffff'],
        });
      } catch {}
    }
    setSelectedProject(project);
  };

  // Curated prominent highlights with authentic imagery & verified podium outcomes
  const primaryArenaPavilions = [
    {
      id: 'ieee-synapse',
      project: hackathonProjectsData.find(p => p.id === 'ieee-synapse') || hackathonProjectsData[0],
      title: 'IEEE SYNAPSE',
      subtitle: 'Madhav Institute of Technology & Science (MITS Gwalior)',
      outcomeBadge: '🏆 PODIUM WINNER',
      outcomeStyle: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      timeframe: '36-Hour National Sprint',
      photoSrc: '/photos/intro/IEEE.png',
      caption: 'IEEE Synapse 36H National Hackathon Podium Finish at MITS Gwalior.',
      tag: 'MITS GWALIOR',
      accentColor: 'text-amber-400',
      borderColor: 'border-amber-500/30',
    },
    {
      id: 'op-jindal-first',
      project: hackathonProjectsData.find(p => p.id === 'op-jindal-first') || hackathonProjectsData[1],
      title: 'O.P. JINDAL',
      subtitle: 'O.P. Jindal Global University • Pitch Arena',
      outcomeBadge: '🥇 1ST PLACE (TEAM) & 🥈 RUNNER UP',
      outcomeStyle: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
      timeframe: 'Collegiate Business Defense',
      photoSrc: '/photos/intro/OpJindal.png',
      caption: 'Secured 1st Place (Team) & Runner Up honors before national jury panel.',
      tag: 'OP JINDAL',
      accentColor: 'text-orange-400',
      borderColor: 'border-orange-500/30',
    },
    {
      id: 'iim-bhubaneswar',
      project: hackathonProjectsData.find(p => p.id === 'iim-bhubaneswar') || hackathonProjectsData[2],
      title: 'IIM BHUBANESWAR',
      subtitle: 'Indian Institute of Management Bhubaneswar',
      outcomeBadge: '🥉 3RD PLACE PODIUM',
      outcomeStyle: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
      timeframe: 'Inter-Collegiate Business Sprint',
      photoSrc: '/photos/intro/iimnmimicry.png',
      caption: '3rd Place Finish — Commercial business defense featuring dynamic live character mimicry on stage.',
      tag: 'IIM BHUBANESWAR',
      accentColor: 'text-amber-300',
      borderColor: 'border-amber-400/30',
    },
    {
      id: 'iit-delhi-codehack',
      project: hackathonProjectsData.find(p => p.id === 'iit-delhi') || hackathonProjectsData.find(p => p.id === 'codehack') || hackathonProjectsData[3],
      title: 'IIT DELHI & CODEHACK',
      subtitle: 'IIT Delhi (Stratazenith Finalist) & CodeHack National Finalist List',
      outcomeBadge: '🎖️ NATIONAL FINALIST LIST',
      outcomeStyle: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
      timeframe: 'Competitive Selection & Solution Sprint',
      photoSrc: '/photos/intro/Hacktober.png',
      caption: 'IIT Delhi Stratazenith Finalist & CodeHack National Hackathon Finalist List (verified nationwide finalist selection) + Hacktoberfest Top 15.',
      tag: 'IIT DELHI // CODEHACK FINALIST',
      accentColor: 'text-violet-400',
      borderColor: 'border-violet-500/30',
    },
    {
      id: 'pipeline',
      project: hackathonProjectsData.find(p => p.id === 'seva-hackathon') || hackathonProjectsData.find(p => p.id === 'sih-2026-dataminors') || hackathonProjectsData[4],
      title: 'SEVA & NATIONAL PIPELINE',
      subtitle: 'SEVA (Fasal Niti) • SIH 2026 (DataMinors) • Construct (Nyay Link)',
      outcomeBadge: '⏳ RESULTS PENDING // SEVA & SIH CLEARED',
      outcomeStyle: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      timeframe: 'Active National Circuit',
      photoSrc: '/photos/intro/Fasal.png',
      caption: 'SEVA Government Hackathon (Pitching Fasal Niti Solo Web Platform). SIH (DataMinors: Cleared University Round). Construct (Nyay Link): Pending final adjudication.',
      tag: 'SEVA (FASAL NITI) // SIH',
      accentColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
    },
  ];

  return (
    <section 
      ref={containerRef}
      id="hackathons" 
      className="relative w-full h-[340vh] sm:h-[380vh] select-none border-t border-white/[0.08]"
    >
      {/* ------------------------------------------------------------- */}
      {/* STICKY FULL-VIEWPORT HORIZONTAL CHRONOMETER STAGE             */}
      {/* ------------------------------------------------------------- */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-14 sm:py-16 px-5 sm:px-10 lg:px-16">
        
        {/* Parallax Background Typography */}
        <motion.div 
          style={{ x: xBackground }}
          className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none select-none z-0 whitespace-nowrap"
        >
          <span className="font-display font-black text-[17vw] leading-none text-white/[0.025] uppercase block">
            THE ARENA &bull; COMPETITIVE PODIUMS &bull; HACKATHONS
          </span>
        </motion.div>

        {/* ======================================================== */}
        {/* 1. TOP STAGE HEADER & TELEMETRY                          */}
        {/* ======================================================== */}
        <div className="relative z-30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[10px] tracking-widest uppercase flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" />
              <span>03 // THE ARENA</span>
            </span>
            <span className="text-neutral-500 hidden sm:inline">&bull;</span>
            <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
              VERIFIED PODIUMS & NATIONAL COMPETITION CHRONOMETER
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1.5 text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>HORIZONTAL SCROLLWAY</span>
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. HORIZONTAL SCROLLWAY TRACK                            */}
        {/* ======================================================== */}
        <div className="relative z-20 flex-1 flex items-center overflow-visible my-auto">
          <motion.div 
            style={{ x: isReducedMotion ? 0 : xTrack }}
            className="flex items-center gap-8 sm:gap-12 pl-2 pr-24"
          >
            {primaryArenaPavilions.map((pav, idx) => (
              <div
                key={pav.id}
                onClick={() => handleProjectClick(pav.project)}
                onMouseEnter={() => sound.playHoverTone()}
                className={`w-[85vw] sm:w-[680px] lg:w-[740px] shrink-0 p-6 sm:p-8 rounded-3xl bg-neutral-950/70 border ${pav.borderColor} backdrop-blur-xl shadow-2xl transition-all duration-300 hover:scale-[1.01] hover:border-amber-400/60 cursor-pointer flex flex-col justify-between group`}
              >
                {/* Header Metadata */}
                <div>
                  <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                      INDEX // 0{idx + 1} &bull; {pav.tag}
                    </span>
                    <span className={`text-[11px] font-mono px-3 py-0.5 rounded-full border ${pav.outcomeStyle}`}>
                      {pav.outcomeBadge}
                    </span>
                  </div>

                  <h3 className={`font-display font-black text-2xl sm:text-4xl text-white tracking-tight uppercase group-hover:${pav.accentColor} transition-colors mb-1`}>
                    {pav.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-neutral-400 mb-5">
                    {pav.subtitle}
                  </p>
                </div>

                {/* Center Authentic Photograph (Zoomed out with full vertical frame visibility) */}
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/95 aspect-[16/9] sm:aspect-[16/10] mb-5 group-hover:border-white/20 transition-all flex items-center justify-center p-3">
                  {/* Ambient Blurred Aura to fill lateral space */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                    <img
                      src={pav.photoSrc}
                      alt=""
                      className="w-full h-full object-cover blur-3xl scale-125"
                    />
                  </div>
                  <img
                    src={pav.photoSrc}
                    alt={pav.title}
                    className="relative z-10 w-auto h-full max-h-full max-w-full object-contain rounded-xl transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none z-20" />
                  <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/10 text-[11px] font-mono text-neutral-300 z-30 flex items-center justify-between">
                    <span className="truncate mr-2">{pav.caption}</span>
                    <span className="text-amber-400/90 shrink-0 text-[10px]">UNCROPPED // FULL FRAME</span>
                  </div>
                </div>

                {/* Footer Sprint Details */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{pav.timeframe}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-amber-400 group-hover:text-amber-300 font-semibold">
                    <span>INSPECT SPRINT DOSSIER</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* 3. BOTTOM SCROLL TRACK HUD                               */}
        {/* ======================================================== */}
        <div className="relative z-30 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-3">
            <span className="text-neutral-500">CHRONOMETER TRACK:</span>
            <span className="text-white font-bold">5 CURATED PAVILIONS</span>
            <span className="text-neutral-600">//</span>
            <span className="text-amber-400">MITS IEEE • OP JINDAL • IIM BHUBANESWAR • IIT DELHI & CODEHACK • SEVA (FASAL NITI) & SIH</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[10px] text-neutral-500">
            <span>SCROLL DOWN TO ADVANCE TIMELINE</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          </div>
        </div>

      </div>

      {/* Modal */}
      <HackathonModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
