import { Match } from "@/app/(main)/upcoming-matches/page";
import convertTime from "@/helpers/convertTime";

export default function SmallTimedMatchCard(props: Match) {
  const date = convertTime(props.utc_date);

  return (
    <div className="bg-secondary w-full lg:w-1/2 flex flex-col justify-center items-center p-7 gap-2 mx-2">
      <h4 className="text-2xl">{props.home_team}</h4>
      <h4>VS</h4>

      <h4 className="text-2xl">{props.away_team}</h4>
      <h4>{date}</h4>
      <div className="flex justify-evenly w-full">
        <h4 className="text-lg text-center">
          {props.home_odd}
          <br></br>Home
        </h4>
        <h4 className="text-lg text-center">
          {props.draw_odd}
          <br></br>Draw
        </h4>
        <h4 className="text-lg text-center">
          {props.away_odd}
          <br></br>Away
        </h4>
      </div>
    </div>
  );
}
