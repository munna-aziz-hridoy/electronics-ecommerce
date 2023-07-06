import { ProductContext } from "@/context/product";
import React, { useContext, useState } from "react";
import EditExtraModal from "../Modal/EditExtraModal";

const EditExtraProductsItem = ({ data }) => {
  const { _id, price, variations, quantity, images } = data;

  const [openModal, setOpenModal] = useState(false);
  // Product Context
  const { extraData, setExtraData } = useContext(ProductContext);

  // remove one by one
  const removeExtraProductItem = () => {
    const isExist = extraData.filter((extra) => extra._id !== _id);
    setExtraData(isExist);
  };

  return (
    <>
      <div className="border-dashed border-2 border-yellow-300 bg-gray-100 m-4 p-6 rounded-lg relative">
        <div
          onClick={removeExtraProductItem}
          className=" absolute cursor-pointer top-4 shadow-lg right-5 border-2 border-red-500 text-red-500 font-bold hover:bg-red-600 hover:text-gray-100 duration-300 rounded-full px-2"
        >
          x
        </div>
        <div className="flex flex-col md:flex-row justify-center  items-stretch gap-2 mr-10">
          <div className="p-4 border rounded-lg border-gray-400 mt-4 w-full md:w-1/2">
            {variations.map((variation) => {
              const { variant_name, variant_value, id } = variation;
              return (
                <p className=" text-lg font-bold text-gray-700 capitalize flex justify-start items-center gap-2">
                  {variant_name}:{" "}
                  <span className="text-green-600">{variant_value}</span>
                  {variant_name?.toLowerCase()?.includes("color") && (
                    <span
                      className="inline-block w-4 h-4 rounded"
                      style={{
                        background: variant_value?.toLowerCase(),
                      }}
                    />
                  )}
                </p>
              );
            })}
          </div>

          <div className="p-4 border rounded-lg border-gray-400 mt-4 w-full md:w-1/2">
            <p className="text-lg font-bold text-gray-700 capitalize">
              Price: <span className="text-green-600">{price}</span>
            </p>
            <p className="text-lg font-bold text-gray-700 capitalize">
              Available Quantity:{" "}
              <span className="text-green-600">{quantity}</span>
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-end">
          <div className="flex justify-start items-center gap-5">
            {images?.map((productImage, index) => {
              return (
                <img
                  key={index}
                  className=" object-cover h-28 w-28 rounded-lg "
                  alt="Image"
                  height={100}
                  width={100}
                  src={productImage}
                />
              );
            })}
          </div>
          <div>
            <div
              onClick={() => setOpenModal(true)}
              className="bg-blue-500 hover:cursor-pointer text-gray-100 hover:bg-blue-700 px-4 py-0.5 rounded duration-300"
            >
              Edit
            </div>
          </div>
        </div>
      </div>
      <EditExtraModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        data={data}
      />
    </>
  );
};

export default EditExtraProductsItem;
