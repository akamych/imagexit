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

export interface ILeaderboardPostData {
  data: {
    [key: string]: unknown
  }
  ratingFieldName: string
}

export type ILeaderboardResponse = Omit<ILeaderboardPostData, 'ratingFieldName'>

export interface LeaderboardState {
  data: ILeaderboardUser[]
  loading: boolean
  error: string | null
}
