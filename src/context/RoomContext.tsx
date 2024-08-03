import { createContext, ReactNode } from "react";
import socketIO from 'socket.io-client'

const WS = 'http://localhost:8080'

const RoomContext = createContext<null | typeof ws>(null)
const ws = socketIO(WS)

const RoomProvider = ({ children }: { children: ReactNode }) => (
  <RoomContext.Provider value={ws}>
    {children}
  </RoomContext.Provider>
)

export { RoomContext, RoomProvider }