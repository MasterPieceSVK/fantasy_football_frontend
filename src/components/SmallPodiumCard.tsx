import { LeaderboardType } from "@/app/(main)/leaderboard/page";
import DiamondIcon from "./icons/DiamondIcon";
import WhiteDiamondIcon from "./icons/WhiteDiamondIcon";
import BlackDiamondIcon from "./icons/BlackDiamonIcon";

export default function SmallPodiumCard({
  userInfo,
  number,
}: {
  userInfo: LeaderboardType;
  number: number;
}) {
  return (
    <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 w-full p-4 text-black flex ">
      <h2 className="mr-auto text-4xl">{number}</h2>
      <div className="mx-auto text-3xl flex gap-4 items-center">
        <h4>{userInfo.username}</h4>
        <div className="flex  items-center gap-1">
          <BlackDiamondIcon size={20} />
          <h4>{userInfo.profit}</h4>
        </div>
      </div>
    </div>
  );
}
