"use client";
import Link from "next/link";
import DashboardIcon from "./icons/DashboardIcon";
import SidebarChipIcon from "./icons/SidebarChipIcon";
import UpcomingMatchesIcon from "./icons/UpcomingMatchesIcon";
import LeaderboardIcon from "./icons/LeaderboardIcon";
import SettingsIcon from "./icons/SettingsIcon";
import BurgerIcon from "./icons/BurgerIcon";
import { usePathname } from "next/navigation";
import FinsihedIcon from "./icons/FinishedIcon";

export default function Sidebar({ user }: { user: string }) {
  const pathName = usePathname();

  return (
    <div className="drawer xl:drawer-open h-[95%] w-[15%] fixed">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-start ">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button xl:hidden"
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
        <ul className="menu p-4 w-80 min-h-full bg-gray-300 text-base-content rounded-xl">
          {/* Sidebar content here */}
          <li className="mt-6">
            <Link href={"/dashboard"}>
              <button
                className={`btn btn-ghost btn-wide text-black text-xl ${
                  pathName == "/dashboard" && "bg-gray-400"
                }`}
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
                className={`btn btn-ghost btn-wide text-black text-xl ${
                  pathName == "/my-bets" && "bg-gray-400"
                }`}
              >
                {" "}
                <SidebarChipIcon /> My Bets
              </button>
            </Link>
          </li>
          <li>
            <Link href={"/upcoming-matches"}>
              <button
                className={`btn btn-ghost btn-wide text-black text-lg ${
                  pathName == "/upcoming-matches" && "bg-gray-400"
                }`}
              >
                {" "}
                <UpcomingMatchesIcon /> Upcoming Matches
              </button>
            </Link>
          </li>
          <li>
            <Link href={"/finished-matches"}>
              <button
                className={`btn btn-ghost btn-wide text-black text-lg ${
                  pathName == "/finished-matches" && "bg-gray-400"
                }`}
              >
                {" "}
                <FinsihedIcon /> Finished Matches
              </button>
            </Link>
          </li>
          <li>
            <Link href={"/leaderboard"}>
              <button
                className={`btn btn-ghost btn-wide text-black text-xl ${
                  pathName == "/leaderboard" && "bg-gray-400"
                }`}
              >
                {" "}
                <LeaderboardIcon /> Leaderboard
              </button>
            </Link>
          </li>
          <li className="mt-auto">
            <div className="bg-red-300 text-black">BALANCE</div>
          </li>
          <li>
            <Link href={"/profile"}>
              <button
                className={`btn btn-ghost btn-wide text-black text-xl ${
                  pathName == "/profile" && "bg-gray-400"
                }`}
              >
                <SettingsIcon />
                {user}
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
