"use client";
import { useEffect, useState } from "react";
import "../globals.css";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

type userData = {
  username: string;
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    } else {
      const { username: token_username } = jwtDecode<userData>(token);
      setUsername(token_username);
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-[95%] overflow-x-hidden">
        <Sidebar user={username} />
        <div className=" w-full">{children}</div>
      </div>
    </div>
  );
}
