import { useId, useMemo, useState } from "react";
import { SVGColors, ColorVariant } from "../types";

interface NoteButtonProps {
  x: number;
  y: number;
  linesAboveNote: number;
  label: string | null;
  color: ColorVariant;
  onClick?: () => void;
  heightOfStaff: number;
};

const LINE_CLASSES = "stroke-black stroke-[1.5px]";

export function NoteButton({x, y, linesAboveNote, label, color, onClick, heightOfStaff} : NoteButtonProps) {
    const [hovered, setHovered] = useState<Boolean>(false);
    const [isDown, setDown] = useState<Boolean>(false);
    const rawId = useId();
    const maskId = rawId.replace(/:/g, "");

    const ledgerLines = useMemo(() => {
        const lines = [];
        if (linesAboveNote > 0) {
            for (let i = 6; i <= linesAboveNote; i += 2) {
                lines.push(i);
            }
        } else {
            for (let i = -6; i >= linesAboveNote; i -= 2) {
                lines.push(i)
            }
        }
        return lines;
    }, [linesAboveNote])

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
            onMouseLeave={onClick ? () => { setHovered(false); setDown(false); }: undefined}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            style={{cursor: onClick ? "pointer" : "default"}}
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

        <g className={LINE_CLASSES}>
            {ledgerLines.map((i) => {
                return (
                    <line 
                        key={i}
                        x1={x - 30}
                        y1={(heightOfStaff / 2) + (i * 18)}
                        x2={x + 30}
                        y2={(heightOfStaff / 2) + (i * 18)}
                        stroke="black"
                    />
                );
             })}
        </g>
        {label &&
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