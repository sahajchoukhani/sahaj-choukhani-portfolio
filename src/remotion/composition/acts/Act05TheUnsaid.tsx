import React from 'react';
import { useCurrentFrame, interpolate, staticFile, Img } from 'remotion';
import { ReticleOverlay } from '../components/ReticleOverlay';

export const Act05TheUnsaid: React.FC = () => {
  const frame = useCurrentFrame(); // 0 to 120 (15.5s – 19.5s)

  // Sub-shot determination
  // Shot 5.1: 0 - 30 (Theatre)
  // Shot 5.2: 30 - 55 (Sing & Piano Gold Medals)
  // Shot 5.3: 55 - 75 (Poetry & Voice Lab)
  // Shot 5.4: 75 - 120 (THE MOMENT OF SILENCE - 1.5s pure void)

  const isTheatre = frame >= 0 && frame < 30;
  const isMusic = frame >= 30 && frame < 55;
  const isPoetry = frame >= 55 && frame < 75;
  const isSilence = frame >= 75; // The dramatic pause before the climax!

  // Zoom drift
  const scale = interpolate(frame % 30, [0, 30], [1.0, 1.06], { extrapolateRight: 'clamp' });

  // Flashes on cuts
  const flashTheatre = interpolate(frame, [0, 5], [0.85, 0], { extrapolateRight: 'clamp' });
  const flashMusic = interpolate(frame, [30, 35], [0.85, 0], { extrapolateRight: 'clamp' });
  const flashPoetry = interpolate(frame, [55, 60], [0.85, 0], { extrapolateRight: 'clamp' });
  const flashSilence = interpolate(frame, [75, 78], [1.0, 0], { extrapolateRight: 'clamp' });

  const activeFlash = Math.max(flashTheatre, flashMusic, flashPoetry, flashSilence);

  // Silence pulse
  const silenceOpacity = interpolate(frame, [75, 88, 105, 120], [0, 0.9, 0.9, 0.3], {
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
      {/* ------------------------------------------------------------- */}
      {/* SHOT 5.1: THEATRE MONOLOGUE (Frames 0 - 30)                    */}
      {/* ------------------------------------------------------------- */}
      {isTheatre && (
        <div style={{ position: 'absolute', inset: 0 }}>
          {/* Blurred aura */}
          <div
            style={{
              position: 'absolute',
              inset: -30,
              filter: 'blur(35px) brightness(0.3)',
              transform: `scale(${scale * 1.05})`,
            }}
          >
            <Img
              src={staticFile('photos/intro/Theatre1.png')}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${scale})`,
            }}
          >
            <div
              style={{
                position: 'relative',
                maxHeight: '80vh',
                border: '1px solid rgba(244, 63, 94, 0.4)',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.9), 0 0 35px rgba(244, 63, 94, 0.25)',
              }}
            >
              <Img
                src={staticFile('photos/intro/Theatre1.png')}
                style={{ maxHeight: '76vh', display: 'block', objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* Typography */}
          <div style={{ position: 'absolute', bottom: 100, left: 70, zIndex: 25 }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: '#f43f5e',
                letterSpacing: '0.25em',
                marginBottom: '6px',
              }}
            >
              CRAFT // THE STAGE
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
              DRAMATIC MONOLOGUE & SILENCE
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                color: 'rgba(255, 255, 255, 0.8)',
                marginTop: '4px',
              }}
            >
              🥉 3rd Place Podium • Physical Tension Under Stark Stage Lighting
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SHOT 5.2: PIANO & VOCAL GOLD MEDALS (Frames 30 - 55)           */}
      {/* ------------------------------------------------------------- */}
      {isMusic && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <div
            style={{
              position: 'absolute',
              inset: -30,
              filter: 'blur(35px) brightness(0.3)',
              transform: `scale(${scale * 1.05})`,
            }}
          >
            <Img
              src={staticFile('photos/intro/Singnpiano.png')}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${scale})`,
            }}
          >
            <div
              style={{
                position: 'relative',
                maxHeight: '80vh',
                border: '1px solid rgba(230, 175, 46, 0.5)',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.9), 0 0 35px rgba(230, 175, 46, 0.25)',
              }}
            >
              <Img
                src={staticFile('photos/intro/Singnpiano.png')}
                style={{ maxHeight: '76vh', display: 'block', objectFit: 'contain' }}
              />
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: 100, left: 70, zIndex: 25 }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: '#e6af2e',
                letterSpacing: '0.25em',
                marginBottom: '6px',
              }}
            >
              CRAFT // CLASSICAL MUSICIANSHIP
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
              DUAL GOLD MEDALS IN PIANO & VOCALS
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                color: 'rgba(255, 255, 255, 0.8)',
                marginTop: '4px',
              }}
            >
              🥇 Gold Medalist — Classical Acoustic Piano • 🥇 Gold Medalist — Vocal Music
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SHOT 5.3: POETRY & THE VOICE LAB (Frames 55 - 75)              */}
      {/* ------------------------------------------------------------- */}
      {isPoetry && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <div
            style={{
              position: 'absolute',
              inset: -30,
              filter: 'blur(35px) brightness(0.3)',
              transform: `scale(${scale * 1.05})`,
            }}
          >
            <Img
              src={staticFile('photos/intro/Poet1.png')}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${scale})`,
            }}
          >
            <div
              style={{
                position: 'relative',
                maxHeight: '80vh',
                border: '1px solid rgba(168, 85, 247, 0.5)',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.9), 0 0 35px rgba(168, 85, 247, 0.25)',
              }}
            >
              <Img
                src={staticFile('photos/intro/Poet1.png')}
                style={{ maxHeight: '76vh', display: 'block', objectFit: 'contain' }}
              />
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: 100, left: 70, zIndex: 25 }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: '#a855f7',
                letterSpacing: '0.25em',
                marginBottom: '6px',
              }}
            >
              CRAFT // THE SPOKEN WORD
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
              POETRY & VOCAL LAB
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                color: 'rgba(255, 255, 255, 0.8)',
                marginTop: '4px',
              }}
            >
              Character Embodiment • Vocal Mimicry • The Poetic Metaphor
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SHOT 5.4: THE MOMENT OF SILENCE (Frames 75 - 120 | 1.5s VOID)  */}
      {/* ------------------------------------------------------------- */}
      {isSilence && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#040608',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 30,
          }}
        >
          {/* Delicate Crosshair */}
          <div
            style={{
              position: 'relative',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
              opacity: silenceOpacity,
            }}
          >
            <div style={{ position: 'absolute', width: '24px', height: '1px', backgroundColor: '#ffffff' }} />
            <div style={{ position: 'absolute', height: '24px', width: '1px', backgroundColor: '#ffffff' }} />
          </div>

          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              letterSpacing: '0.45em',
              color: 'rgba(255, 255, 255, 0.65)',
              textTransform: 'uppercase',
              opacity: silenceOpacity,
              textAlign: 'center',
            }}
          >
            [ THE MOMENT OF SILENCE ]
          </div>

          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '20px',
              fontStyle: 'italic',
              color: 'rgba(255, 255, 255, 0.4)',
              marginTop: '12px',
              opacity: silenceOpacity,
            }}
          >
            Holding breath before form.
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
            zIndex: 35,
          }}
        />
      )}

      {/* Reticle Overlay */}
      <ReticleOverlay
        actLabel="ACT 05 // THE UNSAID"
        shotTelemetry={isSilence ? 'TOTAL AUDITORY SILENCE // HOLDING TENSION' : 'STAGE & DISCIPLINE // ACOUSTIC'}
        hideCenter={isSilence}
      />
    </div>
  );
};

