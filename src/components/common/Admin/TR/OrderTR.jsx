import { removeUser } from '@/allApis/AllUserApis'
import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'

const OrderTR = ({ user, refetch }) => {
  const { name, id, email } = user
  const handleDelete = () => {
    const del = window.confirm('Do you want to delete?')
    if (del) {
      removeUser(id, refetch)
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
      <td className='px-6 py-2'>{email}</td>
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

export default OrderTR
