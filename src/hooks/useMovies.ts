'use client'

import { useCallback, useEffect, useState } from 'react'
import { Movie, getMovies } from '@/services/api'
import { MovieFilters } from '@/components/FiltersModal'

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
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [filters, setFilters] = useState<MovieFilters>({})

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const fetchMovies = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const params: any = {
        page,
        perPage,
        title: debouncedSearchQuery || undefined,
        status: filters.status || undefined,
        language: filters.language || undefined,
        releaseDateStart: filters.releaseDateStart || undefined,
        releaseDateEnd: filters.releaseDateEnd || undefined,
      }

      if (filters.genreIds && filters.genreIds.length > 0) {
        params.genreIds = filters.genreIds
      }

      const response = await getMovies(params)

      let filteredMovies = response.data
      if (
        filters.durationMin !== undefined ||
        filters.durationMax !== undefined
      ) {
        filteredMovies = response.data.filter((movie) => {
          const duration = movie.duration
          const minOk =
            filters.durationMin === undefined || duration >= filters.durationMin
          const maxOk =
            filters.durationMax === undefined || duration <= filters.durationMax
          return minOk && maxOk
        })
      }

      setMovies(filteredMovies)
      setTotalPages(response.meta.totalPages)
    } catch (err) {
      setError('Erro ao carregar filmes')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [page, perPage, debouncedSearchQuery, filters])

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

  const handleFiltersChange = useCallback((newFilters: MovieFilters) => {
    setFilters(newFilters)
    setPage(1)
  }, [])

  const refetch = useCallback(() => {
    fetchMovies()
  }, [fetchMovies])

  return {
    movies,
    isLoading,
    error,
    page,
    totalPages,
    searchQuery,
    filters,
    handleSearch,
    handlePageChange,
    handleFiltersChange,
    refetch,
  }
}
