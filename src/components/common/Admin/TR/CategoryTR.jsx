import { removeCategory } from '@/allApis/CategoryApis'
import React, { useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import EditCategoryModal from '../Modal/EditCategoryModal'


const CategoryTR = ({ category, refetch }) => {
  const [ openModal,setOpenModal]=useState(false)
  const { name, id, slug, parent_id,image } = category

  const handleDelete = () => {
    const del = window.confirm('Do you want to delete?')
    if (del) {
      removeCategory(id, refetch)
    }
  }

  return (
    <tr className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
      <th
        scope='row'
        className='px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'
      >
        <img
          className=' object-cover h-12 w-12 border rounded-lg '
          alt='Img'
          // height={100}
          // width={100}
          src={
            image ||
            'https://ps.w.org/gazchaps-woocommerce-auto-category-product-thumbnails/assets/icon-256x256.png?rev=1848416'
          }
        />
      </th>
      <th
        scope='row'
        className='px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'
      >
        {name}
      </th>
      <td className='px-6 py-2'>{parent_id || 'No Parent'}</td>
      <td className='px-6 py-2'>
        <div className='flex justify-end items-center gap-7 pr-4 text-2xl '>
          <button
            onClick={() => setOpenModal(true)}
            className='duration-300 rounded-md p-1 hover:bg-green-600 hover:text-gray-50 '
          >
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
      <EditCategoryModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        category={category}
      />
    </tr>
  )
}

export default CategoryTR
