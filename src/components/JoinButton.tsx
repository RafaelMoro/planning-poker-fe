import { useContext } from "react"
import { RoomContext } from "../context/RoomContext"
import { JOIN_ROOM_SOCKET } from "../constants"

const JoinButton = () => {
  const { ws } = useContext(RoomContext)
  const joinRoom = () => {
    if (ws) {
      ws.emit(JOIN_ROOM_SOCKET)
    }
  }

  return (
    <button onClick={joinRoom}>Join session</button>
  )
}

export { JoinButton }