import React, { useEffect } from 'react';
import { X, Rocket, Cpu, ExternalLink, Sparkles, Shield, Globe, Share2, Code2 } from 'lucide-react';
import { Startup } from '../types';
import { InteractiveWebsitePreview } from './InteractiveWebsitePreview';
import { sound } from '../services/soundEngine';

interface StartupModalProps {
  startup: Startup | null;
  onClose: () => void;
}

export const StartupModal: React.FC<StartupModalProps> = ({ startup, onClose }) => {
  useEffect(() => {
    if (startup) {
      sound.playModalWhoosh();
    }
  }, [startup]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!startup) return null;

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case 'Founder':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold';
      case 'Co-Founder':
        return 'bg-violet-500/20 text-violet-300 border-violet-500/40 font-bold';
      case 'Core Member':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-semibold';
      default:
        return 'bg-white/10 text-neutral-300 border-white/10';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-amber-500" />

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playTactileClick();
            onClose();
          }}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors absolute top-6 right-6"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-neutral-900 to-violet-600/30 border border-white/15 flex items-center justify-center text-white font-display font-bold text-lg shadow-inner">
            {startup.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                {startup.category || 'Venture Portfolio'}
              </span>
              <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${getRoleBadgeStyle(startup.role)}`}>
                Role: {startup.role}
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mt-1">
              {startup.name}
            </h2>
          </div>
        </div>

        {/* Tagline */}
        {startup.tagline && (
          <p className="text-sm font-medium text-neutral-300 italic mb-6">
            "{startup.tagline}"
          </p>
        )}

        {/* Personal Contribution Highlight (e.g. Built Fasal Niti Website) */}
        {startup.personalContribution && (
          <div className="mb-6 p-4 rounded-2xl bg-violet-950/30 border border-violet-500/40 text-violet-200 text-xs sm:text-sm flex items-start gap-2.5 font-sans">
            <Code2 className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
            <div>
              <span className="font-mono text-[10px] uppercase text-violet-400 block mb-0.5 tracking-wider font-bold">
                Special Engineering Milestone
              </span>
              <p className="font-medium text-white">{startup.personalContribution}</p>
            </div>
          </div>
        )}

        {/* Core Description */}
        <div className="space-y-4 mb-6 text-sm text-neutral-300 leading-relaxed">
          <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/5">
            <h4 className="font-mono text-xs text-neutral-400 uppercase mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Venture Profile
            </h4>
            <p>{startup.description}</p>
          </div>
        </div>

        {/* My Exact Role Section */}
        <div className="mb-6 p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-between">
          <div>
            <span className="font-mono text-[11px] text-cyan-400 uppercase tracking-wider block mb-0.5">
              My Designated Role in {startup.name}
            </span>
            <span className="text-base font-semibold text-white">
              {startup.role}
            </span>
          </div>
          <span className={`text-xs font-mono px-3 py-1 rounded-full border ${getRoleBadgeStyle(startup.role)}`}>
            {startup.role}
          </span>
        </div>

        {/* Interactive Digital Exhibition Chassis */}
        <div className="mb-6">
          <InteractiveWebsitePreview
            url={startup.websiteUrl}
            previewImage={startup.previewImage}
            hasGenuineImage={startup.hasGenuineImage}
            title={startup.name}
            role={startup.role}
            category={startup.category}
            aspectRatio="16/10"
          />
        </div>

        {/* Technologies if available */}
        {startup.technologies && startup.technologies.length > 0 && (
          <div className="mb-8">
            <h4 className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-violet-400" />
              Technical Stack &amp; Focus
            </h4>
            <div className="flex flex-wrap gap-2">
              {startup.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            {startup.websiteUrl && (
              <a
                href={startup.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-neutral-200 border border-white/10"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Live Website</span>
              </a>
            )}
            {startup.socialUrl && (
              <a
                href={startup.socialUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-neutral-200 border border-white/10"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Social Link</span>
              </a>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playTactileClick();
                onClose();
              }}
              className="px-5 py-2.5 rounded-full text-xs font-mono text-neutral-400 hover:text-white transition-colors"
            >
              Close
            </button>
            <a
              href="#contact"
              onClick={() => {
                sound.playTactileClick();
                onClose();
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold bg-cyan-400 text-neutral-950 hover:bg-cyan-300 transition-all shadow-md"
            >
              <span>Inquire About {startup.name}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
