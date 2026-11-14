import React from 'react';
import { useCurrentFrame, interpolate, staticFile, Video } from 'remotion';
import { ReticleOverlay } from '../components/ReticleOverlay';

export const Act02FirstSpark: React.FC = () => {
  const frame = useCurrentFrame(); // frame relative to Act 2 start (0 to 120)

  // Sub-shot determination
  // Shot 1: 0 - 40 (Key)
  // Shot 2: 40 - 80 (Piano)
  // Shot 3: 80 - 120 (Bronze Wire)

  const isShot1 = frame >= 0 && frame < 40;
  const isShot2 = frame >= 40 && frame < 80;
  const isShot3 = frame >= 80;

  // Camera zooms per shot
  const scaleShot1 = interpolate(frame, [0, 40], [1.02, 1.12], { extrapolateRight: 'clamp' });
  const scaleShot2 = interpolate(frame, [40, 80], [1.04, 1.15], { extrapolateRight: 'clamp' });
  const scaleShot3 = interpolate(frame, [80, 120], [1.02, 1.16], { extrapolateRight: 'clamp' });

  // Flashes on cut
  const flash1 = interpolate(frame, [0, 6], [0.85, 0], { extrapolateRight: 'clamp' });
  const flash2 = interpolate(frame, [40, 46], [0.85, 0], { extrapolateRight: 'clamp' });
  const flash3 = interpolate(frame, [80, 86], [0.85, 0], { extrapolateRight: 'clamp' });

  const activeFlash = Math.max(flash1, flash2, flash3);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#05070a',
        overflow: 'hidden',
      }}
    >
      {/* ------------------------------------------------------------- */}
      {/* SHOT 2.1: MECHANICAL KEY (Frames 0 - 40)                       */}
      {/* ------------------------------------------------------------- */}
      {isShot1 && (
        <div style={{ position: 'absolute', inset: 0, transform: `scale(${scaleShot1})` }}>
          <Video
            src={staticFile('videos/flow/01_mechanical_key.mp4')}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            muted
          />
          {/* Subtle cinematic vignette */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, transparent 40%, rgba(5, 7, 10, 0.75) 100%)',
            }}
          />
          {/* Shot Title Card */}
          <div
            style={{
              position: 'absolute',
              bottom: 110,
              left: 70,
              zIndex: 25,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: '#00f0ff',
                letterSpacing: '0.25em',
                marginBottom: '6px',
              }}
            >
              SHOT 2.1 // THE MECHANICAL KEY
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '36px',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '0.04em',
              }}
            >
              CODE AS PHYSICAL INPUT
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SHOT 2.2: PIANO HAMMER MECHANISM (Frames 40 - 80)              */}
      {/* ------------------------------------------------------------- */}
      {isShot2 && (
        <div style={{ position: 'absolute', inset: 0, transform: `scale(${scaleShot2})` }}>
          <Video
            src={staticFile('videos/flow/02_piano.mp4')}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            muted
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, transparent 35%, rgba(5, 7, 10, 0.75) 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 110,
              left: 70,
              zIndex: 25,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: '#e6af2e',
                letterSpacing: '0.25em',
                marginBottom: '6px',
              }}
            >
              SHOT 2.2 // THE HAMMER ACTION
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '36px',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '0.04em',
              }}
            >
              ACOUSTIC DISCIPLINE
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SHOT 2.3: VIBRATING BRONZE WIRE (Frames 80 - 120)              */}
      {/* ------------------------------------------------------------- */}
      {isShot3 && (
        <div style={{ position: 'absolute', inset: 0, transform: `scale(${scaleShot3})` }}>
          <Video
            src={staticFile('videos/flow/03_bronze.mp4')}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            muted
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, transparent 35%, rgba(5, 7, 10, 0.75) 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 110,
              left: 70,
              zIndex: 25,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: '#ff6b4a',
                letterSpacing: '0.25em',
                marginBottom: '6px',
              }}
            >
              SHOT 2.3 // THE RESONANCE
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '36px',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '0.04em',
              }}
            >
              INHARMONIC STRING DECAY
            </div>
          </div>
        </div>
      )}

      {/* Optical Transition Flash */}
      {activeFlash > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#ffffff',
            opacity: activeFlash,
            pointerEvents: 'none',
            zIndex: 32,
          }}
        />
      )}

      {/* Editorial Reticle & Metadata HUD */}
      <ReticleOverlay
        actLabel="ACT 02 // THE FIRST SPARK"
        shotTelemetry={
          isShot1
            ? 'MACRO 720P // TACTILE SWITCH CONTACT'
            : isShot2
            ? 'ACOUSTIC // FELT HAMMER ATTACK • 55Hz'
            : 'RESONANCE // BRONZE WIRE OSCILLATION'
        }
      />
    </div>
  );
};

