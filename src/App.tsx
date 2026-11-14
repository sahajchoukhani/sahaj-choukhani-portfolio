import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CinematicOpeningMontage } from './components/CinematicOpeningMontage';
import { AccoladesTicker } from './components/AccoladesTicker';
import { StartupsSection } from './components/StartupsSection';
import { HackathonVault } from './components/HackathonVault';
import { HackathonShowcase } from './components/HackathonShowcase';
import { SoloEngineeringSection } from './components/SoloEngineeringSection';
import { ProjectArchiveSection } from './components/ProjectArchiveSection';
import { Interactive3DGallery } from './components/Interactive3DGallery';
import { CulturalStudio } from './components/CulturalStudio';
import { TheShapeOfTheUnsaid } from './components/TheShapeOfTheUnsaid';
import { TerminalMatrix } from './components/TerminalMatrix';
import { Footer } from './components/Footer';
import { RemotionCinematicIntro } from './components/intro/RemotionCinematicIntro';
import { AfterHoursInterface } from './components/after-hours/AfterHoursInterface';
import { HarmonicResonanceCanvas } from './components/resonance/HarmonicResonanceCanvas';
import { SpatialResonatorCompanion } from './components/resonance/SpatialResonatorCompanion';
import { ApertureTunnelInterstitial } from './components/interstitials/ApertureTunnelInterstitial';
import { TheInfiniteArchitecturalTunnel } from './components/interstitials/TheInfiniteArchitecturalTunnel';
import { ColosseumThresholdInterstitial } from './components/interstitials/ColosseumThresholdInterstitial';
import { ResonantSilenceInterstitial } from './components/interstitials/ResonantSilenceInterstitial';
import { InkVoidInterstitial } from './components/interstitials/InkVoidInterstitial';
import { BedrockChasmInterstitial } from './components/interstitials/BedrockChasmInterstitial';

export const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('skipIntro') === 'true') return false;
      if (urlParams.get('intro') === 'true') return true;
      const seen = sessionStorage.getItem('sahaj_intro_seen');
      return seen !== 'true'; // Show intro on first visit of session
    }
    return true;
  });

  // Initialize Lenis smooth inertial scrolling for Awwwards-quality feel
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    if (typeof window !== 'undefined') {
      (window as unknown as { __lenis: typeof lenis }).__lenis = lenis;
    }

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('sahaj_intro_seen', 'true');
    }
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  return (
    <div className="min-h-screen bg-[#081018] text-neutral-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300 relative">
      {/* ======================================================== */}
      {/* CONTINUOUS STUDIO ATMOSPHERE (PORTRAIT-HARMONIZED)       */}
      {/* Derived from Portrait.png: #081018, #0c1926, #142334     */}
      {/* ======================================================== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-Right Studio Ambient Glow (Behind 3D Portrait Stage) */}
        <div 
          className="absolute -top-[10vh] right-[-5vw] w-[85vw] max-w-[1300px] h-[95vh] opacity-60 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 70% 30%, rgba(26, 44, 64, 0.45) 0%, rgba(12, 25, 38, 0.22) 45%, transparent 75%)'
          }}
        />

        {/* Mid-Page Atmospheric Wash (Ventures & Competitions Flow) */}
        <div 
          className="absolute top-[40vh] left-[-15vw] w-[75vw] max-w-[1000px] h-[85vh] opacity-40 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(16, 32, 48, 0.28) 0%, rgba(8, 16, 24, 0.12) 50%, transparent 75%)'
          }}
        />

        {/* Lower Studio Horizon Wash (Arts & Cultural Pavilion Flow) */}
        <div 
          className="absolute bottom-[25vh] right-[-10vw] w-[70vw] max-w-[950px] h-[75vh] opacity-35 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(20, 36, 52, 0.25) 0%, transparent 70%)'
          }}
        />

        {/* Continuous Micro-Grain Texture across the entire canvas */}
        <div className="absolute inset-0 bg-grain opacity-30 mix-blend-overlay" />
      </div>

      {/* Persistent Dual-Harmonic Resonance Strand (Akai Ito-inspired Visual Continuity) */}
      <HarmonicResonanceCanvas />

      {/* 23.5s Shared Remotion Cinematic Intro ("THE MAKING OF SAHAJ") */}
      {showIntro && (
        <RemotionCinematicIntro onComplete={handleIntroComplete} />
      )}

      {/* Master Navbar with Live Sound Engine Controller & Replay Intro Button */}
      <Navbar onReplayIntro={handleReplayIntro} />

      {/* Main Flow */}
      <main className="flex-1 relative z-10">
        <Hero />
        <ApertureTunnelInterstitial />
        <CinematicOpeningMontage />
        <AccoladesTicker />
        <TheInfiniteArchitecturalTunnel />
        <StartupsSection />
        <ColosseumThresholdInterstitial />
        <HackathonVault />
        <HackathonShowcase />
        <SoloEngineeringSection />
        <ProjectArchiveSection />
        <Interactive3DGallery />
        <ResonantSilenceInterstitial />
        <CulturalStudio />
        <InkVoidInterstitial />
        <TheShapeOfTheUnsaid />
        <BedrockChasmInterstitial />
        <TerminalMatrix />
      </main>

      {/* Footer & Contact */}
      <Footer />

      {/* Hidden Experimental Interface: AFTER HOURS (Cmd+K / Ctrl+K) */}
      <AfterHoursInterface />

      {/* Signature Visual Device: The Living 3D Resonator Companion */}
      <SpatialResonatorCompanion />
    </div>
  );
};

export default App;
