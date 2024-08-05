import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { JoinRoom } from "../templates/JoinRoom"
import { User } from "../interface"
import { UserCard } from "../components/UserCard"
import { socket } from "../socket"

const Room = () => {
  const location = useLocation()
  const { roomId } = useParams()
  const locationUser = location.state?.newUser
  const [currentUser, setCurrentUser] = useState(locationUser ?? '')
  const [users, setUsers] = useState<User[]>(locationUser ? [{ userName: locationUser, message: '' }] : [])
  const getNewUser = (userName: string) => {
    setCurrentUser(userName)
  }

  useEffect(() => {
    const handleJoinRoom = (newUser: User) => {
      setUsers((prevUsers) => [...prevUsers, newUser])
    }

    if (roomId) {
      socket.on(roomId, handleJoinRoom)
    }

    return () => {
      socket.off(roomId, handleJoinRoom)
    }
  }, [roomId])

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