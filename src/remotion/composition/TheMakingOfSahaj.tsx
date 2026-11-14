import React from 'react';
import { Sequence } from 'remotion';
import { IntroProps, ACT_BOUNDARIES } from '../types';
import { Act01Anticipation } from './acts/Act01Anticipation';
import { Act02FirstSpark } from './acts/Act02FirstSpark';
import { Act03TheProof } from './acts/Act03TheProof';
import { Act04TheBuilder } from './acts/Act04TheBuilder';
import { Act05TheUnsaid } from './acts/Act05TheUnsaid';
import { Act06TheReveal } from './acts/Act06TheReveal';
import { IntroSoundDesign } from './audio/IntroSoundDesign';
import { FilmGrainOverlay } from './components/FilmGrainOverlay';
import { Letterbox } from './components/Letterbox';

export const TheMakingOfSahaj: React.FC<IntroProps> = ({ isMuted = false }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: '#05070a',
        overflow: 'hidden',
      }}
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. VISUAL ACT SEQUENCES (6 ACTS, 705 FRAMES TOTAL)           */}
      {/* ------------------------------------------------------------- */}

      {/* ACT 1: SYSTEM ANTICIPATION (0.0s – 3.0s | Frames 0 – 90) */}
      <Sequence
        from={ACT_BOUNDARIES.act1.start}
        durationInFrames={ACT_BOUNDARIES.act1.end - ACT_BOUNDARIES.act1.start}
        name="Act 1: System Anticipation"
      >
        <Act01Anticipation />
      </Sequence>

      {/* ACT 2: THE FIRST SPARK (3.0s – 7.0s | Frames 90 – 210) */}
      <Sequence
        from={ACT_BOUNDARIES.act2.start}
        durationInFrames={ACT_BOUNDARIES.act2.end - ACT_BOUNDARIES.act2.start}
        name="Act 2: The First Spark"
      >
        <Act02FirstSpark />
      </Sequence>

      {/* ACT 3: THE PROOF (7.0s – 11.5s | Frames 210 – 345) */}
      <Sequence
        from={ACT_BOUNDARIES.act3.start}
        durationInFrames={ACT_BOUNDARIES.act3.end - ACT_BOUNDARIES.act3.start}
        name="Act 3: The Proof"
      >
        <Act03TheProof />
      </Sequence>

      {/* ACT 4: THE BUILDER (11.5s – 15.5s | Frames 345 – 465) */}
      <Sequence
        from={ACT_BOUNDARIES.act4.start}
        durationInFrames={ACT_BOUNDARIES.act4.end - ACT_BOUNDARIES.act4.start}
        name="Act 4: The Builder"
      >
        <Act04TheBuilder />
      </Sequence>

      {/* ACT 5: THE UNSAID (15.5s – 19.5s | Frames 465 – 585) */}
      <Sequence
        from={ACT_BOUNDARIES.act5.start}
        durationInFrames={ACT_BOUNDARIES.act5.end - ACT_BOUNDARIES.act5.start}
        name="Act 5: The Unsaid"
      >
        <Act05TheUnsaid />
      </Sequence>

      {/* ACT 6: THE REVEAL (19.5s – 23.5s | Frames 585 – 705) */}
      <Sequence
        from={ACT_BOUNDARIES.act6.start}
        durationInFrames={ACT_BOUNDARIES.act6.end - ACT_BOUNDARIES.act6.start}
        name="Act 6: The Reveal"
      >
        <Act06TheReveal />
      </Sequence>

      {/* ------------------------------------------------------------- */}
      {/* 2. AUDIO LAYER (EXACT FRAME SYNCHRONIZATION)                  */}
      {/* ------------------------------------------------------------- */}
      <IntroSoundDesign isMuted={isMuted} />

      {/* ------------------------------------------------------------- */}
      {/* 3. CINEMATIC OVERLAYS                                         */}
      {/* ------------------------------------------------------------- */}
      <FilmGrainOverlay />
      <Letterbox barHeight={44} />
    </div>
  );
};

