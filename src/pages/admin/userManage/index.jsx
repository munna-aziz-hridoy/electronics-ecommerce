import React, { useState } from "react";
import { getAllUser } from "@/allApis";
import { UserTR, AddUserModal } from "@/components";

const UserManage = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading, refetch } = getAllUser();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="border px-4 py-1 mb-2 flex justify-center items-center gap-1 rounded hover:bg-blue-700 hover:text-white duration-200"
      >
        Add New User
      </button>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email Address
              </th>
              <th scope="col" className="text-end pr-10 py-3">
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
      {/* Modal */}
      <AddUserModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        refetch={refetch}
      />
    </>
  );
};

export default UserManage;
