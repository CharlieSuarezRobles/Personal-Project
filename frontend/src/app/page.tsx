"use client";

import { useRouter } from "next/navigation";

import { Button } from "../components/startButton";
import { useState, useEffect } from "react";
import { Text } from "../components/text";
import { useGameManager } from "../hooks/useGameManager";

type OverlayMode = "NONE" | "CONFIRM_DELETE" | "DELETED";

export default function Home() {
  const router = useRouter();
  const useGame = useGameManager();

  const [overlayMode, setOverlayMode] = useState<OverlayMode>("NONE");

  const [hasPressedStart, setHasPressedStart] = useState<boolean>(false);

  const handleStart = () => {
    useGame.startGame();
    setHasPressedStart(true);
  }
  const handleDelete = () => {
    setOverlayMode("CONFIRM_DELETE");
  };
  const handleYes = () => {
    useGame.resetProgress();
    setOverlayMode("DELETED");
  }
  const handleNo = () => {
    setOverlayMode("NONE");
  }
  const handleContinue = () => {
    useGame.completeIntroduction();
  }

  useEffect(() => {
    if (overlayMode === "NONE") return;
    if (overlayMode === "CONFIRM_DELETE") return;

    const timer = setTimeout(() => {
      setOverlayMode("NONE");
    }, 2000);
    return () => clearTimeout(timer);
  }, [overlayMode])

  return (
    <main className="overflow-x-hidden h-screen w-full lg:bg-[var(--background)]">
      <div className="h-full w-full items-center justify-center grid grid-rows-3 gap-8 p-2 md:p-6 lg:p-12">

        {!hasPressedStart &&
          <>
            <div className="text-center">
              <h1 className="phone-title md:tablet-title lg:title">MusicPTN</h1>
              <p className="phone-instructions-body md:tablet-instructions-body lg:instructions-body">Pitch To Note</p>
            </div>
            <Text
              text="Welcome to Music PTN. In this game, you will learn the most basic music
              concepts that you will need to know to be able to read music notation."
              color="surface"
              heading="instructions"
            />
            <div className="w-full grid grid-cols-3">

              <div></div>

              <div className="flex align-center justify-center">
                <Button
                label="Start Game"
                color="primary"
                onClick={handleStart}
                variant="default"
                />
              </div>
          
              <div className="flex items-center justify-start">
                <Button
                label="Delete progress"
                color="danger"
                onClick={handleDelete}
                variant="default"
                />
              </div>
            </div>
          </>
        }
        {hasPressedStart && useGame.isFirstTime === true &&
          <>
            <div className="flex flex-row items-center justify-center">
              <Text
                text="Welcome for the first time!"
                color="surface"
                heading="instructions"
              />
            </div>
            <Text 
              text="This game is composed of a map which contains all the levels needed to learn
                    the most fundamental music concept to read music notation, the music alphabet.
                    This music concept is composed of 2 levels, each helping you practice the music
                    alphabet in different ways."
              color="surface"
              heading="instructions"/>
            <div className="flex items-center justify-center">
              <Button
              label="Continue"
              color="primary"
              onClick={handleContinue}
              variant="default"
            />
            </div>
          </>
        }
        {overlayMode === "CONFIRM_DELETE" &&
          <div className="absolute flex flex-col items-center justify-center gap-14 inset-0 bg-black/50">
            <Text
              text="Are you sure that you want to delete the game? All progress will be gone"
              color="danger"
              heading="instructions"
            />
            <div className="w-full flex items-center justify-center gap-[120px]">
              <Button
              label="No"
              color="primary"
              onClick={handleNo}
              variant="default"
              ></Button>
              <Button
              label="Yes"
              color="danger"
              onClick={handleYes}
              variant="default"
              ></Button>
            </div>
          </div>
        }
        {overlayMode === "DELETED" &&
          <div className="absolute flex flex-col items-center justify-center h-screen w-screen inset-0 bg-black/50">
            <Text
              text="Deleted"
              color="danger"
              heading="heading"
            />
          </div>
        }
      </div>
    </main>
  );
}
