import React from 'react';
import { useCurrentFrame } from 'remotion';

interface ReticleOverlayProps {
  actLabel: string;
  shotTelemetry?: string;
  hideCenter?: boolean;
}

export const ReticleOverlay: React.FC<ReticleOverlayProps> = ({
  actLabel,
  shotTelemetry,
  hideCenter = false,
}) => {
  const frame = useCurrentFrame();
  const seconds = (frame / 30).toFixed(2);
  const padFrame = String(frame).padStart(3, '0');

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 30,
        fontFamily: "'JetBrains Mono', 'Space Grotesk', monospace",
        color: 'rgba(255, 255, 255, 0.45)',
        fontSize: '11px',
        letterSpacing: '0.12em',
      }}
    >
      {/* Top Left: Project Identity & Act */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 64,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#00f0ff',
              boxShadow: '0 0 8px #00f0ff',
            }}
          />
          <span style={{ color: 'rgba(255, 255, 255, 0.85)', fontWeight: 600 }}>
            THE MAKING OF SAHAJ
          </span>
        </div>
        <div style={{ color: 'rgba(0, 240, 255, 0.75)', fontSize: '10px' }}>
          {actLabel}
        </div>
      </div>

      {/* Top Right: Timecode & Frame Counter */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          right: 64,
          textAlign: 'right',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <div>
          TC <span style={{ color: '#fff' }}>00:{seconds.padStart(5, '0')}</span> // FRM <span style={{ color: '#00f0ff' }}>{padFrame}</span>
        </div>
        <div style={{ color: 'rgba(255, 255, 255, 0.35)', fontSize: '10px' }}>
          1920×1080 • 30FPS • DCI
        </div>
      </div>

      {/* Bottom Left: Shot Telemetry */}
      {shotTelemetry && (
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: 64,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ color: 'rgba(255, 255, 255, 0.25)' }}>[ SPEC ]</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.75)' }}>{shotTelemetry}</span>
        </div>
      )}

      {/* Bottom Right: Optical Status */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          right: 64,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>OPTIC</span>
        <span style={{ color: 'rgba(230, 175, 46, 0.85)' }}>LOCKED // 50MM T1.5</span>
      </div>

      {/* Subtle Corner Brackets */}
      {/* Top-Left */}
      <div
        style={{
          position: 'absolute',
          top: 50,
          left: 50,
          width: '16px',
          height: '16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.35)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.35)',
        }}
      />
      {/* Top-Right */}
      <div
        style={{
          position: 'absolute',
          top: 50,
          right: 50,
          width: '16px',
          height: '16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.35)',
          borderRight: '1px solid rgba(255, 255, 255, 0.35)',
        }}
      />
      {/* Bottom-Left */}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          left: 50,
          width: '16px',
          height: '16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.35)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.35)',
        }}
      />
      {/* Bottom-Right */}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          right: 50,
          width: '16px',
          height: '16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.35)',
          borderRight: '1px solid rgba(255, 255, 255, 0.35)',
        }}
      />

      {/* Center Hairline Reticle */}
      {!hideCenter && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.25,
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '18px',
              height: '1px',
              backgroundColor: '#fff',
            }}
          />
          <div
            style={{
              position: 'absolute',
              height: '18px',
              width: '1px',
              backgroundColor: '#fff',
            }}
          />
        </div>
      )}
    </div>
  );
};

