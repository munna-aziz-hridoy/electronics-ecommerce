import React from 'react'
import SubCategoryHeaderCard from './SubCategoryHeaderCard'

export default function SubCategoryHeader({ data }) {
    console.log(data)
  const { card, description } = data
  return (
    <div>
      <p className='text-center mx-48 mb-10'>{description}</p>
      <div className='flex justify-center items-center gap-5'>
        {card.map((item, index) => (
          <SubCategoryHeaderCard key={index} data={item} />
        ))}
      </div>
    </div>
  )
}
