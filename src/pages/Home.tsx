import { useEffect, useState } from "react"
import { socket } from "../socket"
import { ConnectionState } from "../components/ConnectionState"
import { Salutes } from "../components/Salutes"
import { ConnectionManager } from "../components/ConnectionManager"
import { SendSalute } from "../components/SendSalute"
import { MESSAGES_EVENT } from "../constants"

const Home = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState<string[]>([])
  console.log(messages)

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    function onMessage(message: string) {
      const allMessages = [...messages]
      allMessages.push(message)
      setMessages(allMessages)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on(MESSAGES_EVENT, onMessage)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off(MESSAGES_EVENT, onMessage)
    }
  }, [messages])

  useEffect(() => {
    socket.connect()
    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <div>
      <ConnectionState isConnected={isConnected} />
      <Salutes salutes={messages} />
      <ConnectionManager />
      <SendSalute />
    </div>
  )
}

export { Home }