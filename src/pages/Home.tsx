import { ConnectionState } from "../components/ConnectionState"
import { CreateRoom } from "../templates/CreateRoom"

const Home = ({ isConnected }: { isConnected: boolean }) => {

  return (
    <main className="flex flex-col items-center justify-center gap-8">
      <ConnectionState isConnected={isConnected} />
      <CreateRoom />
    </main>
  )
}

export { Home }