import { Match } from "@/app/(main)/upcoming-matches/page";
import convertTime from "@/helpers/convertTime";

export default function FinishedMatchCard(props: Match) {
  const formattedDateTime = convertTime(props.utc_date);

  return (
    <div className="bg-secondary p-6 w-1/2">
      <div className="flex justify-center">
        <div className="w-1/2 flex justify-end gap-3">
          <h3 className="text-2xl text-center text-wrap">{props.home_team}</h3>
          <h4 className="text-2xl text-center text-wrap">
            {props.score_home}:
          </h4>
        </div>

        <div className="w-1/2 flex justify-start gap-3">
          <h4 className="text-2xl text-center text-wrap">{props.score_away}</h4>
          <h3 className="text-2xl text-center text-wrap">{props.away_team}</h3>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center my-2 ">
        <h5 className=" text-red-500 rounded-lg p-1 text-md my-1">FINISHED</h5>
        <h5 className="text-sm">{props.league_name}</h5>

        <h5>{formattedDateTime}</h5>
      </div>
      <div className="flex justify-evenly items-center bg-blue-500/20 rounded-xl p-3">
        <h5
          className={`${
            props.score_home > props.score_away &&
            "bg-green-400  text-black font-bold"
          } p-5 rounded-md text-center`}
        >
          {props.home_odd}
          <br></br>Home
        </h5>
        <h5
          className={`${
            props.score_home == props.score_away &&
            "bg-green-400  text-black font-bold"
          } p-5 rounded-md text-center`}
        >
          {props.draw_odd}
          <br></br>Draw
        </h5>
        <h5
          className={`${
            props.score_home < props.score_away &&
            "bg-green-400 text-black font-bold"
          } p-5 rounded-md text-center `}
        >
          {props.away_odd}
          <br></br>Away
        </h5>
      </div>
    </div>
  );
}
