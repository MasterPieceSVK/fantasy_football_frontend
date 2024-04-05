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
export type NotificationsResponse = {
  bet_notification_id: number;
  user_id: number;
  bet_outcome: number;
  profit: string;
} & Match;

export default function Page() {
  const [token, setToken] = useState("");
  const [success, setSuccess] = useState(false);
  const [empty, setEmpty] = useState(false);

  const queryClient = useQueryClient();

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
      setSuccess(true);
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

  if (empty) {
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
        {notificationsArray
          ? notificationsArray.map((notification) => {
              return <NotificationsCard {...notification} />;
            })
          : null}
      </div>
    </div>
  );
}
