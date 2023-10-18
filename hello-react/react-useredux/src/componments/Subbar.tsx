import React from 'react'
import { useSelector } from 'react-redux'
import { selectName } from '../app/hooks'

function Subbar() {
  const user = useSelector(selectName)
  return (
    <div>This is Subbar. Thanks {user} !</div>
  )
}

export default Subbar