import { api } from './api'

interface SignInCredentials {
  email: string
  password: string
}

interface SignInResponse {
  data: {
    token: string
  }
  meta: {
    timestamp: string
    path: string
  }
}

export async function signIn({ email, password }: SignInCredentials) {
  const response = await api.post<SignInResponse>('/authenticate', {
    email,
    password,
  })

  const { token } = response.data.data

  localStorage.setItem('@cubos-movies:token', token)
  
  document.cookie = `@cubos-movies:token=${token}; path=/`

  return response.data
} 