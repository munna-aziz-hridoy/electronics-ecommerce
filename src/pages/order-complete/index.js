import { Container } from "@/components";
import React from "react";
import { BsCheck } from "react-icons/bs";

const OrderComplete = () => {
  return (
    <Container>
      <div className="flex flex-col justify-center items-center mt-24">
        <div className="w-16 h-16 border-4 border-[#b8d94b] rounded-full flex justify-center items-center">
          <BsCheck fontSize={30} />
        </div>
        <p className="text-2xl font-bold text-gray-800 capitalize text-center mt-4">
          Order Placed Successfully
        </p>
        <p className="text-lg font-semibold capitalize text-center text-[#b8d94b]">
          Thanks for shopping with us
        </p>
      </div>
    </Container>
  );
};

export default OrderComplete;
