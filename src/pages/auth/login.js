import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { Container, Spinner } from "@/components";
import { loginUser } from "@/allApis";
import { useRouter } from "next/router";
import useAuthStore from "@/store/auth";
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const { push } = useRouter();

  const { addUser } = useAuthStore();

  const loginSubmit = (data) => {
    setLoading(true);
    loginUser(data).then((data) => {
      setLoading(false);
      if (data?.user) {
        toast.success("Login Successfull");
        addUser(data?.user);
        push("/");
      } else {
        toast.error("Login Failed");
      }
    });
  };
  return (
    <Container>
      <div className="flex justify-center items-center">
        {loading ? (
          <Spinner />
        ) : (
          <form
            onSubmit={handleSubmit(loginSubmit)}
            className="w-full md:w-1/2 lg:w-[35%] mt-10 p-2"
          >
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-10">
              Login
            </h2>
            <div className="">
              <p className="text-sm font-semibold text-gray-700 my-2">
                Email / Username
              </p>
              <input
                {...register("email", { required: true })}
                type="text"
                className="w-full px-2 py-2 border border-gray-200 outline-none shadow"
              />
            </div>
            <div className="">
              <p className="text-sm font-semibold text-gray-700 my-2">
                Password
              </p>
              <input
                {...register("password", { required: true })}
                type="password"
                className="w-full px-2 py-2 border border-gray-200 outline-none shadow"
              />
            </div>
            <button
              type="submit"
              className="flex justify-center items-center p-2 border border-gray-300 gap-4  bg-[#b8d94b] mt-4 w-full"
            >
              Login
            </button>
            <div className="w-full h-[1px] bg-gray-300 my-3" />
            {/* <button className="flex justify-center items-center p-2 border border-gray-300 gap-4  bg-white mt-4 w-full">
            <FaGoogle />
            Sign in with google
          </button> */}
            <p className="text-sm font-semibold text-gray-700 capitalize text-center mt-4">
              Don't have account?
              <Link className="text-blue-700" href="/auth/register">
                Create Account
              </Link>
            </p>
          </form>
        )}
      </div>
    </Container>
  );
};

export default Login;
