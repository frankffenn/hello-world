import React from 'react'
import NASA from '../assets/nasa.jpg'

interface Props {
    heading: string,
    text: string,
}

const HeroImage = (props: Props) => {
  return (
    <div className='h-full w-full'>
        <img src={NASA} className='object-cover w-full h-[50vh]'/>
        <div className='absolute top-[20vh] w-full text-center text-white'>
            <h1 className='lg:text-7xl md:text-6xl text-5xl mb-2 font-bold'>{props.heading}</h1>
            <p className='lg:text-3xl md:text-2xl text-xl font-light mb-4'>{props.text}</p>
        </div>
    </div>
  )
}

export default HeroImage