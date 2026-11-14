import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { soloProjectsData } from '../data/soloProjects';
import { 
  UserCheck, 
  Code2, 
  Globe, 
  Cpu, 
  CheckCircle2, 
  ArrowUpRight, 
  Sparkles, 
  Shield, 
  Layers, 
  Workflow, 
  Activity, 
  Monitor, 
  ExternalLink,
  ChevronRight,
  Database,
  Server,
  Maximize2,
  Box,
  Compass
} from 'lucide-react';
import { CardSpotlight } from './ui/CardSpotlight';
import { BorderBeam } from './ui/BorderBeam';
import { InteractiveWebsitePreview } from './InteractiveWebsitePreview';
import { sound } from '../services/soundEngine';

export const SoloEngineeringSection: React.FC = () => {
  const fasalNiti = soloProjectsData[0];
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeView, setActiveView] = useState<'overview' | 'exploded' | 'verification'>('overview');
  const [isExplodedStacked, setIsExplodedStacked] = useState(true);
  const [activeHoloLayer, setActiveHoloLayer] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  const architecturalLayers = [
    {
      id: 'layer-ui',
      tier: 'LAYER 01 // FRONT-END USABILITY CORE',
      title: 'Responsive Agritech UI & UX',
      tech: 'Semantic HTML5 • Modular CSS3 • Vanilla JS Architecture',
      detail: 'Tailored specifically for rural & agricultural usability with ultra-clear contrast, large touch targets, and low-bandwidth asset optimizations.',
      status: 'SOLO CRAFTED',
      icon: Monitor,
      elevation: isExplodedStacked ? -45 : 0,
      color: '#c084fc',
      borderGlow: 'rgba(192, 132, 252, 0.4)',
      bgGrad: 'linear-gradient(135deg, rgba(138, 43, 226, 0.15) 0%, rgba(10, 15, 25, 0.85) 100%)',
    },
    {
      id: 'layer-engine',
      tier: 'LAYER 02 // LOGIC & RULE EVALUATION ENGINE',
      title: 'Farmer Policy & Yield Calculation Logic',
      tech: 'Algorithmic Scheme Matching & Rule Evaluator',
      detail: 'Dynamic state evaluation matching farmer crop types and land acreage directly to verified agricultural subsidies and government initiatives.',
      status: 'INDIVIDUAL CODE',
      icon: Database,
      elevation: isExplodedStacked ? 0 : 0,
      color: '#a855f7',
      borderGlow: 'rgba(168, 85, 247, 0.4)',
      bgGrad: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(10, 15, 25, 0.85) 100%)',
    },
    {
      id: 'layer-edge',
      tier: 'LAYER 03 // INFRASTRUCTURE & EDGE DEPLOYMENT',
      title: 'Zero-Downtime Edge Deployment',
      tech: 'Vercel Edge Network & Production CI Pipeline',
      detail: 'Configured automated edge CDN caching, instant HTTPS certification, and performance budgets achieving sub-second first contentful paint.',
      status: 'VERIFIED DEPLOY',
      icon: Server,
      elevation: isExplodedStacked ? 45 : 0,
      color: '#38bdf8',
      borderGlow: 'rgba(56, 189, 248, 0.4)',
      bgGrad: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(10, 15, 25, 0.85) 100%)',
    },
  ];

  return (
    <section 
      id="solo" 
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-24 overflow-hidden select-none"
    >
      {/* Dynamic Background Blueprint Grid with Scroll Parallax */}
      <motion.div 
        style={{ y: backgroundY, opacity }}
        className="absolute inset-0 pointer-events-none -z-10"
      >
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(168, 85, 247, 0.45) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(168, 85, 247, 0.45) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
        {/* Subtle Violet Atmospheric Well */}
        <div className="absolute top-1/3 right-1/4 w-[650px] h-[650px] bg-violet-600/10 rounded-full blur-[150px]" />
      </motion.div>

      {/* Luminous Architectural Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 relative z-10 border-b border-white/[0.08] pb-8">
        <div>
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-violet-950/50 border border-violet-500/40 text-xs font-mono text-violet-300 mb-4 shadow-[0_0_20px_rgba(138,43,226,0.2)]">
            <UserCheck className="w-3.5 h-3.5 text-violet-400" />
            <span className="tracking-wider uppercase">ACT 06 // SOLO ENGINEERING VAULT</span>
            <span className="text-violet-500/50">•</span>
            <span className="text-[10px] text-neutral-400 uppercase">INDEPENDENT OWNERSHIP</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            Individually Developed Work.
          </h2>
        </div>

        <div className="max-w-md">
          <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
            I have personally developed one website so far: <strong className="text-violet-300 font-semibold">Fasal Niti</strong>. Engineered and deployed 100% solo with zero team collaboration, complete technical ownership, and end-to-end architecture.
          </p>
        </div>
      </div>

      {/* Mode View Switcher Bar */}
      <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => {
            sound.playTactileClick();
            setActiveView('overview');
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-mono transition-all border ${
            activeView === 'overview'
              ? 'bg-violet-500 text-white font-bold border-violet-400 shadow-[0_0_20px_rgba(138,43,226,0.35)] -translate-y-0.5'
              : 'glass-panel text-neutral-400 border-white/10 hover:border-white/20 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Production Chassis &amp; Live View</span>
        </button>

        <button
          onClick={() => {
            sound.playDeliberateMechanicalKey();
            setActiveView('exploded');
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-mono transition-all border ${
            activeView === 'exploded'
              ? 'bg-violet-500 text-white font-bold border-violet-400 shadow-[0_0_20px_rgba(138,43,226,0.35)] -translate-y-0.5'
              : 'glass-panel text-neutral-400 border-white/10 hover:border-white/20 hover:text-white'
          }`}
        >
          <Box className="w-3.5 h-3.5" />
          <span>3D Exploded-View Architecture</span>
        </button>

        <button
          onClick={() => {
            sound.playTactileClick();
            setActiveView('verification');
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-mono transition-all border ${
            activeView === 'verification'
              ? 'bg-violet-500 text-white font-bold border-violet-400 shadow-[0_0_20px_rgba(138,43,226,0.35)] -translate-y-0.5'
              : 'glass-panel text-neutral-400 border-white/10 hover:border-white/20 hover:text-white'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Solo Verification Ledger</span>
        </button>
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {activeView === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <CardSpotlight
              color="rgba(138, 43, 226, 0.16)"
              radius={450}
              className="glass-panel-elevated rounded-3xl p-6 sm:p-10 border border-violet-500/30 relative overflow-hidden shadow-2xl"
            >
              <BorderBeam size={280} duration={8} colorFrom="#8a2be2" colorTo="#00f0ff" />

              {/* Sole Creator Verification Banner */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/40 text-violet-300 text-xs font-mono font-semibold">
                  <Shield className="w-4 h-4 text-violet-400" />
                  <span>100% INDIVIDUAL CREATION &bull; ZERO TEAM CO-DEPENDENCIES</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>PRODUCTION STATUS: VERIFIED LIVE</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Details */}
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2 text-xs font-mono text-violet-400 uppercase tracking-widest mb-2">
                    <span>AGRITECH DIGITAL EMPOWERMENT PLATFORM</span>
                  </div>
                  <h3 className="font-display font-black text-3xl sm:text-5xl text-white mb-2 tracking-tight">
                    {fasalNiti.title}
                  </h3>
                  <p className="text-base font-medium text-violet-300 italic mb-6">
                    "{fasalNiti.tagline}"
                  </p>

                  <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-sans">
                    {fasalNiti.description}
                  </p>

                  {/* Architecture Highlight Box */}
                  <div className="p-5 rounded-2xl bg-neutral-900/70 border border-white/10 mb-6">
                    <h4 className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-violet-400" />
                      Technical Architecture Overview
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {fasalNiti.architectureOverview}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {fasalNiti.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3.5 py-1 rounded-xl text-xs font-mono bg-violet-950/40 border border-violet-500/30 text-violet-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Interactive Action Hub */}
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href={fasalNiti.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playTactileClick()}
                      onMouseEnter={() => sound.playHoverTone()}
                      className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-all shadow-[0_0_25px_rgba(138,43,226,0.4)]"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Launch Original Website</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => {
                        sound.playDeliberateMechanicalKey();
                        setActiveView('exploded');
                      }}
                      className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-mono text-neutral-300 hover:text-white glass-panel border border-white/10 transition-colors"
                    >
                      <Box className="w-3.5 h-3.5 text-violet-400" />
                      <span>Inspect 3D Exploded Blueprint</span>
                    </button>
                  </div>
                </div>

                {/* Right Visual Frame: Interactive Live/Static Website Preview */}
                <div className="lg:col-span-5">
                  <InteractiveWebsitePreview
                    url={fasalNiti.liveUrl}
                    previewImage={fasalNiti.previewImage}
                    hasGenuineImage={true}
                    title={fasalNiti.title}
                    role="100% Solo Web Developer"
                    category="Agri-Tech Platform"
                    aspectRatio="4/3"
                    className="border-violet-500/40 shadow-2xl"
                  />
                </div>
              </div>
            </CardSpotlight>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* MODE 2: 3D EXPLODED-VIEW ARCHITECTURAL HOLOGRAM          */}
        {/* ======================================================== */}
        {activeView === 'exploded' && (
          <motion.div
            key="exploded"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="glass-panel-elevated rounded-3xl p-6 sm:p-10 border border-violet-500/30 relative overflow-hidden">
              {/* Top Controls: Explode / Assemble Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-violet-400 uppercase tracking-widest block mb-1">
                    ISOMETRIC DISASSEMBLY &bull; EXPLODED HOLOGRAM
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                    3-Tier Engineering Blueprint
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      sound.playDeliberateMechanicalKey();
                      setIsExplodedStacked(!isExplodedStacked);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600/30 hover:bg-violet-600/50 border border-violet-500/40 text-violet-200 text-xs font-mono transition-all"
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>{isExplodedStacked ? 'FLATTEN TO 2D' : 'EXPLODE 3D TIERS'}</span>
                  </button>
                </div>
              </div>

              {/* 3 Interactive Exploded Architecture Tiers */}
              <div className="space-y-6">
                {architecturalLayers.map((layer, idx) => {
                  const LayerIcon = layer.icon;
                  const isSelected = activeHoloLayer === idx;

                  return (
                    <motion.div
                      key={layer.id}
                      onClick={() => {
                        sound.playTactileClick();
                        setActiveHoloLayer(idx);
                      }}
                      animate={{
                        y: layer.elevation,
                        scale: isSelected ? 1.01 : 1,
                      }}
                      transition={{ type: 'spring', stiffness: 220, damping: 25 }}
                      className={`relative rounded-2xl p-6 sm:p-8 border transition-all cursor-pointer ${
                        isSelected 
                          ? 'border-violet-400 shadow-[0_10px_35px_rgba(138,43,226,0.35)]' 
                          : 'border-white/10 hover:border-white/20'
                      }`}
                      style={{ background: layer.bgGrad }}
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div 
                            className="p-3.5 rounded-xl border mt-1"
                            style={{ 
                              backgroundColor: `${layer.color}20`, 
                              borderColor: `${layer.color}50`, 
                              color: layer.color 
                            }}
                          >
                            <LayerIcon className="w-6 h-6" />
                          </div>

                          <div>
                            <span 
                              className="text-[10px] font-mono tracking-widest uppercase block mb-1 font-bold"
                              style={{ color: layer.color }}
                            >
                              {layer.tier}
                            </span>
                            <h4 className="font-display font-bold text-xl sm:text-2xl text-white mb-2">
                              {layer.title}
                            </h4>
                            <div className="text-xs font-mono text-neutral-400 mb-3">
                              {layer.tech}
                            </div>
                            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl font-sans">
                              {layer.detail}
                            </p>
                          </div>
                        </div>

                        <div className="flex md:flex-col items-end justify-between md:justify-start gap-2 shrink-0">
                          <span 
                            className="px-3 py-1 rounded-full text-[10px] font-mono border"
                            style={{ 
                              backgroundColor: `${layer.color}15`, 
                              borderColor: `${layer.color}40`, 
                              color: layer.color 
                            }}
                          >
                            {layer.status}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-500 uppercase">
                            100% SOLO AUTHORED
                          </span>
                        </div>
                      </div>

                      {/* Optical Circuit Connecting Line */}
                      {idx < architecturalLayers.length - 1 && isExplodedStacked && (
                        <div className="hidden sm:block absolute -bottom-6 left-12 w-0.5 h-6 bg-gradient-to-b from-violet-400 to-transparent pointer-events-none z-10" />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Solved Engineering Feats List */}
              <div className="mt-10 p-6 rounded-2xl bg-neutral-900/70 border border-white/10">
                <h4 className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Key Engineering Feats Solved During Solo Development
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fasalNiti.challengesSolved.map((challenge, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300 font-sans">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0" />
                      <span>{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* MODE 3: AUDIT LEDGER & ATTRIBUTION TELEMETRY              */}
        {/* ======================================================== */}
        {activeView === 'verification' && (
          <motion.div
            key="verification"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <div className="glass-panel-elevated rounded-3xl p-6 sm:p-10 border border-violet-500/30">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 mb-8 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-violet-400 uppercase tracking-widest block mb-1">
                    AUDIT LEDGER &bull; STRICT FACTUAL ATTRIBUTION
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                    Solo Authorship Telemetry
                  </h3>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>PORTFOLIO SCOPE: SINGLE SOLO WEBSITE</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/5 font-mono">
                  <span className="text-[10px] text-neutral-500 block uppercase">Solo Projects Developed</span>
                  <span className="text-2xl font-bold text-violet-300 mt-1 block">01 Website</span>
                  <span className="text-[11px] text-neutral-400 mt-1 block">Fasal Niti Platform</span>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/5 font-mono">
                  <span className="text-[10px] text-neutral-500 block uppercase">Team Collaboration</span>
                  <span className="text-2xl font-bold text-emerald-400 mt-1 block">0 Co-devs</span>
                  <span className="text-[11px] text-neutral-400 mt-1 block">100% individual coding</span>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/5 font-mono">
                  <span className="text-[10px] text-neutral-500 block uppercase">Hosting / CDN</span>
                  <span className="text-2xl font-bold text-cyan-300 mt-1 block">Vercel Edge</span>
                  <span className="text-[11px] text-neutral-400 mt-1 block">prototype-fasalniti</span>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/5 font-mono">
                  <span className="text-[10px] text-neutral-500 block uppercase">Status Verification</span>
                  <span className="text-2xl font-bold text-amber-300 mt-1 block">Live SSL</span>
                  <span className="text-[11px] text-neutral-400 mt-1 block">Fully interactive embed</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans max-w-3xl">
                <strong>Strict Attribution Boundary:</strong> While ventures like Drusavi (10–15 people) and Nyay Link (8–9 people) were built in multi-disciplinary teams, and hackathons at MITS IEEE, OP Jindal, IIM Bhubaneswar, and IIT Delhi were collaborative team efforts, <em>Fasal Niti's website represents the sole individually authored, coded, and deployed web application in this portfolio</em>.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
