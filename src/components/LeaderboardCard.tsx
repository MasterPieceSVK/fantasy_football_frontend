import { LeaderboardType } from "@/app/(main)/leaderboard/page";
import WhiteDiamondIcon from "./icons/WhiteDiamondIcon";

export default function LeaderboardCard({
  userInfo,
  number,
}: {
  userInfo: LeaderboardType;
  number: number;
}) {
  return (
    <div
      className={` ${
        number <= 3 ? "sm:hidden" : ""
      } bg-secondary/50 p-4 rounded-sm w-full flex justify-between `}
    >
      <h6 className={`${number <= 3 ? "text-yellow-500 text-2xl" : ""}`}>
        {number}.
      </h6>
      <div className={`${number <= 3 ? "text-2xl" : ""} flex gap-3`}>
        <h4>{userInfo.username}</h4>
        <div className="flex items-center gap-1">
          <WhiteDiamondIcon size={20} />
          <h4>{userInfo.profit}</h4>
        </div>
      </div>
    </div>
  );
}
