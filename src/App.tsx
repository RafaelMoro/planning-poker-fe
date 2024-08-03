import './App.css'
import { CreateRoomButton } from './components/CreateRoomButton'
import { JoinButton } from './components/JoinButton'

function App() {
  return (
    <>
      <main className='main'>
        <JoinButton />
        <CreateRoomButton />
      </main>
    </>
  )
}

export default App
