import { addNewAttribute } from '@/allApis/AttributeApis'
import { addNewCategory } from '@/allApis/CategoryApis'
import { Button, Modal } from 'flowbite-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { TagsInput } from 'react-tag-input-component'

const AttributeModal = ({ setOpenModal, openModal, category, refetch }) => {
  // States
  const [selectedTags, setSelectedTags] = useState([])

  // Use Form Hook
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm()

  // Attribute add event
  const onSubmit = (data) => {
    addNewAttribute(
      { ...data, values: selectedTags },
      setSelectedTags,
      setOpenModal,
      refetch,
      reset
    )
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
              Add New Attribute
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-4'>
                <label
                  htmlFor='name'
                  className='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
                >
                  Attribute Name
                </label>
                <input
                  {...register('name', { required: true })}
                  type='text'
                  name='name'
                  id='name'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                  placeholder='Attribute Name'
                  required
                />
              </div>

              <div className='mb-4'>
                <label
                  htmlFor='category'
                  className='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
                >
                  Select Category
                </label>
                <select
                  className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                  {...register('category_id')}
                >
                  <option selected disabled value='NA'>
                    Select a Category
                  </option>

                  {category?.map((category) => (
                    <option key={category?.id} value={category?.id}>
                      {category?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='name'
                  className='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
                >
                  Attribute Value
                </label>
                <TagsInput
                  required
                  value={selectedTags}
                  onChange={setSelectedTags}
                  name='attributes'
                  placeHolder='Add attributes'
                />
              </div>

              <div className='flex justify-between mt-5 mx-1'>
                <Button
                  type='submit'
                  className='bg-lime-500 hover:bg-lime-600 '
                >
                  Add Attribute
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

export default AttributeModal
