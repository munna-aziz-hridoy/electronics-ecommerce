import React, { useEffect, useState } from 'react'
import { getAllUser } from '@/allApis'
import { Spinner } from '@/components'
import OrderTR from '@/components/common/Admin/TR/OrderTR'
import { getAllOrders } from '@/allApis/order'
import { Pagination } from 'flowbite-react'
import { paginate } from '@/components/common/Pagination/CategoryPagination'

const OrderManage = () => {
  const { data, isLoading, refetch } = getAllOrders()

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

  if (isLoading) {
    return <Spinner />
  }
  // Pagination Function
  const paginated_data = paginate(data, pageNumber)

  return (
    <>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              {/* Add more here */}
              <th scope='col' className='px-6 py-3'>
                Order Id
              </th>
              <th scope='col' className='px-6 py-3'>
                Date
              </th>
              <th scope='col' className='text-end pr-10 py-3'>
                Total Price
              </th>
              <th scope='col' className='text-end pr-10 py-3'>
                Total Products
              </th>
              <th scope='col' className='text-end pr-10 py-3'>
                Delivery Status
              </th>
              <th scope='col' className='text-end pr-10 py-3'>
                Payment Status
              </th>
              <th scope='col' className='text-end pr-10 py-3'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated_data?.map((order) => (
              <OrderTR key={order.id} order={order} refetch={refetch} />
            ))}
          </tbody>
        </table>
      </div>{' '}
      {/* Pagination */}
      <div className='flex items-center justify-center text-center mt-10'>
        <Pagination
          currentPage={pageNumber}
         
          onPageChange={pageChange}
      
          showIcons
          totalPages={totalPage}
        />
      </div>
    </>
  )
}

export default OrderManage
