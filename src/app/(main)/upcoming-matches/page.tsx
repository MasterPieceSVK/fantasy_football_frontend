"use client";
import FinsihedMatchesContainer from "@/components/FinishedMatchesContainer";
import FinishedMatchCard from "@/components/FinsihedMatchCard";
import MatchCard from "@/components/FinsihedMatchCard";
import SmallFinishedMatchCard from "@/components/SmallFinishedMatchCard";
import SmallTimedMatchCard from "@/components/SmallTimedMatchesCard";
import TimedMatchCard from "@/components/TimedMatchCard";
import ErrorIcon from "@/components/icons/ErrorIcon";
import LoadingSpinnerIcon from "@/components/icons/LoadingSpinnerIcon";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export type Match = {
  match_id: number;
  utc_date: string;
  home_team: string;
  away_team: string;
  score_home: number;
  score_away: number;
  home_odd: number;
  away_odd: number;
  draw_odd: number;
  winner: string;
  league_name: string;
  status: string;
};

export type MatchesArray = {
  finishedMatches: Match[];
  timedMatches: Match[];
};
export default function Page() {
  const [finishedMatches, setFinishedMatches] = useState<Match[]>([]);
  const [timedMatches, setTimedMatches] = useState<Match[]>([]);
  const [showFinishedMatches, setShowFinishedMatches] = useState(false);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["upcoming-matches"],
    queryFn: () =>
      axios
        .get<MatchesArray[]>(`${process.env.NEXT_PUBLIC_BASEURL}/get-matches`)
        .then((response) => {
          setFinishedMatches(response.data[0].finishedMatches);
          setTimedMatches(response.data[1].timedMatches);
          return response;
        })
        .catch((e) => console.log(e)),
  });

  if (isPending) {
    return (
      <div className="w-full h-full   ">
        <div
          className={` flex flex-col h-full  w-full justify-center items-center `}
        >
          <LoadingSpinnerIcon />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-full   ">
        <div
          className={` flex flex-col h-full  w-full justify-center items-center `}
        >
          <ErrorIcon />
          <h1>An Error Occured</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex  flex-col w-full items-center gap-3 mt-10">
      <Link href={"/finished-matches"}>
        <h4 className="flex underline">See finished Matches</h4>
      </Link>
      <div className=" w-full  hidden 2xl:flex justify-center flex-col items-center">
        {timedMatches.map((match, i) => {
          return <TimedMatchCard {...match} key={i} />;
        })}
      </div>
      {/* <button
        className="btn btn-secondary"
        onClick={() => setShowFinishedMatches(!showFinishedMatches)}
      >
        {showFinishedMatches
          ? "Hide Finished Matches"
          : "Show Finished Matches"}
      </button> */}
      <div
        className={` flex flex-col  2xl:hidden w-full justify-center items-center ${
          !showFinishedMatches && "hidden"
        }`}
      >
        {finishedMatches.map((match, i) => {
          if (i < 5) {
            return <SmallFinishedMatchCard {...match} key={i} />;
          }
        })}
      </div>
      <Link href={"/finished-matches"}>
        <button
          className={`btn btn-secondary ${!showFinishedMatches && "hidden"}`}
          onClick={() => setShowFinishedMatches(!showFinishedMatches)}
        >
          See All finished Matches
        </button>
      </Link>
      <div className=" w-full  flex 2xl:hidden justify-center flex-col items-center">
        {timedMatches.map((match, i) => {
          return <SmallTimedMatchCard {...match} key={i} />;
        })}
      </div>
    </div>
  );
}
