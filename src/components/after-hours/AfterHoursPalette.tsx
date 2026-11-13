import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  User, 
  Briefcase, 
  Trophy, 
  Music, 
  Sparkles, 
  Terminal, 
  X, 
  CornerDownLeft, 
  Compass, 
  ArrowRight
} from 'lucide-react';
import { CommandItem, AFTER_HOURS_COMMANDS } from './types';
import { sound } from '../../services/soundEngine';

interface AfterHoursPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onExecuteCommand: (command: CommandItem) => void;
}

const COMMAND_ICONS: Record<string, React.ReactNode> = {
  'cmd-home': <Home className="w-4 h-4 text-cyan-400" />,
  'cmd-about': <User className="w-4 h-4 text-emerald-400" />,
  'cmd-ventures': <Briefcase className="w-4 h-4 text-amber-400" />,
  'cmd-achievements': <Trophy className="w-4 h-4 text-orange-400" />,
  'cmd-creative': <Music className="w-4 h-4 text-purple-400" />,
  'cmd-secret': <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />,
};

export const AfterHoursPalette: React.FC<AfterHoursPaletteProps> = ({
  isOpen,
  onClose,
  onExecuteCommand,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Check reduced motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);
    }
  }, []);

  // Filter commands based on query
  const cleanQuery = query.trim().toLowerCase().replace(/^\//, '');
  const filteredCommands = AFTER_HOURS_COMMANDS.filter((cmd) => {
    if (!cleanQuery) return true;
    const cmdClean = cmd.command.replace(/^\//, '').toLowerCase();
    return (
      cmdClean.includes(cleanQuery) ||
      cmd.title.toLowerCase().includes(cleanQuery) ||
      cmd.description.toLowerCase().includes(cleanQuery) ||
      cmd.keywords.some((k) => k.toLowerCase().includes(cleanQuery))
    );
  });

  // Reset or constrain selected index
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input whenever opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Ensure active element is scrolled into view in list
  useEffect(() => {
    if (listRef.current && filteredCommands.length > 0) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement | undefined;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex, filteredCommands.length]);

  const handleSelect = (item: CommandItem) => {
    sound.playTactileClick();
    onExecuteCommand(item);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        sound.playHoverTone();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        sound.playHoverTone();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands.length > 0 && filteredCommands[selectedIndex]) {
        handleSelect(filteredCommands[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      sound.playTactileClick();
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    sound.playKeyClick();
    setQuery(e.target.value);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] sm:pt-[15vh] px-4 select-none"
          role="dialog"
          aria-modal="true"
          aria-label="After Hours Command Interface"
        >
          {/* Backdrop Blur & Atmospheric Veil */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isReducedMotion ? 0.05 : 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#05090f]/80 backdrop-blur-xl"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(20, 36, 52, 0.45) 0%, rgba(5, 9, 15, 0.85) 75%)',
            }}
          />

          {/* Micro-grain texture overlay */}
          <div className="fixed inset-0 bg-grain opacity-25 pointer-events-none mix-blend-overlay" />

          {/* Modal Command Card */}
          <motion.div
            initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: -8 }}
            animate={isReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: isReducedMotion ? 0.05 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#09111c] border border-white/15 rounded-xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden z-10 flex flex-col"
          >
            {/* Ambient Golden Top Hairline */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />

            {/* Header Telemetry Bar */}
            <div className="px-5 py-3.5 bg-[#0b1422] border-b border-white/[0.08] flex items-center justify-between text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-semibold text-neutral-200 tracking-wider">AFTER HOURS</span>
                <span className="text-neutral-600">//</span>
                <span className="text-neutral-400 text-[11px] tracking-widest uppercase">COMMAND MATRIX</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-[10px] text-neutral-500 uppercase tracking-wider">PRESS ESC TO CLOSE</span>
                <button
                  onClick={onClose}
                  className="p-1 rounded-md hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                  aria-label="Close Command Palette"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Input Omnibox Bar */}
            <div className="px-5 py-4 flex items-center gap-3 border-b border-white/[0.08] bg-[#070d16]">
              <Terminal className="w-5 h-5 text-amber-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type /home, /about, /ventures, /achievements, /creative, /secret..."
                className="w-full bg-transparent border-0 outline-none text-white font-mono text-sm sm:text-base placeholder:text-neutral-600 focus:ring-0 selection:bg-amber-400/20 selection:text-amber-200"
                autoComplete="off"
                spellCheck={false}
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  className="text-neutral-500 hover:text-neutral-300 text-xs font-mono px-1.5 py-0.5"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Command Results List */}
            <div 
              ref={listRef}
              className="max-h-[360px] overflow-y-auto p-2 space-y-1 divide-y divide-white/[0.03]"
            >
              {filteredCommands.length > 0 ? (
                filteredCommands.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => {
                        if (selectedIndex !== idx) {
                          sound.playHoverTone();
                          setSelectedIndex(idx);
                        }
                      }}
                      className={`group relative px-4 py-3 rounded-lg flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-white/[0.08] border border-amber-400/30' 
                          : 'hover:bg-white/[0.03] border border-transparent'
                      }`}
                    >
                      {/* Left: Icon & Command Information */}
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className={`p-2 rounded-md shrink-0 transition-colors ${
                          isSelected ? 'bg-amber-400/10 text-amber-300' : 'bg-white/[0.04] text-neutral-400'
                        }`}>
                          {COMMAND_ICONS[item.id] || <Compass className="w-4 h-4" />}
                        </div>

                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-1.5 py-0.2 rounded">
                              {item.command}
                            </span>
                            <span className={`text-xs sm:text-sm font-semibold truncate transition-colors ${
                              isSelected ? 'text-white' : 'text-neutral-200'
                            }`}>
                              {item.title}
                            </span>
                            {item.isSecret && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono tracking-widest uppercase bg-amber-400/20 text-amber-300 border border-amber-400/40 animate-pulse">
                                HIDDEN
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-neutral-400 truncate mt-0.5 font-sans">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Right: Enter Indicator */}
                      <div className="flex items-center gap-2 shrink-0">
                        {isSelected ? (
                          <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-amber-300 bg-amber-400/15 border border-amber-400/40 px-2 py-1 rounded">
                            <span>EXECUTE</span>
                            <CornerDownLeft className="w-3 h-3" />
                          </div>
                        ) : (
                          <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-12 px-6 text-center space-y-2">
                  <p className="text-neutral-400 font-mono text-xs tracking-wider">
                    NO MATCHING COMMAND DETECTED
                  </p>
                  <p className="text-neutral-600 text-xs">
                    Try typing <code className="text-amber-300">/home</code>, <code className="text-amber-300">/about</code>, <code className="text-amber-300">/ventures</code>, <code className="text-amber-300">/achievements</code>, <code className="text-amber-300">/creative</code>, or <code className="text-amber-300">/secret</code>
                  </p>
                </div>
              )}
            </div>

            {/* Footer Legend Bar */}
            <div className="px-5 py-2.5 bg-[#070d16] border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-neutral-400 text-[10px]">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-neutral-400 text-[10px]">↓</kbd>
                  <span className="hidden sm:inline">Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-neutral-400 text-[10px]">↵</kbd>
                  <span className="hidden sm:inline">Select</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-neutral-400 text-[10px]">ESC</kbd>
                  <span className="hidden sm:inline">Close</span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-neutral-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] tracking-widest uppercase">SYS ONLINE</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

