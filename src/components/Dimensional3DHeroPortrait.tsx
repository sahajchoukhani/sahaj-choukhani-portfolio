import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Compass, ShieldCheck, Eye, RotateCw } from 'lucide-react';
import { sound } from '../services/soundEngine';

interface Dimensional3DHeroPortraitProps {
  className?: string;
}

export const Dimensional3DHeroPortrait: React.FC<Dimensional3DHeroPortraitProps> = ({
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const portraitMeshRef = useRef<THREE.Mesh | null>(null);
  const shadowMeshRef = useRef<THREE.Mesh | null>(null);
  const backplateGroupRef = useRef<THREE.Group | null>(null);
  const ringsGroupRef = useRef<THREE.Group | null>(null);
  const foregroundGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Damped pointer coordinates
  const mouseTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseCurrentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Interaction modes
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);
  const [texturesLoaded, setTexturesLoaded] = useState<boolean>(false);

  // Check prefers-reduced-motion and pointer type
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(motionQuery.matches);
      const handleMotionChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
      motionQuery.addEventListener('change', handleMotionChange);

      const pointerQuery = window.matchMedia('(pointer: coarse)');
      setIsMobileDevice(pointerQuery.matches || window.innerWidth < 768);

      return () => {
        motionQuery.removeEventListener('change', handleMotionChange);
      };
    }
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 540;
    const height = container.clientHeight || 540;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera with restrained perspective (FOV 36 for high-end editorial compression)
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.4);
    cameraRef.current = camera;

    // 3. WebGL Renderer with graceful fallback
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      rendererRef.current = renderer;

      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL initialization failed, falling back to 2D editorial:', e);
      setWebGlSupported(false);
      return;
    }

    // 4. Texture Loading
    const textureLoader = new THREE.TextureLoader();
    let loadedCount = 0;
    const requiredTextures = 4;
    const onTextureLoad = () => {
      loadedCount++;
      if (loadedCount >= requiredTextures) {
        setTexturesLoaded(true);
      }
    };

    const colorTexture = textureLoader.load('/photos/intro/Portrait.png', onTextureLoad);
    const depthTexture = textureLoader.load('/photos/intro/portrait_depth.png', onTextureLoad);
    const normalTexture = textureLoader.load('/photos/intro/portrait_normal.png', onTextureLoad);
    const maskTexture = textureLoader.load('/photos/intro/portrait_mask.png', onTextureLoad);
    const faceProtectionTexture = textureLoader.load('/photos/intro/portrait_face_protection.png', onTextureLoad);

    colorTexture.generateMipmaps = true;
    colorTexture.minFilter = THREE.LinearMipmapLinearFilter;

    // -------------------------------------------------------------
    // LAYER 1: DEEP BACKGROUND STAGE (z = -1.2)
    // -------------------------------------------------------------
    const backplateGroup = new THREE.Group();
    backplateGroup.position.set(0, 0, -1.2);

    // Subtle dark circular backplate disc with radial gradient texture
    const backplateCanvas = document.createElement('canvas');
    backplateCanvas.width = 512;
    backplateCanvas.height = 512;
    const bpCtx = backplateCanvas.getContext('2d');
    if (bpCtx) {
      const grad = bpCtx.createRadialGradient(256, 256, 40, 256, 256, 256);
      grad.addColorStop(0, 'rgba(26, 44, 64, 0.75)'); // Studio backlight zenith (#1a2c40)
      grad.addColorStop(0.5, 'rgba(12, 25, 38, 0.5)'); // Studio mid-slate (#0c1926)
      grad.addColorStop(0.85, 'rgba(8, 16, 24, 0.25)'); // Base studio slate (#081018)
      grad.addColorStop(1, 'rgba(8, 16, 24, 0)');
      bpCtx.fillStyle = grad;
      bpCtx.fillRect(0, 0, 512, 512);

      // Delicate concentric blueprint rings
      bpCtx.strokeStyle = 'rgba(245, 158, 11, 0.12)';
      bpCtx.lineWidth = 1;
      bpCtx.beginPath();
      bpCtx.arc(256, 256, 120, 0, Math.PI * 2);
      bpCtx.stroke();

      bpCtx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      bpCtx.beginPath();
      bpCtx.arc(256, 256, 200, 0, Math.PI * 2);
      bpCtx.stroke();
    }
    const backplateTexture = new THREE.CanvasTexture(backplateCanvas);
    const backplateGeo = new THREE.PlaneGeometry(5.0, 5.0);
    const backplateMat = new THREE.MeshBasicMaterial({
      map: backplateTexture,
      transparent: true,
      depthWrite: false,
    });
    const backplateMesh = new THREE.Mesh(backplateGeo, backplateMat);
    backplateGroup.add(backplateMesh);
    scene.add(backplateGroup);
    backplateGroupRef.current = backplateGroup;

    // -------------------------------------------------------------
    // LAYER 2: ORBITAL CALIBRATION RINGS (z = -0.6 & z = -0.3)
    // -------------------------------------------------------------
    const ringsGroup = new THREE.Group();
    ringsGroup.position.set(0, 0, -0.4);

    const ringGeo1 = new THREE.TorusGeometry(2.25, 0.006, 16, 120);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.22,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringsGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.55, 0.005, 16, 120);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.18,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.position.set(0, 0, -0.2);
    ringsGroup.add(ring2);

    scene.add(ringsGroup);
    ringsGroupRef.current = ringsGroup;

    // -------------------------------------------------------------
    // LAYER 3: DYNAMIC REALISTIC DROP SHADOW (z = -0.15)
    // -------------------------------------------------------------
    // Procedural soft silhouette shadow cast behind the portrait that offsets opposite to light
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const sGrad = sCtx.createRadialGradient(128, 140, 20, 128, 140, 110);
      sGrad.addColorStop(0, 'rgba(0, 0, 0, 0.75)');
      sGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.35)');
      sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = sGrad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(3.8, 3.8);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.set(0, -0.05, -0.15);
    scene.add(shadowMesh);
    shadowMeshRef.current = shadowMesh;

    // -------------------------------------------------------------
    // LAYER 4: THE AUTHENTIC PORTRAIT PLANE (z = 0.0)
    // WITH GUARANTEED FACE PROTECTION & ZERO FACIAL DISTORTION
    // -------------------------------------------------------------
    const portraitMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: colorTexture },
        uDepthMap: { value: depthTexture },
        uProtectionMap: { value: faceProtectionTexture },
        uNormalMap: { value: normalTexture },
        uMaskMap: { value: maskTexture },
        // Substantially reduced depth displacement: 0.035 (strict safety limit)
        uDisplacement: { value: 0.035 },
        uLightPos: { value: new THREE.Vector3(0.5, 0.8, 2.5) },
        uKeyColor: { value: new THREE.Color('#fff4e6') }, // Warm high-key studio light
        uRimColor: { value: new THREE.Color('#00f0ff') }, // Subtle cyan rim light
        uAmbient: { value: 0.82 }, // High ambient preserves 100% natural photo tonality
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        uniform sampler2D uDepthMap;
        uniform sampler2D uProtectionMap;
        uniform float uDisplacement;

        void main() {
          vUv = uv;

          // Sample depth & face protection mask
          float depth = texture2D(uDepthMap, uv).r;
          float protection = texture2D(uProtectionMap, uv).r; // 0.0 in face, up to 1.0 in outer perimeter

          vec3 newPosition = position;

          // CRITICAL: Absolutely NO vertex shearing in X or Y!
          // Facial proportions, eyes, nose, mouth and jawline are 100% rigid and planar.
          // Subtle Z relief only outside the protected face region:
          newPosition.z += depth * protection * uDisplacement;

          vec4 worldPos = modelMatrix * vec4(newPosition, 1.0);
          vWorldPosition = worldPos.xyz;
          vNormal = normalize(normalMatrix * normal);

          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        uniform sampler2D uTexture;
        uniform sampler2D uNormalMap;
        uniform sampler2D uMaskMap;
        uniform vec3 uLightPos;
        uniform vec3 uKeyColor;
        uniform vec3 uRimColor;
        uniform float uAmbient;

        void main() {
          vec4 baseColor = texture2D(uTexture, vUv);
          float mask = texture2D(uMaskMap, vUv).r;

          if (mask < 0.01) discard;

          // Surface normal for gentle, non-destructive specular sheen
          vec3 normalMapVal = texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0;
          vec3 N = normalize(vNormal + normalMapVal * 0.22);

          // Dynamic light vector
          vec3 L = normalize(uLightPos - vWorldPosition);
          vec3 V = normalize(cameraPosition - vWorldPosition);
          vec3 H = normalize(L + V);

          // Restrained diffuse lighting (preserves natural studio exposure)
          float NdotL = max(dot(N, L), 0.0);
          vec3 diffuse = uKeyColor * (NdotL * 0.22);

          // Restrained specular sheen on hair/shoulders (never washes out facial features)
          float NdotH = max(dot(N, H), 0.0);
          float specular = pow(NdotH, 48.0) * 0.12;

          // Luminous cyan rim lighting on silhouette
          float rim = 1.0 - max(dot(V, N), 0.0);
          rim = smoothstep(0.55, 1.0, rim) * 0.32;
          vec3 rimLight = uRimColor * rim;

          vec3 finalColor = baseColor.rgb * (vec3(uAmbient) + diffuse) + specular + rimLight;

          // Organic falloff:
          // Torso base dissolves smoothly into obsidian space with zero hard cutoff
          float bottomFade = smoothstep(0.01, 0.22, vUv.y);
          // Soft horizontal edge feathering
          float sideFade = smoothstep(0.0, 0.05, vUv.x) * smoothstep(1.0, 0.95, vUv.x);

          gl_FragColor = vec4(finalColor, baseColor.a * mask * bottomFade * sideFade);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const planeGeo = new THREE.PlaneGeometry(3.6, 3.6, 96, 96);
    const portraitMesh = new THREE.Mesh(planeGeo, portraitMaterial);
    portraitMesh.position.set(0, 0, 0);
    scene.add(portraitMesh);
    portraitMeshRef.current = portraitMesh;

    // -------------------------------------------------------------
    // LAYER 5: AMBIENT PARTICLE FIELD (z = -0.8 to +0.6)
    // -------------------------------------------------------------
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 7.5;
      positions[i + 1] = (Math.random() - 0.5) * 7.5;
      positions[i + 2] = (Math.random() - 0.5) * 3.5 - 0.2;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xffffff,
      transparent: true,
      opacity: 0.28,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // -------------------------------------------------------------
    // LAYER 6: FOREGROUND FLOATING TELEMETRY GROUP (z = +0.45)
    // -------------------------------------------------------------
    const foregroundGroup = new THREE.Group();
    foregroundGroup.position.set(0, 0, 0.45);
    scene.add(foregroundGroup);
    foregroundGroupRef.current = foregroundGroup;

    // -------------------------------------------------------------
    // RENDER LOOP: SMOOTH SPRING DAMPING & SAFE ROTATION LIMITS
    // -------------------------------------------------------------
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const time = clock.getElapsedTime();

      // If reduced motion is requested, lock everything in place
      if (isReducedMotion) {
        if (portraitMesh) {
          portraitMesh.rotation.set(0, 0, 0);
          portraitMesh.position.set(0, 0, 0);
        }
        if (camera) {
          camera.position.set(0, 0, 5.4);
          camera.lookAt(0, 0, 0);
        }
        renderer.render(scene, camera);
        return;
      }

      // Safe spring damping factor
      const lerpFactor = 0.045;
      mouseCurrentRef.current.x += (mouseTargetRef.current.x - mouseCurrentRef.current.x) * lerpFactor;
      mouseCurrentRef.current.y += (mouseTargetRef.current.y - mouseCurrentRef.current.y) * lerpFactor;

      const mx = mouseCurrentRef.current.x;
      const my = mouseCurrentRef.current.y;

      // Ambient breathing motion (subtle sinusoidal pulse when idle)
      const ambientFloat = Math.sin(time * 0.75) * 0.02;

      // 1. Portrait Mesh: REMAINS NEARLY STATIONARY (Max rotation < 0.5 deg to guarantee rock-solid face)
      if (portraitMesh) {
        portraitMesh.rotation.y = mx * 0.008; // Max ~0.45 degrees
        portraitMesh.rotation.x = -my * 0.006; // Max ~0.34 degrees
        portraitMesh.position.set(0, 0, 0); // Position is rock solid at focal plane
      }

      // 2. Realistic Dynamic Drop Shadow: Offsets noticeably opposite to light
      if (shadowMesh) {
        shadowMesh.position.x = -mx * 0.16;
        shadowMesh.position.y = -my * 0.14 - 0.05;
        shadowMesh.scale.set(1.0 + my * 0.05, 1.0 - my * 0.05, 1.0);
      }

      // 3. Deep Background Layer: Noticeable inverse parallax
      if (backplateGroup) {
        backplateGroup.position.x = -mx * 0.35;
        backplateGroup.position.y = -my * 0.28 + ambientFloat;
      }

      // 4. Orbital Calibration Rings: Dramatic 3D environmental movement
      if (ringsGroup) {
        ringsGroup.rotation.z = time * 0.04;
        ringsGroup.rotation.y = mx * 0.40 + Math.sin(time * 0.3) * 0.05;
        ringsGroup.rotation.x = -my * 0.35 + Math.cos(time * 0.3) * 0.05;
        ringsGroup.position.z = -0.4 + ambientFloat * 2.0;
      }

      // 5. Foreground Floating Group: Positive parallax
      if (foregroundGroup) {
        foregroundGroup.position.x = mx * 0.28;
        foregroundGroup.position.y = my * 0.22;
      }

      // 6. Dynamic Key Light Arc: Moves in space to create realistic sheen
      if (portraitMaterial.uniforms) {
        portraitMaterial.uniforms.uLightPos.value.set(
          mx * 2.8 + 0.5,
          my * 2.8 + 0.8,
          2.6
        );
      }

      // 7. Camera Perspective: Maximum shift of < 0.6 degrees to protect focal registration
      if (camera) {
        camera.position.x = mx * 0.035;
        camera.position.y = my * 0.025;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    // -------------------------------------------------------------
    // POINTER & TOUCH HANDLERS (CLAMPED & DAMPED)
    // -------------------------------------------------------------
    const handlePointerMove = (e: MouseEvent) => {
      if (isReducedMotion) return;
      const rect = container.getBoundingClientRect();
      const rawX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const rawY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      // Clamp strictly within [-1, 1]
      mouseTargetRef.current = {
        x: Math.max(-1, Math.min(1, rawX)),
        y: Math.max(-1, Math.min(1, rawY)),
      };
    };

    const handlePointerLeave = () => {
      // Idle state: smoothly return to center
      mouseTargetRef.current = { x: 0, y: 0 };
      setIsHovered(false);
    };

    const handlePointerEnter = () => {
      setIsHovered(true);
      sound.playHoverTone();
    };

    // Mobile touch handling (damped by 80% to protect scrolling)
    const handleTouchMove = (e: TouchEvent) => {
      if (isReducedMotion || isMobileDevice) return;
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const rawX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const rawY = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        mouseTargetRef.current = {
          x: Math.max(-0.35, Math.min(0.35, rawX * 0.35)),
          y: Math.max(-0.35, Math.min(0.35, rawY * 0.35)),
        };
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mouseenter', handlePointerEnter);
    container.addEventListener('mouseleave', handlePointerLeave);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Resize Observer on container for instant adaptation
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0 && renderer && camera) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth > 0 && newHeight > 0) {
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Intersection Observer
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
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mouseenter', handlePointerEnter);
      container.removeEventListener('mouseleave', handlePointerLeave);
      container.removeEventListener('touchmove', handleTouchMove);

      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
      planeGeo.dispose();
      portraitMaterial.dispose();
      backplateGeo.dispose();
      backplateMat.dispose();
      backplateTexture.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTexture.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [isReducedMotion, isMobileDevice]);

  return (
    <div className={`relative flex items-center justify-center select-none w-full h-full ${className}`}>
      {/* Dynamic Ambient Backlight Aura (Studio Slate Midnight Atmosphere matching Portrait.png) */}
      <div
        className="absolute inset-0 rounded-full blur-[140px] pointer-events-none transition-opacity duration-700 opacity-70"
        style={{
          background: isHovered
            ? 'radial-gradient(circle at center, rgba(35, 58, 85, 0.45) 0%, rgba(26, 44, 64, 0.25) 45%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(26, 44, 64, 0.35) 0%, rgba(12, 25, 38, 0.18) 45%, transparent 70%)',
        }}
      />

      {/* 3D WebGL Canvas Container — Unboxed & Full-Bleed (Zero card borders, zero glass chassis) */}
      <div
        ref={mountRef}
        className="w-full h-full relative cursor-grab active:cursor-grabbing bg-transparent"
        style={{
          maskImage: 'radial-gradient(ellipse 95% 90% at 50% 50%, black 72%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 95% 90% at 50% 50%, black 72%, transparent 100%)',
        }}
      >
        {/* Fallback for WebGL Unavailable */}
        {!webGlSupported && (
          <img
            src="/photos/intro/Portrait.png"
            alt="Sahaj — Studio Portrait"
            className="w-full h-full object-contain"
          />
        )}
      </div>

      {/* Discrete Architectural Datum Tag in Margin */}
      <div className="absolute bottom-4 right-4 sm:right-8 z-20 pointer-events-none flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/5 text-[9px] font-mono text-neutral-400 tracking-wider">
        <ShieldCheck className="w-3 h-3 text-emerald-400" />
        <span>
          {isReducedMotion
            ? 'STATIC 3D // REDUCED MOTION'
            : isHovered
            ? 'SPATIAL DEPTH // ACTIVE'
            : '1:1 AUTHENTIC IDENTITY PROTECTED'}
        </span>
      </div>
    </div>
  );
};
