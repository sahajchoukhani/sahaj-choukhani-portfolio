import React from 'react';
import { useCurrentFrame, interpolate, staticFile, Img } from 'remotion';
import { ReticleOverlay } from '../components/ReticleOverlay';

interface ProofShot {
  id: string;
  imgUrl: string;
  isVertical: boolean;
  competition: string;
  accolade: string;
  spec: string;
  accentColor: string;
}

const PROOF_SHOTS: ProofShot[] = [
  {
    id: 'shot-ieee',
    imgUrl: 'photos/intro/IEEE.png',
    isVertical: true,
    competition: 'IEEE HACK SYNAPSE',
    accolade: '🏆 1ST PLACE PODIUM // 36-HOUR NATIONAL ARENA',
    spec: 'RES: 690×1306 • UNCROPPED FULL-FRAME',
    accentColor: '#00f0ff',
  },
  {
    id: 'shot-hacktober',
    imgUrl: 'photos/intro/Hacktober.png',
    isVertical: false,
    competition: 'HACKTOBER NATIONAL HACKATHON',
    accolade: '🥇 1ST PLACE WINNER // NATIONAL RECOGNITION',
    spec: 'RES: 2236×1414 • COHORT CERTIFICATION',
    accentColor: '#ff2828',
  },
  {
    id: 'shot-scratchathon',
    imgUrl: 'photos/intro/Scratchathon.png',
    isVertical: false,
    competition: 'SCRATCHATHON • MLH HACKATHON',
    accolade: '🥈 2ND PLACE PODIUM // HARDWARE & RAPID DEV',
    spec: 'RES: 1638×1104 • MLH CERTIFIED',
    accentColor: '#e6af2e',
  },
  {
    id: 'shot-iim',
    imgUrl: 'photos/intro/iimnmimicry.png',
    isVertical: false,
    competition: 'IIM COMMERCIAL DEFENSE',
    accolade: '🥉 3RD PLACE PODIUM // BUSINESS STRATEGY & VOCAL PITCH',
    spec: 'RES: 1126×1160 • ARENA DEFENSE',
    accentColor: '#a855f7',
  },
  {
    id: 'shot-jindal',
    imgUrl: 'photos/intro/OpJindal.png',
    isVertical: true,
    competition: 'OP JINDAL GLOBAL ROUND',
    accolade: '🎖️ NATIONAL FINALIST // POLICY & STRATEGY',
    spec: 'RES: 694×1068 • UNCROPPED FULL-FRAME',
    accentColor: '#10b981',
  },
];

export const Act03TheProof: React.FC = () => {
  const frame = useCurrentFrame(); // 0 to 135
  const shotIndex = Math.min(Math.floor(frame / 27), PROOF_SHOTS.length - 1);
  const shot = PROOF_SHOTS[shotIndex];

  const shotLocalFrame = frame % 27;

  // Zoom drift per shot
  const scale = interpolate(shotLocalFrame, [0, 27], [1.0, 1.07], { extrapolateRight: 'clamp' });

  // Camera shutter flash on entry
  const flash = interpolate(shotLocalFrame, [0, 5], [0.9, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#06080e',
        overflow: 'hidden',
      }}
    >
      {/* Background Aura (Blurred duplicate for vertical or widescreen balance) */}
      <div
        style={{
          position: 'absolute',
          inset: -40,
          filter: 'blur(35px) brightness(0.35)',
          transform: `scale(${scale * 1.05})`,
        }}
      >
        <Img
          src={staticFile(shot.imgUrl)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Main Photographic Plate (Uncropped full frame integrity) */}
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
            maxHeight: '88vh',
            maxWidth: shot.isVertical ? '50vw' : '82vw',
            boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 35px ${shot.accentColor}33`,
            border: `1px solid ${shot.accentColor}66`,
            borderRadius: '4px',
            overflow: 'hidden',
            backgroundColor: '#05070a',
          }}
        >
          <Img
            src={staticFile(shot.imgUrl)}
            style={{
              maxHeight: '84vh',
              maxWidth: '100%',
              display: 'block',
              objectFit: 'contain',
            }}
          />

          {/* Holographic Border Scan */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              backgroundColor: shot.accentColor,
              boxShadow: `0 0 12px ${shot.accentColor}`,
            }}
          />
        </div>
      </div>

      {/* Editorial Accolade Typography Banner */}
      <div
        style={{
          position: 'absolute',
          bottom: 90,
          left: 70,
          right: 70,
          zIndex: 25,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          pointerEvents: 'none',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: shot.accentColor,
              letterSpacing: '0.25em',
              marginBottom: '6px',
            }}
          >
            ACT 03 // THE PROOF • SHOT 3.{shotIndex + 1}
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
            {shot.competition}
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              color: 'rgba(255, 255, 255, 0.85)',
              marginTop: '4px',
            }}
          >
            {shot.accolade}
          </div>
        </div>

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: 'rgba(255, 255, 255, 0.45)',
            textAlign: 'right',
          }}
        >
          <div>{shot.spec}</div>
          <div style={{ color: shot.accentColor }}>INDEX: 0{shotIndex + 1} / 05</div>
        </div>
      </div>

      {/* Camera Shutter Flash */}
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

      {/* Reticle HUD */}
      <ReticleOverlay
        actLabel="ACT 03 // THE PROOF"
        shotTelemetry={shot.spec}
      />
    </div>
  );
};

