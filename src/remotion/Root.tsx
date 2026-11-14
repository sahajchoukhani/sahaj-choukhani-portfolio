import React from 'react';
import { Composition } from 'remotion';
import { TheMakingOfSahaj } from './composition/TheMakingOfSahaj';
import { TOTAL_FRAMES, FPS, COMP_WIDTH, COMP_HEIGHT } from './types';
import '../index.css';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TheMakingOfSahaj"
        component={TheMakingOfSahaj}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
        defaultProps={{
          isMuted: false,
          showTelemetry: true,
        }}
      />
    </>
  );
};

