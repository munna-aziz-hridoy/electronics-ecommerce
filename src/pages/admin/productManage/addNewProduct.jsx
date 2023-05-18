import React, { useState } from 'react'
import {  getAllSubCategory, newProductAdd } from '@/allApis'
import { Button } from 'flowbite-react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import ImageUploadModal from '@/components/common/Admin/Modal/ImageUploadModal'
import { Spinner } from "@/components";

const addNewProduct = () => {
  // States
  //  Product Image (Selected Image) && Image Add Model
  const [uploadedImages, setUploadedImages] = useState([])
  const [openModal, setOpenModal] = useState(false)

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
    formState: { errors },
  } = useForm()

  // Add Product Function
  const onSubmit = (data) => {
    newProductAdd({
      ...data,
      images: uploadedImages,
    })
  }

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
          <textarea
            {...register('description', { required: true })}
            id='short_description'
            rows='4'
            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Write a description about this product...'
          ></textarea>
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
        <div className='mb-4'>
          <label
            htmlFor='price'
            className='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
          >
            Product Price
          </label>
          <input
            {...register('price', { required: true })}
            type='number'
            name='price'
            id='price'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
            placeholder='Product Price'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            className='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
            htmlFor='multiple_files'
          >
            Selected Product Images
          </label>
          <div className='flex justify-start items-center gap-5'>
            {uploadedImages?.map((productImage, index) => {
              return (
                <Image
                  key={index}
                  className=' object-cover h-32 w-32 rounded-lg mb-8'
                  alt='Image'
                  height={100}
                  width={100}
                  src={productImage}
                />
              )
            })}
          </div>
          <div>
            <button
              onClick={() => setOpenModal(true)}
              type='button'
              className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
            >
              Add Product Image
            </button>
            {uploadedImages?.length > 0 && (
              <button
                onClick={() => setUploadedImages(null)}
                type='button'
                className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
              >
                Remove All
              </button>
            )}
          </div>
        </div>

        <Button type='submit'>Add Product</Button>
      </form>
      {/* Image Upload Modal  */}
      <ImageUploadModal
        allStates={{
          uploadedImages,
          setUploadedImages,
          openModal,
          setOpenModal,
        }}
      />
    </div>
  )
}

export default addNewProduct
