import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { useState } from 'react'

const Navbar = () => {
  const [ nav, setNav ] = useState(false)
  const handleNav = () => {
    setNav(!nav)
  }
  
  return (
    <div className='text-white h-20 w-full fixed flex items-center px-4 justify-between z-50'>
        <Link className='text-4xl font-bold' to='/'>GXL TRVL</Link>
        <ul className='hidden md:flex m-4'>
            <li className='px-2 text-xl'><Link to='/'>Home</Link></ li>
            <li className='px-2 text-xl'><Link to='/pricing'>Pricing</Link></li>
            <li className='px-2 text-xl'><Link to='/training'>Training</Link></li>
            <li className='px-2 text-xl'><Link to='/contact'>Contact</Link></li>
        </ul>
        <div onClick={handleNav} className='block md:hidden'>
            {nav? <AiOutlineClose size={30}></AiOutlineClose>: <AiOutlineMenu size={30}></AiOutlineMenu>}
        </div>
        <div className={`fixed left-0 top-0 w-[60%] bg-black/90 z-10 h-full flex flex-col items-center justify-center ease-in-out duration-300 ${ nav ? 'translate-x-0': 'translate-x-[-100%]'}`}>
            <ul className=''>
                <li className='py-4 text-xl uppercase'><Link to='/'>Home</Link></li>
                <li className='py-4 text-xl uppercase'><Link to='/pricing'>Pricing</Link></li>
                <li className='py-4 text-xl uppercase'><Link to='/training'>Training</Link></li>
                <li className='py-4 text-xl uppercase'><Link to='/contact'>Contact</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar