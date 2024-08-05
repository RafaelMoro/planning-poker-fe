import { User } from "../interface"

const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="h-28 w-28 border border-solid rounded-xl border-white flex items-center justify-center">
      <p>{user.userName}</p>
    </div>
  )
}

export { UserCard }