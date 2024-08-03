import { createContext, ReactNode } from "react";
import socketIO from 'socket.io-client'

const WS = 'http://localhost:8080'
interface RoomContextType {
  ws: typeof ws | null
}

const RoomContext = createContext<RoomContextType>({ ws: null })
const ws = socketIO(WS)

const RoomProvider = ({ children }: { children: ReactNode }) => (
  <RoomContext.Provider value={{ ws }}>
    {children}
  </RoomContext.Provider>
)

export { RoomContext, RoomProvider }