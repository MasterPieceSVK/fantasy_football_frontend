"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import ClosedEyeIcon from "./icons/ClosedEyeIcon";
import KeyIcon from "./icons/KeyIcon";
import UserIcon from "./icons/UserIcon";
import EmailIcon from "./icons/EmailIcon";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(6).max(15),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(20)
    .refine(
      (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
          password
        ),
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }
    ),
});

type FormInputs = z.infer<typeof formSchema>;

type RegisterData = {
  username: string;
  email: string;
  password: string;
};

type RegisterResponse = {
  data: {
    success: boolean;
    user_id: number;
    username: string;
    email: string;
    token: string;
    currency_amount: string;
  };
};
type CustomError = {
  response: {
    status: number;
    data: {
      message: string;
    };
  };
  message: string;
};

export default function RegisterCard() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const registerMutation = useMutation<
    RegisterResponse,
    CustomError,
    RegisterData
  >({
    mutationFn: async (data) => {
      return axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/register`, data);
    },
    onSuccess: (data: RegisterResponse) => {
      localStorage.setItem("token", data.data.token);
      router.push(`/dashboard`);
    },
    onError: (e) => {
      if (e.response.data) {
        setError("username", {
          type: "manual",
          message: e.response.data.message,
        });
      } else {
        setError("username", {
          type: "manual",
          message: "Network Error",
        });
      }
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex-col flex gap-2">
        <h2 className="text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="input input-bordered flex items-center gap-2 flex-col">
            <div className="flex items-center gap-2 justify-center h-full">
              <div className="translate-x-10">
                <EmailIcon />
              </div>
              <input
                {...register("email")}
                placeholder="Email"
                className="text-center"
              />
            </div>
          </label>
          <label className="input input-bordered flex items-center gap-2 flex-col">
            <div className="flex items-center gap-2 justify-center h-full">
              <div className="translate-x-10">
                <UserIcon />
              </div>
              <input
                {...register("username")}
                placeholder="Username"
                className="text-center"
              />
            </div>
          </label>
          <label className="input input-bordered flex items-center gap-2 flex-col">
            <div className="flex items-center gap-2 justify-center h-full ">
              <div className="translate-x-10">
                <KeyIcon />
              </div>
              <input
                className="text-center"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Password"
              />
            </div>
            {/* <div className="flex justify-center">
                <button
                  type="button"
                  className="-translate-x-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <ClosedEyeIcon />
                </button>
              </div> */}
          </label>
          <button
            className="btn btn-accent mt-4 w-full"
            type="submit"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? "Loading..." : "Register"}
          </button>
        </form>
      </div>

      <div className="w-full">
        {errors.email && (
          <p className="text-center text-wrap my-2 ">{errors.email.message}</p>
        )}
        {errors.username && (
          <p className="text-center text-wrap my-2">
            {errors.username.message}
          </p>
        )}
        {errors.password && (
          <p className="text-center text-wrap my-2">
            {errors.password.message}
          </p>
        )}
      </div>
    </div>
  );
}
