"use client";
import { useRouter } from "next/navigation";
//import { Button } from "../../../../components/buttons/primary buttons/startButton";
//import { useState, useEffect } from "react";
import { Button } from "../../../components/buttons/primary buttons/startButton";

export default function Map1() {

    const router = useRouter();

    const handleInstructions = () => {

    }

    const handleExit = () => {
        
    }

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
                        className="max-w-[233px] max-h-[68px] flex items-center justify-center px-3 py-3 rounded-[30px] label"
                        ></Button>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="flex items-center justify-center p-3 rounded-[30px] bg-[var(--surface)]">
                            <p className="text-center title">
                                Music Alphabet
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                        <Button
                        label="Exit"
                        color="danger"
                        onClick={handleExit}
                        className="max-w-[100px] max-h-[100px] flex items-center justify-center px-5 py-5 rounded-[30px] label"
                        ></Button>
                    </div>
                </div>
                
            </div>
        </main>
    );
}