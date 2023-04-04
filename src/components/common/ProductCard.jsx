import React from "react";
import { Image } from "..";

function ProductCard({ product }) {
  return (
    <div className=" cursor-pointer shadow-sm rounded m-2 my-4 md:m-0">
      <div className="w-full h-[400px]">
        <Image src={product.image} className="rounded-t" />
      </div>
      <div className="mt-3 mb-1 py-2 pl-1">
        <h2 className="text-xl font-semibold capitalize text-gray-900">
          {product.name}
        </h2>
        <p className="text-lg font-medium capitalize text-gray-700">
          Price:{" "}
          <span className=" text-blue-800 font-bold">${product.price}</span>
        </p>
        <p className="text-sm font-light capitalize text-gray-500">
          Brand: {product.brand}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
