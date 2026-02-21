import { EndFlagProps } from "../types";
import { useId } from "react";

const FLAG_PATH = "M 15 20 L 165 20 L 115 60 L 165 100 L 15 100 Z"

export function EndFlag({x, y, up, map}: EndFlagProps) {
    const rawId = useId();
    const maskId = rawId.replace(/:/g, "");
    return (
        <g transform={`translate(${x} ${y})`} className="pointer-events-none">
            <defs>
                <mask id={maskId}>
                    <rect width="100%" height="100%" fill="white"></rect>
                    <ellipse
                        cx={70}
                        cy={60}
                        rx={10}
                        ry={14}
                        fill="black"
                    ></ellipse>
                </mask>
            </defs>
            <rect x={0} y={0} width={20} height={200} fill="var(--brown)" />
            <circle cx={10} cy={0} r={18} fill={up ? "var(--yellow)" : "var(--disabled)"} />
            {up && (
                <path d={FLAG_PATH} fill="var(--surface)"/>
            )}
            {map === 1 && up &&
                <ellipse
                    cx={70}
                    cy={60}
                    rx={23}
                    ry={17}
                    fill="var(--note)"
                    mask={`url(#${maskId})`}
                ></ellipse>
            }
        </g>
    );
}