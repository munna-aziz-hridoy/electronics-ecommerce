import { addNewCategory } from '@/allApis/CategoryApis'
import { Button, Modal } from 'flowbite-react'
import React from 'react'
import { useForm } from 'react-hook-form'

const AddProductModal = ({ setOpenModal, openModal, category, refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    addNewCategory(data, refetch, setOpenModal)
  }

  return (
    <React.Fragment>
      <Modal
        show={openModal}
        size='sm'
        popup={true}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className=''>
            <h3 className='text-center mb-5 text-xl font-bold text-gray-500 dark:text-gray-400'>
              Add New Category
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  for='name'
                  class='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
                >
                  Category Name
                </label>
                <input
                  {...register('name', { required: true })}
                  type='text'
                  name='name'
                  id='name'
                  class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                  placeholder='Category Name'
                  required
                />
              </div>
              <div className='mt-4'>
                <label
                  for='category'
                  class='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
                >
                  Previous Categories
                </label>
                <select
                  className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                  {...register('category', { required: true })}
                >
                  {category?.map((category) => (
                    <option key={category?.id} value={category?.id}>
                      {category?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  for='description'
                  class='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
                >
                  Description
                </label>
                <input
                  {...register('description', { required: true })}
                  type='text'
                  name='description'
                  id='description'
                  class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                  placeholder='Category Name'
                  required
                />
              </div>
              <div className='flex justify-between mt-5 mx-1'>
                <Button
                  type='submit'
                  className='bg-lime-500 hover:bg-lime-600 '
                >
                  Add Product
                </Button>
                <Button color='failure' onClick={() => setOpenModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}

export default AddProductModal
