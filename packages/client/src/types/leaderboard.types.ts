export interface ILeaderboardUser {
  id: number
  login: string
  avatar: string
  position: number
  points: number
}

export interface ILeaderboardTable {
  users: ILeaderboardUser[]
  selectId: number
}
