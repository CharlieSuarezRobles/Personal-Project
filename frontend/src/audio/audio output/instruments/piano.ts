
import { getAudioContext, ensureRunning, playPartial } from "../audioEngine";
import { NoteName } from "../../../types";
import { noteToFrequency } from "../../noteMapping";

export async function playPianoNote(note: NoteName, volume: number, duration: number) {
    // Setting up the audio context
    const ctx = getAudioContext();
    await ensureRunning(ctx);

    // Setting up the frequency
    const f0 = noteToFrequency(note);

    // Get the starting time
    const t0 = ctx.currentTime;

    // Volume of the fundamental note
    const fundamentalNoteVolume = volume;

    // Duration of the fundamental note
    const fundamentalNoteDuration = duration;


    // Create the fundamental mode by playing 3 notes slightly off from the fundamental note
    playPartial(ctx, f0 * 0.9995, t0, fundamentalNoteVolume, fundamentalNoteDuration);
    playPartial(ctx, f0,          t0, fundamentalNoteVolume, fundamentalNoteDuration);
    playPartial(ctx, f0 * 1.0007, t0, fundamentalNoteVolume, fundamentalNoteDuration);

    // Set up the total time the note should be played for
    const baseDecay = duration * 5;

    // Set up all the overtones
    for (let n = 2; n <= 12; n++) {
        // Computing the frequency of each overtone
        const stretch = 1 + 0.000030 * (n * n); // tiny upward stretch
        const freq = f0 * n * stretch;

        // Computing the volume of the overtone
        const overtoneVolume = (volume / 2) / Math.pow(n, 2);   // start quieter as n increases

        // Computing how long the overtone should be played for
        const overtoneDuration = baseDecay / Math.pow(n, 1.2);     // faster decay for higher harmonics

        // Using mostly sine sounds more “acoustic” than triangle for partials
        playPartial(ctx, freq, t0, overtoneVolume, overtoneDuration, "sine");
    }
}