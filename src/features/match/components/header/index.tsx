"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { RiCloseFill, RiQuestionnaireFill } from "react-icons/ri";
import { PiSealQuestionFill } from "react-icons/pi";

import Logo from "../../../../../public/images/logo_white.svg";

export const MatchHeader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="relative">
      <div className="h-14 bg-black px-4 lg:px-14 flex items-center">
        <div className="flex justify-between items-center w-full">
          <Link href="/">
            <Image src={Logo} alt="Logo" className="h-[35px] w-auto" />
          </Link>
          <button onClick={toggleSidebar}>
            {isSidebarOpen ? (
              <RiCloseFill size={42} className="text-slate-400" />
            ) : (
              <RiQuestionnaireFill size={42} className="text-slate-400" />
            )}
          </button>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 top-14 bg-slate-950 bg-opacity-70 z-40"
          onClick={closeSidebar}
        ></div>
      )}

      <div
        className={`fixed top-14 right-0 w-[356px] h-full bg-gray-900 shadow-lg transform transition-transform duration-500 z-50 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pl-6 pr-2 pt-8">
          <h3 className="text-[20px] font-bold">ヘルプ</h3>
          <div className="flex flex-col gap-[6px] h-[36vh] overflow-auto scrollbar-match">
            <Link
              href=""
              className="py-[11px] flex justify-between items-center gap-[10px] pr-12"
            >
              <PiSealQuestionFill
                size={43}
                className="min-w-[43px] text-slate-400"
              />
              <p>見出しテキスト見出しテキスト見出しテキスト</p>
            </Link>

            <Link
              href=""
              className="py-[11px] flex justify-between items-center gap-[10px] pr-12"
            >
              <PiSealQuestionFill
                size={43}
                className="min-w-[43px] text-slate-400"
              />
              <p>見出しテキスト見出しテキスト見出しテキスト</p>
            </Link>

            <Link
              href=""
              className="py-[11px] flex justify-between items-center gap-[10px] pr-12"
            >
              <PiSealQuestionFill
                size={43}
                className="min-w-[43px] text-slate-400"
              />
              <p>見出しテキスト見出しテキスト見出しテキスト</p>
            </Link>

            <Link
              href=""
              className="py-[11px] flex justify-between items-center gap-[10px] pr-12"
            >
              <PiSealQuestionFill
                size={43}
                className="min-w-[43px] text-slate-400"
              />
              <p>見出しテキスト見出しテキスト見出しテキスト</p>
            </Link>

            <Link
              href=""
              className="py-[11px] flex justify-between items-center gap-[10px] pr-12"
            >
              <PiSealQuestionFill
                size={43}
                className="min-w-[43px] text-slate-400"
              />
              <p>見出しテキスト見出しテキスト見出しテキスト</p>
            </Link>

            <Link
              href=""
              className="py-[11px] flex justify-between items-center gap-[10px] pr-12"
            >
              <PiSealQuestionFill
                size={43}
                className="min-w-[43px] text-slate-400"
              />
              <p>見出しテキスト見出しテキスト見出しテキスト</p>
            </Link>

            <Link
              href=""
              className="py-[11px] flex justify-between items-center gap-[10px] pr-12"
            >
              <PiSealQuestionFill
                size={43}
                className="min-w-[43px] text-slate-400"
              />
              <p>見出しテキスト見出しテキスト見出しテキスト</p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-[8px] pb-6">
          <Link href="">
            <Image
              src="/images/games/hbcds.webp"
              width={356}
              height={138}
              alt=""
            />
          </Link>
          <Link href="">
            <Image
              src="/images/games/ry8.webp"
              width={356}
              height={138}
              alt=""
            />
          </Link>
        </div>
        <div className="pl-6 pr-14 pt-3 pb-14 border border-transparent border-t-[#475569]">
          <Link href="" className="text-[18px] py-5 block">
            フィードバック
          </Link>
          <Link href="" className="text-[18px] py-5">
            通報
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MatchHeader;
