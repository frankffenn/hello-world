
import './App.css';
import UserProfile from './components/UserProfile';
import { useState } from 'react'
import {UserProvider} from './context/UserContext'

function App() {

  const [use, setUser] = useState({
    name: 'lanbo',
    gender: 'male',
  })

  return (
    <UserProvider>
      <div className='container'>
            <div><h2>WHO ARE YOU?</h2></div>
            <UserProfile />
      </div>
    </UserProvider>
   
  );
}

export default App;
