import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { BsArrowRight } from 'react-icons/bs'
import { Container, ProductCard, SignMeUp, Spinner } from '@/components'
import SubCategoryHeader from '@/components/common/SubCategoryHeader'
import { data } from '../../../assets/data/SubCategoryHeaderCardData'
import DropdownSearch from '@/components/common/Admin/Others/DropdownSearch'

function SubCategory() {
  const [products, setProducts] = useState([])
  const [storedProducts, setStoredProducts] = useState([])
  const [attributes, setAttributes] = useState([])
  const [checkedValues, setCheckedValues] = useState([])
  const [loading, setLoading] = useState(false)

  const { query } = useRouter()

  const parent_id = query?.parent

  useEffect(() => {
    fetch(`/api/attributes?category=${parent_id}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        } else return []
      })
      .then((data) => setAttributes(data))
  }, [query])

  useEffect(() => {
    setLoading(true)
    fetch(`/api/category/product?category=${query.sub_category}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        } else return []
      })
      .then((data) => {
        setLoading(false)
        setStoredProducts(data)
        setProducts(data)
      })
  }, [query])

  useEffect(() => {
    const matchedProducts = storedProducts.filter((item) => {
      const matchedExtras = item.extras.some((extra) =>
        checkedValues.includes(extra.variant_value)
      )
      return matchedExtras
    })

    if (checkedValues.length > 0) {
      setProducts(matchedProducts)
    } else {
      setProducts(storedProducts)
    }
  }, [checkedValues])

  return (
    <Container>
      <div className='my-10'>
        <div className='p-4 bg-slate-100 '>
          <div className='  flex flex-wrap'>
            {/* Other content */}
            {attributes?.map((attribute) => (
              <DropdownSearch
                attribute={attribute}
                setCheckedValues={setCheckedValues}
              />
            ))}
          </div>
          {checkedValues.length > 0 && (
            <div className='flex mt-3 gap-4 items-center'>
              <div className=''>Variant:</div>
              {checkedValues?.map((i) => (
                <div className=' px-3 border bg-gray-50'>{i}</div>
              ))}
            </div>
          )}
        </div>

        <h2 className='text-2xl font-light capitalize my-5 text-center flex justify-center items-center gap-10'>
          {query?.category?.split('_')[0]} <BsArrowRight />{' '}
          {query?.sub_category?.split('_')[0]}
        </h2>

        {/* Sub_Category_Header */}
        <SubCategoryHeader data={data} />

        {/* product section */}
        {loading ? (
          <div className='flex justify-center items-center my-28'>
            <Spinner />
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  my-28'>
            {products.map((item, i) => (
              <ProductCard key={i} product={item} />
            ))}
          </div>
        )}
        {/* Sing Me Up Box */}
        <SignMeUp />
      </div>
    </Container>
  )
}

export default SubCategory
