import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { UserDetails } from '../../types/store'
import { HTTP_STATUSES } from '../../constants/httpStatuses'

const API_URL = 'https://ya-praktikum.tech/api/v2'

// Define the action creator for updateUser
export const updateUser = createAction<string>('avatar/updateUser')

// Define the async thunk for updating user profile/avatar
export const updateUserProfileAvatar = createAsyncThunk(
  'avatar/updateUserProfileAvatar', // action type prefix
  async (userData: UserDetails) => {
    try {
      const response = await fetch(`${API_URL}/user/profile/avatar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      })

      if (response.status !== HTTP_STATUSES.SUCCESS) {
        const error = await response.json()
        throw new Error(error.reason) // Throw an error if request is not successful
      } else {
        const newUser = await response.json() // Assuming server returns updated user data
        return newUser // Return the updated user data
      }
    } catch (error) {
      throw new Error('Failed to update user') // Throw a generic error message
    }
  }
)
