import React, { useState, useRef, useContext } from "react";
import { getAllSubCategory, newProductAdd } from "@/allApis";
import { Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import ImageUploadModal from "@/components/common/Admin/Modal/ImageUploadModal";
import { Spinner } from "@/components";
import { useRouter } from "next/router";
import { BsArrowBarLeft, BsBuildingFillAdd, BsImageFill } from "react-icons/bs";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { GiOverdose } from "react-icons/gi";
import { GrStackOverflow } from "react-icons/gr";
import dynamic from "next/dynamic";
import AddExtraModal from "@/components/common/Admin/Modal/AddExtraModal";
import ExtraProduct from "@/components/common/Admin/Product/ExtraProduct";
import { ProductContext } from "@/context/product";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const addNewProduct = () => {
  // States
  //  Product Image (Selected Image) && Image Add Model
  const [uploadedImages, setUploadedImages] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openExtraModal, setOpenExtraModal] = useState(false);
  const {extraData, setExtraData} = useContext(ProductContext);

  // editor
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const router = useRouter();

  // Category Data Get
  const {
    data: category,
    refetch,
    isLoading: categoryLoading,
  } = getAllSubCategory();

  // Main hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const goBack = () => {
    router.push('/admin/productManage')
  }

  // Add Product Function
  const onSubmit = (data) => {
    newProductAdd(
      {
        ...data,
        images: uploadedImages,
        extras: extraData,
        description: `${content}`,
      },
      reset,
      setExtraData,
      goBack
    )
  };

  if (categoryLoading) return <Spinner />;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4'>
          <label
            htmlFor='name'
            className='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
          >
            Product Name
          </label>
          <input
            {...register('name', { required: true })}
            type='text'
            name='name'
            id='name'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
            placeholder='Product Name/ Title'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='category'
            className='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
          >
            Select Category
          </label>
          <select
            className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
            {...register('category')}
          >
            <option disabled selected>
              Select Category
            </option>
            {category?.map((category) => (
              <option key={category?.id} value={category?.id}>
                {category?.name}
              </option>
            ))}
          </select>
        </div>
        <div className='mb-4'>
          <label
            htmlFor='description'
            className='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
          >
            Description
          </label>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='short_description'
            className='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
          >
            Short Description
          </label>
          <textarea
            {...register('short_description', { required: true })}
            id='short_description'
            rows='2'
            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Write a short description about this product...'
          ></textarea>
        </div>
        <div className='mt-4'>
          {uploadedImages?.length > 0 && (
            <label
              className='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
              htmlFor='multiple_files'
            >
              Selected Product Images
            </label>
          )}
          <div className='flex justify-start items-center gap-5'>
            {uploadedImages?.map((productImage, index) => {
              return (
                <img
                  key={index}
                  className=' object-cover h-32 w-32 rounded-lg mb-8'
                  alt='Image'
                  src={productImage}
                />
              )
            })}
          </div>
          <div className='flex items-center'>
            <button
              onClick={() => setOpenModal(true)}
              type='button'
              className='hover:-translate-y-2 duration-300 flex items-center gap-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
            >
              <BsImageFill />
              Add Product Image
            </button>
            {uploadedImages?.length > 0 && (
              <button
                onClick={() => setUploadedImages([])}
                type='button'
                className='flex items-center gap-2 hover:translate-x-2 hover:translate-y-2 duration-300 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
              >
                <RiDeleteBin2Fill />
                {uploadedImages?.length === 1 ? 'Remove' : 'Remove All'}
              </button>
            )}
          </div>
        </div>
        <div className='mb-4'>
          <label
        
            className='block  text-sm font-bold text-gray-600 dark:text-white'
          >
            Available Quantity
          </label>
          <input
            {...register('quantity', { required: true })}
            type='text'
      
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
            placeholder='Available Quantity'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='price'
            className='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
          >
            Product Price
          </label>
          <input
            {...register('price', { required: true })}
            type='text'
            name='price'
            id='price'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
            placeholder='Product Price'
            required
          />
        </div>
        {/* extra Product Section */}
        <ExtraProduct setOpenExtraModal={setOpenExtraModal} />
        <div className='flex justify-between md:justify-end items-center mb-4'>
          <button
            onClick={() => router.back()}
            type='button'
            className='hover:-translate-x-2 duration-300 flex items-center gap-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
          >
            <BsArrowBarLeft />
            Go Back
          </button>
          <button
            className='hover:-translate-y-2 duration-300 flex items-center gap-2 focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900'
            type='submit'
          >
            <BsBuildingFillAdd className='mr-2' /> Add Product
          </button>
        </div>
      </form>
      {/* Image Upload Modal  */}
      <ImageUploadModal
        allStates={{
          setUploadedImages,
          openModal,
          setOpenModal,
        }}
        isMultiple={true}
      />
      {/* Add Extra Modal */}
      <AddExtraModal
        openModal={openExtraModal}
        setOpenModal={setOpenExtraModal}
        // states={{ extraData, setExtraData }}
      />
    </div>
  )
};

export default addNewProduct;
