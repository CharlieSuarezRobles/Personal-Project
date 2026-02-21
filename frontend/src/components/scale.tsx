import { useEffect, useState } from "react";
import { NoteLetter, NoteName, ScaleType, ColorVariant } from "../types"
import { Button } from "./startButton"
import { playPianoNote } from "../audio/audio output/instruments/piano"
import { Text } from "./text";
import { twMerge } from "tailwind-merge";


interface ScaleProps {
    color: ColorVariant;
    scaleNote: NoteLetter;
    scaleType: ScaleType;
};

const BASE_CLASSES = "flex items-center justify-center rounded-[30px] bg-[var(--accent)]";

const SIZES = "w-[90px] h-[90px] md:w-[120px] md:h-[120px] lg:w-[160px] lg:h-[160px]";

const notes: NoteLetter[] = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B"
]

const scaleToNumber: Record<NoteLetter, number> = {
    "C" : 0,
    "C#": 1,
    "Db": 1,
    "D" : 2,
    "D#": 3,
    "Eb": 3,
    "E" : 4,
    "F" : 5,
    "F#": 6,
    "Gb": 6,
    "G" : 7,
    "G#": 8,
    "Ab": 8,
    "A" : 9,
    "A#": 10,
    "Bb": 10,
    "B" : 11
}

const noteForInstrument: NoteName[] = [
    "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
    "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",
]

const labels: string[] = [
    "C major scale",
    "C# major scale",
    "D major scale",
    "Eb major scale",
    "E major scale",
    "F major scale",
    "F# major scale",
    "G major scale",
    "Ab major scale",
    "A major scale",
    "Bb major scale",
    "B major scale"
]

const scaleTypes: Record<ScaleType, number[]> = {
    "major": [1, 3, 5, 6, 8, 10, 12, 13],
    "minor": [1, 3, 4, 6, 8, 9 , 11, 13]
} 


export function Scale({color, scaleNote, scaleType}: ScaleProps) {
    const containerClasses = twMerge(
        BASE_CLASSES,
        SIZES,
    )
    const [currentlyPlaying, setCurrentlyPlaying] = useState<Boolean>(false);
    const [currentNote, setCurrentNote] = useState<NoteLetter>(scaleNote);

    useEffect(() => {
        if (!currentlyPlaying) return;

        let i: number = 0;
        const rootNumber = scaleToNumber[scaleNote] - 1;
        setCurrentNote(notes[rootNumber + 1]);
        playPianoNote(noteForInstrument[rootNumber + 1], 0.2, 1);
        const id = setInterval(() => {
            i += 1;
            if (i >= scaleTypes[scaleType].length) {
                setCurrentlyPlaying(false);
                clearInterval(id);
                return;
            }
            setCurrentNote(notes[(rootNumber + scaleTypes[scaleType][i]) % 12]);
            playPianoNote(noteForInstrument[rootNumber + scaleTypes[scaleType][i]], 0.2, 1);
        }, 1000);
        return () => clearInterval(id);
    }, [currentlyPlaying])

    const button = () => {
        setCurrentlyPlaying(true);
    }
    return (
        <>
            {!currentlyPlaying &&
                <Button
                label={labels[scaleToNumber[scaleNote]]}
                onClick={button}
                color={color}
                ></Button>
            }
            {currentlyPlaying &&
                <div className={containerClasses}>
                    <Text
                        text={currentNote}
                        color="accent"
                        heading="note"
                    />
                </div>
            }
        </>
    );
}