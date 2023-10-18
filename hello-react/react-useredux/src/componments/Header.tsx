import React from 'react'
import { useSelector } from 'react-redux'
import { selectName } from '../app/hooks'

function Header() {
  const user = useSelector(selectName)
  return (
    <div><h2> This is header. Welcome {user}!!</h2></div>
  )
}

export default Header