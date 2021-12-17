import { IPlayer } from "./pages/game1/GamePlay";

export interface IRoom {
  id?: string
  name?: string
  type?: string
  size?: string
  players?: IPlayer[]
  currentPlayerId?: string
}


export interface IHeroPart {
  photosURL?: [string]
  style?: string
  className?: string
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
  partHead?: IHeroPart // cabeça
  partEyes?: IHeroPart // olhos
  partNose?: IHeroPart // nariz
  partMouth?: IHeroPart // boca
  partBreastplate?: IHeroPart // peitoral
  partArmL?: IHeroPart // braço esquerdo
  partArmR?: IHeroPart // braco direito
  partLegL?: IHeroPart // perna esquerda
  partLegR?: IHeroPart // perna direita
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
  email: string
  name: string | null | undefined
  photoURL: string | null | undefined
}