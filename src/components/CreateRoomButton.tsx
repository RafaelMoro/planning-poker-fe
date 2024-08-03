import { useContext } from "react"
import { RoomContext } from "../context/RoomContext"
import { CREATE_ROOM_SOCKET } from "../constants"

const CreateRoomButton = () => {
  const { ws } = useContext(RoomContext)
  const createRoom = () => {
    if (ws) {
      ws.emit(CREATE_ROOM_SOCKET)
    }
  }

  return (
    <button onClick={createRoom}>Create session</button>
  )
}

export { CreateRoomButton }