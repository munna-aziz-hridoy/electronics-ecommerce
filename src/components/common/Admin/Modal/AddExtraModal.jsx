import { Button, Modal } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ImageUploadModal from "./ImageUploadModal";
import { BsImageFill } from "react-icons/bs";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { getAllAttribute } from "@/allApis/AttributeApis";
import { ProductContext } from "@/context/product";

const AddExtraModal = ({ setOpenModal, openModal }) => {
  // States
  // variations and value
  const [variationsAndValue, setVariationsAndValue] = useState([]);

  // Selected variant ID
  const [selectedVariantID, setSelectedVariantID] = useState("");

  // Selected Variant
  const [selectedVariant, setSelectedVariant] = useState({});

  // Selected Variant Value
  const [selectedVariantValue, setSelectedVariantValue] = useState("");

  // Quantity And Price
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  // Variations And Value Set Function
  const handleVariationsAndValue = () => {
    setVariationsAndValue([
      ...variationsAndValue,
      {
        variant_name: selectedVariant.name,
        variant_value: selectedVariantValue,
      },
    ]);
    setSelectedVariantValue("");
  };

  // Image and Modal States
  const [openImageModal, setOpenImageModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  // Product Context
  const { extraData, setExtraData } = useContext(ProductContext);

  // UU Id
  const { uuid } = require("uuidv4");

  // Attribute Data
  const {
    data: attributes,
    isLoading: attributesLoading,
    refetch,
  } = getAllAttribute();

  // Initial selected Variant
  useEffect(() => {
    if (attributes) {
      setSelectedVariantID(attributes[0].id);
    }
  }, [attributes]);

  useEffect(() => {
    const a = attributes?.find(
      (attribute) => attribute?.id === selectedVariantID
    );
    if (a) {
      setSelectedVariant(a);
    }
  }, [selectedVariantID]);

  const handleExtraDataAdd = () => {
    setExtraData([
      ...extraData,
      {
        _id: uuid(),
        variations: variationsAndValue,
        images: uploadedImages,
        quantity: quantity,
        price: price,
      },
    ]);
    setUploadedImages([]);
    setOpenModal(false);
  };
  return (
    <React.Fragment>
      <Modal
        show={openModal}
        size="2xl"
        popup={true}
        onClose={() => {
          reset();
          setUploadedImages([]);
          setOpenModal(false);
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="">
            <h3 className="text-center mb-5 text-xl font-bold text-gray-500 dark:text-gray-400">
              Add Variant
            </h3>
            <>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-bold text-gray-600 dark:text-white"
                >
                  Select Variant
                </label>
                <select
                  value={selectedVariantID}
                  onChange={(e) => {
                    setSelectedVariantID(e.target.value);
                  }}
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                >
                  <option selected disabled value="">
                    Select a Variant
                  </option>

                  {attributes?.map((attribute) => {
                    return (
                      <option key={attribute?.id} value={attribute.id}>
                        {attribute?.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-bold text-gray-600 dark:text-white"
                >
                  Select Variant value
                </label>
                <select
                  value={selectedVariantValue}
                  onChange={(e) => setSelectedVariantValue(e.target.value)}
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                >
                  <option selected disabled value="">
                    Select a Variant value
                  </option>

                  {selectedVariant?.values?.map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <button
                  onClick={() => handleVariationsAndValue()}
                  className="border text-gray-100 font-medium bg-blue-500 hover:bg-blue-700 duration-300 px-3 pt-0.5 rounded-md mb-4"
                >
                  Add more
                </button>
                {variationsAndValue.map((value, index) => (
                  <div className="text-sm">
                    <span>Variant Name: {value?.variant_name}</span>
                    <span>Variant Value: {value?.variant_value}</span>
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <label className="block  text-sm font-bold text-gray-600 dark:text-white">
                  Available Quantity
                </label>
                <input
                  onChange={(e) => setQuantity(e.target.value)}
                  type="text"
                  value={quantity}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Available Quantity"
                />
              </div>
              <div className="mb-4">
                <label className="block  text-sm font-bold text-gray-600 dark:text-white">
                  Price
                </label>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Price"
                />
              </div>

              <div className="mt-4">
                {uploadedImages?.length > 0 && (
                  <label
                    className="block mb-2 text-sm font-bold text-gray-600 dark:text-white"
                    htmlFor="multiple_files"
                  >
                    Selected Product Images
                  </label>
                )}
                <div className="flex justify-start items-center gap-5">
                  {uploadedImages?.map((productImage, index) => {
                    return (
                      <img
                        key={index}
                        className=" object-cover h-20 w-20 rounded-lg mb-8"
                        alt="Image"
                        src={productImage}
                      />
                    );
                  })}
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => setOpenImageModal(true)}
                    type="button"
                    className="hover:-translate-y-2 duration-300 flex items-center gap-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    <BsImageFill />
                    Add Image
                  </button>
                  {uploadedImages?.length > 0 && (
                    <button
                      onClick={() => setUploadedImages([])}
                      type="button"
                      className="hover:-translate-y-2 duration-300 flex items-center gap-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                      <RiDeleteBin2Fill />
                      {uploadedImages?.length === 1 ? "Remove" : "Remove All"}
                    </button>
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-5 mx-1">
                <Button
                  onClick={handleExtraDataAdd}
                  className="bg-lime-500 hover:bg-lime-600 "
                >
                  Add Variant
                </Button>
                <Button
                  color="failure"
                  onClick={() => {
                    reset();
                    setUploadedImages([]);
                    setOpenModal(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </>
          </div>
        </Modal.Body>
      </Modal>
      {/* Image Modal */}

      <ImageUploadModal
        allStates={{
          setUploadedImages,
          openModal: openImageModal,
          setOpenModal: setOpenImageModal,
        }}
        isMultiple={true}
      />
    </React.Fragment>
  );
};

export default AddExtraModal;
