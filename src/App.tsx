import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { Room } from './pages/Room'

function App() {
  return (
    <>
      <main className='main'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/room/:roomId' element={<Room />} />
        </Routes>
      </main>
    </>
  )
}

export default App
