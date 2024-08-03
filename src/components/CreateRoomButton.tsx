import { useContext } from "react"
import { RoomContext } from "../context/RoomContext"
import { CREATE_ROOM_SOCKET } from "../constants"

const CreateRoomButton = ({ roomName }: { roomName: string }) => {
  const { ws } = useContext(RoomContext)
  const createRoom = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (ws) {
      console.log(roomName)
      ws.emit(CREATE_ROOM_SOCKET, { roomName }) 
    }
  }

  return (
    <button onClick={createRoom}>Create session</button>
  )
}

export { CreateRoomButton }