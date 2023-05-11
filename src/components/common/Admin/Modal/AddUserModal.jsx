import { addNewUser } from '@/allApis/getAllUser'
import { Button, Modal } from 'flowbite-react'
import React from 'react'
import { useForm } from 'react-hook-form'

const AddUserModal = ({ setOpenModal, openModal, refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    addNewUser(data, refetch, setOpenModal)
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
              Add New User
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-4'>
                <label
                  for='name'
                  class='block  text-sm font-bold text-gray-600 dark:text-white'
                >
                  User Name
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
              <div className='mb-4'>
                <label
                  for='email'
                  class='block  text-sm font-bold text-gray-600 dark:text-white'
                >
                  User Email
                </label>
                <input
                  {...register('email', { required: true })}
                  type='email'
                  name='email'
                  id='email'
                  class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                  placeholder='example@example.com'
                  required
                />
              </div>
              <div className='mb-4'>
                <label
                  for='password'
                  class='block  text-sm font-bold text-gray-600 dark:text-white'
                >
                  User Password
                </label>
                <input
                  {...register('password', { required: true })}
                  type='password'
                  name='password'
                  id='password'
                  class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                  placeholder='password'
                  required
                />
              </div>

              <div className='flex justify-between mt-5 mx-1'>
                <Button
                  type='submit'
                  className='bg-lime-500 hover:bg-lime-600 '
                >
                  Add User
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

export default AddUserModal
