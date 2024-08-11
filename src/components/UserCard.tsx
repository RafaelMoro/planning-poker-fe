import { User } from "../interface"

const UserCard = ({ user, showVote }: { user: User, showVote?: boolean }) => {
  const voteText = user.purpose === 'vote' ? 'Voted' : ''
  return (
    <div className="h-28 w-28 border border-solid rounded-xl border-white flex flex-col items-center justify-center gap-2">
      <p>{user.userName}</p>
      { !showVote && (<p>{voteText}</p>)}
      { showVote && (<p>{user.message}</p>)}
    </div>
  )
}

export { UserCard }