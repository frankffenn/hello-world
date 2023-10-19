import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  AiOutlineMenu,
  AiOutlineClose
 } from 'react-icons/ai'

const Navbar = () => {
  const [ nav, setNav ] = useState(false)
  const handleNav = () => {
    setNav(!nav)
  }

  return (
    <div className='flex justify-between items-center h-20 w-full mx-auto px-4 bg-[#22262a] text-white'>
        <h1 className='text-[#00df9a] text-3xl font-bold'><Link to='/'>React</Link></h1>
        <ul className='hidden md:flex'>
            <li className='p-4 text-xl'> <Link to="/">Home</Link></li>
            <li className='p-4 text-xl'> <Link to="/about">About</Link></li>
            <li className='p-4 text-xl'> <Link to="/faq">FAQ</Link></li>
            <li className='p-4 text-xl'> <Link to="/contact">Contact</Link></li>
        </ul>
        <div onClick={handleNav} className='md:hidden'>
              {nav ? <AiOutlineClose size={30}></AiOutlineClose>: <AiOutlineMenu size={30}></AiOutlineMenu>}
          </div>
        <div className={nav ? 'fixed w-[60%] left-0 top-0 h-full bg-[#22262a] p-4 md:hidden ease-in-out duration-500': 'left-[-100%] fixed'}>
          <ul>
            <li className='p-4 text-xl'> <Link to="/">Home</Link></li>
            <li className='p-4 text-xl'> <Link to="/about">About</Link></li>
            <li className='p-4 text-xl'> <Link to="/faq">FAQ</Link></li>
            <li className='p-4 text-xl'> <Link to="/contact">Contact</Link></li>
          </ul>
        </div>
    </div>
  ) 
}

export default Navbar