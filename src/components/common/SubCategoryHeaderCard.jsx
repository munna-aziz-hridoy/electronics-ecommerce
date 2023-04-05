import React from 'react'
import Image from '../../components/common/Image'

const SubCategoryHeaderCard = ({ data }) => {
  const { name, img } = data
  return (
    <div className='border cursor-pointer flex items-center justify-center gap-2 pr-4'>
      <div className='w-14'>
        <Image src={img} className='rounded-l' />
      </div>
      <p>{name}</p>
    </div>
  )
}

export default SubCategoryHeaderCard
