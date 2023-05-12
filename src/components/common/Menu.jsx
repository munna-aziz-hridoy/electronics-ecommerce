import Link from "next/link";
import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";

import { subMenu, menu } from "../../assets/data/menu";
import { useRouter } from "next/router";
import { BsX } from "react-icons/bs";
import { getCategory } from "@/allApis/category";

function MenuItem({ menuItem }) {
  return (
    <>
      <p className="font-light text-gray-700 hover:text-black duration-150 capitalize relative menu_item h-10">
        <Link href={`/c/${menuItem}`}>{menuItem}</Link>

        <span className="absolute top-8 p-2 border-[1px] border-gray-200 rounded-sm shadow z-50  min-w-[300px] bg-white sub_menu">
          {subMenu.map((item, i) => (
            <Link key={i} href={`/c/${menuItem}/${item?.name}`}>
              <span className="flex justify-start items-center gap-2 my-1 hover:bg-gray-300 p-2 rounded">
                <img
                  src={item.image.src}
                  alt=""
                  className="w-10 h-10 rounded"
                />
                <span className="text-xs font-medium text-gray-800 capitalize">
                  {item.name}
                </span>
              </span>
            </Link>
          ))}
        </span>
      </p>
    </>
  );
}

function MenuItemMobile({ menuItem, setOpen }) {
  const [openSubMenu, setOpenSubMenu] = useState(false);

  return (
    <div className="w-full">
      <p className="bg-gray-100 px-5 py-2 w-full rounded  my-1  flex justify-start items-center gap-2">
        <Link onClick={() => setOpen(false)} href={`/c/${menuItem}`}>
          <span className=" font-light text-gray-700  capitalize cursor-pointer">
            {menuItem}
          </span>
        </Link>
        <span
          className="text-gray-700"
          onClick={(e) => {
            e.stopPropagation();
            setOpenSubMenu((prev) => !prev);
          }}
        >
          <IoIosArrowDown
            className={openSubMenu ? `rotate-0` : `-rotate-90`}
            fontSize={20}
          />
        </span>
      </p>
      <div
        className={`border-t-[1px] border-b-[1px] border-gray-200 rounded-sm shadow  min-w-[300px] bg-white ml-5  ${
          openSubMenu ? "block" : "hidden"
        }`}
      >
        {subMenu.map((item, i) => (
          <div
            key={i}
            className="flex justify-start items-center gap-2 my-1 hover:bg-gray-300 p-2 rounded"
          >
            <img src={item.image.src} alt="" className="w-10 h-10 rounded" />
            <p className="text-xs font-medium text-gray-800 capitalize">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Menu({ open, setOpen }) {
  //   const menu = getCategory()
  //  console.log(menu)
  const router = useRouter();

  useEffect(() => {}, []);

  if (router.asPath.includes("checkout")) {
    return null;
  }

  return (
    <>
      <div className="md:flex justify-between items-center gap-5 mt-5 hidden">
        {menu?.map((item, i) => (
          <MenuItem key={i} menuItem={item} />
        ))}
      </div>

      <div
        className={`block md:hidden py-6 px-1 bg-white shadow-md fixed top-0 ${
          open ? "left-0" : "left-[-1000px]"
        } w-3/4 sm:w-1/2 h-screen overflow-y-auto transition-all duration-500 z-50`}
      >
        <div className="flex justify-between items-center w-full mb-4">
          <p className="text-4xl font-light uppercase">m&s</p>
          <p
            onClick={() => setOpen(false)}
            className="font-light text-lg text-gray-500 cursor-pointer"
          >
            <BsX fontSize={24} />
          </p>
        </div>

        <div className="flex flex-col justify-start items-start gap-1 ">
          {/* {menu?.map((item, i) => (
            <MenuItemMobile key={i} menuItem={item} setOpen={setOpen} />
          ))} */}
        </div>
      </div>
    </>
  );
}

export default Menu;
