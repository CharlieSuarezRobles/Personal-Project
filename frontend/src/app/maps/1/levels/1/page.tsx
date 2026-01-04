"use client";
import { useRouter } from "next/navigation";

import { Button } from "../../../../../components/buttons/primary buttons/startButton";
import { Overlay } from "../../../../../components/overlays/overlay";
import { Staff } from "../../../../../components/music design/staffs and clefs/staff";

export default function Level1() {
    const router = useRouter();

    const handleLow = () => {

    }

    const handleHigh = () => {

    }

    const steps = [
        <></>,
        <></>,
        <div className="flex flex-row items-center justify-center p-4 md:p-6 lg:p-8 gap-20">
            <Button
                label="Low"
                color="primary"
                onClick={handleLow}
                variant="default"
                className="max-w-[150px] w-fit max-h-[150px] flex items-center justify-center p-6 md:p-10 lg:p-12 rounded-[30px] label"
            ></Button>
            <Button
                label="High"
                color="primary"
                onClick={handleHigh}
                variant="default"
                className="max-w-[150px] w-fit max-h-[150px] flex items-center justify-center p-6 md:p-10 lg:p-12 rounded-[30px] label"
            ></Button>
        </div>,
        <></>,
        <></>,
        <div className="w-full flex items-center justify-center">
            <Staff
                chords={[[]]}
                numOfOutsideLines={1}
                width={"70%"}
                showNoteNames={false}
                clef="none"
            ></Staff>
        </div>,
        <div className="w-full flex items-center justify-center">
            <Staff
                chords={[[{nm:"F4"}], [{nm:"F5"}], [{nm:"D5"}], [{nm:"A4"}, {nm: "D5"}], [{nm:"E5"}], [{nm:"B4"}],
                 [{nm:"G4"}], [{nm:"C5"}], [{nm:"F4"}]]}
                numOfOutsideLines={1}
                width={"70%"}
                showNoteNames={false}
                clef="none"
            ></Staff>
        </div>,
        <div className="w-full flex items-center justify-center">
            <Staff
                chords={[[{nm: "E4"}], [{nm:"F4"}], [{nm:"G4"}], [{nm:"A4"}], [{nm:"B4"}], [{nm:"C5"}], [{nm:"D5"}], [{nm:"E5"}],
                 [{nm:"F5"}]]}
                numOfOutsideLines={1}
                width={"70%"}
                showNoteNames={false}
                clef="none"
            ></Staff>
        </div>,
        <div className="w-full flex items-center justify-center">
            <Staff
                chords={[[{nm: "C4"}], [{nm:"D4"}], [{nm:"G5"}], [{nm:"A5"}]]}
                numOfOutsideLines={1}
                width={"70%"}
                showNoteNames={false}
                clef="none"
            ></Staff>
        </div>,
        <div className="w-full flex items-center justify-center">
            <Staff
                chords={[[{nm: "A4"}], [{nm:"B4"}], [{nm:"C5"}], [{nm:"D5"}], [{nm:"E5"}], [{nm:"F5"}], [{nm:"G5"}], [{nm:"A5"}]]}
                numOfOutsideLines={1}
                width={"70%"}
                showNoteNames={false}
                clef="none"
            ></Staff>
        </div>,
        <div className="w-full flex items-center justify-center">
            <Staff
                chords={[[{nm: "A4"}], [{nm:"B4"}], [{nm:"C5"}], [{nm:"D5"}], [{nm:"E5"}], [{nm:"F5"}], [{nm:"G5"}], [{nm:"A5"}]]}
                numOfOutsideLines={1}
                width={"70%"}
                showNoteNames={false}
                clef="none"
            ></Staff>
        </div>,
        <div className="w-full flex items-center justify-center">
            <Staff
                chords={[[{nm: "A4", label:"A"}], [{nm:"B4", label:"B"}], [{nm:"C5", label:"C"}], [{nm:"D5", label:"D"}],
                 [{nm:"E5", label:"E"}], [{nm:"F5", label:"F"}], [{nm:"G5", label:"G"}], [{nm:"A5", label:"A"}]]}
                numOfOutsideLines={1}
                width={"70%"}
                showNoteNames={true}
                clef="none"
            ></Staff>
        </div>,
        <div className="w-full flex items-center justify-center">
            <Staff
                chords={[[{nm: "A4", label:"A"}], [{nm:"B4", label:"B"}], [{nm:"C5", label:"C"}], [{nm:"D5", label:"D"}],
                 [{nm:"E5", label:"E"}], [{nm:"F5", label:"F"}], [{nm:"G5", label:"G"}], [{nm:"A5", label:"A"}]]}
                numOfOutsideLines={1}
                width={"70%"}
                showNoteNames={true}
                clef="none"
            ></Staff>
        </div>,
        <div className="w-full flex items-center justify-center">
            <Staff
                chords={[[{nm: "A4", label:"A4"}], [{nm:"B4", label:"B4"}], [{nm:"C5", label:"C5"}], [{nm:"D5", label:"D5"}],
                 [{nm:"E5", label:"E5"}], [{nm:"F5", label:"F5"}], [{nm:"G5", label:"G5"}], [{nm:"A5", label:"A5"}]]}
                numOfOutsideLines={1}
                width={"70%"}
                showNoteNames={true}
                clef="none"
            ></Staff>
        </div>,
        <div className="w-full flex items-start justify-center">
            <Staff
                chords={[[{nm: "C4", label:"C4"}], [{nm:"D4", label:"D4"}], [{nm:"E4", label:"E4"}], [{nm:"F4", label:"F4"}],
                 [{nm:"G4", label:"G4"}], [{nm:"A4", label:"A4"}], [{nm:"B4", label:"B4"}], [{nm:"C5", label:"C5"}]]}
                numOfOutsideLines={1}
                width={"70%"}
                showNoteNames={true}
                clef="none"
            ></Staff>
        </div>,
        <div className="w-full flex items-start justify-center">
            <Staff
                chords={[[{nm: "C4", label:"C4"}], [{nm:"D4", label:"D4"}], [{nm:"E4", label:"E4"}], [{nm:"F4", label:"F4"}],
                 [{nm:"G4", label:"G4"}], [{nm:"A4", label:"A4"}], [{nm:"B4", label:"B4"}], [{nm:"C5", label:"C5"}]]}
                numOfOutsideLines={1}
                width={"70%"}
                showNoteNames={true}
                clef="none"
            ></Staff>
        </div>,
        <div className="w-full flex items-start justify-center">
            <Staff
                chords={[[]]}
                numOfOutsideLines={1}
                width={"70%"}
                showNoteNames={true}
                clef={"treble"}
            ></Staff>
        </div>,
        <div className="w-full flex items-start justify-center gap-8">
            <Staff
                chords={[[{nm:"B4", label:"B4"}]]}
                numOfOutsideLines={1}
                width={"35%"}
                showNoteNames={true}
                clef={"treble"}
            ></Staff>
            <Staff
                chords={[[{nm:"B4", label:"B4?"}]]}
                numOfOutsideLines={1}
                width={"35%"}
                showNoteNames={true}
                clef={"none"}
            ></Staff>
        </div>,
        <></>,
        <></>,
        <></>
    ]

    const handleClose = () => {
        router.push("maps/1");
    }

    const handleSkip = () => {

    }

    return (
        <div className="h-screen w-screen overflow-hidden grid-cols[1fr_3fr] bg-[var(--background)]">
            <div className="w-full grid grid-cols-[1fr_2fr_1fr] items-center p-1 md:p-2 lg:p-3">
                <div className="flex-1"></div>
                <div className= "justify-self-center p-2 md:p-3 lg:p-4 rounded-[30px] bg-[var(--surface)]">
                    <p  className="text-center heading">
                        Level 1: Introducing the 7 notes of music
                    </p>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <Button
                    label="Exit"
                    color="danger"
                    onClick={() => {router.push('/maps/1')}}
                    variant="default"
                    className="max-w-[200px] w-fit max-h-[108px] flex items-center justify-center p-6 md:p-10 lg:p-12 rounded-[30px] label"
                    ></Button>
                </div>
            </div>
            <div>
                <Overlay 
                    upperBoxAttributes="bg-[var(--surface)]"
                    texts={["Welcome to level 1. Here you will get an exposure about the 7 basic notes that exist in music.",
                            "Now, you might wonder what a note is. Before defining it, let’s start with music. When you listen \
                             to a song, you will hear sounds of all sorts. Musicians might want to reproduce these; however, they \
                            need a way of identifying each of those sounds. So, to do so, they measure the sounds in many different ways.\
                            One such way is something called pitch.",
                            "Pitch is how high or low a sound sounds. Here, you can see two boxes. One labeled as high and the other one as \
                            low. Click on each one. The one labeled as high has a higher pitch than the other one.",
                            "With pitch, musicians can now distinguish and thus identify most of the sounds that appear on a song. But now, \
                            when they play a song with an instrument, they need to remember which notes they intended the song to have. Thus,\
                            they need a way of writing a song into a paper and that’s called music notation.",
                            "Now, there are different ways of writing music throughout the world. The one that will be taught in this game \
                            is Western music notation which is the one that you’ve most likely have seen and the one that I will just call music \
                            notation for simplicity.",
                            "Let’s start with the components of such notation. First, you will see that it’s composed of five lines. \
                            This is called the “Staff”.",
                            "Next, you will see that musicians put circles in different lines. We call these circles “notes”.",
                            "A circle may either be on top of a line or between two. Knowing this, if we count the number of positions \
                            a circle may be placed at, we get 9.",
                            "However, these are not all the positions in which we may place a note. We can put notes outside of the staff.\
                            We would just put the note with a few lines to see how much out of the staff it is.",
                            "Let’s connect pitch with music notation. The place in which the note is placed within the staff will determine\
                            the pitch the note will represent. So, the higher the note is on the lines, the higher the pitch.",
                            "In the image, you can see that the leftmost note has the  lowest pitch, then the second leftmost note is the one\
                             that has the second lowest pitch and so on.",
                             "Now, we need to distinguish different pitches. So, we divide all the possible pitches into 7 which we match with\
                            the first letters of the alphabet, A, B, C, D, E, F, G.",
                            "In music, you will see that the notes are labeled repeatedly from A through G. This is due to several patterns that we can\
                            get out of notes if we do so.",
                            "Due to this repetition, the notes also need to have a number attacthed to them to distinguish which\
                            A among all A's we are talking about and the same for the rest of the letters. The higher the number, the\
                            higher the pitch the letter has so A5 is higher than A4",
                            "You will also notice that the number changes after B. This is a convention that has been set in western music. So,\
                            the real sequence goes, C, D, E, F, G, A, B. Once again, you can see each note with its corresponding letter.",
                            "You might notice that C is repeated again\. This is to make all the pitches sound good together.\
                            If we only have C, D, E, F, G, A, B, your ear will feel like a pitch is missing.",
                            "One last thing that you need to learn in this lesson is the big symbol that appears\
                            on the left of the staff. This is called the “treble clef”.",
                            "If we place a note on the middle line, we will get a B specifically on the treble clef. So, \
                            if you don’t see such clef, you don’t know that the middle note is a B and the same applies for the rest.",
                            "Now, it’s time to see how each of the 7 notes sound plus the repeated C. There are three things that you must\
                            keep in mind when identifying notes. The first one is its pitch (the sound that you hear), the second one is\
                            the note (the symbol that you see on the staff), and the third one is the letter (C, E, G, etc.).",
                            "To begin, you will see the 7 notes on the staff and the pitch of each note will be played. Whenever\
                            a pitch is played, the corresponding note on the staff will change its color to help you match pitch\
                            with the note. In addition, its corresponding letter will pop up."]}
                children={steps}
                handleClose={handleClose}
                handleSkip={() => {}}
                variant="level-instructions"
                />
            </div>
        </div>
    );
}