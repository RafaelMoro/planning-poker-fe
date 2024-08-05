const Salutes = ({ salutes }: { salutes: string[] }) => {
  return (
    <>
    { (salutes.length === 0) && (
      <p>No salutes yet</p>
    )}
    { (salutes.length > 0) && (
      <ul>
        {salutes.map((salute, index) => (
          <li key={index}>{salute}</li>
        ))}
      </ul>
    )}
    </>
  )
}

export { Salutes }