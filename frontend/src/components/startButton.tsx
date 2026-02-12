import { ColorVariant, ShapeVariant, colors } from "../types";
import { ButtonProps } from "../types"




const variants: Record<ShapeVariant, string> = {
    default: "min-w-[50px] min-h-[50px] px-[10px] py-[10px] rounded-[30px]",
    circle: "min-w-[10px] min-h-[10px] rounded-full p-0",
    square: "min-w-[10px] min-h-[10px] rounded-[20px]",
}


// inside your Button component file
const sizeClasses = "w-fit min-w-[80px] flex items-center justify-center rounded-[30px]";

// Responsive padding: p-4 (phone), md:p-8 (tablet), lg:p-12 (desktop)
const paddingClasses = "p-3 md:p-5 lg:p-7"; 

// Font utilities you created
const fontClasses = "phone-label md:tablet-label lg:label";

export function Button({label, onClick, color = "primary", variant}: ButtonProps) {
  return (
    <button
      onClick={color === "disabled" ? undefined : onClick}
      disabled={color === "disabled"}
      className={`
        ${colors[color]}
        ${variants[variant]}
        ${sizeClasses}
        ${paddingClasses}
        ${fontClasses}
      `}
    >
      {label}
    </button>
  );
}