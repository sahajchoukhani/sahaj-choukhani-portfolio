import React, { useState, useEffect } from 'react';
import { X, BookOpen, Clock, ChevronRight, ChevronLeft, Bookmark, ArrowLeft, ArrowRight, Type } from 'lucide-react';
import { Story } from '../data/culturalStudio';
import { sound } from '../services/soundEngine';

interface StoryReaderModalProps {
  story: Story | null;
  onClose: () => void;
}

export const StoryReaderModal: React.FC<StoryReaderModalProps> = ({ story, onClose }) => {
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [fontSize, setFontSize] = useState<'standard' | 'large'>('standard');

  useEffect(() => {
    if (story) {
      sound.playModalWhoosh();
      setCurrentChapterIdx(0);
    }
  }, [story]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!story) return null;

  const currentChapter = story.chapters[currentChapterIdx] || story.chapters[0];
  const totalChapters = story.chapters.length;

  const handleNextChapter = () => {
    if (currentChapterIdx < totalChapters - 1) {
      sound.playTactileClick();
      setCurrentChapterIdx(currentChapterIdx + 1);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterIdx > 0) {
      sound.playTactileClick();
      setCurrentChapterIdx(currentChapterIdx - 1);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fadeIn cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl h-[94vh] glass-panel-elevated rounded-3xl border border-white/15 shadow-2xl flex flex-col overflow-hidden cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Reading Bar & Progress */}
        <div className="bg-neutral-900/90 border-b border-white/10 px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm sm:text-base text-white line-clamp-1">
                {story.title}
              </h3>
              <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
                <Clock className="w-3 h-3" />
                <span>{story.estimatedReadTime}</span>
                <span>&bull;</span>
                <span className="text-amber-400">
                  Chapter {currentChapterIdx + 1} of {totalChapters}
                </span>
              </div>
            </div>
          </div>

          {/* Right Controls: Font size toggle + Close */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playTactileClick();
                setFontSize(fontSize === 'standard' ? 'large' : 'standard');
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors flex items-center gap-1 text-xs font-mono"
              title="Toggle Font Size"
            >
              <Type className="w-3.5 h-3.5" />
              <span>{fontSize === 'standard' ? 'A+' : 'A-'}</span>
            </button>

            <button
              onClick={() => {
                sound.playTactileClick();
                onClose();
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
              aria-label="Close reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar Indicator */}
        <div className="w-full bg-neutral-800 h-1">
          <div 
            className="bg-gradient-to-r from-amber-500 to-yellow-400 h-1 transition-all duration-300"
            style={{ width: `${((currentChapterIdx + 1) / totalChapters) * 100}%` }}
          />
        </div>

        {/* Main Content Area (Split into Chapter Drawer & Text Body) */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Chapter Selector Drawer (Desktop Sidebar) */}
          <div className="hidden md:block md:col-span-4 lg:col-span-3 border-r border-white/10 p-5 overflow-y-auto bg-black/40">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-4">
              TABLE OF CHAPTERS
            </span>
            <div className="space-y-2">
              {story.chapters.map((ch, idx) => (
                <button
                  key={ch.chapterNumber}
                  onClick={() => {
                    sound.playTactileClick();
                    setCurrentChapterIdx(idx);
                  }}
                  className={`w-full text-left p-3 rounded-xl text-xs font-mono transition-all flex items-start justify-between gap-2 ${
                    currentChapterIdx === idx
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                      : 'text-neutral-400 hover:bg-white/5 hover:text-neutral-200'
                  }`}
                >
                  <span className="line-clamp-2">{ch.chapterTitle}</span>
                  {currentChapterIdx === idx && (
                    <Bookmark className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  )}
                </button>
              ))}
            </div>

            {/* Author's Note */}
            <div className="mt-8 p-4 rounded-xl bg-neutral-900/60 border border-white/5 text-[11px] text-neutral-400 leading-relaxed font-sans">
              <span className="text-amber-400 font-mono text-[10px] uppercase block mb-1">
                Narrative Context
              </span>
              {story.authorNote}
            </div>
          </div>

          {/* Chapter Text Body */}
          <div className="col-span-1 md:col-span-8 lg:col-span-9 p-6 sm:p-12 overflow-y-auto max-h-full">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Chapter Header */}
              <div className="pb-6 border-b border-white/10">
                <span className="text-xs font-mono text-amber-400 tracking-widest uppercase block mb-1">
                  CHAPTER {currentChapter.chapterNumber}
                </span>
                <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
                  {currentChapter.chapterTitle}
                </h2>
              </div>

              {/* Paragraphs with Book Drop-Cap on first paragraph */}
              <div className={`space-y-6 text-neutral-200 font-sans leading-relaxed ${
                fontSize === 'large' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
              }`}>
                {currentChapter.content.map((paragraph, pIdx) => (
                  <p 
                    key={pIdx}
                    className={
                      paragraph.startsWith('[Sahaj:') 
                        ? 'p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs font-mono text-amber-300 leading-relaxed' 
                        : 'text-neutral-200 tracking-wide'
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Mobile Chapter Navigation Footer */}
              <div className="pt-10 border-t border-white/10 flex items-center justify-between gap-4">
                <button
                  onClick={handlePrevChapter}
                  disabled={currentChapterIdx === 0}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono transition-all ${
                    currentChapterIdx === 0
                      ? 'opacity-30 cursor-not-allowed text-neutral-500'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous Chapter</span>
                </button>

                <button
                  onClick={handleNextChapter}
                  disabled={currentChapterIdx === totalChapters - 1}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all ${
                    currentChapterIdx === totalChapters - 1
                      ? 'opacity-30 cursor-not-allowed text-neutral-500'
                      : 'bg-amber-400 hover:bg-amber-300 text-neutral-950 shadow-md'
                  }`}
                >
                  <span>Next Chapter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

