import React from 'react'
import { useRouter } from 'next/router'
import { BsArrowRight } from 'react-icons/bs'

import { products } from '@/assets/data/products'
import { Container, ProductCard } from '@/components'
import SubCategoryHeader from '@/components/common/SubCategoryHeader'
import {data} from '../../../assets/data/SubCategoryHeaderCardData'

function SubCategory() {
  const { query } = useRouter()
  return (
    <Container>
      <div className='my-10'>
        <h2 className='text-2xl font-light capitalize my-5 text-center flex justify-center items-center gap-10'>
          {query.category} <BsArrowRight /> {query.sub_category}
        </h2>
        {/* Sub_Category_Header */}
        <SubCategoryHeader data={data} />

        {/* product section */}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  my-28'>
          {[...products, ...products, ...products, ...products].map(
            (item, i) => (
              <ProductCard key={i} product={item} />
            )
          )}
        </div>
      </div>
    </Container>
  )
}

export default SubCategory
