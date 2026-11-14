import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Sparkles, Terminal } from 'lucide-react';
import { sound } from '../services/soundEngine';

export type AspectRatioType = 'portrait' | 'landscape' | 'square' | 'cinematic' | 'auto';
export type EdgeBlendType = 'radial' | 'bottom-fade' | 'feathered' | 'soft-vignette' | 'sides-fade' | 'none';
export type AmbientGlowType = 'amber' | 'cyan' | 'emerald' | 'violet' | 'gold' | 'charcoal' | 'rose' | 'none';
export type MotionPersonalityType = 'energetic' | 'expressive' | 'introspective' | 'cinematic' | 'none';

export interface AdaptiveEditorialPhotoProps {
  src: string;
  alt: string;
  aspectRatio?: AspectRatioType;
  edgeBlend?: EdgeBlendType;
  ambientGlow?: AmbientGlowType;
  glowIntensity?: 'subtle' | 'medium' | 'dramatic';
  motionPersonality?: MotionPersonalityType;
  cropPosition?: 'center' | 'top' | 'bottom';
  fitMode?: 'cover' | 'contain';
  caption?: string;
  categoryTag?: string;
  telemetryCode?: string;
  className?: string;
  imageClassName?: string;
  showCornerBrackets?: boolean;
  onClick?: () => void;
  priority?: boolean;
}

export const AdaptiveEditorialPhoto: React.FC<AdaptiveEditorialPhotoProps> = ({
  src,
  alt,
  aspectRatio = 'auto',
  edgeBlend = 'feathered',
  ambientGlow = 'amber',
  glowIntensity = 'subtle',
  motionPersonality = 'expressive',
  cropPosition = 'center',
  fitMode = 'cover',
  caption,
  categoryTag,
  telemetryCode,
  className = '',
  imageClassName = '',
  showCornerBrackets = false,
  onClick,
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    }
  }, []);

  // Compute CSS Mask for contextual edge dissolving into the dark canvas
  const getMaskStyle = (blend: EdgeBlendType): React.CSSProperties => {
    switch (blend) {
      case 'bottom-fade':
        return {
          WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
        };
      case 'radial':
        return {
          WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 50%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 50%, transparent 100%)',
        };
      case 'feathered':
        return {
          WebkitMaskImage:
            'radial-gradient(ellipse 96% 96% at 50% 50%, black 72%, rgba(0,0,0,0.6) 88%, transparent 100%)',
          maskImage:
            'radial-gradient(ellipse 96% 96% at 50% 50%, black 72%, rgba(0,0,0,0.6) 88%, transparent 100%)',
        };
      case 'sides-fade':
        return {
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        };
      case 'soft-vignette':
        return {
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 85% at 50% 50%, black 60%, rgba(0,0,0,0.4) 84%, transparent 100%)',
          maskImage:
            'radial-gradient(ellipse 90% 85% at 50% 50%, black 60%, rgba(0,0,0,0.4) 84%, transparent 100%)',
        };
      case 'none':
      default:
        return {};
    }
  };

  // Ambient glow gradients sampled to harmonize with photo content
  const getAmbientGlowClasses = (glow: AmbientGlowType, intensity: string = 'subtle') => {
    if (glow === 'none') return '';
    const opacity =
      intensity === 'subtle' ? 'opacity-45' : intensity === 'medium' ? 'opacity-65' : 'opacity-85';

    switch (glow) {
      case 'amber':
        return `bg-gradient-to-tr from-amber-500/40 via-orange-600/20 to-transparent ${opacity}`;
      case 'gold':
        return `bg-gradient-to-tr from-yellow-400/40 via-amber-600/25 to-transparent ${opacity}`;
      case 'cyan':
        return `bg-gradient-to-tr from-cyan-400/40 via-sky-600/20 to-transparent ${opacity}`;
      case 'emerald':
        return `bg-gradient-to-tr from-emerald-400/40 via-teal-600/20 to-transparent ${opacity}`;
      case 'violet':
        return `bg-gradient-to-tr from-violet-500/40 via-purple-600/25 to-transparent ${opacity}`;
      case 'rose':
        return `bg-gradient-to-tr from-rose-500/40 via-red-600/20 to-transparent ${opacity}`;
      case 'charcoal':
        return `bg-gradient-to-tr from-neutral-500/35 via-neutral-700/25 to-transparent ${opacity}`;
      default:
        return '';
    }
  };

  // Aspect Ratio presets
  const getAspectRatioClasses = (aspect: AspectRatioType) => {
    switch (aspect) {
      case 'portrait':
        return 'aspect-[3/4] sm:aspect-[4/5]';
      case 'landscape':
        return 'aspect-[16/10] sm:aspect-[16/9]';
      case 'square':
        return 'aspect-square';
      case 'cinematic':
        return 'aspect-[21/9] sm:aspect-[2.35/1]';
      case 'auto':
      default:
        return '';
    }
  };

  // Object positioning to safeguard faces and focal points
  const getObjectPositionClass = (pos: 'center' | 'top' | 'bottom') => {
    switch (pos) {
      case 'top':
        return 'object-top';
      case 'bottom':
        return 'object-bottom';
      case 'center':
      default:
        return 'object-center';
    }
  };

  // Motion variants tailored to each section personality
  const getMotionProps = () => {
    if (prefersReducedMotion || motionPersonality === 'none') {
      return {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: { duration: 0.3 },
      };
    }

    switch (motionPersonality) {
      case 'energetic':
        return {
          initial: { opacity: 0, y: 22, scale: 0.98 },
          whileInView: { opacity: 1, y: 0, scale: 1 },
          transition: { duration: 0.5, ease: 'easeOut' as const },
        };
      case 'expressive':
        return {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: 'easeOut' as const },
        };
      case 'introspective':
        return {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          transition: { duration: 1.2, ease: 'easeOut' as const },
        };
      case 'cinematic':
        return {
          initial: { opacity: 0, scale: 0.97 },
          whileInView: { opacity: 1, scale: 1 },
          transition: { duration: 1.5, ease: 'easeOut' as const },
        };
    }
  };

  return (
    <motion.div
      {...getMotionProps()}
      viewport={{ once: true, margin: '-40px' }}
      className={`relative group ${className}`}
      onClick={() => {
        if (onClick) {
          sound.playTactileClick();
          onClick();
        }
      }}
      onMouseEnter={() => {
        if (onClick) sound.playHoverTone();
      }}
    >
      {/* 1. Contextual Ambient Glow Aura (Dissolves into dark canvas) */}
      {ambientGlow !== 'none' && (
        <div
          className={`absolute -inset-3 sm:-inset-6 rounded-3xl blur-2xl sm:blur-3xl pointer-events-none transition-all duration-700 ${getAmbientGlowClasses(
            ambientGlow,
            glowIntensity
          )} group-hover:scale-105`}
        />
      )}

      {/* 2. Aged Bronze Technical Calibration Brackets */}
      {showCornerBrackets && (
        <div className="pointer-events-none">
          <div className="absolute -top-2.5 -left-2.5 text-amber-500/50 text-xs font-mono select-none z-20">┌</div>
          <div className="absolute -top-2.5 -right-2.5 text-amber-500/50 text-xs font-mono select-none z-20">┐</div>
          <div className="absolute -bottom-2.5 -left-2.5 text-amber-500/50 text-xs font-mono select-none z-20">└</div>
          <div className="absolute -bottom-2.5 -right-2.5 text-amber-500/50 text-xs font-mono select-none z-20">┘</div>
        </div>
      )}

      {/* 3. Main Image Container with CSS Mask Blending */}
      <div
        style={getMaskStyle(edgeBlend)}
        className={`relative overflow-hidden w-full transition-transform duration-500 ${getAspectRatioClasses(
          aspectRatio
        )} ${onClick ? 'cursor-pointer' : ''}`}
      >
        {/* The Authentic Source Photograph (NEVER retouched, distorted, or AI altered) */}
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full ${
            fitMode === 'contain' ? 'object-contain p-1' : `object-cover ${getObjectPositionClass(cropPosition)}`
          } transition-all duration-700 contrast-[1.04] brightness-[1.02] saturate-[1.03] ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-102'
          } group-hover:scale-[1.02] ${imageClassName}`}
        />

        {/* Ambient Studio Slate Vignette Layer (Gentle edge shadow dissolving into #081018 background) */}
        {edgeBlend !== 'none' && (
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{
              background: 'radial-gradient(ellipse at center, transparent 65%, rgba(8, 16, 24, 0.38) 88%, rgba(8, 16, 24, 0.85) 100%)'
            }}
          />
        )}

        {/* Top-Right Telemetry / Expand Trigger */}
        {(telemetryCode || onClick) && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {telemetryCode && (
              <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-amber-400 tracking-wider">
                {telemetryCode}
              </span>
            )}
            {onClick && (
              <div className="p-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white shadow-lg">
                <Maximize2 className="w-3 h-3" />
              </div>
            )}
          </div>
        )}

        {/* Bottom Editorial Caption Bar (Optional) */}
        {(caption || categoryTag) && (
          <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/85 via-black/50 to-transparent z-10">
            {categoryTag && (
              <span className="text-[9px] sm:text-[10px] font-mono text-amber-400 uppercase tracking-widest block mb-0.5">
                {categoryTag}
              </span>
            )}
            {caption && (
              <p className="text-xs sm:text-sm text-neutral-200 font-sans leading-tight line-clamp-2">
                {caption}
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
