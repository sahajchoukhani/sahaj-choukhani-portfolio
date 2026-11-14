import React from 'react';
import { Sequence, Audio, staticFile } from 'remotion';
import { IntroProps, SCENE_BOUNDARIES } from '../types';
import { Scene01Ignition } from './scenes/Scene01Ignition';
import { Scene02VelocityMontage } from './scenes/Scene02VelocityMontage';
import { Scene03Silence } from './scenes/Scene03Silence';
import { Scene04Reveal } from './scenes/Scene04Reveal';
import { FilmGrainOverlay } from './components/FilmGrainOverlay';
import { Letterbox } from './components/Letterbox';

export const TheMakingOfSahaj: React.FC<IntroProps> = ({ isMuted = false }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: '#040508',
        overflow: 'hidden',
      }}
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. SCENE SEQUENCES (4 SCENES, 345 FRAMES / 11.50s TOTAL)      */}
      {/* ------------------------------------------------------------- */}

      {/* SCENE 1: THE IGNITION (Frames 0 – 54 | 0.0s – 1.8s) */}
      <Sequence
        from={SCENE_BOUNDARIES.ignition.start}
        durationInFrames={SCENE_BOUNDARIES.ignition.end - SCENE_BOUNDARIES.ignition.start}
        name="Scene 1: The Ignition"
      >
        <Scene01Ignition />
      </Sequence>

      {/* SCENE 2: VELOCITY MONTAGE (Frames 54 – 234 | 1.8s – 7.8s) */}
      <Sequence
        from={SCENE_BOUNDARIES.montage.start}
        durationInFrames={SCENE_BOUNDARIES.montage.end - SCENE_BOUNDARIES.montage.start}
        name="Scene 2: Velocity Montage"
      >
        <Scene02VelocityMontage />
      </Sequence>

      {/* SCENE 3: THE MOMENT OF SILENCE (Frames 234 – 264 | 7.8s – 8.8s) */}
      <Sequence
        from={SCENE_BOUNDARIES.silence.start}
        durationInFrames={SCENE_BOUNDARIES.silence.end - SCENE_BOUNDARIES.silence.start}
        name="Scene 3: The Moment of Silence"
      >
        <Scene03Silence />
      </Sequence>

      {/* SCENE 4: THE FINAL REVEAL (Frames 264 – 345 | 8.8s – 11.5s) */}
      <Sequence
        from={SCENE_BOUNDARIES.reveal.start}
        durationInFrames={SCENE_BOUNDARIES.reveal.end - SCENE_BOUNDARIES.reveal.start}
        name="Scene 4: The Final Reveal"
      >
        <Scene04Reveal />
      </Sequence>

      {/* ------------------------------------------------------------- */}
      {/* 2. MASTER AUDIO LAYER (11.50s EXACT FRAME SYNCHRONIZATION)    */}
      {/* ------------------------------------------------------------- */}
      <Audio
        src={staticFile('audio/the_making_of_sahaj_v2.wav')}
        volume={isMuted ? 0 : 1}
      />

      {/* ------------------------------------------------------------- */}
      {/* 3. CINEMATIC OVERLAYS                                         */}
      {/* ------------------------------------------------------------- */}
      <FilmGrainOverlay />
      <Letterbox barHeight={44} />
    </div>
  );
};
