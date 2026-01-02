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
  const handleDelete = () => {
    //Setting firstTime to true is the same as deleting it as in either case, the start button
    //behaves as if it's the user's first time going into the website
    localStorage.setItem("firstTime", "true");
  };


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
      {/* Title */}
      <div className="h-full w-full flex flex-col items-center justify-center gap-8 px-6 py-6">
        {!hasPressedStart && 
          <div className="text-center">
            <h1 className="title">MusicPTN</h1>
            <p className="body">Pitch To Note</p>
          </div>
        }

        {hasPressedStart && firstTime === true && 
          <div className= "flex items-center justify-center p-3 rounded-[30px] bg-[var(--surface)]">
            <p  className="text-center heading">
              Welcome for the first time
            </p>
          </div>
        }

        {/* Description box */}
        {!hasPressedStart &&
          <div className="flex items-center justify-center p-6 md:p-10 lg:p-12 rounded-[30px] bg-[var(--surface)]">
          <p className="max-w-[895px] text-center body">
            Welcome to Music PTN. In this game, you will learn the most basic music
            concepts that you will need to know to be able to read music notation.
          </p>
        </div>
        }
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

        {/* Buttons */}
        {!hasPressedStart &&
          <div className="w-full grid grid-cols-3">

            <div></div>

            <div className="flex align-center justify-center">
              <Button
              label="Start"
              color="primary"
              onClick={handleStart}
              className="max-w-[167px] w-fit max-h-[108px] flex items-center justify-center p-6 md:p-10 lg:p-12 rounded-[30px] label"
              />
            </div>
        
            <div className="flex items-center justify-start">
              <Button
              label="Delete progress"
              color="danger"
              onClick={handleDelete}
              className="max-w-[400px] w-fit max-h-[68px] flex items-center justify-center py-3 px-3 rounded-[30px] small-label"
            />
            </div>
          </div>
        }

        {hasPressedStart && firstTime === true &&
          <div className="w-full grid grid-cols-3">

            <div></div>
        
            <div className="flex items-center justify-center">
              <Button
              label="Continue"
              color="primary"
              onClick={handleContinued}
              className="max-w-[400px] w-fit max-h-[68px] flex items-center justify-center p-6 md:p-10 lg:p-12 rounded-[30px] label"
            />
            </div>
            <div></div>
          </div>
        }
          
      </div>
    </main>
  );
}
