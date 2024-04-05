"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Match, MatchesArray } from "../upcoming-matches/page";
import SmallFinishedMatchCard from "@/components/SmallFinishedMatchCard";
import FinishedMatchCard from "@/components/FinsihedMatchCard";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinnerIcon from "@/components/icons/LoadingSpinnerIcon";
import ErrorIcon from "@/components/icons/ErrorIcon";

export default function Page() {
  const [finishedMatches, setFinishedMatches] = useState<Match[]>([]);
  const [timedMatches, setTimedMatches] = useState<Match[]>([]);
  const [showFinishedMatches, setShowFinishedMatches] = useState(false);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["finsihed-matches"],
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
    <div className="flex  flex-col w-full items-center gap-3 mt-5 ">
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
