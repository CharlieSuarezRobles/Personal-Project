"use client";
import { useRouter } from "next/navigation";
import { ColorVariant } from "../../../types";
import { useState, useEffect, useMemo, use } from "react";
import { Button } from "../../../components/startButton";
import { Overlay } from "../../../components/overlay";
import { CircleButton } from "../../../components/circleButton";
import { EndFlag } from "../../../components/endFlag";
import { LevelFlag } from "../../../components/levelFlag";
import { Note } from "../../../components/note";
import { Text } from "../../../components/text";
import learningPathSample from "../../../../public/learning-path-sample.png";

interface LevelConfig {
  circleCallbackName: string;
  circleX: number;
  circleY: number;
  flagX: number;
  flagY: number;
  buttonColor: ColorVariant;
  text: string;
  buttonText: string;
  buttonCallBackName: string;
  flagDirection: "left" | "right";
}

const NUM_OF_LEVELS = 3;

const LEVELS: Record<number, LevelConfig> = {
  1: {circleCallbackName: "handleLevel1", circleX: 273, circleY: 568, flagX: 258, flagY: 370,
     buttonColor: "primary", text: "LEVEL 1: \n Introducing the 7 notes", buttonText: "Start",
      buttonCallBackName: "handleStartLevel1", flagDirection: "right"},

  2: {circleCallbackName: "handleLevel2", circleX: 720, circleY: 568, flagX: 708, flagY: 370, 
    buttonColor: "primary", text: "LEVEL 2: \n Identifying the 7 notes", buttonText: "Start",
     buttonCallBackName: "handleStartLevel2", flagDirection: "right"},

  3: {circleCallbackName: "handleFinish", circleX: 1209, circleY: 568, flagX: 1195, flagY: 370,
     buttonColor: "primary", text: "End of music concept", buttonText: "Start",
      buttonCallBackName: "handleStartFinish", flagDirection: "left"},
}

const PATH1 = "M 273 568 C 273 568 384 368 496  568 C 496 568 608 768 720 568";

const PATH2 = "M 720 568 C 720 568 842 368 964  568 C 964 568 1086.5 768 1209 568";

const NOTE_CHARACTERISITCS: [number, number, number][] = [[200, 200, -20], [400, 300, 20], [650, 200, 0],
[1100, 680, -40], [1050, 200, 40], [850, 650, 70], [400, 600, -30]];

const NOTE_LETTER_CHARACTERISTICS: [number, number, number, string][] = [[200, 360, -30, "A"], [500, 350, 10, "B"], [650, 350, 0, "C"],
[900, 350, -20, "D"], [800, 640, 25, "E"], [1050, 760, -20, "F"], [300, 720, -20, "G"]];

const FIRST_OVERLAY_TEXTS = [
            "In this screen, you can see three circles and a flagpole. Each reveal the progress you’ve made throughout the music concept.",
            "Each circle denotes a level exercise. Each exercise will help you learn the theory and practice the music concept.",
            "All the circles that have been completed will be turquoise, the one that you are currently on will be yellow, and the ones that are still locked, will be gray. This image shows an example of this.",
            "Once you’ve completed all music levels, you will see that the flag will pop up. That means that you’ve completed the game!",
            "You can come back to these instructions whenever you want by clicking the instructions button on the map which you will see once you finished with these instructions.",
            "Now, to begin, you can close window, take a look at the map, and begin clicking on the yellow circle to start the first level.",
];

const FINAL_OVERLAY_TEXTS = [
            "Congratulations! You've finished the entire game! Although you've gone through all the levels, you can still access them to keep practicing \
            and gain the ability to see a note on the staff and match it with its corresponding pitch.",
            "Thanks for visiting this website! — Charlie Suarez Robles",
];

export default function Map1() {
  const router = useRouter();

  const steps = [
    <></>,
    <></>,
    <img
      src={learningPathSample.src}
      className="max-h-full max-w-full object-contain"
    />,
    <></>,
    <></>,
    <></>,
  ];

  const [instructionOverlay, setInstructionOverlay] = useState<Boolean>(false);
  const [finalOverlay, setFinalOverlay] = useState<Boolean>(false);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [activeLevel, setActiveLevel] = useState<number | null>(null);

  const handlers: Record<string, Record<number, () => void>> = {
    circleCallbackName: {
      1: () => handleLevel1(),
      2: () => handleLevel2(),
      3: () => handleFinish(),
    },
    buttonCallbackName: {
      1: () => handleStartLevel1(),
      2: () => handleStartLevel2(),
      3: () => handleStartFinish(),
    }
  }

  const determineColor = (level: number) => {
    if (level === NUM_OF_LEVELS && currentLevel == NUM_OF_LEVELS) {
      return "primary";
    }
    if (currentLevel > level) {
      return "primary";
    } else if (currentLevel === level) {
      return "yellow";
    } else {
      return "disabled";
    }
  }

  const handleLevel1 = () => {
    setActiveLevel(1);
  };

  const handleStartLevel1 = () => {
    router.push("/maps/1/levels/1");
  };

  const handleLevel2 = () => {
    setActiveLevel(2);
  };

  const handleStartLevel2 = () => {
    router.push("/maps/1/levels/2");
  };

  const handleFinish = () => {
    setActiveLevel(3);
  };

  const handleStartFinish = () => {
    setFinalOverlay(true);
  };

  const handleSkip = () => {
    localStorage.setItem("firstTime", "false");
    setInstructionOverlay(false);
    setFinalOverlay(false);
  };

  const handleClose = () => {
    localStorage.setItem("firstTime", "false");
    setInstructionOverlay(false);
    setFinalOverlay(false);
  };

  const circleLevels = useMemo(() => {
    return [1, 2, 3].map((level) => (
        <CircleButton
          key={level}
          onClick={handlers.circleCallbackName[level]}
          color={determineColor(level)}
          x={LEVELS[level].circleX}
          y={LEVELS[level].circleY}
        ></CircleButton>
    ));
  }, [currentLevel]);

  useEffect(() => {
    const firstTime = localStorage.getItem("firstTime");
    if (firstTime === "true") setInstructionOverlay(true);
  }, []);

  const handleInstructions = () => {
    setInstructionOverlay(true);
  };

  const handleExit = () => {
    router.push("/");
  };

  useEffect(() => {
    const storedLevel = localStorage.getItem("currentLevel");
    if (storedLevel === null) {
      localStorage.setItem("currentLevel", "1");
    } else {
      setCurrentLevel(Number(storedLevel));
    }
  }, []);

  const notes = useMemo(() => {
    return NOTE_CHARACTERISITCS.map(([x, y, angle], i) => (
        <Note
          key={i}
          x={x}
          y={y}
          angle={angle}
        ></Note>
    ));
  }, []);

  const noteLetters = useMemo(() => {
    return NOTE_LETTER_CHARACTERISTICS.map(([x, y, angle, letter], i) => (
        <text key={i} transform={`translate(${x} ${y}) rotate(${angle})`} className="note-text">
            {letter}
        </text>));
  }, []);

  const handleCloseOverlay = () => {
    localStorage.setItem("firstTime", "false");
    setActiveLevel(null);
  };

  return (
    <main className="relative h-screen w-screen overflow-x-hidden flex items-center justify-center bg-[var(--background)]">
      <div className="relative h-screen flex items-center justify-center">
        <svg
          viewBox="0 0 1440 810"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full z-10"
        >
          <path
            d={PATH1}
            stroke="black"
            strokeWidth="8"
            fill="none"
          />
          <path
            d={PATH2}
            stroke="black"
            strokeWidth="8"
            fill="none"
          />
          {notes}
          {noteLetters}
          {circleLevels}
          <EndFlag
            x={1200}
            y={370}
            up={currentLevel >= 3}
            map={1}
            maskId={1}
          ></EndFlag>
          {(activeLevel !== null) && (
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="transparent"
              onClick={handleCloseOverlay}
            ></rect>
          )}
          {activeLevel !== null && (
            <LevelFlag
              x={LEVELS[activeLevel].flagX}
              y={LEVELS[activeLevel].flagY}
              color={"primary"}
              text={LEVELS[activeLevel].text}
              buttonText={LEVELS[activeLevel].buttonText}
              buttonCallback={handlers.buttonCallbackName[activeLevel]}
              direction={LEVELS[activeLevel].flagDirection}
          ></LevelFlag>
          )}
        </svg>
        <div className="absolute left-0 top-0 right-0 flex flex-row flex-wrap items-center justify-center lg:justify-between p-6 md:p-10 lg:p-12 z-20 gap-y-4">
          <div className="flex-none w-full lg:w-auto flex justify-center order-first lg:order-2">
            <Text 
              text="Music Alphabet"
              color="surface"
              heading="heading"
            />
          </div>
          <div className="flex-1 flex justify-start order-2 lg:order-1">
            <Button
              label="Instructions"
              color="secondary"
              onClick={handleInstructions}
            ></Button>
          </div>
          <div className="flex-1 flex justify-end order-3 lg:order-3">
            <Button
              label="Exit"
              color="danger"
              onClick={handleExit}
            ></Button>
          </div>
        </div>
      </div>
      {instructionOverlay && (
        <Overlay
          color="surface"
          texts={FIRST_OVERLAY_TEXTS}
          children={steps}
          handleClose={handleClose}
          handleSkip={handleSkip}
          variant="presentation-instructions"
        ></Overlay>
      )}
      {finalOverlay && (
        <Overlay
          color="surface"
          texts={FINAL_OVERLAY_TEXTS}
          children={steps}
          handleClose={handleClose}
          handleSkip={handleSkip}
          variant="presentation-instructions"
        ></Overlay>
      )}
    </main>
  );
}
