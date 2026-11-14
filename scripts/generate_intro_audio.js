import fs from 'fs';
import path from 'path';

/**
 * High-Precision Audio Synthesizer for "THE MAKING OF SAHAJ"
 * Generates 48kHz 16-bit Stereo PCM WAV files with physical acoustic modeling.
 */

const SAMPLE_RATE = 48000;
const CHANNELS = 2;

function createWavBuffer(leftChannel, rightChannel) {
  const numSamples = leftChannel.length;
  const dataSize = numSamples * CHANNELS * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt subchunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size
  buffer.writeUInt16LE(1, 20);  // AudioFormat (PCM = 1)
  buffer.writeUInt16LE(CHANNELS, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * CHANNELS * 2, 28); // ByteRate
  buffer.writeUInt16LE(CHANNELS * 2, 32);               // BlockAlign
  buffer.writeUInt16LE(16, 34);                         // BitsPerSample

  // data subchunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    // Soft clip / limiter
    let l = Math.max(-0.98, Math.min(0.98, leftChannel[i]));
    let r = Math.max(-0.98, Math.min(0.98, rightChannel[i]));

    const intL = l < 0 ? Math.floor(l * 32768) : Math.floor(l * 32767);
    const intR = r < 0 ? Math.floor(r * 32768) : Math.floor(r * 32767);

    buffer.writeInt16LE(intL, offset);
    buffer.writeInt16LE(intR, offset + 2);
    offset += 4;
  }

  return buffer;
}

// -------------------------------------------------------------
// 1. SOUND STEM GENERATORS
// -------------------------------------------------------------

// Stem 1: Anticipation Sub Drone (Act 1, 3.2s)
function generateAnticipationDrone(duration = 3.2) {
  const len = Math.floor(duration * SAMPLE_RATE);
  const left = new Float32Array(len);
  const right = new Float32Array(len);

  for (let i = 0; i < len; i++) {
    const t = i / SAMPLE_RATE;
    const progress = t / duration;

    // Slow swell envelope
    const env = Math.pow(Math.sin((progress * Math.PI) / 2), 1.4);

    // 40Hz fundamental with 80Hz & 120Hz subtle harmonics + slight stereo detune
    const fundL = 40.0;
    const fundR = 40.5;
    const subL = Math.sin(2 * Math.PI * fundL * t) * 0.45;
    const subR = Math.sin(2 * Math.PI * fundR * t) * 0.45;

    const harm2L = Math.sin(2 * Math.PI * (fundL * 2) * t) * 0.18;
    const harm2R = Math.sin(2 * Math.PI * (fundR * 2) * t) * 0.18;

    const harm3L = Math.sin(2 * Math.PI * (fundL * 3) * t) * 0.08;
    const harm3R = Math.sin(2 * Math.PI * (fundR * 3) * t) * 0.08;

    // Subtle atmospheric hiss / analog warmth
    const noise = (Math.random() * 2 - 1) * 0.015 * env;

    left[i] = (subL + harm2L + harm3L + noise) * env;
    right[i] = (subR + harm2R + harm3R + noise) * env;
  }
  return { left, right };
}

// Stem 2: Mechanical Keyboard Tactile Switch Click (Act 2, 0.4s)
function generateKeyClick(duration = 0.4) {
  const len = Math.floor(duration * SAMPLE_RATE);
  const left = new Float32Array(len);
  const right = new Float32Array(len);

  for (let i = 0; i < len; i++) {
    const t = i / SAMPLE_RATE;

    // Click transient: ultra-sharp attack (2.8 kHz noise burst decaying in 8ms)
    const clickEnv = Math.exp(-t * 380);
    const clickNoise = (Math.random() * 2 - 1) * Math.sin(2 * Math.PI * 2800 * t);

    // Housing bottom-out thud (320Hz decaying in 40ms)
    const thudEnv = Math.exp(-t * 65);
    const thudTone = Math.sin(2 * Math.PI * 340 * t);

    // Spring metallic ring ping (1420Hz decaying in 180ms)
    const springEnv = Math.exp(-t * 22) * Math.min(1, t * 200);
    const springTone = Math.sin(2 * Math.PI * 1420 * t);

    const val = clickNoise * clickEnv * 0.7 + thudTone * thudEnv * 0.5 + springTone * springEnv * 0.25;
    left[i] = val * 0.95;
    right[i] = val * 0.92;
  }
  return { left, right };
}

// Stem 3: Acoustic Grand Piano Hammer Strike (Act 2, 2.0s)
function generatePianoHammer(duration = 2.0) {
  const len = Math.floor(duration * SAMPLE_RATE);
  const left = new Float32Array(len);
  const right = new Float32Array(len);

  const fundamental = 55.0; // A1 (55 Hz)

  for (let i = 0; i < len; i++) {
    const t = i / SAMPLE_RATE;

    // Felt hammer impact thump (transient thud at 70Hz decaying in 35ms)
    const hammerThump = Math.sin(2 * Math.PI * 72 * t) * Math.exp(-t * 85) * 0.6;

    // String resonance harmonics with natural decay times
    let stringSoundL = 0;
    let stringSoundR = 0;

    const harmonics = [
      { mult: 1, gain: 0.55, decay: 1.8 },
      { mult: 2, gain: 0.35, decay: 2.4 },
      { mult: 3, gain: 0.22, decay: 3.2 },
      { mult: 4, gain: 0.16, decay: 4.1 },
      { mult: 5, gain: 0.09, decay: 5.5 },
      { mult: 6, gain: 0.05, decay: 7.0 },
    ];

    harmonics.forEach((h, idx) => {
      const fL = fundamental * h.mult;
      const fR = fundamental * h.mult * (1 + 0.0015 * (idx % 2 === 0 ? 1 : -1));
      const decay = Math.exp(-t * h.decay);
      stringSoundL += Math.sin(2 * Math.PI * fL * t) * h.gain * decay;
      stringSoundR += Math.sin(2 * Math.PI * fR * t) * h.gain * decay;
    });

    left[i] = hammerThump + stringSoundL * 0.8;
    right[i] = hammerThump * 0.9 + stringSoundR * 0.8;
  }
  return { left, right };
}

// Stem 4: Vibrating Bronze Wire Resonance (Act 2, 2.4s)
function generateBronzeWire(duration = 2.4) {
  const len = Math.floor(duration * SAMPLE_RATE);
  const left = new Float32Array(len);
  const right = new Float32Array(len);

  // Inharmonic bronze bar / wire partials
  const partials = [
    { freq: 110, gain: 0.45, decay: 1.5 },
    { freq: 276, gain: 0.32, decay: 2.2 },  // Inharmonic ratio ~2.51
    { freq: 540, gain: 0.25, decay: 3.1 },  // Inharmonic ratio ~4.9
    { freq: 890, gain: 0.18, decay: 4.5 },
    { freq: 1350, gain: 0.12, decay: 6.0 },
    { freq: 2100, gain: 0.07, decay: 8.0 },
  ];

  for (let i = 0; i < len; i++) {
    const t = i / SAMPLE_RATE;

    let wireL = 0;
    let wireR = 0;

    partials.forEach((p, idx) => {
      // Shimmer amplitude modulation (beating)
      const tremolo = 1 + 0.18 * Math.sin(2 * Math.PI * (3.5 + idx * 0.8) * t);
      const decay = Math.exp(-t * p.decay);

      const fL = p.freq;
      const fR = p.freq + (idx % 2 === 0 ? 0.7 : -0.7);

      wireL += Math.sin(2 * Math.PI * fL * t) * p.gain * decay * tremolo;
      wireR += Math.sin(2 * Math.PI * fR * t) * p.gain * decay * tremolo;
    });

    left[i] = wireL * 0.75;
    right[i] = wireR * 0.75;
  }
  return { left, right };
}

// Stem 5: High-Speed Camera Shutter Clack (Act 3, 0.28s)
function generateCameraShutter(duration = 0.28) {
  const len = Math.floor(duration * SAMPLE_RATE);
  const left = new Float32Array(len);
  const right = new Float32Array(len);

  for (let i = 0; i < len; i++) {
    const t = i / SAMPLE_RATE;

    // First curtain opening click (t = 0)
    const c1 = (Math.random() * 2 - 1) * Math.exp(-t * 280) * 0.8;
    const body1 = Math.sin(2 * Math.PI * 620 * t) * Math.exp(-t * 120) * 0.4;

    // Second curtain closing click (t = 0.045s)
    let c2 = 0;
    let body2 = 0;
    if (t > 0.045) {
      const t2 = t - 0.045;
      c2 = (Math.random() * 2 - 1) * Math.exp(-t2 * 260) * 0.75;
      body2 = Math.sin(2 * Math.PI * 540 * t2) * Math.exp(-t2 * 110) * 0.35;
    }

    const val = c1 + body1 + c2 + body2;
    left[i] = val * 0.9;
    right[i] = val * 0.92;
  }
  return { left, right };
}

// Stem 6: Sub-Bass Transition Impact (1.5s)
function generateSubImpact(duration = 1.5) {
  const len = Math.floor(duration * SAMPLE_RATE);
  const left = new Float32Array(len);
  const right = new Float32Array(len);

  for (let i = 0; i < len; i++) {
    const t = i / SAMPLE_RATE;

    // Pitch envelope dropping from 130Hz to 42Hz
    const pitch = 42 + 88 * Math.exp(-t * 40);
    const phase = 2 * Math.PI * (42 * t + (88 / -40) * Math.exp(-t * 40));

    const env = Math.exp(-t * 3.5);
    const click = (Math.random() * 2 - 1) * Math.exp(-t * 250) * 0.35;

    const sub = Math.sin(phase) * env * 0.85;

    left[i] = sub + click;
    right[i] = sub + click;
  }
  return { left, right };
}

// Stem 7: Digital Data Pulse / Actuation Chime (Act 4, 0.18s)
function generateDataPulse(duration = 0.18) {
  const len = Math.floor(duration * SAMPLE_RATE);
  const left = new Float32Array(len);
  const right = new Float32Array(len);

  for (let i = 0; i < len; i++) {
    const t = i / SAMPLE_RATE;
    const tone1 = Math.sin(2 * Math.PI * 1760 * t) * Math.exp(-t * 35);
    const tone2 = Math.sin(2 * Math.PI * 2640 * t) * Math.exp(-t * 45) * 0.5;
    const val = (tone1 + tone2) * 0.35;

    left[i] = val * 0.95;
    right[i] = val * 0.85;
  }
  return { left, right };
}

// Stem 8: Theatrical Acoustic Swell (Act 5, 2.5s)
function generateTheatricalSwell(duration = 2.5) {
  const len = Math.floor(duration * SAMPLE_RATE);
  const left = new Float32Array(len);
  const right = new Float32Array(len);

  // Warm chord: D minor9 / Fmaj7 (D3: 146.8Hz, F3: 174.6Hz, A3: 220.0Hz, C4: 261.6Hz, E4: 329.6Hz)
  const notes = [146.8, 174.6, 220.0, 261.6, 329.6];

  for (let i = 0; i < len; i++) {
    const t = i / SAMPLE_RATE;
    const progress = t / duration;

    // Swell up to 2.1s then rapid drop into SILENCE
    let env = 0;
    if (progress < 0.85) {
      env = Math.pow(progress / 0.85, 2.0);
    } else {
      // Abrupt cutoff for the sudden silence
      env = Math.max(0, (1 - (progress - 0.85) / 0.15) * 0.9);
    }

    let chordL = 0;
    let chordR = 0;
    notes.forEach((freq, idx) => {
      const pL = Math.sin(2 * Math.PI * freq * t + idx * 0.5);
      const pR = Math.sin(2 * Math.PI * (freq + (idx % 2 === 0 ? 0.3 : -0.3)) * t + idx * 0.5);
      chordL += pL * 0.14;
      chordR += pR * 0.14;
    });

    left[i] = chordL * env;
    right[i] = chordR * env;
  }
  return { left, right };
}

// Stem 9: Cinematic Climax Reveal Boom (Act 6, 3.8s)
function generateClimaxBoom(duration = 3.8) {
  const len = Math.floor(duration * SAMPLE_RATE);
  const left = new Float32Array(len);
  const right = new Float32Array(len);

  for (let i = 0; i < len; i++) {
    const t = i / SAMPLE_RATE;

    // Massive sub punch: 36Hz with 80Hz transient
    const pitch = 36 + 70 * Math.exp(-t * 25);
    const sub = Math.sin(2 * Math.PI * pitch * t) * Math.exp(-t * 1.6) * 0.85;

    // Warm piano resolved root note (A1 55Hz + A2 110Hz + C#3 138.6Hz + E3 164.8Hz)
    const pianoNote = (
      Math.sin(2 * Math.PI * 55 * t) * 0.45 +
      Math.sin(2 * Math.PI * 110 * t) * 0.35 +
      Math.sin(2 * Math.PI * 138.6 * t) * 0.25 +
      Math.sin(2 * Math.PI * 164.8 * t) * 0.22 +
      Math.sin(2 * Math.PI * 220 * t) * 0.18
    ) * Math.exp(-t * 0.8);

    // Crystalline high sparkle reverb
    const sparkle = (Math.random() * 2 - 1) * Math.exp(-t * 8) * 0.08;

    left[i] = sub + pianoNote * 0.6 + sparkle;
    right[i] = sub * 0.95 + pianoNote * 0.62 + sparkle * 0.9;
  }
  return { left, right };
}

// -------------------------------------------------------------
// 2. MASTER 23.5-SECOND TIMELINE MIXER
// -------------------------------------------------------------
function generateMasterTrack(duration = 23.5) {
  const totalSamples = Math.floor(duration * SAMPLE_RATE);
  const masterLeft = new Float32Array(totalSamples);
  const masterRight = new Float32Array(totalSamples);

  function mixStem(stem, startSeconds, gain = 1.0) {
    const startSample = Math.floor(startSeconds * SAMPLE_RATE);
    for (let i = 0; i < stem.left.length; i++) {
      const idx = startSample + i;
      if (idx < totalSamples) {
        masterLeft[idx] += stem.left[i] * gain;
        masterRight[idx] += stem.right[i] * gain;
      }
    }
  }

  // ACT 1: SYSTEM ANTICIPATION (0.0s – 3.0s)
  const drone = generateAnticipationDrone(3.1);
  mixStem(drone, 0.0, 0.85);

  const subRiser = generateSubImpact(1.6);
  mixStem(subRiser, 1.4, 0.4);

  // ACT 2: THE FIRST SPARK (3.0s – 7.0s)
  // Shot 2.1: Key switch (3.0s)
  const keyClick = generateKeyClick(0.4);
  mixStem(keyClick, 3.0, 0.95);

  // Shot 2.2: Grand piano action (4.33s)
  const pianoHammer = generatePianoHammer(2.2);
  mixStem(pianoHammer, 4.33, 0.9);

  // Shot 2.3: Vibrating bronze wire (5.66s)
  const bronzeWire = generateBronzeWire(2.5);
  mixStem(bronzeWire, 5.66, 0.85);

  // ACT 3: THE PROOF (7.0s – 11.5s)
  // Rapid camera shutter bursts across hackathons
  const shutter = generateCameraShutter(0.28);
  const hackImpact = generateSubImpact(1.2);
  mixStem(hackImpact, 7.0, 0.65);
  mixStem(shutter, 7.0, 0.85);
  mixStem(shutter, 7.9, 0.85);
  mixStem(shutter, 8.8, 0.85);
  mixStem(shutter, 9.7, 0.85);
  mixStem(shutter, 10.6, 0.85);

  // ACT 4: THE BUILDER (11.5s – 15.5s)
  const builderImpact = generateSubImpact(1.4);
  mixStem(builderImpact, 11.5, 0.7);

  const dataBlip = generateDataPulse(0.18);
  mixStem(dataBlip, 11.8, 0.6);
  mixStem(dataBlip, 12.6, 0.6);
  mixStem(dataBlip, 13.5, 0.6);
  mixStem(dataBlip, 14.4, 0.6);

  // ACT 5: THE UNSAID (15.5s – 19.5s)
  // Theatrical harmonic acoustic swell (15.5s to 18.0s)
  const theatreSwell = generateTheatricalSwell(2.5);
  mixStem(theatreSwell, 15.5, 0.85);

  // NOTE: From 18.0s to 19.5s is THE MOMENT OF SILENCE!
  // No stems are mixed between 18.0s and 19.5s. It is pure silence.

  // ACT 6: THE REVEAL & CLIMAX (19.5s – 23.5s)
  // Portrait emerges + final title impact
  const climaxBoom = generateClimaxBoom(3.9);
  mixStem(climaxBoom, 19.5, 0.95);

  // Master Normalizer & Limiter (soft-knee ceiling at -0.5 dB)
  let peak = 0;
  for (let i = 0; i < totalSamples; i++) {
    peak = Math.max(peak, Math.abs(masterLeft[i]), Math.abs(masterRight[i]));
  }
  const normFactor = peak > 0.85 ? 0.85 / peak : 1.0;
  for (let i = 0; i < totalSamples; i++) {
    masterLeft[i] *= normFactor;
    masterRight[i] *= normFactor;
  }

  return { left: masterLeft, right: masterRight };
}

// -------------------------------------------------------------
// EXECUTE GENERATION & WRITE FILES
// -------------------------------------------------------------
const outputDir = path.resolve('public/audio');
const sfxDir = path.resolve('public/audio/sfx');

if (!fs.existsSync(sfxDir)) {
  fs.mkdirSync(sfxDir, { recursive: true });
}

console.log('Generating audio stems for THE MAKING OF SAHAJ...');

// Stems
const stems = [
  { name: '01_tension_drone.wav', data: generateAnticipationDrone(3.2) },
  { name: '02_key_click.wav', data: generateKeyClick(0.4) },
  { name: '03_piano_hammer.wav', data: generatePianoHammer(2.2) },
  { name: '04_bronze_wire.wav', data: generateBronzeWire(2.5) },
  { name: '05_camera_shutter.wav', data: generateCameraShutter(0.28) },
  { name: '06_sub_impact.wav', data: generateSubImpact(1.5) },
  { name: '07_data_blip.wav', data: generateDataPulse(0.18) },
  { name: '08_theatrical_swell.wav', data: generateTheatricalSwell(2.5) },
  { name: '09_climax_boom.wav', data: generateClimaxBoom(3.8) },
];

stems.forEach((stem) => {
  const buf = createWavBuffer(stem.data.left, stem.data.right);
  const dest = path.join(sfxDir, stem.name);
  fs.writeFileSync(dest, buf);
  console.log(`Saved stem: ${dest} (${(buf.length / 1024).toFixed(1)} KB)`);
});

// Master Track (23.5s)
console.log('Generating 23.5s synchronized master soundtrack...');
const master = generateMasterTrack(23.5);
const masterBuf = createWavBuffer(master.left, master.right);
const masterDest = path.join(outputDir, 'the_making_of_sahaj_master.wav');
fs.writeFileSync(masterDest, masterBuf);
console.log(`Saved master: ${masterDest} (${(masterBuf.length / 1024 / 1024).toFixed(2)} MB)`);

console.log('Audio generation completed successfully.');

