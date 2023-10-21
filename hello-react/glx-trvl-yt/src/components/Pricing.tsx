import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import HeroImage from './HeroImage'
import PricingCards from './PricingCards'

const Pricing = () => {
  return (
    <div>
        <Navbar></Navbar>
        <HeroImage heading='Pricing' text='Choose your trip.'></HeroImage>
        <PricingCards></PricingCards>
        <Footer></Footer>
    </div>
  )
}

export default Pricing