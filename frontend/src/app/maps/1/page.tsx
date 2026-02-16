"use client";
import { useRouter } from "next/navigation";
import { ColorVariant } from "../../../types";
import { useState, useEffect } from "react";
import { Button } from "../../../components/startButton";
import { Overlay } from "../../../components/overlay";
import { Flag } from "../../../components/flag";
import { CircleButton } from "../../../components/circleButton";
import { EndFlag } from "../../../components/endFlag";
import { LevelFlag } from "../../../components/levelFlag";
import { Note } from "../../../components/note";
import { Text } from "../../../components/text";

export default function Map1() {
  const router = useRouter();

  const steps = [
    <></>,
    <></>,
    <img
      src="/learning-path-sample.png"
      className="max-h-full max-w-full object-contain"
    />,
    <></>,
    <></>,
    <></>,
  ];

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

  const [instructionOverlay, setInstructionOverlay] = useState<Boolean>(false);

  useEffect(() => {
    const firstTime = localStorage.getItem("firstTime");
    if (firstTime === "true") {
      setInstructionOverlay(true);
    }
  }, []);

  const handleInstructions = () => {
    setInstructionOverlay(true);
  };

  const handleExit = () => {
    router.push("/");
  };

  // State of the learning path
  const [currentLevel, setCurrentLevel] = useState<number>(1);

  useEffect(() => {
    const storedLevel = localStorage.getItem("currentLevel");
    if (storedLevel === null) {
      localStorage.setItem("currentLevel", "1");
    } else {
      setCurrentLevel(Number(storedLevel));
    }
  }, []);

  // Button 1 logic

  const [level1, setLevel1] = useState<Boolean>(false);

  const handleLevel1 = () => {
    setLevel1(true);
  };

  const handleStartLevel1 = () => {
    router.push("/maps/1/levels/1");
  };

  // Button 2 logic
  const level2Color: Record<number, ColorVariant> = {
    1: "disabled",
    2: "yellow",
    3: "primary",
  };

  const [level2, setLevel2] = useState<Boolean>(false);

  const handleLevel2 = () => {
    setLevel2(true);
  };

  const handleStartLevel2 = () => {
    router.push("/maps/1/levels/2");
  };

  // Button 3 logic
  const level3Color: Record<number, ColorVariant> = {
    1: "disabled",
    2: "disabled",
    3: "primary",
  };

  const [finish, setFinish] = useState<Boolean>(false);

  const handleFinish = () => {
    setFinish(true);
  };

  const [finalOverlay, setFinalOverlay] = useState<Boolean>(false);

  const handleStartFinish = () => {
    setFinalOverlay(true);
  };

  const handleCloseOverlay = () => {
    localStorage.setItem("firstTime", "false");
    setLevel1(false);
    setLevel2(false);
    setFinish(false);
  };

  const [showFlagBackground, setShowFlagBackground] = useState<Boolean>(false);

  return (
    <main className="relative h-screen w-screen overflow-x-hidden flex items-center justify-center bg-[var(--background)]">
      <div className="relative h-screen flex items-center justify-center">

        <svg
          viewBox="0 0 1440 810"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full z-10"
        >
          <path
            d="M 273 568
               C 273 568 384 368 496  568
               C 496 568 608 768 720 568"
            stroke="black"
            strokeWidth="8"
            fill="none"
          />
          <path
            d="M 720 568
               C 720 568 842 368 964  568
               C 964 568 1086.5 768 1209 568"
            stroke="black"
            strokeWidth="8"
            fill="none"
          />
          <Note
            x={200}
            y={200}
            angle={-20}
            maskId={2}
          ></Note>
          <Note
            x={400}
            y={300}
            angle={20}
            maskId={3}
          ></Note>
          <Note
            x={650}
            y={200}
            angle={0}
            maskId={4}
          ></Note>
          <Note
            x={1100}
            y={680}
            angle={-40}
            maskId={5}
          ></Note>
          <Note
            x={1050}
            y={200}
            angle={40}
            maskId={6}
          ></Note>
          <Note
            x={850}
            y={650}
            angle={70}
            maskId={7}
          ></Note>
          <Note
            x={400}
            y={600}
            angle={-30}
            maskId={8}
          ></Note>
          <text x={100} y={330} transform={`rotate(${-30} ${200} ${200})`} className="note-text">
            A
          </text>
          <text x={500} y={350} transform={`rotate(${10} ${500} ${250})`} className="note-text">
            B
          </text>
          <text x={650} y={350} transform={`rotate(${0} ${650} ${350})`} className="note-text">
            C
          </text>
          <text x={900} y={350} transform={`rotate(${20} ${900} ${350})`} className="note-text">
            D
          </text>
          <text x={800} y={640} transform={`rotate(${25} ${800} ${640})`} className="note-text">
            E
          </text>
          <text x={1050} y={760} transform={`rotate(${-20} ${1050} ${760})`} className="note-text">
            F
          </text>
          <text x={300} y={720} transform={`rotate(${-20} ${300} ${720})`} className="note-text">
            G
          </text>
          <CircleButton
            onClick={() => handleLevel1()}
            color={currentLevel === 1 ? "yellow" : "primary"}
            x={273}
            y={568}
          ></CircleButton>
          <CircleButton
            onClick={currentLevel >= 2 ? () => handleLevel2() : undefined}
            color={level2Color[currentLevel]}
            x={720}
            y={568}
          ></CircleButton>
          <CircleButton
            onClick={currentLevel >= 3 ? () => handleFinish() : undefined}
            color={level3Color[currentLevel]}
            x={1209}
            y={568}
          ></CircleButton>

          <EndFlag
            x={1200}
            y={370}
            up={currentLevel >= 3}
            map={1}
            maskId={1}
          ></EndFlag>

          {(level1 || level2 || finish) && (
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="transparent"
              onClick={handleCloseOverlay}
            ></rect>
          )}

          {level1 ? (
            <LevelFlag
              x={258}
              y={370}
              color={"primary"}
              text={"LEVEL 1: \n Introducing the 7 notes"}
              buttonText={"Start"}
              buttonCallback={handleStartLevel1}
              direction="right"
            ></LevelFlag>
          ) : level2 ? (
            <LevelFlag
              x={708}
              y={370}
              color={"primary"}
              text={"LEVEL 2: \n Identifying the 7 notes"}
              buttonText={"Start"}
              buttonCallback={handleStartLevel2}
              direction="right"
            ></LevelFlag>
          ) : finish ? (
            <LevelFlag
              x={1195}
              y={370}
              color={"primary"}
              text={"End of music concept"}
              buttonText={"Start"}
              buttonCallback={handleStartFinish}
              direction="left"
            ></LevelFlag>
          ) : null}
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
          texts={[
            "In this screen, you can see three circles and a flagpole. Each reveal the progress you’ve made throughout the music concept.",
            "Each circle denotes a level exercise. Each exercise will help you learn the theory and practice the music concept.",
            "All the circles that have been completed will be turquoise, the one that you are currently on will be yellow, and the ones that are still locked, will be gray. This image shows an example of this.",
            "Once you’ve completed all music levels, you will see that the flag will pop up. That means that you’ve completed the game!",
            "You can come back to these instructions whenever you want by clicking the instructions button on the map which you will see once you finished with these instructions.",
            "Now, to begin, you can close window, take a look at the map, and begin clicking on the yellow circle to start the first level.",
          ]}
          children={steps}
          handleClose={handleClose}
          handleSkip={handleSkip}
          variant="presentation-instructions"
        ></Overlay>
      )}
      {finalOverlay && (
        <Overlay
          color="surface"
          texts={[
            "Congratulations! You've finished the entire game! Although you've gone through all the levels, you can still access them to keep practicing \
            and gain the ability to see a note on the staff and match it with its corresponding pitch.",
            "Thanks for visiting this website! — Charlie Suarez Robles",
          ]}
          children={steps}
          handleClose={handleClose}
          handleSkip={handleSkip}
          variant="presentation-instructions"
        ></Overlay>
      )}
    </main>
  );
}
