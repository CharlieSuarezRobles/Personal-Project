import { NoteProps } from "../types";

export function Note({x, y, angle, maskId}: NoteProps) {
    return (
    <g transform={`rotate(${angle} ${x} ${y}) translate(${x} ${y})`}>
        <defs>
            <mask id={`${maskId}`}>
            <rect width="100%" height="100%" fill="white"></rect>
                <ellipse
                    cx={40}
                    cy={40}
                    rx={15}
                    ry={21}
                    fill="var(--note)"
                ></ellipse>
            </mask>
        </defs>
        <g>
            <ellipse
                cx={40}
                cy={40}
                rx={34.5}
                ry={25.5}
                fill="var(--note)"
                mask={`url(#${maskId})`}
            ></ellipse>
        </g>
    </g>
    );
}