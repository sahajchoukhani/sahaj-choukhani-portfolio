export interface StagePerformance {
  id: string;
  title: string;
  role: string;
  type: 'Theatre Production' | 'Mimicry & Impersonation' | 'Stage Monologue';
  accolade?: string; // e.g. "3rd Place — Dramatic Theatre Competition"
  description: string;
  characterAnalysis: string;
  ensembleSize?: string;
  imagePlaceholder?: string;
  tags: string[];
}

export interface SoundroomTrack {
  id: string;
  title: string;
  category: 'Classical Piano' | 'Vocal Artistry';
  accolade: string; // "🥇 Gold Medalist"
  composerOrStyle: string;
  duration: string;
  description: string;
  audioSource?: string; // Path in /07_Music_Sounds/ or procedural
  notes: string;
}

export interface Poem {
  id: string;
  title: string;
  isWorkingTitle?: boolean;
  author: string;
  themeDescription: string;
  stanzas: string[][];
  signature?: string;
  spokenWordAudio?: string;
  hasAudioRecording?: boolean;
  manuscriptImageUrl?: string;
}

export interface StoryChapter {
  chapterNumber: number;
  chapterTitle: string;
  content: string[]; // Array of paragraphs for clean typography
}

export interface Story {
  id: string;
  title: string;
  subtitle: string;
  genre: string;
  estimatedReadTime: string;
  synopsis: string;
  chapters: StoryChapter[];
  authorNote: string;
}

export interface VoiceLabClip {
  id: string;
  title: string;
  category: 'Dubbing' | 'Mimicry' | 'Voice Acting' | 'Voiceover';
  vocalTone: string; // e.g., "Deep Baritone", "Dynamic Cinematic", "Comedic Character"
  description: string;
  audioSample?: string;
  tags: string[];
}

// -------------------------------------------------------------
// 1. THE STAGE (Theatre, Acting & Mimicry)
// -------------------------------------------------------------
export const stagePerformancesData: StagePerformance[] = [
  {
    id: 'stage-theatre-competition',
    title: 'National-Level Dramatic Theatre Competition',
    role: 'Dramatic Actor & Stage Performer',
    type: 'Theatre Production',
    accolade: '🥉 3rd Place Podium — National Theatre Competition',
    description: 'Secured Third Position in a national-level collegiate dramatic theatre competition at an institution referred to as "Wutz University" (exact spelling pending confirmation). High-intensity stage presence, reactive dialogue, and dramatic character embodiment.',
    characterAnalysis: 'Explored character embodiment, complex dramatic tension, physical choreography, and reactive dialogue synchronization before a national adjudication panel.',
    ensembleSize: 'National Competition Cast',
    tags: ['National Competition', '3rd Place Podium', 'Character Embodiment', 'Dramatic Arts'],
  },
  {
    id: 'stage-swaran-theatre',
    title: 'Swaarang University Theatre Club Competitions',
    role: 'Theatre Actor & Club Ensemble Member',
    type: 'Theatre Production',
    accolade: 'Collegiate Competitor (Two Competitions)',
    description: 'Participated in two theatre competitions in association with university theatre club Swaarang, honing ensemble synchronization, script adaptation, and stagecraft.',
    characterAnalysis: 'Stage mechanics, vocal projection across live auditoriums, and disciplined ensemble timing with fellow Swaarang performers.',
    ensembleSize: 'Swaarang Theatre Club Cast',
    tags: ['Swaarang Club', 'University Competitions', 'Ensemble Acting', 'Stagecraft'],
  },
  {
    id: 'stage-mimicry-showcase',
    title: 'Character Vocal Mimicry & Presentation Feature',
    role: 'Vocal Modulation (Informal Creative Pursuit)',
    type: 'Mimicry & Impersonation',
    accolade: 'Presentation Feature & Creative Expression',
    description: 'Vocal mimicry practiced informally for personal enjoyment and creatively integrated into competitive presentations—including a presentation at IIM Bhubaneswar.',
    characterAnalysis: 'Phonetic nuances, celebrity and archetype inflections, comedic pacing, and rapid vocal transformations to bring presentation personas to life. (Practiced for personal enjoyment, not professional entertainment).',
    tags: ['Informal Mimicry', 'Voice Modulation', 'Pitching Impact', 'Personal Art'],
  },
];

// -------------------------------------------------------------
// 2. THE SOUNDROOM (Classical Piano & Vocals)
// -------------------------------------------------------------
export const soundroomTracksData: SoundroomTrack[] = [
  {
    id: 'piano-vocal-combined-win',
    title: 'Simultaneous Classical Piano & Vocal Performance',
    category: 'Classical Piano',
    accolade: '🥇 1st Place Winner — Simultaneous Piano & Singing',
    composerOrStyle: 'Dual Polyphonic & Vocal Mastery',
    duration: 'Competition Performance',
    description: 'Secured First Place in a performance competition singing and playing classical piano simultaneously. Requires dual split-brain independence, polyphonic counterpoint, and vocal diaphragm breath control.',
    notes: 'Single combined performance achievement (not two separate wins). Ready for personal recording.',
  },
];

// -------------------------------------------------------------
// 3. THE POETRY VAULT (Original Poetry & Literary Arts)
// -------------------------------------------------------------
export const poetryVaultData: Poem[] = [
  {
    id: 'a-restless-shelf',
    title: 'A Restless Shelf',
    isWorkingTitle: true,
    author: 'SAHAJ',
    themeDescription: 'recognition, comparison, ambition and becoming',
    signature: '~ SAHAJ',
    hasAudioRecording: false, // Spoken-word audio can be attached when recorded
    spokenWordAudio: undefined, // Path to file in /07_Music_Sounds/ e.g. '/sounds/a-restless-shelf.mp3'
    manuscriptImageUrl: undefined, // Path to scan in /01_My_Photos/
    stanzas: [
      [
        'Amidst four familiar voices, I thought I’d earned my place,',
        'Yet quiet choices shift the room without a word or trace.',
        'A name once spoken out of pride now lingers on a screen,',
        'And what I took for loyalty turns sharp with what it means.',
      ],
      [
        'I built a pedestal for someone, sang their praise out loud,',
        'Never thinking they’d outshine me in the very same crowd.',
        'I’ve worn the crown of little wins, mistaken noise for pride—',
        'Four trophies on a restless shelf, and emptiness inside.',
      ],
      [
        'The curtains rose, I found my lines, the applause came right along,',
        'Yet somewhere past the final act, I wondered where I belonged.',
        'I’ve chased a thousand open doors, mistaken drift for flight,',
        'Built castles out of borrowed dreams and claimed the stars as mine.',
      ],
      [
        'A venture still upon the clouds, all talk before the climb,',
        'While rank slips down the ledger and I’m running out of time.',
        'Perhaps I’m just an afterthought inside a closer plan,',
        'A little louder in my words than deeds, still learning who I am.',
      ],
      [
        'For what are all these victories if nothing makes me grow?',
        'And what is being someone, if there’s nothing real to show?',
        'So let the unsent words dissolve, let bitterness fade through—',
        'I have a little less to prove, and much more left to do.',
      ],
      [
        'And when the lights have settled and the crowd has walked away,',
        'I hope to be a person worth the things I dare to claim today.',
      ],
    ],
  },
];

// -------------------------------------------------------------
// 4. THE STORY ARCHIVE (Long-Form Stories & Chapter Reader)
// (Zero invented memoirs - structured chapter template awaiting Sahaj's writing)
// -------------------------------------------------------------
export const storyArchiveData: Story[] = [
  {
    id: 'story-the-renaissance-paradox',
    title: 'The Dual Realm: Between the Algorithm and the Stage',
    subtitle: 'Reflections on Entrepreneurship, Sound, and the Theatrical Mind',
    genre: 'Personal Narrative & Creative Non-Fiction',
    estimatedReadTime: '5 min read',
    authorNote: 'An essay narrative exploring the convergence of engineering discipline and artistic expression. Ready for Sahaj’s original text.',
    synopsis: 'A long-form reflection examining why the classical piano, the dramatic theatre stage, and the startup venture incubator are fundamentally the same discipline: the pursuit of resonance.',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'Chapter I: The Tuning of the Piano',
        content: [
          'In software engineering, we seek deterministic perfection. Every semicolon enforces law; every query in MySQL demands mathematical integrity. If a transaction fails, the rollback is absolute.',
          'Yet when your hands touch the ebony and ivory of a grand piano, you realize that perfection is not sterile. The music lives in the micro-variations—the half-second hesitation before a crescendo, the dynamic weight of the left hand beneath a floating melody.',
          '[Sahaj: You can add your full long-form paragraphs for Chapter 1 directly in src/data/culturalStudio.ts. The chapter reader formats them automatically with luxury editorial typography.]',
        ],
      },
      {
        chapterNumber: 2,
        chapterTitle: 'Chapter II: The Third Bell on Stage',
        content: [
          'Theatre teaches you something that a computer terminal never can: the terror and grace of immediate mortality. In code, you have version control; in git, you can revert a commit.',
          'On stage, once the third bell sounds and the stage lights blind your retinas, there is no backspace. You are bound to the living presence of your ensemble and the silence of three hundred people holding their breath.',
          '[Sahaj: Insert your verified story text for Chapter 2 in src/data/culturalStudio.ts.]',
        ],
      },
      {
        chapterNumber: 3,
        chapterTitle: 'Chapter III: The Venture Crucible',
        content: [
          'Building five startups is not a departure from the arts; it is the ultimate canvas. A venture requires the compositional foresight of a pianist, the vocal conviction of an actor, and the relentless logic of a system architect.',
          '[Sahaj: Insert your verified story text for Chapter 3 in src/data/culturalStudio.ts.]',
        ],
      },
    ],
  },
];

// -------------------------------------------------------------
// 5. THE VOICE LAB (Dubbing, Voice Acting & Mimicry)
// -------------------------------------------------------------
export const voiceLabData: VoiceLabClip[] = [
  {
    id: 'voice-dubbing-cinematic',
    title: 'Cinematic Dialogue & Dramatic Character Dubbing',
    category: 'Dubbing',
    vocalTone: 'Dramatic Resonance & Film Dialogue',
    description: 'Lip-sync accuracy, emotional pacing, breath matching, and dynamic voice acting for dramatic film characters and trailers.',
    tags: ['Film Dubbing', 'Lip-Sync Precision', 'Emotional Modulation'],
  },
  {
    id: 'voice-mimicry-impressions',
    title: 'Character Impersonations & Comic Mimicry',
    category: 'Mimicry',
    vocalTone: 'Diverse Accents, Pitch Shifting & Satire',
    description: 'Accurate acoustic vocal mimicry dissecting regional inflections, celebrity timbres, and rapid persona transitions.',
    tags: ['Mimicry', 'Dialects', 'Vocal Range', 'Impersonation'],
  },
  {
    id: 'voice-narrative-doc',
    title: 'Documentary & Audio Storytelling Voiceover',
    category: 'Voiceover',
    vocalTone: 'Warm Baritone & Narrative Authority',
    description: 'Measured, contemplative narration engineered for literary readings, documentary voice tracks, and spoken-word presentations.',
    tags: ['Narrative', 'Audiobooks', 'Warm Baritone', 'Spoken Word'],
  },
];

