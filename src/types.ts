import { IPlayer } from "./pages/game1/GamePlay";

export interface IRoom {
  id?: string
  name?: string
  type?: string
  status?: "wait" | "in-prograss" | "done"
  size?: string
  players?: IPlayer[]
  heroes?: IDeckItem[]
  currentPlayerId?: string
  turn?: number
}

export interface IHeroPart {
  photosURL?: string[]
  style?: string
  width?: number
  className?: string
  type?: string
  interval?: number
}

export interface IHero {
  id?: string
  name?: string
  photoURL?: string
  attack?: number
  defense?: number
  description?: string
  userId?: string
  tipo?: string
  price?: number
  enabled?: boolean
  parts?: IHeroPart[]
}

export interface IDeckItem extends IHero {
  status: number
  x: number
  y: number
}

export interface IBoard {
  x: number
  y: number
}

export interface IUser {
  id?: string
  email?: string
  gems?: number
  name?: string | null | undefined
  photoURL?: string | null | undefined
}