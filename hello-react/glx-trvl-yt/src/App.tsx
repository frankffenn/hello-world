import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Pricing from './components/Pricing';
import Training from './components/Training';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={Home}></Route>
        <Route path='/pricing' Component={Pricing}></Route>
        <Route path='/training' Component={Training}></Route>
        <Route path='/contact' Component={Contact}></Route>
      </Routes>
    </Router>
  );
}

export default App;
