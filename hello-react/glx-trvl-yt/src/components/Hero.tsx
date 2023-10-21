import React from 'react'
import { Link } from 'react-router-dom'
import spaceVedio from '../assets/space.mp4'

const Hero = () => {
  return (
    <div className='h-screen w-full object-contain'>
        <video className='w-full h-full fixed object-cover -z-10' 
        autoPlay 
        loop 
        muted>
        <source  src={spaceVedio} type='video/mp4'></source>
        </video>
        <div className='absolute text-center top-[40vh] text-white w-full h-full'>
            <h1 className='lg:text-7xl md:text-6xl text-5xl mb-2 font-bold'>Galaxy. Travel.</h1>
            <p className='lg:2xl md:text-xl uppercase font-light mb-4'>World's first civilian space travel.</p>
            <div className=''>
                <Link to='/training' className='text-white border bg-transparent uppercase mx-1 px-4 py-1 hover:bg-gray-200/30'>Training</Link>
                <Link to='/training' className='text-white border bg-transparent uppercase mx-1 px-4 py-1 hover:bg-gray-200/30 bg-gray-300/20 '>Lanuch</Link>
            </div>
        </div>
    </div>
  )
}

export default Hero