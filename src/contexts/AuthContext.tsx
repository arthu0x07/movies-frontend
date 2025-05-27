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
  signOut: () => void
  checkAuth: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('@cubos-movies:token')
    setIsAuthenticated(!!token)
  }, [])

  const signOut = useCallback(() => {
    // We are removing token from localStorage and cookie
    localStorage.removeItem('@cubos-movies:token')
    document.cookie =
      '@cubos-movies:token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    setIsAuthenticated(false)
    router.push('/login')
  }, [router])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <AuthContext.Provider value={{ isAuthenticated, signOut, checkAuth }}>
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
