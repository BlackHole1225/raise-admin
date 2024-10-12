"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaAngleRight, FaPlayCircle } from "react-icons/fa";
import { BsCloudCheck } from "react-icons/bs";

export function ReportModal() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [animateClose, setAnimateClose] = useState<boolean>(false);
  const [shrinkWidth, setShrinkWidth] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(874); // Start with initial height
  const [opacity, setOpacity] = useState<number>(1);
  const [selected, setSelected] = useState<"勝ち" | "負け" | null>(null);

  useEffect(() => {
    if (animateClose) {
      setTimeout(() => {
        setHeight(874);
        setOpacity(0.8);
      }, 0);
      setTimeout(() => {
        setHeight(60);
        setOpacity(0.5);
      }, 500);
      setTimeout(() => {
        setShrinkWidth(true);
      }, 1000);
      setTimeout(() => {
        setOpenModal(false);
        setAnimateClose(false);
        setShrinkWidth(false);
        setHeight(874); // Reset height for the next open
        setOpacity(1); // Reset opacity for the next open
      }, 2000); // Total duration of the animation
    }
  }, [animateClose]);

  const handleSendClick = () => {
    setAnimateClose(true);
  };

  const handleSelection = (choice: "勝ち" | "負け") => {
    setSelected(choice);
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="absolute -bottom-[160px] left-1/2 -translate-x-[calc(50%+60px)] border rounded-full py-[9px] px-[60px] flex items-center gap-5 z-30 hover:bg-slate-950 hover:border-transparent transition-all duration-300"
      >
        リザルト画面に移る
        <FaAngleRight size={17} />
      </button>
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className={`bg-white rounded-lg text-black px-[80px] py-[40px] transition-all ease-in-out ${
              animateClose ? "" : "h-auto opacity-100 duration-1000"
            } overflow-hidden`}
            style={{
              height: `${height}px`,
              width: shrinkWidth ? "60px" : "1100px",
              opacity: opacity,
              borderRadius: shrinkWidth ? "50%" : "10px",
              transition:
                "width 0.5s, height 0.4s, opacity 1s, border-radius 1s",
            }}
          >
            <div className="max-h-[800px] overflow-auto scrollbar-reportmodal">
              <h1 className="text-[32px] mb-8 font-bold">勝敗結果を報告</h1>

              <p className="pb-[9px]">
                ご自身の対戦終了の結果を【勝ち】【負け】から選択し、対戦が終了したゲームタイトルの勝敗結果（リザルト）画面をスクリーンショットし、画像をMEMBERSにアップロードしてください。
              </p>

              <Link
                href=""
                className="flex items-center gap-[6px] text-blue-700"
              >
                <FaPlayCircle size={20} />
                <p className="underline">アップロード方法見てみる</p>
              </Link>

              <p className="pt-5 pb-3 text-slate-400">選択してください</p>

              <div className="flex gap-7">
                <div className="flex flex-col items-center">
                  <p
                    className={`text-[13px] font-semibold px-4 py-1 bg-blue-200 rounded-full w-fit mb-2 text-blue-700 ${
                      selected === "勝ち" ? "block" : "hidden"
                    }`}
                  >
                    選択中
                  </p>
                  <button
                    onClick={() => handleSelection("勝ち")}
                    className={`text-slate-400 bg-slate-50 px-16 py-[11px] border border-dashed border-slate-400 rounded-[4px] focus:bg-blue-700 focus:text-white focus:border-transparent ${
                      selected === "負け" ? "mt-[35px]" : "mt-0"
                    }`}
                  >
                    勝ち
                  </button>
                </div>
                <div className="flex flex-col items-center">
                  <p
                    className={`text-[13px] font-semibold px-4 py-1 bg-blue-200 rounded-full w-fit mb-2 text-blue-700 ${
                      selected === "負け" ? "block" : "hidden"
                    }`}
                  >
                    選択中
                  </p>
                  <button
                    onClick={() => handleSelection("負け")}
                    className={`text-slate-400 bg-slate-50 px-16 py-[11px] border border-dashed border-slate-400 rounded-[4px] focus:bg-red-500 focus:text-white focus:border-transparent ${
                      selected === "勝ち" ? "mt-[35px]" : "mt-0"
                    }`}
                  >
                    負け
                  </button>
                </div>
              </div>

              <div className=" text-sm mt-4 px-[26px] py-4 bg-red-50 border border-red-200 rounded-lg">
                <span className="text-red-600">
                  ※1
                  正しい勝敗結果を選択するようにしてください。虚偽の申告があった場合には判定結果は【保留】扱いとなり、MEMBERS審査チームによる審査が完了するまでポイントの振り分けは行われません。
                </span>
                <Link href="" className="text-blue-700">
                  詳しくはこちら
                </Link>
              </div>

              <form action="" className="pt-6">
                <div className="h-[312px] w-full border border-dashed border-slate-300 bg-slate-50 rounded-lg relative">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <BsCloudCheck size={87} className="pb-8" />
                    <button className="text-[22px] font-bold">
                      ここにファイルをドロップ
                    </button>
                    <p className="text-slate-400 py-5">または</p>
                    <label htmlFor="report">
                      <div className="px-[71px] py-[14px] border border-blue-600 rounded-full text-blue-600 text-lg cursor-pointer">
                        ファイルを選ぶ
                      </div>
                    </label>
                  </div>
                  <input type="file" id="report" className="hidden" />
                </div>
              </form>
              <p className="text-sm text-slate-400 pt-[10px]">
                ファイルサイズの上限は20MBです。
              </p>

              <button
                onClick={handleSendClick}
                className="w-full py-[13px] bg-blue-700 text-white rounded-[10px] font-bold text-lg mt-[21px]"
              >
                送信する
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
