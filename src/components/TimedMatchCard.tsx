import { Match } from "@/app/(main)/upcoming-matches/page";
import convertTime from "@/helpers/convertTime";

export default function TimedMatchCard(props: Match) {
  const formattedDateTime = convertTime(props.utc_date);

  return (
    <div className="bg-secondary p-6 w-1/2">
      <div className="flex justify-center">
        <div className="w-1/2 flex justify-end gap-3">
          <h3 className="text-2xl text-center text-wrap">{props.home_team}</h3>
        </div>
        <h6 className="text-2xl mx-3 text-center"> VS </h6>
        <div className="w-1/2 flex justify-start gap-3">
          <h4 className="text-2xl text-center text-wrap">{props.away_team}</h4>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center my-2 ">
        <h5 className="text-sm">{props.league_name}</h5>
        <h5>{formattedDateTime}</h5>
      </div>
      <div className="flex justify-evenly items-center">
        <h5>{props.home_odd}</h5>
        <h5>{props.draw_odd}</h5>
        <h5>{props.away_odd}</h5>
      </div>
    </div>
  );
}
