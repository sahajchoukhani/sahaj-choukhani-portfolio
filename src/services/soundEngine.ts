/**
 * Web Audio API Sound Engine (Upgraded)
 * 
 * Features:
 * - Independent Music (ambience/track) and SFX (keystrokes/clicks/whooshes) buses.
 * - Single external background track support with seamless procedural fallback.
 * - Procedural intro soundtrack generator (0-2s drone -> 2.0s upbeat electronic arpeggio)
 *   when external `portfolio_intro_22s.mp3` is not yet dropped on disk.
 * - Default muted state respecting all browser autoplay restrictions.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMasterMuted: boolean = true;
  private isMusicMuted: boolean = false;
  private isSfxMuted: boolean = false;

  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;

  // Procedural ambient synth pad nodes
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private isAmbientPlaying: boolean = false;

  // External audio element for single background track
  private externalMusicAudio: HTMLAudioElement | null = null;
  private hasExternalMusicLoaded: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const savedMaster = localStorage.getItem('sahaj_sound_master_enabled');
      this.isMasterMuted = savedMaster !== 'true'; // Default muted
      const savedMusic = localStorage.getItem('sahaj_sound_music_enabled');
      this.isMusicMuted = savedMusic === 'false';
      const savedSfx = localStorage.getItem('sahaj_sound_sfx_enabled');
      this.isSfxMuted = savedSfx === 'false';
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMasterMuted ? 0.0001 : 1.0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Music Gain Bus
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(this.isMusicMuted ? 0.0001 : 0.8, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      // SFX Gain Bus
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.isSfxMuted ? 0.0001 : 1.0, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // -------------------------------------------------------------
  // CONTROLS & PERSISTENCE
  // -------------------------------------------------------------
  public getMuted(): boolean {
    return this.isMasterMuted;
  }

  public isMusicOn(): boolean {
    return !this.isMasterMuted && !this.isMusicMuted;
  }

  public isSfxOn(): boolean {
    return !this.isMasterMuted && !this.isSfxMuted;
  }

  public setMasterMuted(muted: boolean) {
    this.isMasterMuted = muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('sahaj_sound_master_enabled', (!muted).toString());
    }

    this.initContext();
    if (this.masterGain && this.ctx) {
      const t = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(muted ? 0.0001 : 1.0, t);
    }

    if (!muted) {
      if (!this.isMusicMuted) {
        this.startAmbient();
      }
      this.playTactileClick();
    } else {
      this.stopAmbient();
    }
  }

  public toggleMute(): boolean {
    this.setMasterMuted(!this.isMasterMuted);
    return this.isMasterMuted;
  }

  public toggleMusic(): boolean {
    this.isMusicMuted = !this.isMusicMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('sahaj_sound_music_enabled', (!this.isMusicMuted).toString());
    }

    if (this.musicGain && this.ctx) {
      const t = this.ctx.currentTime;
      this.musicGain.gain.setValueAtTime(this.isMusicMuted ? 0.0001 : 0.8, t);
    }

    if (this.isMusicMuted) {
      this.stopAmbient();
    } else if (!this.isMasterMuted) {
      this.startAmbient();
    }
    return !this.isMusicMuted;
  }

  public toggleSfx(): boolean {
    this.isSfxMuted = !this.isSfxMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('sahaj_sound_sfx_enabled', (!this.isSfxMuted).toString());
    }

    if (this.sfxGain && this.ctx) {
      const t = this.ctx.currentTime;
      this.sfxGain.gain.setValueAtTime(this.isSfxMuted ? 0.0001 : 1.0, t);
    }
    if (!this.isSfxMuted) {
      this.playTactileClick();
    }
    return !this.isSfxMuted;
  }

  // -------------------------------------------------------------
  // PROCEDURAL SOUND EFFECTS (SFX BUS) - REFINED & LUXURY TUNED
  // -------------------------------------------------------------
  public playKeyClick() {
    if (this.isMasterMuted || this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    // Organic, warm, low-frequency felt mechanical key tap
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, t);
    osc.frequency.exponentialRampToValueAtTime(90, t + 0.025);

    gain.gain.setValueAtTime(0.018, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.025);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.025);
  }

  public playTactileClick() {
    if (this.isMasterMuted || this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    // Ultra-subtle haptic micro-tap (120Hz luxury watch bezel click)
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(60, t + 0.015);

    gain.gain.setValueAtTime(0.02, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.015);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.015);
  }

  // Hover tone permanently silenced: eliminated irritating UI hover chirps site-wide
  public playHoverTone() {
    // Deliberately no-op to maintain quiet, refined browsing experience
  }

  public playModalWhoosh() {
    if (this.isMasterMuted || this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.25);

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.25);
  }

  public playVictoryFanfare() {
    if (this.isMasterMuted || this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const chords = [523.25, 659.25, 783.99, 1046.5];
    chords.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGain) return;
      const t = this.ctx.currentTime + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.05, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 0.35);
    });
  }

  // Active soundtrack cleanup handles
  private introSoundtrackNodes: { stop: () => void; disconnect: () => void }[] = [];
  private isIntroSoundtrackActive: boolean = false;
  private introAudioBuffer: AudioBuffer | null = null;
  private introBufferSource: AudioBufferSourceNode | null = null;
  private isIntroBufferLoading: boolean = false;

  // -------------------------------------------------------------
  // PRELOAD MASTER FAST CINEMATIC SOUNDTRACK (11.2 SECONDS)
  // -------------------------------------------------------------
  public async preloadCinematicIntroSoundtrack() {
    if (this.introAudioBuffer || this.isIntroBufferLoading) return;
    this.initContext();
    if (!this.ctx) return;
    this.isIntroBufferLoading = true;

    const urls = ['/audio/portfolio_intro_fast.m4a', '/audio/portfolio_intro_fast.wav'];
    for (const url of urls) {
      try {
        const res = await fetch(url);
        if (!res.ok) continue;
        const arrayBuf = await res.arrayBuffer();
        this.introAudioBuffer = await this.ctx.decodeAudioData(arrayBuf);
        break;
      } catch {
        // Continue to fallback format
      }
    }
    this.isIntroBufferLoading = false;
  }

  // -------------------------------------------------------------
  // MASTER FAST CINEMATIC INTRO SOUNDTRACK (11.2 SECONDS)
  // 0.0s – 2.85s: Slow Google Flow tension build
  // 2.85s – 3.05s: Pre-drop vacuum silence
  // 3.05s – 7.80s: 150 BPM Cyberpunk Breakbeat & Synth Rush
  // 7.80s – 8.60s: Emotional Solitary Piano Note
  // 8.60s – 11.20s: Monumental Hans Zimmer Braam Climax Boom
  // -------------------------------------------------------------
  public startCinematicIntroSoundtrack() {
    this.stopCinematicIntroSoundtrack();
    this.initContext();
    if (!this.ctx || !this.musicGain) return;

    this.isIntroSoundtrackActive = true;

    // Strategy A: If decoded master buffer is already cached, play with sample-accurate Web Audio
    if (this.introAudioBuffer) {
      try {
        const source = this.ctx.createBufferSource();
        source.buffer = this.introAudioBuffer;
        source.connect(this.musicGain);
        source.start(this.ctx.currentTime);
        this.introBufferSource = source;
        this.introSoundtrackNodes.push({
          stop: () => { try { source.stop(); } catch {} },
          disconnect: () => { try { source.disconnect(); } catch {} }
        });
        return;
      } catch (e) {
        console.warn('AudioBuffer playback exception, falling back:', e);
      }
    }

    // Strategy B: If buffer is downloading, start it upon arrival
    this.preloadCinematicIntroSoundtrack().then(() => {
      if (this.isIntroSoundtrackActive && this.introAudioBuffer && this.ctx && this.musicGain && !this.introBufferSource) {
        try {
          const source = this.ctx.createBufferSource();
          source.buffer = this.introAudioBuffer;
          source.connect(this.musicGain);
          source.start(this.ctx.currentTime);
          this.introBufferSource = source;
          this.introSoundtrackNodes.push({
            stop: () => { try { source.stop(); } catch {} },
            disconnect: () => { try { source.disconnect(); } catch {} }
          });
          return;
        } catch {}
      }
    });

    // Strategy C: High-octane procedural 150 BPM synthesizer engine (Zero network dependency)
    try {
      const now = this.ctx.currentTime;

      // 1. FLOW TENSION (0.0s – 2.85s): Deep sub drone + string harmonic bed + rising tension filter
      const droneOsc = this.ctx.createOscillator();
      const droneGain = this.ctx.createGain();
      droneOsc.type = 'sine';
      droneOsc.frequency.setValueAtTime(36.71, now); // D1 deep fundamental sub
      droneGain.gain.setValueAtTime(0.0001, now);
      droneGain.gain.exponentialRampToValueAtTime(0.20, now + 0.6);
      droneGain.gain.setValueAtTime(0.20, now + 2.4);
      droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.85); // Cuts abruptly for pre-drop vacuum
      droneOsc.connect(droneGain);
      droneGain.connect(this.musicGain);
      droneOsc.start(now);
      droneOsc.stop(now + 2.85);
      this.introSoundtrackNodes.push({ stop: () => { try { droneOsc.stop(); } catch {} }, disconnect: () => droneOsc.disconnect() });

      // Tension Riser Filter Sweep (1.0s – 2.85s)
      const riserOsc = this.ctx.createOscillator();
      const riserFilter = this.ctx.createBiquadFilter();
      const riserGain = this.ctx.createGain();
      riserOsc.type = 'sawtooth';
      riserOsc.frequency.setValueAtTime(73.42, now + 1.0); // D2
      riserFilter.type = 'lowpass';
      riserFilter.frequency.setValueAtTime(140, now + 1.0);
      riserFilter.frequency.exponentialRampToValueAtTime(2400, now + 2.80);
      riserFilter.Q.setValueAtTime(4.0, now + 1.0);
      riserGain.gain.setValueAtTime(0.0001, now + 1.0);
      riserGain.gain.exponentialRampToValueAtTime(0.12, now + 2.80);
      riserGain.gain.setValueAtTime(0.0001, now + 2.85);
      riserOsc.connect(riserFilter);
      riserFilter.connect(riserGain);
      riserGain.connect(this.musicGain);
      riserOsc.start(now + 1.0);
      riserOsc.stop(now + 2.85);
      this.introSoundtrackNodes.push({ stop: () => { try { riserOsc.stop(); } catch {} }, disconnect: () => riserOsc.disconnect() });

      // 2. THE DROP: 150 BPM HYPER-KINETIC BREAKBEAT (3.05s – 7.80s)
      // 150 BPM = 0.40s per beat (2.5 beats/sec)
      const beatDur = 60 / 150; // 0.40s
      const dropStart = now + 3.05;
      const dropEnd = now + 7.80;
      const totalBeats = Math.floor((dropEnd - dropStart) / beatDur);

      // Bass notes in D minor pentatonic: D1, F1, G1, A1, C2
      const fastBass = [36.71, 43.65, 48.99, 55.0, 65.41];

      for (let b = 0; b < totalBeats; b++) {
        const beatTime = dropStart + b * beatDur;
        if (beatTime >= dropEnd) break;

        // Sub Kick on every beat
        const kickOsc = this.ctx.createOscillator();
        const kickGain = this.ctx.createGain();
        kickOsc.type = 'sine';
        kickOsc.frequency.setValueAtTime(130, beatTime);
        kickOsc.frequency.exponentialRampToValueAtTime(32, beatTime + 0.16);
        kickGain.gain.setValueAtTime(0.35, beatTime);
        kickGain.gain.exponentialRampToValueAtTime(0.0001, beatTime + 0.18);
        kickOsc.connect(kickGain);
        kickGain.connect(this.musicGain);
        kickOsc.start(beatTime);
        kickOsc.stop(beatTime + 0.18);
        this.introSoundtrackNodes.push({ stop: () => { try { kickOsc.stop(); } catch {} }, disconnect: () => kickOsc.disconnect() });

        // Punchy Snare on offbeat (beat 1 and 3 of 4-beat measure, or half-beats)
        if (b % 2 === 1) {
          const snOsc = this.ctx.createOscillator();
          const snGain = this.ctx.createGain();
          snOsc.type = 'triangle';
          snOsc.frequency.setValueAtTime(220, beatTime);
          snOsc.frequency.exponentialRampToValueAtTime(80, beatTime + 0.12);
          snGain.gain.setValueAtTime(0.20, beatTime);
          snGain.gain.exponentialRampToValueAtTime(0.0001, beatTime + 0.12);
          snOsc.connect(snGain);
          snGain.connect(this.musicGain);
          snOsc.start(beatTime);
          snOsc.stop(beatTime + 0.12);
          this.introSoundtrackNodes.push({ stop: () => { try { snOsc.stop(); } catch {} }, disconnect: () => snOsc.disconnect() });
        }

        // Rolling 16th Hi-Hats (4 hats per beat)
        for (let sub = 0; sub < 4; sub++) {
          const subTime = beatTime + sub * (beatDur / 4);
          if (subTime >= dropEnd) break;
          const hatOsc = this.ctx.createOscillator();
          const hatGain = this.ctx.createGain();
          hatOsc.type = 'triangle';
          hatOsc.frequency.setValueAtTime(3400 + sub * 250, subTime);
          hatGain.gain.setValueAtTime(sub === 0 ? 0.045 : 0.025, subTime);
          hatGain.gain.exponentialRampToValueAtTime(0.0001, subTime + 0.025);
          hatOsc.connect(hatGain);
          hatGain.connect(this.musicGain);
          hatOsc.start(subTime);
          hatOsc.stop(subTime + 0.025);
          this.introSoundtrackNodes.push({ stop: () => { try { hatOsc.stop(); } catch {} }, disconnect: () => hatOsc.disconnect() });
        }

        // Fast Cyberpunk Saw Bassline
        const bassFreq = fastBass[b % fastBass.length];
        const bassOsc = this.ctx.createOscillator();
        const bassFilter = this.ctx.createBiquadFilter();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'sawtooth';
        bassOsc.frequency.setValueAtTime(bassFreq, beatTime);
        bassFilter.type = 'lowpass';
        bassFilter.frequency.setValueAtTime(1400, beatTime);
        bassFilter.frequency.exponentialRampToValueAtTime(280, beatTime + beatDur * 0.85);
        bassGain.gain.setValueAtTime(0.12, beatTime);
        bassGain.gain.exponentialRampToValueAtTime(0.0001, beatTime + beatDur * 0.85);
        bassOsc.connect(bassFilter);
        bassFilter.connect(bassGain);
        bassGain.connect(this.musicGain);
        bassOsc.start(beatTime);
        bassOsc.stop(beatTime + beatDur * 0.85);
        this.introSoundtrackNodes.push({ stop: () => { try { bassOsc.stop(); } catch {} }, disconnect: () => bassOsc.disconnect() });

        // Rapid 16th Polyphonic Synth Arp (3.05s – 7.80s)
        const arpNotes = [293.66, 349.23, 440.0, 523.25, 587.33, 698.46, 880.0];
        for (let a = 0; a < 2; a++) {
          const aTime = beatTime + a * (beatDur / 2);
          if (aTime >= dropEnd) break;
          const aFreq = arpNotes[(b * 2 + a) % arpNotes.length];
          const aOsc = this.ctx.createOscillator();
          const aGain = this.ctx.createGain();
          aOsc.type = 'sawtooth';
          aOsc.frequency.setValueAtTime(aFreq, aTime);
          aGain.gain.setValueAtTime(0.04, aTime);
          aGain.gain.exponentialRampToValueAtTime(0.0001, aTime + beatDur * 0.45);
          aOsc.connect(aGain);
          aGain.connect(this.musicGain);
          aOsc.start(aTime);
          aOsc.stop(aTime + beatDur * 0.45);
          this.introSoundtrackNodes.push({ stop: () => { try { aOsc.stop(); } catch {} }, disconnect: () => aOsc.disconnect() });
        }
      }

      // 3. ACT V (7.80s – 8.60s): THE EMOTIONAL POETRY PAUSE (DELIBERATE SILENCE)
      // All drums and synths cut out completely.
      const poetStart = now + 7.80;
      const pianoChime = this.ctx.createOscillator();
      const pianoChimeGain = this.ctx.createGain();
      pianoChime.type = 'sine';
      pianoChime.frequency.setValueAtTime(293.66, poetStart); // D4
      pianoChimeGain.gain.setValueAtTime(0.14, poetStart);
      pianoChimeGain.gain.exponentialRampToValueAtTime(0.0001, poetStart + 1.2);
      pianoChime.connect(pianoChimeGain);
      pianoChimeGain.connect(this.musicGain);
      pianoChime.start(poetStart);
      pianoChime.stop(poetStart + 1.2);
      this.introSoundtrackNodes.push({ stop: () => { try { pianoChime.stop(); } catch {} }, disconnect: () => pianoChime.disconnect() });

      // 4. ACT VI (8.60s – 11.20s): MONUMENTAL CLIMAX REVEAL (Hans Zimmer Braam + Minor 9th Swell)
      const braamStart = now + 8.60;
      const braamOsc = this.ctx.createOscillator();
      const braamFilter = this.ctx.createBiquadFilter();
      const braamGain = this.ctx.createGain();
      braamOsc.type = 'sawtooth';
      braamOsc.frequency.setValueAtTime(73.42, braamStart); // D2
      braamOsc.frequency.exponentialRampToValueAtTime(34.0, braamStart + 1.8);
      braamFilter.type = 'lowpass';
      braamFilter.frequency.setValueAtTime(800, braamStart);
      braamFilter.frequency.exponentialRampToValueAtTime(140, braamStart + 2.0);
      braamGain.gain.setValueAtTime(0.0001, braamStart);
      braamGain.gain.linearRampToValueAtTime(0.35, braamStart + 0.08);
      braamGain.gain.exponentialRampToValueAtTime(0.0001, braamStart + 2.5);
      braamOsc.connect(braamFilter);
      braamFilter.connect(braamGain);
      braamGain.connect(this.musicGain);
      braamOsc.start(braamStart);
      braamOsc.stop(braamStart + 2.5);
      this.introSoundtrackNodes.push({ stop: () => { try { braamOsc.stop(); } catch {} }, disconnect: () => braamOsc.disconnect() });

      // Minor 9th Orchestral Swell Chord (D3, F3, A3, C4, E4)
      const chordNotes = [146.83, 174.61, 220.0, 261.63, 329.63];
      chordNotes.forEach((freq) => {
        if (!this.ctx || !this.musicGain) return;
        const cOsc = this.ctx.createOscillator();
        const cGain = this.ctx.createGain();
        cOsc.type = 'triangle';
        cOsc.frequency.setValueAtTime(freq, braamStart);
        cGain.gain.setValueAtTime(0.0001, braamStart);
        cGain.gain.exponentialRampToValueAtTime(0.05, braamStart + 0.4);
        cGain.gain.exponentialRampToValueAtTime(0.0001, braamStart + 2.4);
        cOsc.connect(cGain);
        cGain.connect(this.musicGain);
        cOsc.start(braamStart);
        cOsc.stop(braamStart + 2.4);
        this.introSoundtrackNodes.push({ stop: () => { try { cOsc.stop(); } catch {} }, disconnect: () => cOsc.disconnect() });
      });

    } catch (e) {
      console.warn('Procedural soundtrack engine exception:', e);
    }
  }

  public stopCinematicIntroSoundtrack() {
    this.isIntroSoundtrackActive = false;
    if (this.introBufferSource) {
      try {
        this.introBufferSource.stop();
        this.introBufferSource.disconnect();
      } catch {}
      this.introBufferSource = null;
    }
    this.introSoundtrackNodes.forEach((node) => {
      try {
        node.stop();
        node.disconnect();
      } catch {}
    });
    this.introSoundtrackNodes = [];
  }

  // -------------------------------------------------------------
  // BESPOKE VISUAL-SYNCHRONIZED SOUND DESIGN (SFX BUS)
  // -------------------------------------------------------------

  /**
   * 1. THE MECHANICAL KEYBOARD KEYPRESS (Tactile, metallic, close-up)
   */
  public playDeliberateMechanicalKey() {
    if (this.isMasterMuted || this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;

      // A. Mechanical switch metal-leaf click (crisp high metallic transient)
      const clickOsc = this.ctx.createOscillator();
      const clickGain = this.ctx.createGain();
      clickOsc.type = 'triangle';
      clickOsc.frequency.setValueAtTime(3200, t);
      clickOsc.frequency.exponentialRampToValueAtTime(1400, t + 0.015);
      clickGain.gain.setValueAtTime(0.22, t);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.015);
      clickOsc.connect(clickGain);
      clickGain.connect(this.sfxGain);
      clickOsc.start(t);
      clickOsc.stop(t + 0.015);

      // B. Keycap bottom-out impact thud (low-frequency tactile body)
      const thudOsc = this.ctx.createOscillator();
      const thudGain = this.ctx.createGain();
      thudOsc.type = 'sine';
      thudOsc.frequency.setValueAtTime(145, t);
      thudOsc.frequency.exponentialRampToValueAtTime(55, t + 0.045);
      thudGain.gain.setValueAtTime(0.35, t);
      thudGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);
      thudOsc.connect(thudGain);
      thudGain.connect(this.sfxGain);
      thudOsc.start(t);
      thudOsc.stop(t + 0.045);

      // C. Delicate metallic spring resonance ring
      const springOsc = this.ctx.createOscillator();
      const springGain = this.ctx.createGain();
      springOsc.type = 'sine';
      springOsc.frequency.setValueAtTime(1680, t);
      springGain.gain.setValueAtTime(0.08, t);
      springGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
      springOsc.connect(springGain);
      springGain.connect(this.sfxGain);
      springOsc.start(t);
      springOsc.stop(t + 0.18);
    } catch {}
  }

  /**
   * 2. PIANO HAMMER STRIKE & STRING HARMONIC RESONANCE
   * Synchronized with exact felt hammer contact on the wire
   */
  public playPianoHammerStrike() {
    if (this.isMasterMuted || this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;

      // A. Felt hammer physical contact transient (thump)
      const feltOsc = this.ctx.createOscillator();
      const feltGain = this.ctx.createGain();
      feltOsc.type = 'triangle';
      feltOsc.frequency.setValueAtTime(220, t);
      feltOsc.frequency.exponentialRampToValueAtTime(75, t + 0.035);
      feltGain.gain.setValueAtTime(0.28, t);
      feltGain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);
      feltOsc.connect(feltGain);
      feltGain.connect(this.sfxGain);
      feltOsc.start(t);
      feltOsc.stop(t + 0.035);

      // B. Multi-harmonic acoustic piano string resonance: D3 (146.8Hz), D4 (293.6Hz), A4 (440Hz), D5 (587.3Hz)
      const harmonics = [
        { f: 146.83, g: 0.30, decay: 1.8 },
        { f: 293.66, g: 0.22, decay: 1.5 },
        { f: 440.00, g: 0.14, decay: 1.2 },
        { f: 587.33, g: 0.08, decay: 0.9 },
      ];

      harmonics.forEach(({ f, g, decay }) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t);
        gain.gain.setValueAtTime(g, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + decay);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + decay);
      });
    } catch {}
  }

  /**
   * 2b. INDIVIDUAL PIANO KEY STRIKE (PHYSICAL ACOUSTIC MODELLING)
   * Felt hammer transient + tuned harmonic overtone series for interactive keyboard
   */
  public playPianoKeyNote(fundamental: number, duration: number = 1.6) {
    if (this.isMasterMuted || this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;

      // 1. Felt hammer contact impulse
      const felt = this.ctx.createOscillator();
      const feltGain = this.ctx.createGain();
      felt.type = 'triangle';
      felt.frequency.setValueAtTime(fundamental * 0.85, t);
      felt.frequency.exponentialRampToValueAtTime(fundamental * 0.25, t + 0.035);
      feltGain.gain.setValueAtTime(0.18, t);
      feltGain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);
      felt.connect(feltGain);
      feltGain.connect(this.sfxGain);
      felt.start(t);
      felt.stop(t + 0.035);

      // 2. 4-part acoustic harmonic overtone series
      const harmonics = [
        { mult: 1.0, gain: 0.32, decay: duration },
        { mult: 2.0, gain: 0.18, decay: duration * 0.82 },
        { mult: 3.0, gain: 0.09, decay: duration * 0.65 },
        { mult: 4.0, gain: 0.04, decay: duration * 0.45 },
      ];

      harmonics.forEach(({ mult, gain: g, decay }) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(fundamental * mult, t);
        gain.gain.setValueAtTime(g, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + decay);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + decay);
      });
    } catch {}
  }

  /**
   * 3. VIBRATING BRONZE / PIANO WIRE OSCILLATION & SHIMMER
   */
  public playBronzeWireVibration() {
    if (this.isMasterMuted || this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;

      // A. Metallic pluck excitation impulse
      const pluck = this.ctx.createOscillator();
      const pluckGain = this.ctx.createGain();
      pluck.type = 'triangle';
      pluck.frequency.setValueAtTime(2900, t);
      pluck.frequency.exponentialRampToValueAtTime(680, t + 0.02);
      pluckGain.gain.setValueAtTime(0.24, t);
      pluckGain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
      pluck.connect(pluckGain);
      pluckGain.connect(this.sfxGain);
      pluck.start(t);
      pluck.stop(t + 0.02);

      // B. Tremolo LFO (12Hz physical wire fluttering)
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(12.5, t); // 12.5 Hz flutter
      lfoGain.gain.setValueAtTime(0.4, t);

      // Inharmonic metallic wire resonances
      const wirePitches = [440, 880, 1340, 2180, 3450];
      wirePitches.forEach((pitch, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(pitch, t);

        const modGain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.12 / (idx + 1), t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);

        lfo.connect(modGain.gain);
        osc.connect(modGain);
        modGain.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(t);
        osc.stop(t + 1.8);
      });

      lfo.start(t);
      lfo.stop(t + 1.8);
    } catch {}
  }

  /**
   * 4. TIGHT AERODYNAMIC WHOOSH / SWISH (Visual Cut Transitions)
   */
  public playTightTransitionSwish() {
    if (this.isMasterMuted || this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.12);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2600, t);
      filter.frequency.exponentialRampToValueAtTime(380, t + 0.11);
      filter.Q.setValueAtTime(2.2, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(0.16, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.11);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      noise.start(t);
      noise.stop(t + 0.12);
    } catch {}
  }

  /**
   * 5. SUB-BASS IMPACT PUNCH (Podium and High-Value Cuts)
   */
  public playSubBassPunch(freq: number = 88) {
    if (this.isMasterMuted || this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(26, t + 0.32);

      gain.gain.setValueAtTime(0.38, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.32);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 0.32);
    } catch {}
  }

  /**
   * 6. AUTHENTIC MECHANICAL CAMERA SHUTTER (Photo Verification Cuts)
   */
  public playCameraShutter() {
    if (this.isMasterMuted || this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;

      // Curtain A strike
      const c1Osc = this.ctx.createOscillator();
      const c1Gain = this.ctx.createGain();
      c1Osc.type = 'triangle';
      c1Osc.frequency.setValueAtTime(2400, t);
      c1Osc.frequency.exponentialRampToValueAtTime(800, t + 0.015);
      c1Gain.gain.setValueAtTime(0.24, t);
      c1Gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.015);
      c1Osc.connect(c1Gain);
      c1Gain.connect(this.sfxGain);
      c1Osc.start(t);
      c1Osc.stop(t + 0.015);

      // Curtain B closing click 45ms later
      const c2Osc = this.ctx.createOscillator();
      const c2Gain = this.ctx.createGain();
      c2Osc.type = 'triangle';
      c2Osc.frequency.setValueAtTime(1800, t + 0.045);
      c2Osc.frequency.exponentialRampToValueAtTime(450, t + 0.075);
      c2Gain.gain.setValueAtTime(0.28, t + 0.045);
      c2Gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.075);
      c2Osc.connect(c2Gain);
      c2Gain.connect(this.sfxGain);
      c2Osc.start(t + 0.045);
      c2Osc.stop(t + 0.075);
    } catch {}
  }

  /**
   * 7. 35MM ANALOG PROJECTOR GATE LATCH (Film Reel Engagement at 4.7s)
   */
  public playAnalogProjectorGateLatch() {
    if (this.isMasterMuted || this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;

      // A. Mechanical optical gate latch click (brass claw engagement)
      const clawOsc = this.ctx.createOscillator();
      const clawGain = this.ctx.createGain();
      clawOsc.type = 'triangle';
      clawOsc.frequency.setValueAtTime(2800, t);
      clawOsc.frequency.exponentialRampToValueAtTime(950, t + 0.02);
      clawGain.gain.setValueAtTime(0.25, t);
      clawGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.02);
      clawOsc.connect(clawGain);
      clawGain.connect(this.sfxGain);
      clawOsc.start(t);
      clawOsc.stop(t + 0.02);

      // B. Celluloid sprocket tooth tick
      const toothOsc = this.ctx.createOscillator();
      const toothGain = this.ctx.createGain();
      toothOsc.type = 'sine';
      toothOsc.frequency.setValueAtTime(740, t + 0.015);
      toothOsc.frequency.exponentialRampToValueAtTime(220, t + 0.05);
      toothGain.gain.setValueAtTime(0.2, t + 0.015);
      toothGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
      toothOsc.connect(toothGain);
      toothGain.connect(this.sfxGain);
      toothOsc.start(t + 0.015);
      toothOsc.stop(t + 0.05);

      // C. Heavy metal projector chassis thump
      const chassisOsc = this.ctx.createOscillator();
      const chassisGain = this.ctx.createGain();
      chassisOsc.type = 'sine';
      chassisOsc.frequency.setValueAtTime(95, t);
      chassisOsc.frequency.exponentialRampToValueAtTime(32, t + 0.18);
      chassisGain.gain.setValueAtTime(0.3, t);
      chassisGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
      chassisOsc.connect(chassisGain);
      chassisGain.connect(this.sfxGain);
      chassisOsc.start(t);
      chassisOsc.stop(t + 0.18);
    } catch {}
  }

  /**
   * 8. PROJECTOR LIGHT LEAK & FILM-BURN FLARE
   */
  public playProjectorLightLeakFlare() {
    if (this.isMasterMuted || this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1100, t);
      osc.frequency.exponentialRampToValueAtTime(420, t + 0.14);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(0.09, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 0.14);
    } catch {}
  }

  /**
   * 9. REVERSE SWELL (Anticipation build into major section shifts)
   */
  public playReverseSwell(duration: number = 0.35) {
    if (this.isMasterMuted || this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(280, t);
      filter.frequency.exponentialRampToValueAtTime(2400, t + duration);
      filter.Q.setValueAtTime(2.5, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.18, t + duration - 0.02);
      gain.gain.setValueAtTime(0.0001, t + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      noise.start(t);
      noise.stop(t + duration);
    } catch {}
  }

  /**
   * 8. THEATRICAL ACOUSTIC WARM SWELL (Cultural Studio & Stage Repertoire)
   */
  public playTheatricalWarmSwell() {
    if (this.isMasterMuted || this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;
      [220, 277.18, 329.63, 440].forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.linearRampToValueAtTime(0.04, t + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 1.2);
      });
    } catch {}
  }

  /**
   * 9. CLIMAX REVEAL BOOM & METALLIC SHIMMER (The Monolith Portrait Signature Moment)
   */
  public playClimaxRevealBoom() {
    if (this.isMasterMuted || this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;

      // A. Colossal Sub-Bass Boom (95Hz down to 20Hz over 2.6s)
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(95, t);
      subOsc.frequency.exponentialRampToValueAtTime(20, t + 2.5);
      subGain.gain.setValueAtTime(0.55, t);
      subGain.gain.exponentialRampToValueAtTime(0.0001, t + 2.5);
      subOsc.connect(subGain);
      subGain.connect(this.sfxGain);
      subOsc.start(t);
      subOsc.stop(t + 2.5);

      // B. Transient Punch (190Hz -> 60Hz body thud)
      const punchOsc = this.ctx.createOscillator();
      const punchGain = this.ctx.createGain();
      punchOsc.type = 'triangle';
      punchOsc.frequency.setValueAtTime(190, t);
      punchOsc.frequency.exponentialRampToValueAtTime(50, t + 0.12);
      punchGain.gain.setValueAtTime(0.35, t);
      punchGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      punchOsc.connect(punchGain);
      punchGain.connect(this.sfxGain);
      punchOsc.start(t);
      punchOsc.stop(t + 0.12);

      // C. Crystalline High Shimmer & Metallic Overtones (Aesthetic Gold/Bronze Resonance)
      const shimmerChimes = [880, 1174.66, 1479.98, 1760, 2349.32]; // D major 9 shimmering harmonics
      shimmerChimes.forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const chime = this.ctx.createOscillator();
        const cGain = this.ctx.createGain();
        chime.type = 'sine';
        chime.frequency.setValueAtTime(freq, t + idx * 0.03);
        cGain.gain.setValueAtTime(0.06, t + idx * 0.03);
        cGain.gain.exponentialRampToValueAtTime(0.0001, t + 2.8);
        chime.connect(cGain);
        cGain.connect(this.sfxGain);
        chime.start(t + idx * 0.03);
        chime.stop(t + 2.8);
      });
    } catch {}
  }

  // -------------------------------------------------------------
  // AMBIENT BACKGROUND MUSIC (MUSIC BUS)
  // -------------------------------------------------------------
  private startAmbient() {
    if (this.isAmbientPlaying) return;
    this.initContext();
    if (!this.ctx || !this.musicGain) return;

    try {
      const t = this.ctx.currentTime;
      // Low warm pad (D minor root at 73.4Hz + A2 at 110Hz)
      this.ambientOsc1 = this.ctx.createOscillator();
      this.ambientOsc1.type = 'sine';
      this.ambientOsc1.frequency.setValueAtTime(73.42, t);

      this.ambientOsc2 = this.ctx.createOscillator();
      this.ambientOsc2.type = 'triangle';
      this.ambientOsc2.frequency.setValueAtTime(110.0, t);

      const padGain = this.ctx.createGain();
      padGain.gain.setValueAtTime(0.0001, t);
      padGain.gain.exponentialRampToValueAtTime(0.025, t + 2.0);

      this.ambientOsc1.connect(padGain);
      this.ambientOsc2.connect(padGain);
      padGain.connect(this.musicGain);

      this.ambientOsc1.start();
      this.ambientOsc2.start();
      this.isAmbientPlaying = true;
    } catch {
      // Audio context restricted until user gesture
    }
  }

  private stopAmbient() {
    if (!this.isAmbientPlaying) return;
    try {
      this.ambientOsc1?.stop();
      this.ambientOsc2?.stop();
      this.ambientOsc1?.disconnect();
      this.ambientOsc2?.disconnect();
      this.isAmbientPlaying = false;
    } catch {
      this.isAmbientPlaying = false;
    }
  }
  /**
   * Backward-compatible aliases
   */
  public playMechanicalImpact() { this.playDeliberateMechanicalKey(); }
  public playSubBassImpact() { this.playSubBassPunch(); }
  public playGlitchBurst() { this.playTightTransitionSwish(); }
  public playCinematicBoom() { this.playClimaxRevealBoom(); }
}

export const sound = new SoundEngine();
