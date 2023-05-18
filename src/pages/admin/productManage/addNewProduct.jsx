import React, { useState, useEffect } from 'react'
import { getAllCategory, newProductAdd } from '@/allApis'
import { Button } from 'flowbite-react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'

const addNewProduct = () => {
  const [productImages, setProductImages] = useState([])

  // Category Data
  const {
    data: category,
    refetch,
    isLoading: categoryLoading,
  } = getAllCategory()

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
      images: productImages,
    })
  }

  // Cloudinary Img Upload

  const [imageSrc, setImageSrc] = useState(null)
  const [uploadData, setUploadData] = useState(null)

  useEffect(() => {
    if (uploadData?.secure_url) {
      setProductImages([...productImages, uploadData?.secure_url])
    }
  }, [uploadData])

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */

  function handleOnChange(changeEvent) {
    const reader = new FileReader()

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result)
      setUploadData(undefined)
    }

    reader.readAsDataURL(changeEvent.target.files[0])
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  async function handleOnSubmit(event) {
    event.preventDefault()

    const form = event.currentTarget
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'file'
    )

    const formData = new FormData()

    for (const file of fileInput?.files) {
      formData.append('file', file)
    }

    formData.append('upload_preset', 'electronics e-commerce')

    const data = await fetch(
      'https://api.cloudinary.com/v1_1/dqbxqqhx0/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    ).then((r) => r.json())

    setImageSrc(data.secure_url)

    setUploadData(data)
  }

  if (categoryLoading) return <h1>Loading...</h1>

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
            Select Product Images
          </label>
          <div className='flex justify-start items-center gap-5'>
            {productImages.map((productImage, index) => {
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
          {/* <input
            className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
            id='multiple_files'
            type='file'
            multiple
          /> */}
        </div>

        <Button type='submit'>Add Product</Button>
      </form>

      <div className='m-10'>
        <form method='post' onChange={handleOnChange} onSubmit={handleOnSubmit}>
          <div className='flex items-center justify-center w-full'>
            <label
              htmlFor='dropzone-file'
              className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
            >
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                <svg
                  aria-hidden='true'
                  className='w-10 h-10 mb-3 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                  ></path>
                </svg>
                <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                  <span className='font-semibold'>Click to upload</span> or drag
                  and drop
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                name='file'
                id='dropzone-file'
                type='file'
                multiple
                className='hidden'
              />
            </label>
          </div>

          {imageSrc && !uploadData && (
            <>
              <div className='relative inline'>
                <Image
                  className=' object-cover h-44 w-44 rounded-lg mt-10 mb-8'
                  alt='Image'
                  height={100}
                  width={100}
                  src={imageSrc}
                />
                <button
                  onClick={() => setImageSrc(null)}
                  type='button'
                  className='absolute top-1 left-1 bg-red-700 rounded-full text-white hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium  text-lg px-2 text-center mr-2 mb-2 '
                >
                  x
                </button>
              </div>
              <p>
                <button>Upload Files</button>
              </p>
            </>
          )}

          {/* {uploadData && (
            <code>
              <pre>{JSON.stringify(uploadData, null, 2)}</pre>
            </code>
          )} */}
        </form>
      </div>
    </div>
  )
}

export default addNewProduct
