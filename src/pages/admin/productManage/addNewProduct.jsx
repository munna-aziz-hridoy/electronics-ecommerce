import { useGetAllCategory } from '@/allApis/CategoryApis'
import React from 'react'
import { useForm } from 'react-hook-form'

const addNewProduct = () => {
  const {
    data: category,
    refetch,
    isLoading: categoryLoading,
  } = useGetAllCategory()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    console.log(data)
  }

  if (categoryLoading) return <h1>Loading...</h1>

  return (
    <div>
      <form>
        <div className='mb-4'>
          <label
            for='name'
            class='block  text-sm font-bold text-gray-600 dark:text-white'
          >
            Product Name
          </label>
          <input
            {...register('name', { required: true })}
            type='text'
            name='name'
            id='name'
            class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
            placeholder='Product Name/ Title'
            required
          />
        </div>
        <div className='mt-4'>
          <label
            for='category'
            class='block mb-2 text-sm font-bold text-gray-600 dark:text-white'
          >
            Select Category
          </label>
          <select
            className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
            {...register('category')}
          >
            {category?.map((category) => (
              <option key={category?.id} value={category?.id}>
                {category?.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  )
}

export default addNewProduct
