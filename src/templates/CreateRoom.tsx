import { useState } from "react"
import { CreateRoomButton } from "../components/CreateRoomButton"

const CreateRoom = () => {
  const [newName, setNewName] = useState('')

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value)
  }

  return (
    <form className="grid grid-cols-1 gap-4 max-w-80">
      <input onChange={handleChangeName} type="text" placeholder="User Name" />
      <CreateRoomButton userName={newName} />
    </form>
  )
}

export { CreateRoom }