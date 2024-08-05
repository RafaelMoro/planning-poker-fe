import { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";
// import { User } from "../interface";
import { RECEIVE_MESSAGE_EVENT, SEND_MESSAGE_EVENT } from "../constants";

const Room = () => {
  const location = useLocation()
  const currentUser = useMemo(() => location?.state?.newUser?.userName ?? '', [location])
  const [messageUser, setMessageUser] = useState({
    user: '',
    message: ''
  })
  const { ws } = useContext(RoomContext)
  const { roomId } = useParams()

  const handleSendMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (ws && roomId) {
      ws.emit(SEND_MESSAGE_EVENT, { user: currentUser, message: 'hola' })
    }
  }

  const handleReceiveMessage = ({ user, message }: { user: string, message: string }) => {
    console.log({ user, message })
    setMessageUser({ user, message })
  }

  useEffect(() => {
    if (ws) {
      console.log('here')
      ws.on(RECEIVE_MESSAGE_EVENT, handleReceiveMessage)
    }
  }, [ws])

  return (
    <main>
      <h1>
        Welcome {currentUser}
      </h1>
      {/* <p>Join room Id: {`${window.origin}${location.pathname}`}</p> */}
      <p>Join Room Id: {roomId}</p>
      <form>
        <button onClick={handleSendMessage}>Send Message</button>
      </form>
      { (messageUser.user) && (
        <div>
          <p>Message received from: {messageUser.user}</p>
          <p>Message: {messageUser.message}</p>
        </div>
      )}
    </main>
  )
}

export { Room }