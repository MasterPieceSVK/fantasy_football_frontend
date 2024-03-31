import ChipIcon from "./icons/ChipIcon";
import Football from "./icons/Football";
import TrophyIcon from "./icons/TrophyIcon";

export default function HomeFeatures() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center lg:justify-evenly mb-4">
        <div className="flex flex-col items-center">
          <TrophyIcon />
          <h3 className="text-2xl text-center">Leaderboards</h3>
        </div>
        <div className="divider divider-primary xl:divider-horizontal"></div>
        <div className="flex flex-col items-center">
          <ChipIcon />
          <h3 className="text-2xl text-center">Fantasy Betting</h3>
        </div>
        <div className="divider divider-primary xl:divider-horizontal"></div>
        <div className="flex flex-col items-center justify-center">
          <Football />
          <h3 className="text-2xl text-center">Real Matches</h3>
        </div>
      </div>
    </div>
  );
}
