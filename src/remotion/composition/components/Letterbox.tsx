import React from 'react';

interface LetterboxProps {
  barHeight?: number;
}

export const Letterbox: React.FC<LetterboxProps> = ({ barHeight = 44 }) => {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 40 }}>
      {/* Top Bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: barHeight,
          backgroundColor: '#05070a',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      />
      {/* Bottom Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: barHeight,
          backgroundColor: '#05070a',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      />
    </div>
  );
};

