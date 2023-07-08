import React, { useEffect } from 'react'
import useAuthStore from '@/store/auth'
import { Container, Spinner } from '@/components'
import { getUserOrders } from '@/allApis/order'
import { useRouter } from 'next/router'

function Profile() {
  const { user } = useAuthStore()

  const { data, isLoading } = getUserOrders(user?.id)

  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
      return null
    }
  }, [user])

  return (
    <Container>
      <div className='bg-white shadow-md rounded-md p-4 mt-10'>
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-2xl font-bold'>Profile</h1>
          <a href='#' className='text-blue-500 hover:text-blue-700'>
            Logout
          </a>
        </div>

        <div className='flex flex-col md:flex-row gap-4'>
          <div className='md:w-[25%]'>
            <h2 className='text-lg font-semibold mb-4'>User Information</h2>
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2' for='name'>
                Name:
              </label>
              <p className='py-2 px-3 bg-gray-100 rounded-md'>{user?.name}</p>
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2' for='email'>
                Email:
              </label>
              <p className='py-2 px-3 bg-gray-100 rounded-md'>{user?.email}</p>
            </div>
          </div>

          <div className='md:w-[75%]'>
            <h2 className='text-lg font-semibold mb-4'>Order History</h2>
            <div className='bg-gray-100 rounded-md p-4'>
              {isLoading ? (
                <Spinner />
              ) : data && data?.length > 0 ? (
                <table className='min-w-full divide-y divide-gray-300'>
                  <thead>
                    <tr>
                      <th className='px-4 py-2 text-left'>Order ID</th>
                      <th className='px-4 py-2 text-left'>Date</th>
                      <th className='px-4 py-2 text-left'>Total Amount</th>
                      <th className='px-4 py-2 text-left'>Total products</th>
                      <th className='px-4 py-2 text-left'>Payment Status</th>
                      <th className='px-4 py-2 text-left'>Delivery Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((order, i) => (
                      <tr key={i}>
                        <td className='px-4 py-2'>{order?.id}</td>
                        <td className='px-4 py-2'>
                          {order?.created_at?.split('T')[0]}
                        </td>
                        <td className='px-4 py-2'> £ {order?.total_price}</td>
                        <td className='px-4 py-2'>
                          {' '}
                          £ {order?.total_products}
                        </td>
                        <td className='px-4 py-2'>
                          {order?.paid ? 'Paid' : 'Unpaid'}
                        </td>
                        <td className='px-4 py-2'>
                          {order?.delivery ? 'Delivered' : 'In progress'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No order history</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Profile
