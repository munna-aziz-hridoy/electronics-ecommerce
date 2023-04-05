import React from 'react'
import SubCategoryHeaderCard from './SubCategoryHeaderCard'

export default function SubCategoryHeader({ data }) {
  const { card, description } = data
  return (
    <div>
      <p className='text-center md:mx-48 mx-5 mb-10'>{description}</p>
      <div className='grid grid-cols-2 px-5 md:grid-cols-6 justify-center items-center gap-5'>
        {card.map((item, index) => (
          <SubCategoryHeaderCard key={index} data={item} />
        ))}
      </div>
    </div>
  )
}
