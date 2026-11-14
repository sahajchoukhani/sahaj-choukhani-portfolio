export interface IntroProps {
  showTelemetry?: boolean;
  enableSound?: boolean;
  isMuted?: boolean;
  overlayOpacity?: number;
}

export const TOTAL_FRAMES = 345; // 11.5 seconds @ 30fps
export const FPS = 30;
export const COMP_WIDTH = 1920;
export const COMP_HEIGHT = 1080;

export const SCENE_BOUNDARIES = {
  ignition: { start: 0, end: 54 },       // 0.0s – 1.8s: Optical Shutter & Macro Switch Ignition
  montage: { start: 54, end: 234 },      // 1.8s – 7.8s: Hyper-Speed Dimensional Achievements Montage (10 shots)
  silence: { start: 234, end: 264 },     // 7.8s – 8.8s: THE MOMENT OF SILENCE (Everything Stops, 0 dB)
  reveal: { start: 264, end: 345 },      // 8.8s – 11.5s: THE FINAL REVEAL (Portrait + SAHAJ CHOUKHANI Climax)
} as const;
