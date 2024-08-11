import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"

import { socket } from "../socket"
import { User } from "../interface"
import { CARDS_VALUES, GET_USERS_ROOM, USERS_EVENT } from "../constants"
import { JoinRoom } from "../templates/JoinRoom"
import { UserCard } from "../components/UserCard"
import { HistoryPoint } from "../components/HistoryPoint"

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
    const handleJoinRoom = ({ newUser }: { newUser?: User}) => {
      if (newUser) {
        const newUsers = [...users, newUser]
        // Update the rest of the users all the users that have joined
        socket.emit(GET_USERS_ROOM, { roomId, allUsers: newUsers })
        setUsers(newUsers)
      }
    }

    // It's the response of the emit of GET_USERS_ROOM
    const handleGetUsers = ({ allUsers }: { allUsers: User[] }) => {
      if (users.length === 0) {
        setUsers(allUsers)
      }
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
      <article>
        <p className="mb-8">Choose your card</p>
        <div className="grid grid-cols-5 gap-4">
          { CARDS_VALUES.map((card) => (
            <HistoryPoint key={card} number={card} />
          ))}
        </div>
      </article>
    </div>
  )
}

export { Room }