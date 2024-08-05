import { createContext, ReactNode, useEffect } from "react";
import socketIO from 'socket.io-client'
import { ROOM_CREATED_SOCKET } from "../constants";
import { useNavigate } from "react-router-dom";
import { User } from "../interface";

const WS = 'http://localhost:8080'
interface RoomContextType {
  ws: typeof ws | null
}

const RoomContext = createContext<RoomContextType>({ ws: null })
const ws = socketIO(WS)

const RoomProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()

  const enterRoom = ({ roomId, newUser }: { roomId: string, newUser: User }) => {
    navigate(`/room/${roomId}`, { state: { newUser } })
  }
  const hearMessages = ({ user }: { user: User }) => {
    console.log('Message received from:', user.userName)
    console.log('Message:', user.message)
  }

  useEffect(() => {
    ws.on(ROOM_CREATED_SOCKET, enterRoom)
    ws.on('123-456-receive', hearMessages)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
  <RoomContext.Provider value={{ ws }}>
    {children}
  </RoomContext.Provider>
  )
}

export { RoomContext, RoomProvider }