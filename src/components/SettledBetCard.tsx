import { Bet } from "@/app/(main)/my-bets/page";
import convertTime from "@/helpers/convertTime";
import WhiteDiamondIcon from "./icons/WhiteDiamondIcon";

export default function SettledBetCard(props: Bet) {
  const dateTime = convertTime(props.utc_date);

  return (
    <div className="bg-secondary/50 p-5 w-full xl:w-1/2 flex flex-col gap-3">
      <div className="flex flex-col xl:flex-row items-center justify-evenly gap-3 text-2xl">
        <h4 className="w-1/2 text-center xl:text-end text-wrap text-white">
          {props.home_team}
        </h4>
        <h6 className="text-sm">VS</h6>
        <h4 className="w-1/2 text-center xl:text-start text-wrap text-white">
          {props.away_team}
        </h4>
      </div>
      <div className="flex justify-center gap-3 items-center">
        <h5 className="text-sm text-center">{props.league_name}</h5>
        <h5>{dateTime}</h5>
      </div>
      <div className="flex gap-3 text-3xl">
        <h4
          className={`w-1/2 text-end ${
            props.bet_winner == "HOME_TEAM"
              ? props.outcome == 1
                ? "text-green-500"
                : "text-red-500"
              : ""
          } ${
            props.bet_winner == "DRAW"
              ? props.outcome == 1
                ? "text-green-500"
                : "text-red-500"
              : ""
          }`}
        >
          {props.score_home}
        </h4>
        <h6>:</h6>
        <h4
          className={`w-1/2 text-start ${
            props.bet_winner == "AWAY_TEAM"
              ? props.outcome == 1
                ? "text-green-500"
                : "text-red-500"
              : ""
          } ${
            props.bet_winner == "DRAW"
              ? props.outcome == 1
                ? "text-green-500"
                : "text-red-500"
              : ""
          }`}
        >
          {props.score_away}
        </h4>
      </div>

      <div className="flex justify-evenly items-center">
        <h5 className="text-center ml-6">
          Odd <br></br>
          {props.odd}
        </h5>

        <div>
          <h5 className="text-center text-xl">Bet</h5>
          <div className="flex items-center justify-center gap-2">
            <h5 className="text-center text-xl">
              {props.bet_amount} <br></br>
            </h5>
            <WhiteDiamondIcon size={20} />
          </div>
          <h5>
            (
            {props.bet_winner == "HOME_TEAM"
              ? "Home"
              : props.bet_winner == "AWAY_TEAM"
              ? "Away"
              : "Draw"}
            )
          </h5>
        </div>
        <div>
          <h6 className="text-center">Profit</h6>
          <div className="flex justify-center items-center gap-2">
            <h5
              className={`${
                props.profit > 0 ? "text-green-500" : "text-red-500"
              } text-center`}
            >
              {props.profit > 0 && "+"}
              {props.profit.toFixed(2)}
            </h5>
            <WhiteDiamondIcon size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
