// store.ts
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/AuthReducer'
import avatarReducer from './reducers/AvatarReducer'

const store = configureStore({
  reducer: {
    auth: authReducer,
    avatar: avatarReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
