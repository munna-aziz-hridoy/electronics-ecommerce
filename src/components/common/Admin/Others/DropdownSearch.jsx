import React, { useState } from 'react'

const DropdownSearch = ({ attribute, setCheckedValues }) => {
  const [isOpen, setIsOpen] = useState(false)
 

  const handleCheckboxChange = (e, value) => {
    if (e.target.checked) {
      setCheckedValues((prevValues) => [...prevValues, value])
    } else {
      setCheckedValues((prevValues) =>
        prevValues.filter((item) => item !== value)
      )
    }
  }



  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const { id, name, values } = attribute


  return (
    <div className='relative'>
      <button
        id='dropdownSearchButton'
        data-dropdown-toggle='dropdownSearch'
        data-dropdown-placement='bottom'
        className='text-gray-800 focus:ring-4 border-gray-800 font-medium border text-sm px-4 py-2.5 text-center inline-flex items-center w-[250px]'
        type='button'
        onClick={toggleDropdown}
      >
        {name}
        <svg
          className='w-4 h-4 ml-2'
          aria-hidden='true'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19 9l-7 7-7-7'
          ></path>
        </svg>
      </button>

      {/* Dropdown menu */}

      <div
        id='dropdownSearch'
        className={`${
          isOpen ? 'block' : 'hidden'
        } z-10 bg-white  shadow w-60 dark:bg-gray-700 absolute`}
      >
        <div className='p-3'>
          <label htmlFor='input-group-search' className='sr-only'>
            Search
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <svg
                className='w-5 h-5 text-gray-500 dark:text-gray-400'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
            <input
              type='text'
              id='input-group-search'
              className='block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Search '
            />
          </div>
        </div>
        <ul
          className='h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200'
          aria-labelledby='dropdownSearchButton'
        >
          {values.map((value, index) => (
            <li>
              <div className='flex items-center  pl-2 hover:bg-gray-100 dark:hover:bg-gray-600'>
                <input
                  id={`checkbox-item-${index}-${id}`}
                  type='checkbox'
                  onChange={(e) => handleCheckboxChange(e, value)}
                  className='w-5 h-5 cursor-pointer text-gray-800 focus:ring-0 ring-0 bg-gray-100 border-gray-300 '
                />
                <label
                  htmlFor={`checkbox-item-${index}-${id}`}
                  className='w-full cursor-pointer py-2 ml-2 text-lg font-medium text-gray-900 rounded dark:text-gray-300'
                >
                  {value}
                </label>
              </div>
            </li>
          ))}

          {/* Rest of the list items */}
        </ul>
        <button className='  p-3 font-semibold text-gray-100 border-t border-gray-200  bg-[#BBD850] hover:bg-[#cde966] w-full'>
          View Items
        </button>
      </div>
    </div>
  )
}

export default DropdownSearch
