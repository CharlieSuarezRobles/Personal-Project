import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useGameManager() {
  const router = useRouter();
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);

  useEffect(() => {
    const status = localStorage.getItem("firstTime") !== "false";
    setIsFirstTime(status);
  }, []);

  const resetProgress = () => {
    localStorage.setItem("currentLevel", "1");
    localStorage.setItem("firstTime", "true");
    setIsFirstTime(true);
  };

  const completeIntroduction = () => {
    localStorage.setItem("firstTime", "false");
    setIsFirstTime(false);
    router.push("/maps/1");
  };

  const startGame = () => {
    if (!isFirstTime) router.push("/maps/1");
  };

  return { isFirstTime, resetProgress, completeIntroduction, startGame };

}