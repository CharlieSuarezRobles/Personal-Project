import { twMerge } from "tailwind-merge";
import { BarProps, ColorVariant } from "../types";

const HEIGHT = "h-30px md:h-40px lg:h-50px";

const OUTER_DIV_PADDING_CLASSES = "p-1 md:p-2 lg:p-3";

const BASE_CLASES = "w-full rounded-[30px]";

const COLOR_MAP : Record<ColorVariant, string> = {
    "primary": "var(--action-primary)",
    "secondary": "var(--action-secondary)",
    "danger": "var(--error-or-danger)",
    "note": "var(--note)",
    "disabled": "var(--disabled)",
    "yellow": "var(--yellow)",
    "success": "var(--success)",
    "surface": "var(--surface)",
    "strong-accent": "var(--strong-accent)",
    "try-again": "var(--try-again)",
    "accent": "var(--accent)"
};

export function Bar({color, numOfTotalParts, numOfCompletedParts}: BarProps) {    

    const pct = Math.min(1, Math.max((numOfCompletedParts / numOfTotalParts), 0));
    const progressWidth = pct * 100;

    const outerContainerClasses = twMerge(
        HEIGHT,
        OUTER_DIV_PADDING_CLASSES,
        BASE_CLASES,
    )
    const innerContainerClasses = twMerge(
        HEIGHT,
        BASE_CLASES,
    )

    return (
        <div className={outerContainerClasses}>
        <svg 
        viewBox="0 0 100 10" 
        preserveAspectRatio="none" 
        className={innerContainerClasses}
        >
            <rect 
                x="0" y="0" 
                width="100" height="10" 
                fill="var(--disabled)" 
                rx="5"
            />
            <rect 
                x="0" y="0" 
                width={progressWidth} height="10" 
                fill={COLOR_MAP[color]} 
                rx="5"
                className="transition-all duration-300 ease-out"
            />
        </svg>
        </div>
    );
}