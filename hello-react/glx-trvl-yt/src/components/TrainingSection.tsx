import React from 'react'
import Pod from '../assets/pod.jpg'
import Moon from '../assets/moon.jpg'
import { Link } from 'react-router-dom'

const TrainingSection = () => {
  return (
    <div className='grid md:grid-cols-2 grid-cols-1 gap-x-4 w-full h-full bg-black h-[50vh]'>
        <div className='text-center max-w-[60%] mx-auto text-white flex justify-center flex-col'>
            <h1 className='text-2xl'>Training</h1>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <Link to='/contact'><button className='border w-[80%] px-4 py-2 mt-4 uppercase hover:bg-[#141414]'>Contact</button></Link>
        </div>
        <div className='flex justify-center items-center overflow-hidden'>
          <img src={Pod} className='object-cover max-w-[40%] ' alt="pod" />
          <img src={Moon} className='object-cover max-w-[40%]' alt="moon" />
        </div>
    </div>
  )
}

export default TrainingSection  