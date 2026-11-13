/**
 * Centralized Asset & Media Registry
 * 
 * Adapts dynamically to the assets Sahaj actually has:
 * - 6 to 8 strongest photographs curated for the cinematic opening montage.
 * - Reusable across multiple sections with different crops & layout treatments.
 * - Text-led editorial fallback when photographs are not present.
 * - Real theatre performance video configuration for The Stage.
 */

export interface CuratedPhoto {
  id: string;
  src: string; // e.g. '/photos/photo-1.jpg'
  alt: string;
  contextLabel: string; // e.g., 'Theatrical Stage', 'Acoustic Piano', 'Venture Strategy'
  focalPoint?: 'center' | 'top' | 'bottom';
  available: boolean; // Set to true once file is placed in public/photos/ or 01_My_Photos/
}

export interface TheatreVideoAsset {
  id: string;
  title: string;
  accolade: string; // '🥉 3rd Place Podium — Dramatic Theatre Competition'
  description: string;
  videoSrc?: string; // e.g. '/videos/theatre-performance.mp4'
  posterSrc?: string; // e.g. '/photos/theatre-poster.jpg'
  hasVideoAttached: boolean; // Set to true once Sahaj provides the actual MP4/WebM video
  duration?: string;
  recordedContext: string;
}

// -------------------------------------------------------------
// 1. THE CURATED REAL-LIFE PHOTOGRAPHS (Intro & Editorial Usage)
// (All assets authentic from 01_My_Photos/Intro_Selection/)
// -------------------------------------------------------------
export const curatedPhotosData: CuratedPhoto[] = [
  {
    id: 'photo-portrait',
    src: '/photos/intro/Portrait.png',
    alt: 'Sahaj — Studio Portrait',
    contextLabel: 'Studio Portrait',
    focalPoint: 'center',
    available: true,
  },
  {
    id: 'photo-theatre',
    src: '/photos/intro/Theatre1.png',
    alt: 'Sahaj — The Stagecraft & Dramatic Monologue',
    contextLabel: 'Theatrical Performance',
    focalPoint: 'center',
    available: true,
  },
  {
    id: 'photo-singnpiano',
    src: '/photos/intro/Singnpiano.png',
    alt: 'Sahaj — Two Gold Medals in Piano & Vocal Music Award Ceremony',
    contextLabel: 'Gold Medal Ceremony',
    focalPoint: 'center',
    available: true,
  },
  {
    id: 'photo-fasal',
    src: '/photos/intro/Fasal.png',
    alt: 'Sahaj — Fasal Niti Solo Website Deployment',
    contextLabel: 'Fasal Niti Deployment',
    focalPoint: 'center',
    available: true,
  },
  {
    id: 'photo-nyaylink',
    src: '/photos/intro/NyayLink.png',
    alt: 'Sahaj — Nyay Link Legal-Tech Strategy & Consultation',
    contextLabel: 'Nyay Link Co-Founder',
    focalPoint: 'center',
    available: true,
  },
  {
    id: 'photo-ieee',
    src: '/photos/intro/IEEE.png',
    alt: 'Sahaj — Hack Synapse 36-Hour National Hackathon',
    contextLabel: '36-Hour National Hackathon',
    focalPoint: 'center',
    available: true,
  },
  {
    id: 'photo-scratchathon',
    src: '/photos/intro/Scratchathon.png',
    alt: 'Sahaj — Scratchathon & MLH Hackathon Cohort',
    contextLabel: 'National Hackathon Cohort',
    focalPoint: 'center',
    available: true,
  },
  {
    id: 'photo-mimicry',
    src: '/photos/intro/mimicry.png',
    alt: 'Sahaj — The Voice Lab: Mimicry & Character Portrayal',
    contextLabel: 'Character Mimicry',
    focalPoint: 'center',
    available: true,
  },
];

// -------------------------------------------------------------
// 2. THEATRE PERFORMANCE VIDEO SPECIFICATION
// (Primary media for The Stage section)
// -------------------------------------------------------------
export const theatreVideoData: TheatreVideoAsset = {
  id: 'theatre-competition-performance',
  title: 'Dramatic Theatre Competition Performance',
  accolade: '🥉 3rd Place Podium — State / Inter-Collegiate Competition',
  description: 'Full live theatre production recording. Showcasing character embodiment, dramatic tension, physical presence, and ensemble stagecraft before a live collegiate audience.',
  recordedContext: 'Recorded live on stage during state inter-collegiate theatre competition.',
  videoSrc: undefined, // Sahaj can drop file in /public/videos/theatre-performance.mp4
  posterSrc: '/photos/intro/Theatre1.png', // Authentic stage performance still
  hasVideoAttached: false, // Flips to true when video file is linked
};

