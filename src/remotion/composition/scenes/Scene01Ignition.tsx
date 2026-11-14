import React from 'react';
import { useCurrentFrame, interpolate, spring, staticFile, Video, useVideoConfig } from 'remotion';

export const Scene01Ignition: React.FC = () => {
  const frame = useCurrentFrame(); // 0 to 54
  const { fps } = useVideoConfig();

  // Phase 1: 0 - 18 (Blinding Slit & Reticle Ignition)
  // Phase 2: 18 - 36 (Macro Switch Cut)
  // Phase 3: 36 - 54 (Bronze Resonance & Warp Out)

  const isPhase1 = frame < 18;
  const isPhase2 = frame >= 18 && frame < 36;
  const isPhase3 = frame >= 36;

  // Blinding slit opening (0 to 12)
  const slitWidth = interpolate(frame, [0, 14], [0, 100], { extrapolateRight: 'clamp' });
  const slitGlow = interpolate(frame, [0, 8, 18], [0, 1, 0.4], { extrapolateRight: 'clamp' });

  // Camera zooms per phase
  const zoomPhase2 = interpolate(frame, [18, 36], [1.02, 1.15], { extrapolateRight: 'clamp' });
  const zoomPhase3 = interpolate(frame, [36, 54], [1.0, 1.22], { extrapolateRight: 'clamp' });

  // Flashes on cuts
  const flash2 = interpolate(frame, [18, 22], [0.95, 0], { extrapolateRight: 'clamp' });
  const flash3 = interpolate(frame, [36, 40], [0.95, 0], { extrapolateRight: 'clamp' });
  const activeFlash = Math.max(flash2, flash3);

  // Warp blur on exit (frame 48 - 54)
  const exitWarp = interpolate(frame, [48, 54], [0, 20], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#030508',
        overflow: 'hidden',
        filter: exitWarp > 0 ? `blur(${exitWarp}px)` : 'none',
      }}
    >
      {/* ------------------------------------------------------------- */}
      {/* PHASE 1: BLINDING HORIZONTAL SLIT & RETICLE LOCK (0 - 18)      */}
      {/* ------------------------------------------------------------- */}
      {isPhase1 && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Obsidian Metallic Background Grid */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
              opacity: 0.5,
            }}
          />

          {/* Center Light Slit */}
          <div
            style={{
              position: 'absolute',
              width: `${slitWidth}%`,
              height: '3px',
              background: 'linear-gradient(90deg, transparent 0%, #00f0ff 25%, #ffffff 50%, #00f0ff 75%, transparent 100%)',
              boxShadow: `0 0 40px #00f0ff, 0 0 80px rgba(0, 240, 255, ${slitGlow})`,
            }}
          />

          {/* Central Telemetry Lock */}
          <div
            style={{
              position: 'absolute',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.75)',
              letterSpacing: '0.3em',
              textAlign: 'center',
              bottom: 120,
            }}
          >
            <div>[ SYSTEM IGNITION // OPTIC ARMED ]</div>
            <div style={{ color: '#00f0ff', marginTop: '6px', fontSize: '10px' }}>
              CALIBRATING HIGH-SPEED METALLIC MATRIX
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* PHASE 2: MACRO SWITCH SMASH (18 - 36)                          */}
      {/* ------------------------------------------------------------- */}
      {isPhase2 && (
        <div style={{ position: 'absolute', inset: 0, transform: `scale(${zoomPhase2})` }}>
          <Video
            src={staticFile('videos/flow/01_mechanical_key.mp4')}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            muted
          />

          {/* Anamorphic Blue Streak Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(3, 5, 8, 0.8) 100%)',
            }}
          />

          {/* Chrome Editorial Typography Stamp */}
          <div
            style={{
              position: 'absolute',
              top: 100,
              left: 90,
              zIndex: 20,
            }}
          >
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '44px',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '0.08em',
                textShadow: '0 0 30px rgba(0, 240, 255, 0.6)',
              }}
            >
              PHYSICAL INPUT
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: '#00f0ff',
                letterSpacing: '0.25em',
                marginTop: '4px',
              }}
            >
              ACTUATION // 01.KEY
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* PHASE 3: BRONZE STRING RESONANCE (36 - 54)                     */}
      {/* ------------------------------------------------------------- */}
      {isPhase3 && (
        <div style={{ position: 'absolute', inset: 0, transform: `scale(${zoomPhase3})` }}>
          <Video
            src={staticFile('videos/flow/03_bronze.mp4')}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            muted
          />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(3, 5, 8, 0.8) 100%)',
            }}
          />

          {/* Bronze Editorial Typography Stamp */}
          <div
            style={{
              position: 'absolute',
              bottom: 110,
              right: 90,
              textAlign: 'right',
              zIndex: 20,
            }}
          >
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '44px',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '0.08em',
                textShadow: '0 0 30px rgba(230, 175, 46, 0.6)',
              }}
            >
              ACOUSTIC RESONANCE
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: '#e6af2e',
                letterSpacing: '0.25em',
                marginTop: '4px',
              }}
            >
              INHARMONIC FREQUENCY // VELOCITY ENGAGED
            </div>
          </div>
        </div>
      )}

      {/* Cut Flash */}
      {activeFlash > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#ffffff',
            opacity: activeFlash,
            pointerEvents: 'none',
            zIndex: 40,
          }}
        />
      )}
    </div>
  );
};

