import { useState } from "react"
import { useLocation } from "react-router-dom"
import { JoinRoom } from "../templates/JoinRoom"
import { User } from "../interface"
import { UserCard } from "../components/UserCard"

const Room = () => {
  const location = useLocation()
  const locationUser = location.state?.newUser
  const [currentUser, setCurrentUser] = useState(locationUser ?? '')
  const [users, setUsers] = useState<User[]>(locationUser ? [{ userName: locationUser, message: '' }] : [])
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
      { (users.length > 0) && (
        <>
          <h2 className="mt-8">Users:</h2>
          { users.map((user, index) => (
            <UserCard key={`${user.userName}-${index}`} user={user} />
          ))}
        </>
      )}
    </div>
  )
}

export { Room }