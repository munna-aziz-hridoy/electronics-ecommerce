import React, { useEffect, useState } from "react";
import { getAllUser } from "@/allApis";
import { UserTR, AddUserModal, Spinner } from "@/components";
import { paginate } from "@/components/common/Pagination/CategoryPagination";
import { Pagination } from "flowbite-react";

const UserManage = () => {
  const [openModal, setOpenModal] = useState(false)
  const { data, isLoading, refetch } = getAllUser()

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
      <button
        onClick={() => setOpenModal(true)}
        className='border px-4 py-1 mb-2 flex justify-center items-center gap-1 rounded hover:bg-blue-700 hover:text-white duration-200'
      >
        Add New User
      </button>
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
            {paginated_data?.map((user) => (
              <UserTR key={user.id} user={user} refetch={refetch} />
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

      {/* Modal */}
      <AddUserModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        refetch={refetch}
      />
    </>
  )
};

export default UserManage;
