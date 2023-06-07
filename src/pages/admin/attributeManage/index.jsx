import {  getAllSubCategory } from '@/allApis'
import {  Spinner } from '@/components'
import React, { useEffect, useState } from 'react'
import AttributeModal from '@/components/common/Admin/Modal/AttributeModal'
import { getAllAttribute } from '@/allApis/AttributeApis'
import AttributeTR from '@/components/common/Admin/TR/AttributeTR'
import { getParentCategory } from '@/allApis/CategoryApis'
import { paginate } from '@/components/common/Pagination/CategoryPagination'
import { Pagination } from 'flowbite-react'

const CategoryManage = () => {
  // States
  const [openModal, setOpenModal] = useState(false)

  //All Sub Category
  const {
    isLoading: subCategoryLoading,
    data: category,
    // refetch,
  } = getParentCategory()

  // All Attributes
  const { isLoading, refetch, data } = getAllAttribute()

  // Pagination Pages
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const pageChange = (page) => {
    setPageNumber(page)
  }
  useEffect(() => {
    const p = Math.ceil(data?.length / 8)
    if (p > 0) {
      setTotalPage(p)
    }
  }, [data])

  if (isLoading || subCategoryLoading) return <Spinner />

  // Pagination Function
  const paginated_data = paginate(data, pageNumber)

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
                No
              </th>
              <th scope='col' className='px-6 py-3'>
                Attribute Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Attribute Values
              </th>
              <th scope='col' className='px-6 py-3'>
                Category
              </th>
              <th scope='col' className='text-end pr-10 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated_data?.map((attribute, index) => (
              <AttributeTR
                key={attribute.id}
                attribute={attribute}
                refetch={refetch}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-center text-center mt-10 md:mr-56'>
        <Pagination
          currentPage={pageNumber}
          layout='pagination'
          
          onPageChange={pageChange}
       
          showIcons
          totalPages={totalPage}
        />
      </div>

      {/* Modal */}
      <AttributeModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        category={category}
        refetch={refetch}
        // parentRefetch={parentRefetch}
      />
    </>
  )
}

export default CategoryManage
