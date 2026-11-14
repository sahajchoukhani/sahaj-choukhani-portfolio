import React from 'react';
import { useCurrentFrame, interpolate, spring, staticFile, Img, useVideoConfig } from 'remotion';
import { ReticleOverlay } from '../components/ReticleOverlay';

export const Act06TheReveal: React.FC = () => {
  const frame = useCurrentFrame(); // 0 to 120 (19.5s – 23.5s)
  const { fps } = useVideoConfig();

  // Reveal impact spring
  const impactSpring = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 60, mass: 1.2 },
  });

  // Portrait push-in & emergence
  const portraitScale = interpolate(frame, [0, 120], [1.08, 1.0], { extrapolateRight: 'clamp' });
  const portraitOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // Light sweep across portrait (0 to 45)
  const lightSweepX = interpolate(frame, [0, 45], [-100, 200]);

  // Flash on initial reveal impact
  const flash = interpolate(frame, [0, 8], [0.95, 0], { extrapolateRight: 'clamp' });

  // Final Title emergence (starts at frame 40)
  const titleOpacity = interpolate(frame, [40, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleY = interpolate(frame, [40, 65], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subtitleOpacity = interpolate(frame, [55, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#05070a',
        overflow: 'hidden',
      }}
    >
      {/* Background Volumetric Atmosphere */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1200px',
          height: '800px',
          background: 'radial-gradient(ellipse at center, rgba(16, 32, 54, 0.45) 0%, rgba(8, 16, 26, 0.2) 50%, transparent 80%)',
          filter: 'blur(60px)',
        }}
      />

      {/* ------------------------------------------------------------- */}
      {/* SHOT 6.1: AUTHENTIC REAL PORTRAIT OF SAHAJ                    */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: portraitOpacity,
          transform: `scale(${portraitScale})`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: 'relative',
            maxHeight: '92vh',
            maxWidth: '55vw',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.95), 0 0 50px rgba(0, 240, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          <Img
            src={staticFile('photos/intro/Portrait.png')}
            style={{
              maxHeight: '88vh',
              maxWidth: '100%',
              display: 'block',
              objectFit: 'contain',
            }}
          />

          {/* Specular Light Sweep Ray */}
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              bottom: '-50%',
              width: '120px',
              left: `${lightSweepX}%`,
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.35) 50%, transparent 100%)',
              transform: 'rotate(25deg)',
              pointerEvents: 'none',
              filter: 'blur(10px)',
            }}
          />

          {/* Subtle bottom vignette fade */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '35%',
              background: 'linear-gradient(to top, rgba(5, 7, 10, 0.95) 0%, transparent 100%)',
            }}
          />
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SHOT 6.2: MONOLITHIC EDITORIAL CLIMAX TYPOGRAPHY              */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 25,
          pointerEvents: 'none',
        }}
      >
        {/* Main Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          <h1
            style={{
              fontFamily: "'Space Grotesk', 'Inter', sans-serif",
              fontSize: '52px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: '#ffffff',
              margin: '0 0 10px 0',
              textShadow: '0 0 40px rgba(0, 240, 255, 0.4), 0 4px 20px rgba(0, 0, 0, 0.9)',
              textTransform: 'uppercase',
            }}
          >
            THE SHAPE OF THE UNSAID.
          </h1>

          {/* Subtitle */}
          <div
            style={{
              opacity: subtitleOpacity,
              fontFamily: "'Inter', sans-serif",
              fontSize: '20px',
              fontStyle: 'italic',
              color: 'rgba(255, 255, 255, 0.85)',
              letterSpacing: '0.04em',
              marginBottom: '16px',
            }}
          >
            I give form to what I cannot explain.
          </div>

          {/* Identity & Navigation cue */}
          <div
            style={{
              opacity: subtitleOpacity,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'rgba(8, 12, 18, 0.8)',
              border: '1px solid rgba(0, 240, 255, 0.35)',
              padding: '8px 20px',
              borderRadius: '999px',
              boxShadow: '0 0 25px rgba(0, 240, 255, 0.2)',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#00f0ff',
                boxShadow: '0 0 10px #00f0ff',
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                fontWeight: 600,
                color: '#ffffff',
                letterSpacing: '0.2em',
              }}
            >
              SAHAJ // FOUNDER • TECHNOLOGIST • MUSICIAN
            </span>
          </div>
        </div>
      </div>

      {/* Optical Transition Flash */}
      {flash > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#ffffff',
            opacity: flash,
            pointerEvents: 'none',
            zIndex: 35,
          }}
        />
      )}

      {/* Reticle Overlay */}
      <ReticleOverlay
        actLabel="ACT 06 // THE REVEAL"
        shotTelemetry="TRANSMISSION COMPLETE // SYSTEM PRIMED"
      />
    </div>
  );
};

