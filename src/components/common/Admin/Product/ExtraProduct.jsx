import React from 'react'
import { GrStackOverflow } from 'react-icons/gr'
import ExtraProductsItem from './ExtraProductsItem'

const ExtraProduct = ({ extraData, setOpenExtraModal }) => {
  return (
    <>
      <label
        htmlFor='extra-price'
        className='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
      >
        Product Variant (Optional)
      </label>
      <div
        id='extra-price'
        className='mb-4 p-2.5 rounded-lg border-double border-4 border-sky-300'
      >
        <div className='p-5'>
          {extraData?.map((data) => (
            <ExtraProductsItem data={data} />
          ))}
        </div>
        <button
          onClick={() => setOpenExtraModal(true)}
          type='button'
          className='hover:-translate-y-2 duration-300 flex items-center gap-2 focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-4 ml-8 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800'
        >
          <GrStackOverflow />
          Add Variant Product
        </button>
      </div>
    </>
  )
}

export default ExtraProduct
