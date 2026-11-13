import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  vx: number;
  vy: number;
  color: string;
}

interface SectionColorTheme {
  primary: [number, number, number];   // RGB
  secondary: [number, number, number]; // RGB
  glow: [number, number, number];      // RGB
  strandMode: 'harmonic' | 'crystalline' | 'electric' | 'theatrical';
}

const SECTION_THEMES: Record<string, SectionColorTheme> = {
  'top': {
    primary: [212, 175, 55],    // Aged Gold
    secondary: [0, 229, 255],   // Cyan
    glow: [245, 158, 11],       // Amber
    strandMode: 'harmonic',
  },
  'living-archives': {
    primary: [245, 158, 11],    // Warm Archival Amber
    secondary: [212, 175, 55],  // Gold
    glow: [180, 83, 9],         // Deep Amber
    strandMode: 'theatrical',
  },
  'accolades': {
    primary: [234, 179, 8],     // Golden Yellow
    secondary: [56, 189, 248],  // Sky Blue
    glow: [245, 158, 11],       // Amber
    strandMode: 'electric',
  },
  'ventures': {
    primary: [0, 240, 255],     // High-Tech Cyan
    secondary: [168, 85, 247],  // Electric Violet
    glow: [6, 182, 212],        // Cyan Glow
    strandMode: 'crystalline',
  },
  'hackathons': {
    primary: [251, 191, 36],    // Arena Amber
    secondary: [249, 115, 22],  // Flame Orange
    glow: [217, 119, 6],        // Deep Amber
    strandMode: 'electric',
  },
  'hackathon-showcase': {
    primary: [6, 182, 212],     // Browser Cyan
    secondary: [59, 130, 246],  // Royal Blue
    glow: [14, 165, 233],       // Sky
    strandMode: 'crystalline',
  },
  'solo': {
    primary: [16, 185, 129],    // Blueprint Emerald
    secondary: [6, 182, 212],   // Precision Cyan
    glow: [5, 150, 105],        // Emerald
    strandMode: 'crystalline',
  },
  'archive': {
    primary: [148, 163, 184],   // Starlight Slate
    secondary: [0, 229, 255],   // Cyan
    glow: [71, 85, 105],        // Deep Slate
    strandMode: 'harmonic',
  },
  '3d-gallery': {
    primary: [168, 85, 247],    // Spatial Violet
    secondary: [56, 189, 248],  // Sky Blue
    glow: [147, 51, 234],       // Violet
    strandMode: 'crystalline',
  },
  'cultural-studio': {
    primary: [244, 63, 94],     // Stage Rose / Crimson
    secondary: [245, 158, 11],  // Piano Amber
    glow: [225, 29, 72],        // Footlight
    strandMode: 'theatrical',
  },
  'unsaid': {
    primary: [212, 175, 55],    // Candlelight Gold
    secondary: [245, 158, 11],  // Soft Amber
    glow: [180, 83, 9],         // Deep Shadow
    strandMode: 'harmonic',
  },
  'terminal': {
    primary: [34, 197, 94],     // Phosphor Green
    secondary: [0, 229, 255],   // Terminal Cyan
    glow: [22, 163, 74],        // Green
    strandMode: 'electric',
  },
  'contact': {
    primary: [0, 240, 255],     // Uplink Cyan
    secondary: [212, 175, 55],  // Golden Horizon
    glow: [14, 165, 233],       // Sky Glow
    strandMode: 'harmonic',
  },
};

export const HarmonicResonanceCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Mouse coordinates
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    // Scroll tracking
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    let lastScrollTime = performance.now();

    // Color interpolation state
    const curPrimary = [212, 175, 55];
    const curSecondary = [0, 229, 255];
    const curGlow = [245, 158, 11];

    const sectionIds = [
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

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleScroll = () => {
      targetScrollY = window.scrollY;
      const now = performance.now();
      const dt = Math.max(1, now - lastScrollTime);
      const dy = targetScrollY - lastScrollY;
      scrollVelocity = (dy / dt) * 12;
      lastScrollY = targetScrollY;
      lastScrollTime = now;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Detect active section in viewport
    const getActiveTheme = (): SectionColorTheme => {
      const midY = window.innerHeight * 0.45;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= midY && rect.bottom >= midY) {
            return SECTION_THEMES[id] || SECTION_THEMES['top'];
          }
        }
      }
      return SECTION_THEMES['top'];
    };

    // Particles system
    const particleCount = width < 768 ? 24 : 50;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        baseAlpha: Math.random() * 0.35 + 0.15,
        alpha: Math.random() * 0.35 + 0.15,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.08,
        color: '',
      });
    }

    let time = 0;

    const render = () => {
      time += 0.009;

      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;
      scrollY += (targetScrollY - scrollY) * 0.1;
      scrollVelocity *= 0.92;

      ctx.clearRect(0, 0, width, height);

      const docHeight = Math.max(1, document.documentElement.scrollHeight - height);
      const scrollProgress = Math.min(1, Math.max(0, scrollY / docHeight));

      // Interpolate theme colors smoothly towards active section
      const activeTheme = getActiveTheme();
      for (let c = 0; c < 3; c++) {
        curPrimary[c] += (activeTheme.primary[c] - curPrimary[c]) * 0.04;
        curSecondary[c] += (activeTheme.secondary[c] - curSecondary[c]) * 0.04;
        curGlow[c] += (activeTheme.glow[c] - curGlow[c]) * 0.04;
      }

      const pCol = curPrimary.map(v => Math.round(v));
      const sCol = curSecondary.map(v => Math.round(v));
      const gCol = curGlow.map(v => Math.round(v));

      if (isReducedMotion) {
        const grad = ctx.createRadialGradient(
          width * 0.7, height * 0.35, 10,
          width * 0.7, height * 0.35, width * 0.6
        );
        grad.addColorStop(0, `rgba(${pCol[0]}, ${pCol[1]}, ${pCol[2]}, 0.06)`);
        grad.addColorStop(0.5, `rgba(${sCol[0]}, ${sCol[1]}, ${sCol[2]}, 0.03)`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const pointsCount = width < 768 ? 30 : 50;
      const step = height / (pointsCount - 1);

      const alphaPrimary = 0.22 + Math.min(0.2, Math.abs(scrollVelocity) * 0.015);
      const alphaSecondary = 0.18 + Math.min(0.2, Math.abs(scrollVelocity) * 0.015);

      const centerX = width * (0.65 + Math.sin(time * 0.4 + scrollProgress * Math.PI * 1.5) * 0.10);

      // --- STRAND A: Primary Ribbon ---
      ctx.beginPath();
      for (let i = 0; i < pointsCount; i++) {
        const y = i * step;
        const ny = y / height;

        const wave1 = Math.sin(ny * 4.2 + time * 1.4 + scrollProgress * 3.2) * (55 + scrollVelocity * 1.4);
        const wave2 = Math.cos(ny * 7.5 - time * 0.7) * 26;

        const dx = centerX + wave1 + wave2 - mouseX;
        const dy = y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseEffect = Math.max(0, 1 - dist / 320) * 45;

        const x = centerX + wave1 + wave2 + (dx > 0 ? mouseEffect : -mouseEffect);

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.lineWidth = 2.4;
      const pGrad = ctx.createLinearGradient(0, 0, 0, height);
      pGrad.addColorStop(0, `rgba(${pCol[0]}, ${pCol[1]}, ${pCol[2]}, ${alphaPrimary * 0.2})`);
      pGrad.addColorStop(0.4, `rgba(${pCol[0]}, ${pCol[1]}, ${pCol[2]}, ${alphaPrimary})`);
      pGrad.addColorStop(0.8, `rgba(${gCol[0]}, ${gCol[1]}, ${gCol[2]}, ${alphaPrimary * 1.2})`);
      pGrad.addColorStop(1, `rgba(${pCol[0]}, ${pCol[1]}, ${pCol[2]}, ${alphaPrimary * 0.15})`);
      ctx.strokeStyle = pGrad;
      ctx.stroke();

      // Atmospheric halo
      ctx.lineWidth = 16;
      ctx.strokeStyle = `rgba(${gCol[0]}, ${gCol[1]}, ${gCol[2]}, ${alphaPrimary * 0.15})`;
      ctx.stroke();

      // --- STRAND B: Secondary Counterpoint Ribbon ---
      ctx.beginPath();
      for (let i = 0; i < pointsCount; i++) {
        const y = i * step;
        const ny = y / height;

        const wave1 = Math.cos(ny * 5.0 - time * 1.6 + scrollProgress * 2.8) * (45 - scrollVelocity * 1.1);
        const wave2 = Math.sin(ny * 8.2 + time * 1.0) * 22;

        const dx = centerX + wave1 + wave2 - mouseX;
        const dy = y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseEffect = Math.max(0, 1 - dist / 300) * 35;

        const x = centerX + wave1 + wave2 + (dx > 0 ? mouseEffect : -mouseEffect);

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.lineWidth = 1.9;
      const sGrad = ctx.createLinearGradient(0, 0, 0, height);
      sGrad.addColorStop(0, `rgba(${sCol[0]}, ${sCol[1]}, ${sCol[2]}, ${alphaSecondary * 0.18})`);
      sGrad.addColorStop(0.45, `rgba(${sCol[0]}, ${sCol[1]}, ${sCol[2]}, ${alphaSecondary})`);
      sGrad.addColorStop(0.8, `rgba(${sCol[0]}, ${sCol[1]}, ${sCol[2]}, ${alphaSecondary * 1.15})`);
      sGrad.addColorStop(1, `rgba(${sCol[0]}, ${sCol[1]}, ${sCol[2]}, ${alphaSecondary * 0.2})`);
      ctx.strokeStyle = sGrad;
      ctx.stroke();

      ctx.lineWidth = 12;
      ctx.strokeStyle = `rgba(${sCol[0]}, ${sCol[1]}, ${sCol[2]}, ${alphaSecondary * 0.12})`;
      ctx.stroke();

      // --- PARTICLES ---
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy - scrollVelocity * 0.04;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pulse = Math.sin(time * 2.2 + i) * 0.12;
        const currentAlpha = Math.max(0.04, Math.min(0.75, p.baseAlpha + pulse));

        const usePrimary = i % 2 === 0;
        const activeColor = usePrimary ? pCol : sCol;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${activeColor[0]}, ${activeColor[1]}, ${activeColor[2]}, ${currentAlpha})`;
        ctx.fill();

        if (p.size > 1.8) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${activeColor[0]}, ${activeColor[1]}, ${activeColor[2]}, ${currentAlpha * 0.22})`;
          ctx.fill();
        }
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-80 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
