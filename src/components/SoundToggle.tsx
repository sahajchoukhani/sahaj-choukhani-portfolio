import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sound } from '../services/soundEngine';

export const SoundToggle: React.FC = () => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  useEffect(() => {
    // Keep UI in sync with sound engine state
    setIsMuted(sound.getMuted());
  }, []);

  const handleToggle = () => {
    const nextState = sound.toggleMute();
    setIsMuted(nextState);
  };

  return (
    <button
      onClick={handleToggle}
      className={`group relative flex items-center gap-2.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 border ${
        !isMuted
          ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
          : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
      }`}
      title={isMuted ? 'Turn on sound experience' : 'Mute sound experience'}
      aria-label="Toggle Sound"
    >
      {/* Sound equalizer animation bars when active */}
      {!isMuted ? (
        <div className="flex items-center gap-0.5 h-3">
          <span className="w-0.5 h-3 bg-cyan-400 animate-[pulse_0.6s_ease-in-out_infinite]" />
          <span className="w-0.5 h-2 bg-cyan-400 animate-[pulse_0.8s_ease-in-out_infinite_0.15s]" />
          <span className="w-0.5 h-3.5 bg-cyan-400 animate-[pulse_0.5s_ease-in-out_infinite_0.3s]" />
          <span className="w-0.5 h-1.5 bg-cyan-400 animate-[pulse_0.7s_ease-in-out_infinite_0.1s]" />
        </div>
      ) : (
        <VolumeX className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300 transition-colors" />
      )}

      <span>{isMuted ? 'AUDIO: OFF' : 'AUDIO: LIVE'}</span>

      {!isMuted && <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
    </button>
  );
};

