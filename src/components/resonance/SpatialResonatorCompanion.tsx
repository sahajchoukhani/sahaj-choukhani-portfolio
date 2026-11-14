import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sound } from '../../services/soundEngine';

export const SpatialResonatorCompanion: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);
    }
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || isReducedMotion) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = 220;
    const height = 220;

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
      emissive: 0xd4af37,
      emissiveIntensity: 0.25,
      metalness: 0.9,
      roughness: 0.15,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // 2. Outer Faceted Wireframe Cage (Gold Bronze)
    const cageGeo = new THREE.IcosahedronGeometry(1.25, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const cageMesh = new THREE.Mesh(cageGeo, wireMat);
    group.add(cageMesh);

    // 3. Dual Harmonic Orbital Rings (Acoustic Gold & Logic Cyan)
    const ring1Geo = new THREE.TorusGeometry(1.55, 0.015, 16, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xd4af37, transparent: true, opacity: 0.6 });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Mesh.rotation.x = Math.PI / 3;
    group.add(ring1Mesh);

    const ring2Geo = new THREE.TorusGeometry(1.68, 0.012, 16, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.5 });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.y = Math.PI / 4;
    group.add(ring2Mesh);

    // 4. Orbiting Satellite Quarks (Light Nodes)
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

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // ========================================================
    // INTERACTION & ANIMATION DYNAMICS
    // ========================================================
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
      const dt = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Slow idle rotation + cursor follow
      group.rotation.y += (targetRotY - group.rotation.y) * 0.05 + 0.008;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.05 + scrollVelocity * 0.1;
      group.rotation.z += scrollVelocity * 0.05;

      // Scroll velocity decay
      scrollVelocity *= 0.92;

      // Internal counter-rotations
      coreMesh.rotation.y -= 0.015;
      cageMesh.rotation.x += 0.01;
      cageMesh.rotation.z -= 0.008;

      ring1Mesh.rotation.z += 0.012;
      ring2Mesh.rotation.z -= 0.016;

      // Satellite orbit math
      const orbitSpeed = elapsed * 2.2;
      spark1.position.x = Math.cos(orbitSpeed) * 1.55;
      spark1.position.y = Math.sin(orbitSpeed) * Math.sin(Math.PI / 3) * 1.55;
      spark1.position.z = Math.sin(orbitSpeed) * Math.cos(Math.PI / 3) * 1.55;

      spark2.position.x = Math.sin(orbitSpeed * 0.85) * Math.cos(Math.PI / 4) * 1.68;
      spark2.position.y = Math.cos(orbitSpeed * 0.85) * 1.68;
      spark2.position.z = Math.sin(orbitSpeed * 0.85) * Math.sin(Math.PI / 4) * 1.68;

      // Click pulse recovery
      if (clickPulse > 0) {
        clickPulse *= 0.94;
        group.scale.set(1 + clickPulse * 0.3, 1 + clickPulse * 0.3, 1 + clickPulse * 0.3);
        coreMat.emissiveIntensity = 0.25 + clickPulse * 1.5;
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
    }, 200);
    setPulseActive(true);
    setTimeout(() => setPulseActive(false), 800);
  };

  if (isReducedMotion) return null;

  return (
    <div
      onClick={handleCompanionClick}
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end select-none cursor-pointer group"
      title="The Resonator // Tap to strike acoustic harmonic"
      aria-label="Interactive 3D Resonator Companion"
    >
      {/* Telemetry pill */}
      <div className="mb-1 px-2.5 py-0.5 rounded-full bg-black/75 border border-amber-500/30 text-[9px] font-mono text-amber-300/90 tracking-widest uppercase flex items-center gap-1.5 backdrop-blur-md shadow-lg group-hover:border-amber-400 group-hover:text-amber-200 transition-all">
        <span className={`w-1.5 h-1.5 rounded-full ${pulseActive ? 'bg-amber-300 animate-ping' : 'bg-amber-400'}`} />
        <span>RESONATOR // TAP</span>
      </div>

      {/* 3D Canvas Mount Frame */}
      <div 
        ref={mountRef} 
        className="w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] flex items-center justify-center filter drop-shadow-[0_10px_25px_rgba(245,158,11,0.25)] transition-transform group-hover:scale-105 active:scale-95" 
      />
    </div>
  );
};
