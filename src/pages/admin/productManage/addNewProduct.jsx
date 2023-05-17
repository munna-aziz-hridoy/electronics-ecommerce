import React from "react";
import { getAllCategory, newProductAdd } from "@/allApis";
import { Button } from "flowbite-react";
import { useForm } from "react-hook-form";

const addNewProduct = () => {
  // Category Data
  const {
    data: category,
    refetch,
    isLoading: categoryLoading,
  } = getAllCategory();

  // Main hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // Add Product Function
  const onSubmit = (data) => {
    newProductAdd({
      ...data,
      images: [data?.images],
    });
  };

  if (categoryLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-bold text-gray-600 dark:text-white"
          >
            Product Name
          </label>
          <input
            {...register("name", { required: true })}
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Product Name/ Title"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-bold text-gray-600 dark:text-white"
          >
            Select Category
          </label>
          <select
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            {...register("category")}
          >
            {category?.map((category) => (
              <option key={category?.id} value={category?.id}>
                {category?.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-bold text-gray-600 dark:text-white"
          >
            Description
          </label>
          <textarea
            {...register("description", { required: true })}
            id="short_description"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write a description about this product..."
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="short_description"
            className="block mb-2 text-sm font-bold text-gray-600 dark:text-white"
          >
            Short Description
          </label>
          <textarea
            {...register("short_description", { required: true })}
            id="short_description"
            rows="2"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write a short description about this product..."
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-bold text-gray-600 dark:text-white"
          >
            Product Price
          </label>
          <input
            {...register("price", { required: true })}
            type="number"
            name="price"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Product Price"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="images"
            className="block mb-2 text-sm font-bold text-gray-600 dark:text-white"
          >
            Product Images
          </label>
          <input
            {...register("images", { required: true })}
            type="text"
            name="images"
            id="images"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Product Images"
            required
          />
        </div>
        <Button type="submit">Add Product</Button>
      </form>
    </div>
  );
};

export default addNewProduct;
