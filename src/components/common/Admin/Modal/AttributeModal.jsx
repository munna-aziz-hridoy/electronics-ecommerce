import { addNewCategory } from "@/allApis/CategoryApis";
import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ImageUploadModal from "./ImageUploadModal";
import { TagsInput } from "react-tag-input-component";

const AttributeModal = ({
  setOpenModal,
  openModal,
  category,
  refetch,
  parentRefetch,
}) => {
  
  const [selectedTags, setSelectedTags] = useState([])
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data,selectedTags)
    addNewCategory(
      { ...data },
      refetch,
      setOpenModal,
      parentRefetch
    );
  };

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
                  htmlFor='name'
                  className='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
                >
                  Attribute Value
                </label>
                <TagsInput
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
};

export default AttributeModal;
