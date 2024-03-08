import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/AuthReducer'
import avatarReducer from './reducers/AvatarReducer'
import leaderboardReducer from './reducers/LeaderboardReducer'

const store = configureStore({
  reducer: {
    auth: authReducer,
    avatar: avatarReducer,
    leaderboard: leaderboardReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
