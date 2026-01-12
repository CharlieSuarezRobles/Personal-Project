import { BarProps, ColorVariant } from "../types";

export function Bar({color, numOfTotalParts, numOfCompletedParts}: BarProps) {    

    const pct = Math.min(1, Math.max((numOfCompletedParts / numOfTotalParts), 0));

    const colorMap : Record<ColorVariant, string> = {
        "primary": "var(--action-primary)",
        "secondary": "var(--action-secondary)",
        "danger": "var(--error-or-danger)",
        "note": "var(--note)",
        "disabled": "var(--disabled)",
        "yellow": "var(--yellow)",
        "strong-accent": "var(--strong-accent)"
    }

    return (
        <div className="h-[10vh] w-[60vw] rounded-[30px] bg-[var(--disabled)]">
            <div className={`h-[10vh] rounded-[30px]`}
                 style={{width: `${pct * 100}%`, backgroundColor: colorMap[color]}}
            ></div>
        </div>
    );
}