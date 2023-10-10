import React from 'react';
import  Home  from './pages/Home'
import About from './pages/About'

import Navbar from './components/Navbar';
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [showNav, setShowNav] = useState(false)
  return (
    <>    
    <Router>
      <div className="App font-sans">
        <header className='h-20 w-full bg-[#011627] p-8'>
          <GiHamburgerMenu className='text-2xl text-white' onClick={()=>setShowNav(!showNav)}></GiHamburgerMenu>
          </header>
        <Navbar show={showNav}></Navbar>
        <div className='flex h-[90vh] items-center justify-center items-center text-xl text-gray-500'>
          <Routes>
            <Route path='/' Component={Home}></Route>
            <Route path='/about' Component={About}></Route>
          </Routes>
        </div>
      </div>
      </Router>  
    </>
  );
}

export default App;
