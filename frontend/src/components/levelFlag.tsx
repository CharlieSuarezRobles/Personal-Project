import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { LevelFlagProps, SVGColors } from "../types";

export function LevelFlag({
    x,
    y, 
    color, 
    text, 
    buttonText, 
    buttonCallback, 
    direction,
}: LevelFlagProps) {
    const PADDING = 30;

    const lines = text.split("\n");
    const textRef = useRef<SVGTextElement | null>(null);
    const [bbox, setBbox] = useState<{ x: number; y: number; w: number; h: number }>({
        x: 0, y: 0, w: 0, h: 0
    });

    useLayoutEffect(() => {
        if (!textRef.current) return;
        const b = textRef.current.getBBox();
        setBbox({ x: b.x, y: b.y, w: b.width, h: b.height });
    }, [text]);

    const [hovered, setHovered] = useState<Boolean>(false);
    const [down, setDown] = useState<Boolean>(false);

    const xButtonBackground = direction === "right" ? bbox.w / 2 : bbox.w / 2 - 260;

    return (
    <g transform={`translate(${x} ${y})`}>
        {/* pole (downwards) */}
        <rect x={0} y={10} width={30} height={200} rx={15} fill={"var(--accent)"} />




        <g transform={`translate(${xButtonBackground} ${0})`}>
            {/* button background square */}
            <g 
                onMouseEnter={() => setHovered(true)}
                onMouseDown={() => setDown(true)}
                onMouseUp={() => setDown(false)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => buttonCallback()}
                role="button"
                tabIndex={0}
                style={{cursor: "cursor"}}>
                <rect 
                    x={-30}
                    y={105}
                    width={150}
                    height={100}
                    rx={30}
                    fill={down ? SVGColors[color].active : hovered ? SVGColors[color].hover : SVGColors[color].unactive}
                />
                <text x={0} y={168} className="label">
                    {buttonText}
                </text>
            </g>
            {/* pill */}
            <rect 
            x={bbox.x - PADDING}
            y={bbox.y - PADDING}
            width={bbox.w + PADDING * 2}
            height={bbox.h + PADDING * 2}
            fill="var(--accent)"
            rx={30}
            />
            {/* text */}
            <text ref={textRef} x={PADDING} y={PADDING} textAnchor="middle" className="small-body">
                {lines.map((line, i) => (
                    <tspan
                        key={i}
                        x={PADDING}
                        dy={i === 0 ? "0em" : "1.2em"}
                    >
                        {line}
                    </tspan>
                ))}
            </text>
        </g>
    </g>
    );
}