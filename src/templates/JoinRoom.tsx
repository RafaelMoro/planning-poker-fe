import { useState } from "react"
import { socket } from "../socket"
import { JOIN_ROOM_SOCKET } from "../constants"
import { useParams } from "react-router-dom"

interface JoinRoomProps {
  getNewUser: (userName: string) => void
}

const JoinRoom = ({ getNewUser }: JoinRoomProps) => {
  const [name, setName] = useState('')
  const { roomId } = useParams();
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleJoinRoom = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    socket.emit(JOIN_ROOM_SOCKET, { roomId, userName: name })
    getNewUser(name)
  }

  return (
    <form className="flex flex-col items-center justify-center gap-8">
      <h1>Joining Room</h1>
      <input className="p-2 rounded-xl" onChange={handleChangeName} type="text" placeholder="Enter your name" />
      <button onClick={handleJoinRoom}>Join Room</button>
    </form>
  )
}

export { JoinRoom }