'use client'

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { useRouter } from 'next/navigation'

interface AuthContextData {
  isAuthenticated: boolean
  userId: string | null
  signOut: () => void
  checkAuth: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('@cubos-movies:token')
    const storedUserId = localStorage.getItem('@cubos-movies:userId')
    setIsAuthenticated(!!token)
    setUserId(storedUserId)
  }, [])

  const signOut = useCallback(() => {
    // We are removing token and userId from localStorage and cookie
    localStorage.removeItem('@cubos-movies:token')
    localStorage.removeItem('@cubos-movies:userId')
    document.cookie =
      '@cubos-movies:token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    setIsAuthenticated(false)
    setUserId(null)
    router.push('/login')
  }, [router])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userId, signOut, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
