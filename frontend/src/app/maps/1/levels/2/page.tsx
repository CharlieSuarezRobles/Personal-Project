"use client";
import { useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

import { NoteName, Difficulty } from "../../../../../types";
import { Button } from "../../../../../components/buttons/primary buttons/startButton";
import { Bar } from "../../../../../components/bar";
import { Scale } from "../../../../../components/tools/scale";
import { Staff } from "../../../../../components/music design/staffs and clefs/staff"
import { playPianoNote } from "@/audio/audio output/instruments/piano";
import { generator } from "../../../../../lib/generators/generator";
import { getStaffChordsForExercise } from "@/lib/exerciseLogic/exercise";


export default function Level2() {

    const NUM_OF_EXERCISES = 3;
    const START_OF_EXERCISE_1_INSTRUCTIONS = 1
    const END_OF_EXERCISE_1_INSTRUCTIONS = 2;
    const END_OF_EXERCISE_2_INSTRUCTIONS = 3;
    const END_OF_EXERCISE_3_INSTRUCTIONS = 4;
    const NUM_EASY_EXERCISE_1_Q = 1;
    const NUM_MID_EXERCISE_1_Q = 1;
    const NUM_HARD_EXERCISE_1_Q = 1;
    const NUM_OF_EXERCISE_1_QUESTIONS = NUM_EASY_EXERCISE_1_Q + NUM_MID_EXERCISE_1_Q + NUM_HARD_EXERCISE_1_Q;
    const NUM_EASY_EXERCISE_2_Q = 1;
    const NUM_MID_EXERCISE_2_Q = 1;
    const NUM_HARD_EXERCISE_2_Q = 1;
    const NUM_OF_EXERCISE_2_QUESTIONS = NUM_EASY_EXERCISE_2_Q + NUM_MID_EXERCISE_2_Q + NUM_HARD_EXERCISE_2_Q;
    const NUM_EASY_EXERCISE_3_Q = 1;
    const NUM_MID_EXERCISE_3_Q = 1;
    const NUM_HARD_EXERCISE_3_Q = 1;
    const NUM_OF_EXERCISE_3_QUESTIONS = NUM_EASY_EXERCISE_3_Q + NUM_MID_EXERCISE_3_Q + NUM_HARD_EXERCISE_3_Q;
    const DURATION_OF_NOTES = 1;

    const numOfQuestions = [
        0,
        NUM_OF_EXERCISE_1_QUESTIONS,
        NUM_OF_EXERCISE_2_QUESTIONS,
        NUM_OF_EXERCISE_3_QUESTIONS
    ]

    const getDifficulty = (exerciseNum: number, progress: number) => {
        switch(exerciseNum) {
            case 1: {
                if (progress < NUM_EASY_EXERCISE_1_Q) return "easy";
                else if (progress < NUM_EASY_EXERCISE_1_Q + NUM_MID_EXERCISE_1_Q) return "medium";
                else return "hard";
            }
            case 2: {
                if (progress < NUM_EASY_EXERCISE_2_Q) return "easy";
                else if (progress < NUM_EASY_EXERCISE_2_Q + NUM_MID_EXERCISE_2_Q) return "medium";
                else return "hard";
            }
            case 3: {
                if (progress < NUM_EASY_EXERCISE_3_Q) return "easy";
                else if (progress < NUM_EASY_EXERCISE_3_Q + NUM_MID_EXERCISE_3_Q) return "medium";
                else return "hard";
            }
            default:
                throw new Error("Unknown exercise number");
        }
    }

    const router = useRouter();

    // Functions and state on the top container

    const [showExerciseNum, setShowExerciseNum] = useState<Boolean>(false);
    const [exerciseNum, setExerciseNum] = useState<number>(0);
    const [difficulty, setDifficulty] = useState<Difficulty>("easy");

    const exerciseText: string[] = [
        "",
        "Exercise 1",
        "Exercise 2",
        "Exercise 3"
    ]

    const titleText: string[] = [
        "Level 2: Identifying the 7 notes",
        "Exercise 1: Identify note letters",
        "Exercise 2: Match pitch to letter",
        "Exercise 3: Match pitch to note",
        "Level 2: Identifying the 7 notes"
    ]

    const [showBar, setShowBar] = useState<Boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [showExit, setShowExit] = useState<Boolean>(true);

    // Functions and state on the middle container

    const [showInstructionText, setShowInstructionText] = useState<Boolean>(true); //---------------
    const [instructionTextIndex, setInstructionTextIndex] = useState<number>(0);

    const instructionText: String[] = [
        "Welcome to level 2! Here you will get to practice the 7 notes. Before beginning, \
         you must be aware that each level is composed of exercises, each giving you a chance \
         to practice the notes in different ways. This level is composed of 3 exercises.",
         "For this exercise, a pitch will be produced and its corresponding note will be labeled.\
          You will have to select the note letter that corresponds to the sound.",
        "Welcome to exercise 2! To complete this, a note will be played and you will have to identify\
        its letter. Note that this time, there won’t be written notes.",
        "Welcome to exercise 3. To complete this, a pitch will be played like in the last exercise; however,\
         you will have identify which note on the staff it corresponds to."

    ]

    const [showStaff, setShowStaff] = useState<Boolean>(false);
    const [showMusicSymbol, setShowMusicSymbol] = useState<Boolean>(false); //---------------
    const [showChords, setShowChords] = useState<Boolean>(false);
    const [currentNote, setCurrentNote] = useState<NoteName>("C4");
    const [noteChoices, setNoteChoices] = useState<NoteName[]>(["C4"]);

    // Functions and state on the bottom container

    const [questionIndex, setQuestionIndex] = useState<number>(0);

    const question: String[] = [
        "Click play to play a pitch and a note",
        "What is the letter corresponding to the pitch and the note?",
        "What is the note that was played?"

    ]

    const [showQuestion, setShowQuestion] = useState<Boolean>(false);

    // Functions and state in the bottom bottom container

    const [showCMajorScale, setShowCMajorScale] = useState<Boolean>(false);

    const [showLetters, setShowLetters] = useState<Boolean>(false);

    

    const [showContinue, setShowContinue] = useState<Boolean>(true);
    const [showPlay, setShowPlay] = useState<Boolean>(false);
    const [showPlayAgain, setShowPlayAgain] = useState<Boolean>(false);
    const [showSaveAndFinish, setShowSaveAndFinish] = useState<Boolean>(false);
    const [successMessageIndex, setSuccessMessageIndex] = useState<number>(0);

    const [showSuccess, setShowSuccess] = useState<Boolean>(false);

    const successMessages: string[] = [
        "Correct", 
        "Congratulations! You've finished exercise 1",
        "Congratulations! You've finished exercise 2",
        "Congratulations! You've finished exercise 3",
        "Congratulations! You've finished Level 2!",
    ]

    const [showIncorrect, setShowIncorrect] = useState<Boolean>(false);

    const handleContinue = () => {
        const next = instructionTextIndex + 1;
        if (next === START_OF_EXERCISE_1_INSTRUCTIONS) {
            setExerciseNum(1);
        } else if (next === END_OF_EXERCISE_1_INSTRUCTIONS) {
            //Hide all components that need to be hidden
            setShowInstructionText(false);
            setShowContinue(false);

            // Show all the items for exercise 1
            setShowExerciseNum(true);
            setShowBar(true);
            setShowStaff(true);
            setQuestionIndex(0);
            setShowQuestion(true);
            setShowPlay(true);
        } else if (next === END_OF_EXERCISE_2_INSTRUCTIONS) {// Remember to setExerciseNum in the correct() function
            //Hide all components that need to be hidden
            setShowInstructionText(false);
            setShowContinue(false);

            // Show all the items for exercise 1
            setShowExerciseNum(true);
            setShowBar(true);
            setQuestionIndex(0);
            setShowQuestion(true);
            setShowPlay(true);
        } else if (next === END_OF_EXERCISE_3_INSTRUCTIONS) {
            // Hide all the components needed to be hidden
            setShowInstructionText(false);
            setShowContinue(false);

            // Show all the items for exercise 1
            setShowExerciseNum(true);
            setShowBar(true);
            setQuestionIndex(0);
            setShowQuestion(true);
            setShowPlay(true);
        }
        setInstructionTextIndex(prev => prev + 1);
    }

    const handlePlay = () => {
        setShowPlay(false);
        setShowQuestion(false);
        const { correctNote, shuffledChoices } = generator(exerciseNum, getDifficulty(exerciseNum, progress));
        setCurrentNote(correctNote);
        setNoteChoices(shuffledChoices);
        setQuestionIndex(1);
        playPianoNote(correctNote, 0.2, DURATION_OF_NOTES);
        if (exerciseNum === 1) {
            setShowStaff(true);
            setShowChords(true);
        } else {
            setShowStaff(false);
            setShowMusicSymbol(true);
        }

        const timer = setTimeout(() => {
            setShowMusicSymbol(false);
            setShowQuestion(true);
            setShowCMajorScale(true);
            if (exerciseNum !== 2) {
                setShowStaff(true);
                setShowChords(true);
            }
            if (exerciseNum <= 2) setShowLetters(true);
            setShowPlayAgain(true);

        }, DURATION_OF_NOTES * 1000);
    }


    const handlePlayAgain = () => {
        playPianoNote(currentNote, 0.2, DURATION_OF_NOTES);
        
    }

    const handleSaveAndFinish = () => {
        const currentLevel = localStorage.getItem("currentLevel");
        if (Number(currentLevel) <= 2) {
            localStorage.setItem("currentLevel", "3");
        }
        router.push("/maps/1");
    }

    const incorrect = (note: NoteName) => {
        setShowIncorrect(true);
        playPianoNote(note, 0.2, DURATION_OF_NOTES);

        setTimeout(() => {
            setShowIncorrect(false);
            playPianoNote(currentNote, 0.2, DURATION_OF_NOTES);
        }, DURATION_OF_NOTES * 1000)
    }

    const correct = (note: NoteName) => {
        const next = progress + 1;
        setShowChords(false);
        setProgress(next);
        playPianoNote(note, 0.2, DURATION_OF_NOTES);
        setShowQuestion(false);
        setShowCMajorScale(false);
        setShowLetters(false);
        setShowPlayAgain(false);
        if (exerciseNum === 1 && next === NUM_OF_EXERCISE_1_QUESTIONS) {
            nextExercise();
            
        } else if (exerciseNum === 2 && next === NUM_OF_EXERCISE_2_QUESTIONS) {
            nextExercise();
        } else if (exerciseNum === 3 && next === NUM_OF_EXERCISE_3_QUESTIONS) {
            nextExercise();
        } else {
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                setShowQuestion(true);
                setShowPlay(true);
                setQuestionIndex(0); // Make the question ask "Click play to play pitch and note"
            }, DURATION_OF_NOTES * 1000)
        }

    }

    const nextExercise = () => {
        setSuccessMessageIndex(exerciseNum);
        setShowSuccess(true);
        if (exerciseNum < NUM_OF_EXERCISES) {
            setTimeout(() => {
                // Hide every component that is not needed
                setShowSuccess(false);
                setShowExerciseNum(false);
                setShowBar(false);
                setShowStaff(false);
                
                // Set up the state of every component that will be shown
                setExerciseNum(exerciseNum => exerciseNum + 1);
                setSuccessMessageIndex(0);

                // Reset the exercise progress
                setProgress(0);

                // Show every component that needs to be shown
                setShowInstructionText(true);
                setShowContinue(true);
            }, DURATION_OF_NOTES * 1000);
        } else {
            setTimeout(() => {
                setShowExerciseNum(false);
                setShowBar(false);
                setShowExit(false);
                setShowStaff(false);
                const next = exerciseNum + 1;
                setSuccessMessageIndex(next);
                setExerciseNum(next);
                setTimeout(() => {
                    setShowSuccess(false);
                    setShowSaveAndFinish(true);
                }, DURATION_OF_NOTES * 1000);
            }, DURATION_OF_NOTES * 1000);
        }
    }



    return (
        <div className="h-screen w-screen overflow-hidden grid grid-rows-[1fr_4fr_4fr] bg-[var(--background)]">
                    {/*The container that is on top*/}
                    <div className="
                        w-full
                        grid gap-2
                        grid-cols-2 grid-rows-2
                        sm:grid-cols-[1fr_2fr_1fr] sm:grid-rows-1
                        sm:p-1
                        items-center"
                    >
                        {/* Top left container*/}
                            <div className="h-full row-start-2 sm:row-start-auto flex items-center justify-center">
                                {showExerciseNum && 
                                    <div className="flex items-center justify-center p-2 md:p-3 lg:p-4 rounded-[30px] bg-[var(--surface)]">
                                        <p className="text-center heading">
                                            {exerciseText[exerciseNum]}
                                        </p>
                                    </div>
                                }
                            </div>
                        {/* Top middle container */}
                            <div className="h-full col-span-2 sm:col-span-1 flex items-center justify-center">
                                {!showBar && 
                                    <div className= "justify-self-center p-2 md:p-3 lg:p-4 rounded-[30px] bg-[var(--surface)]">
                                        <p  className="text-center heading">
                                            {titleText[exerciseNum]}
                                        </p>
                                    </div>
                                }
                                {showBar &&
                                    <Bar
                                    color="primary"
                                    numOfTotalParts={numOfQuestions[exerciseNum]}
                                    numOfCompletedParts={progress}
                                    ></Bar>
                                }
                            </div>
                        {/* Top right container */}
                            <div className="h-full row-start-2 col-start-2 sm:row-start-auto sm:col-start-auto flex items-center justify-center">
                                {showExit &&
                                    <Button
                                    label="Exit"
                                    color="danger"
                                    onClick={() => {router.push('/maps/1')}}
                                    variant="default"
                                    className="max-w-[200px] w-fit max-h-[108px] flex items-center justify-center p-6 md:p-8 lg:p-12 rounded-[30px] label"
                                    ></Button>
                                }
                            </div>
                    </div>
                    {/*The container that is in the middle */}
                    <div className="w-full flex items-center justify-center px-[1vw] py-[1vh]">
                        {showInstructionText &&
                            <div className="flex items-center justify-center rounded-[30px] p-4 md:p-8 lg:p-12 bg-[var(--surface)]">
                                <p className="text-center instructions-body">
                                    {instructionText[instructionTextIndex]}
                                </p>
                            </div>
                        }
                        {showStaff &&
                            <Staff
                            chords={getStaffChordsForExercise(exerciseNum, currentNote, correct, incorrect, showChords)}
                            numOfOutsideLines={1}
                            width="w-[80%]"
                            showNoteNames={false}
                            clef="treble"
                            showColors={false}
                            ></Staff>
                        }
                        {showMusicSymbol &&
                            <svg width="200" height="300" viewBox={`0 0 200 300`} fill="black"strokeWidth="5">
                                <ellipse cx="35" cy="230" rx="30" ry="40" fill="#111" />
                                <rect x="54" y="80" width="10" height="150" fill="#111" />
                                <path
                                    d="
                                        M 54 60
                                        C 54 60, 127 92.5, 200 25
                                        L 200 45
                                        C 200 45, 127 122.5, 54 80
                                        Z
                                    "
                                    fill="#111"
                                />
                                <ellipse cx="170" cy="190" rx="30" ry="40" fill="#111" />
                                <rect x="190" y="45" width="10" height="140" fill="#111" />
                            </svg>
                        }

                        
                    </div>
                    {/*The container that is on the bottom*/}
                    <div className="w-full grid grid-rows-[2fr_5fr]">
                        {/* Top bottom container */}
                        <div className="w-full flex items-center justify-center">
                        {showQuestion && 
                                <div className="w-fit p:2 md:p-3 lg:p-4 rounded-[30px] bg-[var(--surface)]">
                                    <p className="text-center instructions-body">
                                        {question[questionIndex]}
                                    </p>  
                                </div>
                        }
                        </div>
                        {/* Bottom bottom container */}
                        <div className="w-full grid grid-cols-[1fr_3fr_1fr]">
                            {/* Bottom bottom left container */}
                            <div className="h-full flex items-center justify-center">
                                {showCMajorScale &&
                                    <Scale
                                        color="secondary"
                                        scaleNote="C"
                                        scaleType="major"
                                    ></Scale>
                                }
                            </div>
                            {/* Bottom bottom middle container */}
                            <div className={`h-full flex items-center gap-4 md:gap-7 lg:gap-10 p-1 md:p-2 lg:p-3 justify-center`}>
                            {showLetters &&
                                    noteChoices.map((note, i) => (
                                        <Button
                                        key={i}
                                        label={note}
                                        onClick={note === currentNote ? () => correct(note) : () => incorrect(note)}
                                        color="primary"
                                        variant="default"
                                        className="h-[17vh] w-[12vw] note-text"
                                        ></Button>
                                    ))
                            }
                            </div>
                            {/* Bottom bottom right container */}
                            <div className="h-full flex items-center justify-center">
                                {showContinue &&
                                    <Button
                                    label="Continue"
                                    onClick={handleContinue}
                                    color="primary"
                                    variant="default"
                                    className="w-[15vw] h-[12vh] label"
                                    ></Button>
                                }
                                {showPlay &&
                                    <Button
                                    label="Play"
                                    onClick={handlePlay}
                                    color="primary"
                                    variant="default"
                                    className="w-[10vw] h-[12vh] label"
                                    ></Button>
                                }
                                {showPlayAgain &&
                                    <Button
                                    label="Play Again"
                                    onClick={handlePlayAgain}
                                    color="secondary"
                                    variant="default"
                                    className="w-[15vw] h-[12vh] label"
                                    ></Button>
                                }
                                {showSaveAndFinish &&
                                    <Button
                                    label="Save and Finish"
                                    onClick={handleSaveAndFinish}
                                    color="primary"
                                    variant="default"
                                    className="w-[15vw] h-[15vh] label"
                                    ></Button>
                                }
                            </div>
                        </div>
                    </div>
                    {showSuccess && 
                    <div className="fixed h-screen w-screen bg-black/50 z-10">
                        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center px-[6vw] py-[8vh] rounded-[30px] bg-[var(--success)] z-10">
                            <p className="text-center feedback-text">
                                {successMessages[successMessageIndex]}
                            </p>
                        </div>
                    </div>
                    }
                    {showIncorrect &&
                    <div className="fixed h-screen w-screen bg-black/50 z-10">
                        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center px-[6vw] py-[8vh] rounded-[30px] bg-[var(--try-again)] z-10">
                            <p className="text-center feedback-text">
                                Try again
                            </p>
                        </div> 
                    </div>
                    }
                </div>
    );
}