import { LeaderboardType } from "@/app/(main)/leaderboard/page";
import PodiumCard from "./PodiumCard";
import LeaderboardCard from "./LeaderboardCard";
import SmallPodiumCard from "./SmallPodiumCard";

export default function PodiumContainer(props: LeaderboardType[]) {
  return (
    <div className="hidden  sm:flex flex-col h-full mt-4">
      <div className="hidden sm:flex items-center justify-evenly h-full p-4 ">
        <PodiumCard userInfo={props[1]} number={2} />
        <PodiumCard userInfo={props[0]} number={1} />
        <PodiumCard userInfo={props[2]} number={3} />
      </div>
    </div>
  );
}
