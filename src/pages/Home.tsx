import { JoinButton } from "../components/JoinButton"
import { CreateRoom } from "../templates/CreateRoom"

const Home = () => {
  return (
    <>
      <CreateRoom />
      <JoinButton />
    </>
  )
}

export { Home }