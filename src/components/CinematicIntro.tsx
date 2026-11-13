import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, X, Sparkles, Film, Award, Terminal } from 'lucide-react';
import { sound } from '../services/soundEngine';

interface CinematicIntroProps {
  onComplete: () => void;
}

export type ShotType = 'anticipation' | 'flow-video' | 'photo-vertical' | 'photo-landscape' | 'photo-square' | 'reveal';

export interface StoryboardShot {
  id: string;
  shotNumber: number;
  actTitle: string;
  actRoman: string;
  start: number;
  end: number;
  type: ShotType;
  mediaSrc: string;
  title: string;
  subtitle: string;
  badge: string;
  accentColor: string;
  telemetry: {
    frameCode: string;
    aspectRatio: string;
    spec: string;
  };
}

export const STORYBOARD_SHOTS: StoryboardShot[] = [
  // -------------------------------------------------------------
  // ACT 0: DARKNESS & ANTICIPATION (00:00.0 – 00:00.5)
  // -------------------------------------------------------------
  {
    id: 'shot-00',
    shotNumber: 0,
    actTitle: 'SYSTEM ANTICIPATION',
    actRoman: 'ACT 0',
    start: 0.0,
    end: 0.5,
    type: 'anticipation',
    mediaSrc: '',
    title: 'S A H A J',
    subtitle: 'TRANSMISSION INITIALIZED // HYPER-KINETIC ENGINE ENGAGED',
    badge: 'SYSTEM IGNITION',
    accentColor: 'text-amber-400',
    telemetry: {
      frameCode: 'TRANSMIT // 00.BOOT',
      aspectRatio: 'OBSIDIAN VOID',
      spec: 'SUB-BASS TENSION ENGAGED',
    },
  },

  // -------------------------------------------------------------
  // ACT I: THE MECHANICS OF CREATION (00:00.5 – 00:02.85)
  // Rapid Google Flow cinematic micro-cuts
  // -------------------------------------------------------------
  {
    id: 'shot-01',
    shotNumber: 1,
    actTitle: 'MECHANICS OF CREATION',
    actRoman: 'ACT I',
    start: 0.5,
    end: 1.3,
    type: 'flow-video',
    mediaSrc: '/videos/flow/01_mechanical_key.mp4',
    title: 'THE CODE ENGINE',
    subtitle: 'RAPID ARCHITECTURE & REVOLUTIONARY INPUT',
    badge: 'TACTILE IMPULSE',
    accentColor: 'text-cyan-400',
    telemetry: {
      frameCode: 'FLOW // 01.KEY',
      aspectRatio: '16:9 • 1080P',
      spec: 'METALLIC SWITCH CONTACT // 0.75s',
    },
  },
  {
    id: 'shot-02',
    shotNumber: 2,
    actTitle: 'MECHANICS OF CREATION',
    actRoman: 'ACT I',
    start: 1.3,
    end: 2.1,
    type: 'flow-video',
    mediaSrc: '/videos/flow/02_piano.mp4',
    title: 'ACOUSTIC HARMONICS',
    subtitle: 'PIANO HAMMER RESONANCE • CADENCE • DISCIPLINE',
    badge: 'THE FREQUENCY',
    accentColor: 'text-amber-300',
    telemetry: {
      frameCode: 'FLOW // 02.PIANO',
      aspectRatio: '16:9 • 1080P',
      spec: 'FELT HAMMER STRIKE // 1.55s',
    },
  },
  {
    id: 'shot-03',
    shotNumber: 3,
    actTitle: 'MECHANICS OF CREATION',
    actRoman: 'ACT I',
    start: 2.1,
    end: 2.85,
    type: 'flow-video',
    mediaSrc: '/videos/flow/03_bronze.mp4',
    title: 'KINETIC MOMENTUM',
    subtitle: 'VIBRATING BRONZE & METALLIC STRING FLUTTER',
    badge: 'PRE-DROP IGNITION',
    accentColor: 'text-yellow-400',
    telemetry: {
      frameCode: 'FLOW // 03.BRONZE',
      aspectRatio: '16:9 • 1080P',
      spec: 'METALLIC WIRE OSCILLATION // 2.25s',
    },
  },

  // -------------------------------------------------------------
  // ACT II: THE ARENA — 150 BPM BREAKBEAT DROP (00:03.05 – 00:04.65)
  // Hyper-fast 0.40s cuts synchronized to breakbeat kicks & snares
  // -------------------------------------------------------------
  {
    id: 'shot-04',
    shotNumber: 4,
    actTitle: 'THE ARENA',
    actRoman: 'ACT II',
    start: 3.05,
    end: 3.45,
    type: 'photo-vertical',
    mediaSrc: '/photos/intro/IEEE.png',
    title: 'IEEE SYNAPSE',
    subtitle: 'MITS GWALIOR (MADHAV INSTITUTE) • 🏆 PODIUM WINNER • 36H SPRINT',
    badge: '🏆 PODIUM WINNER // MITS GWALIOR',
    accentColor: 'text-amber-400',
    telemetry: {
      frameCode: 'FRAME // 04.MITS_GWALIOR',
      aspectRatio: '690 × 1306',
      spec: 'MITS GWALIOR // 36H HACKATHON TROPHY',
    },
  },
  {
    id: 'shot-05',
    shotNumber: 5,
    actTitle: 'THE ARENA',
    actRoman: 'ACT II',
    start: 3.45,
    end: 3.85,
    type: 'photo-vertical',
    mediaSrc: '/photos/intro/OpJindal.png',
    title: 'OP JINDAL',
    subtitle: 'O.P. JINDAL GLOBAL UNIVERSITY • 🥇 1ST PLACE (TEAM) & 🥈 RUNNER UP',
    badge: '🥇 1ST PLACE // O.P. JINDAL',
    accentColor: 'text-orange-400',
    telemetry: {
      frameCode: 'FRAME // 05.OP_JINDAL',
      aspectRatio: '694 × 1068',
      spec: 'O.P. JINDAL GLOBAL UNIVERSITY // DEFENSE',
    },
  },
  {
    id: 'shot-06',
    shotNumber: 6,
    actTitle: 'THE ARENA',
    actRoman: 'ACT II',
    start: 3.85,
    end: 4.25,
    type: 'photo-landscape',
    mediaSrc: '/photos/intro/iimnmimicry.png',
    title: 'IIM BHUBANESWAR',
    subtitle: 'INDIAN INSTITUTE OF MANAGEMENT BHUBANESWAR • 🥉 3RD PLACE PODIUM',
    badge: '🥉 3RD PLACE // IIM BHUBANESWAR',
    accentColor: 'text-amber-300',
    telemetry: {
      frameCode: 'FRAME // 06.IIM_BHUBANESWAR',
      aspectRatio: '16:9 • STAGE REVEAL',
      spec: 'IIM BHUBANESWAR // MIMICRY DEFENSE',
    },
  },
  {
    id: 'shot-07',
    shotNumber: 7,
    actTitle: 'THE ARENA',
    actRoman: 'ACT II',
    start: 4.25,
    end: 4.65,
    type: 'photo-landscape',
    mediaSrc: '/photos/intro/Hacktober.png',
    title: 'IIT DELHI & CODEHACK',
    subtitle: 'IIT DELHI (STRATAZENITH FINALIST) • CODEHACK NATIONAL FINALIST LIST',
    badge: '🎖️ NATIONAL FINALIST LIST',
    accentColor: 'text-violet-400',
    telemetry: {
      frameCode: 'FRAME // 07.IIT_DELHI_CODEHACK',
      aspectRatio: '2236 × 1414',
      spec: 'IIT DELHI STRATAZENITH // CODEHACK FINALIST LIST',
    },
  },

  // -------------------------------------------------------------
  // ACT III: THE FORGE — STARTUPS & SOLO PLATFORMS (00:04.65 – 00:06.65)
  // Rapid fire ventures & live web platform reveals
  // -------------------------------------------------------------
  {
    id: 'shot-08a',
    shotNumber: 8,
    actTitle: 'THE FORGE',
    actRoman: 'ACT III',
    start: 4.65,
    end: 5.05,
    type: 'photo-vertical',
    mediaSrc: '/photos/intro/NyayLink.png',
    title: 'NYAY LINK',
    subtitle: 'CO-FOUNDER • LEGAL WORKFLOW PLATFORM IN ADVOCATE CHAMBERS',
    badge: 'VENTURE CO-FOUNDER',
    accentColor: 'text-cyan-400',
    telemetry: {
      frameCode: 'FRAME // 08A.NYAY_CHAMBERS',
      aspectRatio: '676 × 1130',
      spec: 'SUPREME COURT ADVOCATE CO-DESIGN',
    },
  },
  {
    id: 'shot-08b',
    shotNumber: 9,
    actTitle: 'THE FORGE',
    actRoman: 'ACT III',
    start: 5.05,
    end: 5.45,
    type: 'photo-landscape',
    mediaSrc: '/photos/previews/nyay_link_preview.png',
    title: 'NYAY LINK PLATFORM',
    subtitle: 'OFFICIAL PLATFORM ARCHITECTURE (nyay.link)',
    badge: 'LIVE PLATFORM // nyay.link',
    accentColor: 'text-cyan-300',
    telemetry: {
      frameCode: 'FRAME // 08B.NYAY_PREVIEW',
      aspectRatio: '16:10 • PRODUCTION',
      spec: 'LEGAL CASE INTELLIGENCE ARCHITECTURE',
    },
  },
  {
    id: 'shot-09a',
    shotNumber: 10,
    actTitle: 'THE FORGE',
    actRoman: 'ACT III',
    start: 5.45,
    end: 5.85,
    type: 'photo-vertical',
    mediaSrc: '/photos/intro/Fasal.png',
    title: 'FASAL NITI',
    subtitle: 'CORE MEMBER • 100% PERSONALLY BUILT & DEPLOYED SOLO',
    badge: '100% SOLO ENGINEERING',
    accentColor: 'text-emerald-400',
    telemetry: {
      frameCode: 'FRAME // 09A.FASAL_SOLO',
      aspectRatio: '830 × 1234',
      spec: '100% SOLO PRODUCTION BUILD',
    },
  },
  {
    id: 'shot-09b',
    shotNumber: 11,
    actTitle: 'THE FORGE',
    actRoman: 'ACT III',
    start: 5.85,
    end: 6.25,
    type: 'photo-landscape',
    mediaSrc: '/photos/previews/fasal_niti_preview.png',
    title: 'FASAL NITI WEB PLATFORM',
    subtitle: 'AGRI-TECH POLICY ARCHITECTURE (prototype-fasalniti.vercel.app)',
    badge: 'LIVE WEBSITE // SOLO DEPLOY',
    accentColor: 'text-emerald-300',
    telemetry: {
      frameCode: 'FRAME // 09B.FASAL_PREVIEW',
      aspectRatio: '16:10 • PRODUCTION',
      spec: 'LIVE SYSTEM PREVIEW // SOLO DEPLOY',
    },
  },
  {
    id: 'shot-10',
    shotNumber: 12,
    actTitle: 'THE FORGE',
    actRoman: 'ACT III',
    start: 6.25,
    end: 6.65,
    type: 'photo-landscape',
    mediaSrc: '/photos/previews/less_go_preview.png',
    title: 'LESS GO',
    subtitle: 'CORE MEMBER • TRAVEL ITINERARY PLATFORM (less-gooo.appwrite.network)',
    badge: 'VENTURE PLATFORM // LESS GO',
    accentColor: 'text-amber-400',
    telemetry: {
      frameCode: 'FRAME // 10.LESS_GO',
      aspectRatio: '16:10 • APPWRITE',
      spec: 'DYNAMIC TRAVEL ITINERARY ENGINE',
    },
  },

  // -------------------------------------------------------------
  // ACT IV: THE OTHER SIDE — CULTURAL STUDIO (00:06.65 – 00:07.80)
  // Theatre, Piano & Vocals, and Character Vocal Mimicry
  // -------------------------------------------------------------
  {
    id: 'shot-11',
    shotNumber: 13,
    actTitle: 'THE OTHER SIDE',
    actRoman: 'ACT IV',
    start: 6.65,
    end: 7.05,
    type: 'photo-square',
    mediaSrc: '/photos/intro/Theatre1.png',
    title: '🥉 3RD PLACE PODIUM',
    subtitle: 'NATIONAL DRAMATIC THEATRE COMPETITION • SWAARANG SOCIETY',
    badge: 'CULTURAL THEATRE PODIUM',
    accentColor: 'text-rose-400',
    telemetry: {
      frameCode: 'FRAME // 11.THEATRE',
      aspectRatio: '474 × 470',
      spec: 'NATIONAL DRAMATIC THEATRE TROPHY',
    },
  },
  {
    id: 'shot-12',
    shotNumber: 14,
    actTitle: 'THE OTHER SIDE',
    actRoman: 'ACT IV',
    start: 7.05,
    end: 7.45,
    type: 'photo-square',
    mediaSrc: '/photos/intro/Singnpiano.png',
    title: '🥇 1ST PLACE REPERTOIRE',
    subtitle: 'SIMULTANEOUS PIANO & VOCALS • COMBINED PERFORMANCE WIN',
    badge: '🥇 1ST PLACE HONORS',
    accentColor: 'text-yellow-300',
    telemetry: {
      frameCode: 'FRAME // 12.MEDAL',
      aspectRatio: '586 × 568',
      spec: 'OFFICIAL ARMED FORCES CEREMONY',
    },
  },
  {
    id: 'shot-13',
    shotNumber: 15,
    actTitle: 'THE OTHER SIDE',
    actRoman: 'ACT IV',
    start: 7.45,
    end: 7.80,
    type: 'photo-square',
    mediaSrc: '/photos/intro/mimicry.png',
    title: 'THE VOICE LAB',
    subtitle: 'MIMICRY • DUBBING • VOCAL CHARACTER PORTRAYALS',
    badge: 'PERFORMANCE ARTS',
    accentColor: 'text-violet-400',
    telemetry: {
      frameCode: 'FRAME // 13.MIMICRY',
      aspectRatio: '1126 × 1160',
      spec: 'EXPRESSIVE REHEARSAL // VOCAL LAB',
    },
  },

  // -------------------------------------------------------------
  // ACT V: THE VAULT — EMOTIONAL CONTRAST & SILENCE (00:07.80 – 00:08.60)
  // Sudden breakbeat cut, solitary hanging piano chime, atmospheric breath
  // -------------------------------------------------------------
  {
    id: 'shot-14',
    shotNumber: 16,
    actTitle: 'DELIBERATE SILENCE',
    actRoman: 'ACT V',
    start: 7.80,
    end: 8.60,
    type: 'photo-vertical',
    mediaSrc: '/photos/intro/Poet1.png',
    title: 'A RESTLESS SHELF',
    subtitle: 'ORIGINAL POETRY • THE POETRY VAULT',
    badge: 'LITERARY VAULT',
    accentColor: 'text-amber-200',
    telemetry: {
      frameCode: 'FRAME // 14.POETRY',
      aspectRatio: '782 × 1290',
      spec: 'NOCTURNAL MANUSCRIPT // SOLITARY PIANO',
    },
  },

  // -------------------------------------------------------------
  // ACT VI: THE RESOLUTION — MONUMENTAL CLIMAX (00:08.60 – 00:11.20)
  // Massive Hans Zimmer Braam boom, minor 9th orchestral swell & 3D Monolith
  // -------------------------------------------------------------
  {
    id: 'shot-15',
    shotNumber: 17,
    actTitle: 'THE CLIMAX',
    actRoman: 'ACT VI',
    start: 8.60,
    end: 11.20,
    type: 'reveal',
    mediaSrc: '/photos/intro/Portrait.png',
    title: 'THE SHAPE OF THE UNSAID.',
    subtitle: '"I give form to what I cannot explain."',
    badge: 'MASTER DIMENSIONAL REVEAL',
    accentColor: 'text-white',
    telemetry: {
      frameCode: 'PORTRAIT // MASTER 3D',
      aspectRatio: '1486 × 1412',
      spec: 'HIGH-CONTRAST RIM LIT STUDIO',
    },
  },
];

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [cutFlash, setCutFlash] = useState(false);
  const [filmBurn, setFilmBurn] = useState(false);
  const [filmBurnSide, setFilmBurnSide] = useState<'left' | 'right' | 'corner'>('left');
  const [rgbSplit, setRgbSplit] = useState(false);
  const [zoomSnap, setZoomSnap] = useState(false);
  const [dropLaser, setDropLaser] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const lastShotIdRef = useRef<string>('');
  const triggeredCuesRef = useRef<Set<string>>(new Set());

  // References to the 3 Google Flow videos for seamless, pre-buffered playback
  const flowVideo1Ref = useRef<HTMLVideoElement | null>(null);
  const flowVideo2Ref = useRef<HTMLVideoElement | null>(null);
  const flowVideo3Ref = useRef<HTMLVideoElement | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);
    }
  }, []);

  // Handle ESC key for instant skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Preload fast master soundtrack buffer + fallback audio element
  useEffect(() => {
    sound.preloadCinematicIntroSoundtrack().catch(() => {});

    const audio = new Audio('/audio/portfolio_intro_fast.m4a');
    audio.preload = 'auto';
    audio.muted = isAudioMuted;
    audio.onerror = () => {
      // Fallback to high-definition WAV master
      const wavAudio = new Audio('/audio/portfolio_intro_fast.wav');
      wavAudio.preload = 'auto';
      wavAudio.muted = isAudioMuted;
      audioRef.current = wavAudio;
    };
    audioRef.current = audio;

    // Preload flow video elements
    const playSafe = (vid: HTMLVideoElement | null) => {
      if (vid) {
        vid.muted = true;
        vid.play().catch(() => {});
      }
    };

    playSafe(flowVideo1Ref.current);
    playSafe(flowVideo2Ref.current);
    playSafe(flowVideo3Ref.current);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      sound.stopCinematicIntroSoundtrack();
    };
  }, []);

  // Sync audio mute state with Web Audio engine
  useEffect(() => {
    sound.setMasterMuted(isAudioMuted);
    if (audioRef.current) {
      audioRef.current.muted = isAudioMuted;
      if (!isAudioMuted && audioRef.current.paused && elapsedTime > 0) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [isAudioMuted]);

  // Master Intro Animation Loop (11.2 seconds total, hyper-fast pacing)
  useEffect(() => {
    if (isReducedMotion) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }

    const durationTotal = 11.2;

    const tick = (now: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = now;
        setHasStarted(true);
        sound.startCinematicIntroSoundtrack();
        if (audioRef.current && !isAudioMuted) {
          audioRef.current.play().catch(() => {});
        }
      }

      const elapsed = (now - startTimeRef.current) / 1000;
      setElapsedTime(elapsed);

      // -------------------------------------------------------------
      // SAMPLE-ACCURATE MECHANICAL & HARMONIC AUDIO CUES (11.2s TIMELINE)
      // -------------------------------------------------------------
      const triggered = triggeredCuesRef.current;

      // 1. Mechanical Keyboard key contact at 0.75s
      if (elapsed >= 0.75 && !triggered.has('key-click')) {
        triggered.add('key-click');
        if (!isAudioMuted) sound.playDeliberateMechanicalKey();
      }

      // 2. Piano hammer strikes string at 1.55s
      if (elapsed >= 1.55 && !triggered.has('piano-strike')) {
        triggered.add('piano-strike');
        if (!isAudioMuted) sound.playPianoHammerStrike();
      }

      // 3. Vibrating bronze wire shimmer at 2.25s
      if (elapsed >= 2.25 && !triggered.has('bronze-vibe')) {
        triggered.add('bronze-vibe');
        if (!isAudioMuted) sound.playBronzeWireVibration();
      }

      // 4. Pre-drop tension build at 2.65s
      if (elapsed >= 2.65 && !triggered.has('arena-swell')) {
        triggered.add('arena-swell');
        if (!isAudioMuted) sound.playReverseSwell(0.20);
      }

      // 4.5. THE DROP: 150 BPM Breakbeat & 35mm Archival Reel Engaged at 3.05s
      if (elapsed >= 3.05 && !triggered.has('drop-ignition')) {
        triggered.add('drop-ignition');
        setFilmBurnSide('corner');
        setFilmBurn(true);
        setDropLaser(true);
        setTimeout(() => setFilmBurn(false), 240);
        setTimeout(() => setDropLaser(false), 450);
        if (!isAudioMuted) {
          sound.playAnalogProjectorGateLatch();
          sound.playSubBassPunch(115);
          sound.playProjectorLightLeakFlare();
        }
      }

      // 5. Climax anticipation reverse swell at 8.20s
      if (elapsed >= 8.20 && !triggered.has('climax-swell')) {
        triggered.add('climax-swell');
        if (!isAudioMuted) sound.playReverseSwell(0.40);
      }

      // -------------------------------------------------------------
      // DETECT SHOT TRANSITIONS FOR AWWWARDS FLASHES, GLITCH & PUNCH CUTS
      // -------------------------------------------------------------
      const activeShot = STORYBOARD_SHOTS.find(
        (s) => elapsed >= s.start && elapsed < s.end
      ) || STORYBOARD_SHOTS[STORYBOARD_SHOTS.length - 1];

      if (activeShot.id !== lastShotIdRef.current) {
        lastShotIdRef.current = activeShot.id;
        
        // Awwwards Hyper-Kinetic Visual Cut Effects
        setCutFlash(true);
        setRgbSplit(true);
        setZoomSnap(true);
        setTimeout(() => setCutFlash(false), 60);
        setTimeout(() => setRgbSplit(false), 180);
        setTimeout(() => setZoomSnap(false), 240);

        // 35mm Projector Light-Leak Flare across photograph splices (3.05s - 8.60s)
        if (elapsed >= 3.05 && elapsed < 8.60) {
          const sides: ('left' | 'right' | 'corner')[] = ['left', 'right', 'corner'];
          const chosenSide = sides[Math.floor(Math.random() * sides.length)];
          setFilmBurnSide(chosenSide);
          setFilmBurn(true);
          setTimeout(() => setFilmBurn(false), 140);
        }

        // Synchronized Bespoke Sound Design on Cuts
        if (!isAudioMuted) {
          switch (activeShot.id) {
            // ACT II: THE ARENA (150 BPM BREAKBEAT DROPS!)
            case 'shot-04': // IEEE Synapse MITS Gwalior
              sound.playAnalogProjectorGateLatch();
              sound.playSubBassPunch(110);
              sound.playTightTransitionSwish();
              sound.playProjectorLightLeakFlare();
              break;
            case 'shot-05': // OP Jindal 1st Place
              sound.playCameraShutter();
              sound.playTightTransitionSwish();
              break;
            case 'shot-06': // IIM Bhubaneswar Podium
              sound.playSubBassPunch(95);
              sound.playTightTransitionSwish();
              break;
            case 'shot-07': // IIT Delhi Stratazenith
              sound.playCameraShutter();
              sound.playTightTransitionSwish();
              break;

            // ACT III: THE FORGE (Nyay Link, Fasal Niti, Less Go)
            case 'shot-08a': // Nyay Link Consultation
              sound.playSubBassPunch(90);
              sound.playTightTransitionSwish();
              break;
            case 'shot-08b': // Nyay Link Platform Preview
              sound.playCameraShutter();
              sound.playTightTransitionSwish();
              break;
            case 'shot-09a': // Fasal Niti Solo Engineering
              sound.playSubBassPunch(90);
              sound.playTightTransitionSwish();
              break;
            case 'shot-09b': // Fasal Niti Live Website Preview
              sound.playCameraShutter();
              sound.playTightTransitionSwish();
              break;
            case 'shot-10': // Less Go Travel Platform
              sound.playSubBassPunch(88);
              sound.playTightTransitionSwish();
              break;

            // ACT IV: THE CULTURAL STUDIO
            case 'shot-11': // Dramatic Theatre Swaarang Podium
              sound.playTheatricalWarmSwell();
              sound.playSubBassPunch(85);
              break;
            case 'shot-12': // Simultaneous Piano & Vocals 1st Place
              sound.playTightTransitionSwish();
              break;
            case 'shot-13': // The Voice Lab: Mimicry
              sound.playCameraShutter();
              break;

            // ACT V: THE POETRY VAULT (DELIBERATE SILENCE)
            case 'shot-14': // A Restless Shelf
              sound.playTightTransitionSwish();
              break;

            // ACT VI: THE CLIMAX REVEAL (Monolith Stage Emergence)
            case 'shot-15': // Master Portrait & Signature Identity Boom
              sound.playClimaxRevealBoom();
              break;
          }
        }
      }

      // Cue Flow Videos at Accelerated Timestamps
      if (elapsed >= 0.5 && elapsed < 1.3 && flowVideo1Ref.current?.paused) {
        flowVideo1Ref.current?.play().catch(() => {});
      } else if (elapsed >= 1.3 && elapsed < 2.1 && flowVideo2Ref.current?.paused) {
        flowVideo2Ref.current?.play().catch(() => {});
      } else if (elapsed >= 2.1 && elapsed < 2.85 && flowVideo3Ref.current?.paused) {
        flowVideo3Ref.current?.play().catch(() => {});
      }

      if (elapsed >= durationTotal) {
        handleComplete();
      } else {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      sound.stopCinematicIntroSoundtrack();
    };
  }, [isReducedMotion, isAudioMuted]);

  const handleComplete = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    sound.stopCinematicIntroSoundtrack();
    if (audioRef.current) {
      audioRef.current.pause();
    }
    onComplete();
  };

  const handleSkip = () => {
    sound.playTactileClick();
    handleComplete();
  };

  const toggleAudio = () => {
    sound.playTactileClick();
    const nextMuted = !isAudioMuted;
    setIsAudioMuted(nextMuted);
    sound.setMasterMuted(nextMuted);
    if (!nextMuted) {
      sound.startCinematicIntroSoundtrack();
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.play().catch(() => {});
      }
    }
  };

  // Find active storyboard shot
  const currentShot = STORYBOARD_SHOTS.find(
    (s) => elapsedTime >= s.start && elapsedTime < s.end
  ) || STORYBOARD_SHOTS[STORYBOARD_SHOTS.length - 1];

  const totalDuration = 11.2;
  const progressPercent = Math.min(100, (elapsedTime / totalDuration) * 100);

  // 35mm Restored Archival Film Sequence is active during Acts II through V (3.05s to 8.60s)
  const isFilmSequence = elapsedTime >= 3.05 && elapsedTime < 8.60;
  const filmGradualFactor = Math.min(1, Math.max(0, (elapsedTime - 3.05) / 0.8));

  // High-Speed Frame Counter for Cyberpunk HUD
  const frameNumber = Math.floor(elapsedTime * 120);

  return (
    <div className="fixed inset-0 z-[100] bg-[#081018] text-white flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Optical Transition Cut Flash */}
      {cutFlash && (
        <div className="absolute inset-0 z-50 bg-white/25 pointer-events-none transition-opacity duration-75" />
      )}

      {/* Drop Laser Scanline Flash on the 150 BPM Beat Drop (3.05s) */}
      {dropLaser && (
        <div className="absolute inset-x-0 h-1 z-50 pointer-events-none bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_25px_rgba(6,182,212,1)] laser-drop-beam" />
      )}

      {/* Dynamic 35mm Projector Light-Leak Flare & Film-Burn on Cut */}
      {isFilmSequence && filmBurn && (
        <div 
          className="absolute inset-0 z-50 pointer-events-none film-burn-active mix-blend-screen"
          style={{
            background: 
              filmBurnSide === 'left'
                ? 'radial-gradient(circle at 8% 35%, rgba(255, 175, 75, 0.72) 0%, rgba(245, 110, 30, 0.35) 35%, transparent 70%)'
                : filmBurnSide === 'right'
                ? 'radial-gradient(circle at 92% 35%, rgba(255, 175, 75, 0.72) 0%, rgba(245, 110, 30, 0.35) 35%, transparent 70%)'
                : 'radial-gradient(circle at 25% 15%, rgba(255, 185, 90, 0.8) 0%, rgba(240, 100, 25, 0.4) 40%, transparent 75%)'
          }}
        />
      )}

      {/* SVG Fine-Grain Procedural Filter for 35mm Organic Emulsion */}
      {isFilmSequence && (
        <svg className="pointer-events-none fixed inset-0 w-full h-full z-40 mix-blend-overlay" style={{ opacity: Math.max(0.04, 0.085 * filmGradualFactor) }}>
          <filter id="analog-film-grain-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#analog-film-grain-filter)" />
        </svg>
      )}

      {/* --------------------------------------------------------- */}
      {/* 1. TOP HEADER & TELEMETRY CONTROLS                       */}
      {/* --------------------------------------------------------- */}
      <header className="relative z-40 px-6 py-4 flex items-center justify-between border-b border-white/5 bg-gradient-to-b from-[#081018] to-transparent">
        {/* Left: Audio Toggle & Act Stamp */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleAudio}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all backdrop-blur-md border ${
              !isAudioMuted
                ? 'bg-amber-400 text-neutral-950 font-bold border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.35)]'
                : 'bg-neutral-900/80 text-neutral-300 border-white/10 hover:border-amber-500/40 hover:text-white'
            }`}
          >
            {!isAudioMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-neutral-400" />}
            <span className="tracking-wider">
              {isAudioMuted ? 'AUDIO: MUTED (CLICK TO UNMUTE)' : 'AUDIO: LIVE // 150 BPM HYPER-KINETIC'}
            </span>
          </button>

          {/* Act Badge */}
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono tracking-widest text-neutral-400 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <span className="text-amber-400 font-bold">{currentShot.actRoman}</span>
            <span className="text-neutral-600">//</span>
            <span className="uppercase text-neutral-300">{currentShot.actTitle}</span>
            {isFilmSequence && (
              <span className="hidden md:inline-flex items-center gap-1.5 ml-2 pl-2 border-l border-white/10 text-amber-500/80">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[9px] tracking-widest">35MM REEL</span>
              </span>
            )}
          </div>
        </div>

        {/* Center: Awwwards Cyberpunk HUD Equalizer & 120 FPS Badge */}
        <div className="hidden lg:flex items-center gap-3 font-mono text-[10px] text-neutral-400">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-neutral-300 tracking-wider">REC [●] 120 FPS</span>
            <span className="text-neutral-600">•</span>
            <span className="text-amber-400">FR.{frameNumber.toString().padStart(4, '0')}</span>
          </div>

          {/* Dynamic Audio Visualizer Bar Monitor */}
          <div className="flex items-end gap-1 h-3.5 px-2 py-0.5 rounded bg-black/60 border border-white/10">
            <div className={`w-0.5 bg-amber-400 rounded-full transition-all duration-75 ${!isAudioMuted && elapsedTime >= 3.05 && elapsedTime < 7.8 ? 'h-3 animate-pulse' : 'h-1'}`} />
            <div className={`w-0.5 bg-cyan-400 rounded-full transition-all duration-75 ${!isAudioMuted && elapsedTime >= 3.05 && elapsedTime < 7.8 ? 'h-3.5 animate-bounce' : 'h-1.5'}`} />
            <div className={`w-0.5 bg-amber-300 rounded-full transition-all duration-75 ${!isAudioMuted && elapsedTime >= 3.05 && elapsedTime < 7.8 ? 'h-2 animate-ping' : 'h-1'}`} />
            <div className={`w-0.5 bg-rose-400 rounded-full transition-all duration-75 ${!isAudioMuted && elapsedTime >= 3.05 && elapsedTime < 7.8 ? 'h-2.5' : 'h-1'}`} />
          </div>
        </div>

        {/* Right: Technical Metadata & Skip Button */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-neutral-400 bg-black/40 px-3 py-1 rounded-md border border-white/5">
            <Terminal className="w-3 h-3 text-amber-400/80" />
            <span>{currentShot.telemetry.frameCode}</span>
          </div>

          <button
            onClick={handleSkip}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-white/15 text-xs font-mono text-neutral-200 hover:text-white transition-all backdrop-blur-md group shadow-lg"
          >
            <span className="tracking-wider">SKIP INTRO</span>
            <span className="text-[10px] text-neutral-500 group-hover:text-amber-400 transition-colors">[ESC]</span>
            <X className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
          </button>
        </div>
      </header>

      {/* --------------------------------------------------------- */}
      {/* 2. CINEMATIC STAGE VIEWPORT (THE BLACK BOX TRANSCRIPT)    */}
      {/* --------------------------------------------------------- */}
      <main className="relative flex-1 flex items-center justify-center overflow-hidden w-full">
        {/* Subtle Ambient Vignette & Portrait-Derived Midnight Slate Studio Glow */}
        <div className="absolute inset-0 bg-gradient-radial from-[#142334] via-[#0c1926] to-[#081018] opacity-85 pointer-events-none" />

        {/* Optional 35mm Warm Archival Atmosphere during Photography Montage */}
        {isFilmSequence && (
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
            style={{
              opacity: 0.35 * filmGradualFactor,
              background: 'radial-gradient(ellipse at center, rgba(42, 32, 22, 0.45) 0%, rgba(20, 18, 16, 0.25) 60%, transparent 100%)'
            }}
          />
        )}

        {/* ======================================================== */}
        {/* ACT 0: DARKNESS & ANTICIPATION (00:00.0 – 00:01.6)      */}
        {/* ======================================================== */}
        {currentShot.type === 'anticipation' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/95">
            {/* Concentric Calibration Reticle */}
            <div className="relative flex items-center justify-center">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-amber-400/20 border-dashed animate-spin [animation-duration:20s]" />
              <div className="absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-cyan-400/15" />
              <div className="absolute w-24 h-24 rounded-full border border-amber-400/40 animate-ping [animation-duration:2s]" />
              
              {/* Tactical Crosshair */}
              <div className="absolute w-12 h-0.5 bg-amber-400/40" />
              <div className="absolute h-12 w-0.5 bg-amber-400/40" />

              {/* Pulsing Core Dot */}
              <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_24px_rgba(245,158,11,1)] animate-pulse" />
            </div>

            {/* Boot Telemetry */}
            <div className="mt-8 flex flex-col items-center space-y-2 text-center">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-amber-400 tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>SYSTEM CALIBRATION // KINETIC ENGINE ENGAGED</span>
              </div>
              <p className="font-mono text-xs text-neutral-500 tracking-wider">
                TRANSMISSION INITIALIZED • 1.6s COUNTDOWN
              </p>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* ACT I: FLOW VIDEO LAYER (01_mechanical_key, 02_piano, 03_bronze) */}
        {/* ======================================================== */}
        {currentShot.type === 'flow-video' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black transition-opacity duration-300">
            {/* Shot 01: 01_mechanical_key.mp4 */}
            <video
              ref={flowVideo1Ref}
              src="/videos/flow/01_mechanical_key.mp4"
              muted
              playsInline
              preload="auto"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
                currentShot.id === 'shot-01' ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />

            {/* Shot 02: 02_piano.mp4 */}
            <video
              ref={flowVideo2Ref}
              src="/videos/flow/02_piano.mp4"
              muted
              playsInline
              preload="auto"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
                currentShot.id === 'shot-02' ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />

            {/* Shot 03: 03_bronze.mp4 */}
            <video
              ref={flowVideo3Ref}
              src="/videos/flow/03_bronze.mp4"
              muted
              playsInline
              preload="auto"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
                currentShot.id === 'shot-03' ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />

            {/* Black Box Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
            <div className="absolute inset-0 bg-black/25 pointer-events-none" />
          </div>
        )}

        {/* ======================================================== */}
        {/* ACT II – VI: REAL-LIFE AUTHENTIC PHOTOGRAPHS               */}
        {/* (Vertical, Landscape, Square with Museum 35mm Mounting)    */}
        {/* ======================================================== */}
        {currentShot.type !== 'flow-video' && currentShot.type !== 'anticipation' && (
          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
            {/* Ambient Blurred Aura behind photo (Sampled to harmonize with image colors) */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-25">
              <img
                src={currentShot.mediaSrc}
                alt=""
                className="w-full h-full object-cover blur-3xl scale-125"
              />
              <div className="absolute inset-0 bg-[#081018]/65" />
            </div>

            {/* Authentic Photographic Stage Container with Fast-Paced Cinematic Cut & Gate Weave */}
            <div
              key={currentShot.id}
              className={`relative z-20 flex flex-col items-center justify-center max-h-[75vh] w-auto cinematic-cut-active ${
                rgbSplit ? 'rgb-split-active' : ''
              } ${zoomSnap ? 'zoom-snap-active' : ''} ${
                isFilmSequence ? 'film-gate-weave film-projector-flicker' : ''
              }`}
            >
              {/* Aged Bronze Corner Calibration Marks */}
              <div className="absolute -top-3 -left-3 text-amber-400 font-mono text-xs select-none shadow-sm">┌ [ + ]</div>
              <div className="absolute -top-3 -right-3 text-amber-400 font-mono text-xs select-none shadow-sm">[ + ] ┐</div>
              <div className="absolute -bottom-3 -left-3 text-amber-400 font-mono text-xs select-none shadow-sm">└ [ + ]</div>
              <div className="absolute -bottom-3 -right-3 text-amber-400 font-mono text-xs select-none shadow-sm">[ + ] ┘</div>

              {/* The Authentic Photo with Atmospheric Edge Dissolve & Restored 35mm Archival Mounting */}
              <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 shadow-[0_0_80px_rgba(8,16,24,0.95)] bg-[#081018] group">
                {/* 35mm Archival Celluloid Datum Stamp Header */}
                {isFilmSequence && (
                  <div className="hidden sm:flex items-center justify-between text-[8px] font-mono tracking-[0.25em] text-amber-500/50 uppercase py-1 px-3.5 border-b border-amber-500/15 bg-black/60 backdrop-blur-md">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-amber-400/80" />
                      EASTMAN 5219 ARCHIVE
                    </span>
                    <span>35MM CELLULOID // 24 FPS</span>
                    <span>SAFETY FILM • REEL 02</span>
                  </div>
                )}

                {/* The Source Photograph (100% Authentic Content & Natural Colors Preserved) */}
                <img
                  src={currentShot.mediaSrc}
                  alt={currentShot.title}
                  style={{
                    filter: isFilmSequence
                      ? 'sepia(0.04) contrast(1.03) brightness(1.01)'
                      : 'none',
                  }}
                  className={`max-h-[60vh] sm:max-h-[64vh] w-auto object-contain transition-transform duration-500 ${
                    currentShot.type === 'reveal' ? 'scale-100 hover:scale-102' : 'scale-[1.01]'
                  }`}
                />

                {/* Subtle Organic Dust Specks during 35mm Film Sequence */}
                {isFilmSequence && (
                  <>
                    <div className="film-dust-1 absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-amber-200/30 pointer-events-none blur-[0.5px]" />
                    <div className="film-dust-2 absolute bottom-1/3 right-1/3 w-1 h-1 rounded-full bg-white/25 pointer-events-none blur-[0.5px]" />
                    <div className="film-scratch-hairline absolute inset-y-0 right-10 w-[0.75px] bg-gradient-to-b from-transparent via-amber-200/15 to-transparent pointer-events-none" />
                  </>
                )}

                {/* Subtle Radial Edge Vignette dissolving smoothly into the #081018 slate website canvas */}
                <div 
                  className="pointer-events-none absolute inset-0 rounded-2xl" 
                  style={{
                    background: 'radial-gradient(ellipse at center, transparent 65%, rgba(8, 16, 24, 0.45) 88%, rgba(8, 16, 24, 0.85) 100%)'
                  }}
                />

                {/* Subtle Editorial Technical Tape / Watermark */}
                <div className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-amber-400/90 tracking-widest uppercase">
                  {currentShot.telemetry.aspectRatio}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* EDITORIAL LOWER THIRD TYPOGRAPHIC LOCKUP                 */}
        {/* (Positioned gracefully so as not to obstruct faces)      */}
        {/* ======================================================== */}
        <div
          key={`lower-${currentShot.id}`}
          className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-30 flex flex-col items-center text-center px-4 max-w-4xl mx-auto space-y-2 pointer-events-none cinematic-cut-active typo-slam-active"
        >
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-amber-500/30 text-[10px] sm:text-[11px] font-mono tracking-widest text-amber-300 uppercase shadow-xl">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{currentShot.badge}</span>
            <span className="text-neutral-500">•</span>
            <span className="text-neutral-400">{currentShot.telemetry.spec}</span>
          </div>

          {/* Main Kinetic Headline */}
          <h1 className={`font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight uppercase ${currentShot.accentColor} drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]`}>
            {currentShot.title}
          </h1>

          {/* Editorial Subtitle */}
          <p className="font-mono text-xs sm:text-sm md:text-base text-neutral-200 tracking-wider bg-black/70 px-4 py-1 rounded-full backdrop-blur-md border border-white/10 max-w-2xl">
            {currentShot.subtitle}
          </p>
        </div>
      </main>

      {/* --------------------------------------------------------- */}
      {/* 3. BOTTOM SCRUBBER & ACT PROGRESSION                      */}
      {/* --------------------------------------------------------- */}
      <footer className="relative z-40 pb-5 px-6 space-y-2.5 bg-gradient-to-t from-[#081018] to-transparent border-t border-white/5">
        {/* Act Chips & Timecode Display */}
        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <div className="flex items-center gap-1 sm:gap-2.5 overflow-x-auto py-1">
            <span className={`px-2 py-0.5 rounded text-[10px] ${elapsedTime < 0.5 ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-500'}`}>
              00 VOID
            </span>
            <span className="text-neutral-700">/</span>
            <span className={`px-2 py-0.5 rounded text-[10px] ${elapsedTime >= 0.5 && elapsedTime < 2.85 ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-500'}`}>
              01 FLOW
            </span>
            <span className="text-neutral-700">/</span>
            <span className={`px-2 py-0.5 rounded text-[10px] ${elapsedTime >= 2.85 && elapsedTime < 4.65 ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-500'}`}>
              02 ARENA
            </span>
            <span className="text-neutral-700">/</span>
            <span className={`px-2 py-0.5 rounded text-[10px] ${elapsedTime >= 4.65 && elapsedTime < 6.65 ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-500'}`}>
              03 FORGE
            </span>
            <span className="text-neutral-700">/</span>
            <span className={`px-2 py-0.5 rounded text-[10px] ${elapsedTime >= 6.65 && elapsedTime < 7.80 ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-500'}`}>
              04 ARTS
            </span>
            <span className="text-neutral-700">/</span>
            <span className={`px-2 py-0.5 rounded text-[10px] ${elapsedTime >= 7.80 && elapsedTime < 8.60 ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-500'}`}>
              05 VAULT
            </span>
            <span className="text-neutral-700">/</span>
            <span className={`px-2 py-0.5 rounded text-[10px] ${elapsedTime >= 8.60 ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-500'}`}>
              06 REVEAL
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-amber-400 font-bold">
              00:{Math.floor(elapsedTime).toString().padStart(2, '0')}.{Math.floor((elapsedTime % 1) * 100).toString().padStart(2, '0')}s
            </span>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-500">00:11.20s</span>
          </div>
        </div>

        {/* 2px Aged Bronze & Amber High-Precision Progress Bar */}
        <div className="w-full bg-neutral-900/80 h-1.5 rounded-full overflow-hidden border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 transition-all duration-75 ease-linear shadow-[0_0_12px_rgba(245,158,11,0.6)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </footer>
    </div>
  );
};
