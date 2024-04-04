"use client";
import { Match } from "@/app/(main)/upcoming-matches/page";
import convertTime from "@/helpers/convertTime";
import { useForm, SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import WhiteDiamondIcon from "./icons/WhiteDiamondIcon";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CustomError } from "./LoginCard";
import { headers } from "next/headers";
import normalizeWinner from "@/helpers/normalizeWinner";
import RefreshIcon from "./icons/RefreshIcon";
import CloseIcon from "./icons/CloseIcon";

const formSchema = z.object({
  bet_amount: z.string(),
});

type FormInputs = z.infer<typeof formSchema>;
type FormData = {
  bet_amount: string;
};

type BetObj = {
  bet_amount: string;
  match_id: number;
  bet_winner: string;
  token: string;
};

type PlaceBetResponse = {
  user_id: number;
  bet_amount: number;
  match_id: string;
  bet_winner: string;
  odd: number;
  bet_id: number;
};

export default function TimedMatchCard(props: Match) {
  const [selected, setSelected] = useState("");
  const formattedDateTime = convertTime(props.utc_date);
  const [token, setToken] = useState("");
  const [matchId, setMatchId] = useState<number>(0);
  const [betWinner, setBetWinner] = useState<string>("");
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState<Boolean>();
  const [failure, setFailure] = useState<Boolean>();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bet_amount: "100",
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token ?? "");
  }, []);

  const placeBetMutation = useMutation<PlaceBetResponse, CustomError, BetObj>({
    mutationFn: async (input: BetObj) => {
      const filteredInput = {
        match_id: input.match_id,
        bet_winner: input.bet_winner,
        bet_amount: input.bet_amount,
      };

      return axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/place-bet`,
        filteredInput,

        { headers: { authorization: `Bearer ${input.token}` } }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      setSuccess(true);
    },
    onError: (e) => {
      setFailure(false);

      if (e.response.data) {
        setError("bet_amount", {
          type: "manual",
          message: e.response.data.message,
        });
      } else {
        setError("bet_amount", {
          type: "manual",
          message: "Network Error",
        });
      }
    },
  });

  useEffect(() => {
    if (selected !== "") {
      setBetWinner(selected);
    }
  }, [selected]);

  function onSubmit(data: FormData) {
    const winner = normalizeWinner(selected);
    if (winner) {
      const betObj: BetObj = {
        ...data,
        match_id: props.match_id,
        bet_winner: winner,
        token,
      };
      console.log(betObj);
      placeBetMutation.mutate(betObj);
    } else {
      setError("bet_amount", {
        type: "manual",
        message: "An error happened.",
      });
    }
  }

  function handleRefresh() {
    queryClient.invalidateQueries({ queryKey: ["upcoming-matches"] });
  }

  return (
    <div className="bg-secondary p-6 w-1/2">
      <div className="flex justify-center">
        <div className="w-1/2 flex justify-end gap-3">
          <h3 className="text-2xl text-center text-wrap">{props.home_team}</h3>
        </div>
        <h6 className="text-2xl mx-3 text-center"> VS </h6>
        <div className="w-1/2 flex justify-start gap-3">
          <h4 className="text-2xl text-center text-wrap">{props.away_team}</h4>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center my-2 ">
        <h5 className="text-sm">{props.league_name}</h5>
        <h5>{formattedDateTime}</h5>
      </div>
      <div className="text-center flex justify-evenly items-center bg-blue-500/30 rounded-xl">
        <h5
          onClick={() =>
            selected == "Home" ? setSelected("") : setSelected("Home")
          }
          className="cursor-pointer"
        >
          Home<br></br>
          {props.home_odd}
        </h5>
        <h5
          onClick={() =>
            selected == "Draw" ? setSelected("") : setSelected("Draw")
          }
          className="cursor-pointer"
        >
          Draw<br></br>
          {props.draw_odd}
        </h5>
        <h5
          onClick={() =>
            selected == "Away" ? setSelected("") : setSelected("Away")
          }
          className="cursor-pointer"
        >
          Away<br></br>
          {props.away_odd}
        </h5>
      </div>
      {selected !== "" && (
        <motion.div
          className="bg-blue-500/15 p-4 rounded-xl mt-3 flex flex-col gap-2  "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center ">
            <h5 className="text-xl flex-grow text-center">
              Selected: {selected}
            </h5>
            <button onClick={handleRefresh}>
              <RefreshIcon />
            </button>
          </div>

          <h5 className="text-center text-xs ">
            Odd:{" "}
            {selected == "Home"
              ? props.home_odd
              : selected == "Away"
              ? props.away_odd
              : props.draw_odd}
            *
          </h5>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-evenly items-center"
          >
            <label className="input input-bordered flex items-center gap-2 flex-col">
              <div className="flex items-center gap-2 justify-center h-full">
                <div className="translate-x-10">
                  <WhiteDiamondIcon size={20} />
                </div>
                <input
                  {...register("bet_amount")}
                  placeholder="Bet Amount"
                  className="text-center"
                />
              </div>
            </label>
            <button
              className="btn bg-blue-600 border-white/40 text-white"
              type="submit"
              // disabled={loginMutation.isPending}
            >
              {/* {loginMutation.isPending ? "Loading..." : "Login"} */} Place
              Bet
            </button>
          </form>
          {errors.bet_amount && (
            <p className="text-center text-sm text-red-500/90">
              Error: {errors.bet_amount.message}
            </p>
          )}
          <h5 className="text-center text-xs">
            *Odd may change a little bit to the latest one
          </h5>
        </motion.div>
      )}
      {success && (
        <div className="bg-green-500 w-full rounded-md p-2 flex justify-between items-center">
          <p className="text-black text-center text-sm">
            Your bet was submitted. Good luck!
          </p>
          <button onClick={() => setSuccess(false)}>
            <CloseIcon size={22} />
          </button>
        </div>
      )}
      {failure && (
        <div className="bg-red-500 w-full rounded-md p-2 flex justify-between items-center">
          <p className="text-black text-center text-sm">
            An error occured with your bet.
          </p>
          <button onClick={() => setFailure(false)}>
            <CloseIcon size={22} />
          </button>
        </div>
      )}
    </div>
  );
}
