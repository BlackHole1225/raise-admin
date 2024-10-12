import { Layout } from "@/features/layout/components";
import { LeaderboardTable } from "./components/leaderboard-table";

export const Leaderboard = () => {
  return (
    <Layout breadcrumb={{ label: "leaderboard", href: "aa" }}>
      <div className="bg-slate-50 px-12">
        <h1 className="text-[32px] font-bold py-[42px] text-black">
          リーダーボード
        </h1>
      </div>
      <div className="px-12 pt-[37px] pb-[109px]">
        <div className="flex gap-18">
          <div className="w-[1100px]">
            <div className="text-slate-600">
              <h2 className="text-[22px] font-bold">カテゴリー</h2>
              <div className="flex gap-4 pt-6 pb-10">
                <button className="px-4 py-[11px] rounded-full bg-blue-700 text-white">
                  総合
                </button>
                <button className="px-4 py-[11px] rounded-full focus:bg-blue-700 focus:text-white">
                  ポイント増加率
                </button>
                <button className="px-4 py-[11px] rounded-full focus:bg-blue-700 focus:text-white">
                  平均利用ポイント単価
                </button>
              </div>
            </div>
            <LeaderboardTable />
          </div>
        </div>
      </div>
    </Layout>
  );
};
