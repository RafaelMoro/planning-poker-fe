import { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";
import { User } from "../interface";

const Room = () => {
  const location = useLocation()
  console.log(location.state)
  const currentUser = useMemo(() => location?.state?.newUser?.userName ?? '', [location])
  const [message, setMessage] = useState('') 
  console.log('currentUser', currentUser)
  const { ws } = useContext(RoomContext)
  const { roomId } = useParams()

  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  const handleMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (ws && roomId) {
      console.log('here')
      ws.emit(roomId, { user: { userName: currentUser, message: message } })
    }
  }

  const handleReceiveMessage = ({ user }: { user: User }) => {
    console.log('hi')
    console.log('Message received from:', user.userName)
    console.log('Message:', user.message)
  }

  useEffect(() => {
    if (ws && roomId) {
      console.log('listening', roomId)
      ws.on(roomId, handleReceiveMessage)
    }
  }, [roomId, ws])

  return (
    <main>
      <h1>
        Welcome {currentUser}
      </h1>
      {/* <p>Join room Id: {`${window.origin}${location.pathname}`}</p> */}
      <p>Join Room Id: {roomId}</p>
      <form>
        <input onChange={handleChangeMessage} type="text" placeholder="Message" />
        <button onClick={handleMessage}>Send Message</button>
      </form>
    </main>
  )
}

export { Room }