import FetchingIcon from "./icons/FetchingIcon";
import LoadingSpinnerIcon from "./icons/LoadingSpinnerIcon";

type ClaimFreeCurrencyCardProps = {
  handleFreeCurrencyClaim: () => void;
  isLoading: boolean;
};
export default function ClaimFreeCurrencyCard({
  handleFreeCurrencyClaim,
  isLoading,
}: ClaimFreeCurrencyCardProps) {
  console.log("sadasd");
  console.log(isLoading);

  return (
    <div className="bg-blue-400 flex justify-center flex-col items-center w-full xl:w-1/2  p-4 text-black gap-4 rounded-xl  ">
      <h4 className="text-2xl font-semibold text-center">
        Claim your Free 100 Credits Every 24 hours.
      </h4>

      <button className="btn btn-secondary" onClick={handleFreeCurrencyClaim}>
        Claim
      </button>
    </div>
  );
}
