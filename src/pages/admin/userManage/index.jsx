import { useGetAllUser } from '@/allApis/getAllUser'
import React from 'react'
import UserTR from '@/components/common/Admin/UserTR'

const UserManage = () => {
  const { data, isLoading, refetch } = useGetAllUser()
  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              User Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Email Address
            </th>
            <th scope='col' className='text-end pr-10 py-3'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user) => (
            <UserTR key={user.id} user={user} refetch={refetch} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserManage
