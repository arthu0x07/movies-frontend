export interface SignInCredentials {
  email: string
  password: string
}

export interface SignUpCredentials {
  name: string
  email: string
  password: string
}

export interface SignInResponse {
  data: {
    token: string
    userId: string
  }
  meta: {
    timestamp: string
    path: string
  }
}

export interface SignUpResponse {
  data: {
    id: string
    name: string
    email: string
  }
  meta: {
    timestamp: string
    path: string
  }
}
