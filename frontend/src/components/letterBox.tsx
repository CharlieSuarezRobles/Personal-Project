
import { LetterBoxProps } from "../types";

export function LetterBox({color, width, height, noteLetter}: LetterBoxProps) {


    return (
        <div className={
            `flex items-center justify-center w-[8%] h-[8%]
            ${color}
            ${width}
            ${height}
            `
        }   
        >
            <p className="text-center note-text">
                {noteLetter}
            </p>
        </div>
    );
}