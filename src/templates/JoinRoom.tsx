import { useContext, useState } from "react"
import { JOIN_ROOM_SOCKET } from "../constants"
import { RoomContext } from "../context/RoomContext"
import { User } from "../interface"

const JoinRoom = () => {
  const { ws } = useContext(RoomContext)
  const [username, setUsername] = useState('')
  const [roomId, setRoomId] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }
  const handleRoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(event.target.value)
  }

  const handleUserJoin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const newUser: User = { userName: username, message: `${username} joined the room` }
    if (ws) {
      ws.emit(JOIN_ROOM_SOCKET, { roomId, newUser })
    }
  }
  return (
    <form action="submit">
      <input onChange={handleChange} type="text" placeholder="Your name" />
      <input onChange={handleRoomChange} type="text" placeholder="Room Id" />
      <button onClick={handleUserJoin}>Join</button>
    </form>
  )
}

export { JoinRoom }