import fs from 'fs';
import path from 'path';

/**
 * 11.5-Second High-Impact Cinematic Audio Synthesizer
 * Generates 48kHz 16-bit Stereo PCM WAV for the awards-grade fast intro.
 * Exact duration: 11.500 seconds (345 frames @ 30 FPS = 552,000 samples).
 */

const SAMPLE_RATE = 48000;
const CHANNELS = 2;
const TOTAL_DURATION = 11.5;
const TOTAL_SAMPLES = Math.floor(TOTAL_DURATION * SAMPLE_RATE); // 552,000 samples

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
    // Soft limiter to prevent digital clipping
    let l = Math.max(-0.98, Math.min(0.98, leftChannel[i]));
    let r = Math.max(-0.98, Math.min(0.98, rightChannel[i]));

    // Fast soft-knee tanh approximation
    l = l * (1 - (l * l * l * l) * 0.15);
    r = r * (1 - (r * r * r * r) * 0.15);

    const intL = l < 0 ? Math.floor(l * 32768) : Math.floor(l * 32767);
    const intR = r < 0 ? Math.floor(r * 32768) : Math.floor(r * 32767);

    buffer.writeInt16LE(intL, offset);
    buffer.writeInt16LE(intR, offset + 2);
    offset += 4;
  }

  return buffer;
}

// -------------------------------------------------------------
// SOUND DESIGN SYNTHESIS
// -------------------------------------------------------------
function generateMasterV2() {
  const left = new Float32Array(TOTAL_SAMPLES);
  const right = new Float32Array(TOTAL_SAMPLES);

  function addSample(idx, l, r) {
    if (idx >= 0 && idx < TOTAL_SAMPLES) {
      left[idx] += l;
      right[idx] += r;
    }
  }

  // 1. OPENING IGNITION (0.0s – 1.8s)
  // Subtle electrical charging hum -> mechanical shutter snap -> rising sub whoosh
  for (let i = 0; i < Math.floor(1.8 * SAMPLE_RATE); i++) {
    const t = i / SAMPLE_RATE;

    // Optical charging hum (60Hz + 180Hz) building smoothly
    const humEnv = Math.pow(t / 1.8, 2.5) * 0.35;
    const humL = Math.sin(2 * Math.PI * 65 * t) + 0.3 * Math.sin(2 * Math.PI * 195 * t);
    const humR = Math.sin(2 * Math.PI * 66 * t) + 0.3 * Math.sin(2 * Math.PI * 198 * t);

    // Sub-bass sweep rising from 40Hz to 120Hz
    const pitch = 40 + 80 * Math.pow(t / 1.8, 3);
    const sweep = Math.sin(2 * Math.PI * pitch * t) * Math.pow(t / 1.8, 2) * 0.55;

    // Optical shutter blade arming clicks at 0.1s and 0.4s
    let click = 0;
    if (t >= 0.1 && t < 0.15) {
      const tc = t - 0.1;
      click += (Math.random() * 2 - 1) * Math.exp(-tc * 400) * 0.4;
    }
    if (t >= 0.6 && t < 0.65) {
      const tc = t - 0.6;
      click += (Math.random() * 2 - 1) * Math.exp(-tc * 500) * 0.5;
    }

    addSample(i, (humL * humEnv + sweep + click) * 0.9, (humR * humEnv + sweep + click) * 0.9);
  }

  // Tactical mechanical key switch slam at 0.6s (Frame 18)
  const keyStart = Math.floor(0.6 * SAMPLE_RATE);
  for (let i = 0; i < Math.floor(0.35 * SAMPLE_RATE); i++) {
    const t = i / SAMPLE_RATE;
    const click = (Math.random() * 2 - 1) * Math.sin(2 * Math.PI * 3200 * t) * Math.exp(-t * 350) * 0.8;
    const bottomOut = Math.sin(2 * Math.PI * 320 * t) * Math.exp(-t * 80) * 0.6;
    addSample(keyStart + i, click + bottomOut, click + bottomOut);
  }

  // 2. ACHIEVEMENT MONTAGE (1.8s – 7.8s)
  // Rhythmic impacts and camera shutter snaps synced with each of the 10 shots!
  // Shot cue timestamps (seconds):
  const shotTimestamps = [
    1.80,  // Shot 1: IEEE Synapse
    2.40,  // Shot 2: Hacktober
    3.00,  // Shot 3: Scratchathon
    3.60,  // Shot 4: IIM Defense
    4.20,  // Shot 5: OP Jindal
    4.80,  // Shot 6: Nyay Link
    5.40,  // Shot 7: Fasal Niti
    6.00,  // Shot 8: Sing & Piano
    6.60,  // Shot 9: Theatre Stage
    7.20,  // Shot 10: Hyper-Strobe
  ];

  shotTimestamps.forEach((cueSec, idx) => {
    const cueSample = Math.floor(cueSec * SAMPLE_RATE);
    const intensity = 0.5 + (idx / shotTimestamps.length) * 0.45; // Accelerating volume

    // Sharp camera shutter click-clack
    for (let i = 0; i < Math.floor(0.22 * SAMPLE_RATE); i++) {
      const t = i / SAMPLE_RATE;
      const c1 = (Math.random() * 2 - 1) * Math.exp(-t * 320) * 0.7;
      const body = Math.sin(2 * Math.PI * (600 + idx * 40) * t) * Math.exp(-t * 120) * 0.35;
      let c2 = 0;
      if (t > 0.035) {
        c2 = (Math.random() * 2 - 1) * Math.exp(-(t - 0.035) * 300) * 0.6;
      }
      const shutterVal = (c1 + body + c2) * intensity;
      addSample(cueSample + i, shutterVal * 0.95, shutterVal * 0.9);
    }

    // Heavy percussive kick / sub impact
    for (let i = 0; i < Math.floor(0.45 * SAMPLE_RATE); i++) {
      const t = i / SAMPLE_RATE;
      const pitch = 95 - 45 * Math.exp(-t * 30);
      const kick = Math.sin(2 * Math.PI * pitch * t) * Math.exp(-t * 12) * 0.65 * intensity;
      addSample(cueSample + i, kick, kick);
    }
  });

  // Continuous rhythmic bass synth pulse under the montage (1.8s to 7.8s)
  // 16th note synth arpeggio driving momentum
  const montageStart = Math.floor(1.8 * SAMPLE_RATE);
  const montageEnd = Math.floor(7.8 * SAMPLE_RATE);
  for (let i = montageStart; i < montageEnd; i++) {
    const t = (i - montageStart) / SAMPLE_RATE;
    const progress = t / (7.8 - 1.8);

    // Arpeggio frequency cycling (D2 73.4Hz, F2 87.3Hz, A2 110Hz, D3 146.8Hz)
    const step = Math.floor(t * 8) % 4;
    const freqs = [73.4, 87.3, 110.0, 146.8];
    const freq = freqs[step];

    const stepT = (t * 8) % 1.0;
    const env = Math.exp(-stepT * 6.5) * (0.2 + progress * 0.35);
    const synthTone = Math.sin(2 * Math.PI * freq * t) * env;

    addSample(i, synthTone * 0.85, synthTone * 0.85);
  }

  // Hyper-riser leading into Frame 234 (7.2s – 7.8s)
  const riserStart = Math.floor(7.0 * SAMPLE_RATE);
  const riserLen = Math.floor(0.8 * SAMPLE_RATE);
  for (let i = 0; i < riserLen; i++) {
    const t = i / SAMPLE_RATE;
    const prog = t / 0.8;
    const freq = 120 + 700 * Math.pow(prog, 3);
    const whiteNoise = (Math.random() * 2 - 1) * Math.pow(prog, 2) * 0.45;
    const tone = Math.sin(2 * Math.PI * freq * t) * Math.pow(prog, 2) * 0.55;
    addSample(riserStart + i, (tone + whiteNoise) * 0.75, (tone + whiteNoise) * 0.75);
  }

  // 3. THE MOMENT OF SILENCE (7.8s – 8.8s)
  // Absolutely NOTHING is added here!
  // Sample indices from Math.floor(7.8 * SAMPLE_RATE) to Math.floor(8.8 * SAMPLE_RATE) remain 0.000000.
  // 1.0 full second of pure void.

  // 4. THE FINAL CLIMAX REVEAL (8.8s – 11.5s)
  // Frame 264 (8.80s): Explosive sub-bass impact, orchestral anvil, and resolved acoustic piano chord!
  const revealStart = Math.floor(8.80 * SAMPLE_RATE);
  const revealDuration = TOTAL_SAMPLES - revealStart;

  for (let i = 0; i < revealDuration; i++) {
    const t = i / SAMPLE_RATE;

    // Sub-bass earthquake impact (35Hz fundamental with fast 85Hz attack transient)
    const subPitch = 35 + 75 * Math.exp(-t * 22);
    const subImpact = Math.sin(2 * Math.PI * subPitch * t) * Math.exp(-t * 1.5) * 0.95;

    // Metallic Anvil / Specular impact crack
    const anvil = Math.sin(2 * Math.PI * 1850 * t) * Math.exp(-t * 45) * 0.45 +
                  (Math.random() * 2 - 1) * Math.exp(-t * 80) * 0.35;

    // Majestic Piano Chord Resonance (A-Minor9: A1 55Hz, E2 82.4Hz, A2 110Hz, C3 130.8Hz, E3 164.8Hz, B3 246.9Hz)
    const chord = (
      Math.sin(2 * Math.PI * 55.0 * t) * 0.55 +
      Math.sin(2 * Math.PI * 82.4 * t) * 0.40 +
      Math.sin(2 * Math.PI * 110.0 * t) * 0.35 +
      Math.sin(2 * Math.PI * 130.8 * t) * 0.30 +
      Math.sin(2 * Math.PI * 164.8 * t) * 0.25 +
      Math.sin(2 * Math.PI * 246.9 * t) * 0.18
    ) * Math.exp(-t * 0.85);

    // Crystalline stereo shimmer tail
    const shimmerL = Math.sin(2 * Math.PI * 3520 * t) * Math.exp(-t * 2.2) * 0.08;
    const shimmerR = Math.sin(2 * Math.PI * 3530 * t) * Math.exp(-t * 2.2) * 0.08;

    const finalValL = subImpact + anvil * 0.8 + chord * 0.75 + shimmerL;
    const finalValR = subImpact + anvil * 0.8 + chord * 0.75 + shimmerR;

    addSample(revealStart + i, finalValL, finalValR);
  }

  // Master Normalizer (set peak to -0.3 dB)
  let peak = 0;
  for (let i = 0; i < TOTAL_SAMPLES; i++) {
    peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i]));
  }
  if (peak > 0.88) {
    const factor = 0.88 / peak;
    for (let i = 0; i < TOTAL_SAMPLES; i++) {
      left[i] *= factor;
      right[i] *= factor;
    }
  }

  return { left, right };
}

// Generate and write file
const audioPath = path.resolve('public/audio/the_making_of_sahaj_v2.wav');
console.log('Generating 11.5s awards-grade master audio track...');
const masterAudio = generateMasterV2();
const wavBuffer = createWavBuffer(masterAudio.left, masterAudio.right);
fs.writeFileSync(audioPath, wavBuffer);
console.log(`Saved master audio track to ${audioPath} (${(wavBuffer.length / 1024 / 1024).toFixed(2)} MB)`);

