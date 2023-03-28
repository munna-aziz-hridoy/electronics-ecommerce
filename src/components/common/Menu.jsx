import Link from "next/link";
import React from "react";

function Menu({ open, setOpen }) {
  return (
    <>
      <div className="md:flex justify-between items-center gap-5 py-2 mt-4 hidden">
        {[...Array(10).keys()].map((item) => (
          <Link key={item} href="/">
            <p className=" font-light text-gray-700">Menu {item}</p>
          </Link>
        ))}
      </div>

      <div
        className={`block md:hidden py-6 px-1 bg-white shadow-md fixed top-0 ${
          open ? "left-0" : "left-[-1000px]"
        } w-3/4 sm:w-1/2 h-screen overflow-y-auto transition-all duration-500`}
      >
        <div className="flex justify-between items-center w-full mb-4">
          <p className="text-4xl font-light uppercase">m&s</p>
          <p
            onClick={() => setOpen(false)}
            className="font-light text-lg text-gray-500 cursor-pointer"
          >
            X
          </p>
        </div>

        <div className="flex flex-col justify-start items-start gap-5 ">
          {[...Array(10).keys()].map((item) => (
            <Link
              key={item}
              href="/"
              className="bg-gray-100 px-5 py-2 w-full rounded"
            >
              <p className=" font-light text-gray-700 w-full">Menu {item}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Menu;
