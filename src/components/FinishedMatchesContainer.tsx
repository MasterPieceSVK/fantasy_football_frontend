import { Match } from "@/app/(main)/upcoming-matches/page";
import FinishedMatchCard from "./FinsihedMatchCard";

export default function FinsihedMatchesContainer({
  matches,
}: {
  matches: Match[];
}) {
  const length = matches.length;
  return (
    <div className="carousel w-full">
      {matches.map((match, i) => {
        return (
          <FinishedMatchCard
            counter={i + 1}
            match={match}
            key={i}
            length={length}
          />
        );
      })}
    </div>
  );
}
