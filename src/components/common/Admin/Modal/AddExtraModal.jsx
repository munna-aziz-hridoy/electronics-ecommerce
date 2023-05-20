import { Button, Modal } from 'flowbite-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useId } from 'react-id-generator'
import ImageUploadModal from './ImageUploadModal'
import { BsImageFill } from 'react-icons/bs'
import { RiDeleteBin2Fill } from 'react-icons/ri'

const AddExtraModal = ({ setOpenModal, openModal, states }) => {
  const [oenImageModal, setOpenImageModal] = useState(false)
  const [uploadedImages, setUploadedImages] = useState([])
  const { extraData, setExtraData } = states
  const [id] = useId()

console.log(uploadedImages)
console.log(extraData)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    setExtraData([...extraData, { id: id, images: uploadedImages, ...data }])
    setOpenModal(false)
    reset()
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
              Add Extra Product
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-4'>
                <label
                  htmlFor='item'
                  className='block  text-sm font-bold text-gray-600 dark:text-white'
                >
                  Item Name
                </label>
                <input
                  {...register('item', { required: true })}
                  type='text'
                  name='item'
                  id='item'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                  placeholder='Item Name'
                  required
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='price'
                  className='block  text-sm font-bold text-gray-600 dark:text-white'
                >
                  Item price
                </label>
                <input
                  {...register('price', { required: true })}
                  type='number'
                  name='price'
                  id='price'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                  placeholder='Item Price'
                  required
                />
              </div>

              <div className='mt-4'>
                {uploadedImages?.length > 0 && (
                  <label
                    className='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
                    htmlFor='multiple_files'
                  >
                    Selected Product Images
                  </label>
                )}
                <div className='flex justify-start items-center gap-5'>
                  {uploadedImages?.map((productImage, index) => {
                    return (
                      <img
                        key={index}
                        className=' object-cover h-20 w-20 rounded-lg mb-8'
                        alt='Image'
                        // height={100}
                        // width={100}
                        src={productImage}
                      />
                    )
                  })}
                </div>
                <div className='flex items-center'>
                  <button
                    onClick={() => setOpenImageModal(true)}
                    type='button'
                    className='hover:-translate-y-2 duration-300 flex items-center gap-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                  >
                    <BsImageFill />
                    Add Image
                  </button>
                  {uploadedImages?.length > 0 && (
                    <button
                      onClick={() => setUploadedImages([])}
                      type='button'
                      className='hover:-translate-y-2 duration-300 flex items-center gap-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
                    >
                      <RiDeleteBin2Fill />
                      {uploadedImages?.length === 1 ? 'Remove' : 'Remove All'}
                    </button>
                  )}
                </div>
              </div>

              <div className='flex justify-between mt-5 mx-1'>
                <Button
                  type='submit'
                  className='bg-lime-500 hover:bg-lime-600 '
                >
                  Add Extra
                </Button>
                <Button color='failure' onClick={() => setOpenModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      {/* Image Modal */}

      <ImageUploadModal
        allStates={{
          setUploadedImages,
          openModal: oenImageModal,
          setOpenModal: setOpenImageModal,
        }}
        isMultiple={true}
      />
    </React.Fragment>
  )
}

export default AddExtraModal
