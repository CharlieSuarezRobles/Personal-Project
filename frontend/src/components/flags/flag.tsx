
import { Button } from "../buttons/primary buttons/startButton";
import { FlagProps } from "../../types"



export function Flag({text, handleStart, direction}: FlagProps) {
    return (
        <div className="relative inline-block">
            {direction === "right" &&
                <div className="absolute right-0 top-0 h-full w-[28px] rounded-[30px] rounded-tl-none bg-[var(--accent)] z-0" />
            }
            {direction === "left" &&
                <div className="absolute left-0 top-0 h-full w-[28px] rounded-[30px] rounded-tr-none bg-[var(--accent)] z-0" />
            }

            <div className="relative flex items-center justify-center p:1 md:p-2 lg:p-3 rounded-[30px] bg-[var(--accent)] z-10">
                <p className="text-center whitespace-pre-line small-body">
                    {text.replace(/\\n/g, "\n")}
                </p>
            </div>

            <div className="relative flex items-center justify-center mt-4 z-10">
                <Button
                label="Start"
                color="primary"
                onClick={handleStart}
                variant="default"
                className="w-fit max-w-[137px] max-h-[78px] flex items-center justify-center p-6 md:p-10 lg:p-12 rounded-[30px] label"
                ></Button>
            </div>
        </div>
    );
}