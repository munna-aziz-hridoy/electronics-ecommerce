import React from "react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { Container } from "@/components";

const register = () => {
  return (
    <Container>
      <div className="flex justify-center items-center">
        <div className="w-full md:w-1/2 lg:w-[35%] my-10">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-10">
            Register
          </h2>
          <div className="flex justify-center items-center gap-3">
            <div className="">
              <p className="text-sm font-semibold text-gray-700 my-2">
                First Name
              </p>
              <input
                type="text"
                className="w-full px-2 py-2 border border-gray-200 outline-none shadow"
              />
            </div>{" "}
            <div className="">
              <p className="text-sm font-semibold text-gray-700 my-2">
                Last Name
              </p>
              <input
                type="text"
                className="w-full px-2 py-2 border border-gray-200 outline-none shadow"
              />
            </div>
          </div>
          <div className="">
            <p className="text-sm font-semibold text-gray-700 my-2">Email</p>
            <input
              type="text"
              className="w-full px-2 py-2 border border-gray-200 outline-none shadow"
            />
          </div>
          <div className="">
            <p className="text-sm font-semibold text-gray-700 my-2">Password</p>
            <input
              type="text"
              className="w-full px-2 py-2 border border-gray-200 outline-none shadow"
            />
          </div>
          <button className="flex justify-center items-center p-2 border border-gray-300 gap-4  bg-[#b8d94b] mt-4 w-full">
            Register
          </button>
          <div className="w-full h-[1px] bg-gray-300 my-3" />
          <button className="flex justify-center items-center p-2 border border-gray-300 gap-4  bg-white mt-4 w-full">
            <FaGoogle />
            Sign up with google
          </button>
          <p className="text-sm font-semibold text-gray-700 capitalize text-center mt-4">
            Already Have account?{" "}
            <Link className="text-blue-700" href="/auth/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default register;
