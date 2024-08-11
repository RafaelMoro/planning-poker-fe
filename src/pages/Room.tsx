import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"

import { socket } from "../socket"
import { CardFibonacci, User } from "../interface"
import { CARDS_FIBONACCI_VALUES, GET_USERS_ROOM, SEND_MESSAGE_EVENT, USERS_EVENT } from "../constants"
import { JoinRoom } from "../templates/JoinRoom"
import { UserCard } from "../components/UserCard"
import { HistoryPoint } from "../components/HistoryPoint"

const Room = () => {
  const location = useLocation()
  const { roomId } = useParams()
  const locationUser = location.state?.newUser
  const [currentUser, setCurrentUser] = useState<string>(locationUser ?? '')
  const [showVotes, setShowVotes] = useState(false)
  const [cards, setCards] = useState<CardFibonacci[]>(CARDS_FIBONACCI_VALUES)
  const [users, setUsers] = useState<User[]>(locationUser ? [{ userName: locationUser, message: '', purpose: 'join-room' }] : [])
  const getNewUser = (userName: string) => {
    setCurrentUser(userName)
  }

  const handleCardClick = (cardValue: string) => {
    if (roomId) {
      const userUpdated: User = { userName: currentUser, message: cardValue, purpose: 'vote' }
      const payload = { roomId, userName: userUpdated }
      socket.emit(SEND_MESSAGE_EVENT, payload)
      console.log('message sent', payload)
    }
    setCards(cards.map((c) => ({ ...c, isActive: c.value === cardValue })))
  }

  useEffect(() => {
    const handleRoomIdChannel = ({ newUser }: { newUser?: User}) => {
      if (newUser?.purpose === 'join-room') {
        const newUsers = [...users, newUser]
        // Update the rest of the users all the users that have joined
        socket.emit(GET_USERS_ROOM, { roomId, allUsers: newUsers })
        setUsers(newUsers)
      }

      // If we receive a vote, update users state
      if (newUser?.purpose === 'vote') {
        const userUpdated: User[] = users.map((user) => {
          if (user.userName === newUser.userName) {
            return { ...user, purpose: 'vote', message: newUser.message }
          }
          return user
        })
        setUsers(userUpdated)
      }
    }

    // It's the response of the emit of GET_USERS_ROOM
    const handleGetUsers = ({ allUsers }: { allUsers: User[] }) => {
      if (users.length === 0) {
        setUsers(allUsers)
      }
    }

    if (roomId) {
      socket.on(roomId, handleRoomIdChannel)
      socket.on(USERS_EVENT, handleGetUsers)
    }

    return () => {
      socket.off(roomId, handleRoomIdChannel)
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
          { users.length > 0 && (<button className="mt-4" onClick={() => setShowVotes(true)}>Show votes</button>)}
          <div className="flex gap-8">
            { users.map((user, index) => (
              <UserCard key={`${user.userName}-${index}`} user={user} showVote={showVotes} />
            ))}
          </div>
        </>
      )}
      <article>
        <p className="mb-8">Choose your card</p>
        <div className="grid grid-cols-5 gap-4">
          { cards.map((card) => (
            <HistoryPoint key={card.value} number={card.value} isActive={card.isActive} handleCardClick={handleCardClick} />
          ))}
        </div>
      </article>
    </div>
  )
}

export { Room }