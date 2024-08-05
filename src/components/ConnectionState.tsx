const ConnectionState = ({ isConnected }: { isConnected: boolean }) => {
  return (
    <div>
      <p>Connected: {isConnected ? 'Connected' : 'Disconnected'}</p>
    </div>
  )
}

export { ConnectionState }