
import { createRandomNote, selectNotesGiven } from "../random/random";
import { ExercisePart, Difficulty, NoteName } from "../../types";

const sevenNoteLetters: NoteName[] = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];

const exercises: Record<number, Record<Difficulty, ExercisePart>> = {
    1: {"easy": {possibleNoteLetters: sevenNoteLetters, numOfLetterBoxes: 2},
        "medium": {possibleNoteLetters: sevenNoteLetters, numOfLetterBoxes: 3},
        "hard": {possibleNoteLetters: sevenNoteLetters, numOfLetterBoxes: 4}
        },
    2: {"easy": {possibleNoteLetters: sevenNoteLetters, numOfLetterBoxes: 2},
        "medium": {possibleNoteLetters: sevenNoteLetters, numOfLetterBoxes: 3},
        "hard": {possibleNoteLetters: sevenNoteLetters, numOfLetterBoxes: 4}
        },
    3: {"easy": {possibleNoteLetters: sevenNoteLetters, numOfLetterBoxes: 7},
        "medium": {possibleNoteLetters: sevenNoteLetters, numOfLetterBoxes: 7},
        "hard": {possibleNoteLetters: sevenNoteLetters, numOfLetterBoxes: 7}
    }
}

export function generator(exerciseNum: number, difficulty: Difficulty) {
    const exercise = exercises[exerciseNum];
    if (!exercise) {
        throw new Error("generator() at fault because no such exercise exists");
    }
    const exercisePart = exercise[difficulty];
    if (!exercisePart) {
        throw new Error("generator() at fault because no such difficulty exists");
    }
    let listOfNotes: NoteName[] = [...exercisePart.possibleNoteLetters];
    const numOfLetterBoxes = exercisePart.numOfLetterBoxes;
    const correctNote = createRandomNote(listOfNotes);
    const index = listOfNotes.indexOf(correctNote);
    if (index !== -1) {
        listOfNotes.splice(index, 1);
    }
    const distractors = selectNotesGiven(listOfNotes, numOfLetterBoxes - 1);

    const choices = [...distractors, correctNote];

    const shuffledChoices = selectNotesGiven(choices, choices.length);

    return { correctNote, shuffledChoices };
}