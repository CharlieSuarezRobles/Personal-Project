import { useState, useEffect, ReactNode } from "react";

import { Button } from "./startButton";
import { Text } from "./text";
import { ColorVariant } from "@/types";
import { twMerge } from "tailwind-merge";

interface OverlayProps {
  color: ColorVariant;
  texts: string[];
  children: ReactNode[];
  handleClose: () => void;
  handleSkip: () => void;
  variant: "presentation-instructions" | "level-instructions";
};

const PADDING_CLASSES = "p-3 md:p-5 lg:p-7";

const FONT_CLASSES = "phone-instructions-body md:tablet-instructions-body lg:instructions-body";

const BASE_CLASSES = "inset-0 flex flex-1 flex-col items-center justify-center z-50";

const CONTENT_CLASSES = "min-h-0 w-full flex flex-1 items-center justify-center";

const LOWER_DIV_CLASSES = "mt-auto bottom-0 w-full flex items-center justify-between flex-end p-6";

export function Overlay({ color, texts, children, handleClose, handleSkip, variant }: OverlayProps) {

  const [overlayNum, setOverlayNum] = useState<number>(0);
  const isFirst = overlayNum === 0;
  const isLast = overlayNum === texts.length - 1;
  const maxNumberOfOverlays = texts.length;
  const currentText = texts[overlayNum];
  const currentChild = children[overlayNum];
  const screenSizeClasses = variant === "presentation-instructions" ? "fixed inset-0 bg-black/50" : "w-full";

  const outerContainerClasses = twMerge(
    FONT_CLASSES,
    PADDING_CLASSES,
    BASE_CLASSES,
    screenSizeClasses,
  );

  const handleBack = () => setOverlayNum((prev) => Math.max(prev - 1, 0));
  const handleContinue = () => setOverlayNum((prev) => Math.min(prev + 1, maxNumberOfOverlays - 1));

  let leftButton = <div/>;

  if (isFirst) {
    if (variant === "presentation-instructions") leftButton = <Button label="Skip" color="secondary" onClick={handleSkip} />;
  } else {
    leftButton = <Button label="Back" color="secondary" onClick={handleBack} />;
  }
  
  let rightButton = <div/>;
  
  if (isLast) {
    rightButton = <Button label="Close" color="primary" onClick={handleClose} />;
  } else {
    rightButton = <Button label="Continue" color="primary" onClick={handleContinue} />;
  }

  return (
    <div className={outerContainerClasses}>
        <Text 
          text={currentText}
          color={color}
          heading="instructions"
        />
        <div className={CONTENT_CLASSES}>
            {currentChild}
        </div>
        <div className={LOWER_DIV_CLASSES}>
          {leftButton}
          {rightButton}
        </div>
    </div>);
}