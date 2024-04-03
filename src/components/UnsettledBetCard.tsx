import { Bet } from "@/app/(main)/my-bets/page";
import convertTime from "@/helpers/convertTime";
import WhiteDiamondIcon from "./icons/WhiteDiamondIcon";

export default function UnsettledBetCard(props: Bet) {
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

      <h5 className=" text-xl text-center text-blue-500 ">
        {props.bet_winner == "HOME_TEAM"
          ? "Home"
          : props.bet_winner == "AWAY_TEAM"
          ? "Away"
          : "Draw"}
      </h5>
      <div className="flex justify-evenly items-center bg-blue-500/30 rounded-md ">
        <h5 className="text-center ml-6 text-xl">
          Odd <br></br>
          {props.odd}
        </h5>
        <div>
          <h6 className="text-center ">
            Potentional Profit <br></br>
          </h6>
          <div className="flex items-center justify-center gap-2">
            <h5 className={`text-center text-xl`}>
              +{(props.bet_amount * props.odd).toFixed(2)}
            </h5>
            <WhiteDiamondIcon size={15} />
          </div>
        </div>
        <h5 className="text-center text-xl">
          Bet<br></br>
          {props.bet_amount}
        </h5>
      </div>
    </div>
  );
}
