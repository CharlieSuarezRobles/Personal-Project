import { ColorVariant, ShapeVariant } from "../../../types";

type ButtonProps = {
    label: string;
    onClick?: () => void;
    color?: ColorVariant;
    variant: ShapeVariant;
    className?: string;
}


const colors: Record<ColorVariant, string> = {
    primary: `
        bg-[var(--action-primary)]
        hover:bg-[var(--action-primary-hover)]
        active:bg-[var(--action-primary-active)]
    `,
    secondary: `
        bg-[var(--action-secondary)]
        hover:bg-[var(--action-secondary-hover)]
        active:bg-[var(--action-secondary-active)]
    `,
    danger: `
        bg-[var(--error-or-danger)]
        hover:bg-[var(--error-or-danger-hover)]
        active:bg-[var(--error-or-danger-active)]
    `,
    note: `
        bg-[var(--note)]
        hover:bg-[(var(--note-hover)]
        active:bg-[var(--note-active)]
    `,
    disabled: `
        bg-[var(--disabled)]
    `,
    yellow: `
        bg-[var(--yellow)]
        hover:bg-[var(--yellow-hover)]
        active:bg-[var(--yellow-active)]
    `
};

const variants: Record<ShapeVariant, string> = {
    default: "min-w-[50px] min-h-[50px] px-[10px] py-[10px] rounded-[30px]",
    circle: "min-w-[100px] min-h-[100px] rounded-full p-0",
    square: "min-w-[100px] min-h-[100px] rounded-[20px]",
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