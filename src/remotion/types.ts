export interface IntroProps {
  showTelemetry?: boolean;
  enableSound?: boolean;
  isMuted?: boolean;
  overlayOpacity?: number;
}

export const TOTAL_FRAMES = 705; // 23.5 seconds @ 30fps
export const FPS = 30;
export const COMP_WIDTH = 1920;
export const COMP_HEIGHT = 1080;

export const ACT_BOUNDARIES = {
  act1: { start: 0, end: 90 },       // 0.0s – 3.0s: System Anticipation
  act2: { start: 90, end: 210 },     // 3.0s – 7.0s: The First Spark (Key, Piano, Wire)
  act3: { start: 210, end: 345 },    // 7.0s – 11.5s: The Proof (Hackathons & Podiums)
  act4: { start: 345, end: 465 },    // 11.5s – 15.5s: The Builder (Nyay Link, Fasal Niti)
  act5: { start: 465, end: 585 },    // 15.5s – 19.5s: The Unsaid (Theatre, Music & Silence)
  act6: { start: 585, end: 705 },    // 19.5s – 23.5s: The Reveal & The Shape of the Unsaid
} as const;

