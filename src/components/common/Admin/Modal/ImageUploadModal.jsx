import React, { useState, useEffect } from 'react'
import { Modal } from 'flowbite-react'

const ImageUploadModal = ({ allStates }) => {
  const { uploadedImages, setUploadedImages, openModal, setOpenModal } =
    allStates

  // Cloudinary Img Upload
  const [imageSrc, setImageSrc] = useState(null)
  const [uploadData, setUploadData] = useState(null)
  const [uploadButtonDisable, setUploadButtonDisable] = useState(false)

  useEffect(() => {
    if (uploadData?.secure_url) {
      setUploadedImages([...uploadedImages, uploadData?.secure_url])
      setOpenModal(false)
    }
  }, [uploadData])

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */

  function handleOnChange(changeEvent) {


    const reader = new FileReader()
 console.log(changeEvent.target.files) 

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result)
      setUploadData(undefined)
    }

    reader.readAsDataURL(changeEvent.target.files[0])
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  async function handleOnSubmit(event) {
    event.preventDefault()
    setUploadButtonDisable(true)
    const form = event.currentTarget
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'file'
    )

    const formData = new FormData()

    for (const file of fileInput?.files) {
      formData.append('file', file)
    }

    formData.append('upload_preset', 'electronics e-commerce')

    const data = await fetch(
      'https://api.cloudinary.com/v1_1/dqbxqqhx0/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    ).then((r) => {
      setUploadButtonDisable(false)
      return r.json()
    })

    setImageSrc(data.secure_url)

    setUploadData(data)
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
          <div className='m-10'>
            <form
              method='post'
              onChange={handleOnChange}
              onSubmit={handleOnSubmit}
            >
              <div className='flex items-center justify-center w-full'>
                <label
                  htmlFor='dropzone-file'
                  className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
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
                      <span className='font-semibold'>Click to upload</span> or
                      drag and drop
                    </p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    className='hidden'
                    id='dropzone-file'
                    name='file'
                    type='file'
                    multiple
                  />
                </label>
              </div>

              {imageSrc && !uploadData && (
                <>
                  <div className='relative inline'>
                    <img
                      className=' object-cover h-32 w-32 rounded-lg mt-10 mb-8'
                      alt='Image'
                      src={imageSrc}
                    />
                    <button
                      onClick={() => setImageSrc(null)}
                      type='button'
                      className='absolute top-1 left-1 bg-red-700 rounded-full text-white hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium  text-lg px-2 text-center mr-2 mb-2 '
                    >
                      x
                    </button>
                  </div>
                  <p>
                    <button
                      disabled={uploadButtonDisable}
                      className=' hover:text-white relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800'
                    >
                      <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
                        Upload Files
                      </span>
                    </button>
                  </p>
                </>
              )}
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}

export default ImageUploadModal
