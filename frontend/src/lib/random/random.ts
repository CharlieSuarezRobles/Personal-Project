import { NoteName } from "../../types";


export function createRandomNote(noteList: NoteName[]) {
    const randomNote = Math.floor(Math.random() * noteList.length);
    return noteList[randomNote];
}

export function selectNotesGiven(noteList: NoteName[], numOfLetterBoxes: number) {
    const notes = [...noteList];
    for (let i = noteList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [notes[i], notes[j]] = [notes[j], notes[i]];
    }


    return notes.slice(0, Math.min(numOfLetterBoxes, notes.length));


}