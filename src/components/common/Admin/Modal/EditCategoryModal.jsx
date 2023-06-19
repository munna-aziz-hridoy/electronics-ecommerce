import { Button, Modal } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ImageUploadModal from './ImageUploadModal'
import { getCategory } from '@/allApis'
import { editCategory } from '@/allApis/CategoryApis'

const EditCategoryModal = ({
  setOpenModal,
  openModal,
  category,
  refetch,
}) => {
  const [uploadedImages, setUploadedImages] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const [imgModal, setImgModal] = useState(false)
  const { id, name, image, parent_id } = category
  const { data, refetch: c } = getCategory()

  // Category Data// Category Data
  useEffect(() => {
    if (parent_id) {
      fetch(`/api/category/single-category/${parent_id}`)
        .then((res) => res.json())
        .then((data) => {
          setCategoryName(data?.name)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [parent_id])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    editCategory(
      {
        ...data,
        image: uploadedImages?.[0] || image,
        parent_id: data.parent_id || null,
      },
      id,
      refetch,
      setOpenModal
    )

    // addNewCategory(
    //   {
    //     ...data, image: uploadedImages?.[0] || image,
    //   parent_id:''},
    //   refetch,
    //   setOpenModal,
    //   parentRefetch
    // )
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
              Edit Category
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-4'>
                <label
                  htmlFor='name'
                  className='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
                >
                  Category Name
                </label>
                <input
                  {...register('name', { required: true })}
                  type='text'
                  name='name'
                  id='name'
                  defaultValue={name}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                  placeholder='Category Name'
                  required
                />
              </div>
              {uploadedImages?.length === 0 ? (
                <div className='mb-4'>
                  <label
                    className='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
                    htmlFor='multiple_files'
                  >
                    Selected Category Image
                  </label>
                  <div className='flex justify-start items-center gap-5'>
                
                    <img
                      className=' object-cover h-20 w-20 rounded-lg mb-8'
                      alt='Image'
                      src={image}
                    />
                 
                  </div>
                  <div>
                    <button
                      onClick={() => setImgModal(true)}
                      type='button'
                      className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                    >
                      Add Category Image
                    </button>
                    {uploadedImages?.length > 0 && (
                      <button
                        onClick={() => setUploadedImages([])}
                        type='button'
                        className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className='mb-4'>
                  <label
                    className='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
                    htmlFor='multiple_files'
                  >
                    Selected Category Image
                  </label>
                  <div className='flex justify-start items-center gap-5'>
                    {uploadedImages?.map((categoryImage, index) => {
                      return (
                        <img
                          key={index}
                          className=' object-cover h-20 w-20 rounded-lg mb-8'
                          alt='Image'
                          height={100}
                          width={100}
                          src={categoryImage}
                        />
                      )
                    })}
                  </div>
                  <div>
                    <button
                      onClick={() => setImgModal(true)}
                      type='button'
                      className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                    >
                      Add Category Image
                    </button>
                    {uploadedImages?.length > 0 && (
                      <button
                        onClick={() => setUploadedImages([])}
                        type='button'
                        className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              )}
              <div className='mb-4'>
                <label
                  htmlFor='category'
                  className='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
                >
                  Select Parent Category
                </label>
                <select
                  className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                  {...register('parent_id')}
                >
                  {!parent_id ? (
                    <option value={null}>N/A</option>
                  ) : (
                    <option disabled value={parent_id}>{categoryName}</option>
                  )}

                  {data?.map((category) => (
                    <option key={category?.id} value={category?.id}>
                      {category?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='flex justify-between mt-5 mx-1'>
                <Button
                  type='submit'
                  className='bg-lime-500 hover:bg-lime-600 '
                >
                  Edit Category
                </Button>
                <Button color='failure' onClick={() => setOpenModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
            {/* Image Upload Modal  */}
            <ImageUploadModal
              allStates={{
                setUploadedImages,
                openModal: imgModal,
                setOpenModal: setImgModal,
              }}
              isMultiple={false}
            />
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}

export default EditCategoryModal
