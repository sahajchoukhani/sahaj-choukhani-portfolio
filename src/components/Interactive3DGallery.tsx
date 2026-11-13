import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { 
  Box, 
  RotateCw, 
  ZoomIn, 
  Eye, 
  Upload, 
  RefreshCw, 
  Sparkles, 
  Layers, 
  ShieldCheck,
  Globe,
  ExternalLink,
  Code2,
  User,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { BorderBeam } from './ui/BorderBeam';
import { InteractiveWebsitePreview } from './InteractiveWebsitePreview';
import { sound } from '../services/soundEngine';

export const Interactive3DGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const currentMeshRef = useRef<THREE.Object3D | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Mode tab state: 'persona' (Live ripsahaj.vercel.app 3D model) vs 'studio' (WebGL Three.js STL studio)
  const [activeTab, setActiveTab] = useState<'persona' | 'studio'>('persona');

  // UI state for WebGL Studio
  const [renderMode, setRenderMode] = useState<'solid' | 'wireframe' | 'normals'>('solid');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [loadedModelName, setLoadedModelName] = useState<string>('Kinetic Procedural Core');
  const [modelType, setModelType] = useState<'procedural' | 'uploaded'>('procedural');
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 450;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // 3. Renderer with Graceful WebGL Error Handling
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch (err) {
      console.warn('WebGL context unavailable (safe fallback):', err);
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    // Clear previous children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 1.5;
    controls.maxDistance = 12;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 2.0;
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 2.5); // Cyan key light
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x8a2be2, 2.0); // Violet rim light
    dirLight2.position.set(-5, -5, -4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xe6af2e, 1.5, 10); // Amber core accent
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // 6. Build initial procedural model
    loadProceduralModel();

    // 7. Render Loop with Visibility Caching (Pauses when offscreen)
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      if (controlsRef.current) {
        controlsRef.current.update();
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight || 450;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // 9. Intersection Observer (Saves GPU/Battery when out of view)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (rendererRef.current.domElement && rendererRef.current.domElement.parentNode) {
          rendererRef.current.domElement.parentNode.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, []);

  // Update auto-rotate
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  // Update render mode (solid, wireframe, normals)
  useEffect(() => {
    if (!currentMeshRef.current) return;

    currentMeshRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (renderMode === 'wireframe') {
          mesh.material = new THREE.MeshBasicMaterial({
            color: 0x00f0ff,
            wireframe: true,
          });
        } else if (renderMode === 'normals') {
          mesh.material = new THREE.MeshNormalMaterial({
            wireframe: false,
          });
        } else {
          // Solid PBR
          mesh.material = new THREE.MeshStandardMaterial({
            color: 0x222530,
            metalness: 0.85,
            roughness: 0.2,
            wireframe: false,
          });
        }
      }
    });
  }, [renderMode]);

  // Load procedural kinetic core
  const loadProceduralModel = () => {
    if (!sceneRef.current) return;

    // Remove previous mesh
    if (currentMeshRef.current) {
      sceneRef.current.remove(currentMeshRef.current);
    }

    const group = new THREE.Group();

    // Outer geometric cage (Icosahedron)
    const outerGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x181a24,
      metalness: 0.9,
      roughness: 0.15,
      wireframe: renderMode === 'wireframe',
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group.add(outerMesh);

    // Inner glowing torus knot
    const innerGeo = new THREE.TorusKnotGeometry(0.65, 0.18, 100, 16);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      metalness: 0.3,
      roughness: 0.2,
      emissive: 0x004455,
      wireframe: renderMode === 'wireframe',
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    sceneRef.current.add(group);
    currentMeshRef.current = group;
    setLoadedModelName('Procedural Kinetic Core');
    setModelType('procedural');

    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, 0, 4.5);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  // Handle local user STL or GLB file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !sceneRef.current) return;

    sound.playTactileClick();
    setUploadLoading(true);

    const fileName = file.name.toLowerCase();
    const reader = new FileReader();

    if (fileName.endsWith('.stl')) {
      reader.readAsArrayBuffer(file);
      reader.onload = (event) => {
        try {
          const contents = event.target?.result as ArrayBuffer;
          const loader = new STLLoader();
          const geometry = loader.parse(contents);

          // Center geometry
          geometry.center();
          geometry.computeVertexNormals();

          // Create mesh
          const material = new THREE.MeshStandardMaterial({
            color: 0x222530,
            metalness: 0.8,
            roughness: 0.25,
            wireframe: renderMode === 'wireframe',
          });
          const mesh = new THREE.Mesh(geometry, material);

          // Auto-scale to fit view
          geometry.computeBoundingSphere();
          const radius = geometry.boundingSphere?.radius || 1;
          const scale = 1.8 / radius;
          mesh.scale.set(scale, scale, scale);

          // Replace in scene
          if (currentMeshRef.current && sceneRef.current) {
            sceneRef.current.remove(currentMeshRef.current);
          }
          if (sceneRef.current) {
            sceneRef.current.add(mesh);
          }
          currentMeshRef.current = mesh;

          setLoadedModelName(file.name);
          setModelType('uploaded');
          sound.playVictoryFanfare();
        } catch (err) {
          console.error('Failed to parse STL file:', err);
        } finally {
          setUploadLoading(false);
        }
      };
    } else if (fileName.endsWith('.glb') || fileName.endsWith('.gltf')) {
      reader.readAsArrayBuffer(file);
      reader.onload = (event) => {
        try {
          const contents = event.target?.result as ArrayBuffer;
          const loader = new GLTFLoader();
          loader.parse(
            contents,
            '',
            (gltf) => {
              const object = gltf.scene;

              // Auto-scale
              const box = new THREE.Box3().setFromObject(object);
              const size = box.getSize(new THREE.Vector3());
              const maxDim = Math.max(size.x, size.y, size.z);
              const scale = 2.2 / (maxDim || 1);
              object.scale.set(scale, scale, scale);

              // Center
              const center = box.getCenter(new THREE.Vector3());
              object.position.sub(center.multiplyScalar(scale));

              if (currentMeshRef.current && sceneRef.current) {
                sceneRef.current.remove(currentMeshRef.current);
              }
              sceneRef.current?.add(object);
              currentMeshRef.current = object;

              setLoadedModelName(file.name);
              setModelType('uploaded');
              sound.playVictoryFanfare();
              setUploadLoading(false);
            },
            (err) => {
              console.error('Failed to parse GLB file:', err);
              setUploadLoading(false);
            }
          );
        } catch {
          setUploadLoading(false);
        }
      };
    } else {
      alert('Please upload a valid .stl, .glb, or .gltf file.');
      setUploadLoading(false);
    }
  };

  const handleResetCamera = () => {
    sound.playTactileClick();
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, 0, 4.5);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  return (
    <section id="3d-gallery" className="relative py-28 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-24 overflow-hidden">
      {/* Background Cyan/Violet Holo Ambient Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-500/5 blur-[160px] pointer-events-none rounded-full -z-10" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4">
            <Box className="w-3.5 h-3.5 text-cyan-400" />
            <span>INTERACTIVE 3D &amp; SPATIAL SYSTEMS</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
            3D Spatial Engineering.
          </h2>
          <p className="text-sm font-sans text-neutral-400 mt-2 max-w-xl">
            Explore Sahaj's interactive 3D model and persona platform (<strong className="text-cyan-300">ripsahaj.vercel.app</strong>) directly inside the live viewport, or switch to the WebGL STL / GLTF inspection laboratory.
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-2.5 p-1.5 rounded-2xl glass-panel border border-white/10">
          <button
            onClick={() => {
              sound.playTactileClick();
              setActiveTab('persona');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              activeTab === 'persona'
                ? 'bg-cyan-400 text-neutral-950 font-bold border border-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.35)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>3D Model of Sahaj</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          <button
            onClick={() => {
              sound.playTactileClick();
              setActiveTab('studio');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              activeTab === 'studio'
                ? 'bg-cyan-400 text-neutral-950 font-bold border border-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.35)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>WebGL Studio / STL Lab</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: DIGITAL ME — 3D PERSONA MASTER SHOWCASE */}
      {activeTab === 'persona' && (
        <div className="glass-panel-elevated rounded-3xl p-6 sm:p-10 border border-cyan-500/30 relative overflow-hidden shadow-2xl mb-8">
          <BorderBeam size={260} duration={8} colorFrom="#00f0ff" colorTo="#8a2be2" />

          {/* Top Verification Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>3D MODEL OF SAHAJ &bull; RIPSALHAJ.VERCEL.APP</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-neutral-300">LIVE 3D EMBED ACTIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Details */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
                  <User className="w-3.5 h-3.5" />
                  <span>CREATOR &amp; ARCHITECT</span>
                </div>
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                  Digital Me — 3D Persona.
                </h3>
                <p className="text-base font-medium text-cyan-300 italic mt-1">
                  "Interactive 3D spatial avatar &amp; real-time personal web platform."
                </p>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                Engineered by Sahaj as a real-time WebGL virtual representation of himself. Visitors can interact, rotate, inspect the 3D model, and test the spatial web environment directly inside the chassis.
              </p>

              {/* Technical Highlights */}
              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-2">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  Key Technical Architecture
                </span>
                <ul className="text-xs text-neutral-300 space-y-2 font-sans">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono select-none">&bull;</span>
                    <span>WebGL &amp; Three.js 3D spatial avatar rendering engine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono select-none">&bull;</span>
                    <span>Interactive orbital camera rotation with responsive touch support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono select-none">&bull;</span>
                    <span>High-contrast aesthetic with priority live iframe &amp; genuine capture fallback</span>
                  </li>
                </ul>
              </div>

              {/* Links */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://ripsahaj.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playTactileClick()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono font-semibold bg-cyan-400 hover:bg-cyan-300 text-neutral-950 transition-all shadow-lg group"
                >
                  <Globe className="w-4 h-4" />
                  <span>Open ripsahaj.vercel.app</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <button
                  onClick={() => {
                    sound.playTactileClick();
                    setActiveTab('studio');
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono text-neutral-300 hover:text-white glass-panel border border-white/10 hover:border-cyan-400/40 transition-all"
                >
                  <Box className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Open STL Lab &rarr;</span>
                </button>
              </div>
            </div>

            {/* Right Details: Master Interactive Preview Chassis */}
            <div className="lg:col-span-6">
              <InteractiveWebsitePreview
                url="https://ripsahaj.vercel.app/"
                previewImage="/photos/previews/digital_me_preview.png"
                hasGenuineImage={true}
                title="Digital Me — 3D Persona"
                role="Creator & Architect"
                category="3D Spatial Web Experience"
                aspectRatio="16/10"
                className="border-cyan-500/40 shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: WEBGL 3D STUDIO & STL INSPECTOR */}
      <div className={`glass-panel-elevated rounded-3xl border border-white/15 overflow-hidden shadow-2xl relative ${
        activeTab === 'studio' ? 'block' : 'hidden'
      }`}>
        {/* Top Control Bar */}
        <div className="bg-neutral-900/90 border-b border-white/10 px-5 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Box className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-mono font-semibold text-white block">
                {loadedModelName}
              </span>
              <span className="text-[10px] font-mono text-neutral-400">
                {modelType === 'procedural' ? 'Procedural Geometric Mesh' : 'Custom Uploaded 3D Asset'}
              </span>
            </div>
          </div>

          {/* Interactive Mode Toggles */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Render Mode Switcher */}
            <div className="flex items-center rounded-xl bg-black/40 border border-white/10 p-1 text-xs font-mono">
              <button
                onClick={() => {
                  sound.playTactileClick();
                  setRenderMode('solid');
                }}
                className={`px-3 py-1 rounded-lg transition-all ${
                  renderMode === 'solid'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Solid Studio
              </button>
              <button
                onClick={() => {
                  sound.playTactileClick();
                  setRenderMode('wireframe');
                }}
                className={`px-3 py-1 rounded-lg transition-all ${
                  renderMode === 'wireframe'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Wireframe
              </button>
              <button
                onClick={() => {
                  sound.playTactileClick();
                  setRenderMode('normals');
                }}
                className={`px-3 py-1 rounded-lg transition-all ${
                  renderMode === 'normals'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Normals
              </button>
            </div>

            {/* Turntable Auto-Rotate Toggle */}
            <button
              onClick={() => {
                sound.playTactileClick();
                setAutoRotate(!autoRotate);
              }}
              className={`p-2 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all ${
                autoRotate
                  ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                  : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
              }`}
              title="Toggle Auto-Rotation Turntable"
            >
              <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Turntable</span>
            </button>

            {/* Reset Camera Button */}
            <button
              onClick={handleResetCamera}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 transition-all text-xs font-mono"
              title="Reset Camera View"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3D WebGL Canvas Viewport */}
        <div className="relative w-full h-[460px] sm:h-[540px] bg-gradient-to-b from-[#0a0a0f] via-[#070709] to-[#040406] cursor-grab active:cursor-grabbing">
          <div ref={containerRef} className="w-full h-full" />

          {/* Interactive Gesture Guide Overlay */}
          <div className="absolute bottom-4 left-4 pointer-events-none text-[11px] font-mono text-neutral-400 bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 flex items-center gap-3">
            <span>🖱️ Drag: Rotate 360°</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>🔍 Scroll: Pinch / Zoom</span>
          </div>

          {/* Upload Button overlay on top right */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 text-xs font-mono font-bold cursor-pointer transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]">
              <Upload className="w-4 h-4" />
              <span>{uploadLoading ? 'Parsing 3D...' : 'Load Local STL / GLB'}</span>
              <input
                type="file"
                accept=".stl,.glb,.gltf"
                onChange={handleFileUpload}
                className="hidden"
                disabled={uploadLoading}
              />
            </label>

            {modelType === 'uploaded' && (
              <button
                onClick={() => {
                  sound.playTactileClick();
                  loadProceduralModel();
                }}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-200 text-xs font-mono transition-all"
              >
                Reset Default Core
              </button>
            )}
          </div>
        </div>

        {/* Bottom Technical Specifications Ribbon */}
        <div className="bg-neutral-900/60 border-t border-white/10 p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>STLLoader &amp; GLTFLoader Active</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span>ACES Filmic Tone Mapping</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Isolated 60fps GPU Lifecycle</span>
          </div>
        </div>
      </div>
    </section>
  );
};
