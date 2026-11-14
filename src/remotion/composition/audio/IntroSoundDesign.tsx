import React from 'react';
import { Audio, staticFile } from 'remotion';

interface IntroSoundDesignProps {
  isMuted?: boolean;
}

export const IntroSoundDesign: React.FC<IntroSoundDesignProps> = ({ isMuted = false }) => {
  return (
    <>
      {/* 23.5-Second Sample-Accurate Master Soundtrack */}
      <Audio
        src={staticFile('audio/the_making_of_sahaj_master.wav')}
        volume={isMuted ? 0 : 1}
      />
    </>
  );
};

