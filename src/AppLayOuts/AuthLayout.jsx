import React from 'react'
import { Outlet } from 'react-router-dom'
import authbg from '../imgSrc/blob-scatter-haikei.png'

function AuthLayout() {
  return (
    <>
    <div className=''>
     
      <Outlet/>
    </div>
    </>
  )
}

export default AuthLayout
