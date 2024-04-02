"use client";
import ErrorIcon from "@/components/icons/ErrorIcon";
import LoadingSpinnerIcon from "@/components/icons/LoadingSpinnerIcon";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Match } from "../upcoming-matches/page";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SettledBetCard from "@/components/SettledBetCard";
import FootballPlayerIcon from "@/components/icons/FootballPlayerIcon";
import UnsettledBetCard from "@/components/UnsettledBetCard";
export type Bet = {
  bet_id: number;
  user_id: number;
  bet_winner: string;
  bet_amount: number;
  odd: number;
  outcome: number;
  profit: number;
} & Match;

export type BetsArray = {
  settledBets: Bet[];
  unsettledBets: Bet[];
};

export default function Page() {
  const [token, setToken] = useState("");
  const [settledBets, setSettledBets] = useState<Bet[]>([]);
  const [unsettledBets, setUnsettledBets] = useState<Bet[]>([]);

  const router = useRouter();
  useEffect(() => {
    setToken(localStorage.getItem("token") ?? "");
    if (!Boolean(localStorage.getItem("token"))) {
      router.push("/");
    }
  }, []);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["upcoming-matches"],
    queryFn: () =>
      axios
        .get<BetsArray[]>(`${process.env.NEXT_PUBLIC_BASEURL}/get-my-bets`, {
          params: {
            includeMatchDetails: true,
          },
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setSettledBets(response.data[0].settledBets);
          setUnsettledBets(response.data[1].unsettledBets);
          return response;
        })
        .catch((e) => console.log(e)),
    enabled: Boolean(token),
  });

  if (isPending) {
    return (
      <div className="w-full h-full   ">
        <div
          className={` flex flex-col h-full  w-full justify-center items-center gap-3`}
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
          className={` flex flex-col h-full  w-full justify-center items-center gap-3`}
        >
          <ErrorIcon />
          <h1 className="text-2xl">An Error Occured</h1>
        </div>
      </div>
    );
  }

  if (settledBets.length == 0 && unsettledBets.length == 0) {
    return (
      <div className="w-full h-full   ">
        <div
          className={` flex flex-col h-full  w-full justify-center items-center gap-3 `}
        >
          <FootballPlayerIcon />
          <h1 className="text-2xl">You don't have any bets</h1>
        </div>
      </div>
    );
  }

  return (
    <div className=" flex flex-col justify-center items-center gap-3">
      <div className="w-full flex flex-col justify-center items-center">
        <h2 className="text-2xl">Active Bets</h2>

        {unsettledBets.map((bet) => {
          return <UnsettledBetCard {...bet} />;
        })}
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <h2 className="text-2xl">Settled Bets</h2>

        {settledBets.map((bet) => {
          return <SettledBetCard {...bet} />;
        })}
      </div>
    </div>
  );
}
