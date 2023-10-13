import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

function Children() {
  const { user, setUser } = useContext(UserContext)

  return (
  <div>
    <button onClick={() => {setUser({name: 'hello frank', gender:'male'})}}>Frank</button>
    <button onClick={() => {setUser({name: 'Hello Spiderman', gender:'male'})}}>Spiderman</button>
  </div>
  )
}

export default Children