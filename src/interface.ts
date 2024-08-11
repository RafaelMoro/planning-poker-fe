export type PurposesTypes = 'join-room' | 'create-room' | 'vote'

export interface User {
  userName: string;
  message: string;
  purpose: PurposesTypes;
}

export interface CardFibonacci {
  value: string;
  isActive: boolean;
}