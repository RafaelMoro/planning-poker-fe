import { User } from "../interface"

const UserCard = ({ user, cardNumber }: { user: User, cardNumber?: number }) => {
  const voteText = user.purpose === 'vote' ? 'Voted' : ''
  return (
    <div className="h-28 w-28 border border-solid rounded-xl border-white flex flex-col items-center justify-center gap-2">
      <p>{user.userName}</p>
      <p>{voteText}</p>
    </div>
  )
}

export { UserCard }