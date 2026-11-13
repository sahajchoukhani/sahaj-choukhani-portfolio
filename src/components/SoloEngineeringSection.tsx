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
  Server
} from 'lucide-react';
import { CardSpotlight } from './ui/CardSpotlight';
import { BorderBeam } from './ui/BorderBeam';
import { InteractiveWebsitePreview } from './InteractiveWebsitePreview';
import { sound } from '../services/soundEngine';

export const SoloEngineeringSection: React.FC = () => {
  const fasalNiti = soloProjectsData[0];
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeView, setActiveView] = useState<'overview' | 'blueprint' | 'verification'>('overview');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  const architecturalNodes = [
    {
      id: 'ui-core',
      icon: Monitor,
      title: 'Responsive Agritech UI & UX',
      tech: 'Semantic HTML5 • Modular CSS3 • Vanilla JS Architecture',
      detail: 'Tailored specifically for rural & agricultural usability with ultra-clear contrast, large touch targets, and low-bandwidth asset optimizations.',
      status: 'SOLO CRAFTED',
    },
    {
      id: 'data-engine',
      icon: Database,
      title: 'Farmer Policy & Yield Calculation Logic',
      tech: 'Algorithmic Scheme Matching & Rule Evaluator',
      detail: 'Dynamic state evaluation matching farmer crop types and land acreage directly to verified agricultural subsidies and government initiatives.',
      status: 'INDIVIDUAL CODE',
    },
    {
      id: 'edge-delivery',
      icon: Server,
      title: 'Zero-Downtime Edge Deployment',
      tech: 'Vercel Edge Network & Production CI Pipeline',
      detail: 'Configured automated edge CDN caching, instant HTTPS certification, and performance budgets achieving sub-second first contentful paint.',
      status: 'VERIFIED DEPLOY',
    },
  ];

  return (
    <section 
      id="solo" 
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-24 overflow-hidden"
    >
      {/* Dynamic Background Blueprint Grid with Scroll Parallax */}
      <motion.div 
        style={{ y: backgroundY, opacity }}
        className="absolute inset-0 pointer-events-none -z-10"
      >
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(138, 43, 226, 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(138, 43, 226, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
        {/* Subtle Violet Atmospheric Well */}
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[140px]" />
      </motion.div>

      {/* Luminous Architectural Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-950/50 border border-violet-500/40 text-xs font-mono text-violet-300 mb-4 shadow-[0_0_15px_rgba(138,43,226,0.2)]">
            <UserCheck className="w-3.5 h-3.5 text-violet-400" />
            <span className="tracking-wider uppercase">SOLO ENGINEERING VAULT // INDEPENDENT DISCIPLINE</span>
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
          <span>Exhibition &amp; Live Chassis</span>
        </button>

        <button
          onClick={() => {
            sound.playDeliberateMechanicalKey();
            setActiveView('blueprint');
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-mono transition-all border ${
            activeView === 'blueprint'
              ? 'bg-violet-500 text-white font-bold border-violet-400 shadow-[0_0_20px_rgba(138,43,226,0.35)] -translate-y-0.5'
              : 'glass-panel text-neutral-400 border-white/10 hover:border-white/20 hover:text-white'
          }`}
        >
          <Workflow className="w-3.5 h-3.5" />
          <span>System Blueprint &amp; Feats</span>
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
          <span>Solo Verification Telemetry</span>
        </button>
      </div>

      {/* Main Content Area with Smooth Crossfade */}
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
                        setActiveView('blueprint');
                      }}
                      className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-mono text-neutral-300 hover:text-white glass-panel border border-white/10 transition-colors"
                    >
                      <Workflow className="w-3.5 h-3.5 text-violet-400" />
                      <span>Inspect 3 Architecture Nodes</span>
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

        {activeView === 'blueprint' && (
          <motion.div
            key="blueprint"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="glass-panel-elevated rounded-3xl p-6 sm:p-10 border border-violet-500/30">
              <div className="max-w-2xl mb-8">
                <span className="text-xs font-mono text-violet-400 uppercase tracking-widest block mb-2">
                  DISASSEMBLED ARCHITECTURAL SCHEMATIC
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  3-Tier Engineering Blueprint
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-sans">
                  Every layer—from the semantic DOM trees to edge asset delivery—was architected and scripted directly by Sahaj.
                </p>
              </div>

              {/* 3 Interactive Architecture Nodes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {architecturalNodes.map((node, idx) => {
                  const NodeIcon = node.icon;
                  return (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="p-6 rounded-2xl glass-panel border border-violet-500/20 hover:border-violet-500/50 transition-all group relative overflow-hidden flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20 transition-colors">
                            <NodeIcon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-950/60 border border-violet-500/30 text-violet-300">
                            NODE 0{idx + 1}
                          </span>
                        </div>

                        <h4 className="font-sans font-bold text-base text-white mb-2">
                          {node.title}
                        </h4>
                        <div className="text-xs font-mono text-violet-300 mb-3">
                          {node.tech}
                        </div>
                        <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                          {node.detail}
                        </p>
                      </div>

                      <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                        <span className="text-emerald-400 font-semibold">{node.status}</span>
                        <span>CONFIRMED 100%</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Solved Engineering Feats List */}
              <div className="mt-8 p-6 rounded-2xl bg-neutral-900/60 border border-white/10">
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
