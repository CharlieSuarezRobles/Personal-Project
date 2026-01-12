

let audioContext: AudioContext | null = null;

export function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

export async function ensureRunning(ctx: AudioContext) {
  if (ctx.state === "suspended") await ctx.resume();
}

// This function creates a wave

export async function playPartial(
    ctx: AudioContext,
    frequency: number,
    startTime: number,
    peakGain: number,
    decayTime: number,
    type: OscillatorType = "sine"
){

    // oscillator for the wave
    const osc = ctx.createOscillator();

    // gain for the wave, it controlls how loud the sound must be played
    const gain = ctx.createGain();

    osc.frequency.value = frequency;
    
    osc.type = type;
    
    const t0 = startTime;
    const tAttack = 0.005;
    const tEnd = t0 + decayTime;

    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(Math.max(peakGain, 0.0002), t0 + tAttack);
    gain.gain.exponentialRampToValueAtTime(0.0001, tEnd);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t0);
    osc.stop(tEnd + 0.02);
}
