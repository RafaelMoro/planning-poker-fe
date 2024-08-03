import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";
import { JOIN_ROOM_SOCKET } from "../constants";

const Room = () => {
  const { roomId } = useParams()
  const { ws } = useContext(RoomContext)
  
  useEffect(() => {
    if (ws) {
      ws.emit(JOIN_ROOM_SOCKET, { roomId })
    }
  }, [roomId, ws])

  return (
    <h1>
      Room
    </h1>
  )
}

export { Room }