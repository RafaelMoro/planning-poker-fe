import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { useEffect, useState } from 'react'
import { socket } from './socket'
import { CONNECT_EVENT, DISCONNECT_EVENT, ROOM_CREATED_SOCKET } from './constants'
import { User } from './interface'
import { Room } from './pages/Room'

function App() {
  const navigate = useNavigate()
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    function handleRoomCreated({ roomId, newUser }: { roomId: string, newUser: User }) {
      navigate(`room/${roomId}`, { state: { newUser: newUser.userName } })
    }

    socket.on(CONNECT_EVENT, onConnect)
    socket.on(DISCONNECT_EVENT, onDisconnect)
    socket.on(ROOM_CREATED_SOCKET, handleRoomCreated)

    return () => {
      socket.off(CONNECT_EVENT, onConnect)
      socket.off(DISCONNECT_EVENT, onDisconnect)
      socket.off(ROOM_CREATED_SOCKET, handleRoomCreated)
    }
  }, [navigate])

  useEffect(() => {
    socket.connect()
    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <>
      <main className='main'>
        <Routes>
          <Route path='/' element={<Home isConnected={isConnected} />} />
          <Route path='/room/:roomId' element={<Room />} />
        </Routes>
      </main>
    </>
  )
}

export default App
