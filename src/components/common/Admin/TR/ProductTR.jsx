import { removeProduct } from '@/allApis/ProductApis'
import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'

const ProductTR = ({ product, refetch }) => {
  const { name, id, category, price, description, short_description, images } =
    product 
  
  const handleDelete = () => {
    const del = window.confirm('Do you want delete?')
    if (del) {
      removeProduct(id, refetch)
    }
  }
  return (
    <tr className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
      <th
        scope='row'
        className='px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'
      >
        <div className='flex justify-start items-center gap-2'>
          {images?.map((productImage, index) => {
            return (
              <img
                key={index}
                className=' object-cover h-12 w-12 border rounded-lg '
                alt='Image'
                // height={100}
                // width={100}
                src={productImage}
              />
            )
          })}
        </div>
      </th>
      <th
        scope='row'
        className='px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'
      >
        {name}
      </th>
      <td className='px-6 py-2'>{category?.name}</td>
      {/* <td className="px-6 py-2 max-w-lg break-words">{description.slice(0,250)}</td> */}
      {/* <td className="px-6 py-2">{short_description}</td> */}
      <td className='px-6 py-2'>{price}</td>
      <td className='px-6 py-2'>
        <div className='flex justify-end items-center gap-7 pr-4 text-2xl '>
          <button className='duration-300 rounded-md p-1 hover:bg-green-600 hover:text-gray-50 '>
            <BiEdit />
          </button>
          <button
            onClick={handleDelete}
            className='duration-300 rounded-md p-1 hover:bg-red-600 hover:text-gray-50 '
          >
            <MdDelete />
          </button>
        </div>
      </td>
    </tr>
  )
};

export default ProductTR;
