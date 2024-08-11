const HistoryPoint = ({ number }: { number: string }) => {
  return (
    <button className="h-28 w-28 flex items-center justify-center gap-4 bg-white text-black rounded-xl">
      <p>{number}</p>
    </button>
  )
}

export { HistoryPoint }