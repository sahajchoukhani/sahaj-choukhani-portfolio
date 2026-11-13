import React, { useState } from 'react';
import { creativeArtsData } from '../data/creativeArts';
import { Music, Award, Sparkles, Play, Pause, Volume2, Film } from 'lucide-react';
import { sound } from '../services/soundEngine';

export const CreativeStudio: React.FC = () => {
  const [isPlayingSample, setIsPlayingSample] = useState(false);

  const toggleSample = () => {
    sound.playTactileClick();
    setIsPlayingSample(!isPlayingSample);
    if (!isPlayingSample) {
      sound.playVictoryFanfare();
    }
  };

  return (
    <section id="creative" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-950/40 border border-yellow-500/30 text-xs font-mono text-yellow-300 mb-4">
            <Music className="w-3.5 h-3.5" />
            <span>THE CREATIVE STUDIO</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            The Renaissance Mind: Music & Theatre.
          </h2>
        </div>
        <p className="max-w-md text-sm text-neutral-400 font-sans leading-relaxed">
          Technologists build systems; artists give them soul. A discipline founded on classical piano, award-winning vocal performance, live dramatic stagecraft, and cinematic branding.
        </p>
      </div>

      {/* Featured Grid: 4 Creative Disciplines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {creativeArtsData.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => sound.playHoverTone()}
            className="group glass-panel-elevated rounded-3xl p-8 border border-white/10 hover:border-yellow-400/40 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden"
          >
            {/* Top Accolade Banner */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                  {item.category}
                </span>
                {item.accolade && (
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 font-semibold flex items-center gap-1.5 shadow-sm">
                    <Award className="w-3.5 h-3.5 text-yellow-400" />
                    {item.accolade}
                  </span>
                )}
              </div>

              <h3 className="font-display font-bold text-2xl text-white group-hover:text-yellow-300 transition-colors mb-3">
                {item.title}
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                {item.description}
              </p>
            </div>

            {/* Tags & Action */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/5 text-neutral-300 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {item.mediaType === 'audio' && (
                <button
                  onClick={toggleSample}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-semibold bg-yellow-400 hover:bg-yellow-300 text-neutral-950 transition-all shadow-md"
                >
                  {isPlayingSample ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlayingSample ? 'Pause Performance' : 'Listen Sample'}</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Google Flow Cinematic Integration Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Film className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                CINEMATIC PRODUCTION PIPELINE
              </span>
              <h4 className="font-display font-bold text-lg sm:text-xl text-white">
                Powered by Google Flow Video Reels
              </h4>
              <p className="text-xs text-neutral-400 mt-1">
                Transforming live photographs, stage stills, and startup branding into ambient cinematic video loops directly rendered in the browser.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-300 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Folder 06_Google_Flow_Videos Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
};

