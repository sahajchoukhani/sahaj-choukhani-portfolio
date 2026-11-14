import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { ReticleOverlay } from '../components/ReticleOverlay';

export const Act01Anticipation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scale and opacity springs
  const introSpring = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 80, mass: 1 },
  });

  const centerRingScale = interpolate(frame, [0, 80], [0.6, 1.25], {
    extrapolateRight: 'clamp',
  });

  const centerRingRotate = interpolate(frame, [0, 90], [0, 90]);

  const opacity = interpolate(frame, [0, 15, 75, 90], [0, 1, 1, 0.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textTracking = interpolate(frame, [0, 80], [0.15, 0.45], {
    extrapolateRight: 'clamp',
  });

  const scanlineY = (frame * 14) % 1080;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#06080d',
        overflow: 'hidden',
        opacity,
      }}
    >
      {/* Background Ambient Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.08) 0%, rgba(10, 20, 35, 0.4) 45%, transparent 75%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Sweep Scanline */}
      <div
        style={{
          position: 'absolute',
          top: scanlineY,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 240, 255, 0.3) 50%, transparent 100%)',
          boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
        }}
      />

      {/* Central Rotating Mechanical Crosshair Target */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${centerRingScale}) rotate(${centerRingRotate}deg)`,
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          border: '1px dashed rgba(0, 240, 255, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Inner Ring */}
        <div
          style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        />

        {/* 4 Axis Ticks */}
        <div style={{ position: 'absolute', top: -8, width: 2, height: 16, backgroundColor: '#00f0ff' }} />
        <div style={{ position: 'absolute', bottom: -8, width: 2, height: 16, backgroundColor: '#00f0ff' }} />
        <div style={{ position: 'absolute', left: -8, width: 16, height: 2, backgroundColor: '#00f0ff' }} />
        <div style={{ position: 'absolute', right: -8, width: 16, height: 2, backgroundColor: '#00f0ff' }} />
      </div>

      {/* Center Typographic Announcement */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '13px',
            letterSpacing: '0.4em',
            color: 'rgba(0, 240, 255, 0.8)',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          INITIATING RECORDING SEQUENCE
        </div>

        <h1
          style={{
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            fontSize: '56px',
            fontWeight: 700,
            letterSpacing: `${textTracking}em`,
            color: '#f5f5f7',
            margin: 0,
            textShadow: '0 0 30px rgba(0, 240, 255, 0.35)',
          }}
        >
          S A H A J
        </h1>

        <div
          style={{
            marginTop: '20px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: 'rgba(255, 255, 255, 0.45)',
          }}
        >
          ACT 01 // SYSTEM ANTICIPATION • OBSIDIAN MATRIX
        </div>
      </div>

      {/* Corner Telemetry HUD */}
      <ReticleOverlay
        actLabel="ACT 01 // ANTICIPATION"
        shotTelemetry="RETICLE: CALIBRATED // 40Hz SUB RESONANCE"
      />
    </div>
  );
};

