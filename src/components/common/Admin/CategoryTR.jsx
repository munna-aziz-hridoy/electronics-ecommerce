import { removeCategory } from '@/allApis/CategoryApis'
import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'

const CategoryTR = ({ category, refetch }) => {
  const { name, id, slug, parent_id } = category

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
        {name}
      </th>
      <td className='px-6 py-2'>{parent_id}</td>
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
}

export default CategoryTR
