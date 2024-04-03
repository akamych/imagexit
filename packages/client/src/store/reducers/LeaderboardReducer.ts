import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ILeaderboardUser } from '../../types/leaderboard.types'
import { fetchLeaderboardDataAsync, postDataToLeaderboardAsync } from '../actions/LeaderboardActions'

interface LeaderboardState {
  leaderboardData: ILeaderboardUser[]
  error: string | null
}

export const initialLeaderboardState: LeaderboardState = {
  leaderboardData: [],
  error: null,
}

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: initialLeaderboardState,
  reducers: {
    setLeaderboardData(state, action: PayloadAction<ILeaderboardUser[]>) {
      state.leaderboardData = action.payload
      state.error = null
    },
    setLeaderboardError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchLeaderboardDataAsync.fulfilled, (state, action) => {
        state.leaderboardData = action.payload
        state.error = null
      })
      .addCase(fetchLeaderboardDataAsync.rejected, (state, action) => {
        state.error = action.error.message || 'Не удалось загрузить список лидеров'
      })
      .addCase(postDataToLeaderboardAsync.fulfilled, (state, action) => {
        state.error = null
      })
      .addCase(postDataToLeaderboardAsync.rejected, (state, action) => {
        state.error = action.error.message || 'Не удалось отправить данные на сервер'
      })
  },
})

export default leaderboardSlice.reducer
