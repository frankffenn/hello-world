import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'


function App() {
  const [ showNav, setShowNav ] = useState(false)

  return (
    <>
      <Router>
        <div className="App">
          <header>
            <GiHamburgerMenu onClick={() => setShowNav(!showNav)}/>
          </header>
          {/* {showNav && <Navbar/>} */}
          <Navbar show={showNav}/>
          <div className='main'>
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
