import useGetSearchProducts from "@/hooks/useGetSearchProducts";
import React from "react";
import { ProductCard, Spinner } from "..";

const LatestProduct = ({ title = true }) => {
  const { products, loading } = useGetSearchProducts();

  return (
    <div className="my-14">
      {title && (
        <h2 className="text-center text-2xl font-semibold text-gray-700 mt-10 mb-5">
          Related Products
        </h2>
      )}
      <div className="flex items-center justify-center gap-12 flex-wrap">
        {loading && <Spinner />}

        {products.slice(0, 3).map((item) => (
          <div className="max-w-[280px]">
            <ProductCard product={item} sub />
          </div>
        ))}
      </div>{" "}
    </div>
  );
};

export default LatestProduct;
