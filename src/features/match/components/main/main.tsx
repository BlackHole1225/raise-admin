import Image from "next/image";

import { MatchPlayer1 } from "./player1";
import { MatchPlayer2 } from "./player2";
import { ReportModal } from "../reportmodal/reportmodal";

interface MatchMainProps {
  progress: number;
}

export const MatchMain: React.FC<MatchMainProps> = ({ progress }) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex">
      <MatchPlayer1 progress={progress} />
      <MatchPlayer2 progress={progress} />
      <div className="absolute top-1/2 left-1/2 -translate-x-[calc(50%+40px)] -translate-y-1/2 z-40">
        <Image
          src="/images/games/vs_versus.webp"
          width={245}
          height={245}
          alt=""
        />
      </div>

      {progress == 100 && <ReportModal />}
    </div>
  );
};
