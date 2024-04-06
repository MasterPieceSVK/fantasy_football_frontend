import { NotificationsResponse } from "@/app/(main)/notifications/page";
import WhiteDiamondIcon from "./icons/WhiteDiamondIcon";

export default function NotificationsCard(props: NotificationsResponse) {
  const profit = Number(props.profit);

  return (
    <div className="flex bg-secondary/30 text-white p-4 w-full xl:w-1/2  justify-center items-center text-center">
      <article>
        You {props.bet_outcome == 1 ? "won" : "lost"}{" "}
        <span
          className={props.bet_outcome == 1 ? `text-green-500` : "text-red-500"}
        >
          {Math.abs(profit)}
        </span>{" "}
        in the{" "}
        <span className="font-semibold">
          {props.home_team} vs {props.away_team}
        </span>{" "}
        match. The score was{" "}
        <span className="font-semibold">
          {props.score_home}:{props.score_away}
        </span>{" "}
        and the winning odd{" "}
        <span
          className={`${
            props.bet_outcome == 1 ? "text-green-500" : "text-red-500"
          } `}
        >
          {props.winner == "HOME_TEAM"
            ? props.home_odd
            : props.winner == "AWAY_TEAM"
            ? props.away_odd
            : props.draw_odd}
        </span>
        <br></br>
        <section className="flex justify-evenly mt-3">
          <div className={`flex flex-col items-center justify-center`}>
            <p>Profit</p>
            <p
              className={`${
                props.bet_outcome == 1 ? "text-green-500" : "text-red-500"
              } underline`}
            >
              {props.profit}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p
              className={`${
                props.bet_outcome == 1 ? "bg-green-500" : "bg-red-500"
              } text-center p-2 rounded-lg text-black`}
            >
              {" "}
              {props.bet_outcome == 1 ? "Won" : "Lost"}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p>Winning Odd</p>
            <p className="underline">
              {props.winner == "HOME_TEAM"
                ? props.home_odd
                : props.winner == "AWAY_TEAM"
                ? props.away_odd
                : props.draw_odd}
            </p>
          </div>
        </section>
      </article>
    </div>
  );
}
