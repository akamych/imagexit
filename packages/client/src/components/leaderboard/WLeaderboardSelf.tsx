import React from 'react'

import { dataTestLeaderboardUsersSelf } from '../../constants/data.leaderboard'
import { WLeaderboardTable } from './WLeaderboardTable'

export const WLeaderboardSelf = () => {
  return (
    <>
      <WLeaderboardTable users={dataTestLeaderboardUsersSelf} selectId={7} />
    </>
  )
}
