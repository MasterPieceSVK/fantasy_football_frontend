import BlackDiamondIcon from "./icons/BlackDiamonIcon";
import FetchingIcon from "./icons/FetchingIcon";
import LoadingSpinnerIcon from "./icons/LoadingSpinnerIcon";
import WhiteDiamondIcon from "./icons/WhiteDiamondIcon";

export default function SidebarBalanceCard({
  balance,
  loading,
  isError,
}: {
  balance: number | undefined;
  loading: boolean;
  isError: boolean;
}) {
  if (loading) {
    return (
      <div className="bg-secondary/30 flex  justify-center items-center p-4">
        <FetchingIcon size={30} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center bg-secondary/30 p-4">
        <p className="text-black font-bold text-lg  text-center">
          An error occured :(
        </p>
      </div>
    );
  }

  if (balance !== undefined) {
    return (
      <div className="bg-secondary/30 flex  justify-center items-center p-4">
        <BlackDiamondIcon size={28} />
        <p className="text-black text-2xl font-semibold">{balance}</p>
      </div>
    );
  }
}
