import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { sound } from '../../services/soundEngine';
import { 
  Compass, 
  Sparkles, 
  ArrowDown, 
  Layers, 
  Zap, 
  Eye, 
  ChevronDown,
  Activity
} from 'lucide-react';

interface FloatingDossier {
  id: string;
  title: string;
  category: string;
  imgUrl: string;
  zPos: number;
  xOffset: number;
  yOffset: number;
  tag: string;
}

const FLOATING_DOSSIERS: FloatingDossier[] = [
  {
    id: 'fd-nyay',
    title: 'Nyay Link Legal Architecture',
    category: 'LEGAL AUTOMATION CHAMBERS',
    imgUrl: '/photos/intro/NyayLink.png',
    zPos: -18,
    xOffset: -3.8,
    yOffset: 0.8,
    tag: 'VENTURE // NYAY LINK',
  },
  {
    id: 'fd-fasal',
    title: 'Fasal Niti Agritech Platform',
    category: 'SOLO ENGINEERING & PRODUCTION',
    imgUrl: '/photos/intro/Fasal.png',
    zPos: -34,
    xOffset: 3.8,
    yOffset: -0.5,
    tag: 'VENTURE // FASAL NITI',
  },
  {
    id: 'fd-ieee',
    title: 'IEEE Synapse National Podium',
    category: '36-HOUR RAPID PROTOTYPING',
    imgUrl: '/photos/intro/IEEE.png',
    zPos: -50,
    xOffset: -3.5,
    yOffset: -0.8,
    tag: 'THE ARENA // IEEE TROPHY',
  },
  {
    id: 'fd-iim',
    title: 'IIM Commercial Defense',
    category: 'VOCAL MIMICRY & BUSINESS STRATEGY',
    imgUrl: '/photos/intro/iimnmimicry.png',
    zPos: -66,
    xOffset: 3.6,
    yOffset: 0.6,
    tag: 'THE ARENA // IIM PODIUM',
  },
];

export const TheInfiniteArchitecturalTunnel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [hudPhase, setHudPhase] = useState<'disassemble' | 'transit' | 'reveal'>('disassemble');
  const [scrollVelocityDisplay, setScrollVelocityDisplay] = useState(0);

  const soundTriggeredPhase1Ref = useRef(false);
  const soundTriggeredPhase2Ref = useRef(false);
  const soundTriggeredPhase3Ref = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track progress and update audio/HUD
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (progress) => {
      // Phase detection
      if (progress < 0.22) {
        setHudPhase('disassemble');
        if (!soundTriggeredPhase1Ref.current && progress > 0.05) {
          soundTriggeredPhase1Ref.current = true;
          sound.playTightTransitionSwish();
        }
      } else if (progress < 0.78) {
        setHudPhase('transit');
        soundTriggeredPhase1Ref.current = false;
        if (!soundTriggeredPhase2Ref.current && progress > 0.45) {
          soundTriggeredPhase2Ref.current = true;
          sound.playSubBassPunch(55);
        }
      } else {
        setHudPhase('reveal');
        soundTriggeredPhase2Ref.current = false;
        if (!soundTriggeredPhase3Ref.current && progress > 0.85) {
          soundTriggeredPhase3Ref.current = true;
          sound.playTheatricalWarmSwell();
        }
      }

      setScrollVelocityDisplay(Math.round(progress * 100));
    });

    return () => unsub();
  }, [scrollYProgress]);

  // ========================================================
  // THREE.JS HIGH-PERFORMANCE WEBGL ENGINE
  // ========================================================
  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container || isReducedMotion) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060b12, 0.022);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 150);
    camera.position.set(0, 0, 8);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: false,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x060b12, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // ========================================================
    // 2. MATERIALS: IVORY, CHARCOAL, VERMILION RED & CYAN
    // ========================================================
    // Warm Ivory / Off-White Architectural Surfaces
    const ivoryMat = new THREE.MeshPhysicalMaterial({
      color: 0xf5f2eb,
      roughness: 0.35,
      metalness: 0.15,
      clearcoat: 0.4,
      clearcoatRoughness: 0.2,
    });

    // Deep Charcoal / Navy Structural Blocks
    const charcoalMat = new THREE.MeshStandardMaterial({
      color: 0x0c131d,
      roughness: 0.65,
      metalness: 0.4,
    });

    // Luminous Vermilion Red Neon Line (The Signature Red)
    const vermilionMat = new THREE.MeshBasicMaterial({
      color: 0xff2828,
    });

    // Electric Cyan Luminous Accents
    const electricCyanMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
    });

    // ========================================================
    // 3. ARCHITECTURAL PORTAL ASSEMBLIES (16 PORTALS)
    // Inspired by concentric pentagons, rectangles & colonnades
    // ========================================================
    const tunnelGroup = new THREE.Group();
    scene.add(tunnelGroup);

    const PORTAL_COUNT = 16;
    const PORTAL_SPACING = 5.2;
    const portals: {
      group: THREE.Group;
      baseZ: number;
      shapeType: 'pentagon' | 'rectangle';
      innerRim: THREE.Line | THREE.LineSegments | THREE.LineLoop;
      cyanAccents: THREE.Mesh[];
    }[] = [];

    for (let i = 0; i < PORTAL_COUNT; i++) {
      const portalZ = -i * PORTAL_SPACING;
      const portalGrp = new THREE.Group();
      portalGrp.position.z = portalZ;

      const isPentagon = i % 2 === 0;

      if (isPentagon) {
        // Pentagonal Architectural Portal (Panel 1 reference)
        const radius = 4.2;
        const pts: THREE.Vector3[] = [];
        for (let p = 0; p < 5; p++) {
          const angle = (p / 5) * Math.PI * 2 - Math.PI / 2;
          pts.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
        }

        // Thick Ivory Extruded Frame Segments
        for (let p = 0; p < 5; p++) {
          const p1 = pts[p];
          const p2 = pts[(p + 1) % 5];
          const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
          const dir = new THREE.Vector3().subVectors(p2, p1);
          const len = dir.length();

          const slabGeo = new THREE.BoxGeometry(len, 0.4, 0.7);
          const slabMesh = new THREE.Mesh(slabGeo, p % 2 === 0 ? ivoryMat : charcoalMat);
          slabMesh.position.copy(mid);
          slabMesh.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), dir.clone().normalize());
          portalGrp.add(slabMesh);
        }

        // Glowing Vermilion Neon Inner Rim
        const rimGeo = new THREE.BufferGeometry().setFromPoints([...pts, pts[0]]);
        const rimLine = new THREE.Line(rimGeo, vermilionMat);
        portalGrp.add(rimLine);

        // Electric Cyan Corner Latch Blocks
        const cyanNodes: THREE.Mesh[] = [];
        pts.forEach((pt) => {
          const nodeGeo = new THREE.BoxGeometry(0.18, 0.18, 0.4);
          const nodeMesh = new THREE.Mesh(nodeGeo, electricCyanMat);
          nodeMesh.position.copy(pt);
          portalGrp.add(nodeMesh);
          cyanNodes.push(nodeMesh);
        });

        portals.push({
          group: portalGrp,
          baseZ: portalZ,
          shapeType: 'pentagon',
          innerRim: rimLine,
          cyanAccents: cyanNodes,
        });
      } else {
        // Rectangular Chamfered Architectural Portal (Panel 2 & 3 reference)
        const w = 7.2;
        const h = 5.2;
        const rectGeo = new THREE.BoxGeometry(w, h, 0.6);
        const rectEdges = new THREE.EdgesGeometry(rectGeo);
        const rectRim = new THREE.LineSegments(rectEdges, vermilionMat);
        portalGrp.add(rectRim);

        // Ivory Top & Bottom Massive Cantilevers
        const topSlabGeo = new THREE.BoxGeometry(w + 0.6, 0.45, 0.9);
        const topSlab = new THREE.Mesh(topSlabGeo, ivoryMat);
        topSlab.position.y = h / 2 + 0.2;
        portalGrp.add(topSlab);

        const botSlab = new THREE.Mesh(topSlabGeo, charcoalMat);
        botSlab.position.y = -h / 2 - 0.2;
        portalGrp.add(botSlab);

        // Lateral Cyan Light Beams
        const cyanBarGeo = new THREE.BoxGeometry(0.12, h, 0.12);
        const leftBar = new THREE.Mesh(cyanBarGeo, electricCyanMat);
        leftBar.position.x = -w / 2 - 0.1;
        portalGrp.add(leftBar);

        const rightBar = new THREE.Mesh(cyanBarGeo, electricCyanMat);
        rightBar.position.x = w / 2 + 0.1;
        portalGrp.add(rightBar);

        portals.push({
          group: portalGrp,
          baseZ: portalZ,
          shapeType: 'rectangle',
          innerRim: rectRim,
          cyanAccents: [leftBar, rightBar],
        });
      }

      tunnelGroup.add(portalGrp);
    }

    // ========================================================
    // 4. THE FLOWING RED THREAD (SIGNATURE AKAI ITO CURVE)
    // A luminous 3D spline undulating through the center of portals
    // ========================================================
    const splinePoints: THREE.Vector3[] = [];
    for (let s = 0; s <= 30; s++) {
      const z = 8 - s * 3.5;
      const x = Math.sin(s * 0.65) * 1.6;
      const y = Math.cos(s * 0.5) * 1.2;
      splinePoints.push(new THREE.Vector3(x, y, z));
    }
    const threadCurve = new THREE.CatmullRomCurve3(splinePoints);
    const threadGeo = new THREE.TubeGeometry(threadCurve, 120, 0.045, 8, false);
    const threadMat = new THREE.MeshBasicMaterial({
      color: 0xff2020,
    });
    const threadMesh = new THREE.Mesh(threadGeo, threadMat);
    scene.add(threadMesh);

    // ========================================================
    // 5. FLOATING PHOTOGRAPHIC & BLUEPRINT TEXTURE PLATES
    // Authentic images suspended in holographic architectural frames
    // ========================================================
    const textureLoader = new THREE.TextureLoader();
    const photoGroup = new THREE.Group();
    scene.add(photoGroup);

    FLOATING_DOSSIERS.forEach((dossier) => {
      const isVertical = dossier.id === 'fd-nyay' || dossier.id === 'fd-ieee';
      const planeGeo = isVertical ? new THREE.PlaneGeometry(1.4, 2.3) : new THREE.PlaneGeometry(2.4, 1.6);
      textureLoader.load(dossier.imgUrl, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        const photoMat = new THREE.MeshBasicMaterial({
          map: tex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.92,
        });
        const photoMesh = new THREE.Mesh(planeGeo, photoMat);
        photoMesh.position.set(dossier.xOffset, dossier.yOffset, dossier.zPos);

        // Titanium Frame & Border Wire
        const frameEdges = new THREE.EdgesGeometry(planeGeo);
        const frameLine = new THREE.LineSegments(
          frameEdges,
          new THREE.MeshBasicMaterial({ color: 0x00f0ff })
        );
        photoMesh.add(frameLine);

        // Backplate
        const backMesh = new THREE.Mesh(planeGeo, charcoalMat);
        backMesh.position.z = -0.02;
        photoMesh.add(backMesh);

        photoMesh.rotation.y = dossier.xOffset > 0 ? -0.35 : 0.35;
        photoGroup.add(photoMesh);
      });
    });

    // ========================================================
    // 6. HIGH-VELOCITY PARTICLES / LIGHT STREAKS
    // ========================================================
    const starCount = 350;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starCol = new Float32Array(starCount * 3);

    const c1 = new THREE.Color(0xff3333); // Vermilion
    const c2 = new THREE.Color(0x00f0ff); // Cyan
    const c3 = new THREE.Color(0xf5f2eb); // Ivory

    for (let k = 0; k < starCount; k++) {
      starPos[k * 3] = (Math.random() - 0.5) * 14;
      starPos[k * 3 + 1] = (Math.random() - 0.5) * 10;
      starPos[k * 3 + 2] = 5 - Math.random() * 95;

      const pickColor = Math.random();
      const col = pickColor < 0.4 ? c1 : pickColor < 0.75 ? c2 : c3;
      starCol[k * 3] = col.r;
      starCol[k * 3 + 1] = col.g;
      starCol[k * 3 + 2] = col.b;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.085,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // ========================================================
    // 7. LIGHTING SETUP
    // Key Vermilion Red + Cyan Fill + Ambient Ivory Dome
    // ========================================================
    const redLight = new THREE.PointLight(0xff2222, 5.0, 35);
    redLight.position.set(0, 0, 5);
    scene.add(redLight);

    const cyanLight = new THREE.PointLight(0x00e5ff, 4.0, 30);
    cyanLight.position.set(0, 2, -30);
    scene.add(cyanLight);

    const exitLight = new THREE.PointLight(0xf5f3ec, 8.0, 45);
    exitLight.position.set(0, 0, -82);
    scene.add(exitLight);

    const ambLight = new THREE.AmbientLight(0x162233, 0.6);
    scene.add(ambLight);

    // ========================================================
    // 8. SCROLL CHOREOGRAPHY & RENDER LOOP
    // ========================================================
    let targetCameraZ = 8;
    let targetCameraX = 0;
    let targetCameraY = 0;
    let targetCameraRotZ = 0;
    let isVisible = true;

    // IntersectionObserver to pause WebGL when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          isVisible = e.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) {
        requestAnimationFrame(animate);
        return;
      }

      const elapsed = clock.getElapsedTime();
      const progress = scrollYProgress.get();

      // Camera Z trajectory: travel from Z = 8 down to Z = -78
      targetCameraZ = THREE.MathUtils.lerp(8, -78, progress);
      targetCameraX = Math.sin(progress * Math.PI * 4) * 0.9;
      targetCameraY = Math.cos(progress * Math.PI * 3) * 0.6;
      targetCameraRotZ = Math.sin(progress * Math.PI * 2) * 0.35;

      camera.position.z += (targetCameraZ - camera.position.z) * 0.08;
      camera.position.x += (targetCameraX - camera.position.x) * 0.08;
      camera.position.y += (targetCameraY - camera.position.y) * 0.08;
      camera.rotation.z += (targetCameraRotZ - camera.rotation.z) * 0.08;

      redLight.position.z = camera.position.z - 3;
      redLight.position.x = camera.position.x;
      redLight.position.y = camera.position.y;

      // Animate portals: twist wave + breathing scale
      portals.forEach((p, idx) => {
        const distFromCam = Math.abs(p.group.position.z - camera.position.z);
        const twistFactor = Math.sin(idx * 0.45 + progress * 12 + elapsed * 0.8) * 0.45;
        p.group.rotation.z = twistFactor;

        // Dynamic scale expansion when camera gets close
        if (distFromCam < 8) {
          const expand = 1 + (1 - distFromCam / 8) * 0.18;
          p.group.scale.set(expand, expand, expand);
        } else {
          p.group.scale.set(1, 1, 1);
        }
      });

      // Thread subtle undulating pulse
      threadMesh.rotation.z = Math.sin(elapsed * 0.5) * 0.08;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isReducedMotion, scrollYProgress]);

  // Framer Motion transforms for 2D UI Overlays
  const introOverlayOpacity = useTransform(scrollYProgress, [0, 0.18, 0.25], [1, 0.85, 0]);
  const tunnelHudOpacity = useTransform(scrollYProgress, [0.22, 0.3, 0.72, 0.82], [0, 1, 1, 0]);
  const exitRevealOpacity = useTransform(scrollYProgress, [0.78, 0.88, 1], [0, 1, 1]);
  const exitScale = useTransform(scrollYProgress, [0.78, 1], [0.92, 1.05]);

  return (
    <section 
      ref={containerRef}
      id="infinite-tunnel"
      className="relative w-full h-[320vh] bg-[#060b12] select-none"
    >
      {/* ------------------------------------------------------------- */}
      {/* STICKY FULL-VIEWPORT 3D TUNNEL STAGE                          */}
      {/* ------------------------------------------------------------- */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* 3D WebGL Canvas Layer */}
        <div ref={canvasMountRef} className="absolute inset-0 z-0" />

        {/* Ambient Film Grain & Scanline Overlay */}
        <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none z-10 mix-blend-overlay" />

        {/* ======================================================== */}
        {/* PHASE 1: DISASSEMBLY THRESHOLD (0.00 - 0.25)             */}
        {/* ======================================================== */}
        <motion.div 
          style={{ opacity: introOverlayOpacity }}
          className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center p-6 text-center"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-950/50 border border-red-500/40 text-xs font-mono text-red-300 shadow-[0_0_25px_rgba(255,40,40,0.3)]">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span className="tracking-widest uppercase">SPATIAL TRANSIT PROTOCOL // DISASSEMBLING WORLD 01</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
              The Infinite Tunnel.
            </h2>

            <p className="font-serif italic text-base sm:text-xl text-neutral-300 max-w-lg mx-auto">
              "We break through the physical gallery into the surreal architectural horizon."
            </p>

            <div className="pt-6 flex flex-col items-center gap-2">
              <span className="text-[10px] font-mono text-neutral-400 tracking-[0.3em] uppercase animate-pulse">
                SCROLL TO ACCELERATE THROUGH THE VOID
              </span>
              <ChevronDown className="w-4 h-4 text-red-400 animate-bounce" />
            </div>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* PHASE 2: FLIGHT TELEMETRY HUD (0.25 - 0.75)              */}
        {/* ======================================================== */}
        <motion.div
          style={{ opacity: tunnelHudOpacity }}
          className="relative z-20 pointer-events-none w-full h-full p-6 sm:p-10 flex flex-col justify-between"
        >
          {/* Top Telemetry Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="font-mono text-xs text-red-400 font-bold tracking-widest uppercase">
                TUNNEL VELOCITY: {scrollVelocityDisplay * 3.8} KM/S
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
              <span className="hidden sm:inline">WARP HARMONIC: 440 HZ</span>
              <span className="text-cyan-400 font-semibold">[PENTAGONAL-RECTANGULAR MATRICES]</span>
            </div>
          </div>

          {/* Lateral Architectural Callouts */}
          <div className="flex items-center justify-between w-full">
            <div className="hidden md:flex flex-col space-y-1 font-mono text-[10px] text-neutral-400 border-l-2 border-red-500/50 pl-3">
              <span className="text-white font-bold uppercase tracking-wider">COLLAPSING ARCHIVAL BOUNDARY</span>
              <span className="text-neutral-500">IVORY &bull; VERMILION &bull; CYAN</span>
              <span className="text-red-400/80">RED THREAD GUIDE ENGAGED</span>
            </div>

            <div className="hidden md:flex flex-col items-end space-y-1 font-mono text-[10px] text-neutral-400 border-r-2 border-cyan-500/50 pr-3">
              <span className="text-white font-bold uppercase tracking-wider">DIMENSIONAL COORDINATES</span>
              <span className="text-cyan-300">28.6139° N, 77.2090° E</span>
              <span className="text-neutral-500">APPROACHING VENTURE ATELIER</span>
            </div>
          </div>

          {/* Bottom Telemetry Footer */}
          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
              SURREAL PERSPECTIVE &bull; ESCHER MORPHOLOGY
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-red-400 uppercase font-bold">
                TRAJECTORY 02
              </span>
              <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 to-cyan-400 transition-all duration-75"
                  style={{ width: `${scrollVelocityDisplay}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* PHASE 3: THE VENTURES ATELIER REVEAL (0.75 - 1.00)       */}
        {/* ======================================================== */}
        <motion.div
          style={{ opacity: exitRevealOpacity, scale: exitScale }}
          className="absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-center p-6 text-center"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-xs font-mono text-cyan-300 shadow-[0_0_30px_rgba(0,240,255,0.3)]">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span className="tracking-widest uppercase">DIMENSION ENTERED // ACT 02</span>
            </div>

            <h3 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-none drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)]">
              The Ventures Atelier.
            </h3>

            <p className="font-serif italic text-base sm:text-xl text-neutral-300 max-w-lg mx-auto">
              "Four operational ventures. Architecture forged in real environments."
            </p>

            <div className="pt-4">
              <span className="px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-white backdrop-blur-md">
                DESCENDING INTO OPERATIONAL ECOSYSTEM ↓
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
