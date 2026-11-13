import { SkillCategory } from '../types';

export const confirmedTechnologies = [
  'JavaScript',
  'Python',
  'SQL',
  'MySQL',
  'HTML',
  'Bash',
] as const;

export const skillsData: SkillCategory[] = [
  {
    category: 'Confirmed Technical Stack',
    skills: [
      { name: 'JavaScript', level: 'Core Language', highlight: true },
      { name: 'Python', level: 'Core Language', highlight: true },
      { name: 'SQL', level: 'Relational Database Language', highlight: true },
      { name: 'MySQL', level: 'Database System', highlight: true },
      { name: 'HTML', level: 'Semantic Markup & Web', highlight: true },
      { name: 'Bash', level: 'Shell & Scripting', highlight: true },
    ],
  },
];

