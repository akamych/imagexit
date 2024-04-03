import { useSelector, useDispatch } from 'react-redux'
import { fetchLeaderboardDataAsync, postDataToLeaderboardAsync } from '../store/actions/LeaderboardActions'
import { SCORE_LABEL } from '../constants/common'
import { ILeaderboardPostData } from '../types/leaderboard.types'
import { RootState, AppDispatch } from '../store/Store'
import { selectUser } from '../store/reducers/AuthReducer'

export const useSetScore = () => {
  const user = useSelector((state: RootState) => selectUser(state))
  const login = user?.login
  const dispatch: AppDispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state.leaderboard)

  const updateScore = async (lastScore: number) => {
    try {
      dispatch(fetchLeaderboardDataAsync())

      const currentUser = state.leaderboardData.find(user => user.login === login)
      const currentScore = currentUser?.points || 0

      const totalScore = currentScore + lastScore

      const scoreData: ILeaderboardPostData = {
        data: {
          id: currentUser?.id,
          login: login,
          avatar: currentUser?.avatar || '',
          lastScore: lastScore,
          [SCORE_LABEL]: totalScore,
        },
        ratingFieldName: SCORE_LABEL,
      }

      dispatch(postDataToLeaderboardAsync(scoreData))
    } catch (error) {
      console.error('Failed to update score after the game:', error)
    }
  }

  return updateScore
}
