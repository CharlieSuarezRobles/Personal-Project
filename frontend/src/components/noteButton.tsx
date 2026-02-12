import { useState } from "react";
import { NoteButtonProps, SVGColors } from "../types";

export function NoteButton({x, y, notesAboveMiddleLine, label, color, onClick, maskId, showNoteName, heightOfStaff} : NoteButtonProps) {
    const [hovered, setHovered] = useState<Boolean>(false);
    const [isDown, setDown] = useState<Boolean>(false);
    return (
    <>
        <defs>
            <mask id={maskId}>
            <rect width="100%" height="100%" fill="white"></rect>
                <ellipse
                    cx={x}
                    cy={y}
                    rx={10}
                    ry={14}
                    fill="black"
                ></ellipse>
            </mask>
        </defs>
        <g
            onMouseEnter={onClick ? () => setHovered(true) : undefined}
            onClick={onClick ? () => onClick(): undefined}
            onMouseDown={onClick ? () => setDown(true) : undefined}
            onMouseUp={onClick ? () => setDown(false) : undefined}
            onMouseLeave={onClick ? () => setHovered(false): undefined}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            style={{cursor: onClick ? "cursor" : "default"}}
            >
            <ellipse
                cx={x}
                cy={y}
                rx={23}
                ry={17}
                fill={isDown ? SVGColors[color].active : hovered ? SVGColors[color].hover : SVGColors[color].unactive}
                mask={`url(#${maskId})`}
            ></ellipse>
        </g>
        {notesAboveMiddleLine >= 6 &&
            <line x1={x - 30} y1={(heightOfStaff / 2) + (6 * 18)} x2={x + 30} y2={(heightOfStaff / 2) + (6 * 18)} stroke="black"></line>
        }
        {notesAboveMiddleLine <= -6 &&
            <line x1={x - 30} y1={(heightOfStaff / 2) + (-6 * 18)} x2={x + 30} y2={(heightOfStaff / 2) + (-6 * 18)} stroke="black"></line>
        }
        {notesAboveMiddleLine >= 8 &&
            <line x1={x - 30} y1={(heightOfStaff / 2) + (8 * 18)} x2={x + 30} y2={(heightOfStaff / 2) + (8 * 18)} stroke="black"></line>
        }
        {notesAboveMiddleLine <= -8 &&
            <line x1={x - 30} y1={(heightOfStaff / 2) + (-8 * 18)} x2={x + 30} y2={(heightOfStaff / 2) + (-8 * 18)} stroke="black"></line>
        }
        {notesAboveMiddleLine >= 10 &&
            <line x1={x - 30} y1={(heightOfStaff / 2) + (10 * 18)} x2={x + 30} y2={(heightOfStaff / 2) + (10 * 18)} stroke="black"></line>
        }
        {notesAboveMiddleLine <= -10 &&
            <line x1={x - 30} y1={(heightOfStaff / 2) + (-10 * 18)} x2={x + 30} y2={(heightOfStaff / 2) + (-10 * 18)} stroke="black"></line>
        }
        {showNoteName &&
            <text
                x={x}
                y={y + 50}
                className="label"
                textAnchor="middle"
            >
                {label}
            </text>
        }
    </>
    );
}