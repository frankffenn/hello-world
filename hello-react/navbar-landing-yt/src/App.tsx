import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Hero></Hero>
      <Routes>
         <Route path='/'></Route>
      </Routes>
    </Router>
  );
}

export default App;
