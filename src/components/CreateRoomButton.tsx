import { useContext } from "react"
import { RoomContext } from "../context/RoomContext"
import { CREATE_ROOM_SOCKET } from "../constants"

const CreateRoomButton = ({ userName, roomName }: { userName: string, roomName: string }) => {
  const { ws } = useContext(RoomContext)

  const createRoom = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log('roomName', roomName)
    console.log('userName', userName)
    if (ws) {
      ws.emit(CREATE_ROOM_SOCKET, { userName, roomName }) 
    }
  }

  return (
    <button onClick={createRoom}>Create session</button>
  )
}

export { CreateRoomButton }