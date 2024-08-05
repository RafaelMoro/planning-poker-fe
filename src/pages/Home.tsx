import { ConnectionState } from "../components/ConnectionState"
import { CreateRoom } from "../templates/CreateRoom"

const Home = ({ isConnected }: { isConnected: boolean }) => {

  return (
    <div>
      <ConnectionState isConnected={isConnected} />
      <CreateRoom />
    </div>
  )
}

export { Home }