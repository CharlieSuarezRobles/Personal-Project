import { useState, useEffect, useMemo } from "react";
import { Chord, ColorVariant, NoteMappings } from "../types";
import { NoteButton } from "./noteButton";
import { TrebleClef } from "./trebleClef";

interface StaffProps {
  chords: Chord[];
  numOfOutsideLines: 1 | 2 | 3;
  width?: string;
  clef: "treble" | "bass" | "none";
};

type Position = {
  x: number;
  y: number;
  linesAboveNote: number;
  label: string | null;
  color: ColorVariant;
  onNoteClick?: () => void;
};

const noteMappings: NoteMappings = {
    "F3": 10,
    "G3": 9,
    "A3": 8,
    "B3": 7,
    "C4": 6,
    "D4": 5,
    "E4": 4,
    "F4": 3,
    "G4": 2,
    "A4": 1,
    "B4": 0,
    "C5": -1,
    "D5": -2,
    "E5": -3,
    "F5": -4,
    "G5": -5,
    "A5": -6,
    "B5": -7,
    "C6": -8,
    "D6": -9,
    "E6": -10,
}

const STARTING_X = 230;
const X_INCREMENT = 100;
const Y_INCREMENT = 18;
const LINE_SPACING = 36;

export function Staff({chords, numOfOutsideLines, width, clef}: StaffProps) {

    const height = 250 + (75 * numOfOutsideLines);

    const [clefName, setClefName] = useState<string>("none");

    const notePositions = useMemo(() => {
        return chords.flatMap((chord, i) => 
          chord.map(note => ({
            x: STARTING_X + (X_INCREMENT * i),
            y: (height / 2) + noteMappings[note.nm] * Y_INCREMENT,
            linesAboveNote: noteMappings[note.nm],
            label : note.label ?? null,
            color: note.color ?? "note",
            onNoteClick: note.onClick,
          }))
        );
    }, [chords, height]);

    useEffect(() => {
        setClefName(clef);
    }, []);

    const renderNotes = (positions: Position[]) => {
        
        return positions.map((p, i) => {
            return (
            <svg key={i}>
                <NoteButton
                    x={p.x}
                    y={p.y}
                    linesAboveNote={p.linesAboveNote}
                    label={p.label}
                    color={p.color}
                    onClick={p.onNoteClick}
                    heightOfStaff={height}
                ></NoteButton>
            </svg>
            );
        });
    }

    return (
        <div style={{height: `${height}px`, width: `${width}`}}>
            <svg className="w-full h-full" viewBox={`0 0 1200 ${height}`}>
                <rect x="0" y={(height / 2) - 2 * LINE_SPACING} width="1200" height="143" fill="var(--surface)" />
            {[-2, -1, 0, 1, 2].map((lineIndex) => (
                <line
                    key={lineIndex}
                    x1="0"
                    y1={(height / 2) + lineIndex * LINE_SPACING}
                    x2="1200" y2={(height / 2) + lineIndex * LINE_SPACING}
                    stroke="black"
                />
            ))}
                {renderNotes(notePositions)}
                {clef === "treble" &&
                    <TrebleClef height={height} color="black"/>
                }
            </svg>
        </div>
    );
}