import { getAllProduct } from "@/allApis";
import ProductTR from "@/components/common/Admin/ProductTR";
import Link from "next/link";
import React from "react";

const ProductManage = () => {
  const { data, isLoading, refetch } = getAllProduct();
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <Link href="/admin/productManage/addNewProduct">
        <button className="border px-4 py-1 mb-2 flex justify-center items-center gap-1 rounded hover:bg-blue-700 hover:text-white duration-200">
          Add New Product
        </button>
      </Link>
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
    </>
  );
};

export default ProductManage;
