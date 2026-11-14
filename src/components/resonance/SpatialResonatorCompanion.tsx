import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sound } from '../../services/soundEngine';

interface SectionState {
  label: string;
  code: string;
  coreHex: number;
  cageHex: number;
  ring1Hex: number;
  ring2Hex: number;
  speed: number;
}

const SECTION_STATES: Record<string, SectionState> = {
  'top': { label: 'GENESIS SEED', code: '00', coreHex: 0xd4af37, cageHex: 0xf59e0b, ring1Hex: 0xd4af37, ring2Hex: 0x00e5ff, speed: 1.0 },
  'living-archives': { label: 'ARCHIVAL LOUPE', code: '01', coreHex: 0xf59e0b, cageHex: 0xd97706, ring1Hex: 0xf59e0b, ring2Hex: 0x38bdf8, speed: 1.1 },
  'accolades': { label: 'HONORS PODIUM', code: '02', coreHex: 0xfbbf24, cageHex: 0xf59e0b, ring1Hex: 0xfbbf24, ring2Hex: 0x00e5ff, speed: 1.2 },
  'ventures': { label: 'VENTURE FORGE', code: '03', coreHex: 0x00f0ff, cageHex: 0x0284c7, ring1Hex: 0x00f0ff, ring2Hex: 0x38bdf8, speed: 1.35 },
  'hackathons': { label: 'ARENA PODIUM', code: '04', coreHex: 0xf97316, cageHex: 0xea580c, ring1Hex: 0xf97316, ring2Hex: 0xfbbf24, speed: 1.5 },
  'hackathon-showcase': { label: 'SYSTEM CYBERDECK', code: '05', coreHex: 0x38bdf8, cageHex: 0x0284c7, ring1Hex: 0x38bdf8, ring2Hex: 0x00e5ff, speed: 1.3 },
  'solo': { label: 'SOLO ARCHITECT', code: '06', coreHex: 0xa855f7, cageHex: 0x8b5cf6, ring1Hex: 0xa855f7, ring2Hex: 0xc084fc, speed: 1.25 },
  'archive': { label: 'REPO COMPASS', code: '07', coreHex: 0x06b6d4, cageHex: 0x0891b2, ring1Hex: 0x06b6d4, ring2Hex: 0x38bdf8, speed: 1.15 },
  '3d-gallery': { label: 'SPATIAL PRISM', code: '08', coreHex: 0xec4899, cageHex: 0xdb2777, ring1Hex: 0xec4899, ring2Hex: 0xf472b6, speed: 1.3 },
  'cultural-studio': { label: 'ACOUSTIC SOUNDROOM', code: '09', coreHex: 0xd4af37, cageHex: 0xf59e0b, ring1Hex: 0xd4af37, ring2Hex: 0xfbbf24, speed: 1.2 },
  'unsaid': { label: 'MONOLITH VOID', code: '10', coreHex: 0xffffff, cageHex: 0xd4af37, ring1Hex: 0xffffff, ring2Hex: 0xf59e0b, speed: 0.85 },
  'terminal': { label: 'SILICON CHASM', code: '11', coreHex: 0x10b981, cageHex: 0x059669, ring1Hex: 0x10b981, ring2Hex: 0x34d399, speed: 1.6 },
  'contact': { label: 'FINAL CONVERGENCE', code: '12', coreHex: 0x38bdf8, cageHex: 0xd4af37, ring1Hex: 0x38bdf8, ring2Hex: 0xd4af37, speed: 1.0 },
};

const SECTION_KEYS = [
  'top',
  'living-archives',
  'accolades',
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

export const SpatialResonatorCompanion: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);
  const [activeState, setActiveState] = useState<SectionState>(SECTION_STATES['top']);
  const activeSectionIdRef = useRef<string>('top');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);
    }
  }, []);

  useEffect(() => {
    const handleScrollDetect = () => {
      const scrollMiddle = window.scrollY + window.innerHeight * 0.45;
      let closestId = 'top';
      let closestDist = Infinity;

      for (const id of SECTION_KEYS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const elCenter = window.scrollY + rect.top + rect.height / 2;
        const dist = Math.abs(scrollMiddle - elCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestId = id;
        }
      }

      if (closestId !== activeSectionIdRef.current && SECTION_STATES[closestId]) {
        activeSectionIdRef.current = closestId;
        setActiveState(SECTION_STATES[closestId]);
      }
    };

    window.addEventListener('scroll', handleScrollDetect, { passive: true });
    handleScrollDetect();
    return () => window.removeEventListener('scroll', handleScrollDetect);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || isReducedMotion) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = 200;
    const height = 200;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // ========================================================
    // 3D OBJECT: THE LIVING RESONATOR
    // ========================================================
    const group = new THREE.Group();
    scene.add(group);

    // 1. Inner Crystalline Core (Faceted Octahedron)
    const coreGeo = new THREE.OctahedronGeometry(0.85, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x081018,
      emissive: new THREE.Color(SECTION_STATES['top'].coreHex),
      emissiveIntensity: 0.35,
      metalness: 0.9,
      roughness: 0.15,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // 2. Outer Faceted Wireframe Cage
    const cageGeo = new THREE.IcosahedronGeometry(1.25, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(SECTION_STATES['top'].cageHex),
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const cageMesh = new THREE.Mesh(cageGeo, wireMat);
    group.add(cageMesh);

    // 3. Dual Harmonic Orbital Rings
    const ring1Geo = new THREE.TorusGeometry(1.55, 0.015, 16, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(SECTION_STATES['top'].ring1Hex), transparent: true, opacity: 0.65 });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Mesh.rotation.x = Math.PI / 3;
    group.add(ring1Mesh);

    const ring2Geo = new THREE.TorusGeometry(1.68, 0.012, 16, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(SECTION_STATES['top'].ring2Hex), transparent: true, opacity: 0.55 });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.y = Math.PI / 4;
    group.add(ring2Mesh);

    // 4. Orbiting Satellite Quarks
    const sparkGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const spark1Mat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
    const spark1 = new THREE.Mesh(sparkGeo, spark1Mat);
    group.add(spark1);

    const spark2Mat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const spark2 = new THREE.Mesh(sparkGeo, spark2Mat);
    group.add(spark2);

    // Lighting
    const pointLight = new THREE.PointLight(0xd4af37, 2.5, 10);
    pointLight.position.set(2, 2, 3);
    scene.add(pointLight);

    const cyanLight = new THREE.PointLight(0x00e5ff, 2.0, 10);
    cyanLight.position.set(-2, -2, 2);
    scene.add(cyanLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    // Dynamic targets for color lerping
    const targetCoreColor = new THREE.Color(SECTION_STATES['top'].coreHex);
    const targetCageColor = new THREE.Color(SECTION_STATES['top'].cageHex);
    const targetRing1Color = new THREE.Color(SECTION_STATES['top'].ring1Hex);
    const targetRing2Color = new THREE.Color(SECTION_STATES['top'].ring2Hex);

    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    let clickPulse = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = mouseX * 0.8;
      targetRotX = -mouseY * 0.8;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      scrollVelocity = (currentScroll - lastScrollY) * 0.015;
      lastScrollY = currentScroll;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Current target colors based on ref
      const currentSecState = SECTION_STATES[activeSectionIdRef.current] || SECTION_STATES['top'];
      targetCoreColor.set(currentSecState.coreHex);
      targetCageColor.set(currentSecState.cageHex);
      targetRing1Color.set(currentSecState.ring1Hex);
      targetRing2Color.set(currentSecState.ring2Hex);

      // Smooth color transitions
      coreMat.emissive.lerp(targetCoreColor, 0.05);
      wireMat.color.lerp(targetCageColor, 0.05);
      ring1Mat.color.lerp(targetRing1Color, 0.05);
      ring2Mat.color.lerp(targetRing2Color, 0.05);
      spark1Mat.color.lerp(targetRing1Color, 0.05);
      spark2Mat.color.lerp(targetRing2Color, 0.05);

      const speedFactor = currentSecState.speed;

      // Slow idle rotation + cursor follow
      group.rotation.y += (targetRotY - group.rotation.y) * 0.05 + 0.008 * speedFactor;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.05 + scrollVelocity * 0.1;
      group.rotation.z += scrollVelocity * 0.05;

      // Scroll velocity decay
      scrollVelocity *= 0.92;

      // Internal counter-rotations
      coreMesh.rotation.y -= 0.015 * speedFactor;
      cageMesh.rotation.x += 0.01 * speedFactor;
      cageMesh.rotation.z -= 0.008 * speedFactor;

      ring1Mesh.rotation.z += 0.012 * speedFactor;
      ring2Mesh.rotation.z -= 0.016 * speedFactor;

      // Satellite orbit math
      const orbitSpeed = elapsed * 2.2 * speedFactor;
      spark1.position.x = Math.cos(orbitSpeed) * 1.55;
      spark1.position.y = Math.sin(orbitSpeed) * Math.sin(Math.PI / 3) * 1.55;
      spark1.position.z = Math.sin(orbitSpeed) * Math.cos(Math.PI / 3) * 1.55;

      spark2.position.x = Math.sin(orbitSpeed * 0.85) * Math.cos(Math.PI / 4) * 1.68;
      spark2.position.y = Math.cos(orbitSpeed * 0.85) * 1.68;
      spark2.position.z = Math.sin(orbitSpeed * 0.85) * Math.sin(Math.PI / 4) * 1.68;

      // Click pulse recovery
      if (clickPulse > 0) {
        clickPulse *= 0.94;
        group.scale.set(1 + clickPulse * 0.35, 1 + clickPulse * 0.35, 1 + clickPulse * 0.35);
        coreMat.emissiveIntensity = 0.35 + clickPulse * 1.8;
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isReducedMotion]);

  const handleCompanionClick = () => {
    sound.playPianoHammerStrike();
    setTimeout(() => {
      sound.playBronzeWireVibration();
    }, 180);
    setPulseActive(true);
    setTimeout(() => setPulseActive(false), 800);
  };

  if (isReducedMotion) return null;

  return (
    <div
      onClick={handleCompanionClick}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end select-none cursor-pointer group"
      title="The Living Resonator // Click to strike acoustic harmonic"
      aria-label="Interactive 3D Resonator Companion"
    >
      {/* Telemetry pill */}
      <div className="mb-1 px-3 py-1 rounded-full bg-black/85 border border-white/15 text-[9px] font-mono tracking-widest uppercase flex items-center gap-2 backdrop-blur-xl shadow-2xl group-hover:border-amber-400/60 transition-all duration-300">
        <span 
          className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${pulseActive ? 'bg-amber-300 animate-ping' : 'bg-amber-400'}`} 
        />
        <span className="text-white/80 font-bold">{activeState.code}</span>
        <span className="text-neutral-500">//</span>
        <span className="text-amber-300/90 font-medium tracking-wider">{activeState.label}</span>
      </div>

      {/* 3D Canvas Mount Frame */}
      <div 
        ref={mountRef} 
        className="w-[125px] h-[125px] sm:w-[160px] sm:h-[160px] flex items-center justify-center filter drop-shadow-[0_12px_30px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-105 active:scale-95" 
      />
    </div>
  );
};
