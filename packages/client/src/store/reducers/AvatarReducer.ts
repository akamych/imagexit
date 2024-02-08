import { createReducer } from '@reduxjs/toolkit'
import { updateUser } from '../actions/AvatarActions'

const initialState = {
  user: {},
}

const avatarReducer = createReducer(initialState, builder => {
  builder.addCase(updateUser, (state, action) => {
    state.user = action.payload
  })
})

export default avatarReducer
