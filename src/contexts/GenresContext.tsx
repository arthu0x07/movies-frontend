'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { getUniqueGenres } from '@/services/api'
import { Genre } from '@/@types/movie'

interface GenresContextType {
  genres: Genre[]
  isLoading: boolean
  error: string | null
  refetchGenres: () => Promise<void>
}

const GenresContext = createContext<GenresContextType | undefined>(undefined)

export function GenresProvider({ children }: { children: React.ReactNode }) {
  const [genres, setGenres] = useState<Genre[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGenres = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const fetchedGenres = await getUniqueGenres()
      setGenres(fetchedGenres)
    } catch (err) {
      console.error('Error fetching genres:', err)
      setError('Failed to load genres')
    } finally {
      setIsLoading(false)
    }
  }

  const refetchGenres = async () => {
    await fetchGenres()
  }

  useEffect(() => {
    fetchGenres()
  }, [])

  return (
    <GenresContext.Provider
      value={{
        genres,
        isLoading,
        error,
        refetchGenres
      }}
    >
      {children}
    </GenresContext.Provider>
  )
}

export function useGenres() {
  const context = useContext(GenresContext)
  if (context === undefined) {
    throw new Error('useGenres must be used within a GenresProvider')
  }
  return context
}
