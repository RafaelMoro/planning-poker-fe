import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";
import { JOIN_ROOM_SOCKET } from "../constants";

const Room = () => {
  const location = useLocation()
  const [currentUser, setCurrentUser] = useState(location?.state?.user ?? '')
  const [newUser, setNewUser] = useState('')
  const { ws } = useContext(RoomContext)

  const { roomId } = useParams()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser(event.target.value)
  }
  const handleUserJoin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setCurrentUser(newUser)
    if (ws) {
      ws.emit((roomId ?? JOIN_ROOM_SOCKET), { userName: currentUser, message: `${currentUser} joined the room` })
    }
  }
  
  useEffect(() => {
    if (ws && currentUser) {
      ws.emit((roomId ?? JOIN_ROOM_SOCKET), { userName: currentUser, message: `${currentUser} joined the room` })
    }
  }, [roomId, ws, currentUser])

  if (!currentUser) {
    return (
      <form action="submit">
        <input onChange={handleChange} type="text" placeholder="Your name" />
        <button onClick={handleUserJoin}>Join</button>
      </form>
    )
  }

  return (
    <main>
      <h1>
        Welcome {currentUser}
      </h1>
      <p>Join room: {`${window.origin}${location.pathname}`}</p>
    </main>
  )
}

export { Room }