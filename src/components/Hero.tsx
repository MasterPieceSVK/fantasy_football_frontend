import Home from "@/app/page";
import HomeFeatures from "./HomeFeatures";

export default function Hero() {
  return (
    <div className="w-3/4">
      <div className="bg-secondary flex justify-center  items-center rounded-xl mb-6">
        <div className=" flex flex-col items-center py-7">
          <h1 className="text-5xl md:text-6xl bg-clip-text font-bold text-transparent bg-gradient-to-r text-center text-wrap from-red-500 to-violet-500 p-10">
            Welcome to Fantasy League
          </h1>
          <p className="text-xl mb-3">
            Enjoy betting on football matches without spending real money!
          </p>
          <button className="btn btn-outline btn-wide border-red-500 text-red-500 hover:bg-red-700 hover:border-red-700 hover:text-white text-2xl">
            Play
          </button>
        </div>
      </div>
      <HomeFeatures />
    </div>
  );
}
