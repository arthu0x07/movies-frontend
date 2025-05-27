'use client'

import { useCallback, useEffect, useState } from 'react'
import { Movie, getMovies } from '@/services/api'

interface UseMoviesParams {
  initialPage?: number
  initialPerPage?: number
}

export function useMovies({
  initialPage = 1,
  initialPerPage = 10,
}: UseMoviesParams = {}) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(initialPage)
  const [perPage] = useState(initialPerPage)
  const [totalPages, setTotalPages] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchMovies = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await getMovies({
        page,
        perPage,
        title: searchQuery || undefined,
      })

      setMovies(response.data)
      setTotalPages(response.meta.totalPages)
    } catch (err) {
      setError('Erro ao carregar filmes')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [page, perPage, searchQuery])

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setPage(1)
  }, [])

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage)
  }, [])

  return {
    movies,
    isLoading,
    error,
    page,
    totalPages,
    searchQuery,
    handleSearch,
    handlePageChange,
  }
}
