import React from "react";
import { footerData } from "@/assets/data/footer";
import { AddressForm, Container } from "@/components";
import { FaCartArrowDown, FaStore, FaTruck } from "react-icons/fa";

import earbud from "@/assets/earbud1.jpg";
import Link from "next/link";

const Checkout = () => {
  return (
    <Container>
      <div className="flex justify-between gap-10 my-5 md:my-12 py-2">
        <div className="w-full md:w-[65%]">
          <h2 className="text-2xl font-semibold text-gray-700 capitalize">
            1. Delivery Method
          </h2>
          <div className="w-full h-[1px] bg-gray-300 my-3" />
          <div className="flex justify-center items-center gap-5">
            <button className="flex justify-center items-center w-1/2 p-2 border border-gray-300 gap-4 shadow bg-[#b8d94b]">
              <FaStore />
              Collection
            </button>
            <button className="flex justify-center items-center w-1/2 p-2 border border-gray-300 gap-4 shadow">
              <FaTruck />
              Delivery
            </button>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 capitalize mt-10">
            2. Address
          </h2>
          <div className="w-full h-[1px] bg-gray-300 my-3" />

          <AddressForm />

          <h2 className="text-2xl font-semibold text-gray-700 capitalize mt-10">
            3. Payment Method
          </h2>
          <div className="w-full h-[1px] bg-gray-300 my-3" />

          <div className="flex  items-center gap-5 my-5">
            {footerData.payment_options.map((item, i) => (
              <img
                key={i}
                src={item.icon.src}
                width={40}
                className="cursor-pointer"
              />
            ))}
          </div>

          <Link href="/order-complete">
            <span className="flex justify-center items-center w-1/2 p-2 border border-gray-300 gap-4  bg-[#b8d94b] mt-16">
              Place Order
            </span>
          </Link>
        </div>
        <div className="w-full md:w-[35%]">
          <div className="border-2 border-gray-200 rounded shadow p-4">
            <div className="flex justify-between items-center">
              <p className="flex items-center gap-3 text-gray-800 font-semibold capitalize">
                <FaCartArrowDown fontSize={20} />2 Items
              </p>
              <p className="text-gray-800 font-semibold capitalize">$189</p>
            </div>
            <div className="w-full h-[1px] bg-gray-300 my-3" />

            {[1, 2].map((item) => {
              return (
                <div
                  key={item}
                  className="flex justify-between items-center my-8 border-b pb-4"
                >
                  <div className="flex gap-3">
                    <img src={earbud.src} className="w-16 h-16" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 capitalize">
                        Bluetooth Earbuds
                      </h2>
                      <p className="text-sm font-light text-gray-600 capitalizes w-2/3">
                        Gaming bluetooth earbuds, best and premium quality
                      </p>
                      <div className="flex justify-between items-center">
                        <p className=" text-gray-500 text-sm font-light">
                          Qty: 2
                        </p>
                        <p className="text-green-600 text-lg font-semibold capitalize">
                          Price: $12
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600 text-medium text-lg">Order Value</p>
                <p className="text-gray-600 text-medium text-lg">$120</p>
              </div>
              <div className="flex justify-between items-center mt-6">
                <p className="text-gray-800 font-bold text-2xl">Total pay</p>
                <p className="text-gray-800 font-bold text-2xl">$120</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Checkout;
