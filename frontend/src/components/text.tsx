import { ColorVariant } from "../types";
import { colors } from "../types";
import { HeadingClass } from "../types";
import { twMerge } from "tailwind-merge";

interface TextProps {
    text: string;
    color: ColorVariant;
    heading: HeadingClass;
    className?: string;
}

const PADDING_CLASSES = "p-3 md:p-5 lg:p-7";

const HEADING_MAP = {
    "heading": "phone-heading md:tablet-heading lg:heading",
    "mini-heading": "phone-mini-heading md:tablet-mini-heading lg:mini-heading",
    "instructions": "phone-instructions-body md:tablet-instructions-body lg:instructions-body",
    "note": "phone-note-text md:tablet-note-text lg:note-text"
}

export function Text({ text, color, heading, className } : TextProps) {

    const containerClasses = twMerge(
        "flex items-center justify-center rounded-[30px] w-fit",
        colors[color],
        PADDING_CLASSES,
        className,
    );

    return (
        <>
        <div className={containerClasses}>
            <p className={`max-w-[1200px] text-center ${HEADING_MAP[heading]}`}>
              {text}
            </p>
        </div>
        </>
    );
}