import { createContext, ReactNode, useEffect } from "react";
import socketIO from 'socket.io-client'

const WS = 'http://localhost:8080'
interface RoomContextType {
  ws: typeof ws | null
}

const RoomContext = createContext<RoomContextType>({ ws: null })
const ws = socketIO(WS)

const RoomProvider = ({ children }: { children: ReactNode }) => {
  const enterRoom = ({ roomId }: { roomId: string }) => {
    console.log('room-created', roomId)
  }
  useEffect(() => {
    ws.on('room-created', enterRoom)
  }, [])

  return (
  <RoomContext.Provider value={{ ws }}>
    {children}
  </RoomContext.Provider>
  )
}

export { RoomContext, RoomProvider }