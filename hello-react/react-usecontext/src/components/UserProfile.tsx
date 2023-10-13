import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Children from './Children'

const UserProfile = () => {
  const { user, setUser } = useContext(UserContext)

  return (
    <>
        <div> {user.name}</div>
        <Children></Children>
    </>
  )
}

export default UserProfile