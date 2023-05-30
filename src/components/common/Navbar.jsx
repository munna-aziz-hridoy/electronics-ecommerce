import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { RxHamburgerMenu } from "react-icons/rx";
import { Container, Menu } from "..";
import useAuthStore from "@/store/auth";
import { CartContext } from "@/context/cart";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();
  const isCheckoutPage = router.asPath.includes("checkout");

  const { user } = useAuthStore();

  const { cart } = useContext(CartContext);

  const handleSearch = () => {
    router.push(`/product?search=${searchTerm}`);
  };

  return (
    <div className="border-b">
      <Container>
        <div className="p-2 py-4">
          <div className="flex justify-between items-center">
            {/* logo */}

            <div className="flex justify-start items-center gap-2">
              <Link href="/">
                <img
                  className="h-14 w-20 rounded object-cover"
                  src="https://res.cloudinary.com/dqbxqqhx0/image/upload/v1684818511/electronics%20e-commerce/pnig71djilv2lsatfny9.jpg"
                  alt=""
                />
              </Link>
              <button
                onClick={() => setOpenMenu(true)}
                className="md:hidden text-gray-600"
              >
                <RxHamburgerMenu fontSize={20} />
              </button>
            </div>

            {/* nav search */}

            {!isCheckoutPage && (
              <div className="hidden sm:flex w-1/2  justify-center items-center">
                <input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  type="text"
                  className="bg-gray-100 w-[90%] h-10 p-1 px-3 outline-none border-none"
                  placeholder="Search products"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  onClick={handleSearch}
                  className="flex justify-center items-center bg-[#bbd850] p-1 h-10 w-10"
                >
                  <HiOutlineMagnifyingGlass fontSize={20} color="#fff" />
                </button>
              </div>
            )}

            {/* nav last */}

            <div className="flex justify-end items-center gap-4">
              {user ? (
                <>
                  {" "}
                  <Link href="/user/profile">
                    {" "}
                    <p className="font-medium capitalize  text-gray-900">
                      {user?.name}
                    </p>
                  </Link>
                  <Link href="/cart">
                    <span
                      className={`relative w-8 h-6 ${
                        cart?.total_products > 0
                          ? "bg-[#bbd850]"
                          : "bg-gray-200"
                      } flex justify-center items-center rounded border-[1px] border-gray-900 text-sm cursor-pointer before:content[''] before:absolute before:border-[1px] before:border-gray-900 before:rounded-full before:w-4 before:h-6 before:top-[-15px] before:z-[-1]`}
                    >
                      {cart?.total_products || 0}
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth/login">
                    <button className="font-medium capitalize  text-gray-900">
                      sign in
                    </button>
                  </Link>
                  <Link href="/auth/register">
                    <button className="font-medium capitalize  text-gray-900">
                      sign up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* menu */}

          <Menu open={openMenu} setOpen={setOpenMenu} />

          {/* Nav bottom */}
        </div>
      </Container>
      {!isCheckoutPage && (
        <div className="border-t-[1px]  border-gray-300">
          <Container>
            <div className="p-1 flex justify-center items-center gap-10">
              <p className="font-medium capitalize text-gray-900 text-xs">
                free delivery
              </p>
              <p className="text-black font-light">|</p>
              <p className="font-medium capitalize text-gray-900 text-xs">
                free returns
              </p>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}

export default Navbar;
