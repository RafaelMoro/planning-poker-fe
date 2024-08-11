interface HistoryPointProps {
  number: string;
  isActive?: boolean;
  handleCardClick: (cardValue: string) => void;
}

const HistoryPoint = ({ number, isActive, handleCardClick }: HistoryPointProps) => {
  const cssClasses = isActive 
    ? 'h-28 w-28 flex items-center justify-center gap-4 bg-black text-white rounded-xl border border-white border-solid'
    : 'h-28 w-28 flex items-center justify-center gap-4 bg-white text-black rounded-xl'

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      handleCardClick(number)
    }
  
  return (
    <button onClick={handleClick} className={cssClasses}>
      <p>{number}</p>
    </button>
  )
}

export { HistoryPoint }