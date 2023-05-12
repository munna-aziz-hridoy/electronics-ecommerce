import { useGetAllCategory } from '@/allApis/getAllCategory'
import CategoryTR from '@/components/common/Admin/CategoryTR'
import CategoryModal from '@/components/common/Admin/Modal/CategoryModal'
import React, { useState } from 'react'

const CategoryManage = () => {
  const [openModal, setOpenModal] = useState(false)
  const { data, refetch, isLoading } = useGetAllCategory()

  if (isLoading) {
    ;<h1>Loading...</h1>
  }
  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className='border px-4 py-1 mb-2 flex justify-center items-center gap-1 rounded hover:bg-blue-700 hover:text-white duration-200'
      >
        Add New Category
      </button>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Category Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Parent Category
              </th>
              <th scope='col' className='text-end pr-10 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((category) => (
              <CategoryTR
                key={category.id}
                category={category}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      <CategoryModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        category={data}
        refetch={refetch}
      />
    </>
  )
}

export default CategoryManage
