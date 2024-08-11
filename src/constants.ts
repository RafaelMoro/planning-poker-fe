import { CardFibonacci } from "./interface"

export const CONNECT_EVENT = 'connect'
export const DISCONNECT_EVENT = 'disconnect'

export const JOIN_ROOM_SOCKET = 'join-room'
export const CREATE_ROOM_SOCKET = 'create-room'
export const ROOM_CREATED_SOCKET = 'room-created'
export const GET_USERS_ROOM = 'get-users-room';
export const USERS_EVENT = 'users';

export const SEND_MESSAGE_EVENT = 'send-message';
export const RECEIVE_MESSAGE_EVENT = 'receive-message';

export const SALUTE_EVENT = 'salute'
export const MESSAGES_EVENT = 'messages'

export const CARDS_VALUES = ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '?', '☕']
export const CARDS_FIBONACCI_VALUES: CardFibonacci[] = CARDS_VALUES.map((value) => ({ value, isActive: false }))