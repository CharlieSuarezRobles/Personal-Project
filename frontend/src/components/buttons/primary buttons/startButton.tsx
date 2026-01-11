import { ColorVariant, ShapeVariant, colors } from "../../../types";
import { ButtonProps } from "../../../types"




const variants: Record<ShapeVariant, string> = {
    default: "min-w-[50px] min-h-[50px] px-[10px] py-[10px] rounded-[30px]",
    circle: "min-w-[10px] min-h-[10px] rounded-full p-0",
    square: "min-w-[10px] min-h-[10px] rounded-[20px]",
}

// Properties of a button
// Width, height, justify-content, align-items, gap, padding, border-radius, background-color,
// font-family, font-size, font-weight, 

export function Button({label, onClick, color = "danger", variant, className}: ButtonProps) {
    return (
        <button
            onClick={color === "disabled" ? undefined : onClick}
            disabled={color === "disabled"}
            className={`
                flex items-center justify-center
                ${colors[color]}
                text-[40px]
                font-bold
                ${variants[variant]}
                ${className ?? ""}`}
        >
            {label}
        </button>
    );
}