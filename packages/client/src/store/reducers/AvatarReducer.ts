import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../Store'

interface AvatarState {
  src: string | null
}

const initialAvatarState: AvatarState = {
  src: null,
}

const avatarSlice = createSlice({
  name: 'avatar',
  initialState: initialAvatarState,
  reducers: {
    updateAvatarSrc: (state, action: PayloadAction<string | null>) => {
      state.src = action.payload
    },
  },
})

export const { updateAvatarSrc } = avatarSlice.actions

export default avatarSlice.reducer

export const selectAvatarSrc = (state: RootState) => state.avatar.src
