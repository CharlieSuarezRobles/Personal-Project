import { useId } from "react";

interface NoteProps {
    x: number;
    y: number;
    angle: number;
}

export function Note({x, y, angle}: NoteProps) {
    const rawId = useId();
    const maskId = rawId.replace(/:/g, "");
    return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
        <defs>
            <mask id={`${maskId}`}>
            <rect width="100" height="100" fill="white"></rect>
                <ellipse
                    cx="40"
                    cy="40"
                    rx="15"
                    ry="21"
                    fill="black"
                ></ellipse>
            </mask>
        </defs>
        <g>
            <ellipse
                cx="40"
                cy="40"
                rx="34.5"
                ry="25.5"
                fill="var(--note)"
                mask={`url(#${maskId})`}
            ></ellipse>
        </g>
    </g>
    );
}