import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export const Scene03Silence: React.FC = () => {
  const frame = useCurrentFrame(); // 0 to 30 (1.0 second pause)

  // Subtle breathing pulse of center reticle
  const reticleOpacity = interpolate(frame, [0, 8, 22, 30], [0.3, 0.75, 0.6, 0.25], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: 50,
      }}
    >
      {/* Precision Center Hairline Reticle */}
      <div
        style={{
          position: 'relative',
          width: '28px',
          height: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: reticleOpacity,
          marginBottom: '20px',
        }}
      >
        <div style={{ position: 'absolute', width: '20px', height: '1px', backgroundColor: '#ffffff' }} />
        <div style={{ position: 'absolute', height: '20px', width: '1px', backgroundColor: '#ffffff' }} />
      </div>

      {/* Deliberate Silence Cue */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          letterSpacing: '0.55em',
          color: 'rgba(255, 255, 255, 0.5)',
          textTransform: 'uppercase',
          opacity: reticleOpacity,
          textAlign: 'center',
        }}
      >
        [ SILENCE ]
      </div>
    </div>
  );
};
