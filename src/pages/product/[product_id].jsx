import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import {
  Container,
  LatestProduct,
  ProductCard,
  SignMeUp,
  Spinner,
} from '@/components'
import { products } from '@/assets/data/products'
import { AiOutlineHeart } from 'react-icons/ai'
import { getSingleProduct } from '@/allApis/ProductApis'
import { CartContext } from '@/context/cart'
import { toast } from 'react-hot-toast'
import useAuthStore from '@/store/auth'

function ProductDetails() {
  const { query, push } = useRouter()

  const [selectedVariant, setSelectedVariant] = useState(null)
  const [productPrice, setProductPrice] = useState(0)

  const { data, isLoading } = getSingleProduct(query?.product_id)

  const [selectedImage, setSelectedImage] = useState('')
  const [imagesArr, setImagesArr] = useState([])

  useEffect(() => {
    if (selectedVariant) {
      setImagesArr(selectedVariant?.images)
    } else {
      setImagesArr(data?.images)
    }
  }, [data, selectedVariant])

  useEffect(() => {
    if (imagesArr?.length > 0) {
      setSelectedImage(imagesArr[0])
    } else {
      setSelectedImage(data?.images[0])
    }
  }, [imagesArr, data])

  useEffect(() => {
    if (selectedVariant) {
      setProductPrice(selectedVariant?.price)
    } else {
      setProductPrice(data?.price)
    }
  }, [data, selectedVariant])

  const { addToCart } = useContext(CartContext)
  const { user } = useAuthStore()

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please sign in to continue shopping')
      return push('/auth/login')
    }

    const { name, id } = data

    const cartData = {
      id: selectedVariant?._id || id,
      product_id: id,
      name,
      image: selectedImage,
      price: productPrice,
      variant: selectedVariant || null,
    }

    addToCart(cartData)
    toast.success('Product added to cart')
  }

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : data ? (
        <div className='px-1 md:px-10'>
          <div className='flex flex-col md:flex-row justify-center items-start gap-10 mt-10 mb-16'>
            <div className=' w-full md:w-1/2'>
              <div className='w-full sm:w-[80%] md:w-[90%] lg:w-[500px]  bg-gray-300 h-[550px]'>
                <img className='w-full h-full' src={selectedImage} />
              </div>
              <div className='flex flex-wrap gap-3 h-28 max-w-full w-full  my-4'>
                {imagesArr?.map((item) => (
                  <img
                    onClick={() => setSelectedImage(item)}
                    className='h-28 w-28 cursor-pointer border-2 border-gray-300'
                    key={item}
                    src={item}
                  />
                ))}
              </div>
            </div>
            <div className='w-full md:w-1/2  p-3'>
              <h2 className='text-3xl font-bold text-gray-700 capitalize'>
                {data?.name}
              </h2>
              <p className='text-lg font-semibold text-green-700 mt-1'>
                Price: £ {productPrice}
              </p>
              <p className='text-sm text-gray-500 pr-3 my-3'>
                {data?.short_description}
              </p>

              <div className='flex flex-col gap-3 flex-wrap mt-8'>
                <select
                  onChange={(e) => {
                    if (e.target.value === '1') {
                      setSelectedVariant(null)
                    } else {
                      const id = e.target.value
                      const selectedItem = data?.extras?.find(
                        (ext) => ext?._id === id
                      )

                      setSelectedVariant(selectedItem)
                    }
                  }}
                  defaultValue={'1'}
                >
                  <option value='1'>Select variations</option>
                  {data?.extras?.map((item, i) => {
                    return (
                      <option className='inline-block' value={item?._id}>
                        {item?.variations?.map((v) => (
                          <>
                            <span>
                              {v?.variant_name}: {v?.variant_value},{' '}
                            </span>
                          </>
                        ))}
                      </option>
                    )
                  })}
                </select>
              </div>

              <div className='flex justify-center items-center gap-5 mt-8'>
                <button
                  onClick={handleAddToCart}
                  className='flex justify-center items-center text-center w-[90%] h-14 my-5'
                >
                  <span className='w-full h-full p-2 bg-[#BDD755] text-gray-800 hover:bg-white text-center flex justify-center items-center font-semibold border-2 border-white hover:border-[#BDD755] duration-150'>
                    Add to cart
                  </span>
                </button>
                <button className='w-14 h-14 flex justify-center items-center border-2 border-[#BDD755] text-gray-500 hover:text-gray-700 rounded-sm hover:bg-[#BDD755] duration-150'>
                  <AiOutlineHeart fontSize={28} />
                </button>
              </div>
            </div>
          </div>

          {/* part second */}

          <div className='my-14 w-full  bg-white p-2 md:p-8 border-2 border-gray-100'>
            <h2 className='text-2xl font-semibold text-gray-700 my-5'>
              Description:
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: data?.description }}
              className='text-sm text-gray-500 pr-4 '
            ></div>
          </div>

          <LatestProduct />
        </div>
      ) : (
        <p>No data Found</p>
      )}

      <SignMeUp class_name={'my-16'} />
    </Container>
  )
}

export default ProductDetails
