import React from 'react';
import { Rocket, Trophy, Music, Award, ShieldCheck } from 'lucide-react';
import { CardSpotlight } from './ui/CardSpotlight';
import { sound } from '../services/soundEngine';

export const AccoladesTicker: React.FC = () => {
  const metrics = [
    {
      icon: Rocket,
      value: '04',
      label: 'Active Ventures',
      sublabel: 'Drusavi • Nyay Link • Fasal Niti • Less Go',
      accentColor: 'text-cyan-400',
      spotlightColor: 'rgba(0, 240, 255, 0.15)',
      borderColor: 'group-hover:border-cyan-500/50',
      href: '#ventures',
    },
    {
      icon: Trophy,
      value: 'Podiums',
      label: 'Podium Finishes',
      sublabel: 'MITS Gwalior (IEEE) • OP Jindal 1st • IIM Bhubaneswar',
      accentColor: 'text-amber-400',
      spotlightColor: 'rgba(245, 158, 11, 0.15)',
      borderColor: 'group-hover:border-amber-500/50',
      href: '#hackathons',
    },
    {
      icon: ShieldCheck,
      value: 'Finalist',
      label: 'National Selections',
      sublabel: 'IIT Delhi (Stratazenith) & CodeHack Finalist List',
      accentColor: 'text-violet-400',
      spotlightColor: 'rgba(138, 43, 226, 0.15)',
      borderColor: 'group-hover:border-violet-500/50',
      href: '#hackathons',
    },
    {
      icon: Music,
      value: '1st',
      label: 'Simultaneous Piano & Vocals',
      sublabel: '1st Place Winner — Combined Performance',
      accentColor: 'text-yellow-400',
      spotlightColor: 'rgba(234, 179, 8, 0.15)',
      borderColor: 'group-hover:border-yellow-500/50',
      href: '#cultural-studio',
    },
    {
      icon: Award,
      value: '3rd',
      label: 'National Theatre Podium',
      sublabel: '3rd Place in National Competition',
      accentColor: 'text-rose-400',
      spotlightColor: 'rgba(244, 63, 94, 0.15)',
      borderColor: 'group-hover:border-rose-500/50',
      href: '#cultural-studio',
    },
  ];

  return (
    <section id="accolades" className="py-12 border-y border-white/[0.06] bg-[#081018]/60 backdrop-blur-md px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {metrics.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className="block"
              >
                <CardSpotlight
                  color={item.spotlightColor}
                  radius={200}
                  onMouseEnter={() => sound.playHoverTone()}
                  className={`group glass-panel rounded-2xl p-5 border border-white/5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl h-full flex flex-col justify-between ${item.borderColor}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`font-display font-extrabold text-2xl sm:text-3xl tracking-tight ${item.accentColor}`}>
                        {item.value}
                      </span>
                      <div className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                        <Icon className={`w-5 h-5 ${item.accentColor}`} />
                      </div>
                    </div>
                    <h2 className="font-sans font-semibold text-sm text-neutral-100 group-hover:text-white transition-colors">
                      {item.label}
                    </h2>
                  </div>
                  <p className="text-[11px] font-mono text-neutral-400 mt-2 line-clamp-1">
                    {item.sublabel}
                  </p>
                </CardSpotlight>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

