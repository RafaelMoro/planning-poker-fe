import { useContext } from "react"
import { RoomContext } from "../context/RoomContext"
import { CREATE_ROOM_SOCKET } from "../constants"

const CreateRoomButton = ({ userName }: { userName: string }) => {
  const { ws } = useContext(RoomContext)

  const createRoom = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log('userName', userName)
    if (ws) {
      ws.emit(CREATE_ROOM_SOCKET, { userName }) 
    }
  }

  return (
    <button onClick={createRoom}>Create session</button>
  )
}

export { CreateRoomButton }