import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  stagePerformancesData, 
  soundroomTracksData, 
  poetryVaultData, 
  storyArchiveData, 
  voiceLabData,
  Poem,
  Story
} from '../data/culturalStudio';
import { PoetryReaderModal } from './PoetryReaderModal';
import { StoryReaderModal } from './StoryReaderModal';
import { TheatreVideoPlayer } from './TheatreVideoPlayer';
import { AdaptiveEditorialPhoto } from './AdaptiveEditorialPhoto';
import { 
  Sparkles, 
  Theater, 
  Music, 
  BookOpen, 
  Feather, 
  Mic, 
  Award, 
  Play, 
  Pause, 
  Volume2, 
  ArrowRight, 
  Clock, 
  Camera, 
  Disc3 
} from 'lucide-react';
import { CardSpotlight } from './ui/CardSpotlight';
import { BorderBeam } from './ui/BorderBeam';
import { sound } from '../services/soundEngine';
import { AcousticWaveformVisualizer } from './cultural/AcousticWaveformVisualizer';

export const CulturalStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stage' | 'soundroom' | 'poetry' | 'stories' | 'voice'>('stage');
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  // Audio player state for soundroom / voice lab
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentTrackTitle, setCurrentTrackTitle] = useState('Classical Piano Repertoire & Recital');

  const tabs = [
    { id: 'stage', label: '1. The Stage', icon: Theater, count: 'Theatre & Mimicry' },
    { id: 'soundroom', label: '2. The Soundroom', icon: Music, count: 'Piano & Vocals' },
    { id: 'poetry', label: '3. Poetry Vault', icon: Feather, count: 'Anthology & Verses' },
    { id: 'stories', label: '4. Story Archive', icon: BookOpen, count: 'Long-Form Chapters' },
    { id: 'voice', label: '5. The Voice Lab', icon: Mic, count: 'Dubbing & Range' },
  ];

  const handlePlayTrack = (title: string) => {
    sound.playTactileClick();
    if (isPlayingAudio && currentTrackTitle === title) {
      setIsPlayingAudio(false);
    } else {
      setCurrentTrackTitle(title);
      setIsPlayingAudio(true);
      sound.playVictoryFanfare();
    }
  };

  const handleTabChange = (tabId: typeof activeTab) => {
    sound.playTactileClick();
    setActiveTab(tabId);
    switch (tabId) {
      case 'stage':
        sound.playTheatricalWarmSwell();
        break;
      case 'soundroom':
        sound.playPianoHammerStrike();
        break;
      case 'poetry':
        sound.playDeliberateMechanicalKey();
        break;
      case 'stories':
        sound.playTactileClick();
        break;
      case 'voice':
        sound.playCameraShutter();
        break;
    }
  };

  const getAmbientHalo = (tab: typeof activeTab) => {
    switch (tab) {
      case 'stage':
        return 'radial-gradient(circle at 50% 30%, rgba(245, 158, 11, 0.16) 0%, rgba(244, 63, 94, 0.08) 45%, transparent 70%)';
      case 'soundroom':
        return 'radial-gradient(circle at 50% 30%, rgba(56, 189, 248, 0.15) 0%, rgba(234, 179, 8, 0.08) 45%, transparent 70%)';
      case 'poetry':
        return 'radial-gradient(circle at 50% 30%, rgba(245, 158, 11, 0.08) 0%, rgba(12, 25, 38, 0.14) 50%, transparent 75%)';
      case 'stories':
        return 'radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.14) 0%, transparent 70%)';
      case 'voice':
        return 'radial-gradient(circle at 50% 30%, rgba(168, 85, 247, 0.16) 0%, rgba(0, 240, 255, 0.08) 45%, transparent 70%)';
    }
  };

  return (
    <section id="cultural-studio" className="py-28 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-24 relative overflow-hidden">
      {/* Background Ambient Glow (Responds to creative discipline) */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[550px] blur-[150px] pointer-events-none rounded-full transition-all duration-700 ease-out" 
        style={{ background: getAmbientHalo(activeTab) }}
      />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/40 border border-amber-500/40 text-xs font-mono text-amber-300 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>THE OTHER SIDE OF ME &bull; CULTURAL STUDIO</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            The Cultural Studio.
          </h2>
          <p className="text-sm font-sans text-neutral-400 italic mt-2">
            "Beyond the code: Where literature, performance, voice, and resonance dwell."
          </p>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-amber-500/20 max-w-md">
          <p className="text-xs text-neutral-300 font-sans leading-relaxed">
            An immersive arts pavilion spanning <strong className="text-amber-300">dramatic theatre</strong>, <strong className="text-amber-300">classical piano & vocals</strong>, original <strong className="text-amber-300">poetry</strong>, long-form <strong className="text-amber-300">stories</strong>, and <strong className="text-amber-300">character dubbing</strong>.
          </p>
        </div>
      </div>

      {/* Editorial Sub-Navigation Dock */}
      <div className="mb-14 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2.5 p-1.5 rounded-2xl glass-panel-elevated border border-white/10 w-fit min-w-full sm:min-w-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`cultural-tab-${tab.id}`}
                onClick={() => handleTabChange(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-400 text-neutral-950 font-bold shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-neutral-950' : 'text-amber-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Discipline Content with Dynamic Motion & Atmospheric Cadence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >

      {/* ------------------------------------------------------------- */}
      {/* 1. THE STAGE (Theatre, Acting & Mimicry) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'stage' && (
        <div className="space-y-8 animate-fadeIn">
          {/* PRIMARY MEDIA: Actual Theatre Performance Video Player */}
          <TheatreVideoPlayer />

          {/* Theatrical Context & Performance Chronicle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stagePerformancesData.map((item) => (
              <CardSpotlight 
                key={item.id} 
                color={item.id === 'stage-theatre-competition' ? 'rgba(244, 63, 94, 0.14)' : 'rgba(168, 85, 247, 0.14)'}
                radius={320}
                className="p-7 rounded-3xl glass-panel-elevated border border-white/10 hover:border-amber-400/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                      {item.type}
                    </span>
                    {item.accolade && (
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-semibold flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        {item.accolade}
                      </span>
                    )}
                  </div>

                  <h4 className="font-display font-bold text-xl text-white mb-2">
                    {item.title}
                  </h4>

                  {/* Adaptive Stage Photographic Integration (Full presence without head crop) */}
                  <div className="my-4 rounded-2xl overflow-hidden bg-neutral-950/80 flex items-center justify-center p-2">
                    <AdaptiveEditorialPhoto
                      src={
                        item.id === 'stage-theatre-competition'
                          ? '/photos/intro/Theatre1.png'
                          : '/photos/intro/mimicry.png'
                      }
                      alt={item.title}
                      aspectRatio="auto"
                      edgeBlend={item.id === 'stage-theatre-competition' ? 'radial' : 'soft-vignette'}
                      ambientGlow={item.id === 'stage-theatre-competition' ? 'rose' : 'violet'}
                      glowIntensity="subtle"
                      motionPersonality="expressive"
                      cropPosition="center"
                      telemetryCode={
                        item.id === 'stage-theatre-competition'
                          ? 'STAGE // 3RD_PLACE'
                          : 'STAGE // MIMICRY'
                      }
                      className="max-h-[220px]"
                      imageClassName="max-h-[220px] w-auto mx-auto object-contain"
                    />
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-neutral-950/60 border border-white/5 mb-4">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block mb-1">
                      Role &amp; Character Embodiment
                    </span>
                    <p className="text-xs text-neutral-300">
                      {item.characterAnalysis}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/5 text-neutral-300 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardSpotlight>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. THE SOUNDROOM (Piano & Vocals) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'soundroom' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Soundroom Master Console */}
          <div className="glass-panel-elevated rounded-3xl p-6 sm:p-10 border border-yellow-500/30 relative overflow-hidden shadow-2xl">
            <BorderBeam size={260} duration={8} colorFrom="#f59e0b" colorTo="#e6af2e" />
            {/* 1st Place Winner Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/40 text-yellow-300 font-semibold flex items-center gap-2 shadow-sm">
                  <Award className="w-4 h-4 text-yellow-400" />
                  🥇 1st Place Winner: Simultaneous Classical Piano &amp; Vocal Performance
                </span>
              </div>
              <span className="text-xs font-mono text-neutral-400">
                COMBINED ARTISTRY &bull; SINGLE WINNING RECITAL
              </span>
            </div>

            {/* Vinyl, Track Console & Authentic Medal Ceremony Photo */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
              <div className="lg:col-span-3 flex justify-center">
                <div className="relative group cursor-pointer" onClick={() => handlePlayTrack(currentTrackTitle)}>
                  {/* Rotating Vinyl Record */}
                  <div className={`w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-neutral-950 border-4 border-neutral-800 flex items-center justify-center shadow-2xl relative ${
                    isPlayingAudio ? 'animate-[spin_4s_linear_infinite]' : ''
                  }`}>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-neutral-950 font-bold text-xs font-mono shadow-inner">
                      SAHAJ
                    </div>
                  </div>
                  {/* Play/Pause Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-full">
                    {isPlayingAudio ? (
                      <Pause className="w-10 h-10 text-white" />
                    ) : (
                      <Play className="w-10 h-10 text-white" />
                    )}
                  </div>
                </div>
              </div>

              {/* Player Track Details */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-yellow-400">
                  <Disc3 className="w-4 h-4 animate-spin" />
                  <span>CURRENT SELECTION</span>
                </div>
                <h3 className="font-display font-bold text-2xl text-white">
                  {currentTrackTitle}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Classical piano training encompassing polyphonic counterpoint, lyrical cantabile phrasing, and emotional resonance alongside classical vocal breath control.
                </p>

                {/* Real-time Interactive Acoustic Waveform Simulation */}
                <AcousticWaveformVisualizer 
                  isPlaying={isPlayingAudio} 
                  trackTitle={currentTrackTitle} 
                />
              </div>

              {/* Authentic 1st Place Competition Honor Photograph */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="w-full max-w-[280px]">
                  <AdaptiveEditorialPhoto
                    src="/photos/intro/Singnpiano.png"
                    alt="Sahaj — 1st Place Competition Honor: Simultaneous Classical Piano & Vocal Performance"
                    aspectRatio="square"
                    edgeBlend="feathered"
                    ambientGlow="gold"
                    glowIntensity="medium"
                    motionPersonality="expressive"
                    cropPosition="center"
                    telemetryCode="HONOR // ARMED_FORCES"
                    categoryTag="CEREMONY HONORS"
                    caption="Indian military officer awarding 1st Place honors for simultaneous Piano and Vocal performance"
                    showCornerBrackets={true}
                    className="rounded-2xl border border-yellow-500/30 shadow-xl"
                  />
                </div>
              </div>
            </div>

            {/* Tracklist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {soundroomTracksData.map((track) => (
                <CardSpotlight
                  key={track.id}
                  color="rgba(234, 179, 8, 0.14)"
                  radius={240}
                  onClick={() => handlePlayTrack(track.title)}
                  className="p-5 rounded-2xl glass-panel border border-white/5 hover:border-yellow-400/40 transition-all cursor-pointer flex items-start justify-between gap-4"
                >
                  <div>
                    <span className="text-[10px] font-mono text-yellow-400 uppercase tracking-wider block mb-1">
                      {track.accolade}
                    </span>
                    <h4 className="font-display font-bold text-base text-white mb-1">
                      {track.title}
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                      {track.description}
                    </p>
                    <span className="text-[10px] font-mono text-neutral-500">
                      {track.notes}
                    </span>
                  </div>

                  <button className="p-3 rounded-full bg-yellow-400/10 text-yellow-300 hover:bg-yellow-400 hover:text-neutral-950 transition-colors shrink-0">
                    <Play className="w-4 h-4" />
                  </button>
                </CardSpotlight>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. THE POETRY VAULT (Anthology & Manuscripts) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'poetry' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Visual Manuscript & Poetry Reader Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Authentic Nocturnal Rain Manuscript (Poet1.png) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm">
                <AdaptiveEditorialPhoto
                  src="/photos/intro/Poet1.png"
                  alt="Sahaj — A Restless Shelf Nocturnal Manuscript"
                  aspectRatio="portrait"
                  edgeBlend="soft-vignette"
                  ambientGlow="amber"
                  glowIntensity="medium"
                  motionPersonality="introspective"
                  cropPosition="center"
                  telemetryCode="POETRY // NOCTURNAL_MS"
                  categoryTag="ORIGINAL MANUSCRIPT"
                  caption="Rain-slicked nocturnal window with illuminated verses of 'A Restless Shelf'."
                  showCornerBrackets={true}
                  className="rounded-3xl border border-amber-500/20 shadow-2xl"
                  onClick={() => setSelectedPoem(poetryVaultData[0])}
                />
              </div>
            </div>

            {/* Interactive Reader Card */}
            <div className="lg:col-span-7">
              {poetryVaultData.map((poem) => (
                <CardSpotlight
                  key={poem.id}
                  color="rgba(245, 158, 11, 0.14)"
                  radius={380}
                  onClick={() => {
                    sound.playTactileClick();
                    setSelectedPoem(poem);
                  }}
                  className="group glass-panel-elevated rounded-3xl p-8 border border-white/10 hover:border-amber-400/40 transition-all duration-300 cursor-pointer flex flex-col justify-between transform hover:-translate-y-1 hover:shadow-2xl relative"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-300 font-semibold">
                        BY {poem.author}
                      </span>
                      {poem.isWorkingTitle && (
                        <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                          Working Title
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-white group-hover:text-amber-300 transition-colors mb-2">
                      {poem.title}
                    </h3>

                    <p className="text-xs font-mono text-amber-400/80 mb-4">
                      Theme: {poem.themeDescription}
                    </p>

                    {/* Poetry Excerpt Preview */}
                    <div className="p-5 rounded-2xl bg-neutral-950/80 border border-white/5 font-sans text-xs sm:text-sm text-neutral-200 italic space-y-1.5 mb-6 border-l-2 border-l-amber-400/60 pl-4 leading-relaxed">
                      <p>"{poem.stanzas[0]?.[0]}"</p>
                      <p>"{poem.stanzas[0]?.[1]}"</p>
                      <p className="text-neutral-500 not-italic pt-1 font-mono text-[11px]">
                        + 5 more stanzas in full reader
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-amber-400 group-hover:text-amber-300">
                    <span className="font-semibold">Open Distraction-Free Reader</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardSpotlight>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-dashed border-white/10 text-center font-mono text-xs text-neutral-400">
            <span>Ready for your original poetry. Easily append new poems inside <code className="text-amber-300">src/data/culturalStudio.ts</code> without touching any code.</span>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. THE STORY ARCHIVE (Long-Form Stories & Chapter Reader) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'stories' && (
        <div className="space-y-8 animate-fadeIn">
          {storyArchiveData.map((story) => (
            <CardSpotlight
              key={story.id}
              color="rgba(245, 158, 11, 0.14)"
              radius={420}
              onClick={() => {
                sound.playTactileClick();
                setSelectedStory(story);
              }}
              className="group glass-panel-elevated rounded-3xl p-8 sm:p-10 border border-white/10 hover:border-amber-400/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold">
                  {story.genre}
                </span>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{story.estimatedReadTime}</span>
                  <span>&bull;</span>
                  <span>{story.chapters.length} Chapters</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-display font-bold text-2xl sm:text-4xl text-white group-hover:text-amber-300 transition-colors mb-2">
                  {story.title}
                </h3>
                <p className="text-sm text-neutral-400 italic mb-4">
                  {story.subtitle}
                </p>
                <p className="text-sm text-neutral-300 leading-relaxed max-w-3xl">
                  {story.synopsis}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-amber-400 group-hover:text-amber-300">
                <span className="font-semibold">Launch Chapter Reader &bull; Chapter I to III</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </CardSpotlight>
          ))}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 5. THE VOICE LAB (Dubbing, Voice Acting & Mimicry) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'voice' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {voiceLabData.map((clip) => (
              <CardSpotlight
                key={clip.id}
                color="rgba(168, 85, 247, 0.14)"
                radius={280}
                onClick={() => handlePlayTrack(clip.title)}
                className="group glass-panel-elevated rounded-3xl p-7 border border-white/10 hover:border-amber-400/40 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-950/40 text-amber-300 border border-amber-500/30">
                      {clip.category}
                    </span>
                    <Mic className="w-4 h-4 text-amber-400" />
                  </div>

                  <h3 className="font-display font-bold text-lg text-white group-hover:text-amber-300 transition-colors mb-2">
                    {clip.title}
                  </h3>

                  <p className="text-xs font-mono text-amber-400 mb-3">
                    {clip.vocalTone}
                  </p>

                  {/* Adaptive Rehearsal Photo for Mimicry */}
                  {clip.id === 'voice-mimicry-impressions' && (
                    <div className="mb-3.5 rounded-2xl overflow-hidden">
                      <AdaptiveEditorialPhoto
                        src="/photos/intro/mimicry.png"
                        alt="Sahaj — Vocal Mimicry and Character Rehearsal"
                        aspectRatio="landscape"
                        edgeBlend="radial"
                        ambientGlow="violet"
                        glowIntensity="subtle"
                        motionPersonality="expressive"
                        cropPosition="center"
                        telemetryCode="VOICE // REHEARSAL"
                        className="max-h-[140px]"
                        imageClassName="max-h-[140px]"
                      />
                    </div>
                  )}

                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    {clip.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-amber-400">
                  <span>Listen Voice Sample</span>
                  <Play className="w-3.5 h-3.5" />
                </div>
              </CardSpotlight>
            ))}
          </div>
        </div>
      )}
      </motion.div>
    </AnimatePresence>

      {/* Modals for Poetry and Stories */}
      <PoetryReaderModal
        poem={selectedPoem}
        onClose={() => setSelectedPoem(null)}
      />

      <StoryReaderModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
      />
    </section>
  );
};

