export interface CommandItem {
  id: string;
  command: string; // e.g. '/home'
  title: string;
  description: string;
  category: 'navigation' | 'dimension';
  targetId?: string; // HTML section ID, e.g. 'top'
  isSecret?: boolean;
  keywords: string[];
}

export const AFTER_HOURS_COMMANDS: CommandItem[] = [
  {
    id: 'cmd-home',
    command: '/home',
    title: 'Return to Homepage',
    description: 'Navigate to the Monolith Stage & monumental hero identity.',
    category: 'navigation',
    targetId: 'top',
    keywords: ['home', 'hero', 'start', 'top', 'monolith', 'sahaj', 'portrait'],
  },
  {
    id: 'cmd-about',
    command: '/about',
    title: 'Explore Who I Am',
    description: 'Living archives, classical piano, theatrical roots & biographical narrative.',
    category: 'navigation',
    targetId: 'living-archives',
    keywords: ['about', 'bio', 'whoami', 'story', 'journey', 'living', 'archives', 'identity'],
  },
  {
    id: 'cmd-ventures',
    command: '/ventures',
    title: 'Explore My Ventures',
    description: 'Drusavi, Nyay Link, Fasal Niti, and Less Go startup portfolio.',
    category: 'navigation',
    targetId: 'ventures',
    keywords: ['ventures', 'startups', 'drusavi', 'nyay link', 'fasal niti', 'less go', 'founder', 'business'],
  },
  {
    id: 'cmd-achievements',
    command: '/achievements',
    title: 'Explore Hackathons & Competitions',
    description: 'The Arena, podium finishes, IEEE, Hacktober, SIH, and CodeHack.',
    category: 'navigation',
    targetId: 'hackathons',
    keywords: ['achievements', 'hackathons', 'arena', 'competitions', 'awards', 'podium', 'ieee', 'codehack', 'sih', 'showcase'],
  },
  {
    id: 'cmd-creative',
    command: '/creative',
    title: 'Explore Creative Interests',
    description: 'The Dual Horizon: classical piano, vocal performance, and stage direction.',
    category: 'navigation',
    targetId: 'cultural-studio',
    keywords: ['creative', 'arts', 'music', 'piano', 'singing', 'theatre', 'vocal', 'poetry', 'unsaid', 'culture'],
  },
  {
    id: 'cmd-secret',
    command: '/secret',
    title: 'Enter the Hidden Dimension',
    description: "Cross into After Hours. There's more beneath the surface.",
    category: 'dimension',
    isSecret: true,
    keywords: ['secret', 'after hours', 'hidden', 'dimension', 'dark', 'night', 'underground', 'matrix', 'easter egg'],
  },
];

