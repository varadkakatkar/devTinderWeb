import React from 'react'
import AppHeader from './AppHeder'
import { Outlet } from 'react-router-dom'
import Footer from './Footer.jsx'

const Body = () => {
  return (
    <>
    <AppHeader />
    <Outlet />
    <Footer />
    </>
  )
}

export default Body