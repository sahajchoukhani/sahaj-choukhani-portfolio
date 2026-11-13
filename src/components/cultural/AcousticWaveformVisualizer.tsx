import React, { useEffect, useRef } from 'react';
import { sound } from '../../services/soundEngine';

interface AcousticWaveformVisualizerProps {
  isPlaying: boolean;
  trackTitle?: string;
}

export const AcousticWaveformVisualizer: React.FC<AcousticWaveformVisualizerProps> = ({
  isPlaying,
  trackTitle = 'Classical Piano Polyphony // 432 Hz',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth || 600;
      height = 90;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      time += isPlaying ? 0.045 : 0.012;
      ctx.clearRect(0, 0, width, height);

      const midY = height / 2;
      const points = 70;
      const step = width / (points - 1);

      // Multi-layer harmonic sine waves (Fundamental, 2nd Harmonic, 3rd Harmonic)
      const layers = [
        {
          freq: 0.035,
          amp: isPlaying ? 24 : 8,
          speed: 1.2,
          color: 'rgba(245, 158, 11, 0.75)', // Amber gold
          width: 2.0,
        },
        {
          freq: 0.065,
          amp: isPlaying ? 16 : 5,
          speed: -1.6,
          color: 'rgba(212, 175, 55, 0.55)', // Classical gold
          width: 1.4,
        },
        {
          freq: 0.12,
          amp: isPlaying ? 8 : 2.5,
          speed: 2.2,
          color: 'rgba(0, 229, 255, 0.40)', // Computational Cyan resonance
          width: 1.0,
        },
      ];

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      layers.forEach((layer) => {
        ctx.beginPath();
        for (let i = 0; i < points; i++) {
          const x = i * step;
          // Taper edges to 0 amplitude at left and right boundaries
          const envelope = Math.sin((i / (points - 1)) * Math.PI);
          const y =
            midY +
            Math.sin(x * layer.freq + time * layer.speed) *
              layer.amp *
              envelope +
            Math.cos(x * 0.02 - time * 0.8) * (layer.amp * 0.4) * envelope;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineWidth = layer.width;
        ctx.strokeStyle = layer.color;
        ctx.stroke();

        // Subtle glow bloom
        if (isPlaying) {
          ctx.lineWidth = layer.width * 3.5;
          ctx.strokeStyle = layer.color.replace(/[\d.]+\)$/, '0.15)');
          ctx.stroke();
        }
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [isPlaying]);

  return (
    <div 
      onClick={() => {
        sound.playPianoHammerStrike();
      }}
      className="relative w-full rounded-2xl bg-black/40 border border-white/10 p-4 overflow-hidden cursor-pointer group hover:border-amber-400/40 transition-all select-none"
      title="Click to strike acoustic piano resonance"
    >
      <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-amber-400 animate-ping' : 'bg-neutral-600'}`} />
          <span className="text-neutral-200 font-semibold uppercase tracking-wider">
            ACOUSTIC WAVEFORM TELEMETRY
          </span>
          <span className="text-neutral-600">//</span>
          <span className="text-amber-400/80 text-[11px] truncate max-w-[200px] sm:max-w-xs">
            {trackTitle}
          </span>
        </div>
        <span className="text-[10px] text-neutral-500 uppercase tracking-widest hidden sm:inline">
          TAP TO STRIKE PIANO
        </span>
      </div>

      <canvas ref={canvasRef} className="w-full h-[90px] block" />
    </div>
  );
};

