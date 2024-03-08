import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchLeaderboardData, postDataToLeaderboard } from '../../api/leaderboard.api'
import { ILeaderboardPostData } from '../../types/leaderboard.types'

export const fetchLeaderboardDataAsync = createAsyncThunk('leaderboard/fetchLeaderboardData', async () => {
  const response = await fetchLeaderboardData()
  return response
})

export const postDataToLeaderboardAsync = createAsyncThunk('leaderboard/postDataToLeaderboard', async (scoreData: ILeaderboardPostData, { rejectWithValue }) => {
  try {
    await postDataToLeaderboard(scoreData)
    return scoreData
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})
