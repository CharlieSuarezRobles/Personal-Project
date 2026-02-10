import { useState, useEffect, ReactNode } from "react";

import { Button } from "./startButton";
import { OverlayProps } from "../types";
import { Text } from "./text";

const paddingClasses = "p-3 md:p-5 lg:p-7";

export function Overlay({ color, texts, children, handleClose, handleSkip, variant }: OverlayProps) {
  const maxNumberOfOverlays = texts.length;
  const [overlayNum, setOverlayNum] = useState<number>(0);

  useEffect(() => {
    setOverlayNum(0);
  }, []);

  const handleBack = () => {
    //close the overlay
    setOverlayNum((prev) => Math.max(prev - 1, 0));
  };

  const handleContinue = () => {
    //continue to the next step
    setOverlayNum((prev) => Math.min(prev + 1, maxNumberOfOverlays - 1));
  };

  const [screenSize, setScreenSize] = useState<string>("");

  useEffect(() => {
    if (variant === "presentation-instructions") {
    setScreenSize("fixed inset-0 bg-black/50");
    } else {
      setScreenSize("w-full");
    }
  }, []);

  return (
    <>
      {overlayNum >= 0 && overlayNum < maxNumberOfOverlays && (
        <div className={`inset-0 flex flex-1 flex-col items-center justify-center z-50 ${paddingClasses} ${screenSize}`}>
          <Text 
            text={texts[Math.min(overlayNum, texts.length - 1)]}
            color={color}
            heading="instructions"
          />
          
          <div className="min-h-0 w-full flex flex-1 items-center justify-center">
              {children[overlayNum]}
          </div>
          {overlayNum === 0 && variant === "presentation-instructions" &&
            <div className="mt-auto bottom-0 w-full flex items-center justify-between flex-end p-6">
              <Button
                label="Skip"
                color="secondary"
                onClick={handleSkip}
                variant="default"
              ></Button>
              <Button
                label="Continue"
                color="primary"
                onClick={handleContinue}
                variant="default"
              ></Button>
            </div>
          }
          {overlayNum === 0 && variant === "level-instructions" &&
            <div className="mt-auto bottom-0 w-full flex items-center justify-end flex-end p-6">
              <></>
              <Button
                  label="Continue"
                  color="primary"
                  onClick={handleContinue}
                  variant="default"
                ></Button>
              </div>
          }
          {overlayNum >= 1 && overlayNum < maxNumberOfOverlays - 1 && (
            <div className="mt-auto fixed bottom-0 w-full flex flex-row items-center justify-between p-6 z-50">
              <Button
                label="Back"
                color="secondary"
                onClick={handleBack}
                variant="default"
              ></Button>
              <Button
                label="Continue"
                color="primary"
                onClick={handleContinue}
                variant="default"
              ></Button>
            </div>
          )}
          {overlayNum === maxNumberOfOverlays - 1 && (
            <div className="mt-auto fixed bottom-0 w-full flex items-center justify-between flex-1 p-6">
              <Button
                label="Back"
                color="secondary"
                onClick={handleBack}
                variant="default"
              ></Button>
              <Button
                label="Close"
                color="primary"
                onClick={handleClose}
                variant="default"
              ></Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
