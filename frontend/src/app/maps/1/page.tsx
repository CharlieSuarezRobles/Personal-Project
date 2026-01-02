"use client";
import { useRouter } from "next/navigation";
import { ColorVariant } from "../../../types";
import { useState, useEffect } from "react";
import { Button } from "../../../components/buttons/primary buttons/startButton";
import { Overlay } from "../../../components/overlays/overlay";

export default function Map1() {

  const steps = [
    <></>,
    <></>,
    <></>,
    <img
        src="/learning-path-sample.png"
        className="max-h-full max-w-full object-contain"
    />,
    <></>,
    <></>,
    <></>
  ];

  const handleSkip = () => {
    setInstructionOverlay(false);
  }

  const handleClose = () => {
    setInstructionOverlay(false);
  }

  const router = useRouter();
  const [instructionOverlay, setInstructionOverlay] = useState<Boolean>(false);

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

  const handleLevel1 = () => {};

  // Button 2 logic
  const level2Color: Record<number, ColorVariant> = {
    1: "disabled",
    2: "yellow",
    3: "primary",
  };

  const handleLevel2 = () => {};

  // Button 3 logic
  const level3Color: Record<number, ColorVariant> = {
    1: "disabled",
    2: "disabled",
    3: "primary",
  };

  const handleFinish = () => {};

  return (
    <main className="relative h-screen w-screen overflow-hidden flex items-center justify-center bg-[var(--background)]">
      <div className="relative inline-block">
        <img
          src="/Game-Map1.png"
          className="max-h-screen max-w-screen object-contain"
        />
        <div className="absolute left-0 top-0 right-0 grid grid-cols-[1fr_auto_1fr] p-6 md:p-10 lg:p-12 z-10">
          <div className="flex justify-center items-center">
            <Button
              label="Instructions"
              color="secondary"
              onClick={handleInstructions}
              variant="default"
              className="max-w-[233px] max-h-[68px] flex items-center justify-center px-3 py-3 rounded-[30px] label"
            ></Button>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex items-center justify-center p-3 rounded-[30px] bg-[var(--surface)]">
              <p className="text-center title">Music Alphabet</p>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <Button
              label="Exit"
              color="danger"
              onClick={handleExit}
              variant="default"
              className="max-w-[100px] max-h-[100px] flex items-center justify-center px-5 py-5 rounded-[30px] label"
            ></Button>
          </div>
        </div>
        <div className="absolute inset-0 z-0">
          <Button
            label=""
            color={currentLevel === 1 ? "yellow" : "primary"}
            onClick={handleLevel1}
            variant="square"
            className="absolute max-w-[100px] max-h-[100px] left-[15%] top-[63%] rounded-[10px]"
          ></Button>
          <Button
            label=""
            color={level2Color[currentLevel] ?? "disabled"}
            onClick={handleLevel2}
            variant="circle"
            className="absolute left-[46%] top-[63%] max-w-[100px] max-h-[100px]"
          ></Button>
          <Button
            label=""
            color={level3Color[currentLevel] ?? "disabled"}
            onClick={handleFinish}
            variant="circle"
            className="absolute left-[80%] top-[63%] max-w-[100px] max-h-[100px]"
          ></Button>
        </div>
        <div className="flex flex-col items-center justify-center z-0">
          <div className=""></div>
        </div>
      </div>
      {instructionOverlay &&
        <Overlay
        upperBoxAttributes="bg-[var(--surface)]"
        texts={[
            "In this screen, you can see a square, two circles, and a flagpole. Each reveal the progress you’ve made throughout the music concept.",
            "Each square denotes a theory level. In it, you will be taught the music concept through explanations and animations.",
            "Each circle denotes a level exercise. Each exercise will help you practice the music concept learned in the theory level in different ways.",
            "All the circles that have been completed will be turquoise, the one that you are currently on will be yellow, and the ones that are still locked, will be gray. This image shows an example of this.",
            "Once you’ve completed all music levels, you will see that the flag will pop up. That means that you’ve completed the game!",
            "You can come back to these instructions whenever you want by clicking the instructions button on the map which you will see once you finished with these instructions.",
            "Now, to begin, you can close window, take a look at the map, and begin clicking on the square to start the first level."
        ]}
        children={steps}
        handleClose={handleClose}
        handleSkip={handleSkip}
        >
      </Overlay>
      }
    </main>
  );
}
