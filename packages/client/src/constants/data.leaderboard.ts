import { ILeaderboardUser } from '../types/leaderboard.types'

export const ILeaderboardUserDefault: ILeaderboardUser = {
  id: 0,
  login: '',
  avatar: '',
  position: 0,
  points: 0,
}
export const dataTestLeaderboardUsersTop10: ILeaderboardUser[] = Array.from({
  length: 10,
}).map((_, i) => ({
  id: i + 1,
  login: `Login-${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  position: i + 1,
  points: 1000 - i,
}))

export const dataTestLeaderboardUsersSelf: ILeaderboardUser[] = Array.from({
  length: 7,
}).map((_, i) => ({
  id: i + 4,
  login: `Login-${i + 3}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i + 3}`,
  position: i + 1 + 3,
  points: 1000 - i + 3,
}))
