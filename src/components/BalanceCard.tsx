import DiamondIcon from "./icons/DiamondIcon";

export default function BalanceCard() {
  return (
    <div className="bg-primary w-1/4 flex flex-col items-center justify-center rounded-xl p-9">
      <h2 className="text-black text-4xl">Balance</h2>
      <div className="flex justify-center items-center gap-2">
        <DiamondIcon />
        <h2 className="text-black text-4xl">200</h2>
      </div>
    </div>
  );
}
