import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectName, changeName } from '../app/hooks'
import Subbar from './Subbar'

const Silderbar = ()  => {
  const dispatch = useDispatch()
  
  // Grab the name from store 
  const user = useSelector(selectName)

  // Update the store name  
  const changeNameHanlder = () => {
    const usernames = ['jojo', 'frank', 'john', 'daniel', 'jimmy']
    dispatch(changeName(usernames[Math.floor((Math.random()*usernames.length))]))
  }

  return (
   <>
    <div>This is Silderbar. Hello {user}</div>
    <Subbar></Subbar>
    <button onClick={changeNameHanlder}>ChangeName</button>
   </> 
  )
}

export default Silderbar