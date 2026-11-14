import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../../services/soundEngine';
import { Sparkles, Music, Volume2 } from 'lucide-react';

interface PianoKey {
  note: string;
  freq: number;
  isBlack: boolean;
  keyChar: string;
  offset?: string;
}

const PIANO_KEYS: PianoKey[] = [
  { note: 'C4', freq: 261.63, isBlack: false, keyChar: 'A' },
  { note: 'C#4', freq: 277.18, isBlack: true, keyChar: 'W', offset: 'left-[22px]' },
  { note: 'D4', freq: 293.66, isBlack: false, keyChar: 'S' },
  { note: 'D#4', freq: 311.13, isBlack: true, keyChar: 'E', offset: 'left-[58px]' },
  { note: 'E4', freq: 329.63, isBlack: false, keyChar: 'D' },
  { note: 'F4', freq: 349.23, isBlack: false, keyChar: 'F' },
  { note: 'F#4', freq: 369.99, isBlack: true, keyChar: 'T', offset: 'left-[130px]' },
  { note: 'G4', freq: 392.00, isBlack: false, keyChar: 'G' },
  { note: 'G#4', freq: 415.30, isBlack: true, keyChar: 'Y', offset: 'left-[166px]' },
  { note: 'A4', freq: 440.00, isBlack: false, keyChar: 'H' },
  { note: 'A#4', freq: 466.16, isBlack: true, keyChar: 'U', offset: 'left-[202px]' },
  { note: 'B4', freq: 493.88, isBlack: false, keyChar: 'J' },
  { note: 'C5', freq: 523.25, isBlack: false, keyChar: 'K' },
  { note: 'C#5', freq: 554.37, isBlack: true, keyChar: 'O', offset: 'left-[274px]' },
  { note: 'D5', freq: 587.33, isBlack: false, keyChar: 'L' },
];

interface InteractivePianoKeyboardProps {
  onNotePlay?: (note: string, freq: number) => void;
}

export const InteractivePianoKeyboard: React.FC<InteractivePianoKeyboardProps> = ({ onNotePlay }) => {
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());
  const [lastPlayedNote, setLastPlayedNote] = useState<string>('C4');

  const playNote = useCallback((note: string, freq: number) => {
    sound.playPianoKeyNote(freq, 1.8);
    setLastPlayedNote(note);
    setActiveNotes((prev) => new Set(prev).add(note));
    onNotePlay?.(note, freq);

    setTimeout(() => {
      setActiveNotes((prev) => {
        const next = new Set(prev);
        next.delete(note);
        return next;
      });
    }, 280);
  }, [onNotePlay]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid firing when typing inside an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      const key = e.key.toUpperCase();
      const match = PIANO_KEYS.find((k) => k.keyChar === key);
      if (match && !e.repeat) {
        playNote(match.note, match.freq);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playNote]);

  const whiteKeys = PIANO_KEYS.filter((k) => !k.isBlack);
  const blackKeys = PIANO_KEYS.filter((k) => k.isBlack);

  return (
    <div className="w-full p-4 sm:p-6 rounded-2xl bg-neutral-950/80 border border-amber-500/30 backdrop-blur-xl shadow-2xl space-y-4">
      {/* Keyboard Header & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Music className="w-4 h-4 text-amber-400" />
          <span className="font-mono text-xs uppercase tracking-wider text-amber-300 font-bold">
            ACOUSTIC HAMMER KEYBOARD &bull; C4–D5 HARMONIC WIRE
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
          <span>LAST STRUCK: <strong className="text-amber-400">{lastPlayedNote}</strong></span>
          <span className="text-neutral-600 hidden sm:inline">|</span>
          <span className="text-[11px] text-neutral-500 hidden sm:inline">PRESS KEYS [A..L] OR TAP</span>
        </div>
      </div>

      {/* Realistic Piano Keyboard Stage */}
      <div className="relative flex justify-center py-2 overflow-x-auto scrollbar-none select-none">
        <div className="relative flex min-w-[325px] sm:min-w-[360px] h-[140px] sm:h-[160px] bg-neutral-900 rounded-b-xl p-1 shadow-[inset_0_4px_12px_rgba(0,0,0,0.9)]">
          {/* White Keys */}
          {whiteKeys.map((k) => {
            const isActive = activeNotes.has(k.note);
            return (
              <button
                key={k.note}
                onMouseDown={() => playNote(k.note, k.freq)}
                onTouchStart={(e) => {
                  e.preventDefault();
                  playNote(k.note, k.freq);
                }}
                className={`relative flex-1 h-full mx-[1.5px] rounded-b-lg flex flex-col justify-end items-center pb-2.5 transition-all duration-75 outline-none ${
                  isActive
                    ? 'bg-amber-100 shadow-[0_0_15px_rgba(245,158,11,0.6)] translate-y-1'
                    : 'bg-gradient-to-b from-[#e5e5e5] via-[#f8f8f8] to-[#ffffff] hover:bg-neutral-100 shadow-[0_4px_6px_rgba(0,0,0,0.5),inset_0_-2px_4px_rgba(0,0,0,0.2)]'
                }`}
                title={`Play ${k.note} (${k.keyChar})`}
                aria-label={`Piano key ${k.note}`}
              >
                <span className="font-mono text-[9px] font-bold text-neutral-800 pointer-events-none">
                  {k.keyChar}
                </span>
                <span className="font-mono text-[8px] text-neutral-400 pointer-events-none">
                  {k.note}
                </span>
              </button>
            );
          })}

          {/* Black Keys (Positioned absolutely over white keys) */}
          {blackKeys.map((k) => {
            const isActive = activeNotes.has(k.note);
            return (
              <button
                key={k.note}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  playNote(k.note, k.freq);
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  playNote(k.note, k.freq);
                }}
                style={{
                  left: k.offset?.includes('22px')
                    ? '7.2%'
                    : k.offset?.includes('58px')
                    ? '18.3%'
                    : k.offset?.includes('130px')
                    ? '40.6%'
                    : k.offset?.includes('166px')
                    ? '51.7%'
                    : k.offset?.includes('202px')
                    ? '62.8%'
                    : k.offset?.includes('274px')
                    ? '85.1%'
                    : '10%',
                }}
                className={`absolute top-1 w-[8.2%] h-[60%] z-20 rounded-b-md flex flex-col justify-end items-center pb-1.5 transition-all duration-75 outline-none ${
                  isActive
                    ? 'bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.9)] translate-y-0.5'
                    : 'bg-gradient-to-b from-[#222226] via-[#151518] to-[#09090b] border-t border-neutral-700 shadow-[0_4px_8px_rgba(0,0,0,0.8),inset_0_-1px_2px_rgba(255,255,255,0.15)] hover:bg-neutral-800'
                }`}
                title={`Play ${k.note} (${k.keyChar})`}
                aria-label={`Piano sharp key ${k.note}`}
              >
                <span className="font-mono text-[8px] font-bold text-amber-300 pointer-events-none">
                  {k.keyChar}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Acoustic Principle Explanation */}
      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-2 border-t border-white/5">
        <span className="text-amber-300/80">PHYSICAL FELT CONTACT &bull; 4 HARMONIC OVERTONES</span>
        <span className="text-neutral-500">1ST PLACE PIANO &amp; VOCAL RECITAL</span>
      </div>
    </div>
  );
};

