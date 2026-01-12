import { useState } from "react";
import { SVGColors, CircleButtonProps } from "../../types";



export function CircleButton({onClick, color, x, y}: CircleButtonProps) {
    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);



    return (
        <circle cx={x}
                cy={y}
                r="60" 
                fill={pressed ? SVGColors[color].active : hovered ? SVGColors[color].hover : SVGColors[color].unactive} 
                style={{cursor: "pointer",pointerEvents: "auto"}}
                onMouseEnter={onClick? () => setHovered(true) : undefined}
                onMouseDown={onClick? () => setPressed(true) : undefined}
                onMouseUp={onClick? () => setPressed(false) : undefined}
                onMouseLeave={onClick? () => setHovered(false) : undefined}
                onClick={onClick? () => onClick() : undefined} />
    );
}