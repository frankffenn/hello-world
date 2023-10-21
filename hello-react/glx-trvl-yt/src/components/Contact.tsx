import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import HeroImage from './HeroImage'
import Form from './Form'

const Contact = () => {
  return (
    <div>
        <Navbar></Navbar>
        <HeroImage heading='Contact' text='Contact GLX Travel.'></HeroImage>
        <Form></Form>
        <Footer></Footer>
    </div>
  )
}

export default Contact