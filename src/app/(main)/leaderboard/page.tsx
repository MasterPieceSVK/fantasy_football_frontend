"use client";
import LeaderboardCard from "@/components/LeaderboardCard";
import PodiumCard from "@/components/PodiumCard";
import PodiumContainer from "@/components/PodiumContainer";
import ErrorIcon from "@/components/icons/ErrorIcon";
import LoadingSpinnerIcon from "@/components/icons/LoadingSpinnerIcon";
import TrophyIcon from "@/components/icons/TrophyIcon";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import { useState } from "react";

export type LeaderboardType = {
  username: string;
  profit: string;
};

export default function Page() {
  const [leaderboard, setLeaderboard] = useState();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["finsihed-matches"],
    queryFn: () =>
      axios
        .get<LeaderboardType[]>(
          `${process.env.NEXT_PUBLIC_BASEURL}/get-leaderboard`
        )
        .then((response) => {
          return response.data;
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
    <div className="flex justify-center h-1/2 flex-col items-center mt-20 ">
      <div className="w-full xl:w-1/2 p-2 ">
        <div className="flex justify-center items-center gap-3 mb-4">
          <TrophyIcon size={100} />
          <h2 className=" text-4xl sm:text-5xl text-white text-center">
            Biggest Overall Profit
          </h2>
          <TrophyIcon size={100} />
        </div>
        {data != undefined && <PodiumContainer {...data} />}
        {data != undefined &&
          data.map((user: LeaderboardType, i: number) => {
            return <LeaderboardCard userInfo={user} number={i + 1} />;
          })}
      </div>
    </div>
  );
}
