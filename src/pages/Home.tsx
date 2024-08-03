import { CreateRoom } from "../templates/CreateRoom"
import { JoinButton } from "../components/JoinButton"

const Home = () => {
  return (
    <>
      <CreateRoom />
      <JoinButton />
    </>
  )
}

export { Home }