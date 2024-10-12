"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MatchHeader } from "./components/header";
import { MatchMain } from "./components/main/main";
import { MatchID } from "./components/matchID/matchid";
import { MatchStatus } from "./components/status/matchstatus";

const Match = () => {
  const imagePath = "/images/games/fv_battle.webp";
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 1;
        }
        return prevProgress;
      });
    };

    const interval = setInterval(updateProgress, 30); // 3000ms / 100 steps = 30ms per step

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <MatchHeader />
      <div
        style={{ backgroundImage: `url(${imagePath})` }}
        className="w-full h-[calc(100vh-56px)] bg-cover flex justify-between"
      >
        <MatchID />
        <MatchStatus progress={progress} />
        <div className="absolute inset-0 top-14 bg-linear_2"></div>
        <MatchMain progress={progress} />
      </div>
    </>
  );
};

export default Match;
