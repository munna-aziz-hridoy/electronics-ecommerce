import Link from "next/link";
import React, { Fragment, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/router";
import { BsX } from "react-icons/bs";
import { getCategory, getParentCategory } from "@/allApis/CategoryApis";

import useGetSubcategoriesById from "@/hooks/useGetSubcategoriesById";
import { Spinner } from "..";

function MenuItem({ menuItem }) {
  const { data, loading } = useGetSubcategoriesById(menuItem?.id);

  return (
    <>
      <div className="font-light text-gray-700 hover:text-black duration-150 capitalize relative menu_item h-10">
        <Link href={`/c/${menuItem.slug}`}>{menuItem.name}</Link>

        {loading ? (
          <Spinner />
        ) : (
          <>
            {data?.length > 0 && (
              <div className="absolute top-8 p-2 border-[1px] border-gray-200 rounded-sm shadow z-50  min-w-[300px] bg-white sub_menu">
                {data?.map((item, i) => (
                  <Link
                    key={i}
                    href={`/c/${menuItem.slug}/${item?.slug}?parent=${menuItem.id}`}
                  >
                    <span className="flex justify-start items-center gap-2 my-1 hover:bg-gray-300 p-2 rounded">
                      <img
                        src={
                          item?.image ||
                          "https://ps.w.org/gazchaps-woocommerce-auto-category-product-thumbnails/assets/icon-256x256.png?rev=1848416"
                        }
                        alt=""
                        className="w-10 h-10 rounded"
                      />
                      <span className="text-xs font-medium text-gray-800 capitalize">
                        {item.name}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

function MenuItemMobile({ menuItem, setOpen }) {
  const [openSubMenu, setOpenSubMenu] = useState(false);

  const { push } = useRouter();

  const { data, loading } = useGetSubcategoriesById(menuItem?.id);

  return (
    <div className="w-full">
      <p className="bg-gray-100 px-5 py-2 w-full rounded  my-1  flex justify-start items-center gap-2">
        <Link onClick={() => setOpen(false)} href={`/c/${menuItem.slug}`}>
          <span className=" font-light text-gray-700  capitalize cursor-pointer">
            {menuItem.name}
          </span>
        </Link>
        {data?.length > 0 && (
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
        )}
      </p>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {data?.length > 0 && (
            <div
              className={`border-t-[1px] border-b-[1px] border-gray-200 rounded-sm shadow  min-w-[300px] bg-white ml-5  ${
                openSubMenu ? "block" : "hidden"
              }`}
            >
              {data?.map((item, i) => (
                <div
                  onClick={() =>
                    push(
                      `/c/${menuItem.slug}/${item?.slug}?parent=${menuItem.id}`
                    )
                  }
                  key={i}
                  className="flex justify-start items-center gap-2 my-1 hover:bg-gray-300 p-2 rounded"
                >
                  <img
                    src={
                      item?.image ||
                      "https://ps.w.org/gazchaps-woocommerce-auto-category-product-thumbnails/assets/icon-256x256.png?rev=1848416"
                    }
                    alt=""
                    className="w-10 h-10 rounded"
                  />
                  <p className="text-xs font-medium text-gray-800 capitalize">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Menu({ open, setOpen }) {
  const router = useRouter();

  const { data, isLoading, refetch } = getParentCategory();

  if (isLoading) return <Spinner />;

  if (router.asPath.includes("checkout")) {
    return null;
  }

  return (
    <Fragment>
      <div className="md:flex justify-center items-center gap-16 mt-5 hidden">
        {data?.map((item, i) => (
          <MenuItem key={i} menuItem={item} />
        ))}{" "}
      </div>

      <div
        className={`block md:hidden py-6 px-1 bg-white shadow-md fixed top-0 ${
          open ? "left-0" : "left-[-1000px]"
        } w-3/4 sm:w-1/2 h-screen overflow-y-auto transition-all duration-500 z-50`}
      >
        <div className="flex justify-between items-center w-full mb-4">
          <img
            className="h-16 w-16 rounded-md"
            src="https://res.cloudinary.com/dqbxqqhx0/image/upload/v1684818511/electronics%20e-commerce/pnig71djilv2lsatfny9.jpg"
            alt=""
          />
          <p
            onClick={() => setOpen(false)}
            className="font-light text-lg text-gray-500 cursor-pointer"
          >
            <BsX fontSize={24} />
          </p>
        </div>

        <div className="flex flex-col justify-start items-start gap-1 ">
          {data?.map((item, i) => (
            <MenuItemMobile key={i} menuItem={item} setOpen={setOpen} />
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default Menu;
