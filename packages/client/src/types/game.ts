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

export interface IPlayerInfo {
  userId: string
  login: string
  color: string
}

export interface IRaundPlayerInfo {
  userId: string
  selectedCard: number
  master: boolean
  pointsOld: number
  pointsAdd: number
}
export interface IRaundInfo {
  id: number
  masterUserId: string
  masterAssociation: string
  mastercardId: number
  players: IRaundPlayerInfo[]
}
export const defaultRaundInfo: IRaundInfo = {
  id: 0,
  masterUserId: '',
  masterAssociation: '',
  mastercardId: 0,
  players: [],
}

export const defaultIPlayersPoint: IRaundInfo = {
  id: 0,
  masterUserId: '',
  masterAssociation: '',
  mastercardId: 0,
  players: <IRaundPlayerInfo[]>[],
}
