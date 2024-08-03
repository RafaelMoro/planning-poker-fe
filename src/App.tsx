import { useEffect } from 'react'
import socketIO from 'socket.io-client'
import './App.css'

const WS = 'http://localhost:8080'

function App() {
  useEffect(() => {
    socketIO(WS)
  }, [])

  return (
    <>
      <main className='main'>
        <button>Create session</button>
      </main>
    </>
  )
}

export default App
