"use client";

import { useRouter } from "next/navigation";

import { Button } from "../components/buttons/primary buttons/startButton";
import { useState, useEffect } from "react";

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


  const handleContinued = () => {
    //set the first time in local storage to false
    localStorage.setItem("firstTime", "false");
    //go to the next screen
    router.push("/maps/1");
  }

  //Order in which tailwind classes are coded:
  //max-[#px]
  //special options
  //min-w-screen, min-h-screen, min-width, min-height, max-width, max-height,
  //height-fit, width-fit, height-full, width-full, height, width,
  //flex-properties (flex-direction, align-items, justify-content, shrinking), 
  //grid-properties (grid-cols-#) gap, padding (px, py), margin (m-[#px], mt-[#px], mr-[#px], mb-[#px], ml-[#px]) border radius, 
  //text-width, text-height, font-family, font-weight, font-size, text-alignment, font-color, 
  //background-color, extra-classes

  return (
    <main className="overflow-hidden h-screen w-full bg-[var(--background)]">
      {/* Title on menu screen */}
      <div className="h-full w-full flex flex-col items-center justify-center gap-8 px-6 py-6">
        {!hasPressedStart && 
          <div className="text-center">
            <h1 className="title">MusicPTN</h1>
            <p className="body">Pitch To Note</p>
          </div>
        }

      {/* Title on menu screen - first time */}
        {hasPressedStart && firstTime === true && 
          <div className= "flex items-center justify-center p-3 rounded-[30px] bg-[var(--surface)]">
            <p  className="text-center heading">
              Welcome for the first time
            </p>
          </div>
        }

        {/* Description box on menu screen*/}
        {!hasPressedStart &&
          <div className="flex items-center justify-center p-6 md:p-10 lg:p-12 rounded-[30px] bg-[var(--surface)]">
          <p className="max-w-[895px] text-center body">
            Welcome to Music PTN. In this game, you will learn the most basic music
            concepts that you will need to know to be able to read music notation.
          </p>
        </div>
        }
        {/* Description box on menu screen - first time */}
        {hasPressedStart && firstTime == true &&
          <div className="flex items-center justify-center p-6 md:p-10 lg:p-12 rounded-[30px] bg-[var(--surface)]">
            <p className="max-w-[1200px] text-center body">
              This game is composed of a map which contains all the levels needed to learn
              the most fundamental music concept to read music notation, the music alphabet.
              This music concept is composed of 2 levels, each helping you practice the music
              alphabet in different ways.
            </p>
          </div>
        }

        {/* Buttons on menu screen*/}
        {!hasPressedStart &&
          <div className="w-full grid grid-cols-3">

            <div></div>

            <div className="flex align-center justify-center">
              <Button
              label="Start"
              color="primary"
              onClick={handleStart}
              variant="default"
              className="max-w-[167px] w-fit max-h-[108px] flex items-center justify-center p-6 md:p-10 lg:p-12 rounded-[30px] label"
              />
            </div>
        
            <div className="flex items-center justify-start">
              <Button
              label="Delete progress"
              color="danger"
              onClick={handleDelete}
              variant="default"
              className="max-w-[400px] w-fit max-h-[68px] flex items-center justify-center py-3 px-3 rounded-[30px] small-label"
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
              onClick={handleContinued}
              variant="default"
              className="max-w-[400px] w-fit max-h-[68px] flex items-center justify-center p-6 md:p-10 lg:p-12 rounded-[30px] label"
            />
            </div>
            <div></div>
          </div>
        }
        {/* overlay */}
        {overlay &&
          <div className="absolute flex flex-col items-center justify-center gap-14 h-screen w-screen bg-black/50">
            <div className="max-w-[800px] max-h-[160px] flex items-center justify-content p-6 md:p-10 lg:p-12 rounded-[30px] bg-[var(--error-or-danger)] body">
              <p className="text-center body">
                Are you sure that you want to delete the game? All progress will be gone
              </p>
            </div>
            <div className="w-full flex items-center justify-center gap-30">
              <Button
              label="No"
              color="primary"
              onClick={handleNo}
              variant="default"
              className="max-w-[134px] w-fit max-h-[108px] flex items-center justify-center p-6 md:p-10 lg:p-12 rounded-[30px] label"
              ></Button>
              <Button
              label="Yes"
              color="danger"
              onClick={handleYes}
              variant="default"
              className="max-w-[134px] w-fit max-h-[108px] flex items-center justify-center p-6 md:p-10 lg:p-12 rounded-[30px] label"
              ></Button>
            </div>
          </div>
        }
        {deletedOverlay &&
          <div className="absolute flex flex-col items-center justify-center gap-14 h-screen w-screen bg-black/50">
            <div className="max-w-[800px] max-h-[160px] flex items-center justify-content p-6 md:p-10 lg:p-12 rounded-[30px] bg-[var(--error-or-danger)] body">
              <p className="text-center title">
                Deleted
              </p>
            </div>
          </div>
        }

      </div>
    </main>
  );
}
