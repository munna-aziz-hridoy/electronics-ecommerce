import React from 'react'

import { Header, Navbar, Footer } from '../index'

function User({ children }) {
  return (
    <div className='min-h-screen'>
      <Header />
      <Navbar />
      <div className='min-h-[80vh]'>{children}</div>
      <Footer />
    </div>
  )
}

export default User
