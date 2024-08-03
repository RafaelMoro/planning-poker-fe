import { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";
import { JOIN_ROOM_SOCKET } from "../constants";

const Room = () => {
  const location = useLocation()
  const users = useMemo(() => location?.state?.users ?? [], [location])
  const { ws } = useContext(RoomContext)

  const [name, setName] = useState('')
  const { roomId } = useParams()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }
  const handleUserJoin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (ws) {
      ws.emit(JOIN_ROOM_SOCKET, { roomId, userName: name })
    }
  }
  
  useEffect(() => {
    if (ws && users.length > 0) {
      ws.emit(JOIN_ROOM_SOCKET, { roomId, userName: users[0] })
    }
  }, [roomId, ws, users])

  if (users.length === 0) {
    return (
      <form action="submit">
        <input onChange={handleChange} type="text" placeholder="Your name" />
        <button onClick={handleUserJoin}>Join</button>
      </form>
    )
  }

  return (
    <h1>
      Welcome {users[0]}
      <p>Join room: {`${window.origin}${location.pathname}`}</p>
    </h1>
  )
}

export { Room }