import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Template: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
        <Navbar/>
        <main className="bg-tertiary-100 min-h-screen">
            { children }
        </main>
        <Footer/>
    </>
  )
}

export default Template