import { CiCirclePlus } from "react-icons/ci";

interface MatchPlayer2Props {
  progress: number;
}

export const MatchPlayer2: React.FC<MatchPlayer2Props> = ({ progress }) => {
  return (
    <div>
      <div className="relative -ml-14">
        <div className="w-[498px] h-[438px] backdrop-blur-[10px] bg-white/5 parallelogram z-10"></div>
        <div className="absolute top-[22.5px] -left-4 bg-white parallelogram w-[447px] h-[394px] z-20">
          <div className="absolute inset-0 bg-radial_1"></div>
        </div>

        <div
          className={`w-[550px] h-[550px] bg-radial_5 absolute z-[5] transition-all duration-1000 ${
            progress < 100
              ? "bottom-[95px] -right-[100px]"
              : "-bottom-[155px] right-[30px]"
          }`}
        ></div>

        <div className="absolute right-[128px] -bottom-[65px] bg-game_p2_info bg-cover w-[328px] h-[176px] px-7 py-5 z-30">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">P02</h3>
            <p className="pb-[6px] border border-transparent border-b-blue-500 font-bold text-blue-500 w-[148px]">
              ダイヤモンド
            </p>
          </div>
          <p className="text-[22px] p-2 font-bold bg-radial_3 w-fit">
            Test Player
          </p>
          <button className="flex gap-[6px] items-center mx-4 px-3 py-[6px] border rounded-full w-fit hover:scale-110 transition-all duration-200">
            <p className="text-sm">フレンド追加</p>
            <CiCirclePlus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
