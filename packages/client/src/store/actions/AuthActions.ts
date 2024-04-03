import { createAsyncThunk } from '@reduxjs/toolkit'
import { LoginDto, SignUpDto, UserDetails } from '../../types/store'
import { HTTP_STATUSES } from '../../constants/httpStatuses'

const userLocalCreate = async (user: UserDetails) => {
  try {
    const bodyJson = {
      firstName: user.first_name,
      secondName: user.second_name,
      displayName: user.display_name ? user.display_name : user.login,
      phone: user.phone,
      login: user.login,
      avatar: user.avatar,
      email: user.email,
    }
    const response = await fetch(`api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(bodyJson),
    })

    if (response.status != 200 && response.status != 304) {
      const error = await response.json()

      return false
    }

    const userLocal = await response.json()
    return userLocal
  } catch (error) {
    return false
  }
}

const userLocalGet = async (user: UserDetails) => {
  try {
    const response = await fetch(`api/user?email=${user.email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (response.status != 200 && response.status != 304) {
      const error = await response.json()
    }

    const userLocal = await response.json()

    if (userLocal.length == 0) {
      const userCreate = await userLocalCreate(user)
      return userCreate
    }
    return userLocal
  } catch (error) {
    return false
  }
}

const authRequest = async (rejectWithValue: (value: string) => unknown) => {
  try {
    const response = await fetch('https://ya-praktikum.tech/api/v2/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (response.status != HTTP_STATUSES.SUCCESS) {
      const error = await response.json()
      return rejectWithValue(error.reason)
    }

    const user = await response.json()
    const userLocal = await userLocalGet(user)

    return { ...user, id_local: userLocal[0].id }
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

export const logoutAction = createAsyncThunk<UserDetails | void, undefined>('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await fetch('https://ya-praktikum.tech/api/v2/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: null,
    })

    if (response.status !== HTTP_STATUSES.SUCCESS) {
      const error = await response.json()
      return thunkAPI.rejectWithValue(error.reason)
    }
  } catch (error) {
    return thunkAPI.rejectWithValue('Возникла ошибка')
  }
})
