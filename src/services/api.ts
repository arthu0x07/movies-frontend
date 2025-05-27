import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@cubos-movies:token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('@cubos-movies:token')
      document.cookie = '@cubos-movies:token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export interface Movie {
  id: string
  title: string
  originalTitle: string
  description: string
  tagline: string
  releaseDate: string
  duration: number
  status: 'RELEASED' | 'UPCOMING' | 'CANCELLED'
  language: 'PT' | 'EN' | 'ES'
  budget: number
  revenue: number
  popularity: number
  votes: number
  ratingPercentage: number
  genresIds: string[]
  fileId: string
  file: {
    id: string
    url: string
  }
}

interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    perPage: number
    totalPages: number
    path: string
  }
}

interface GetMoviesParams {
  title?: string
  status?: 'RELEASED' | 'UPCOMING' | 'CANCELLED'
  language?: 'PT' | 'EN' | 'ES'
  genreIds?: string[]
  releaseDateStart?: string
  releaseDateEnd?: string
  page?: number
  perPage?: number
}

export async function getMovies(params?: GetMoviesParams) {
  const { data } = await api.get<PaginatedResponse<Movie>>('/movies', {
    params,
  })

  return data
}

export async function getMovieBySlug(slug: string) {
  const { data } = await api.get<{ data: Movie }>(`/movies/${slug}`)

  return data.data
}

export async function createMovie(movie: Omit<Movie, 'id'>) {
  const { data } = await api.post<{ data: Movie }>('/movies', movie)

  return data.data
}

export async function updateMovie(id: string, movie: Partial<Movie>) {
  const { data } = await api.patch<{ data: Movie }>(`/movies/${id}`, movie)

  return data.data
}

export async function deleteMovie(id: string) {
  await api.delete(`/movies/${id}`)
}
