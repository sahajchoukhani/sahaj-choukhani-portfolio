import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectArchiveData, ArchiveProject } from '../data/projectArchive';
import { InteractiveWebsitePreview } from './InteractiveWebsitePreview';
import { 
  Globe, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Code2, 
  Cpu, 
  CheckCircle2, 
  Eye, 
  MonitorPlay,
  Smartphone,
  Tablet,
  Laptop,
  Radio,
  Lock
} from 'lucide-react';
import { CardSpotlight } from './ui/CardSpotlight';
import { BorderBeam } from './ui/BorderBeam';
import { sound } from '../services/soundEngine';

export const ProjectArchiveSection: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('nyay-link');
  const [aspectRatio, setAspectRatio] = useState<'16/10' | '16/9' | '4/3'>('16/10');

  const activeProject = projectArchiveData.find((p) => p.id === selectedProjectId) || projectArchiveData[0];

  const handleSelectProject = (project: ArchiveProject) => {
    sound.playTactileClick();
    setSelectedProjectId(project.id);
  };

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case 'Founder':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold';
      case 'Co-founder':
      case 'Co-Founder':
        return 'bg-violet-500/20 text-violet-300 border-violet-500/40 font-bold';
      case 'Core Team Member':
      case 'Core Member':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-semibold';
      case 'Creator & Architect':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-semibold';
      default:
        return 'bg-white/10 text-neutral-300 border-white/10';
    }
  };

  const getProjectAccentGlow = (id: string) => {
    switch (id) {
      case 'nyay-link':
        return 'rgba(0, 240, 255, 0.15)';
      case 'drusavi':
        return 'rgba(56, 189, 248, 0.15)';
      case 'fasal-niti':
        return 'rgba(16, 185, 129, 0.15)';
      case 'less-go':
        return 'rgba(245, 158, 11, 0.15)';
      case 'ripsahaj-3d':
        return 'rgba(168, 85, 247, 0.15)';
      default:
        return 'rgba(0, 240, 255, 0.15)';
    }
  };

  return (
    <section id="archive" className="py-28 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-24 overflow-hidden relative">
      {/* Background Ambient Radial Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] blur-[150px] pointer-events-none rounded-full transition-colors duration-700 -z-10"
        style={{ background: getProjectAccentGlow(activeProject.id) }}
      />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/40 text-xs font-mono text-cyan-300 mb-4 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <MonitorPlay className="w-3.5 h-3.5 text-cyan-400" />
            <span className="tracking-wider uppercase">INTERACTIVE DIGITAL EXHIBITION // MULTI-VENTURE ARCHIVE</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            The Project Archive.
          </h2>
          <p className="text-xs sm:text-sm font-sans text-neutral-400 mt-2 max-w-xl leading-relaxed">
            A digital exhibition of live web systems, venture architectures, and personal platforms. Test live interactive embeds directly inside the chassis or inspect verified landing page captures.
          </p>
        </div>

        {/* Priority Legend Pill */}
        <div className="p-4 rounded-2xl glass-panel border border-white/10 max-w-md shrink-0">
          <div className="text-[11px] font-mono text-neutral-400 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <strong className="text-neutral-200">Priority 1:</strong> Live Interactive Embedded Website
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <strong className="text-neutral-200">Priority 2:</strong> Authentic Landing Page Capture Fallback
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <strong className="text-neutral-200">Priority 3:</strong> Direct External Access Gateway
            </div>
          </div>
        </div>
      </div>

      {/* Project Selector Dock & Viewport Aspect Ratio Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10 pb-4 border-b border-white/10">
        {/* Project Selector Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none max-w-full">
          {projectArchiveData.map((project) => {
            const isSelected = project.id === activeProject.id;
            return (
              <button
                key={project.id}
                id={`archive-tab-${project.id}`}
                onClick={() => handleSelectProject(project)}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-2xl text-xs font-mono transition-all whitespace-nowrap border ${
                  isSelected
                    ? 'bg-cyan-400 text-neutral-950 font-bold border-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] transform -translate-y-0.5'
                    : 'glass-panel text-neutral-400 border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                <Globe className={`w-3.5 h-3.5 ${isSelected ? 'text-neutral-950' : 'text-cyan-400'}`} />
                <span>{project.title}</span>
                {project.eventOrContext && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-black/20 text-neutral-900 font-semibold' : 'bg-white/5 text-neutral-400'
                  }`}>
                    {project.eventOrContext}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Viewport Aspect Ratio Selector */}
        <div className="flex items-center gap-2 self-start lg:self-auto shrink-0 bg-neutral-900/70 p-1.5 rounded-2xl border border-white/10">
          <span className="text-[10px] font-mono text-neutral-400 px-2 select-none">VIEWPORT:</span>
          <button
            onClick={() => {
              sound.playTactileClick();
              setAspectRatio('16/10');
            }}
            title="Desktop 16:10"
            className={`p-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all font-mono ${
              aspectRatio === '16/10'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span className="text-[10px]">16:10</span>
          </button>

          <button
            onClick={() => {
              sound.playTactileClick();
              setAspectRatio('16/9');
            }}
            title="Widescreen 16:9"
            className={`p-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all font-mono ${
              aspectRatio === '16/9'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <MonitorPlay className="w-3.5 h-3.5" />
            <span className="text-[10px]">16:9</span>
          </button>

          <button
            onClick={() => {
              sound.playTactileClick();
              setAspectRatio('4/3');
            }}
            title="Tablet / Square 4:3"
            className={`p-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all font-mono ${
              aspectRatio === '4/3'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="text-[10px]">4:3</span>
          </button>
        </div>
      </div>

      {/* Main Exhibition Stage with Animated Crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left Column (5 Cols): Project Details & Context */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel-elevated rounded-3xl p-6 sm:p-7 border border-white/10 shadow-2xl relative overflow-hidden">
              <BorderBeam size={220} duration={9} colorFrom="#00f0ff" colorTo="#8a2be2" />

              {/* Badges Bar */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`text-[11px] font-mono px-3 py-1 rounded-full border ${getRoleBadgeStyle(activeProject.role)}`}>
                  Role: {activeProject.role}
                </span>
                {activeProject.eventOrContext && (
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                    {activeProject.eventOrContext}
                  </span>
                )}
                {activeProject.isSoloBuilt && (
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 font-semibold flex items-center gap-1">
                    <Code2 className="w-3 h-3" />
                    100% Solo Built
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2 tracking-tight">
                {activeProject.title}
              </h3>
              <p className="text-sm font-sans italic text-neutral-300 mb-5">
                "{activeProject.tagline}"
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm font-sans text-neutral-300 leading-relaxed mb-6">
                {activeProject.description}
              </p>

              {/* Tech Stack Pills */}
              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                  Technical Stack &amp; Architecture:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-neutral-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Action Link */}
              {activeProject.url && (
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playTactileClick()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold bg-cyan-400 text-neutral-950 hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] group"
                  >
                    <span>Open {activeProject.title} in New Tab</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  <span className="text-[10px] font-mono text-neutral-500">
                    Priority 3 Gateway
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (7 Cols): Master Interactive Preview Chassis */}
          <div className="lg:col-span-7">
            <InteractiveWebsitePreview
              key={`${activeProject.id}-${aspectRatio}`}
              url={activeProject.url}
              previewImage={activeProject.previewImage}
              hasGenuineImage={activeProject.hasGenuineImage}
              title={activeProject.title}
              role={activeProject.role}
              category={activeProject.category}
              aspectRatio={aspectRatio}
              className="border-cyan-500/30 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
