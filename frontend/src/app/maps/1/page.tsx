"use client";
import { useRouter } from "next/navigation";
import { ColorVariant } from "../../../types";
import { useState, useEffect } from "react";
import { Button } from "../../../components/buttons/primary buttons/startButton";

export default function Map1() {

    const router = useRouter();


    const handleInstructions = () => {

    }

    const handleExit = () => {
        router.push("/");
    }

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

    const handleLevel1 = () => {

    }

    // Button 2 logic
    const level2Color: Record<number, ColorVariant> = {
        1: "disabled",
        2: "yellow",
        3: "primary"
    }

    const handleLevel2 = () => {

    }

    // Button 3 logic
    const level3Color: Record<number, ColorVariant> = {
        1: "disabled",
        2: "disabled",
        3: "primary"
    }

    const handleFinish = () => {

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
                        variant="default"
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
            </div>
        </main>
    );
}