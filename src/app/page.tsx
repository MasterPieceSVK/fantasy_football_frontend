import Hero from "@/components/Hero";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <div className="flex flex-col h-full ">
      <Nav />
      <main className="flex h-[90%] ">
        <Hero />
      </main>
    </div>
  );
}
