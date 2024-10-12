import { FaRegCopy } from "react-icons/fa6";

export const MatchID: React.FC = () => {
  return (
    <div className="relative z-10">
      <div className="matchid h-[calc(100vh-56px)] w-[500px] bg-white/5 pl-14 pt-14">
        <div className="flex justify-between items-center w-[370px] px-8 py-5 bg-[#020617]/30 rounded-[10px] relative">
          <p className="text-[22px]">tester01019</p>
          <FaRegCopy
            size={30}
            className="hover:scale-110 cursor-pointer transition duration-300"
          />
          <p className="absolute top-0 left-5 -translate-y-1/2">対戦相手のID</p>
        </div>
        <div className="mt-6 flex flex-col gap-5 w-[300px]">
          <p>
            ・IDをコピーするかゲームで入力して相手のルームへ参加を行なってください。
          </p>
          <p>
            ・各ゲームのマッチング方法に従ってマッチングを完了してください。
          </p>
          <p>
            ・勝敗の判定はMEMBERSのリザルト画面にて画像をアップロードして完了します。
          </p>
        </div>
      </div>
      <div className="absolute left-14 bottom-[60px] flex items-center gap-4 z-20">
        <p className="bg-white py-3 px-2 text-[22px] text-black">16+</p>
        <p className="text-sm">16歳以上</p>
      </div>
    </div>
  );
};
