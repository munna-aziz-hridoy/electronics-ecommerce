import React from 'react'

function Spinner() {
  return (
    <div className=' flex justify-center items-center py-3'>
      <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
    </div>
  )
}

export default Spinner
