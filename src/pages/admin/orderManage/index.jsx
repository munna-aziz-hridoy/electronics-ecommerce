import React from 'react'
import { getAllUser } from '@/allApis'
import { Spinner } from '@/components'
import OrderTR from '@/components/common/Admin/TR/OrderTR'

const OrderManage = () => {
  const { data, isLoading, refetch } = getAllUser()
  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              {/* Add more here */}
              <th scope='col' className='px-6 py-3'>
                Product Name
              </th>
              <th scope='col' className='px-6 py-3'>
                 Address
              </th>
              <th scope='col' className='text-end pr-10 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((order) => (
              <OrderTR key={order.id} user={order} refetch={refetch} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default OrderManage
