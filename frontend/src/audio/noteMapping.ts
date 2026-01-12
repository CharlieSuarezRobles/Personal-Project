
import { NoteName, NoteLetter } from "../types";

const REFERENCE_FREQUENCY = 440;

const noteToFrequencyMapping: Record<NoteLetter, number> = {
    "C" : -9,
    "C#": -8,
    "Db": -8,
    "D" : -7,
    "D#": -6,
    "Eb": -6,
    "E" : -5,
    "F" : -4,
    "F#": -3,
    "Gb": -3,
    "G" : -2,
    "G#": -1,
    "Ab": -1,
    "A" : 0,
    "A#": 1,
    "Bb": 1,
    "B" : 2
}

function noteToSemitoneOffset(noteName: NoteName): number {
    if (!noteName) {
        throw new Error("noteName was undefined/null");
    }
    let note: NoteLetter;
    let octave: number;
    if (noteName.includes("#") || noteName.includes("b")) {
        note = noteName.slice(0, 2) as NoteLetter;
        octave = Number(noteName.slice(2));
    } else {
        note = noteName.slice(0, 1) as NoteLetter;
        octave = Number(noteName.slice(1));
    }
    return noteToFrequencyMapping[note] + 12 * (octave - 4);
}

export function noteToFrequency(noteName: NoteName): number {
    const semitoneOffset = noteToSemitoneOffset(noteName);
    return REFERENCE_FREQUENCY * Math.pow(2, semitoneOffset/12)
}