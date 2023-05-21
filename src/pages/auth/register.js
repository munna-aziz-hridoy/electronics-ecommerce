import React, { useState } from "react";

import Link from "next/link";
import { useForm } from "react-hook-form";

import { Container, Spinner } from "@/components";
import { resisterUser } from "@/allApis";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import useAuthStore from "@/store/auth";

const register = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { push } = useRouter();

  const { addUser } = useAuthStore();

  const onSubmit = (data) => {
    setLoading(true);
    resisterUser(
      {
        name: data?.firstName + " " + data?.lastName,
        email: data?.email,
        password: data?.password,
      },
      push,
      toast
    ).then((data) => {
      setLoading(false);
      if (data?.user) {
        toast.success("Register successfull");
        addUser(data?.user);
        push("/");
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
            className="w-full md:w-1/2 lg:w-[35%] my-10 p-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-10">
              Register
            </h2>
            <div className="flex justify-center items-center gap-3">
              <div className="w-1/2">
                <p className="text-sm font-semibold text-gray-700 my-2">
                  First Name
                </p>
                <input
                  {...register("firstName", { required: true })}
                  type="text"
                  className="w-full px-2 py-2 border border-gray-200 outline-none shadow"
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>{" "}
              <div className="w-1/2">
                <p className="text-sm font-semibold text-gray-700 my-2">
                  Last Name
                </p>
                <input
                  {...register("lastName", { required: true })}
                  type="text"
                  className="w-full px-2 py-2 border border-gray-200 outline-none shadow"
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <p className="text-sm font-semibold text-gray-700 my-2">Email</p>
              <input
                type="text"
                {...register("email", { required: true })}
                className="w-full px-2 py-2 border border-gray-200 outline-none shadow"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="">
              <p className="text-sm font-semibold text-gray-700 my-2">
                Password
              </p>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="w-full px-2 py-2 border border-gray-200 outline-none shadow"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  This field is required and minimum six character
                </span>
              )}
            </div>
            <button
              type="submit"
              className="flex justify-center items-center p-2 border border-gray-300 gap-4  bg-[#b8d94b] mt-4 w-full"
            >
              Register
            </button>
            <div className="w-full h-[1px] bg-gray-300 my-3" />
            {/* <button className="flex justify-center items-center p-2 border border-gray-300 gap-4  bg-white mt-4 w-full">
            <FaGoogle />
            Sign up with google
          </button> */}
            <p className="text-sm font-semibold text-gray-700 capitalize text-center mt-4">
              Already Have account?
              <Link className="text-blue-700" href="/auth/login">
                Login
              </Link>
            </p>
          </form>
        )}
      </div>
    </Container>
  );
};

export default register;
