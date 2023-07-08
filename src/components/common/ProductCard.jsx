import React, { useContext } from 'react'
import { Image } from '..'
import { useRouter } from 'next/router'
import { AiOutlineHeart } from 'react-icons/ai'
import { CartContext } from '@/context/cart'
import useAuthStore from '@/store/auth'
import toast from 'react-hot-toast'

function ProductCard({ product, sub = false }) {
  const { push } = useRouter()

  const { user } = useAuthStore()

  const {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    if (!user) {
      toast.error('Please sign in to continue shopping')
      return push('/auth/login')
    }

    const { id, images, category, name, price, extras } = product

    const cartData = {
      id: id,
      product_id: id,
      name,
      image: images[0],
      price: price,
      variant: null,
    }

    addToCart(cartData)
    toast.success('Product added to cart')
  }

  return (
    <div
      onClick={() => push(`/product/${product.id}`)}
      className=' cursor-pointer shadow-sm rounded m-2 my-4 md:m-0 bg-white drop-shadow-sm'
    >
      <div
        className={`w-full ${
          sub ? 'h-[300px]' : 'h-[400px]'
        } relative overflow-hidden`}
      >
        <img src={product?.images?.[0]} className='rounded-t w-full h-full' />
        <div className='absolute bottom-0 h-16 w-full flex gap-2'>
          <button
            onClick={handleAddToCart}
            className='flex justify-center items-center text-center w-3/4 h-full'
          >
            <span className='w-full h-full p-2 bg-[#BDD755] hover:bg-white text-gray-800  text-center flex justify-center items-center font-semibold border-2 border-transparent hover:border-[#BDD755] duration-150'>
              Add to cart
            </span>
          </button>
          <button className='w-1/4 h-full flex justify-center items-center border-2 border-[#BDD755] text-gray-500 hover:text-gray-700 rounded-sm bg-white hover:bg-[#BDD755] duration-150'>
            <AiOutlineHeart fontSize={28} />
          </button>
        </div>
      </div>
      <div className='mt-3 mb-1 py-2 pl-1'>
        <h2 className='text-xl font-semibold capitalize text-gray-900'>
          {product?.name?.length > 30
            ? `${product?.name?.slice(0, 30)}...`
            : product?.name}
        </h2>
        <p className='text-lg font-medium capitalize text-gray-700'>
          Price:{' '}
          <span className=' text-blue-800 font-bold'> £ {product.price}</span>
        </p>
        {/* <p className="text-sm font-light capitalize text-gray-500">
          Brand: {product?.brand}
        </p> */}
      </div>
    </div>
  )
}

export default ProductCard
