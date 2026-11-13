import React, { useState, useEffect, useCallback } from 'react';
import { AfterHoursPalette } from './AfterHoursPalette';
import { AfterHoursSecretView } from './AfterHoursSecretView';
import { CommandItem } from './types';
import { sound } from '../../services/soundEngine';

export const AfterHoursInterface: React.FC = () => {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isSecretActive, setIsSecretActive] = useState(false);

  const openPalette = useCallback(() => {
    sound.playModalWhoosh();
    setIsPaletteOpen(true);
  }, []);

  const closePalette = useCallback(() => {
    setIsPaletteOpen(false);
  }, []);

  const exitSecretDimension = useCallback(() => {
    setIsSecretActive(false);
  }, []);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Prevent shortcuts from interfering with normal typing inside form input fields
      const activeEl = document.activeElement;
      const isInputActive = 
        activeEl instanceof HTMLInputElement ||
        activeEl instanceof HTMLTextAreaElement ||
        (activeEl as HTMLElement)?.isContentEditable;

      // Check for Cmd+K (macOS) or Ctrl+K (Windows/Linux)
      const isKPressed = e.key.toLowerCase() === 'k';
      const isModifierPressed = e.metaKey || e.ctrlKey;

      if (isModifierPressed && isKPressed) {
        // If typing inside an input other than our command palette, do not hijack normal typing
        // unless it's an explicit navigation shortcut
        e.preventDefault();
        if (isSecretActive) {
          setIsSecretActive(false);
          setIsPaletteOpen(false);
        } else {
          setIsPaletteOpen((prev) => {
            if (!prev) sound.playModalWhoosh();
            return !prev;
          });
        }
        return;
      }

      // Escape key handler
      if (e.key === 'Escape') {
        if (isSecretActive) {
          e.preventDefault();
          setIsSecretActive(false);
        } else if (isPaletteOpen) {
          e.preventDefault();
          setIsPaletteOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPaletteOpen, isSecretActive]);

  // Listen to custom open event from Navbar or Footer discovery buttons
  useEffect(() => {
    const handleCustomOpen = () => {
      openPalette();
    };

    window.addEventListener('open-after-hours', handleCustomOpen);
    return () => window.removeEventListener('open-after-hours', handleCustomOpen);
  }, [openPalette]);

  // Pause background scroll when Secret Dimension is active
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (isSecretActive) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }

    return () => {
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [isSecretActive]);

  // Execute selected command
  const handleExecuteCommand = (item: CommandItem) => {
    closePalette();

    if (item.isSecret) {
      // Enter the Hidden Dimension
      setIsSecretActive(true);
      return;
    }

    // Navigation Commands
    if (item.targetId) {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement | number, opts?: { offset?: number; duration?: number }) => void } }).__lenis;

      if (item.targetId === 'top') {
        if (lenis) {
          lenis.scrollTo(0, { duration: 1.2 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      const targetEl = document.getElementById(item.targetId);
      if (targetEl) {
        if (lenis) {
          lenis.scrollTo(targetEl, { offset: -40, duration: 1.2 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <>
      {/* 1. Interactive Command Search Overlay */}
      <AfterHoursPalette
        isOpen={isPaletteOpen && !isSecretActive}
        onClose={closePalette}
        onExecuteCommand={handleExecuteCommand}
      />

      {/* 2. The Secret Dimension Experience */}
      <AfterHoursSecretView
        isOpen={isSecretActive}
        onExit={exitSecretDimension}
      />
    </>
  );
};

