import { useState } from "react"

const HistoryPoint = ({ number, isActive }: { number: string, isActive?: boolean }) => {
  const [active, setActive] = useState(false)
  const cssClasses = active 
    ? 'h-28 w-28 flex items-center justify-center gap-4 bg-black text-white rounded-xl border border-white border-solid'
    : 'h-28 w-28 flex items-center justify-center gap-4 bg-white text-black rounded-xl'

  const handleClick = () => {
    setActive((prevState) => !prevState)
  }
  
  return (
    <button onClick={handleClick} className={cssClasses}>
      <p>{number}</p>
    </button>
  )
}

export { HistoryPoint }