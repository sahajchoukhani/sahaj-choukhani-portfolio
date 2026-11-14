import React from 'react';
import { useCurrentFrame, interpolate, staticFile, Img } from 'remotion';
import { ReticleOverlay } from '../components/ReticleOverlay';

export const Act04TheBuilder: React.FC = () => {
  const frame = useCurrentFrame(); // 0 to 120
  const isNyay = frame < 60;

  const localFrame = frame % 60;
  const slide = interpolate(localFrame, [0, 60], [1.0, 1.05], { extrapolateRight: 'clamp' });
  const flash = interpolate(localFrame, [0, 6], [0.8, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#05080e',
        overflow: 'hidden',
      }}
    >
      {/* Background Studio Light Wash */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          right: isNyay ? '10%' : '60%',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: isNyay
            ? 'radial-gradient(circle, rgba(0, 240, 255, 0.12) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
          transition: 'all 0.5s ease',
        }}
      />

      {/* ------------------------------------------------------------- */}
      {/* 2-PART COMPOSITION: REAL PHOTO (LEFT) + LIVE PLATFORM (RIGHT)   */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: 'absolute',
          inset: '100px 90px 140px 90px',
          display: 'grid',
          gridTemplateColumns: '40% 60%',
          gap: '40px',
          alignItems: 'center',
          transform: `scale(${slide})`,
          zIndex: 10,
        }}
      >
        {/* Left Side: Authentic Real-Life Field Photograph */}
        <div
          style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#030508',
            borderRadius: '6px',
            border: `1px solid ${isNyay ? 'rgba(0, 240, 255, 0.4)' : 'rgba(16, 185, 129, 0.4)'}`,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
            overflow: 'hidden',
          }}
        >
          {/* Blurred backdrop fill */}
          <div
            style={{
              position: 'absolute',
              inset: -20,
              filter: 'blur(25px) brightness(0.4)',
            }}
          >
            <Img
              src={staticFile(isNyay ? 'photos/intro/NyayLink.png' : 'photos/intro/Fasal.png')}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <Img
            src={staticFile(isNyay ? 'photos/intro/NyayLink.png' : 'photos/intro/Fasal.png')}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
              position: 'relative',
              zIndex: 2,
            }}
          />

          {/* Photo Tag Badge */}
          <div
            style={{
              position: 'absolute',
              top: 14,
              left: 14,
              zIndex: 5,
              backgroundColor: 'rgba(5, 7, 10, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '4px 10px',
              borderRadius: '3px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              color: isNyay ? '#00f0ff' : '#10b981',
              letterSpacing: '0.15em',
            }}
          >
            {isNyay ? 'AUTHENTIC FIELD PHOTOGRAPHY' : 'LIVE DEPLOYMENT MOMENT'}
          </div>
        </div>

        {/* Right Side: High-Resolution Platform Blueprint Plate */}
        <div
          style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          {/* Interface Preview Frame */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: '6px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.9)',
              backgroundColor: '#0c1017',
            }}
          >
            <Img
              src={staticFile(isNyay ? 'photos/previews/nyay_link_preview.png' : 'photos/previews/fasal_niti_preview.png')}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* Glowing Scan Ray */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: '3px',
                left: `${(localFrame / 60) * 100}%`,
                backgroundColor: isNyay ? '#00f0ff' : '#10b981',
                boxShadow: `0 0 15px ${isNyay ? '#00f0ff' : '#10b981'}`,
              }}
            />
          </div>

          {/* Venture Context Readout */}
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                color: isNyay ? '#00f0ff' : '#10b981',
                letterSpacing: '0.2em',
                marginBottom: '4px',
              }}
            >
              {isNyay ? 'VENTURE STUDIO // 01' : 'SOLO ENGINEERING // 02'}
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '34px',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '0.04em',
              }}
            >
              {isNyay ? 'NYAY LINK LEGAL ARCHITECTURE' : 'FASAL NITI AGRITECH PLATFORM'}
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                color: 'rgba(255, 255, 255, 0.75)',
                marginTop: '4px',
              }}
            >
              {isNyay
                ? 'Co-founded with Supreme Court & High Court Advocates • AI Legal Research & Document Automation'
                : '100% Solo Built & Deployed • Real-time Agritech Intelligence • Production Web Application'}
            </div>
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
        actLabel="ACT 04 // THE BUILDER"
        shotTelemetry={
          isNyay
            ? 'VENTURE: NYAY LINK // CO-FOUNDER IN CHAMBERS'
            : 'SOLO DEV: FASAL NITI // PRODUCTION PLATFORM'
        }
      />
    </div>
  );
};

