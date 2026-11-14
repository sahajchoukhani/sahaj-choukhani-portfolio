import React from 'react';
import { useCurrentFrame, interpolate, staticFile, Img } from 'remotion';

interface MontageShotConfig {
  id: string;
  imgUrl: string;
  secondaryImgUrl?: string;
  isVertical: boolean;
  category: string;
  title: string;
  accolade: string;
  accentColor: string;
  rotY: number;
  rotX: number;
}

const SHOTS: MontageShotConfig[] = [
  // Shot 1: IEEE Synapse (0 - 18)
  {
    id: 'shot-ieee',
    imgUrl: 'photos/intro/IEEE.png',
    secondaryImgUrl: 'photos/intro/IEEE2.png',
    isVertical: true,
    category: 'NATIONAL HACKATHON // ARENA 01',
    title: 'IEEE SYNAPSE',
    accolade: '🏆 1ST PLACE PODIUM // 36-HR ARENA',
    accentColor: '#00f0ff',
    rotY: -12,
    rotX: 6,
  },
  // Shot 2: Hacktober (18 - 36)
  {
    id: 'shot-hacktober',
    imgUrl: 'photos/intro/Hacktober.png',
    isVertical: false,
    category: 'NATIONAL HACKATHON // ARENA 02',
    title: 'HACKTOBER NATIONAL',
    accolade: '🥇 1ST PLACE WINNER // MLH RECOGNITION',
    accentColor: '#ff2828',
    rotY: 10,
    rotX: -4,
  },
  // Shot 3: Scratchathon (36 - 54)
  {
    id: 'shot-scratchathon',
    imgUrl: 'photos/intro/Scratchathon.png',
    isVertical: false,
    category: 'HARDWARE & RAPID DEV // ARENA 03',
    title: 'SCRATCHATHON MLH',
    accolade: '🥈 2ND PLACE PODIUM // MLH TROPHY',
    accentColor: '#e6af2e',
    rotY: -8,
    rotX: 8,
  },
  // Shot 4: IIM Commercial Defense (54 - 72)
  {
    id: 'shot-iim',
    imgUrl: 'photos/intro/iimnmimicry.png',
    isVertical: false,
    category: 'BUSINESS STRATEGY // ARENA 04',
    title: 'IIM COMMERCIAL DEFENSE',
    accolade: '🥉 3RD PLACE PODIUM // VOCAL MIMICRY & PITCH',
    accentColor: '#a855f7',
    rotY: 14,
    rotX: -6,
  },
  // Shot 5: OP Jindal (72 - 90)
  {
    id: 'shot-jindal',
    imgUrl: 'photos/intro/OpJindal.png',
    isVertical: true,
    category: 'POLICY & STRATEGY // ARENA 05',
    title: 'OP JINDAL NATIONAL',
    accolade: '🎖️ NATIONAL FINALIST // POLICY ROUND',
    accentColor: '#10b981',
    rotY: -10,
    rotX: 5,
  },
  // Shot 6: Nyay Link Legal Architecture (90 - 108)
  {
    id: 'shot-nyay',
    imgUrl: 'photos/intro/NyayLink.png',
    secondaryImgUrl: 'photos/previews/nyay_link_preview.png',
    isVertical: true,
    category: 'VENTURE STUDIO // CO-FOUNDER',
    title: 'NYAY LINK LEGAL ARCHITECTURE',
    accolade: 'ADVOCATE CHAMBERS // AI AUTOMATION',
    accentColor: '#00f0ff',
    rotY: 12,
    rotX: 4,
  },
  // Shot 7: Fasal Niti (108 - 126)
  {
    id: 'shot-fasal',
    imgUrl: 'photos/intro/Fasal.png',
    secondaryImgUrl: 'photos/previews/fasal_niti_preview.png',
    isVertical: true,
    category: 'SOLO ENGINEERING // PRODUCTION',
    title: 'FASAL NITI AGRITECH',
    accolade: '100% SOLO BUILT & DEPLOYED PLATFORM',
    accentColor: '#10b981',
    rotY: -12,
    rotX: -5,
  },
  // Shot 8: Dual Gold Medals Piano & Vocals (126 - 144)
  {
    id: 'shot-piano',
    imgUrl: 'photos/intro/Singnpiano.png',
    isVertical: false,
    category: 'CLASSICAL DISCIPLINE // GOLD HONORS',
    title: 'ACOUSTIC PIANO & VOCALS',
    accolade: '🥇 DUAL GOLD MEDALIST // CLASSICAL PERFORMANCE',
    accentColor: '#e6af2e',
    rotY: 8,
    rotX: 6,
  },
  // Shot 9: Theatrical Monologue (144 - 162)
  {
    id: 'shot-theatre',
    imgUrl: 'photos/intro/Theatre1.png',
    isVertical: false,
    category: 'THE STAGE // DRAMATIC MONOLOGUE',
    title: 'THEATRICAL PRESENCE',
    accolade: '🥉 3RD PLACE PODIUM // STARK STAGE STILL',
    accentColor: '#f43f5e',
    rotY: -14,
    rotX: -6,
  },
  // Shot 10: Smart India Hackathon (162 - 180)
  {
    id: 'shot-sih',
    imgUrl: 'photos/intro/SIH.png',
    isVertical: false,
    category: 'NATIONAL FINALS // MINISTRY OF EDUCATION',
    title: 'SMART INDIA HACKATHON',
    accolade: '🇮🇳 NATIONAL ARENA // UNIVERSITY ROUND CLEARED',
    accentColor: '#f97316',
    rotY: 10,
    rotX: -4,
  },
];

export const Scene02VelocityMontage: React.FC = () => {
  const frame = useCurrentFrame(); // 0 to 180
  const shotDuration = 18;
  const shotIndex = Math.min(Math.floor(frame / shotDuration), SHOTS.length - 1);
  const shot = SHOTS[shotIndex];

  const localFrame = frame % shotDuration;

  // Dynamic 3D Camera flight per shot
  const scale = interpolate(localFrame, [0, shotDuration], [0.95, 1.12], { extrapolateRight: 'clamp' });
  const rotY = interpolate(localFrame, [0, shotDuration], [shot.rotY * 1.5, shot.rotY * 0.4]);
  const rotX = interpolate(localFrame, [0, shotDuration], [shot.rotX * 1.5, shot.rotX * 0.4]);

  // Whip-cut flash on every shot entry (0 - 4 frames)
  const flash = interpolate(localFrame, [0, 4], [0.9, 0], { extrapolateRight: 'clamp' });

  // Light streak sweep across the frame
  const streakX = interpolate(localFrame, [0, shotDuration], [-20, 120]);

  // Motion blur / directional warp on transition frames (15 - 18)
  const isTransitioning = localFrame >= 15;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#040609',
        overflow: 'hidden',
        perspective: '1200px',
      }}
    >
      {/* Background Volumetric Aura */}
      <div
        style={{
          position: 'absolute',
          inset: -40,
          filter: 'blur(45px) brightness(0.28)',
          transform: `scale(${scale * 1.1})`,
        }}
      >
        <Img
          src={staticFile(shot.imgUrl)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Layered Massive Editorial Typography BEHIND the 3D Plate */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      >
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '140px',
            fontWeight: 900,
            color: 'rgba(255, 255, 255, 0.05)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textAlign: 'center',
            lineHeight: 0.9,
            whiteSpace: 'nowrap',
            transform: `scale(${scale * 0.95})`,
          }}
        >
          {shot.title.split(' ')[0]}
        </div>
      </div>

      {/* 3D FLOATING PHOTOGRAPHIC PLATE */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${scale}) rotateY(${rotY}deg) rotateX(${rotX}deg)`,
          transformStyle: 'preserve-3d',
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: 'relative',
            maxHeight: '84vh',
            maxWidth: shot.isVertical ? '46vw' : '78vw',
            borderRadius: '6px',
            overflow: 'hidden',
            border: `1px solid ${shot.accentColor}88`,
            boxShadow: `0 30px 60px rgba(0, 0, 0, 0.95), 0 0 40px ${shot.accentColor}44`,
            backgroundColor: '#05070a',
          }}
        >
          <Img
            src={staticFile(shot.imgUrl)}
            style={{
              maxHeight: '80vh',
              maxWidth: '100%',
              display: 'block',
              objectFit: 'contain',
            }}
          />

          {/* Secondary Blueprint Inset Plate if available (Ventures) */}
          {shot.secondaryImgUrl && (
            <div
              style={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                width: '40%',
                aspectRatio: '16/9',
                borderRadius: '4px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.9)',
              }}
            >
              <Img
                src={staticFile(shot.secondaryImgUrl)}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          )}

          {/* High-Tech Edge Bevel Scan */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              backgroundColor: shot.accentColor,
              boxShadow: `0 0 15px ${shot.accentColor}`,
            }}
          />
        </div>
      </div>

      {/* FOREGROUND EDITORIAL METALLIC OVERLAY */}
      <div
        style={{
          position: 'absolute',
          bottom: 90,
          left: 90,
          right: 90,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          zIndex: 25,
          pointerEvents: 'none',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: shot.accentColor,
              letterSpacing: '0.3em',
              marginBottom: '6px',
            }}
          >
            {shot.category}
          </div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '42px',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '0.04em',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.9)',
            }}
          >
            {shot.title}
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              color: 'rgba(255, 255, 255, 0.9)',
              marginTop: '4px',
            }}
          >
            {shot.accolade}
          </div>
        </div>

        {/* Index Telemetry Stamp */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.5)',
            textAlign: 'right',
          }}
        >
          <div style={{ color: shot.accentColor, fontWeight: 700 }}>
            CUE // {String(shotIndex + 1).padStart(2, '0')} / 10
          </div>
          <div>1920×1080 • DCI MASTER</div>
        </div>
      </div>

      {/* Diagonal Anamorphic Light Streak */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          bottom: '-50%',
          width: '80px',
          left: `${streakX}%`,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.25) 50%, transparent 100%)',
          transform: 'rotate(35deg)',
          pointerEvents: 'none',
          filter: 'blur(8px)',
          zIndex: 30,
        }}
      />

      {/* Impact Cut Flash */}
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
    </div>
  );
};

