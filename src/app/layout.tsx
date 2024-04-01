import type { Metadata } from "next";
import { BioRhyme } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Provider from "../../utils/provider";
import Sidebar from "@/components/Sidebar";
const biorhyme = BioRhyme({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fantasy League",
  description: "Fantasy League",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        data-theme="mytheme"
        className={`${biorhyme.className} bg-base-100 h-lvh w-lvw`}
      >
        <Provider>
          <div className="flex flex-col h-full">
            <Nav />
            <main className="flex h-[95%]">
              {/* <Sidebar /> */}
              <div className=" w-full">{children}</div>
            </main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
