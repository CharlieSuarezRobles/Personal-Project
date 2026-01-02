import { useState, useEffect, ReactNode } from "react";

import { Button } from "../buttons/primary buttons/startButton";

type OverlayProps = {
  upperBoxAttributes: string;
  texts: string[];
  children: React.ReactNode[];
  handleClose: () => void;
  handleSkip: () => void;
};

export function Overlay({ upperBoxAttributes, texts, children, handleClose, handleSkip }: OverlayProps) {
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

  return (
    <>
      {overlayNum >= 0 && overlayNum < maxNumberOfOverlays && (
        <div className="fixed inset-0 flex flex-col items-center justify-center p-6 md:p-10 lg:p-12 bg-black/50 z-50">
          <div className={`flex items-center justify-content p-6 md:p-10 lg:p-12 rounded-[30px] ${upperBoxAttributes}`}>
            <p className="text-center body">
              {texts[Math.min(overlayNum, texts.length - 1)]}
            </p>
          </div>
          
          <div className="min-h-0 w-full flex items-center justify-center">
              {children[overlayNum]}
          </div>
          {overlayNum === 0 &&
            <div className="w-full flex items-center justify-between flex-1 p-10">
              <Button
                label="Skip"
                color="secondary"
                onClick={handleSkip}
                variant="default"
                className="max-w-[136px] max-h-[88px] flex items-center justify-center p-6 md:p-10 lg:p-12 rounded-[30px] label"
              ></Button>
              <Button
                label="Continue"
                color="primary"
                onClick={handleContinue}
                variant="default"
                className="max-w-[224px] max-h-[88px] flex items-center justify-center p-6 md:p-10 lg:p-12 rounded-[30px] label"
              ></Button>
            </div>
          }
          {overlayNum >= 1 && overlayNum < maxNumberOfOverlays - 1 && (
            <div className="w-full flex items-center justify-between flex-1 p-10">
              <Button
                label="Back"
                color="secondary"
                onClick={handleBack}
                variant="default"
                className="max-w-[136px] max-h-[88px] flex items-center justify-center p-6 md:p-10 lg:p-12 rounded-[30px] label"
              ></Button>
              <Button
                label="Continue"
                color="primary"
                onClick={handleContinue}
                variant="default"
                className="max-w-[224px] max-h-[88px] flex items-center justify-center p-6 md:p-10 lg:p-12 rounded-[30px] label"
              ></Button>
            </div>
          )}
          {overlayNum === maxNumberOfOverlays - 1 && (
            <div className="w-full flex items-center justify-between flex-1 p-10">
              <Button
                label="Back"
                color="secondary"
                onClick={handleBack}
                variant="default"
                className="max-w-[136px] max-h-[88px] flex items-center justify-center p-6 md:p-10 lg:p-12 rounded-[30px] label"
              ></Button>
              <Button
                label="Close"
                color="primary"
                onClick={handleClose}
                variant="default"
                className="max-w-[159px] max-h-[88px] flex items-center justify-center p-6 md:p-10 lg:p-12 rounded-[30px] label"
              ></Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
