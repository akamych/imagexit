export interface IFieldElement {
  width: number
  height: number
  top: number
  left: number
}

export interface ICellElement {
  x: number
  y: number
}

export interface ICardElement {
  width: number
  height: number
  top: number
  left: number
  img: CanvasImageSource
  id: number
}

export interface IPlayerElement {
  width: number
  height: number
  top: number
  left: number
  scope: number
}

export interface IPlayerInfoElement {
  userId: string
  login: string
  color: string
}

export interface IPlayerInfoPoint {
  userId: string
  selectedCard: number
  master: boolean
  pointsOld: number
  pointsAdd: number
}
export interface IPlayersPoint {
  move_number: number
  players: IPlayerInfoPoint[]
}
export const defaultIPlayersPoint = {
  move_number: 0,
  players: <IPlayerInfoPoint[]>[],
}
