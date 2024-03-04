import { useEffect, useState } from 'react'
import { WLeaderboardTable } from './WLeaderboardTable'
import { ILeaderboardUser } from '../../types/leaderboard.types'
import { fetchLeaderboardData } from '../../api/leaderboard.api'

export const WLeaderboardTOP10 = () => {
  const [leaderboardData, setLeaderboardData] = useState<ILeaderboardUser[]>([])

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const data = await fetchLeaderboardData()
      setLeaderboardData(data)
    }

    fetchLeaderboard()
  }, [])

  return (
    <>
      <WLeaderboardTable users={leaderboardData} selectId={1} />
    </>
  )
}
