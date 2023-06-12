import { removeCategory } from '@/allApis/CategoryApis'
import React, { useState, useEffect } from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import EditCategoryModal from '../Modal/EditCategoryModal'
import { useRouter } from 'next/router'
import Spinner from '../../Spinner'

const CategoryTR = ({ category, refetch }) => {
  const [openModal, setOpenModal] = useState(false)
  const { name, id, slug, parent_id, image } = category
  const [categoryName, setCategoryName] = useState('')

  
  // Test
  const [s, setS] = useState(false)
  const router = useRouter()
  const currentPath = router.asPath

  useEffect(() => {
    const h = currentPath.includes(id)
    if (h) {
      setS(true)
    }
  }, [currentPath])

  
  // Category Data// Category Data
  useEffect(() => {
    if (parent_id) {
      fetch(`/api/category/single-category/${parent_id}`)
        .then((res) => res.json())
        .then((data) => {
          setCategoryName(data?.name)
      
        })
        .catch((error) => {
          console.error('Error while parsing JSON:', error)
        })
    }
  }, [parent_id])


  const handleDelete = () => {
    const del = window.confirm('Do you want to delete?')
    if (del) {
      removeCategory(id, refetch)
    }
  }

  return (
    <tr id={id} className={` border-b ${s ? 'bg-red-500' : ''}`}>
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
      <td className={` px-6 py-2`}>
        <span
          className={`${
            parent_id ? 'bg-green-500' : 'bg-red-500 '
          } text-gray-100 px-3 py-1 rounded-full`}
        >
          {categoryName || 'This is a Parent'}
        </span>
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
      <EditCategoryModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        category={category}
        refetch={refetch}
      />
    </tr>
  )
}

export default CategoryTR
