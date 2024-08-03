import { createContext, ReactNode, useEffect } from "react";
import socketIO from 'socket.io-client'
import { ROOM_CREATED_SOCKET } from "../constants";

const WS = 'http://localhost:8080'
interface RoomContextType {
  ws: typeof ws | null
}

const RoomContext = createContext<RoomContextType>({ ws: null })
const ws = socketIO(WS)

const RoomProvider = ({ children }: { children: ReactNode }) => {
  const enterRoom = ({ roomId }: { roomId: string }) => {
    console.log('room created =>', roomId)
  }
  useEffect(() => {
    ws.on(ROOM_CREATED_SOCKET, enterRoom)
  }, [])

  return (
  <RoomContext.Provider value={{ ws }}>
    {children}
  </RoomContext.Provider>
  )
}

export { RoomContext, RoomProvider }