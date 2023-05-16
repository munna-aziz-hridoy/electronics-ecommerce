import React from "react";
import { getAllProduct } from "@/allApis";
import { ProductTR } from "@/components";

const ProductManage = () => {
  const { data, isLoading, refetch } = getAllProduct();
  if (isLoading) {
    <h1>Loading...</h1>;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Images
            </th>
            <th scope="col" className="px-6 py-3">
              Product Name
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Short Description
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="text-end pr-10 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((product) => (
            <ProductTR key={product.id} product={product} refetch={refetch} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManage;
