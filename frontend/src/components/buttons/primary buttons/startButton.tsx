type ButtonProps = {
    label: string;
    onClick?: () => void;
    color?: ColorVariant;
    className?: string;
}

type ColorVariant = "primary" | "secondary" | "danger" | "note" | "disabled" | "yellow";

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

// Properties of a button
// Width, height, justify-content, align-items, gap, padding, border-radius, background-color,
// font-family, font-size, font-weight, 

export function Button({label, onClick, color = "danger", className}: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`
                min-w-[50px]
                min-h-[50px]
                flex
                justify-center
                items-center
                gap-[10px]
                px-[10px]
                py-[10px]
                rounded-[30px]
                ${colors[color]}
                text-[40px]
                font-bold
                ${className ?? ""}`}
        >
            {label}
        </button>
    );
}