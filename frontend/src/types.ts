export type ColorVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "note"
  | "disabled"
  | "yellow"
  | "strong-accent"
  | "success"
  | "surface"
  | "try-again"
  | "accent";
export type Difficulty = "easy" | "medium" | "hard";
export type Direction = "left" | "right";

export const colors: Record<ColorVariant, string> = {
  "primary": `
        bg-[var(--action-primary)]
        hover:bg-[var(--action-primary-hover)]
        active:bg-[var(--action-primary-active)]
    `,
  "secondary": `
        bg-[var(--action-secondary)]
        hover:bg-[var(--action-secondary-hover)]
        active:bg-[var(--action-secondary-active)]
    `,
  "danger": `
        bg-[var(--error-or-danger)]
        hover:bg-[var(--error-or-danger-hover)]
        active:bg-[var(--error-or-danger-active)]
    `,
  "note": `
        bg-[var(--note)]
        hover:bg-[(var(--note-hover)]
        active:bg-[var(--note-active)]
    `,
  "disabled": `
        bg-[var(--disabled)]
    `,
  "yellow": `
        bg-[var(--yellow)]
        hover:bg-[var(--yellow-hover)]
        active:bg-[var(--yellow-active)]
    `,
  "strong-accent": `
        bg-[var(--strong-accent)]
        hover:bg-[var(--yellow-hover)]
        active:bg-[var(--yellow-active)]
    `,
  "surface":
      "bg-[var(--surface)]",
  "success":
      "bg-[var(--success)]",
  "try-again":
    "bg-[var(--try-again)]",
  "accent":
    "bg-[var(--accent)]"
};

export type ColorObject = {
  unactive: string;
  hover: string;
  active: string;
};

export const SVGColors: Record<ColorVariant, ColorObject> = {
  "primary": {
    unactive: "var(--action-primary)",
    hover: "var(--action-primary-hover)",
    active: "var(--action-primary-active)",
  },
  "secondary": {
    unactive: "var(--action-secondary)",
    hover: "var(--action-secondary-hover)",
    active: "var(--action-secondary-active)",
  },
  "danger": {
    unactive: "var(--error-or-danger)",
    hover: "var(--error-or-danger-hover)",
    active: "var(--error-or-danger-active)",
  },
  "note": {
    unactive: "var(--note)",
    hover: "var(--note-hover)",
    active: "var(--note-active)",
  },
  "disabled": {
    unactive: "var(--disabled)",
    hover: "var(--disabled-hover)",
    active: "var(--disabled-active)",
  },
  "yellow": {
    unactive: "var(--yellow)",
    hover: "var(--yellow-hover)",
    active: "var(--yellow-active)",
  },
  "strong-accent": {
    unactive: "var(--yellow)",
    hover: "var(--yellow-hover)",
    active: "var(--yellow-active)",
  },
  "surface": {
    unactive: "var(--surface)",
    hover: "var(--surface)",
    active: "var(--surface)",
  },
  "success": {
    unactive: "var(--success)",
    hover: "var(--success)",
    active: "var(--success)",
  },
  "try-again": {
    unactive: "var(--try-again)",
    hover: "var(--try-again)",
    active: "var(--try-again)",
  },
  "accent": {
    unactive: "var(--accent)",
    hover: "var(--accent-hover)",
    active: "var(--accent-active)",
  }
};


export type FlagProps = {
  text: string;
  handleStart: () => void;
  direction?: "left" | "right";
};

export type NoteName =
  | "C2"
  | "C#2"
  | "Db2"
  | "D2"
  | "D#2"
  | "Eb2"
  | "E2"
  | "F2"
  | "F#2"
  | "Gb2"
  | "G2"
  | "G#2"
  | "Ab2"
  | "A2"
  | "A#2"
  | "Bb2"
  | "B2"
  | "C3"
  | "C#3"
  | "Db3"
  | "D3"
  | "D#3"
  | "Eb3"
  | "E3"
  | "F3"
  | "F#3"
  | "Gb3"
  | "G3"
  | "G#3"
  | "Ab3"
  | "A3"
  | "A#3"
  | "Bb3"
  | "B3"
  | "C4"
  | "C#4"
  | "Db4"
  | "D4"
  | "D#4"
  | "Eb4"
  | "E4"
  | "F4"
  | "F#4"
  | "Gb4"
  | "G4"
  | "G#4"
  | "Ab4"
  | "A4"
  | "A#4"
  | "Bb4"
  | "B4"
  | "C5"
  | "C#5"
  | "Db5"
  | "D5"
  | "D#5"
  | "Eb5"
  | "E5"
  | "F5"
  | "F#5"
  | "Gb5"
  | "G5"
  | "G#5"
  | "Ab5"
  | "A5"
  | "A#5"
  | "Bb5"
  | "B5"
  | "C6"
  | "C#6"
  | "Db6"
  | "D6"
  | "D#6"
  | "Eb6"
  | "E6"
  | "F6"
  | "F#6"
  | "Gb6"
  | "G6"
  | "G#6"
  | "Ab6"
  | "A6"
  | "A#6"
  | "Bb6"
  | "B6";

export type NoteLetter =
  | "C"
  | "C#"
  | "Db"
  | "D"
  | "D#"
  | "Eb"
  | "E"
  | "F"
  | "F#"
  | "Gb"
  | "G"
  | "G#"
  | "Ab"
  | "A"
  | "A#"
  | "Bb"
  | "B";

export type Note = {
  nm: NoteName;
  label?: string;
  color?: ColorVariant;
  onClick?: () => void;
};

export type ScaleType = "major" | "minor";

export type Color = "primary" | "accent";

export type Chord = Note[];

export type NoteMappings = Record<string, number>;

export type StaffProps = {
  chords: Chord[];
  numOfOutsideLines: 1 | 2 | 3;
  width?: string;
  showNoteNames: boolean;
  clef: "treble" | "bass" | "none";
  showColors: boolean;
};

export type LetterBoxProps = {
  color: ColorVariant;
  width: string;
  height: string;
  noteLetter: NoteLetter;
};

export type BarProps = {
  color: ColorVariant;
  numOfTotalParts: number;
  numOfCompletedParts: number;
};

export type ExercisePart = {
  possibleNoteLetters: NoteName[];
  numOfLetterBoxes: number;
};

export type EndFlagProps = {
  x: number,
  y: number,
  up: boolean,
  map: number,
  maskId: number
}

export type TextProps = {
  text: string
}

export type HeadingClass = "heading" | "mini-heading" | "instructions" | "note";