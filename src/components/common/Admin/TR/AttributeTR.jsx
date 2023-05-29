import { removeAttribute } from '@/allApis/AttributeApis'
import React, { useEffect, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import EditAttributeModal from '../Modal/EditAttributeModal'


const AttributeTR = ({ attribute, refetch, index }) => {
  // State
  const [openModal, setOpenModal] = useState(false)
  const [category, setCategory] = useState({})

  // Attribute Data Destructors
  const { name, id, values, category_id } = attribute

  // Category Data
  useEffect(() => {
    fetch(`/api/category/single-category/${category_id}`, {
      // headers: {
      //   authorization: `Bearer ${getToken()}`,
      // },
    })
      .then((res) => res.json())
      .then((data) => {
        setCategory(data)
      })
  }, [category_id])


  // Attribute Delete Handler
  const handleDelete = () => {
    const del = window.confirm('Do you want to delete?')
    if (del) {
      removeAttribute(id, refetch)
    }
  }

  return (
    <tr className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
      <th
        scope='row'
        className='px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'
      >
        {index + 1}
      </th>
      <th
        scope='row'
        className='px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'
      >
        {name}
      </th>
      <td className='px-6 py-2'>
        {values.map((value) => (
          <span>{value + ' '}</span>
        ))}
      </td>
      <td
        scope='row'
        className='px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'
      >
        {category?.name}
      </td>
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
      <EditAttributeModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        attribute={attribute}
        category={category}
        refetch={refetch}
      />
    </tr>
  )
}

export default AttributeTR
