"use client";
import { Match } from "@/app/(main)/upcoming-matches/page";
import convertTime from "@/helpers/convertTime";
import { useForm, SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import WhiteDiamondIcon from "./icons/WhiteDiamondIcon";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const formSchema = z.object({
  bet_amount: z.number(),
});
type FormInputs = z.infer<typeof formSchema>;

export default function SmallTimedMatchCard(props: Match) {
  const [selected, setSelected] = useState("");
  const [token, setToken] = useState("");
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const user_token = localStorage.getItem("token");
    if (user_token) {
      setToken(user_token);
    }
  });

  // WIP
  // const { isPending, isError, data, error } = useQuery({
  //   queryKey: ["balance"],
  //   queryFn: () =>
  //     axios
  //       .get(`${process.env.NEXT_PUBLIC_BASEURL}/get-my-bets`, {
  //         params: {
  //           includeMatchDetails: true,
  //         },
  //         headers: {
  //           authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((response) => {
  //         setBalance(response.data.)
  //         return response;
  //       })
  //       .catch((e) => console.log(e)),
  //   enabled: Boolean(token),
  // });

  const date = convertTime(props.utc_date);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bet_amount: 100,
    },
  });

  function onSubmit(data: object) {
    console.log(data);
    setSelected("");
  }

  return (
    <div className="bg-secondary w-full xl:w-1/2 flex flex-col justify-center items-center p-4 gap-2 mx-2">
      <h4 className="text-2xl">{props.home_team}</h4>
      <h4>VS</h4>

      <h4 className="text-2xl">{props.away_team}</h4>
      <h4>{date}</h4>
      <div className="flex justify-evenly w-full bg-blue-500/30 rounded-xl">
        <h4
          className="text-lg text-center cursor-pointer"
          onClick={() =>
            selected == "Home" ? setSelected("") : setSelected("Home")
          }
        >
          {props.home_odd}
          <br></br>Home
        </h4>
        <h4
          className="text-lg text-center cursor-pointer"
          onClick={() =>
            selected == "Draw" ? setSelected("") : setSelected("Draw")
          }
        >
          {props.draw_odd}
          <br></br>Draw
        </h4>
        <h4
          className="text-lg text-center cursor-pointer"
          onClick={() =>
            selected == "Away" ? setSelected("") : setSelected("Away")
          }
        >
          {props.away_odd}
          <br></br>Away
        </h4>
      </div>
      {selected !== "" && (
        <motion.div
          className="bg-blue-500/15 p-4 rounded-xl mt-3 flex flex-col gap-2 w-full "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h5 className="text-center text-xl">Selected: {selected}</h5>
          <h5 className="text-center text-xs ">
            Odd:{" "}
            {selected == "Home"
              ? props.home_odd
              : selected == "Away"
              ? props.away_odd
              : props.draw_odd}
          </h5>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 md:flex-row  justify-evenly items-center"
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
          <h5 className="text-center text-xs">
            Odd may change a little bit to the latest one
          </h5>
        </motion.div>
      )}
    </div>
  );
}
