import { CREATE_ROOM_SOCKET } from "../constants"
import { socket } from "../socket"

const CreateRoomButton = ({ userName }: { userName: string }) => {
  const handleCreateRoom = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    socket.emit(CREATE_ROOM_SOCKET, { userName })
  }
  return (
    <button onClick={handleCreateRoom}>Create Room</button>
  )
}

export { CreateRoomButton }