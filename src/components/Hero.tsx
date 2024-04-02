"use client";
import Home from "@/app/page";
import HomeFeatures from "./HomeFeatures";
import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="w-full  xl:flex mt-8 xl:justify-center gap-14">
      <div className="bg-secondary flex justify-center xl:hidden  items-center rounded-xl mb-6">
        <div className=" flex flex-col items-center py-7">
          <h1 className="text-5xl md:text-6xl bg-clip-text font-bold text-transparent bg-gradient-to-r text-center text-wrap from-red-500 to-violet-500 p-10">
            Welcome to Fantasy League
          </h1>
          <p className="text-xl mb-3 text-center text-wrap">
            Enjoy betting on football matches without spending real money!
          </p>
          <Link href={"/login"}>
            <motion.button
              className="btn btn-outline btn-wide border-red-500 text-red-500 hover:bg-red-700 hover:border-red-700 hover:text-white text-2xl"
              animate={{
                scale: [1, 1, 1, 1.5, 1.5, 1],
              }}
              transition={{ duration: 0.8 }}
            >
              Play
            </motion.button>
          </Link>
        </div>
      </div>
      <HomeFeatures />
      <div className="bg-secondary xl:flex justify-center hidden   items-center rounded-xl mb-6">
        <div className=" flex flex-col items-center py-7">
          <h1 className="text-5xl md:text-6xl bg-clip-text font-bold text-transparent bg-gradient-to-r text-center text-wrap from-red-500 to-violet-500 p-10">
            Welcome to Fantasy League
          </h1>
          <p className="text-xl mb-3 text-center text-wrap">
            Enjoy betting on football matches without spending real money!
          </p>
          <Link href={"/login"}>
            <motion.button
              className="btn btn-outline btn-wide border-red-500 text-red-500 hover:bg-red-700 hover:border-red-700 hover:text-white text-2xl"
              animate={{
                scale: [1, 1, 1, 1.5, 1.5, 1],
              }}
              transition={{ duration: 0.8 }}
            >
              Play
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}
