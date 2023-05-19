import React, { Fragment, useContext } from 'react'
import Link from 'next/link'

import { BsTruck, BsX } from 'react-icons/bs'
import { CiDeliveryTruck } from 'react-icons/ci'

import { Container, ProductCard } from '@/components'

import earbud from '@/assets/earbud1.jpg'
import { products } from '@/assets/data/products'
import { CartContext } from '@/context/cart'

function Cart() {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext)

  return (
    <Fragment>
      {' '}
      <Container>
        <p></p>
        <div className='flex flex-col md:flex-row gap-5 my-10 p-2'>
          <div className='w-full md:w-[65%]'>
            {cart?.item?.length === 0 ? (
              <div className='border-2 border-gray-200 rounded shadow p-4 '>
                <p className='text-center font-semibold text-lg'>
                  Your bag is empty
                </p>
              </div>
            ) : (
              <div className='border-2 border-gray-200 rounded shadow p-4 '>
                <div className='flex justify-between items-center border-b border-gray-200 pb-5'>
                  <h2 className='text-2xl font-semibold capitalize text-gray-800'>
                    Your Bag
                  </h2>
                  <div className='flex justify-center items-center gap-5'>
                    <p className='font-light text-lg text-gray-500'>Qyt</p>
                    <p className='font-light text-lg text-gray-500'>
                      Sub total
                    </p>
                  </div>
                </div>
                {/*  */}

                {cart?.items?.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className='flex justify-between items-center my-8 border-b pb-4'
                    >
                      <div className='flex gap-3'>
                        <img src={earbud.src} className='w-16 h-16' />
                        <div>
                          <h2 className='text-xl font-semibold text-gray-800 capitalize'>
                            {item?.name}
                          </h2>
                          <p className='text-sm font-light text-gray-600 capitalizes w-2/3'>
                            {item?.short_description?.slice(0, 50)}...
                          </p>
                          <p className='text-green-600 text-sm font-semibold capitalize'>
                            Price: ${item?.price}
                          </p>
                          <span
                            onClick={() => removeFromCart(item)}
                            className='font-light text-lg text-gray-400 flex items-center gap-3 mt-2 cursor-pointer'
                          >
                            <BsX fontSize={26} /> Remove
                          </span>
                        </div>
                      </div>
                      <div className='flex gap-5'>
                        <div className='flex items-center justify-between'>
                          <p
                            onClick={() => increaseQuantity(item)}
                            className='text-3xl font-light h-8 w-8 border border-gray-200 text-gray-500 flex justify-center items-center cursor-pointer'
                          >
                            +
                          </p>
                          <input
                            className=' h-8 w-14 border border-gray-200 pl-4'
                            defaultValue={item?.quantity}
                          />
                          <p
                            onClick={() => decreaseQuantity(item)}
                            className='text-3xl font-light h-8 w-8 border border-gray-200 text-gray-500 flex justify-center items-center cursor-pointer'
                          >
                            -
                          </p>
                        </div>
                        <p className=' text-gray-500 text-xl font-light'>
                          ${item?.price * item?.quantity + item?.extra_price}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
            {/*  */}
            <div className='border-2 border-gray-200 rounded shadow p-4 my-8'>
              <div className=' border-b border-gray-200 pb-5'>
                <h2 className='text-2xl font-semibold capitalize text-gray-800'>
                  We're offering you the following collection and delivery
                  options
                </h2>
              </div>

              <div className='flex justify-between items-center mt-5'>
                <p className='text-light text-gray-400 capitalize flex s items-center gap-5 w-2/3'>
                  <BsTruck fontSize={26} width={70} />
                  Standard delivery (in 5-7 days) FREE over £60 (£100 for Wines)
                </p>
                <p className='text-light text-gray-400 capitalize '>FREE</p>
              </div>
              <div className='flex justify-between items-center mt-5'>
                <p className='text-light text-gray-400 capitalize flex  items-center gap-5 w-2/3'>
                  <CiDeliveryTruck fontSize={26} width={70} />
                  Next / Nominated day delivery
                </p>
                <p className='text-light text-gray-400 capitalize '>$4.99</p>
              </div>
            </div>
          </div>
          <div className='w-full md:w-[35%]'>
            <div className='border-2 border-gray-200 rounded shadow p-4 '>
              <div className=' border-b border-gray-200 pb-5'>
                <h2 className='text-2xl font-semibold capitalize text-gray-800'>
                  Summary
                </h2>
              </div>
              <div className='flex justify-between items-center mt-5'>
                <p className='text-2xl font-medium text-gray-700 capitalize'>
                  Total
                </p>
                <p className='text-2xl font-medium text-gray-700 capitalize'>
                  ${cart?.total_price || 0}
                </p>
              </div>
              <Link
                href='/checkout'
                className='flex justify-center items-center text-center'
              >
                <span className='w-full p-2 bg-[#BDD755] text-gray-800 my-5 text-center'>
                  Checkout
                </span>
              </Link>
              <div className='w-full h-[1px] bg-gray-200' />

              <h2 className='text-xl font-medium text-gray-700 capitalize mt-5'>
                add promotion code
              </h2>
              <input className='w-full p-2 h-14 border border-gray-300 my-2' />
              <button className='w-full p-2 bg-[#627786] text-white mt-3'>
                Apply
              </button>
            </div>
          </div>
        </div>
      </Container>
      <div className='py-24 bg-[#ede9e7]'>
        <Container>
          <h2 className=' text-gray-800 text-2xl font-light capitalize text-center'>
            Latest Product
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 mx-5 md:mx-24'>
            {products.slice(0, 3).map((item, i) => (
              <ProductCard key={i} product={item} />
            ))}
          </div>
        </Container>
      </div>
    </Fragment>
  )
}

export default Cart
