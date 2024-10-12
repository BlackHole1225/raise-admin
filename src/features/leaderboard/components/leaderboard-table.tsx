import Image from "next/image";
import { FaCircleInfo } from "react-icons/fa6";

const UsersData = [
  {
    avatar: "/images/user/user1.webp",
    name: "User ID",
    level: "ダイヤモンド",
    weeklyearned: "801,356",
    battles: 56,
  },
  {
    avatar: "/images/user/user1.webp",
    name: "User ID",
    level: "ダイヤモンド",
    weeklyearned: "801,356",
    battles: 56,
  },
  {
    avatar: "/images/user/user1.webp",
    name: "User ID",
    level: "ダイヤモンド",
    weeklyearned: "801,356",
    battles: 56,
  },
  {
    avatar: "/images/user/user1.webp",
    name: "User ID",
    level: "ダイヤモンド",
    weeklyearned: "801,356",
    battles: 56,
  },
  {
    avatar: "/images/user/user1.webp",
    name: "User ID",
    level: "ダイヤモンド",
    weeklyearned: "801,356",
    battles: 56,
  },
  {
    avatar: "/images/user/user1.webp",
    name: "User ID",
    level: "ダイヤモンド",
    weeklyearned: "801,356",
    battles: 56,
  },
  {
    avatar: "/images/user/user1.webp",
    name: "User ID",
    level: "ダイヤモンド",
    weeklyearned: "801,356",
    battles: 56,
  },
  {
    avatar: "/images/user/user1.webp",
    name: "User ID",
    level: "ダイヤモンド",
    weeklyearned: "801,356",
    battles: 56,
  },
  {
    avatar: "/images/user/user1.webp",
    name: "User ID",
    level: "ダイヤモンド",
    weeklyearned: "801,356",
    battles: 56,
  },
  {
    avatar: "/images/user/user1.webp",
    name: "User ID",
    level: "ダイヤモンド",
    weeklyearned: "801,356",
    battles: 56,
  },
];

export const LeaderboardTable: React.FC = () => {
  return (
    <div className="w-full text-sm">
      <div className="bg-slate-100 text-slate-800 font-semibold py-3 flex items-center rounded-[10px] mb-2">
        <div className="w-[8%]"></div>
        <div className="w-[17%]">ユーザー名</div>
        <div className="w-[18%] flex items-center gap-6">
          <p>ユーザーLv.</p>
          <FaCircleInfo size={16} className="text-slate-400" />
        </div>
        <div className="w-[20%]">週間獲得ポイント数</div>
        <div className="w-[12%]">合計バトル回数</div>
        <div className="w-1/4"></div>
      </div>
      {UsersData.slice(0, 3).map((user, index) => (
        <div
          key={index}
          className="flex items-center py-[10px] text-blue-600 hover:bg-slate-50 cursor-pointer"
        >
          <div className="w-[8%] flex justify-center items-center text-base font-bold">
            {index === 0 && (
              <Image
                src="/images/leaderboard/no1.webp"
                width={40}
                height={40}
                alt="No 1"
              />
            )}
            {index === 1 && (
              <Image
                src="/images/leaderboard/no2.webp"
                width={40}
                height={40}
                alt="No 2"
              />
            )}
            {index === 2 && (
              <Image
                src="/images/leaderboard/no3.webp"
                width={40}
                height={40}
                alt="No 3"
              />
            )}
          </div>
          <div className="w-[17%] flex items-center gap-[10px]">
            <Image
              src={user.avatar}
              width={40}
              height={40}
              alt={`${user.name} avatar`}
              className="rounded-full"
            />
            <p>{user.name}</p>
          </div>
          <div className="w-[18%] flex items-center gap-6">{user.level}</div>
          <div className="w-[20%]">{user.weeklyearned}</div>
          <div className="w-[12%]">{user.battles}</div>
          <div className="w-1/4 flex justify-center items-center">
            <button className="px-11 py-[6px] bg-slate-700 rounded-[5px] text-white">
              フォローする
            </button>
          </div>
        </div>
      ))}
      {UsersData.slice(3).map((user, index) => (
        <div
          key={index + 3}
          className="flex items-center py-[10px] text-blue-600"
        >
          <div className="w-[8%] text-black flex justify-center items-center text-base font-bold">
            {index + 4}
          </div>
          <div className="w-[17%] flex items-center gap-[10px]">
            <Image
              src={user.avatar}
              width={40}
              height={40}
              alt={`${user.name} avatar`}
              className="rounded-full"
            />
            <p>{user.name}</p>
          </div>
          <div className="w-[18%] flex items-center gap-6">{user.level}</div>
          <div className="w-[20%]">{user.weeklyearned}</div>
          <div className="w-[12%]">{user.battles}</div>
          <div className="w-1/4 flex justify-center items-center">
            <button className="px-11 py-[6px] bg-slate-700 rounded-[5px] text-white">
              フォローする
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
