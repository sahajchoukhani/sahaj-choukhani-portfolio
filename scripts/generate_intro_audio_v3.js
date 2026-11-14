import fs from 'fs';
import path from 'path';

/**
 * World-Class Cinematic Audio Synthesizer — "THE MAKING OF SAHAJ" (v3)
 * 
 * Inspired by international awards ceremonies, luxury brand films & Hans Zimmer trailer acoustics.
 * Exact duration: 11.500000 seconds (552,000 samples @ 48,000 Hz, 16-bit Stereo PCM).
 */

const SAMPLE_RATE = 48000;
const CHANNELS = 2;
const DURATION = 11.5;
const TOTAL_SAMPLES = Math.floor(DURATION * SAMPLE_RATE); // 552,000

function createWavBuffer(leftChannel, rightChannel) {
  const numSamples = leftChannel.length;
  const dataSize = numSamples * CHANNELS * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(CHANNELS, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * CHANNELS * 2, 28);
  buffer.writeUInt16LE(CHANNELS * 2, 32);
  buffer.writeUInt16LE(16, 34); // 16-bit

  // data chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    // Soft-knee analog tape saturation
    let l = leftChannel[i];
    let r = rightChannel[i];

    // Smooth saturation curve (tanh-like without harsh clipping)
    l = l / (1 + Math.abs(l) * 0.25);
    r = r / (1 + Math.abs(r) * 0.25);

    // Peak limit
    l = Math.max(-0.96, Math.min(0.96, l));
    r = Math.max(-0.96, Math.min(0.96, r));

    const intL = l < 0 ? Math.floor(l * 32768) : Math.floor(l * 32767);
    const intR = r < 0 ? Math.floor(r * 32768) : Math.floor(r * 32767);

    buffer.writeInt16LE(intL, offset);
    buffer.writeInt16LE(intR, offset + 2);
    offset += 4;
  }

  return buffer;
}

// -------------------------------------------------------------
// PHYSICAL ACOUSTIC SYNTHESIS ENGINES
// -------------------------------------------------------------

// 1. Cinematic Membrane Bass Drum (Taiko / Orchestral Bass)
function synthesizeDrumImpact(fundamental = 52, duration = 0.65, attackMs = 8) {
  const len = Math.floor(duration * SAMPLE_RATE);
  const left = new Float32Array(len);
  const right = new Float32Array(len);
  const attackSamples = Math.floor((attackMs / 1000) * SAMPLE_RATE);

  for (let i = 0; i < len; i++) {
    const t = i / SAMPLE_RATE;

    // Pitch envelope: drops rapidly from 130Hz to fundamental
    const pitch = fundamental + 80 * Math.exp(-t * 35);
    const phase = 2 * Math.PI * (fundamental * t - (80 / 35) * Math.exp(-t * 35));

    // Attack / Decay Envelope
    let env = 0;
    if (i < attackSamples) {
      env = Math.sin((i / attackSamples) * (Math.PI / 2));
    } else {
      env = Math.exp(-(t - attackMs / 1000) * 8.5);
    }

    // Inharmonic drum head partials (Bessel ratios ~ 1.59, 2.14, 2.65)
    const partial1 = Math.sin(phase * 1.59) * 0.22 * Math.exp(-t * 18);
    const partial2 = Math.sin(phase * 2.14) * 0.12 * Math.exp(-t * 26);

    // Beater transient click
    const click = (Math.random() * 2 - 1) * Math.exp(-t * 180) * 0.35;

    const val = (Math.sin(phase) + partial1 + partial2 + click) * env;
    left[i] = val * 0.98;
    right[i] = val * 0.98;
  }
  return { left, right };
}

// 2. High-Precision Mechanical Camera Shutter
function synthesizeMechanicalShutter(pitchMult = 1.0) {
  const duration = 0.18;
  const len = Math.floor(duration * SAMPLE_RATE);
  const left = new Float32Array(len);
  const right = new Float32Array(len);

  for (let i = 0; i < len; i++) {
    const t = i / SAMPLE_RATE;

    // Curtain 1 opening click
    const c1 = (Math.random() * 2 - 1) * Math.exp(-t * 450) * 0.75;
    const body1 = Math.sin(2 * Math.PI * 720 * pitchMult * t) * Math.exp(-t * 160) * 0.35;

    // Curtain 2 closing click (after 28ms)
    let c2 = 0;
    let body2 = 0;
    if (t > 0.028) {
      const t2 = t - 0.028;
      c2 = (Math.random() * 2 - 1) * Math.exp(-t2 * 420) * 0.65;
      body2 = Math.sin(2 * Math.PI * 620 * pitchMult * t2) * Math.exp(-t2 * 140) * 0.3;
    }

    const valL = c1 + body1 + c2 * 0.9 + body2 * 0.9;
    const valR = c1 * 0.9 + body1 * 0.9 + c2 + body2;
    left[i] = valL * 0.7;
    right[i] = valR * 0.7;
  }
  return { left, right };
}

// 3. Acoustic Grand Piano Chord Synthesizer
function synthesizePianoChord(chordFrequencies, duration = 2.5, velocity = 0.8) {
  const len = Math.floor(duration * SAMPLE_RATE);
  const left = new Float32Array(len);
  const right = new Float32Array(len);

  for (let i = 0; i < len; i++) {
    const t = i / SAMPLE_RATE;

    // Felt hammer thump
    const feltThump = Math.sin(2 * Math.PI * 68 * t) * Math.exp(-t * 90) * 0.45 * velocity;

    let chordL = 0;
    let chordR = 0;

    chordFrequencies.forEach((freq, idx) => {
      // Natural harmonic series for piano string
      const pan = (idx / chordFrequencies.length) * 0.6 - 0.3; // Stereo panning across keyboard
      const gainL = 0.5 - pan;
      const gainR = 0.5 + pan;

      const harmonics = [
        { mult: 1, gain: 0.55, decay: 1.4 },
        { mult: 2, gain: 0.32, decay: 2.1 },
        { mult: 3, gain: 0.20, decay: 3.0 },
        { mult: 4, gain: 0.12, decay: 4.2 },
        { mult: 5, gain: 0.07, decay: 5.6 },
      ];

      let stringTone = 0;
      harmonics.forEach((h) => {
        const f = freq * h.mult;
        const decay = Math.exp(-t * h.decay);
        stringTone += Math.sin(2 * Math.PI * f * t) * h.gain * decay;
      });

      chordL += stringTone * gainL;
      chordR += stringTone * gainR;
    });

    left[i] = (feltThump * 0.5 + chordL * 0.8) * velocity;
    right[i] = (feltThump * 0.5 + chordR * 0.8) * velocity;
  }
  return { left, right };
}

// 4. Orchestral Brass / String Swell
function synthesizeOrchestralSwell(freqs, duration = 1.0, isRiser = false) {
  const len = Math.floor(duration * SAMPLE_RATE);
  const left = new Float32Array(len);
  const right = new Float32Array(len);

  for (let i = 0; i < len; i++) {
    const t = i / SAMPLE_RATE;
    const progress = t / duration;

    // Swell envelope: builds smoothly
    const env = isRiser
      ? Math.pow(progress, 2.2) * 0.6
      : Math.sin(progress * Math.PI) * 0.4;

    let sumL = 0;
    let sumR = 0;

    freqs.forEach((freq, idx) => {
      const f = isRiser ? freq * (1 + 0.8 * progress * progress) : freq;
      // Sawtooth/triangle blend with detune
      const tone1 = Math.sin(2 * Math.PI * f * t);
      const tone2 = Math.sin(2 * Math.PI * (f * 1.002) * t);
      const tone3 = Math.sin(2 * Math.PI * (f * 2.001) * t) * 0.3;

      sumL += (tone1 + tone3) * 0.25;
      sumR += (tone2 + tone3) * 0.25;
    });

    left[i] = sumL * env;
    right[i] = sumR * env;
  }
  return { left, right };
}

// -------------------------------------------------------------
// MASTER COMPOSITION BUILDER (11.500s)
// -------------------------------------------------------------
function generateMasterV3() {
  const masterL = new Float32Array(TOTAL_SAMPLES);
  const masterR = new Float32Array(TOTAL_SAMPLES);

  function mix(stem, startSec, volume = 1.0) {
    const startSample = Math.floor(startSec * SAMPLE_RATE);
    for (let i = 0; i < stem.left.length; i++) {
      const idx = startSample + i;
      if (idx < TOTAL_SAMPLES) {
        masterL[idx] += stem.left[i] * volume;
        masterR[idx] += stem.right[i] * volume;
      }
    }
  }

  // ========================================================
  // MOVEMENT 1: THE IGNITION (0.00s – 1.80s)
  // Immediate sonic hook at 0.0s!
  // ========================================================
  // 0.0s: Immediate massive hook impact
  const hookDrum = synthesizeDrumImpact(42, 1.2, 5);
  mix(hookDrum, 0.0, 0.85);

  const hookShutter = synthesizeMechanicalShutter(0.85);
  mix(hookShutter, 0.0, 0.7);

  // Subtle opening brass swell chord (D minor: D2 73.4Hz, A2 110Hz, D3 146.8Hz)
  const hookBrass = synthesizeOrchestralSwell([73.4, 110.0, 146.8], 1.2, false);
  mix(hookBrass, 0.0, 0.45);

  // 0.60s (Frame 18): Tactile switch slam
  const switchDrum = synthesizeDrumImpact(58, 0.5, 4);
  mix(switchDrum, 0.6, 0.65);
  const keyShutter = synthesizeMechanicalShutter(1.15);
  mix(keyShutter, 0.6, 0.75);

  // 1.20s (Frame 36): Bronze wire acoustic resonance + launch riser
  const bronzePiano = synthesizePianoChord([55.0, 165.0, 275.0, 540.0], 1.4, 0.8);
  mix(bronzePiano, 1.2, 0.7);

  const launchRiser = synthesizeOrchestralSwell([110.0, 146.8, 220.0], 0.6, true);
  mix(launchRiser, 1.2, 0.5);

  // ========================================================
  // MOVEMENT 2: THE VELOCITY MONTAGE (1.80s – 7.80s)
  // 10 shots, 0.60s each with musical progression
  // ========================================================
  const shotData = [
    { time: 1.80, note: [73.4, 146.8, 220.0], drumFund: 52 },      // 1: IEEE (D minor)
    { time: 2.40, note: [87.3, 174.6, 261.6], drumFund: 54 },      // 2: Hacktober (F major)
    { time: 3.00, note: [98.0, 196.0, 293.7], drumFund: 56 },      // 3: Scratchathon (G minor)
    { time: 3.60, note: [110.0, 220.0, 329.6], drumFund: 58 },     // 4: IIM (A minor)
    { time: 4.20, note: [116.5, 233.1, 349.2], drumFund: 60 },     // 5: OP Jindal (Bb major)
    { time: 4.80, note: [130.8, 261.6, 392.0], drumFund: 62 },     // 6: Nyay Link (C major)
    { time: 5.40, note: [146.8, 293.7, 440.0], drumFund: 64 },     // 7: Fasal Niti (D minor)
    { time: 6.00, note: [174.6, 349.2, 523.3], drumFund: 66 },     // 8: Piano & Vocals (F major)
    { time: 6.60, note: [196.0, 392.0, 587.3], drumFund: 68 },     // 9: Theatre Stage (G minor)
    { time: 7.20, note: [220.0, 440.0, 659.3], drumFund: 70 },     // 10: Hyper-Strobe (A minor)
  ];

  shotData.forEach((shot, idx) => {
    // Accelerating intensity multiplier (0.65 to 0.95)
    const intensity = 0.65 + (idx / shotData.length) * 0.3;

    // A. Percussive drum kick
    const drum = synthesizeDrumImpact(shot.drumFund, 0.45, 6);
    mix(drum, shot.time, 0.7 * intensity);

    // B. High-speed camera shutter
    const shutter = synthesizeMechanicalShutter(0.9 + idx * 0.04);
    mix(shutter, shot.time, 0.75 * intensity);

    // C. Orchestral brass/string hit
    const hit = synthesizeOrchestralSwell(shot.note, 0.35, false);
    mix(hit, shot.time, 0.55 * intensity);
  });

  // Hyper-Riser leading right up to the cut at 7.80s (Frames 216–234)
  const preCutRiser = synthesizeOrchestralSwell([146.8, 220.0, 293.7, 440.0], 0.6, true);
  mix(preCutRiser, 7.20, 0.75);

  // White noise velocity wash before the cut
  const noiseLen = Math.floor(0.6 * SAMPLE_RATE);
  const noiseStart = Math.floor(7.20 * SAMPLE_RATE);
  for (let i = 0; i < noiseLen; i++) {
    const t = i / SAMPLE_RATE;
    const progress = t / 0.6;
    const env = progress * progress * 0.28;
    const n = (Math.random() * 2 - 1) * env;
    masterL[noiseStart + i] += n;
    masterR[noiseStart + i] += n;
  }

  // ========================================================
  // MOVEMENT 3: THE TRANSITION & DEAD SILENCE (7.80s – 8.80s)
  // Ensure absolute 0.000000 dB from 7.8000s to 8.8000s
  // Any residual tails are strictly zeroed out!
  // ========================================================
  const silenceStart = Math.floor(7.80 * SAMPLE_RATE);
  const silenceEnd = Math.floor(8.80 * SAMPLE_RATE);
  for (let i = silenceStart; i < silenceEnd; i++) {
    masterL[i] = 0;
    masterR[i] = 0;
  }

  // ========================================================
  // MOVEMENT 4: THE CLIMAX REVEAL (8.80s – 11.50s)
  // International awards ceremony impact + rich acoustic piano
  // ========================================================
  const climaxTime = 8.80;

  // 1. Deep 32Hz Sub-Bass Earthquake Punch
  const subImpact = synthesizeDrumImpact(34, 2.2, 4);
  mix(subImpact, climaxTime, 0.95);

  // 2. Heavy Titanium / Anvil Transient Strike
  const anvilDuration = 0.5;
  const anvilLen = Math.floor(anvilDuration * SAMPLE_RATE);
  for (let i = 0; i < anvilLen; i++) {
    const t = i / SAMPLE_RATE;
    const anvil = Math.sin(2 * Math.PI * 1920 * t) * Math.exp(-t * 35) * 0.45 +
                  Math.sin(2 * Math.PI * 3840 * t) * Math.exp(-t * 60) * 0.3 +
                  (Math.random() * 2 - 1) * Math.exp(-t * 120) * 0.25;
    const idx = Math.floor(climaxTime * SAMPLE_RATE) + i;
    if (idx < TOTAL_SAMPLES) {
      masterL[idx] += anvil * 0.65;
      masterR[idx] += anvil * 0.70;
    }
  }

  // 3. Majestic Acoustic Grand Piano A-Minor9 Chord
  // A0 (27.5Hz), A1 (55Hz), E2 (82.4Hz), A2 (110Hz), C3 (130.8Hz), E3 (164.8Hz), B3 (246.9Hz), G4 (392Hz)
  const climaxPiano = synthesizePianoChord([27.5, 55.0, 82.4, 110.0, 130.8, 164.8, 246.9, 392.0], 2.6, 0.95);
  mix(climaxPiano, climaxTime, 0.9);

  // 4. Warm Orchestral Brass / Strings Foundation
  const climaxBrass = synthesizeOrchestralSwell([55.0, 82.4, 110.0, 130.8, 164.8], 2.4, false);
  mix(climaxBrass, climaxTime, 0.65);

  // 5. Crystalline Shimmer Reverb Tail (decays gracefully to 11.45s)
  const shimmerLen = Math.floor(2.6 * SAMPLE_RATE);
  for (let i = 0; i < shimmerLen; i++) {
    const t = i / SAMPLE_RATE;
    const progress = t / 2.6;
    const env = Math.exp(-t * 1.6) * Math.max(0, 1 - Math.pow(progress, 3));
    const sL = (Math.sin(2 * Math.PI * 3520 * t) + Math.sin(2 * Math.PI * 4400 * t)) * env * 0.06;
    const sR = (Math.sin(2 * Math.PI * 3535 * t) + Math.sin(2 * Math.PI * 4415 * t)) * env * 0.06;
    const idx = Math.floor(climaxTime * SAMPLE_RATE) + i;
    if (idx < TOTAL_SAMPLES) {
      masterL[idx] += sL;
      masterR[idx] += sR;
    }
  }

  // Natural smooth decay to complete silence by 11.48s (no abrupt cutoff)
  const fadeStart = Math.floor(11.20 * SAMPLE_RATE);
  for (let i = fadeStart; i < TOTAL_SAMPLES; i++) {
    const factor = Math.max(0, 1 - (i - fadeStart) / (TOTAL_SAMPLES - fadeStart));
    masterL[i] *= factor;
    masterR[i] *= factor;
  }

  // Master Normalizer (-0.8 dBFS ceiling)
  let peak = 0;
  for (let i = 0; i < TOTAL_SAMPLES; i++) {
    peak = Math.max(peak, Math.abs(masterL[i]), Math.abs(masterR[i]));
  }
  if (peak > 0.88) {
    const norm = 0.88 / peak;
    for (let i = 0; i < TOTAL_SAMPLES; i++) {
      masterL[i] *= norm;
      masterR[i] *= norm;
    }
  }

  return { left: masterL, right: masterR };
}

// Generate and write
const targetPath = path.resolve('public/audio/the_making_of_sahaj_v2.wav');
console.log('Generating world-class cinematic master audio v3...');
const result = generateMasterV3();
const wavBuf = createWavBuffer(result.left, result.right);
fs.writeFileSync(targetPath, wavBuf);
console.log(`Saved master audio track to ${targetPath} (${(wavBuf.length / 1024 / 1024).toFixed(2)} MB)`);

