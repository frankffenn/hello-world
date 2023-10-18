import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Analytics from './components/Analytics';
import Newletter from './components/Newletter';
import Cards from './components/Cards';
import Footer from './components/Footer';

// via Youtube: https://www.youtube.com/watch?v=ZU-drSVodBw&t=3032s

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
      <Analytics></Analytics>
      <Newletter></Newletter>
      <Cards></Cards>
      <Footer></Footer>
    </div>
  );
}

export default App;
