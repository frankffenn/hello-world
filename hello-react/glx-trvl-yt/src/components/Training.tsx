import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import HeroImage from './HeroImage'
import TrainingSection from './TrainingSection'

const Training = () => {
  return (
    <div>
        <Navbar></Navbar>
        <HeroImage heading='Training' text='Pre-Flight & in-Flight Training.'></HeroImage>
        <TrainingSection></TrainingSection>
        <Footer></Footer>
    </div>
  )
}

export default Training