import React, { useEffect } from 'react';
import { X, Award, Users, Cpu, ShieldCheck, Flag, Info, Camera, Building2 } from 'lucide-react';
import { HackathonProject } from '../types';
import { InteractiveWebsitePreview } from './InteractiveWebsitePreview';
import { sound } from '../services/soundEngine';

interface HackathonModalProps {
  project: HackathonProject | null;
  onClose: () => void;
}

export const HackathonModal: React.FC<HackathonModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (project) {
      sound.playModalWhoosh();
    }
  }, [project]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Glow Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playTactileClick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Event Type & Team Attribution Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/40 text-xs font-mono text-amber-300">
            <Users className="w-3.5 h-3.5" />
            <span>COLLABORATIVE TEAM WORK</span>
          </span>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">
            Event Type: {project.eventType || project.type}
          </span>
        </div>

        {/* Outcome Status / Victory Banner */}
        {project.outcomeStatus && (
          <div className="mb-4 p-3.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border border-amber-500/30 flex items-center justify-between gap-2.5 text-amber-300 text-sm font-semibold">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400 shrink-0" />
              <span>{project.awardTitle || project.outcomeStatus}</span>
            </div>
            {project.isPending && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                Results Pending
              </span>
            )}
          </div>
        )}

        {/* Organizing Host Institution Callout */}
        {project.organizerInstitution && (
          <div className={`mb-4 p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
            project.isPremierInstitution
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
              : 'bg-white/5 border-white/10 text-neutral-300'
          }`}>
            <div className="flex items-center gap-2.5">
              <Building2 className={`w-4 h-4 shrink-0 ${project.isPremierInstitution ? 'text-amber-400' : 'text-cyan-400'}`} />
              <div className="text-xs font-mono">
                <span className="text-[10px] uppercase text-neutral-400 block tracking-wider">Host &amp; Organizing Institution</span>
                <span className="text-white font-bold text-sm font-display">{project.organizerInstitution}</span>
              </div>
            </div>
            {project.isPremierInstitution && (
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold uppercase tracking-wider shrink-0">
                Premier Institute
              </span>
            )}
          </div>
        )}

        {/* Title & Event */}
        <div className="mb-6">
          <span className="text-xs font-mono text-neutral-400 block mb-1">
            {project.eventName}
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            {project.projectName || project.eventName}
          </h2>
          {project.associatedVentureOrIdea && (
            <p className="text-xs font-mono text-cyan-300 mt-1.5">
              Platform / Solution Pitched: <strong>{project.associatedVentureOrIdea}</strong>
            </p>
          )}
          <p className="text-xs font-mono text-neutral-400 mt-1">
            {project.collaboratorsNote}
          </p>
        </div>

        {/* Evidence Note (if applicable) */}
        {project.evidenceNote && (
          <div className="mb-6 p-3.5 rounded-xl bg-violet-950/30 border border-violet-500/30 text-violet-200 text-xs font-mono flex items-start gap-2">
            <Info className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-violet-300 mb-0.5">Verification &amp; Evidence</span>
              <span>{project.evidenceNote}</span>
            </div>
          </div>
        )}

        {/* STRICT ATTRIBUTION SECTION: MY INDIVIDUAL ROLE */}
        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30">
            <span className="font-mono text-xs text-amber-400 uppercase tracking-wider block mb-2 font-bold flex items-center gap-1.5">
              <Flag className="w-3.5 h-3.5" />
              My Individual Technical Role & Contribution
            </span>
            <p className="text-sm text-neutral-100 font-medium leading-relaxed">
              {project.myRoleAndContribution}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/5">
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider block mb-2">
              Project Description
            </span>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Interactive Web Preview (When project has liveLink or previewImage) */}
          {(project.liveLink || (project.previewImage && project.hasGenuineImage)) && (
            <div className="pt-2">
              <span className="font-mono text-[11px] text-cyan-400 uppercase tracking-wider block mb-2">
                Project Web System Preview
              </span>
              <InteractiveWebsitePreview
                url={project.liveLink}
                previewImage={project.previewImage}
                hasGenuineImage={project.hasGenuineImage}
                title={project.projectName || project.eventName}
                role="Featured Technical Solution"
                category={project.eventType || 'Competition Entry'}
                aspectRatio="16/10"
              />
            </div>
          )}

          {/* Authentic Stage Evidence Photo (e.g. IIM Bhubaneswar) */}
          {project.evidenceScreenshot && (
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
                <Camera className="w-3.5 h-3.5 text-amber-400" />
                <span>AUTHENTIC COMPETITION EVIDENCE PHOTO</span>
              </div>
              <div className="rounded-xl overflow-hidden border border-white/10 bg-black/60 max-h-[260px] flex items-center justify-center">
                <img
                  src={project.evidenceScreenshot}
                  alt={project.projectName || project.eventName}
                  className="max-h-[260px] w-auto object-contain"
                />
              </div>
              {project.evidenceNote && (
                <p className="text-[11px] font-mono text-neutral-400 leading-relaxed">
                  {project.evidenceNote}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Technologies Used */}
        <div className="mb-6">
          <h4 className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-neutral-400" />
            Technologies Implemented
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-neutral-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end pt-4 border-t border-white/10">
          <button
            onClick={() => {
              sound.playTactileClick();
              onClose();
            }}
            className="px-6 py-2 rounded-full text-xs font-mono bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            Close Record
          </button>
        </div>
      </div>
    </div>
  );
};
