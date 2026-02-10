import { ColorVariant } from "../types";
import { colors } from "../types";
import { HeadingClass } from "../types";

const paddingClasses = "p-3 md:p-5 lg:p-7";

const headingClasses = {
    "heading": "phone-heading md:tablet-heading lg:heading",
    "mini-heading": "phone-mini-heading md:tablet-mini-heading lg:mini-heading",
    "instructions": "phone-instructions-body md:tablet-instructions-body lg:instructions-body",
    "note": "phone-note-text md:tablet-note-text lg:note-text"
}

export function Text({ text, color, heading } : {text: string, color: ColorVariant, heading: HeadingClass}) {
    return (
        <>
        <div className={`flex items-center justify-center rounded-[30px] w-fit ${colors[color]} ${paddingClasses}`}>
            <p className={`max-w-[1200px] text-center ${headingClasses[heading]}`}>
              {text}
            </p>
        </div>
        </>
    );
}