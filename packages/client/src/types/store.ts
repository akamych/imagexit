export interface UserDetails {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string | null
  email: string
  id_local?: number
}

export interface LoginDto {
  login: string
  password: string
}

export interface SignUpDto {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export interface StoreAction {
  type: string
  payload?: Record<string, unknown> | string
}
