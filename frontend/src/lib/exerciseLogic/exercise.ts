import { NoteName, Chord, Note } from "../../types";

const choices: NoteName[] = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];

export function getStaffChordsForExercise(
  exerciseNum: number,
  currentNote: NoteName,
  correct: (currentNote: NoteName) => void,
  incorrect: (noteSelected: NoteName) => void,
  showChords: Boolean
): Chord[] {
    if (showChords) {
        switch (exerciseNum) {
            case 1:
            return [[{ nm: currentNote }]];
            case 2:
            return [[{ nm: currentNote }]];
            case 3:
            const chords: Chord[] = choices.map((nm) => [
                {
                nm: nm,
                onClick: () =>
                    nm === currentNote
                    ? correct(currentNote)
                    : incorrect(nm),
                },
            ]);
            return chords;
            default:
            return [[]];
            }
    } else {
        return [[]];
    }
}
