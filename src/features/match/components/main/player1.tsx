import Image from "next/image";

interface MatchPlayer1Props {
  progress: number;
}

export const MatchPlayer1: React.FC<MatchPlayer1Props> = ({ progress }) => {
  return (
    <div>
      <div className="relative">
        <div className="w-[498px] h-[438px] backdrop-blur-[10px] bg-white/5 z-10 parallelogram"></div>
        <div className="absolute top-[22.5px] -left-4 bg-white parallelogram w-[447px] h-[394px] z-20">
          <div className="absolute inset-0 bg-radial_1"></div>
        </div>

        <div
          className={`w-[550px] h-[550px] bg-radial_4 absolute z-[5] transition-all duration-1000 ${
            progress < 100 ? "top-[40px] -left-[150px]" : "-top-[185px] left-0"
          }`}
        ></div>

        <div className="absolute -left-[60px] -bottom-[65px] bg-game_p1_info bg-cover w-[328px] h-[176px] px-7 py-5 z-30">
          <div className="flex justify-between items-center pb-3">
            <h3 className="font-bold text-lg">P01</h3>
            <p className="pb-[6px] border border-transparent border-b-red-600 font-bold text-red-600 w-[148px]">
              ダイヤモンド
            </p>
          </div>
          <p className="text-[22px] p-2 font-bold bg-radial_2 w-fit">
            Test Player
          </p>

          <div className="absolute bottom-6 -right-6">
            <Image
              src="/images/games/vicmark.webp"
              width={119}
              height={39}
              alt=""
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black w-fit">
              <p className="text-nowrap">
                <span className="text-[24px]">7</span>
                連勝中
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
