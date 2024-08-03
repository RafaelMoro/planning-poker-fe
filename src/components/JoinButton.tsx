import { useContext } from "react"
import { RoomContext } from "../context/RoomContext"

const JoinButton = () => {
  const { ws } = useContext(RoomContext)
  const joinRoom = () => {
    if (ws) {
      ws.emit('join-room')
    }
  }

  return (
    <button onClick={joinRoom}>Create session</button>
  )
}

export { JoinButton }