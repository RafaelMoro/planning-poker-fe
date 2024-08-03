import { createContext, ReactNode, useEffect } from "react";
import socketIO from 'socket.io-client'
import { ROOM_CREATED_SOCKET } from "../constants";
import { useNavigate } from "react-router-dom";

const WS = 'http://localhost:8080'
interface RoomContextType {
  ws: typeof ws | null
}

const RoomContext = createContext<RoomContextType>({ ws: null })
const ws = socketIO(WS)

const RoomProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()

  const enterRoom = ({ roomId, user }: { roomId: string, user: string }) => {
    navigate(`/room/${roomId}`, { state: { user } })
  }

  useEffect(() => {
    ws.on(ROOM_CREATED_SOCKET, enterRoom)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
  <RoomContext.Provider value={{ ws }}>
    {children}
  </RoomContext.Provider>
  )
}

export { RoomContext, RoomProvider }