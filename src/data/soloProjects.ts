import { SoloProject } from '../types';

export const soloProjectsData: SoloProject[] = [
  {
    id: 'fasal-niti-website',
    title: 'Fasal Niti Website',
    tagline: 'Personally Engineered and Developed by Sahaj',
    description: 'The complete web platform for Fasal Niti. Developed, designed, and deployed 100% solo by Sahaj as an individual engineering milestone, without any team collaboration.',
    isSoleCreator: true,
    attributionText: '100% Individually Built & Coded by Sahaj (Zero Team Collaboration)',
    technologies: ['HTML', 'JavaScript', 'CSS', 'Responsive Architecture', 'DOM Scripting'],
    architectureOverview: 'Independently architected with semantic HTML layout hierarchies, responsive viewport structures, customized interface styling, and interactive client-side logic.',
    challengesSolved: [
      'Engineered clean responsive layouts and mobile-first interface styling',
      'Implemented intuitive navigation and DOM event handling',
      'Managed all asset optimization, cross-device testing, and production deployment',
    ],
    liveUrl: 'https://prototype-fasalniti.vercel.app/',
    previewImage: '/photos/previews/fasal_niti_preview.png',
    repoUrl: '#',
    featured: true,
  },
];
