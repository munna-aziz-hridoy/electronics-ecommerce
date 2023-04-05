import React from 'react'

function SignMeUp() {
  return (
    <div>
      <div className='flex flex-col justify-center items-center gap-5'>
        <h3 className='text-2xl text-center'>Don't miss out</h3>
        <p className='text-center md:w-1/3'>
          Register to receive exclusive offers tailored to you, plus rewards and
          promotions before anyone else. Just select ‘YES’ during step 3 on the
          next page and never miss a thing.
        </p>
        <form>
          <input
            className='border border-black py-3  pl-5 md:pr-44 mr-3'
            type='text'
            placeholder='Enter your email address'
          />
          <button className='bg-[#bdd755] py-3.5 px-3 text-white font-bold'>
            Sign me up
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignMeUp