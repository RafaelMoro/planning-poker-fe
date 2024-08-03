import { useState } from "react"
import { CreateRoomButton } from "../components/CreateRoomButton"

const CreateRoom = () => {
  const [name, setName] = useState('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  return (
    <form action="submit">
      <input onChange={handleChange} type="text" placeholder="Your name" />
      <CreateRoomButton userName={name} />
    </form>
  )
}

export { CreateRoom }