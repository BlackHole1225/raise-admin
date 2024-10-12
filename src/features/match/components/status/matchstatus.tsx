"use client";

import { useState, useEffect } from "react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Progress } from "flowbite-react";

const customTheme: CustomFlowbiteTheme["progress"] = {
  base: "w-full overflow-hidden bg-[#1E293B]",
  bar: "rounded-none",
  size: {
    sm: "h-1",
  },
};
interface MatchStatusProps {
  progress: number;
}

export const MatchStatus: React.FC<MatchStatusProps> = ({ progress }) => {
  return (
    <div className="matchstatus h-[calc(100vh-56px)] w-[500px] bg-white/5 pl-14 pt-14 z-10 relative">
      {progress < 100 ? (
        <div className="absolute bottom-[50px] right-14 w-[315px] h-[218px]">
          <p className="text-[40px] font-bold pb-3">マッチング中..</p>
          <Progress
            theme={customTheme}
            progress={progress}
            color="blue"
            size="sm"
          />
          <button className="mt-4 p-[6px] rounded-full border border-[#FECACA] text-[#FECACA] w-fit">
            マッチングをキャンセル
          </button>
          <div className="pt-6 text-[22px] flex gap-3">
            <p className="font-bold">Call of Duty Warzone</p>
            <p>/</p>
            <p>1VS1</p>
          </div>
          <p className="pt-4">
            現在
            <u>
              <span>112</span>人
            </u>
            のプレイヤーが参加中です。
          </p>
        </div>
      ) : (
        <div className="absolute bottom-[50px] right-14 w-[315px] h-[218px]">
          <p className="text-[40px] font-bold pb-3">対戦中..</p>
          <div className="pt-6 text-[22px] flex gap-3">
            <p className="font-bold">Call of Duty Warzone</p>
            <p>/</p>
            <p>1VS1</p>
          </div>

          <p className="pt-4">
            現在
            <u>
              <span>112</span>人
            </u>
            のプレイヤーが参加中です。
          </p>
        </div>
      )}
    </div>
  );
};

export default MatchStatus;
