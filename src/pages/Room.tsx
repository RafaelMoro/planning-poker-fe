import { useState } from "react"
import { useLocation } from "react-router-dom"
import { JoinRoom } from "../templates/JoinRoom"

const Room = () => {
  const location = useLocation()
  const locationUser = location.state?.newUser
  const [currentUser, setCurrentUser] = useState(locationUser ?? '')
  const getNewUser = (userName: string) => {
    setCurrentUser(userName)
  }

  if (!currentUser) {
    return (
      <JoinRoom getNewUser={getNewUser} />
    )
  }
  return (
    <div>
      <h1>Welcome {currentUser}</h1>
    </div>
  )
}

export { Room }