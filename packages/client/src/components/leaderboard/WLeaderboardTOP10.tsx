import { dataTestLeaderboardUsersTop10 } from '../../constants/data.leaderboard'
import { WLeaderboardTable } from './WLeaderboardTable'

export const WLeaderboardTOP10 = () => {
  return (
    <>
      <WLeaderboardTable users={dataTestLeaderboardUsersTop10} selectId={7} />
    </>
  )
}
