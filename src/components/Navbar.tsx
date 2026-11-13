import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck, Film, Sparkles, Compass } from 'lucide-react';
import { SoundToggle } from './SoundToggle';
import { sound } from '../services/soundEngine';

interface NavbarProps {
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReplayIntro }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('top');

  // Curated 5 Primary Exhibition Sectors (Clean & Uncluttered)
  const PRIMARY_SECTORS = [
    { id: 'ventures', index: '01', label: 'VENTURES', href: '#ventures' },
    { id: 'hackathons', index: '02', label: 'ARENA', href: '#hackathons' },
    { id: 'archive', index: '03', label: 'ARCHIVE', href: '#archive' },
    { id: 'cultural-studio', index: '04', label: 'DUAL HORIZON', href: '#cultural-studio' },
    { id: 'unsaid', index: '05', label: 'THE UNSAID', href: '#unsaid' },
  ];

  // Complete Exhibition Index for Full Drawer
  const FULL_INDEX = [
    { index: '00', label: 'THE MONOLITH STAGE', href: '#top' },
    { index: '01', label: 'VENTURES ATELIER', href: '#ventures' },
    { index: '02', label: 'THE ARENA (COMPETITIONS)', href: '#hackathons' },
    { index: '03', label: 'HACKATHON SHOWCASE (LIVE SITES)', href: '#hackathon-showcase' },
    { index: '04', label: 'SOLO ARCHITECTURE (FASAL NITI)', href: '#solo' },
    { index: '05', label: 'PROJECT ARCHIVE (LIVE EMBEDS)', href: '#archive' },
    { index: '06', label: '3D SPATIAL STUDIO (DIGITAL ME)', href: '#3d-gallery' },
    { index: '07', label: 'THE DUAL HORIZON (THEATRE & SOUND)', href: '#cultural-studio' },
    { index: '08', label: 'THE VAULT OF THE UNSAID (POETRY)', href: '#unsaid' },
    { index: '09', label: 'THE BLACK BOX (TERMINAL)', href: '#terminal' },
    { index: '10', label: 'TRANSMISSION & UPLINK', href: '#contact' },
  ];

  // Scrollspy to detect active section in viewport
  useEffect(() => {
    const sectionIds = [
      'top',
      'ventures',
      'hackathons',
      'hackathon-showcase',
      'solo',
      'archive',
      '3d-gallery',
      'cultural-studio',
      'unsaid',
      'terminal',
      'contact',
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY < 200) {
        setActiveSection('top');
        return;
      }

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.4 && rect.bottom >= windowHeight * 0.2) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    sound.playTactileClick();
    setMobileMenuOpen(false);

    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.slice(1);
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement | number, opts?: { offset?: number; duration?: number }) => void } }).__lenis;

      if (targetId === 'top') {
        if (lenis) {
          lenis.scrollTo(0, { duration: 1.2 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        if (lenis) {
          lenis.scrollTo(targetEl, { offset: -40, duration: 1.2 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const isSectorActive = (sectorId: string) => {
    if (sectorId === 'ventures') return activeSection === 'ventures' || activeSection === 'solo';
    if (sectorId === 'hackathons') return activeSection === 'hackathons';
    if (sectorId === 'archive') return activeSection === 'archive' || activeSection === '3d-gallery';
    if (sectorId === 'cultural-studio') return activeSection === 'cultural-studio';
    if (sectorId === 'unsaid') return activeSection === 'unsaid';
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#081018]/85 backdrop-blur-xl border-b border-white/[0.06] transition-all duration-300">
      <div className="max-w-[1720px] mx-auto h-16 sm:h-20 px-5 sm:px-10 lg:px-16 flex items-center justify-between">
        
        {/* Left: Architectural Exhibition Monogram */}
        <a
          href="#top"
          onClick={(e) => handleLinkClick(e, '#top')}
          onMouseEnter={() => sound.playHoverTone()}
          className="flex items-center gap-3 group shrink-0 select-none"
        >
          <div className="w-8 h-8 rounded-none border border-amber-500/40 bg-neutral-950 flex items-center justify-center text-white font-mono font-bold text-xs tracking-wider group-hover:border-amber-400 group-hover:bg-amber-400/10 transition-all shadow-inner">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-sm tracking-tight text-white group-hover:text-amber-400 transition-colors uppercase">
              SAHAJ
            </span>
            <span className="text-[9px] font-mono text-neutral-400 tracking-widest uppercase">
              MONOGRAPH &bull; 2026
            </span>
          </div>
        </a>

        {/* Center: Curated Exhibition Sectors (Minimalist & Clutter-Free) */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
          {PRIMARY_SECTORS.map((sector) => {
            const active = isSectorActive(sector.id);
            return (
              <a
                key={sector.id}
                href={sector.href}
                onClick={(e) => handleLinkClick(e, sector.href)}
                onMouseEnter={() => sound.playHoverTone()}
                className={`relative py-2 flex items-center gap-2 font-mono text-xs tracking-wider transition-all select-none group ${
                  active ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span className={`text-[10px] transition-colors ${active ? 'text-amber-400' : 'text-neutral-600 group-hover:text-neutral-400'}`}>
                  {sector.index}
                </span>
                <span>{sector.label}</span>
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 to-cyan-400" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Exhibition Controls (Prologue, Sound, Uplink & Menu) */}
        <div className="flex items-center gap-3 sm:gap-4">
          {onReplayIntro && (
            <button
              onClick={() => {
                sound.playTactileClick();
                onReplayIntro();
              }}
              onMouseEnter={() => sound.playHoverTone()}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-white/10 hover:border-amber-400/60 bg-white/[0.02] hover:bg-amber-400/5 text-neutral-300 hover:text-amber-400 font-mono text-[11px] tracking-wider transition-all"
              title="Watch 23.5s Cinematic Intro Montage"
            >
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span>PROLOGUE</span>
            </button>
          )}

          {/* Subtle After Hours Discovery Trigger (Desktop) */}
          <button
            onClick={() => {
              sound.playTactileClick();
              window.dispatchEvent(new CustomEvent('open-after-hours'));
            }}
            onMouseEnter={() => sound.playHoverTone()}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 border border-white/10 hover:border-amber-400/50 bg-white/[0.02] hover:bg-amber-400/5 text-neutral-400 hover:text-amber-300 font-mono text-[11px] tracking-wider transition-all select-none group"
            title="Open After Hours Command Interface (Cmd+K)"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60 group-hover:bg-amber-400 transition-colors animate-pulse" />
            <span className="hidden xl:inline text-neutral-400 group-hover:text-neutral-300">AFTER HOURS</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-[9px] text-neutral-400 group-hover:text-amber-300 font-sans font-semibold">
              ⌘K
            </kbd>
          </button>

          <SoundToggle />

          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            onMouseEnter={() => sound.playHoverTone()}
            className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 bg-neutral-100 hover:bg-amber-400 text-neutral-950 font-mono text-[11px] font-bold tracking-wider transition-all shadow-md group select-none"
          >
            <span>UPLINK</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Index Drawer Button (All Screens) */}
          <button
            onClick={() => {
              sound.playTactileClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            onMouseEnter={() => sound.playHoverTone()}
            className="px-3 py-1.5 border border-white/15 hover:border-white/40 bg-white/[0.04] text-neutral-200 hover:text-white font-mono text-[11px] tracking-widest flex items-center gap-2 transition-all"
            aria-label="Toggle exhibition index"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-amber-400" /> : <Menu className="w-4 h-4" />}
            <span className="hidden sm:inline">{mobileMenuOpen ? 'CLOSE' : 'INDEX'}</span>
          </button>
        </div>
      </div>

      {/* Full-Screen Architectural Exhibition Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 sm:top-20 bg-[#081018] border-b border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.98)] max-h-[85vh] overflow-y-auto animate-fadeIn select-none z-50">
          <div className="max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-16 py-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <Compass className="w-4 h-4 text-amber-400" />
                <span className="tracking-widest uppercase">EXHIBITION MONOGRAPH INDEX // 2026</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 border border-emerald-400/30">
                ALL SYSTEMS VERIFIED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {FULL_INDEX.map((item) => (
                <a
                  key={item.index}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  onMouseEnter={() => sound.playHoverTone()}
                  className="group flex items-center justify-between p-3.5 border border-white/5 hover:border-amber-400/40 bg-white/[0.02] hover:bg-white/[0.06] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-amber-400/70 group-hover:text-amber-400 font-bold">
                      {item.index}
                    </span>
                    <span className="font-mono text-xs text-neutral-200 group-hover:text-white tracking-wider">
                      {item.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 transition-colors" />
                </a>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                {onReplayIntro && (
                  <button
                    onClick={() => {
                      sound.playTactileClick();
                      setMobileMenuOpen(false);
                      onReplayIntro();
                    }}
                    className="flex items-center gap-2.5 px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-mono text-xs tracking-wider transition-all"
                  >
                    <Film className="w-4 h-4" />
                    <span>REPLAY 23.5s CINEMATIC PROLOGUE</span>
                    <Sparkles className="w-3.5 h-3.5 ml-1" />
                  </button>
                )}

                <button
                  onClick={() => {
                    sound.playTactileClick();
                    setMobileMenuOpen(false);
                    window.dispatchEvent(new CustomEvent('open-after-hours'));
                  }}
                  className="flex items-center gap-2.5 px-4 py-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/15 text-neutral-300 hover:text-amber-300 font-mono text-xs tracking-wider transition-all"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>AFTER HOURS PALETTE</span>
                  <span className="text-[10px] bg-white/[0.08] px-1.5 py-0.5 border border-white/10 rounded font-sans">⌘K</span>
                </button>
              </div>

              <div className="text-[11px] font-mono text-neutral-500 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>GROUND TRUTH: DRUSAVI &bull; NYAY LINK &bull; FASAL NITI &bull; LESS GO</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

