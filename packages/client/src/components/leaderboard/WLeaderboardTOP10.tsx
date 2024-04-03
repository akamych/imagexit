import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLeaderboardDataAsync } from '../../store/actions/LeaderboardActions'
import { RootState } from '../../store/Store'
import { WLeaderboardTable } from './WLeaderboardTable'
import { AppDispatch } from '../../store/Store'

export const WLeaderboardTOP10 = () => {
  const dispatch: AppDispatch = useDispatch()
  const leaderboardData = useSelector((state: RootState) => state.leaderboard.leaderboardData)

  useEffect(() => {
    dispatch(fetchLeaderboardDataAsync())
  }, [dispatch])

  return (
    <>
      <WLeaderboardTable users={leaderboardData} selectId={1} />
    </>
  )
}
