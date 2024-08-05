import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { useEffect, useState } from 'react'
import { socket } from './socket'
import { CONNECT_EVENT, DISCONNECT_EVENT } from './constants'

function App() {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    socket.on(CONNECT_EVENT, onConnect)
    socket.on(DISCONNECT_EVENT, onDisconnect)

    return () => {
      socket.off(CONNECT_EVENT, onConnect)
      socket.off(DISCONNECT_EVENT, onDisconnect)
    }
  }, [])

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
        </Routes>
      </main>
    </>
  )
}

export default App
