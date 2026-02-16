import { ColorVariant, colors } from "../types";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  color?: ColorVariant;
  className?: string;
}

const PADDING_CLASSES = "p-3 md:p-5 lg:p-7";

const FONT_CLASSES = "phone-label md:tablet-label lg:label";

const BASE_CLASSES = "w-fit min-w-[50px] min-h-[50px] flex items-center justify-center rounded-[30px]";

export function Button({ label, onClick, color = "primary", className } : ButtonProps) {
  const containerClasses = twMerge(
    BASE_CLASSES,
    colors[color],
    PADDING_CLASSES,
    FONT_CLASSES,
    className,
  )
  return (
    <button
      onClick={color === "disabled" ? undefined : onClick}
      disabled={color === "disabled"}
      className={containerClasses}
    >
      {label}
    </button>
  );
}