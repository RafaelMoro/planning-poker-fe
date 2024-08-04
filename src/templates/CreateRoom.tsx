import { useState } from "react"
import { CreateRoomButton } from "../components/CreateRoomButton"

const CreateRoom = () => {
  const [name, setName] = useState('')
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  return (
    <form className="flex flex-col gap-4 max-w-lg m-auto mb-4" action="submit">
      <input className="p-2 rounded-md" onChange={handleChangeName} type="text" placeholder="Your name" />
      <CreateRoomButton userName={name} />
    </form>
  )
}

export { CreateRoom }