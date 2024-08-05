import { useState } from "react"
import { CreateRoomButton } from "../components/CreateRoomButton"

const CreateRoom = () => {
  const [newName, setNewName] = useState('')

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value)
  }

  return (
    <form>
      <input onChange={handleChangeName} type="text" placeholder="User Name" />
      <CreateRoomButton userName={newName} />
    </form>
  )
}

export { CreateRoom }