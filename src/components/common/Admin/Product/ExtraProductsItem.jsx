import Image from "next/image";
import React from "react";

const ExtraProductsItem = ({ data }) => {
  const { id, variant_name, variant_value, price, images } = data
  
  console.log(data)
  return (
    <div className='border-dashed border-2 border-yellow-300 bg-gray-100 m-4 p-6 rounded-lg'>
      <div className='mb-4'>
        <label
          htmlFor={`Variant_Name_${id}`}
          className='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
        >
          Variant Name/Title
        </label>
        <input
          value={variant_name}
          type='text'
          name='name'
          id={`Variant_Name_${id}`}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
          disabled
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor={`Variant_Value_${id}`}
          className='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
        >
          Variant Value
        </label>
        <input
          value={variant_value}
          type='text'
          name='name'
          id={`Variant_Value_${id}`}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
          disabled
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor={`Item Name ${id}`}
          className='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
        >
          Price
        </label>
        <input
          value={price}
          type='text'
          name='name'
          id={`Item Name ${id}`}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
          disabled
        />
      </div>
      <div className='mt-4'>
        <div className='flex justify-start items-center gap-5'>
          {images?.map((productImage, index) => {
            return (
              <img
                key={index}
                className=' object-cover h-28 w-28 rounded-lg '
                alt='Image'
                height={100}
                width={100}
                src={productImage}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
};

export default ExtraProductsItem;
