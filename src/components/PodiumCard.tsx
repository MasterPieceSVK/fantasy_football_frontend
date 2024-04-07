import { LeaderboardType } from "@/app/(main)/leaderboard/page";
import DiamondIcon from "./icons/DiamondIcon";
import WhiteDiamondIcon from "./icons/WhiteDiamondIcon";
import BlackDiamondIcon from "./icons/BlackDiamonIcon";

export default function PodiumCard({
  userInfo,
  number,
}: {
  userInfo: LeaderboardType;
  number: number;
}) {
  return (
    <div
      className={`${
        number == 1 ? "-translate-y-6" : ""
      } flex flex-col items-center justify-center bg-gradient-to-b from-yellow-500 via-orange-500 to-red-500 w-[30%] h-full text-black text-center rounded-xl`}
    >
      <h2 className="text-6xl mt-5">{number}.</h2>
      <div className="flex flex-col items-center justify-center w-[30%] h-full text-black text-center rounded-xl">
        <h4 className="text-2xl 2xl:text-3xl font-bold">{userInfo.username}</h4>
        <div
          className="flex gap-2 text-2xl xl:text-4xl justify-center items-center font-bold -translate-x-2 mt-7
          "
        >
          <BlackDiamondIcon size={50} />
          <h4>{userInfo.profit}</h4>
        </div>
      </div>
    </div>
  );
}
