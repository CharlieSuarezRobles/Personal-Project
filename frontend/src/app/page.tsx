"use client";

import { useRouter } from "next/navigation";

import { Button } from "../components/startButton";
import { useState, useEffect } from "react";
import { Text } from "../components/text";

export default function Home() {
  const router = useRouter();

  // Start button logic
  const [hasPressedStart, setHasPressedStart] = useState<Boolean>(false);
  const [firstTime, setFirstTime] = useState<Boolean | null>(null);

    
  const handleStart = () => {
    setHasPressedStart(prev => true);
  }

  useEffect(() => {
    const loadedValue = localStorage.getItem("firstTime");
    
    if (loadedValue === null) {
      setFirstTime(true);
    } else {
      setFirstTime(loadedValue === "true");
    }

  }, []);

  useEffect(() => {
    if (!hasPressedStart) return;
    if (firstTime === null) return;

    if (firstTime === false) {
      //change to the map page
      router.push("/maps/1");
    }

  }, [hasPressedStart, firstTime]);


  // Delete button logic
  const [overlay, setOverlay] = useState<Boolean>(false);

  const handleDelete = () => {
    //Setting firstTime to true is the same as deleting it as in either case, the start button
    //behaves as if it's the user's first time going into the website
    setOverlay(true);
  };

  const[deletedOverlay, setDeletedOverlay] = useState<Boolean>(false);

  useEffect(() => {
    if (!deletedOverlay) return;

    const timer = setTimeout(() => {
      setDeletedOverlay(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [deletedOverlay])
  
  const handleYes = () => {
    localStorage.setItem("currentLevel", "1");
    localStorage.setItem("firstTime", "true");
    setFirstTime(true);
    setOverlay(false);
    setDeletedOverlay(true);
  }

  const handleNo = () => {
    setOverlay(false);
  }


  const handleContinue = () => {
    //set the first time in local storage to false
    //localStorage.setItem("firstTime", "false");
    //go to the next screen
    router.push("/maps/1");
  }


  return (
    <main className="overflow-x-hidden h-screen w-full lg:bg-[var(--background)]">
      {/* Title on menu screen */}
      <div className="h-full w-full items-center justify-center grid grid-rows-3 gap-8 p-2 md:p-6 lg:p-12">
        {!hasPressedStart && 
          <div className="text-center">
            <h1 className="phone-title md:tablet-title lg:title">MusicPTN</h1>
            <p className="phone-instructions-body md:tablet-instructions-body lg:instructions-body">Pitch To Note</p>
          </div>
        }

        {/* Title on menu screen - first time */}
          {hasPressedStart && firstTime === true && 
          <div className="flex flex-row items-center justify-center">
            <Text
              text="Welcome for the first time!"
              color="surface"
              heading="instructions"
              />
          </div>
          }

        {/* Description box on menu screen*/}
        {!hasPressedStart &&
          <Text
            text="Welcome to Music PTN. In this game, you will learn the most basic music
            concepts that you will need to know to be able to read music notation."
            color="surface"
            heading="instructions"
          />
        }
        {/* Description box on menu screen - first time */}
        {hasPressedStart && firstTime == true &&
          <Text 
          text="This game is composed of a map which contains all the levels needed to learn
              the most fundamental music concept to read music notation, the music alphabet.
              This music concept is composed of 2 levels, each helping you practice the music
              alphabet in different ways."
          color="surface"
          heading="instructions"/>
        }

        {/* Buttons on menu screen*/}
        {!hasPressedStart &&
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
        }

        {/* buttons on menu screen - first time*/}
        {hasPressedStart && firstTime === true &&
          <div className="w-full grid grid-cols-3">

            <div></div>
        
            <div className="flex items-center justify-center">
              <Button
              label="Continue"
              color="primary"
              onClick={handleContinue}
              variant="default"
              className="max-w-[400px] w-fit max-h-[68px] flex items-center justify-center p-6 md:p-10 lg:p-12 rounded-[30px] label"
            />
            </div>
            <div></div>
          </div>
        }
        {/* overlay */}
        {overlay &&
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
        {deletedOverlay &&
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
