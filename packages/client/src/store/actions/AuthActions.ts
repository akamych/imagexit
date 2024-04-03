import { createAsyncThunk } from '@reduxjs/toolkit'
import { LoginDto, SignUpDto, UserDetails } from '../../types/store'
import { HTTP_STATUSES } from '../../constants/httpStatuses'

const authRequest = async (rejectWithValue: (value: string) => unknown) => {
  try {
    const response = await fetch('https://ya-praktikum.tech/api/v2/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (response.status !== HTTP_STATUSES.SUCCESS) {
      const error = await response.json()
      return rejectWithValue(error.reason)
    }

    const user = await response.json()
    return user
  } catch (error) {
    return rejectWithValue('Возникла ошибка')
  }
}

export const authAction = createAsyncThunk<UserDetails, undefined, { rejectValue: string }>('auth/user', async (userData, { rejectWithValue }) => await authRequest(rejectWithValue))

export const loginAction = createAsyncThunk<UserDetails, LoginDto, { rejectValue: string }>('auth/signin', async (userData, { rejectWithValue }) => {
  try {
    const response = await fetch('https://ya-praktikum.tech/api/v2/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    })

    if (response.status !== HTTP_STATUSES.SUCCESS) {
      const error = await response.json()
      return rejectWithValue(error.reason)
    } else {
      return await authRequest(rejectWithValue)
    }
  } catch (error) {
    return rejectWithValue('Возникла ошибка')
  }
})

export const signupAction = createAsyncThunk<UserDetails, SignUpDto, { rejectValue: string }>('auth/signup', async (userData, { rejectWithValue }) => {
  try {
    const response = await fetch('https://ya-praktikum.tech/api/v2/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    })

    if (response.status !== HTTP_STATUSES.SUCCESS) {
      const error = await response.json()
      return rejectWithValue(error.reason)
    } else {
      return await authRequest(rejectWithValue)
    }
  } catch (error) {
    return rejectWithValue('Возникла ошибка')
  }
})
