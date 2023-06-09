import React, { useState, useEffect } from 'react'
import ImageUploading from 'react-images-uploading'
import { Modal } from 'flowbite-react'
import { RxCross2 } from 'react-icons/rx'
import { RiDeleteBin2Fill } from 'react-icons/ri'

const ImageUploadModal = ({ allStates, isMultiple }) => {
  const { setUploadedImages, openModal, setOpenModal } = allStates

  const [uploadButtonDisable, setUploadButtonDisable] = useState(false)
  const [imageSrc, setImageSrc] = useState([])
  const [images, setImages] = useState([])
  const maxNumber = 10

  const onChange = (imageList) => {
    setImageSrc(imageList)
    setImages(imageList)
  }

  const handleSubmit = () => {
    setUploadButtonDisable(true)
    imageSrc.forEach((image) => {
      const formData = new FormData()
      formData.append('upload_preset', 'electronics e-commerce')
      formData.append('file', image?.data_url)

      fetch('https://api.cloudinary.com/v1_1/dqbxqqhx0/image/upload', {
        method: 'POST',
        body: formData,
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.url) {
            setUploadedImages((pre) => {
              return [...pre, data.url]
            })
          }
          setUploadButtonDisable(false)
          setOpenModal(false)
        })
    })
  }

  return (
    <React.Fragment>
      <Modal
        show={openModal}
        size='3xl'
        popup={true}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className=''>
            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey='data_url'
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                <div className='upload__image-wrapper'>
                  <div>
                    <div
                      onClick={onImageUpload}
                      {...dragProps}
                      className='flex items-center justify-center w-full'
                    >
                      <label
                        htmlFor='dropzone-file'
                        className={`${
                          isDragging ? 'border-red-500' : 'border-gray-300'
                        } flex flex-col items-center justify-center w-full h-64 border-2  border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
                      >
                        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                          <svg
                            aria-hidden='true'
                            className='w-10 h-10 mb-3 text-gray-400'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                            ></path>
                          </svg>
                          <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                            <span className='font-semibold'>
                              Click to upload
                            </span>
                            or drag and drop
                          </p>
                          <p className='text-xs text-gray-500 dark:text-gray-400'>
                            SVG, PNG, JPG
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className='flex flex-wrap gap-5 items-center mt-10 mb-8'>
                    {imageList?.map((image, index) => (
                      <div key={index} className='image-item relative'>
                        <img
                          className=' object-cover h-28 w-28 rounded-lg '
                          src={image['data_url']}
                          alt=''
                          width='100'
                        />
                        <div className='image-item__btn-wrapper'>
                          <button
                            onClick={() => onImageRemove(index)}
                            type='button'
                            className='absolute -top-3 -right-3 bg-gray-200 rounded-full text-red-700 hover:text-white  border-2 border-red-700  hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 duration-300 text-lg p-1 text-center font-bold '
                          >
                            <RxCross2 />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='flex items-center'>
                    <button
                      onClick={() => {
                        onImageRemoveAll()
                        handleSubmit()
                      }}
                      disabled={uploadButtonDisable}
                      className=' hover:text-white relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800'
                    >
                      <span className='relative px-5 py-2.5 flex justify-center items-center gap-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
                       
                        {uploadButtonDisable
                          ? 'Uploading Images... '
                          : 'Upload Images'}
                 
                      </span>
                    </button>
                    <button
                      onClick={onImageRemoveAll}
                      className='flex items-center gap-2  duration-300 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                    >
                      <RiDeleteBin2Fill />
                      Remove all
                    </button>
                  </div>
                </div>
              )}
            </ImageUploading>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}

export default ImageUploadModal
