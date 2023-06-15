import { ProductContext } from '@/context/product'
import React, { useContext } from 'react'

const EditExtraProductsItem = ({ data }) => {
  const {  _id, variant_name, variant_value, price, images } = data
  // Product Context
  const { editExtraData, setEditExtraData } = useContext(ProductContext)
  

  // remove one by one
  const removeExtraProductItem = () => {
    const isExist = editExtraData.filter((extra) => extra._id !== _id)
    setEditExtraData(isExist)
  }

  return (
    <div className='border-dashed border-2 border-yellow-300 bg-gray-100 m-4 p-6 rounded-lg relative'>
      <div
        onClick={removeExtraProductItem}
        className=' absolute cursor-pointer top-4 shadow-lg right-5 border-2 border-red-500 text-red-500 font-bold hover:bg-red-600 hover:text-gray-100 duration-300 rounded-full px-2'
      >
        x
      </div>
      <div className='mb-4'>
        <label
          htmlFor={`Variant_Name_${_id}`}
          className='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
        >
          Variant Name/Title
        </label>
        <input
          value={variant_name}
          type='text'
          name='name'
          id={`Variant_Name_${_id}`}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
          disabled
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor={`Variant_Value_${_id}`}
          className='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
        >
          Variant Value
        </label>
        <input
          value={variant_value}
          type='text'
          name='name'
          id={`Variant_Value_${_id}`}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
          disabled
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor={`Item Name ${_id}`}
          className='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
        >
          Price
        </label>
        <input
          value={price}
          type='text'
          name='name'
          id={`Item Name ${_id}`}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
          disabled
        />
      </div>
      <div className='mt-4 flex justify-between items-end'>
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
        <div>
          <button className='bg-blue-500 text-gray-100 hover:bg-blue-700 px-4 py-0.5 rounded duration-300'>
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditExtraProductsItem
