"use client";

import LoginCard from "@/components/LoginCard";
import RegisterCard from "@/components/RegisterCard";
import { useState } from "react";

export default function Page() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="flex justify-center items-center ">
      <div className="bg-secondary w-[90%] xl:w-[50%] 2xl:w-[20%]  flex flex-col items-center pb-7 rounded-2xl">
        <div className="flex gap-5 mb-5 bg-accent w-full justify-center p-4 rounded-2xl">
          <button
            className={`btn btn-outline bg-accent rounded-xl border-2 text-black ${
              !showLogin && "bg-white border-white"
            }`}
            onClick={() => setShowLogin(false)}
          >
            Register
          </button>
          <button
            className={`btn btn-outline bg-accent rounded-xl border-2 text-black ${
              showLogin && "bg-white border-white"
            }`}
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
        </div>
        {showLogin ? <LoginCard /> : <RegisterCard />}
      </div>
    </div>
  );
}
