import "../globals.css";
import Sidebar from "@/components/Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex h-[95%] overflow-x-hidden">
        <Sidebar />
        <div className=" w-full">{children}</div>
      </div>
    </div>
  );
}
