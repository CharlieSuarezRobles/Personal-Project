"use client";

import Image from "next/image";

import { Button } from "../components/buttons/primary buttons/startButton";

export default function Home() {
  const handleStart = () => {
    console.log("Start");
  };

  const handleDelete = () => {
    console.log("Delete progress");
  };

  //Order in which tailwind classes are coded:
  //max-[#px]
  //min-w-screen, min-h-screen, min-width, min-height, max-width, max-height,
  //height-fit, width-fit, height-full, width-full, height, width,
  //flex-properties (flex-direction, align-items, justify-content), 
  //grid-properties (grid-cols-#) gap, padding (px, py), margin (m-[#px], mt-[#px], mr-[#px], mb-[#px], ml-[#px]) border radius, 
  //text-width, text-height, font-family, font-weight, font-size, text-alignment, font-color, 
  //background-color, extra-classes

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[var(--background)]">
      {/* Title */}
      <div className="text-center">
        <h1 className="title">MusicPTN</h1>
        <p className="body">Pitch To Note</p>
      </div>

      {/* Description box */}
      <div className="mt-10 w-[995px] h-[244px] flex items-center justify-center px-[50px] py-[50px] rounded-[30px] text-center bg-[var(--surface)]">
        <p className="max-w-[895px] body">
          Welcome to Music PTN. In this game, you will learn the most basic music
          concepts that you will need to know to be able to read music notation.
        </p>
      </div>

      {/* Buttons */}
      <div className="max-[900px] w-full mt-14 items-center grid grid-cols-3">
        <div/>

        <div className="flex justify-center">
          <Button
          label="Start"
          color="primary"
          onClick={handleStart}
          className="min-w-[167px] min-h-[108px] w-fit flex items-center justify-center px-[40px] py-[30px] rounded-[30px] label"
        />
        </div>
        
        <div className="flex justify-end m-[100px]">
          <Button
          label="Delete progress"
          color="danger"
          onClick={handleDelete}
          className="min-w-[301px] min-h-[68px] w-fit flex items-center justify-center px-[10px] py-[10px] rounded-[30px] label"
        />
        </div>
      </div>
    </main>
  );
}
