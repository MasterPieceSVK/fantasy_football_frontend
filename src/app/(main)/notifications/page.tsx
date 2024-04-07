"use client";

import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Match } from "../upcoming-matches/page";
import LoadingSpinnerIcon from "@/components/icons/LoadingSpinnerIcon";
import ErrorIcon from "@/components/icons/ErrorIcon";
import NotificationsCard from "@/components/NotificationsCard";
import TrashIcon from "@/components/icons/TrashIcon";
import { CustomError } from "@/components/LoginCard";
import NeutralSmileyIcon from "@/components/icons/NeutralSmileyIcon";
import { EligibleResponse } from "@/components/Sidebar";
import ClaimFreeCurrencyCard from "@/components/ClaimFreeCurrencyCard";
import FaultyClaim from "@/components/FaultyClaim";
import SuccessfullClaim from "@/components/SuccessfullClaim";
export type NotificationsResponse = {
  bet_notification_id: number;
  user_id: number;
  bet_outcome: number;
  profit: string | number;
} & Match;

export default function Page() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [success, setSuccess] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [freeCurency, setFreeCurrency] = useState(false);
  const queryClient = useQueryClient();
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    setToken(userToken ?? "");
  }, []);

  const {
    isPending,
    isError,
    data: notificationsArray,
    error,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: () =>
      axios
        .get<NotificationsResponse[]>(
          `${process.env.NEXT_PUBLIC_BASEURL}/get-my-notifications`,
          {
            params: {
              includeMatchDetails: true,
            },
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )

        .then((response) => {
          if (response.status == 204) {
            setEmpty(true);
          }
          console.log(response.data);
          return response.data;
        })
        .catch((e) => console.log(e)),
    enabled: Boolean(token),
    // staleTime: 0,
  });

  const eligibilityFetch = useQuery({
    queryKey: ["is-user-eligible-for-free-currency"],
    queryFn: () =>
      axios
        .get<EligibleResponse>(
          `${process.env.NEXT_PUBLIC_BASEURL}/add-currency/is-eligible`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )

        .then((response) => {
          if (response.data.eligible) {
            setFreeCurrency(true);
            return true;
          } else {
            return false;
          }
        })
        .catch((e) => console.log(e)),
    enabled: Boolean(token),
  });

  const notificationDeleteMutation = useMutation({
    mutationFn: async () => {
      return axios.delete(
        `${process.env.NEXT_PUBLIC_BASEURL}/delete-notifications`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({
        queryKey: ["does-user-have-notifications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["is-user-eligible-for-free-currency"],
      });
      setSuccess(true);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const freeCurrencyClaimMutation = useMutation({
    mutationFn: async () => {
      return axios.put(
        `${process.env.NEXT_PUBLIC_BASEURL}/add-currency`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["does-user-have-notifications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["is-user-eligible-for-free-currency"],
      });
      queryClient.invalidateQueries({ queryKey: ["balance"] });

      setFreeCurrency(false);
      setClaimed(true);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  function handleNotificationDelete() {
    if (Boolean(token)) {
      notificationDeleteMutation.mutate();
    }
  }

  function handleFreeCurrencyClaim() {
    if (Boolean(token)) {
      freeCurrencyClaimMutation.mutate();
    }
  }

  if (isPending) {
    return (
      <div className="w-full h-full   ">
        <div
          className={` flex flex-col h-full  w-full justify-center items-center `}
        >
          <LoadingSpinnerIcon />
        </div>
      </div>
    );
  }

  if (empty && !freeCurency) {
    return (
      <div className="w-full h-full ">
        <div
          className={` flex flex-col h-full  w-full justify-center items-center `}
        >
          <NeutralSmileyIcon size={125} />
          <h1>You don't have any notifications</h1>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-full ">
        <div
          className={` flex flex-col h-full  w-full justify-center items-center `}
        >
          <ErrorIcon />
          <h1>An Error Occured</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <button
        className="btn btn-secondary/30"
        onClick={handleNotificationDelete}
      >
        <TrashIcon size={20} />
      </button>
      <div className=" flex flex-col items-center  mt-6">
        {freeCurency && (
          <ClaimFreeCurrencyCard
            handleFreeCurrencyClaim={handleFreeCurrencyClaim}
            isLoading={eligibilityFetch.isFetching}
          />
        )}
        {claimed && <SuccessfullClaim />}
        {freeCurrencyClaimMutation.isError && <FaultyClaim />}
      </div>
      <div className=" flex flex-col items-center  mt-6">
        {notificationsArray
          ? notificationsArray.map((notification) => {
              return <NotificationsCard {...notification} />;
            })
          : null}
      </div>
    </div>
  );
}
