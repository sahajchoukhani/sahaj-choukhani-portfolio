export interface Startup {
  id: string;
  name: string;
  role: 'Founder' | 'Co-Founder' | 'Core Member';
  category?: string;
  tagline?: string;
  description: string;
  personalContribution?: string; // e.g. "Personally built and developed the complete website"
  teamSize?: string; // e.g. "10–15 people", "8–9 people", "8 people"
  technologies?: string[];
  logoUrl?: string;
  websiteUrl?: string;
  previewImage?: string;
  hasGenuineImage?: boolean;
  eventName?: string; // e.g. "Construct Hackathon" or "SEVA"
  socialUrl?: string;
  brandSpellingNote?: string;
}

export interface ArchiveProject {
  id: string;
  title: string;
  role: string;
  eventOrContext?: string; // e.g. "Construct Hackathon", "SEVA", "Personal Web Experience"
  category: string;
  url?: string;
  previewImage?: string;
  hasGenuineImage: boolean;
  tagline: string;
  description: string;
  technologies: string[];
  isSoloBuilt?: boolean;
}

export type CompetitionSubdivision = 
  | 'podium' 
  | 'finalist' 
  | 'completed' 
  | 'upcoming';

export type EventType = 'Hackathon' | 'Business Competition' | 'Innovation Event';

export interface HackathonProject {
  id: string;
  eventName: string;
  eventType?: EventType;
  type: 'Hackathon' | 'Business Competition' | 'SIH' | 'Innovation Event';
  subdivision?: CompetitionSubdivision;
  year?: string;
  projectName?: string;
  isVictory: boolean;
  isPodium?: boolean;
  isPending?: boolean;
  awardTitle?: string;
  outcomeStatus?: string;
  associatedVentureOrIdea?: string; // e.g. "Fasal Niti" or "Nyay Link"
  isSIH?: boolean;
  sihDetails?: {
    edition: string;
    projectName: string;
    statusNote: string;
  };
  collaboratorsNote: string;
  myRoleAndContribution: string;
  technologies: string[];
  description: string;
  organizerInstitution?: string;
  isPremierInstitution?: boolean;
  evidenceNote?: string;
  evidenceScreenshot?: string;
  liveLink?: string;
  previewImage?: string;
  hasGenuineImage?: boolean;
  notes?: string;
  needsConfirmation?: string;
}

export interface SoloProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  isSoleCreator: true;
  attributionText: string;
  technologies: string[];
  architectureOverview: string;
  challengesSolved: string[];
  liveUrl?: string;
  repoUrl?: string;
  previewImage?: string;
  featured: boolean;
}

export interface CreativeArtItem {
  id: string;
  category: 'Piano' | 'Vocal' | 'Theatre' | 'Creative Direction';
  title: string;
  accolade?: string; // "Gold Medalist", "3rd Place Podium"
  description: string;
  mediaType: 'audio' | 'video' | 'gallery';
  audioSnippetUrl?: string;
  videoUrl?: string;
  tags: string[];
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    level: string;
    highlight?: boolean;
    icon?: string;
  }[];
}

