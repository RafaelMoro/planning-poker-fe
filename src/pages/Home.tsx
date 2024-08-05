import { useEffect, useState } from "react"
import { socket } from "../socket"
import { ConnectionState } from "../components/ConnectionState"

const Home = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [salutes, setSalutes] = useState<string[]>([])

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    function onSalute(event: string) {
      setSalutes(events => [...events, event])
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('salute', onSalute)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('salute', onSalute)
    }
  })
  return (
    <div>
      <ConnectionState isConnected={isConnected} />
    </div>
  )
}

export { Home }