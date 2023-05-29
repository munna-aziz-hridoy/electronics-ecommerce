import { getAllCategory, getAllSubCategory, getCategory } from "@/allApis";
import { Spinner } from "@/components";
import CategoryTR from "@/components/common/Admin/TR/CategoryTR";
import React, { useState } from "react";
import AttributeModal from "@/components/common/Admin/Modal/AttributeModal";

const CategoryManage = () => {
  const [openModal, setOpenModal] = useState(false);

    const {
      data: subCategory,
      refetch,
      isLoading: subCategoryLoading,
    } = getAllSubCategory()


  // if (isLoading) return <Spinner />;

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
                Attribute Image
              </th>
              <th scope='col' className='px-6 py-3'>
                Attribute Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Parent Category
              </th>
              <th scope='col' className='text-end pr-10 py-3'>
                Action
              </th>
            </tr>
          </thead>
          {/* <tbody>
            {allCategory?.map((category) => (
              <CategoryTR
                key={category.id}
                category={category}
                refetch={refetch}
                parentRefetch={parentRefetch}
              />
            ))}
          </tbody> */}
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
};

export default CategoryManage;
