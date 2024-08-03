import { useState } from "react"
import { CreateRoomButton } from "../components/CreateRoomButton"

const CreateRoom = () => {
  const [roomName, setRoomName] = useState('')
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value)
  }

  return (
    <form action="submit">
      <input onChange={handleOnChange} type="text" placeholder="Room name" />
      <CreateRoomButton roomName={roomName} />
    </form>
  )
}

export { CreateRoom }