import { getAllProduct } from '@/allApis'
import { Spinner } from '@/components'
import ProductTR from '@/components/common/Admin/TR/ProductTR'
import { paginate } from '@/components/common/Pagination/CategoryPagination'
import { Pagination } from 'flowbite-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const ProductManage = () => {
  const { data, isLoading, refetch } = getAllProduct()
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

  if (isLoading) return <Spinner />

  // Pagination Function
  const paginated_data = paginate(data, pageNumber)

  return (
    <>
      <Link href='/admin/productManage/addNewProduct'>
        <button className='border px-4 py-1 mb-2 flex justify-center items-center gap-1 rounded hover:bg-blue-700 hover:text-white duration-200'>
          Add New Product
        </button>
      </Link>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Images
              </th>
              <th scope='col' className='px-6 py-3'>
                Product Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Category
              </th>
            
              <th scope='col' className='px-6 py-3'>
                Price
              </th>
              <th scope='col' className='text-end pr-10 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated_data?.map((product) => (
              <ProductTR key={product.id} product={product} refetch={refetch} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-center text-center mt-10 '>
        <Pagination
          currentPage={pageNumber}
          layout='pagination'
          onPageChange={pageChange}
          showIcons
          totalPages={totalPage}
        />
      </div>
    </>
  )
}

export default ProductManage
