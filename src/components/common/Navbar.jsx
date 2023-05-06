import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import { RxHamburgerMenu } from 'react-icons/rx'
import { Container, Menu } from '..'



function Navbar() {
  

  const [openMenu, setOpenMenu] = useState(false)

  const router = useRouter()
  const isCheckoutPage = router.asPath.includes('checkout')

  return (
    <div className='border-b'>
      <Container>
        <div className='p-2 py-4'>
          <div className='flex justify-between items-center'>
            {/* logo */}

            <div className='flex justify-start items-center gap-2'>
              <Link href='/'>
                <p className='text-4xl font-light uppercase'>m&s</p>
              </Link>
              <button
                onClick={() => setOpenMenu(true)}
                className='md:hidden text-gray-600'
              >
                <RxHamburgerMenu fontSize={20} />
              </button>
            </div>

            {/* nav search */}

            {!isCheckoutPage && (
              <div className='hidden sm:flex w-1/2  justify-center items-center'>
                <input
                  className='bg-gray-100 w-[90%] h-10 p-1 px-3 outline-none'
                  placeholder='Search products'
                />
                <button className='flex justify-center items-center bg-[#bbd850] p-1 h-10 w-10'>
                  <HiOutlineMagnifyingGlass fontSize={20} color='#fff' />
                </button>
              </div>
            )}

            {/* nav last */}

            <div className='flex justify-end items-center gap-4'>
             
            

              <Link href='/auth/login'>
                <button className='font-medium capitalize  text-gray-900'>
                  sign in
                </button>
              </Link>

              <Link href='/cart'>
                <span className=" relative w-8 h-6 bg-[#bbd850] flex justify-center items-center rounded border-[1px] border-gray-900 text-sm cursor-pointer before:content[''] before:absolute before:border-[1px] before:border-gray-900 before:rounded-full before:w-4 before:h-6 before:top-[-15px] before:z-[-1]">
                  2
                </span>
              </Link>
            </div>
          </div>

          {/* menu */}

          <Menu open={openMenu} setOpen={setOpenMenu} />

          {/* Nav bottom */}
        </div>
      </Container>
      {!isCheckoutPage && (
        <div className='border-t-[1px]  border-gray-300'>
          <Container>
            <div className='p-1 flex justify-center items-center gap-10'>
              <p className='font-medium capitalize text-gray-900 text-xs'>
                free delivery
              </p>
              <p className='text-black font-light'>|</p>
              <p className='font-medium capitalize text-gray-900 text-xs'>
                free returns
              </p>
            </div>
          </Container>
        </div>
      )}
    </div>
  )
}

export default Navbar
