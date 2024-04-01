"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Match, MatchesArray } from "../upcoming-matches/page";
import SmallFinishedMatchCard from "@/components/SmallFinishedMatchCard";
import FinishedMatchCard from "@/components/FinsihedMatchCard";

export default function Page() {
  const [finishedMatches, setFinishedMatches] = useState<Match[]>([]);
  const [timedMatches, setTimedMatches] = useState<Match[]>([]);
  const [showFinishedMatches, setShowFinishedMatches] = useState(false);
  useEffect(() => {
    axios
      .get<MatchesArray[]>(`${process.env.NEXT_PUBLIC_BASEURL}/get-matches`)
      .then((response) => {
        setFinishedMatches(response.data[0].finishedMatches);
        setTimedMatches(response.data[1].timedMatches);
      })
      .catch((e) => console.log(e));
  }, []);

  //   useEffect(() => {
  //     console.log(finishedMatches);
  //     console.log(timedMatches);
  //   }, [finishedMatches, timedMatches]);
  return (
    <div className="flex  flex-col w-full items-center gap-3  ">
      <div
        className={` flex flex-col  2xl:hidden w-full justify-center items-center `}
      >
        {finishedMatches.map((match, i) => {
          return <SmallFinishedMatchCard {...match} key={i} />;
        })}
      </div>
      <div
        className={` hidden 2xl:flex-col  2xl:flex w-full justify-center items-center `}
      >
        {finishedMatches.map((match, i) => {
          return <FinishedMatchCard {...match} key={i} />;
        })}
      </div>
    </div>
  );
}
