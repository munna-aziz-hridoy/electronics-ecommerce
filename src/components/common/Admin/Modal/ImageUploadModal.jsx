import React, { useState, useEffect } from 'react'
import { Modal } from 'flowbite-react'
import { RxCross2 } from 'react-icons/rx'
import { GoCloudUpload } from 'react-icons/go'
import ButtonSpinner from '../../ButtonSpinner'

const ImageUploadModal = ({ allStates, isMultiple }) => {
  const { setUploadedImages, openModal, setOpenModal } = allStates

  // Cloudinary Img Upload
  const u = []
  const [imageSrc, setImageSrc] = useState([])
  const [uploadData, setUploadData] = useState([])
  const [uploadButtonDisable, setUploadButtonDisable] = useState(false)

  // remove Img
  const removeImg = (image) => {
    const isExist = imageSrc.filter((img) => img !== image)
    setImageSrc(isExist)
  }

  useEffect(() => {
    if (uploadData?.length > 0) {
      uploadData.map((result) => u.push(result?.secure_url))
      setUploadedImages(u)
      setOpenModal(false)
    }
  }, [uploadData])

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */
  function handleOnChange(changeEvent) {
    const selectedFiles = Array.from(changeEvent.target.files) // Convert FileList to an array

    const filePromises = selectedFiles.map((file) => {
      return new Promise((resolve) => {
        const fileReader = new FileReader()
        fileReader.onload = (event) => {
          resolve(event.target.result)
        }
        fileReader.readAsDataURL(file)
      })
    })

    Promise.all(filePromises).then((results) => {
      setImageSrc(results)
      setUploadData([])
    })
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

    const promises = Array.from(imageSrc).map((image) => {
      const formDataCopy = new FormData()
      for (const [key, value] of formData.entries()) {
        formDataCopy.append(key, value)
      }
      formDataCopy.set('file', image)

      return fetch('https://api.cloudinary.com/v1_1/dqbxqqhx0/image/upload', {
        method: 'POST',
        body: formDataCopy,
      }).then((r) => r.json())
    })

    const uploadResults = await Promise.all(promises)
    uploadResults.map((result) => setImageSrc([...imageSrc, result.secure_url]))

    setUploadData(uploadResults)
    setUploadButtonDisable(false)
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
          <div className='m-5'>
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
                      SVG, PNG, JPG
                    </p>
                  </div>
                  <input
                    className='hidden'
                    id='dropzone-file'
                    name='file'
                    type='file'
                    multiple={isMultiple}
                  />
                </label>
              </div>

              {imageSrc?.length > 0 && uploadData?.length < 1 && (
                <>
                  <div className='flex flex-wrap gap-5 items-center mt-10 mb-8'>
                    {imageSrc.map((img, index) => {
                      return (
                        <div key={index} className='relative inline'>
                          <img
                            className=' object-cover h-28 w-28 rounded-lg '
                            alt='Image'
                            src={img}
                          />

                          <button
                            onClick={() => removeImg(img)}
                            type='button'
                            className='absolute -top-3 -right-3 bg-gray-200 rounded-full text-red-700 hover:text-white  border-2 border-red-700  hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 duration-300 text-lg p-1 text-center font-bold '
                          >
                            <RxCross2 />
                          </button>
                        </div>
                      )
                    })}
                  </div>
                  <p>
                    <button
                      disabled={uploadButtonDisable}
                      className=' hover:text-white relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800'
                    >
                      <span className='relative px-5 py-2.5 flex justify-center items-center gap-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
                        {uploadButtonDisable ? (
                          <div className='flex items-center justify-center'>
                            <div role='status'>
                              <svg
                                aria-hidden='true'
                                className='w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                                viewBox='0 0 100 101'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                  fill='currentColor'
                                />
                                <path
                                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                  fill='currentFill'
                                />
                              </svg>
                              <span className='sr-only'>Loading...</span>
                            </div>
                          </div>
                        ) : (
                          // <ButtonSpinner />
                          <GoCloudUpload />
                        )}
                        {uploadButtonDisable ? 'Uploading ' : 'Upload '}
                        {imageSrc.length === 1 ? 'Image' : 'Images'}
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
