import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../Store'
import { UserDetails } from '../../types/store'
import { Nullable } from '../../types/common'
import { authAction, loginAction, signupAction } from '../actions/AuthActions'

interface AuthState {
  user: Nullable<UserDetails>
  error: Nullable<string>
}

export const initialAuthState: AuthState = {
  user: null,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(authAction.fulfilled, (state: AuthState, action: PayloadAction<UserDetails>) => {
      state.user = action.payload
      state.error = null
    })
    builder.addCase(authAction.rejected, (state: AuthState, action: PayloadAction<string | undefined>) => {
      if (action.payload) {
        state.user = null
        state.error = action.payload || 'Аутентификация неудачная'
      }
    })
    builder.addCase(loginAction.fulfilled, (state: AuthState, action: PayloadAction<UserDetails>) => {
      state.user = action.payload
      state.error = null
    })
    builder.addCase(loginAction.rejected, (state: AuthState, action: PayloadAction<string | undefined>) => {
      if (action.payload) {
        state.user = null
        state.error = action.payload || 'Авторизация неудачная'
      }
    })
    builder.addCase(signupAction.fulfilled, (state: AuthState, action: PayloadAction<UserDetails>) => {
      state.user = action.payload
      state.error = null
    })
    builder.addCase(signupAction.rejected, (state: AuthState, action: PayloadAction<string | undefined>) => {
      if (action.payload) {
        state.user = null
        state.error = action.payload || 'Регистрация неудачная'
      }
    })
  },
})

export default authSlice.reducer

export const selectUser = (state: RootState) => state.auth.user
export const selectError = (state: RootState) => state.auth.error
