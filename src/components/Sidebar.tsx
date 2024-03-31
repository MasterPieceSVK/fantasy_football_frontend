"use client";
import Link from "next/link";
import DashboardIcon from "./icons/DashboardIcon";
import SidebarChipIcon from "./icons/SidebarChipIcon";
import UpcomingMatchesIcon from "./icons/UpcomingMatchesIcon";
import LeaderboardIcon from "./icons/LeaderboardIcon";
import SettingsIcon from "./icons/SettingsIcon";
import BurgerIcon from "./icons/BurgerIcon";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
    setIsToken(() => {
      return Boolean(localStorage.getItem("token"));
    });
  }, []);

  useEffect(() => {
    console.log(isToken);
  }, [isToken]);

  return (
    <div className="drawer lg:drawer-open h-[95%]">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-start ">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden"
        >
          <BurgerIcon />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-primary text-base-content rounded-xl">
          {/* Sidebar content here */}
          <li className="mt-6">
            <Link href={"/dashboard"}>
              <button
                className="btn btn-ghost btn-wide text-black text-xl"
                disabled={!Boolean(isToken)}
              >
                {" "}
                <DashboardIcon /> Dashboard
              </button>
            </Link>
          </li>
          <li>
            {" "}
            <Link href={"/my-bets"}>
              <button
                className="btn btn-ghost  btn-wide text-black text-xl"
                disabled={!Boolean(isToken)}
              >
                {" "}
                <SidebarChipIcon /> My Bets
              </button>
            </Link>
          </li>
          <li>
            <Link href={"/upcoming-matches"}>
              <button className="btn btn-ghost  btn-wide text-black text-lg">
                {" "}
                <UpcomingMatchesIcon /> Upcoming Matches
              </button>
            </Link>
          </li>
          <li>
            <Link href={"/leaderboard"}>
              <button className="btn btn-ghost  btn-wide text-black text-xl">
                {" "}
                <LeaderboardIcon /> Leaderboard
              </button>
            </Link>
          </li>
          <li>
            <Link href={"/profile"}>
              <button
                className="btn btn-ghost  btn-wide text-black text-xl"
                disabled={!Boolean(isToken)}
              >
                {" "}
                <SettingsIcon /> Account Settings
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
