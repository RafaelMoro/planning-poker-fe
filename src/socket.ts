import { io } from "socket.io-client"

const URL = 'https://planning-poker-signaling-server.onrender.com'
export const socket = io(URL)