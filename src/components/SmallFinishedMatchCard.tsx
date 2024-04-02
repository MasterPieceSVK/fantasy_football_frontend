import { Match } from "@/app/(main)/upcoming-matches/page";
import convertTime from "@/helpers/convertTime";

export default function SmallFinishedMatchCard(props: Match) {
  const formattedDateTime = convertTime(props.utc_date);

  return (
    <div className="bg-secondary w-full xl:w-1/2 flex flex-col justify-center items-center p-7 gap-2 mx-2">
      <h5 className=" text-red-500  rounded-lg p-1 text-sm">FINISHED</h5>
      <h4 className="text-2xl">{props.home_team}</h4>
      <h4 className="text-2xl">
        {props.score_home}:{props.score_away}
      </h4>

      <h4 className="text-2xl">{props.away_team}</h4>
      <h4>{formattedDateTime}</h4>
      <h4 className="mt-4">Odds</h4>
      <div className="flex justify-evenly items-center w-full bg-blue-500/20 rounded-xl p-3">
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
          } p-5 rounded-md text-center`}
        >
          {props.away_odd}
          <br></br>Away
        </h5>
      </div>
    </div>
  );
}
