import { useState } from "react"
import { socket } from "../socket"
import { SALUTE_EVENT } from "../constants"

const SendSalute = () => {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    socket.emit(SALUTE_EVENT, message, () => {
      setIsLoading(false)
    })
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <input type="text" onChange={handleOnChange} placeholder="Say Hi" />
      <button type="submit" disabled={isLoading}>Send Salute</button>
    </form>
  )
}

export { SendSalute }