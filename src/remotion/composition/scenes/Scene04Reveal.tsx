import React from 'react';
import { useCurrentFrame, interpolate, spring, staticFile, Img, useVideoConfig } from 'remotion';

export const Scene04Reveal: React.FC = () => {
  const frame = useCurrentFrame(); // 0 to 81 (8.80s – 11.50s)
  const { fps } = useVideoConfig();

  // Impact Flash on Frame 0
  const flash = interpolate(frame, [0, 8], [1.0, 0], { extrapolateRight: 'clamp' });

  // Camera Slow Push-in
  const scale = interpolate(frame, [0, 81], [1.06, 1.0], { extrapolateRight: 'clamp' });

  // Volumetric Specular Light Sweep across portrait (frames 0 to 35)
  const sweepX = interpolate(frame, [0, 40], [-100, 200]);

  // Spring entrance for title
  const titleSpring = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 16, stiffness: 80, mass: 1 },
  });

  const titleOpacity = interpolate(frame, [8, 22], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);

  // Subtitle fade in
  const subtitleOpacity = interpolate(frame, [20, 36], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#040508',
        overflow: 'hidden',
      }}
    >
      {/* Background Deep Metallic Radial Atmosphere */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1400px',
          height: '900px',
          background: 'radial-gradient(ellipse at center, rgba(14, 30, 48, 0.55) 0%, rgba(6, 12, 20, 0.3) 50%, transparent 80%)',
          filter: 'blur(70px)',
        }}
      />

      {/* ------------------------------------------------------------- */}
      {/* AUTHENTIC STUDIO PORTRAIT OF SAHAJ                            */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${scale})`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: 'relative',
            maxHeight: '90vh',
            maxWidth: '56vw',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 30px 70px rgba(0, 0, 0, 0.98), 0 0 60px rgba(0, 240, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            backgroundColor: '#05070a',
          }}
        >
          <Img
            src={staticFile('photos/intro/Portrait.png')}
            style={{
              maxHeight: '86vh',
              maxWidth: '100%',
              display: 'block',
              objectFit: 'contain',
            }}
          />

          {/* Diagonal Specular Anamorphic Ray */}
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              bottom: '-50%',
              width: '140px',
              left: `${sweepX}%`,
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
              transform: 'rotate(25deg)',
              filter: 'blur(12px)',
              pointerEvents: 'none',
            }}
          />

          {/* Bottom Gradient Fade for Typography Legibility */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '45%',
              background: 'linear-gradient(to top, rgba(4, 5, 8, 0.98) 0%, rgba(4, 5, 8, 0.6) 50%, transparent 100%)',
            }}
          />
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MONUMENTAL EDITORIAL CLIMAX TYPOGRAPHY                         */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: 'absolute',
          bottom: 75,
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 25,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          {/* Main Name Reveal */}
          <h1
            style={{
              fontFamily: "'Space Grotesk', 'Inter', sans-serif",
              fontSize: '58px',
              fontWeight: 900,
              letterSpacing: '0.08em',
              color: '#ffffff',
              margin: '0 0 8px 0',
              textTransform: 'uppercase',
              textShadow: '0 0 50px rgba(0, 240, 255, 0.5), 0 4px 30px rgba(0, 0, 0, 0.95)',
            }}
          >
            SAHAJ CHOUKHANI
          </h1>

          {/* Subtitle Roles */}
          <div
            style={{
              opacity: subtitleOpacity,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.35em',
              color: 'rgba(0, 240, 255, 0.9)',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            FOUNDER • TECHNOLOGIST • MUSICIAN
          </div>

          {/* Tagline */}
          <div
            style={{
              opacity: subtitleOpacity,
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              fontStyle: 'italic',
              letterSpacing: '0.03em',
              color: 'rgba(255, 255, 255, 0.85)',
              marginBottom: '16px',
            }}
          >
            "The Shape of the Unsaid — I give form to what I cannot explain."
          </div>

          {/* System Online Badge */}
          <div
            style={{
              opacity: subtitleOpacity,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'rgba(8, 14, 22, 0.85)',
              border: '1px solid rgba(0, 240, 255, 0.4)',
              padding: '6px 18px',
              borderRadius: '999px',
              boxShadow: '0 0 25px rgba(0, 240, 255, 0.25)',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#00f0ff',
                boxShadow: '0 0 10px #00f0ff',
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                fontWeight: 600,
                color: '#ffffff',
                letterSpacing: '0.2em',
              }}
            >
              PORTFOLIO INITIALIZED // ENTER
            </span>
          </div>
        </div>
      </div>

      {/* Explosive Reveal Flash */}
      {flash > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#ffffff',
            opacity: flash,
            pointerEvents: 'none',
            zIndex: 40,
          }}
        />
      )}
    </div>
  );
};
