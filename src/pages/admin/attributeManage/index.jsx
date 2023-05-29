import {  getAllSubCategory } from '@/allApis'
import {  Spinner } from '@/components'
import React, { useState } from 'react'
import AttributeModal from '@/components/common/Admin/Modal/AttributeModal'
import { getAllAttribute } from '@/allApis/AttributeApis'
import AttributeTR from '@/components/common/Admin/TR/AttributeTR'

const CategoryManage = () => {
  // States
  const [openModal, setOpenModal] = useState(false)

  //All Sub Category
  const {
    isLoading: subCategoryLoading,
    data: subCategory,
    // refetch,
  } = getAllSubCategory()

  // All Attributes
    const { isLoading, refetch, data } = getAllAttribute()
  
  console.log(data)


  if (subCategoryLoading) return <Spinner />

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className='border px-4 py-1 mb-2 flex justify-center items-center gap-1 rounded hover:bg-blue-700 hover:text-white duration-200'
      >
        Add New Attribute
      </button>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Attribute Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Attribute Values
              </th>
              <th scope='col' className='text-end pr-10 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((attribute) => (
              <AttributeTR
                key={attribute.id}
                attribute={attribute}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      <AttributeModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        category={subCategory}
        refetch={refetch}
        // parentRefetch={parentRefetch}
      />
    </>
  )
}

export default CategoryManage
