import { useRef, useState, useLayoutEffect, useEffect, useMemo } from "react";
import { ColorVariant, Direction, SVGColors } from "../types";

interface LevelFlagProps {
  x: number,
  y: number,
  color: ColorVariant,
  text: string,
  buttonText: string,
  buttonCallback: () => void,
  direction: Direction,
}

export function LevelFlag({
    x,
    y, 
    color, 
    text, 
    buttonText, 
    buttonCallback, 
    direction,
}: LevelFlagProps) {
    const POLE_HEIGHT = 200;
    const POLE_WIDTH = 30;
    const PADDING = 30;

    const lines = useMemo(() => text.split("\n"), [text]);
    const textRef = useRef<SVGTextElement | null>(null);
    const [bbox, setBbox] = useState({ x: 0, y: 0, w: 0, h: 0 });
    const [hovered, setHovered] = useState<Boolean>(false);
    const [down, setDown] = useState<Boolean>(false);
    const xButtonBackground = direction === "right" ? bbox.w / 2 : -bbox.w / 2 - POLE_WIDTH;

    useLayoutEffect(() => {
        if (!textRef.current) return;
        const b = textRef.current.getBBox();
        setBbox({ x: b.x, y: b.y, w: b.width, h: b.height });
    }, [lines]);

    return (
    <g transform={`translate(${x} ${y})`}>
        <rect 
            x={0}
            y={10}
            width={POLE_WIDTH}
            height={POLE_HEIGHT}
            rx={15}
            fill={"var(--accent)"} />
        <g transform={`translate(${xButtonBackground} ${0})`}>
            <g 
                onMouseEnter={() => setHovered(true)}
                onMouseDown={() => setDown(true)}
                onMouseUp={() => setDown(false)}
                onMouseLeave={() => { setHovered(false); setDown(false); }}
                onClick={() => buttonCallback()}
                role="button"
                tabIndex={0}
                style={{cursor: "pointer"}}>
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
            <rect 
            x={bbox.x - PADDING}
            y={bbox.y - PADDING}
            width={bbox.w + PADDING * 2}
            height={bbox.h + PADDING * 2}
            fill="var(--accent)"
            rx={30}
            />
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