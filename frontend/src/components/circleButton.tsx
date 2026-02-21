import { useState } from "react";
import { SVGColors, ColorVariant } from "../types";

interface CircleButtonProps {
  onClick?: () => void,
  color: ColorVariant,
  x: number,
  y: number
}

export function CircleButton({onClick, color, x, y}: CircleButtonProps) {
    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);
    const isInteractive = Boolean(onClick);

    const fillColor = () => {
        if (!isInteractive) SVGColors[color].unactive;
        if (pressed) return SVGColors[color].active;
        if (hovered) return SVGColors[color].hover;
        return SVGColors[color].unactive;
    }

    return (
        <circle cx={x}
                cy={y}
                r="60" 
                fill={fillColor()} 
                style={{cursor: isInteractive ? "pointer" : "default"}}
                onMouseEnter={isInteractive ? () => setHovered(true) : undefined}
                onMouseDown={isInteractive? () => setPressed(true) : undefined}
                onMouseUp={isInteractive? () => setPressed(false) : undefined}
                onMouseLeave={isInteractive? () => { setHovered(false); setPressed(false) } : undefined}
                onClick={onClick}
        />
    );
}