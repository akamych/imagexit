// store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/AuthReducer'

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

export const initStoreSSR = (preloadedState = {}) => {
  const slices = {
    auth: authReducer,
  }
  const reducer = combineReducers(slices)
  const store = configureStore({
    reducer,
    preloadedState,
  })

  return store
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
