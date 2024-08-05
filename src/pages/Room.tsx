import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { JoinRoom } from "../templates/JoinRoom"
import { User } from "../interface"
import { UserCard } from "../components/UserCard"
import { socket } from "../socket"
import { GET_USERS_ROOM, USERS_EVENT } from "../constants"

const Room = () => {
  const location = useLocation()
  const { roomId } = useParams()
  const locationUser = location.state?.newUser
  const [currentUser, setCurrentUser] = useState(locationUser ?? '')
  const [users, setUsers] = useState<User[]>(locationUser ? [{ userName: locationUser, message: '' }] : [])
  const getNewUser = (userName: string) => {
    setCurrentUser(userName)
  }

  const handleGetUsers = () => {
    socket.emit(GET_USERS_ROOM, { roomId })
  }

  useEffect(() => {
    const handleJoinRoom = ({ newUser }: { newUser?: User}) => {
      if (newUser) {
        const newUsers = [...users, newUser]
        socket.emit(GET_USERS_ROOM, { roomId, users: newUsers })
        setUsers(newUsers)
      }
    }

    const handleGetUsers = (props: unknown) => {
      console.log('props', props)
    }

    if (roomId) {
      socket.on(roomId, handleJoinRoom)
      socket.on(USERS_EVENT, handleGetUsers)
    }

    return () => {
      socket.off(roomId, handleJoinRoom)
      socket.off(USERS_EVENT, handleGetUsers)
    }
  }, [roomId, users])

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
      <button onClick={handleGetUsers}>Get users</button>
    </div>
  )
}

export { Room }