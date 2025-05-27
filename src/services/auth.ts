import { api } from './api'
import {
  SignInCredentials,
  SignUpCredentials,
  SignInResponse,
  SignUpResponse,
} from '@/@types/auth'

export async function signIn({ email, password }: SignInCredentials) {
  const response = await api.post<SignInResponse>('/authenticate', {
    email,
    password,
  })

  const { token } = response.data.data

  // We are setting token in localStorage (fallback for client-side)
  localStorage.setItem('@cubos-movies:token', token)

  //  We are setting HTTP-only cookie (more secure main strategy)
  document.cookie = `@cubos-movies:token=${token}; path=/; HttpOnly; SameSite=Strict; max-age=${7 * 24 * 60 * 60}` // 7 days

  return response.data
}

export async function signUp({ name, email, password }: SignUpCredentials) {
  const response = await api.post<SignUpResponse>('/users', {
    name,
    email,
    password,
  })

  return response.data
}
