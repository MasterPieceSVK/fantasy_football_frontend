"use client";
import { QueryKey, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import jwt_decode from "jwt-decode";

type userData = {
  username: string;
};

export default function Nav() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      const { username: token_username } = jwtDecode<userData>(token);
      setUsername(token_username);
    }
  }, [token]);

  // type userInfo = {
  //   username: string;
  // };

  if (!token) {
    return (
      <div className="h-[5%] flex justify-end py-4 pr-5">
        <ul className="flex gap-4">
          <li>
            <Link href={"/login"}>
              <button className="btn btn-ghost">Login</button>
            </Link>
          </li>
          <li>
            <Link href={"/register"}>
              <button className="btn btn-ghost">Register</button>
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  // const userInfoQuery = useQuery<AxiosResponse, Error>({
  //   queryKey: ["userInfo"],
  //   queryFn: async () => {
  //     const token = localStorage.getItem("token");
  //     return axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/get-user-info`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //   },
  // });

  function handleLogout() {
    setToken("");
    localStorage.removeItem("token");
    router.push("/");
  }
  return (
    <div className="h-[5%] flex justify-end py-4 pr-5">
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1">
          {username}
          {/* {userInfoQuery.username} */}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link href={"/profile"}>Profile</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
